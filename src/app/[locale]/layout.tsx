import type { Metadata } from 'next';
import React from 'react';
import { dir } from 'i18next';
import '../globals.css';
import { i18nConfig } from '@/i18n/i18nConfig';
import initTranslations from '@/i18n/i18n';
import TranslationsProvider from '@/components/i18n/TranslationsProvider';
import SideBar from '@/components/common/sidebar/SideBar';
import ConditionalStyledBackground from '@/components/common/background/ConditionalStyledBackground';
import { INFOS, METADATA } from '../../../lib/constants/LOCALE';
import { Provider } from 'jotai';
import { getAllSongsWithSinger } from '../../../lib/utils/mdx';

const metadata = METADATA;
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as keyof typeof INFOS;
  return {
    applicationName:
      metadata[locale]?.applicationName || metadata['en'].applicationName,
    title: metadata[locale]?.title || metadata['en'].title,
    keywords: '빅뱅 응원법 bigbang BIGBANG fanchants',
    description: metadata[locale]?.description || metadata['en'].description,
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const i18nNamespaces = ['home'];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  const songsList = await getAllSongsWithSinger(locale);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className="w-screen min-h-screen overflow-x-hidden bg-gray6-black flex justify-center items-center">
        <Provider>
          <ConditionalStyledBackground>
            <TranslationsProvider
              locale={locale}
              namespaces={i18nNamespaces}
              resources={resources}
            >
              <SideBar songsBySingerList={songsList} />
            </TranslationsProvider>
            <div className="absolute z-10 top-0 pt-[68px] w-full h-full">
              {children}
            </div>
          </ConditionalStyledBackground>
        </Provider>
      </body>
    </html>
  );
}
