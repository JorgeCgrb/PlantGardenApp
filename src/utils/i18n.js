import React, { useContext, createContext, useState, useEffect } from 'react';
import { TranslationService, LANGUAGES } from '../services/TranslationService';

// Create context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(TranslationService.getLanguage());

    // Update language
    const changeLanguage = async (newLanguage) => {
        await TranslationService.setLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    // Get available languages
    const getLanguages = () => {
        return Object.entries(LANGUAGES).map(([key, value]) => ({
            code: value,
            name: key
        }));
    };

    // Translation function
    const t = (key, options) => {
        return TranslationService.translate(key, options);
    };

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