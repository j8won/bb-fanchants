import initTranslations from '@/i18n';
import Link from 'next/link';
import TranslationsProvider from '@/components/TranslationsProvider';
import ExampleClientComponent from '@/components/ExampleClientComponent';
import LanguageChanger from '@/components/LanguageChanger';

const i18nNamespaces = ['home', 'common'];
export default async function Home({ params: { locale } }) {
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
        <LanguageChanger />
        <Link className="text-blue-600" href="/about-us">
          {t('common:about_us')}
        </Link>
      </div>
    </TranslationsProvider>
  );
}
