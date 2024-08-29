import { useAtom } from 'jotai';
import { isSidebarMenuOpen } from '@/store';

function useMenuOpen() {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isSidebarMenuOpen);

  const openMenu = () => {
    if (isMenuOpen) return;
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    if (!isMenuOpen) return;
    setIsMenuOpen(false);
  };

  return { isMenuOpen, openMenu, closeMenu };
}

export default useMenuOpen;
