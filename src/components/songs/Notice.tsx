import { LocaleType } from '@/lib/constants/LOCALE';

interface Params {
  locale: LocaleType;
}
export default function Notice({ locale }: Params) {
  if (locale === 'ko') {
    return (
      <>
        <span className="text-primary-yellow">노란색</span>은 멜로디에 맞추어,{' '}
        <span className="text-secondary-skyblue">파란색</span>은 큰 목소리로
        외쳐 주세요!
      </>
    );
  }

  if (locale === 'en') {
    return (
      <>
        For the <span className="text-primary-yellow">yellow</span>, please
        follow the melody and for the{' '}
        <span className="text-secondary-skyblue">blue</span>, shout out only the
        fanchants!
      </>
    );
  }

  return '';
}
