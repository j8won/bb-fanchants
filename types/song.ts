import { SINGERS } from '../lib/constants/SONGS';

export type SongType = {
  title: string;
  slug: string;
};

export type SingerType = (typeof SINGERS)[keyof typeof SINGERS];

export type SongsBySinger = {
  singer: SingerType;
  songs: SongType[];
};
