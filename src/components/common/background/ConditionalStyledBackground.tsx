'use client';
import React from 'react';
import TwinkleStars from '@/components/common/background/TwinkleStars';
import useIsRoot from '@/hooks/useIsRoot';

export default function ConditionalStyledBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isRoot } = useIsRoot();
  return (
    <div
      className={`fixed overflow-x-hidden ${isRoot ? ' bg-custom-gradient overflow-y-hidden ' : ' bg-gray6-black '} w-screen max-w-screen-md h-screen`}
    >
      {children}
      {isRoot && <TwinkleStars />}
    </div>
  );
}
