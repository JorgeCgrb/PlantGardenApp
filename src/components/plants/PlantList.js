import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { getPlantImage } from '../../utils/assetUtils';

const PlantList = ({ plants, onPlantSelect }) => {
    if (!plants || plants.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No plants found</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={plants}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.plantCard}
                    onPress={() => onPlantSelect(item)}
                >
                    <Image
                        source={getPlantImage(item.name.toLowerCase())}
                        style={styles.plantImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.plantName}>{item.name}</Text>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 8,
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
});

export default PlantList;