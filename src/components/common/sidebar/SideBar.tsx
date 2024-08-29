'use client';
import React from 'react';
import Header from '@/components/common/sidebar/Header';
import MenuHeader from '@/components/common/sidebar/MenuHeader';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useMenuOpen from '@/hooks/useMenuOpen';
import { SongsBySinger, SongType } from '../../../../types/songs';

interface Props {
  songsBySingerList: SongsBySinger[];
}

export default function SideBar({ songsBySingerList }: Props) {
  const { isMenuOpen, openMenu, closeMenu } = useMenuOpen();

  const { t } = useTranslation('common');

  return (
    <>
      <Header openMenu={openMenu} />
      <aside
        className={`absolute z-20 top-0 left-0 w-full min-h-screen bg-gray6-black ease-in-out duration-700 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <MenuHeader closeMenu={closeMenu} />
        {songsBySingerList.map(({ singer, songs }) => (
          <div key={singer}>
            {singer}
            {songs.map(({ title, slug }: Pick<SongType, 'title' | 'slug'>) => (
              <p key={title}>
                {title} {slug}
              </p>
            ))}
          </div>
        ))}
        <Link className="text-blue-600" href="/about-us">
          {t('common:about_us')}
        </Link>
      </aside>
    </>
  );
}
