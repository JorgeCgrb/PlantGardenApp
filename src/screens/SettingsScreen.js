// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../utils/i18n';

const SettingsScreen = ({ navigation }) => {
  const { t, language, changeLanguage, languages } = useTranslation();

  // Cambiar el idioma
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('language')}</Text>

        <View style={styles.languageButtons}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'en' && styles.selectedLanguage
            ]}
            onPress={() => handleLanguageChange('en')}
          >
            <Text style={styles.languageButtonText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'es' && styles.selectedLanguage
            ]}
            onPress={() => handleLanguageChange('es')}
          >
            <Text style={styles.languageButtonText}>Español</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  selectedLanguage: {
    backgroundColor: '#4CAF50',
  },
  languageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;