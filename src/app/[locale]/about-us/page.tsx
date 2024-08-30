import initTranslations from '@/i18n/i18n';
import { LocaleType } from '../../../../lib/constants/LOCALE';

interface Params {
  params: { locale: LocaleType };
}

export default async function AboutUs({ params: { locale } }: Params) {
  const { t } = await initTranslations(locale, ['common']);
  return <div>{t('about_us')}</div>;
}
