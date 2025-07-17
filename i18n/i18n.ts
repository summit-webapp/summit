import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/common.json';
import fr from '../public/locales/fr/common.json';
import de from '../public/locales/de/common.json';
import es from '../public/locales/es/common.json';
import it from '../public/locales/it/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    fr: { common: fr },
    de: { common: de },
    es: { common: es },
    it: { common: it },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
