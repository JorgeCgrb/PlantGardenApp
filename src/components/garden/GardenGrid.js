import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useTranslation } from '../../utils/i18n';
import PlantInGarden from './PlantInGarden';

const GardenGrid = ({ garden, plantsInGarden, onCellTap }) => {
    const { t } = useTranslation();

    // Create grid cells based on garden dimensions
    const renderGrid = () => {
        const rows = [];

        for (let y = 0; y < garden.rows; y++) {
            const cells = [];

            for (let x = 0; x < garden.columns; x++) {
                // Check if there's a plant at this position
                const plantPlacement = plantsInGarden.find(
                    plant => plant.x === x && plant.y === y
                );

                cells.push(
                    <TouchableOpacity
                        key={`cell-${x}-${y}`}
                        style={styles.cell}
                        onPress={() => onCellTap(x, y)}
                    >
                        {plantPlacement ? (
                            <PlantInGarden
                                plant={plantPlacement.details}
                                variety={plantPlacement.variety}
                            />
                        ) : null}
                    </TouchableOpacity>
                );
            }

            rows.push(
                <View key={`row-${y}`} style={styles.row}>
                    {cells}
                </View>
            );
        }

        return rows;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.dimensionsText}>
                {garden.columns} x {garden.rows} {t('grid')}
            </Text>
            <View style={styles.gridContainer}>
                {renderGrid()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    dimensionsText: {
        color: '#AAA',
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'center',
    },
    gridContainer: {
        borderWidth: 1,
        borderColor: '#444',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 40,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8B4513', // Soil color
    },
});

export default GardenGrid;