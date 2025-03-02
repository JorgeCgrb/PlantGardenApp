import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCalendarViewModel } from '../viewmodels/CalendarViewModel';
import { useTranslation } from '../utils/i18n';
import SearchBar from '../components/common/SearchBar';
import MonthsBar from '../components/calendar/MonthsBar';
import GrowingTimeline from '../components/calendar/GrowingTimeline';

const CalendarScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const {
        plants,
        filteredPlants,
        searchQuery,
        setSearchQuery,
        getPlantGrowingTimeline
    } = useCalendarViewModel();

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Get short month names
    const getMonthsShort = () => {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(i);
            return date.toLocaleString('default', { month: 'short' });
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder={t('search_plants')}
                value={searchQuery}
                onChangeText={handleSearch}
            />

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#E91E63' }]} />
                    <Text style={styles.legendText}>{t('start_inside')}</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
                    <Text style={styles.legendText}>{t('transplant')}</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#9C27B0' }]} />
                    <Text style={styles.legendText}>{t('sow_outside')}</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#009688' }]} />
                    <Text style={styles.legendText}>{t('begin_harvest')}</Text>
                </View>
            </View>

            <MonthsBar months={getMonthsShort()} />

            <FlatList
                data={filteredPlants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.timelineItem}>
                        <View style={styles.plantInfo}>
                            <Text style={styles.plantName}>{item.name}</Text>
                        </View>
                        <GrowingTimeline
                            growingInfo={item.growingInfo}
                            months={12}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        backgroundColor: '#1E1E1E',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginRight: 4,
    },
    legendText: {
        color: 'white',
        fontSize: 12,
    },
    timelineItem: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    plantInfo: {
        width: 100,
        paddingHorizontal: 12,
    },
    plantName: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CalendarScreen;