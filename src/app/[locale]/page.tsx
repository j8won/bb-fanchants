import React from 'react';
import initTranslations from '@/i18n/i18n';
import TranslationsProvider from '@/components/i18n/TranslationsProvider';

interface Params {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: Params) {
  const i18nNamespaces = ['home', 'common'];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className="px-4 mt-20 flex flex-col justify-center items-center">
        <h1 className="break-keep mb-8 text-gray2-title">{t('greeting')}</h1>
        <h2 className="break-keep text-xl font-light text-gray3-text">
          {t('explain')}
        </h2>
        <button className="mt-16 rounded-full border-2 px-6 py-3 text-xl font-normal">
          {t('menu-button')}
        </button>
      </div>
    </TranslationsProvider>
  );
}
