import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      fr: {
        translation: {
          close:'Fermer'
          }
        },
      en: {
        translation: {
          close: 'Close'
        }
      }
    }
  });

export default i18n;