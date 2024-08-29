type LocaleInfo = {
  buttonText: string;
  path: string;
};

type LocalesType = {
  [key: string]: LocaleInfo;
};

const INFOS: LocalesType = {
  ko: {
    buttonText: '🇰🇷 KOR',
    path: '/',
  },
  en: {
    buttonText: '🇺🇸 ENG',
    path: '/en',
  },
};

type MetadataType = {
  applicationName: string;
  title: string;
  description: string;
};

type MetadataAllType = {
  [key in keyof typeof INFOS]: MetadataType;
};

const METADATA: MetadataAllType = {
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
};

Object.freeze(INFOS);
Object.freeze(METADATA);

export default { INFOS, METADATA };
