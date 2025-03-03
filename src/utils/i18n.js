// src/utils/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Importar recursos de traducción
import en from '../../assets/locales/en.json';
import es from '../../assets/locales/es.json';

// Detector de idioma personalizado para React Native
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // Obtener el idioma guardado
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        return callback(savedLanguage);
      }

      // Usar el idioma del dispositivo
      const deviceLanguage = Localization.locale.split('-')[0];
      return callback(deviceLanguage);
    } catch (error) {
      console.error('Error detecting language:', error);
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'en',
    debug: __DEV__, // Activar el modo debug en desarrollo

    interpolation: {
      escapeValue: false, // No es necesario para React
    },

    react: {
      useSuspense: false, // Desactivar Suspense
    },

    // Configuración para manejo de claves faltantes
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
      // Aquí podrías implementar lógica para registrar claves faltantes
    },
  });

// Exportar una función para cambiar el idioma
export const changeLanguage = (language) => {
  return i18n.changeLanguage(language);
};

// Exportar i18n para usar en toda la aplicación
export default i18n;