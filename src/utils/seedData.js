// src/utils/seedData.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Plant from '../models/Plant';
import Garden from '../models/Garden';
import GrowingInfo from '../models/GrowingInfo';
import i18next from 'i18next';

// Storage keys
const STORAGE_KEYS = {
    GARDENS: 'gardens',
    PLANTS: 'plants'
};

/**
 * Seed initial application data
 */
export const seedInitialData = async () => {
    try {
        // Seed plants data
        const plants = generatePlantsData();
        await AsyncStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(plants));

        // Seed sample gardens
        const gardens = generateGardensData();
        await AsyncStorage.setItem(STORAGE_KEYS.GARDENS, JSON.stringify(gardens));

        console.log('Seed data loaded successfully');
    } catch (error) {
        console.error('Error seeding initial data:', error);
        throw error;
    }
};

/**
 * Generate plants data
 * @returns {Array} Array of plant objects
 */
const generatePlantsData = () => {
    return [
        new Plant(
            'chives',
            'Chives', // Mantener el nombre en inglés como ID
            'alliums',
            'chives', // Nombre para buscar la imagen
            i18next.t('chives_description', 'Chives are perennial herbs with mild onion flavor. They produce edible purple flowers that attract pollinators.'),
            new GrowingInfo(
                [1, 2, 3], // Start indoor months (Feb-Apr)
                [3, 4, 5], // Transplant months (Apr-Jun)
                [4, 5, 6, 7, 8], // Sow outdoor months (May-Sep)
                [5, 6, 7, 8, 9, 10], // Harvest months (Jun-Nov)
                16, // Plants per square foot
                {
                    sunRequirements: 'full_sun',
                    waterNeeds: 'moderate'
                }
            )
        ),
        new Plant(
            'garlic',
            'Garlic',
            'alliums',
            'garlic',
            i18next.t('garlic_description', 'Garlic is a pungent bulb vegetable that is easy to grow. Plant in fall for harvest the following summer.'),
            new GrowingInfo(
                [], // Start indoor months
                [], // Transplant months
                [8, 9, 10], // Sow outdoor months (Sep-Nov)
                [5, 6, 7], // Harvest months (Jun-Aug)
                9, // Plants per square foot
                {
                    sunRequirements: 'full_sun',
                    waterNeeds: 'low'
                }
            )
        ),
        new Plant(
            'leeks',
            'Leeks',
            'alliums',
            'leeks',
            i18next.t('leeks_description', 'Leeks are cold-hardy alliums with a mild onion flavor. They require a long growing season.'),
            new GrowingInfo(
                [0, 1, 2], // Start indoor months (Jan-Mar)
                [3, 4, 5], // Transplant months (Apr-Jun)
                [3, 4, 5], // Sow outdoor months (Apr-Jun)
                [7, 8, 9, 10, 11], // Harvest months (Aug-Dec)
                9, // Plants per square foot
                {
                    sunRequirements: 'full_sun',
                    waterNeeds: 'moderate'
                }
            )
        ),
        new Plant(
            'onions',
            'Onions',
            'alliums',
            'onions',
            i18next.t('onions_description', 'Onions are versatile vegetables grown for their bulbs. Choose varieties based on your daylight hours.'),
            new GrowingInfo(
                [0, 1, 2], // Start indoor months (Jan-Mar)
                [3, 4], // Transplant months (Apr-May)
                [3, 4], // Sow outdoor months (Apr-May)
                [6, 7, 8], // Harvest months (Jul-Sep)
                9, // Plants per square foot
                {
                    sunRequirements: 'full_sun',
                    waterNeeds: 'moderate'
                }
            )
        ),
        new Plant(
            'shallots',
            'Shallots',
            'alliums',
            'shallots',
            i18next.t('shallots_description', 'Shallots are milder than onions and grow in clusters. They are easy to grow and store well.'),
            new GrowingInfo(
                [], // Start indoor months
                [], // Transplant months
                [1, 2, 3, 9, 10], // Sow outdoor months (Feb-Apr, Oct-Nov)
                [6, 7, 8], // Harvest months (Jul-Sep)
                9, // Plants per square foot
                {
                    sunRequirements: 'full_sun',
                    waterNeeds: 'low_to_moderate'
                }
            )
        ),
        // Add more plants as needed
    ];
};

/**
 * Generate gardens data
 * @returns {Array} Array of garden objects
 */
const generateGardensData = () => {
    return [
        new Garden(
            'garden-1',
            i18next.t('default_garden_name', 'Horizontal Bed'),
            3,
            24,
            [
                { plantId: 'garlic', variety: 'default', x: 2, y: 0 },
                { plantId: 'leeks', variety: 'default', x: 5, y: 1 },
                { plantId: 'onions', variety: 'default', x: 8, y: 1 }
            ]
        ),
        new Garden(
            'garden-2',
            i18next.t('square_garden_name', 'Square Bed'),
            12,
            3,
            []
        )
    ];
};