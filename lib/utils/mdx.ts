import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import { SingerType, SongsBySinger, SongType } from '../../types/song';
import { LOCALE } from '../constants/LOCALE';
import { SINGERS } from '../constants/SONGS';

const SUPPORTED_LOCALES = Object.keys(LOCALE);
const BASE_PATH = '_songs';

const songsDirectory = SUPPORTED_LOCALES.reduce(
  (directories, locale) => {
    directories[locale] = path.join(process.cwd(), `${BASE_PATH}/${locale}`);
    return directories;
  },
  {} as Record<string, string>
);

const getSongMetadata = (filePath: string) => {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data;
  } catch (e) {
    console.log(`Error reading or parsing file ${filePath}: `, e);
    return {};
  }
};

const getSongSlug = (filePath: string, localePath: string) => {
  return filePath.replace(localePath, '').replace(/\.mdx$/, '');
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

      const metadata = getSongMetadata(file);
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
