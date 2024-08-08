import initTranslations from '@/i18n';

interface Params {
  params: { locale: string };
}

export default async function AboutUs({ params: { locale } }: Params) {
  const { t } = await initTranslations(locale, ['common']);
  return <div>{t('about_us')}</div>;
}
