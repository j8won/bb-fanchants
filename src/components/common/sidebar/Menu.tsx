import { SongsBySinger, SongWithSlug } from '../../../../types/song';
import Link from 'next/link';
import React from 'react';

interface Params {
  songsBySingerList: SongsBySinger[];
  closeMenu: () => void;
}

export default function Menu({ songsBySingerList, closeMenu }: Params) {
  return (
    <div className="absolute w-screen h-screen pt-[68px] pb-36 overflow-y-auto">
      {songsBySingerList.map(({ singer, songs }) => (
        <div key={singer} className="px-5 pb-2">
          <p className="py-2 text-body-lg font-light text-gray4-dark-text">
            {singer}
          </p>
          {songs.map(({ title, slug }: SongWithSlug) => (
            <Link href={slug} key={title} onClick={closeMenu}>
              <p className="py-2 text-body-lg">{title}</p>
            </Link>
          ))}
        </div>
      ))}
      {/*<Link href="/about-us" onClick={closeMenu}>*/}
      {/*  <p className="px-5 pb-8 text-caption-lg text-gray4-dark-text underline">*/}
      {/*    ABOUT US*/}
      {/*  </p>*/}
      {/*</Link>*/}
    </div>
  );
}
