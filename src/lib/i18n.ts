import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import itTranslations from '@/locales/it.json';
import enTranslations from '@/locales/en.json';
import deTranslations from '@/locales/de.json';
import esTranslations from '@/locales/es.json';
import frTranslations from '@/locales/fr.json';
import ptTranslations from '@/locales/pt.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: itTranslations },
      en: { translation: enTranslations },
      de: { translation: deTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      pt: { translation: ptTranslations }
    },
    lng: 'it', // default language
    fallbackLng: 'it',
    interpolation: {
      escapeValue: false
    },
    debug: false
  });

export default i18n;