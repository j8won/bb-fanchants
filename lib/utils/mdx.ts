import LOCALE from '../constants/LOCALE';
import path from 'path';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';

const SUPPORTED_LOCALES = Object.keys(LOCALE.INFOS);
const BASE_PATH = '_posts';

const postsDirectory = SUPPORTED_LOCALES.reduce(
  (directories, locale) => {
    directories[locale] = path.join(process.cwd(), `${BASE_PATH}/${locale}`);
    return directories;
  },
  {} as Record<string, string>
);

const SINGERS = {
  gdty: 'GD X TAEYANG',
  taeyang: 'TAEYANG',
};

const getPostMetadata = (filePath: string) => {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data;
  } catch (e) {
    console.log(`Error reading or parsing file ${filePath}: `, e);
    return {};
  }
};

export const getAllPostsWithCategories = async (locale: string) => {
  // const slugs = getPostsSlugs(locale);
  const results: Record<string, string[]> = {};
  const localePath = postsDirectory[locale];
  const files = sync(`${localePath}/**/*.mdx`);

  files.forEach((file) => {
    const categoryKey = path.basename(path.dirname(file));
    const category = SINGERS[categoryKey] || categoryKey;
    const metadata = getPostMetadata(file);
    const title = metadata.title || path.basename(file, '.mdx');

    if (!results[category]) {
      results[category] = [];
    }

    results[category].push(title);
  });

  return results;
};
