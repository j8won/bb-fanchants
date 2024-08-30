export enum LOCALE {
  ko = 'ko',
  en = 'en',
}

export const INFOS = {
  ko: {
    buttonText: '🇰🇷 KOR',
    path: '/',
  },
  en: {
    buttonText: '🇺🇸 ENG',
    path: '/en',
  },
} as const;

export const METADATA = {
  ko: {
    applicationName: '빅뱅 응원법',
    title: '빅뱅 응원법',
    description: '빅뱅 응원법과 함께 콘서트 관람해요',
  },
  en: {
    applicationName: 'BB fanchants',
    title: 'BIGBANG fanchants',
    description:
      'Enjoy the BIGBANG concert with fanchants | English is now available.',
  },
} as const;
