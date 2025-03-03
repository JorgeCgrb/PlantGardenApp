// src/screens/PlantsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlantsViewModel } from '../viewmodels/PlantsViewModel';
import { useTranslation } from '../utils/i18n';
import SearchBar from '../components/common/SearchBar';

const PlantsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = usePlantsViewModel();

  // Función para manejar la búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder={t('search_plants')}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{t('plants')}</Text>
        <Text style={styles.message}>Plants will be displayed here.</Text>
        {searchQuery ? (
          <Text style={styles.searchInfo}>
            Searching for: "{searchQuery}"
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchInfo: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 10,
  }
});

export default PlantsScreen;