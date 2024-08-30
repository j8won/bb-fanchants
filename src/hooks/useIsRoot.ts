import { usePathname } from 'next/navigation';
import { INFOS } from '../../lib/constants/LOCALE';

export default function useIsRoot() {
  const paths = Object.values(INFOS).map((info) => info.path);
  const pathname = usePathname();
  const isRoot = (paths as string[]).includes(pathname);
  return { isRoot };
}
