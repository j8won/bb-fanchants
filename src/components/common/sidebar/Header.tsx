'use client';
import Image from 'next/image';
import Link from 'next/link';
import useIsRoot from '@/hooks/useIsRoot';

export default function Header({ openMenu }: { openMenu: () => void }) {
  const { isRoot } = useIsRoot();
  return (
    <>
      <header
        className={`fixed z-20 w-full p-5 flex justify-between items-center ${!isRoot && 'bg-gray6-black'}`}
      >
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            alt="home"
            width={150}
            height={24}
            style={{ height: 'auto' }}
          />
        </Link>
        <button onClick={openMenu}>
          <Image
            width={28}
            height={28}
            src="/icons/icons8-menu.svg"
            alt="menu"
          />
        </button>
      </header>

      <div className="hidden">
        <a target="_blank" href="https://icons8.com/icon/36389/menu">
          메뉴
        </a>{' '}
        작가:{' '}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </>
  );
}
