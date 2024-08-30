import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import { SingerType, SongsBySinger, SongType } from '../../types/song';
import { LOCALE } from '../constants/LOCALE';
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
    throw new Error(`Error reading file ${filePath}: ${e.message}`);
  }
};

const getSongMetadataByFilePath = (filePath: string) => {
  try {
    const fileContents = getSongRawSourceByFilePath(filePath);
    const { data } = matter(fileContents);
    return data;
  } catch (e) {
    throw new Error(`Error  parsing file ${filePath} metadata: ${e.message}`);
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
    throw new Error(`Error parsing file ${filePath} source: ${e.message}`);
  }
};

const getSongSlug = (filePath: string, localePath: string) => {
  const withoutLocalePath = filePath.replace(localePath, '');
  const singer = path.basename(path.dirname(withoutLocalePath));
  const fileName = path.basename(withoutLocalePath, '.mdx');
  return `/${singer}-${fileName}`;
};

const getFilePath = (locale: string, slug: string) => {
  const [singer, filename] = slug.replace('/', '').split('-');
  return path.join(process.cwd(), BASE_PATH, locale, singer, `${filename}.mdx`);
};

export const getAllSongsWithSinger = async (
  locale: string
): Promise<SongsBySinger[]> => {
  const result: SongsBySinger[] = [];
  const singersMap: Record<SingerType, SongType[]> = Object.keys(
    SINGERS
  ).reduce(
    (acc, key) => {
      acc[SINGERS[key as keyof typeof SINGERS]] = [];
      return acc;
    },
    {} as Record<SingerType, SongType[]>
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

      const postPath = getSongSlug(file, localePath);

      if (!singersMap[singer]) {
        singersMap[singer] = [];
      }

      singersMap[singer].push({ title, slug: postPath });
    })
  );

  for (const [singer, songs] of Object.entries(singersMap)) {
    result.push(<SongsBySinger>{ singer, songs });
  }

  return result;
};

export const getSongBySlug = async (locale: string, slug: string) => {
  const filePath = getFilePath(locale, slug);
  return getSongMdxByFilePath(filePath);
};
