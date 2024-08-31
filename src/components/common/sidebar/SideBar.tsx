'use client';

import React from 'react';
import Header from '@/components/common/sidebar/Header';
import MenuHeader from '@/components/common/sidebar/MenuHeader';
import useMenuOpen from '@/hooks/useMenuOpen';
import { SongsBySinger } from '../../../../types/song';
import Menu from '@/components/common/sidebar/Menu';

interface Props {
  songsBySingerList: SongsBySinger[];
}

export default function SideBar({ songsBySingerList }: Props) {
  const { isMenuOpen, openMenu, closeMenu } = useMenuOpen();

  return (
    <>
      <Header openMenu={openMenu} />
      <aside
        className={`absolute z-20 top-0 left-0  w-full h-screen bg-gray6-black ease-in-out duration-700 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <MenuHeader closeMenu={closeMenu} />
        <Menu songsBySingerList={songsBySingerList} closeMenu={closeMenu} />
      </aside>
    </>
  );
}
