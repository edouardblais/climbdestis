import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      fr: {
        translation: {
          routesinfo:"Topos des voies",
          orientation:'Ensoleillement',
          weather:'Météo',
          allDaySun:'Soleil toute la journée',
          allDayShade:"À l'ombre toute la journée",
          amSun:"Soleil en matinée",
          pmSun:"Soleil en après-midi"
          }
        },
      en: {
        translation: {
          routesinfo:'Routes info',
          orientation:'Sun orientation',
          weather: 'Weather',
          allDaySun:'All day sun',
          allDayShade:"All day shade",
          amSun:"AM sun",
          pmSun:"PM sun"
        }
      }
    }
  });

export default i18n;