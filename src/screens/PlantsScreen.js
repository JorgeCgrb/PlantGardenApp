// src/screens/PlantsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlantsViewModel } from '../viewmodels/PlantsViewModel';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/common/SearchBar';
import { getPlantImage } from '../utils/assetUtils';

const PlantsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const {
    plants,
    filteredPlants,
    searchQuery,
    setSearchQuery
  } = usePlantsViewModel();

  // Función para manejar la búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Función para manejar la selección de una planta
  const handlePlantSelect = (plant) => {
    navigation.navigate('PlantDetail', { plantId: plant.id });
  };

  // Renderizar un elemento de planta
  const renderPlantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.plantCard}
      onPress={() => handlePlantSelect(item)}
    >
      <Image
        source={getPlantImage(item.name.toLowerCase())}
        style={styles.plantImage}
        resizeMode="contain"
      />
      <Text style={styles.plantName}>{t(item.name.toLowerCase())}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder={t('search_plants')}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.content}>
        {filteredPlants.length > 0 ? (
          <FlatList
            data={filteredPlants}
            renderItem={renderPlantItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? t('no_results_found')
                : t('no_plants_available')}
            </Text>
          </View>
        )}
      </View>

      {/* Botón para añadir planta */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log('Add plant')}
      >
        <Text style={styles.addButtonText}>+ {t('add_plant')}</Text>
      </TouchableOpacity>
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
    padding: 8,
  },
  listContainer: {
    paddingVertical: 8,
  },
  plantCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    maxWidth: '46%',
  },
  plantImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  plantName: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#AAA',
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PlantsScreen;