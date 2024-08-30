import { SINGERS } from '@/lib/constants/SONGS';

export type SongType = {
  title: string;
  slug: string;
  date: string;
  artist: string;
  imageUrl: string;
  musicUrl: string;
};

export type SingerType = (typeof SINGERS)[keyof typeof SINGERS];

export type SongWithSlug = Pick<SongType, 'title' | 'slug'>;

export type SongsBySinger = {
  singer: SingerType;
  songs: SongWithSlug[];
};
