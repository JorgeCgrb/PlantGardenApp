import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, es } from '../assets/locales';

// Storage keys
const STORAGE_KEYS = {
    LANGUAGE: 'language'
};

// Available languages
export const LANGUAGES = {
    EN: 'en',
    ES: 'es'
};

// Translation resources
const translations = {
    en,
    es
};

/**
 * Service for translation and localization
 */
export const TranslationService = {
    /**
     * Initialize the translation service
     */
    async initialize() {
        try {
            // Set up i18n
            i18n.translations = translations;

            // Get saved language preference or use device locale
            const savedLanguage = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
            const deviceLocale = Localization.locale.split('-')[0];

            // Check if device locale is supported, default to English if not
            const language = savedLanguage ||
                (Object.keys(translations).includes(deviceLocale) ? deviceLocale : LANGUAGES.EN);

            // Set language
            i18n.locale = language;
            i18n.fallbacks = true;

            console.log('Translations initialized with language:', language);
        } catch (error) {
            console.error('Error initializing translations:', error);

            // Default to English if error
            i18n.locale = LANGUAGES.EN;
            i18n.fallbacks = true;
        }
    },

    /**
     * Get current language
     * @returns {string} Current language code
     */
    getLanguage() {
        return i18n.locale;
    },

    /**
     * Set language
     * @param {string} language - Language code
     * @returns {Promise<void>}
     */
    async setLanguage(language) {
        try {
            if (Object.values(LANGUAGES).includes(language)) {
                // Update i18n
                i18n.locale = language;

                // Save preference
                await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);

                console.log('Language changed to:', language);
            } else {
                console.warn('Unsupported language:', language);
            }
        } catch (error) {
            console.error('Error setting language:', error);
        }
    },

    /**
     * Translate a string
     * @param {string} key - Translation key
     * @param {object} options - Translation options
     * @returns {string} Translated string
     */
    translate(key, options) {
        return i18n.t(key, options);
    }
};

// Export function to initialize translations
export const loadTranslations = TranslationService.initialize;