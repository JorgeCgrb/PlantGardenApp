import AsyncStorage from '@react-native-async-storage/async-storage';
import Plant from '../models/Plant';
import Garden from '../models/Garden';
import GrowingInfo from '../models/GrowingInfo';

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
            'Chives',
            'alliums',
            'assets/images/plants/alliums/chives.png',
            'Chives are perennial herbs with mild onion flavor. They produce edible purple flowers that attract pollinators.',
            new GrowingInfo(
                [1, 2, 3], // Start indoor months (Feb-Apr)
                [3, 4, 5], // Transplant months (Apr-Jun)
                [4, 5, 6, 7, 8], // Sow outdoor months (May-Sep)
                [5, 6, 7, 8, 9, 10], // Harvest months (Jun-Nov)
                16, // Plants per square foot
                { sunRequirements: 'Full Sun', waterNeeds: 'Moderate' }
            )
        ),
        new Plant(
            'garlic',
            'Garlic',
            'alliums',
            'assets/images/plants/alliums/garlic.png',
            'Garlic is a pungent bulb vegetable that's easy to grow. Plant in fall for harvest the following summer.',
            new GrowingInfo(
                [], // Start indoor months
                [], // Transplant months
                [8, 9, 10], // Sow outdoor months (Sep-Nov)
                [5, 6, 7], // Harvest months (Jun-Aug)
                9, // Plants per square foot
                { sunRequirements: 'Full Sun', waterNeeds: 'Low' }
            )
        ),
        new Plant(
            'leeks',
            'Leeks',
            'alliums',
            'assets/images/plants/alliums/leeks.png',
            'Leeks are cold-hardy alliums with a mild onion flavor. They require a long growing season.',
            new GrowingInfo(
                [0, 1, 2], // Start indoor months (Jan-Mar)
                [3, 4, 5], // Transplant months (Apr-Jun)
                [3, 4, 5], // Sow outdoor months (Apr-Jun)
                [7, 8, 9, 10, 11], // Harvest months (Aug-Dec)
                9, // Plants per square foot
                { sunRequirements: 'Full Sun', waterNeeds: 'Moderate' }
            )
        ),
        new Plant(
            'onions',
            'Onions',
            'alliums',
            'assets/images/plants/alliums/onions.png',
            'Onions are versatile vegetables grown for their bulbs. Choose varieties based on your daylight hours.',
            new GrowingInfo(
                [0, 1, 2], // Start indoor months (Jan-Mar)
                [3, 4], // Transplant months (Apr-May)
                [3, 4], // Sow outdoor months (Apr-May)
                [6, 7, 8], // Harvest months (Jul-Sep)
                9, // Plants per square foot
                { sunRequirements: 'Full Sun', waterNeeds: 'Moderate' }
            )
        ),
        new Plant(
            'shallots',
            'Shallots',
            'alliums',
            'assets/images/plants/alliums/shallots.png',
            'Shallots are milder than onions and grow in clusters. They're easy to grow and store well.',
            new GrowingInfo(
                [], // Start indoor months
                [], // Transplant months
                [1, 2, 3, 9, 10], // Sow outdoor months (Feb-Apr, Oct-Nov)
                [6, 7, 8], // Harvest months (Jul-Sep)
                9, // Plants per square foot
                { sunRequirements: 'Full Sun', waterNeeds: 'Low to Moderate' }
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
            'Bancal horizontal',
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
            'Bancal 1',
            12,
            3,
            []
        )
    ];
};