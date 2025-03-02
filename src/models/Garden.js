/**
 * Garden model representing a garden layout with plants
 */
class Garden {
    /**
     * Create a new Garden instance
     * @param {string} id - Unique identifier for the garden
     * @param {string} name - Garden name
     * @param {number} rows - Number of rows in the garden grid
     * @param {number} columns - Number of columns in the garden grid
     * @param {Array} plants - Array of plants placed in the garden
     */
    constructor(id, name, rows, columns, plants = []) {
        this.id = id;
        this.name = name;
        this.rows = rows;
        this.columns = columns;
        this.plants = plants; // Array of {plantId, variety, x, y}
    }

    /**
     * Add a plant to the garden at specified coordinates
     * @param {string} plantId - ID of the plant to add
     * @param {string} variety - Plant variety (optional)
     * @param {number} x - X coordinate (column)
     * @param {number} y - Y coordinate (row)
     * @returns {boolean} Success or failure
     */
    addPlant(plantId, variety, x, y) {
        // Validate coordinates
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return false;
        }

        // Check if position is already occupied
        const isOccupied = this.plants.some(plant =>
            plant.x === x && plant.y === y
        );

        if (isOccupied) {
            return false;
        }

        this.plants.push({
            plantId,
            variety: variety || "default",
            x,
            y
        });

        return true;
    }

    /**
     * Remove a plant from the garden at specified coordinates
     * @param {number} x - X coordinate (column)
     * @param {number} y - Y coordinate (row)
     * @returns {boolean} Success or failure
     */
    removePlant(x, y) {
        const initialLength = this.plants.length;
        this.plants = this.plants.filter(plant =>
            !(plant.x === x && plant.y === y)
        );

        return this.plants.length < initialLength;
    }

    /**
     * Get a plant at specified coordinates
     * @param {number} x - X coordinate (column)
     * @param {number} y - Y coordinate (row)
     * @returns {object|null} Plant object or null if no plant at coordinates
     */
    getPlantAt(x, y) {
        return this.plants.find(plant =>
            plant.x === x && plant.y === y
        ) || null;
    }

    /**
     * Get garden dimensions as a string
     * @returns {string} Dimensions in format "columns x rows"
     */
    getDimensionsString() {
        return `${this.columns}x${this.rows}`;
    }
}

export default Garden;