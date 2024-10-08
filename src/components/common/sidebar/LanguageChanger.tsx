'use client';

import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { i18nConfig } from '@/i18n/i18nConfig';
import React from 'react';
import { INFOS, LocaleType } from '@/lib/constants/LOCALE';

const localeInfo = Object.entries(INFOS).map(([id, info]) => {
  return { id: id, text: info.buttonText };
});

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = i18n.language;

  const handleChange = (newLocale: LocaleType) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <div className="flex gap-1">
      {localeInfo.map((locale) => (
        <button
          key={locale.id}
          onClick={() => handleChange(locale.id as LocaleType)}
          disabled={currentLocale === locale.id}
          className={`px-3 py-1.5 rounded disabled:bg-gray5-light-bg`}
        >
          {locale.text}
        </button>
      ))}
    </div>
  );
}
