import React, { useState, useEffect, useContext, createContext } from 'react';
import { PlantService } from '../services/PlantService';

// Create context
const CalendarContext = createContext();

// Provider component
export const CalendarProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlants, setFilteredPlants] = useState([]);

    // Load plants data on mount
    useEffect(() => {
        const loadPlantsData = async () => {
            try {
                const plantsData = await PlantService.getPlants();
                setPlants(plantsData);
                setFilteredPlants(plantsData);
            } catch (error) {
                console.error('Error loading plants data:', error);
            }
        };

        loadPlantsData();
    }, []);

    // Filter plants when search query changes
    useEffect(() => {
        if (!searchQuery) {
            setFilteredPlants(plants);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = plants.filter(plant =>
            plant.name.toLowerCase().includes(query) ||
            plant.description.toLowerCase().includes(query)
        );

        setFilteredPlants(filtered);
    }, [plants, searchQuery]);

    // Get plant growing timeline
    const getPlantGrowingTimeline = (plantId) => {
        const plant = plants.find(p => p.id === plantId);
        if (!plant) return null;

        return {
            startIndoorMonths: plant.growingInfo.startIndoorMonths,
            transplantMonths: plant.growingInfo.transplantMonths,
            sowOutdoorMonths: plant.growingInfo.sowOutdoorMonths,
            harvestMonths: plant.growingInfo.harvestMonths
        };
    };

    const value = {
        plants,
        filteredPlants,
        searchQuery,
        setSearchQuery,
        getPlantGrowingTimeline
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

// Hook to use the calendar context
export const useCalendarViewModel = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendarViewModel must be used within a CalendarProvider');
    }
    return context;
};