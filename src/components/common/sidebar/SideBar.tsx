'use client';
import { useState } from 'react';
import Header from '@/components/common/sidebar/Header';
import MenuHeader from '@/components/common/sidebar/MenuHeader';

export default function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    if (isMenuOpen) return;
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    if (!isMenuOpen) return;
    setIsMenuOpen(false);
  };

  return (
    <>
      <Header openMenu={openMenu} />
      <aside
        className={`absolute top-0 left-0 w-full min-h-screen bg-gray6-black ease-in-out duration-700 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <MenuHeader closeMenu={closeMenu} />
      </aside>
    </>
  );
}
