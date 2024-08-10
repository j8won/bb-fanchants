import Link from 'next/link';
import React from 'react';
import initTranslations from '@/i18n/i18n';
import TranslationsProvider from '@/components/i18n/TranslationsProvider';
import ExampleClientComponent from '@/components/ExampleClientComponent';

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
      <div>
        <h1>{t('greeting')}</h1>
        <ExampleClientComponent />
        <Link className="text-blue-600" href="/about-us">
          {t('common:about_us')}
        </Link>
      </div>
    </TranslationsProvider>
  );
}
