'use client';

import React from 'react';
import useMenuOpen from '@/hooks/useMenuOpen';

function MenuButton({ children }: { children: React.ReactNode }) {
  const { openMenu } = useMenuOpen();

  return (
    <button
      onClick={openMenu}
      className="mt-16 rounded-full border-2 px-6 py-3 text-xl font-normal"
    >
      {children}
    </button>
  );
}

export default MenuButton;
