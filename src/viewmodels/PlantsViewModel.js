import React, { useState, useEffect, useContext, createContext } from 'react';
import { PlantService } from '../services/PlantService';

// Create context
const PlantsContext = createContext();

// Provider component
export const PlantsProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlants, setFilteredPlants] = useState([]);

    // Load plants data on mount
    useEffect(() => {
        const loadPlantsData = async () => {
            try {
                const plantsData = await PlantService.getPlants();
                setPlants(plantsData);

                // Extract unique categories
                const uniqueCategories = [...new Set(plantsData.map(plant => plant.category))];
                setCategories(uniqueCategories);

                setFilteredPlants(plantsData);
            } catch (error) {
                console.error('Error loading plants data:', error);
            }
        };

        loadPlantsData();
    }, []);

    // Filter plants when search query or category changes
    useEffect(() => {
        let filtered = plants;

        // Filter by category if selected
        if (selectedCategory) {
            filtered = filtered.filter(plant => plant.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(plant =>
                plant.name.toLowerCase().includes(query) ||
                plant.description.toLowerCase().includes(query)
            );
        }

        setFilteredPlants(filtered);
    }, [plants, selectedCategory, searchQuery]);

    // Get plant by ID
    const getPlantById = async (plantId) => {
        return await PlantService.getPlantById(plantId);
    };

    // Add new plant
    const addPlant = async (plant) => {
        const newPlant = await PlantService.addPlant(plant);
        setPlants(prevPlants => [...prevPlants, newPlant]);
        return newPlant;
    };

    // Update plant
    const updatePlant = async (plant) => {
        const updatedPlant = await PlantService.updatePlant(plant);
        setPlants(prevPlants =>
            prevPlants.map(p => p.id === plant.id ? updatedPlant : p)
        );
        return updatedPlant;
    };

    // Delete plant
    const deletePlant = async (plantId) => {
        await PlantService.deletePlant(plantId);
        setPlants(prevPlants => prevPlants.filter(p => p.id !== plantId));
    };

    const value = {
        plants,
        categories,
        selectedCategory,
        searchQuery,
        filteredPlants,
        setSelectedCategory,
        setSearchQuery,
        getPlantById,
        addPlant,
        updatePlant,
        deletePlant
    };

    return <PlantsContext.Provider value={value}>{children}</PlantsContext.Provider>;
};

// Hook to use the plants context
export const usePlantsViewModel = () => {
    const context = useContext(PlantsContext);
    if (!context) {
        throw new Error('usePlantsViewModel must be used within a PlantsProvider');
    }
    return context;
};