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
          routesinfo:'Info sur les voies'
          }
        },
      en: {
        translation: {
          routesinfo:'Routes info'
        }
      }
    }
  });

export default i18n;