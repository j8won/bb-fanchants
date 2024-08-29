'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import LOCALE from '@/constants/LOCALE';
import TwinkleStars from '@/components/common/background/TwinkleStars';

const paths = Object.keys(LOCALE.INFOS).map((key) => LOCALE.INFOS[key]['path']);

export default function ConditionalStyledBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRoot = paths.includes(pathname);

  return (
    <div
      className={`fixed overflow-x-hidden ${isRoot ? ' bg-custom-gradient overflow-y-hidden ' : ' bg-gray6-black '} w-screen max-w-screen-md h-screen`}
    >
      {children}
      {isRoot && <TwinkleStars />}
    </div>
  );
}
