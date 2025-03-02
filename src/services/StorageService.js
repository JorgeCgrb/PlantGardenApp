import AsyncStorage from '@react-native-async-storage/async-storage';
import Garden from '../models/Garden';
import { seedInitialData } from '../utils/seedData';

// Storage keys
const STORAGE_KEYS = {
    GARDENS: 'gardens',
    PLANTS: 'plants',
    INITIALIZED: 'initialized'
};

/**
 * Service for local storage operations
 */
export const StorageService = {
    /**
     * Initialize the database with seed data if needed
     */
    async initializeDatabase() {
        try {
            const initialized = await AsyncStorage.getItem(STORAGE_KEYS.INITIALIZED);

            if (!initialized) {
                console.log('Initializing database with seed data...');

                // Seed initial plants and gardens data
                await seedInitialData();

                // Mark as initialized
                await AsyncStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');

                console.log('Database initialized successfully');
            }
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    },

    /**
     * Get all gardens
     * @returns {Promise<Array>} Array of Garden objects
     */
    async getGardens() {
        try {
            const gardensData = await AsyncStorage.getItem(STORAGE_KEYS.GARDENS);

            if (!gardensData) return [];

            // Parse and convert to Garden objects
            const gardens = JSON.parse(gardensData);
            return gardens.map(gardenData => {
                return new Garden(
                    gardenData.id,
                    gardenData.name,
                    gardenData.rows,
                    gardenData.columns,
                    gardenData.plants
                );
            });
        } catch (error) {
            console.error('Error getting gardens:', error);
            return [];
        }
    },

    /**
     * Get garden by ID
     * @param {string} gardenId - Garden ID
     * @returns {Promise<Garden|null>} Garden object or null if not found
     */
    async getGardenById(gardenId) {
        try {
            const gardens = await this.getGardens();
            const gardenData = gardens.find(garden => garden.id === gardenId);

            if (!gardenData) return null;

            return gardenData;
        } catch (error) {
            console.error('Error getting garden by ID:', error);
            return null;
        }
    },

    /**
     * Add a new garden
     * @param {Garden} garden - Garden object
     * @returns {Promise<Garden>} Added garden
     */
    async addGarden(garden) {
        try {
            const gardens = await this.getGardens();

            // Add the new garden
            gardens.push(garden);

            // Save to storage
            await AsyncStorage.setItem(STORAGE_KEYS.GARDENS, JSON.stringify(gardens));

            return garden;
        } catch (error) {
            console.error('Error adding garden:', error);
            throw error;
        }
    },

    /**
     * Update an existing garden
     * @param {Garden} garden - Garden object with updated data
     * @returns {Promise<Garden>} Updated garden
     */
    async updateGarden(garden) {
        try {
            const gardens = await this.getGardens();

            // Find and update garden
            const updatedGardens = gardens.map(g =>
                g.id === garden.id ? garden : g
            );

            // Save to storage
            await AsyncStorage.setItem(STORAGE_KEYS.GARDENS, JSON.stringify(updatedGardens));

            return garden;
        } catch (error) {
            console.error('Error updating garden:', error);
            throw error;
        }
    },

    /**
     * Delete a garden
     * @param {string} gardenId - Garden ID
     * @returns {Promise<void>}
     */
    async deleteGarden(gardenId) {
        try {
            const gardens = await this.getGardens();

            // Filter out the deleted garden
            const updatedGardens = gardens.filter(garden => garden.id !== gardenId);

            // Save to storage
            await AsyncStorage.setItem(STORAGE_KEYS.GARDENS, JSON.stringify(updatedGardens));
        } catch (error) {
            console.error('Error deleting garden:', error);
            throw error;
        }
    }
};

// Export function to initialize database
export const initializeDatabase = StorageService.initializeDatabase;