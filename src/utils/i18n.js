// src/utils/i18n.js
import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Import translations directly
import en from '../../assets/locales/en.json';
import es from '../../assets/locales/es.json';

// Available languages and translations
const translations = { en, es };

// Storage key for language preference
const LANGUAGE_KEY = 'language';

// Create context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(null);
    const [isReady, setIsReady] = useState(false);

    // Initialize language on mount
    useEffect(() => {
        const initializeLanguage = async () => {
            try {
                // Get saved language preference or use device locale
                const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
                const deviceLocale = Localization.locale.split('-')[0];

                // Check if device locale is supported, default to English if not
                const initialLanguage = savedLanguage ||
                    (Object.keys(translations).includes(deviceLocale) ? deviceLocale : 'en');

                setLanguage(initialLanguage);
            } catch (error) {
                console.error('Error initializing language:', error);
                setLanguage('en'); // Default to English if error
            } finally {
                setIsReady(true);
            }
        };

        initializeLanguage();
    }, []);

    // Update language
    const changeLanguage = async (newLanguage) => {
        if (Object.keys(translations).includes(newLanguage)) {
            setLanguage(newLanguage);
            try {
                await AsyncStorage.setItem(LANGUAGE_KEY, newLanguage);
            } catch (error) {
                console.error('Error saving language preference:', error);
            }
        } else {
            console.warn('Unsupported language:', newLanguage);
        }
    };

    // Get available languages
    const getLanguages = () => {
        return Object.keys(translations).map(code => ({
            code,
            name: code.toUpperCase() // Simple name conversion, can be improved
        }));
    };

    // Translation function
    const t = (key, params = {}) => {
        if (!language || !translations[language]) {
            return key; // Return key if language not initialized
        }

        const translationObj = translations[language];
        const value = translationObj[key] || key;

        // Simple parameter replacement
        if (params && Object.keys(params).length) {
            return Object.keys(params).reduce((acc, paramKey) => {
                return acc.replace(new RegExp(`{{${paramKey}}}`, 'g'), params[paramKey]);
            }, value);
        }

        return value;
    };

    if (!isReady) {
        // You could return a loading component here
        return null;
    }

    const value = {
        language,
        changeLanguage,
        languages: getLanguages(),
        t
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Hook for using translations
export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};