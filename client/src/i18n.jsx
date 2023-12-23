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
          pmSun:"Soleil en après-midi",
          restrictions:'Accès et restrictions',
          username: "Nom d'utilisateur",
          required:'Ce champ est requis',
          maxlength:'Limite de caractères atteinte',
          minlength2:'2 caractères requis minimalement',
          minlength8:'8 caractères requis minimalement',
          email:'Courriel',
          emailpattern:"Adresse courriel invalide",
          password:'Mot de passe'
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
          pmSun:"PM sun",
          restrictions:'Access and restrictions',
          username: "Username",
          required:'This field is required',
          maxlength:'Too many characters',
          minlength2:'2 characters minimally required',
          minlength8:'8 characters minimally required',
          email:'Email',
          emailpattern:"Invalid email address",
          password:'Password'
        }
      }
    }
  });

export default i18n;