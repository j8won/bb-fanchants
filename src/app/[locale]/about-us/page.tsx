import initTranslations from '@/i18n';
export default async function AboutUs({ params: { locale } }) {
  const { t } = await initTranslations(locale, ['common']);
  return <div>{t('about_us')}</div>;
}
