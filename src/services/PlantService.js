import AsyncStorage from '@react-native-async-storage/async-storage';
import Plant from '../models/Plant';
import GrowingInfo from '../models/GrowingInfo';

// Storage keys
const STORAGE_KEYS = {
    PLANTS: 'plants'
};

/**
 * Service for plant data operations
 */
export const PlantService = {
    /**
     * Get all plants
     * @returns {Promise<Array>} Array of Plant objects
     */
    async getPlants() {
        try {
            const plantsData = await AsyncStorage.getItem(STORAGE_KEYS.PLANTS);

            if (!plantsData) return [];

            // Parse and convert to Plant objects
            const plants = JSON.parse(plantsData);
            return plants.map(plantData => {
                // Create GrowingInfo object
                const growingInfo = new GrowingInfo(
                    plantData.growingInfo.startIndoorMonths,
                    plantData.growingInfo.transplantMonths,
                    plantData.growingInfo.sowOutdoorMonths,
                    plantData.growingInfo.harvestMonths,
                    plantData.growingInfo.plantsPerSquare,
                    plantData.growingInfo.additionalInfo
                );

                // Create Plant object
                return new Plant(
                    plantData.id,
                    plantData.name,
                    plantData.category,
                    plantData.imagePath,
                    plantData.description,
                    growingInfo,
                    plantData.varieties
                );
            });
        } catch (error) {
            console.error('Error getting plants:', error);
            return [];
        }
    },

    /**
     * Get plant by ID
     * @param {string} plantId - Plant ID
     * @returns {Promise<Plant|null>} Plant object or null if not found
     */
    async getPlantById(plantId) {
        try {
            const plants = await this.getPlants();
            return plants.find(plant => plant.id === plantId) || null;
        } catch (error) {
            console.error('Error getting plant by ID:', error);
            return null;
        }
    },

    /**
     * Add a new plant
     * @param {Plant} plant - Plant object
     * @returns {Promise<Plant>} Added plant
     */
    async addPlant(plant) {
        try {
            const plants = await this.getPlants();

            // Add the new plant
            plants.push(plant);

            // Save to storage
            await AsyncStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(plants));

            return plant;
        } catch (error) {
            console.error('Error adding plant:', error);
            throw error;
        }
    },

    /**
     * Update an existing plant
     * @param {Plant} plant - Plant object with updated data
     * @returns {Promise<Plant>} Updated plant
     */
    async updatePlant(plant) {
        try {
            const plants = await this.getPlants();

            // Find and update plant
            const updatedPlants = plants.map(p =>
                p.id === plant.id ? plant : p
            );

            // Save to storage
            await AsyncStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(updatedPlants));

            return plant;
        } catch (error) {
            console.error('Error updating plant:', error);
            throw error;
        }
    },

    /**
     * Delete a plant
     * @param {string} plantId - Plant ID
     * @returns {Promise<void>}
     */
    async deletePlant(plantId) {
        try {
            const plants = await this.getPlants();

            // Filter out the deleted plant
            const updatedPlants = plants.filter(plant => plant.id !== plantId);

            // Save to storage
            await AsyncStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(updatedPlants));
        } catch (error) {
            console.error('Error deleting plant:', error);
            throw error;
        }
    }
};