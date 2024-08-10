'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import LOCALE from '@/constants/LOCALE';

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
      className={`relative overflow-x-hidden ${isRoot ? 'bg-custom-gradient overflow-y-hidden-hidden' : 'bg-gray6-black'} w-screen max-w-screen-md min-h-screen`}
    >
      {children}
    </div>
  );
}
