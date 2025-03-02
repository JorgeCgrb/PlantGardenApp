import React, { useState, useEffect, useContext, createContext } from 'react';
import { StorageService } from '../services/StorageService';

// Create context
const GardensContext = createContext();

// Provider component
export const GardensProvider = ({ children }) => {
    const [gardens, setGardens] = useState([]);

    // Load gardens data on mount
    useEffect(() => {
        const loadGardensData = async () => {
            try {
                const gardensData = await StorageService.getGardens();
                setGardens(gardensData);
            } catch (error) {
                console.error('Error loading gardens data:', error);
            }
        };

        loadGardensData();
    }, []);

    // Get garden by ID
    const getGardenById = async (gardenId) => {
        try {
            return await StorageService.getGardenById(gardenId);
        } catch (error) {
            console.error('Error getting garden:', error);
            return null;
        }
    };

    // Add new garden
    const addGarden = async (garden) => {
        try {
            const newGarden = await StorageService.addGarden(garden);
            setGardens(prevGardens => [...prevGardens, newGarden]);
            return newGarden;
        } catch (error) {
            console.error('Error adding garden:', error);
            throw error;
        }
    };

    // Update garden
    const updateGarden = async (garden) => {
        try {
            const updatedGarden = await StorageService.updateGarden(garden);
            setGardens(prevGardens =>
                prevGardens.map(g => g.id === garden.id ? updatedGarden : g)
            );
            return updatedGarden;
        } catch (error) {
            console.error('Error updating garden:', error);
            throw error;
        }
    };

    // Delete garden
    const deleteGarden = async (gardenId) => {
        try {
            await StorageService.deleteGarden(gardenId);
            setGardens(prevGardens => prevGardens.filter(g => g.id !== gardenId));
        } catch (error) {
            console.error('Error deleting garden:', error);
            throw error;
        }
    };

    const value = {
        gardens,
        getGardenById,
        addGarden,
        updateGarden,
        deleteGarden
    };

    return <GardensContext.Provider value={value}>{children}</GardensContext.Provider>;
};

// Hook to use the gardens context
export const useGardensViewModel = () => {
    const context = useContext(GardensContext);
    if (!context) {
        throw new Error('useGardensViewModel must be used within a GardensProvider');
    }
    return context;
};