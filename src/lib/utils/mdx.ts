import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import { SingerType, SongsBySinger, SongType } from '../../../types/song';
import { LOCALE, LocaleType } from '../constants/LOCALE';
import { SINGERS } from '../constants/SONGS';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

const SUPPORTED_LOCALES = Object.keys(LOCALE);
const BASE_PATH = '_songs';

const songsDirectory = SUPPORTED_LOCALES.reduce(
  (directories, locale) => {
    directories[locale] = path.join(process.cwd(), `${BASE_PATH}/${locale}`);
    return directories;
  },
  {} as Record<string, string>
);

const getSongRawSourceByFilePath = (filePath: string) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    throw new Error(
      `Error reading file ${filePath}: ${e instanceof Error ? e.message : 'unknown error'}`
    );
  }
};

const getSongMetadataByFilePath = (filePath: string) => {
  try {
    const fileContents = getSongRawSourceByFilePath(filePath);
    const { data } = matter(fileContents);
    return data;
  } catch (e) {
    throw new Error(
      `Error  parsing file ${filePath} metadata: ${e instanceof Error ? e.message : 'unknown error'}`
    );
  }
};

const getSongMdxByFilePath = async (filePath: string) => {
  try {
    const fileContents = getSongRawSourceByFilePath(filePath);
    const { data: metadata, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        format: 'mdx',
      },
    });

    return { metadata, mdxSource };
  } catch (e) {
    throw new Error(
      `Error parsing file ${filePath} source: ${e instanceof Error ? e.message : 'unknown error'}`
    );
  }
};

const getSongSlug = (filePath: string, localePath: string) => {
  const withoutLocalePath = filePath.replace(localePath, '');
  const singer = path.basename(path.dirname(withoutLocalePath));
  const fileName = path.basename(withoutLocalePath, '.mdx');
  return `/${singer}-${fileName}`;
};

const getFilePath = (locale: LocaleType, slug: string) => {
  const [singer, filename] = slug.replace('/', '').split('-');
  return path.join(process.cwd(), BASE_PATH, locale, singer, `${filename}.mdx`);
};

export const getAllSongsWithSinger = async (
  locale: LocaleType
): Promise<SongsBySinger[]> => {
  const result: SongsBySinger[] = [];

  const singersMap: Record<
    SingerType,
    Pick<SongType, 'title' | 'slug' | 'date'>[]
  > = Object.keys(SINGERS).reduce(
    (acc, key) => {
      acc[SINGERS[key as keyof typeof SINGERS]] = [];
      return acc;
    },
    {} as Record<SingerType, Pick<SongType, 'title' | 'slug' | 'date'>[]>
  );

  const localePath = songsDirectory[locale];
  const files = sync(`${localePath}/**/*.mdx`);

  await Promise.all(
    files.map(async (file) => {
      const singerKey = path.basename(
        path.dirname(file)
      ) as keyof typeof SINGERS;
      const singer = SINGERS[singerKey] || singerKey;

      const metadata = getSongMetadataByFilePath(file);
      const title = metadata.title || path.basename(file, '.mdx');
      const date = metadata.date;

      const postPath = getSongSlug(file, localePath);

      if (!singersMap[singer]) {
        singersMap[singer] = [];
      }

      singersMap[singer].push({ title, slug: postPath, date });
    })
  );

  for (const [singer, songs] of Object.entries(singersMap)) {
    const sortedSongs = songs
      .sort((a, b) => (a.date > b.date ? -1 : 1))
      .map((x) => ({ title: x.title, slug: x.slug }));
    result.push(<SongsBySinger>{ singer, songs: sortedSongs });
  }

  return result.sort((a, b) => a.singer.localeCompare(b.singer));
};

export const getSongBySlug = async (locale: LocaleType, slug: string) => {
  const filePath = getFilePath(locale, slug);
  return getSongMdxByFilePath(filePath);
};
