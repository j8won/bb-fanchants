'use client';

import { useTranslation } from 'react-i18next';

export default function ExampleClientComponent() {
  const { t } = useTranslation();
  const userName = 'Joowon';
  return <div>{t('common:subheader', { userName })}</div>;
}
