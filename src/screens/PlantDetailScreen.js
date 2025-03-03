import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePlantsViewModel } from '../viewmodels/PlantsViewModel';
import { useTranslation } from '../utils/i18n';
import GrowingTimeline from '../components/calendar/GrowingTimeline';
import { getPlantImage } from '../utils/assetUtils';

const PlantDetailScreen = ({ route, navigation }) => {
    const { plantId } = route.params;
    const { t } = useTranslation();
    const { getPlantById } = usePlantsViewModel();
    const [plant, setPlant] = useState(null);

    // Load plant data
    useEffect(() => {
        const loadPlant = async () => {
            const plantData = await getPlantById(plantId);
            setPlant(plantData);
        };

        loadPlant();
    }, [plantId]);

    // Get short month names
    const getMonthsShort = () => {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(i);
            return date.toLocaleString('default', { month: 'short' });
        });
    };

    if (!plant) {
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
                <Text style={styles.title}>{plant.name}</Text>
                <TouchableOpacity
                    onPress={() => {/* Show options menu */}}
                    style={styles.optionsButton}
                >
                    <Ionicons name="ellipsis-vertical" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={getPlantImage(plant.name.toLowerCase())}
                        style={styles.plantImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>{t('description')}</Text>
                    <Text style={styles.description}>{plant.description || t('no_description')}</Text>

                    <Text style={styles.sectionTitle}>{t('growing_calendar')}</Text>
                    <View style={styles.calendarContainer}>
                        <View style={styles.monthsRow}>
                            {getMonthsShort().map((month, index) => (
                                <Text key={index} style={styles.monthText}>{month}</Text>
                            ))}
                        </View>
                        <GrowingTimeline
                            growingInfo={plant.growingInfo}
                            months={12}
                        />
                    </View>

                    <View style={styles.growingInfoContainer}>
                        <View style={styles.infoItem}>
                            <Ionicons name="sunny-outline" size={24} color="#FF9800" />
                            <Text style={styles.infoLabel}>{t('sun_requirements')}</Text>
                            <Text style={styles.infoValue}>{plant.growingInfo.additionalInfo.sunRequirements || t('full_sun')}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Ionicons name="water-outline" size={24} color="#2196F3" />
                            <Text style={styles.infoLabel}>{t('water_needs')}</Text>
                            <Text style={styles.infoValue}>{plant.growingInfo.additionalInfo.waterNeeds || t('moderate')}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Ionicons name="grid-outline" size={24} color="#4CAF50" />
                            <Text style={styles.infoLabel}>{t('plants_per_square')}</Text>
                            <Text style={styles.infoValue}>{plant.growingInfo.plantsPerSquare}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    loadingText: {
        color: 'white',
        fontSize: 16,
        padding: 16,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#1E1E1E',
    },
    plantImage: {
        width: 150,
        height: 150,
    },
    infoContainer: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 12,
    },
    description: {
        color: '#DDD',
        lineHeight: 22,
        marginBottom: 16,
    },
    calendarContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    monthsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    monthText: {
        color: 'white',
        fontSize: 10,
        width: 24,
        textAlign: 'center',
    },
    growingInfoContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        padding: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoLabel: {
        color: 'white',
        marginLeft: 12,
        flex: 1,
    },
    infoValue: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default PlantDetailScreen;