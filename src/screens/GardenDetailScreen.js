import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGardensViewModel } from '../viewmodels/GardensViewModel';
import { usePlantsViewModel } from '../viewmodels/PlantsViewModel';
import { useTranslation } from '../utils/i18n';
import GardenGrid from '../components/garden/GardenGrid';
import GardenActions from '../components/garden/GardenActions';

const GardenDetailScreen = ({ route, navigation }) => {
    const { gardenId } = route.params;
    const { t } = useTranslation();
    const { getGardenById, updateGarden } = useGardensViewModel();
    const { getPlantById } = usePlantsViewModel();
    const [garden, setGarden] = useState(null);
    const [selectedTool, setSelectedTool] = useState('select'); // 'select', 'plant', 'erase'
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [plantsInGarden, setPlantsInGarden] = useState([]);

    // Load garden data
    useEffect(() => {
        const loadGarden = async () => {
            const gardenData = await getGardenById(gardenId);
            setGarden(gardenData);

            // Load plant details for plants in the garden
            const plantsWithDetails = await Promise.all(
                gardenData.plants.map(async (plantPlacement) => {
                    const plantDetails = await getPlantById(plantPlacement.plantId);
                    return {
                        ...plantPlacement,
                        details: plantDetails
                    };
                })
            );

            setPlantsInGarden(plantsWithDetails);
        };

        loadGarden();
    }, [gardenId]);

    // Handle cell tap in garden grid
    const handleCellTap = (x, y) => {
        if (!garden) return;

        switch (selectedTool) {
            case 'select':
                // Select plant at position
                const plantAtPosition = garden.getPlantAt(x, y);
                if (plantAtPosition) {
                    console.log('Selected plant:', plantAtPosition);
                }
                break;

            case 'plant':
                if (selectedPlant) {
                    // Add plant to garden
                    const updatedGarden = { ...garden };
                    updatedGarden.addPlant(selectedPlant.id, 'default', x, y);
                    setGarden(updatedGarden);
                    updateGarden(updatedGarden);
                }
                break;

            case 'erase':
                // Remove plant from position
                const updatedGarden = { ...garden };
                updatedGarden.removePlant(x, y);
                setGarden(updatedGarden);
                updateGarden(updatedGarden);
                break;

            default:
                break;
        }
    };

    // Handle tool selection
    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
    };

    // Handle plant selection for planting
    const handlePlantSelect = (plant) => {
        setSelectedPlant(plant);
        setSelectedTool('plant');
    };

    if (!garden) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>{t('loading')}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{garden.name}</Text>
                <TouchableOpacity
                    onPress={() => {/* Show options menu */}}
                    style={styles.optionsButton}
                >
                    <Ionicons name="ellipsis-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
            >
                <GardenGrid
                    garden={garden}
                    plantsInGarden={plantsInGarden}
                    onCellTap={handleCellTap}
                />
            </ScrollView>

            <GardenActions
                selectedTool={selectedTool}
                onToolSelect={handleToolSelect}
                onPlantSelect={handlePlantSelect}
                selectedPlant={selectedPlant}
            />
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
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    optionsButton: {
        padding: 8,
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    loadingText: {
        color: 'white',
        fontSize: 16,
        padding: 16,
        textAlign: 'center',
    },
});

export default GardenDetailScreen;