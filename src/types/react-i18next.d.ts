/* Use this d.ts file in development */

import en from 'translations/en.json';

export type Translation = typeof en;

export interface I18nNamespaces {
  en: Translation;
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: I18nNamespaces;
  }
}
