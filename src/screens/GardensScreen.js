import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGardensViewModel } from '../viewmodels/GardensViewModel';
import { useTranslation } from '../utils/i18n';

const GardensScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { gardens, deleteGarden } = useGardensViewModel();

    // Handle garden selection
    const handleGardenSelect = (garden) => {
        navigation.navigate('GardenDetail', { gardenId: garden.id });
    };

    // Handle create new garden
    const handleCreateGarden = () => {
        navigation.navigate('NewGarden');
    };

    // Render garden item
    const renderGardenItem = ({ item }) => (
        <TouchableOpacity
            style={styles.gardenItem}
            onPress={() => handleGardenSelect(item)}
        >
            <View style={styles.gardenInfo}>
                <Text style={styles.gardenName}>{item.name}</Text>
                <Text style={styles.gardenDimensions}>{item.getDimensionsString()}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {/* Show options menu */}}
                style={styles.optionsButton}
            >
                <Ionicons name="ellipsis-vertical" size={20} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('gardens')}</Text>
                <TouchableOpacity
                    onPress={() => {/* Show filter */}}
                    style={styles.filterButton}
                >
                    <Ionicons name="filter" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={gardens}
                keyExtractor={(item) => item.id}
                renderItem={renderGardenItem}
                style={styles.gardensList}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleCreateGarden}
            >
                <Text style={styles.addButtonText}>+ {t('new_garden')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    filterButton: {
        padding: 8,
    },
    gardensList: {
        flex: 1,
    },
    gardenItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    gardenInfo: {
        flex: 1,
    },
    gardenName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    gardenDimensions: {
        fontSize: 14,
        color: '#AAA',
    },
    optionsButton: {
        padding: 8,
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

export default GardensScreen;