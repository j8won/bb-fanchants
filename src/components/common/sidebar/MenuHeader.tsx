'use client';

import LanguageChanger from '@/components/common/sidebar/LanguageChanger';
import React from 'react';
import Image from 'next/image';

export default function MenuHeader({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      <header className="w-full px-5 py-4 flex justify-between items-center">
        <LanguageChanger />
        <button onClick={closeMenu}>
          <Image
            src={'/images/icons8-close.svg'}
            alt={'close'}
            width={28}
            height={28}
          />
        </button>
      </header>
      <div className="hidden">
        <a target="_blank" href="https://icons8.com/icon/8112/close">
          Close
        </a>{' '}
        icon by{' '}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </>
  );
}
