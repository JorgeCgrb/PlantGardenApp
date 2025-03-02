import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlantsViewModel } from '../viewmodels/PlantsViewModel';
import { useTranslation } from '../utils/i18n';
import SearchBar from '../components/common/SearchBar';
import PlantCategories from '../components/plants/PlantCategories';
import PlantList from '../components/plants/PlantList';

const PlantsScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const {
        categories,
        plants,
        filteredPlants,
        selectedCategory,
        searchQuery,
        setSelectedCategory,
        setSearchQuery
    } = usePlantsViewModel();

    // Handle plant selection
    const handlePlantSelect = (plant) => {
        navigation.navigate('PlantDetail', { plantId: plant.id });
    };

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Handle search
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
                {selectedCategory ? (
                    <View style={styles.categoryHeader}>
                        <Text style={styles.categoryTitle}>{t(selectedCategory)}</Text>
                    </View>
                ) : null}

                {/* Plant List */}
                <PlantList
                    plants={filteredPlants}
                    onPlantSelect={handlePlantSelect}
                />

                {/* Add Plant Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => console.log('Add plant')}
                >
                    <Text style={styles.addButtonText}>+ {t('add_plant')}</Text>
                </TouchableOpacity>
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
        padding: 8,
    },
    categoryHeader: {
        padding: 16,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
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