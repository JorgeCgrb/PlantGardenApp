/**
 * Plant model representing a plant type with its growing information
 */
class Plant {
    /**
     * Create a new Plant instance
     * @param {string} id - Unique identifier for the plant
     * @param {string} name - Plant name
     * @param {string} category - Plant category (e.g., 'alliums', 'cole_crops')
     * @param {string} imagePath - Path to plant image
     * @param {string} description - Plant description
     * @param {GrowingInfo} growingInfo - Growing information for the plant
     * @param {object} varieties - Available varieties of this plant
     */
    constructor(id, name, category, imagePath, description, growingInfo, varieties = {}) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.imagePath = imagePath;
        this.description = description;
        this.growingInfo = growingInfo;
        this.varieties = varieties;
    }

    /**
     * Get the list of months suitable for starting seeds indoors
     * @returns {Array<number>} Array of month indices (0-11) suitable for starting seeds indoors
     */
    getStartIndoorMonths() {
        return this.growingInfo.startIndoorMonths;
    }

    /**
     * Get the list of months suitable for transplanting
     * @returns {Array<number>} Array of month indices (0-11) suitable for transplanting
     */
    getTransplantMonths() {
        return this.growingInfo.transplantMonths;
    }

    /**
     * Get the list of months suitable for sowing directly outdoors
     * @returns {Array<number>} Array of month indices (0-11) suitable for direct sowing
     */
    getSowOutdoorMonths() {
        return this.growingInfo.sowOutdoorMonths;
    }

    /**
     * Get the list of months suitable for harvesting
     * @returns {Array<number>} Array of month indices (0-11) suitable for harvesting
     */
    getHarvestMonths() {
        return this.growingInfo.harvestMonths;
    }

    /**
     * Get spacing information for square foot gardening
     * @returns {number} Number of plants per square foot
     */
    getPlantsPerSquare() {
        return this.growingInfo.plantsPerSquare;
    }
}

export default Plant;