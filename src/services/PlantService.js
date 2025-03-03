// src/services/PlantService.js (modificado)
import Plant from '../models/Plant';
import GrowingInfo from '../models/GrowingInfo';
import { PlantDatabaseService } from './PlantDatabaseService';

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
            return await PlantDatabaseService.getPlants();
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
            return await PlantDatabaseService.getPlantById(plantId);
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
            return await PlantDatabaseService.addPlant(plant);
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
            return await PlantDatabaseService.updatePlant(plant);
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
            await PlantDatabaseService.deletePlant(plantId);
        } catch (error) {
            console.error('Error deleting plant:', error);
            throw error;
        }
    }
};