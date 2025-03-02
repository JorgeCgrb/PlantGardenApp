/**
 * GrowingInfo model representing plant growing information throughout the year
 */
class GrowingInfo {
    /**
     * Create a new GrowingInfo instance
     * @param {Array<number>} startIndoorMonths - Months for starting seeds indoors (0-11)
     * @param {Array<number>} transplantMonths - Months for transplanting (0-11)
     * @param {Array<number>} sowOutdoorMonths - Months for direct sowing outdoors (0-11)
     * @param {Array<number>} harvestMonths - Months for harvesting (0-11)
     * @param {number} plantsPerSquare - Number of plants per square foot
     * @param {object} additionalInfo - Any additional growing information
     */
    constructor(
        startIndoorMonths = [],
        transplantMonths = [],
        sowOutdoorMonths = [],
        harvestMonths = [],
        plantsPerSquare = 1,
        additionalInfo = {}
    ) {
        this.startIndoorMonths = startIndoorMonths;
        this.transplantMonths = transplantMonths;
        this.sowOutdoorMonths = sowOutdoorMonths;
        this.harvestMonths = harvestMonths;
        this.plantsPerSquare = plantsPerSquare;
        this.additionalInfo = additionalInfo;
    }

    /**
     * Check if a given month is suitable for starting seeds indoors
     * @param {number} month - Month index (0-11)
     * @returns {boolean} True if suitable, false otherwise
     */
    canStartIndoors(month) {
        return this.startIndoorMonths.includes(month);
    }

    /**
     * Check if a given month is suitable for transplanting
     * @param {number} month - Month index (0-11)
     * @returns {boolean} True if suitable, false otherwise
     */
    canTransplant(month) {
        return this.transplantMonths.includes(month);
    }

    /**
     * Check if a given month is suitable for direct sowing outdoors
     * @param {number} month - Month index (0-11)
     * @returns {boolean} True if suitable, false otherwise
     */
    canSowOutdoors(month) {
        return this.sowOutdoorMonths.includes(month);
    }

    /**
     * Check if a given month is suitable for harvesting
     * @param {number} month - Month index (0-11)
     * @returns {boolean} True if suitable, false otherwise
     */
    canHarvest(month) {
        return this.harvestMonths.includes(month);
    }

    /**
     * Get all growing activities for a specific month
     * @param {number} month - Month index (0-11)
     * @returns {object} Object with boolean flags for each activity
     */
    getMonthActivities(month) {
        return {
            startIndoors: this.canStartIndoors(month),
            transplant: this.canTransplant(month),
            sowOutdoors: this.canSowOutdoors(month),
            harvest: this.canHarvest(month)
        };
    }
}

export default GrowingInfo;