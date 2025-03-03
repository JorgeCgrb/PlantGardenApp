// src/services/DatabaseService.js
import SQLite from 'react-native-sqlite-storage';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

SQLite.enablePromise(true);

/**
 * Service for handling SQLite database operations
 */
export class DatabaseService {
    static db = null;

    /**
     * Initialize the database
     * @returns {Promise<SQLite.SQLiteDatabase>} Database instance
     */
    static async initDB() {
        if (this.db) {
            return this.db;
        }

        try {
            // For Android, we need to copy the pre-populated database from assets to app directory
            if (Platform.OS === 'android') {
                const destPath = `${RNFS.DocumentDirectoryPath}/gardening.db`;
                const exists = await RNFS.exists(destPath);

                if (!exists) {
                    await RNFS.copyFileAssets('gardening.db', destPath);
                    console.log('Database copied to app directory');
                }

                this.db = await SQLite.openDatabase({
                    name: 'gardening.db',
                    location: 'default'
                });
            } else {
                // For iOS, the database file should be included in the app bundle
                this.db = await SQLite.openDatabase({
                    name: 'gardening.db',
                    location: 'Library'
                });
            }

            console.log('Database initialized successfully');
            return this.db;
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    /**
     * Execute a SQL query with parameters
     * @param {string} query - SQL query to execute
     * @param {Array} params - Parameters for the query
     * @returns {Promise<any>} Query result
     */
    static async executeSql(query, params = []) {
        try {
            const db = await this.initDB();
            const [results] = await db.executeSql(query, params);
            return results;
        } catch (error) {
            console.error(`Error executing query: ${query}`, error);
            throw error;
        }
    }

    /**
     * Get all plants from the database
     * @returns {Promise<Array>} Array of plants
     */
    static async getPlants() {
        try {
            const results = await this.executeSql('SELECT * FROM Especies');
            const plants = [];

            for (let i = 0; i < results.rows.length; i++) {
                plants.push(results.rows.item(i));
            }

            return plants;
        } catch (error) {
            console.error('Error getting plants:', error);
            return [];
        }
    }

    /**
     * Get plant by name
     * @param {string} plantName - Plant name
     * @returns {Promise<object|null>} Plant object or null if not found
     */
    static async getPlantByName(plantName) {
        try {
            const results = await this.executeSql(
                'SELECT * FROM Especies WHERE Planta = ?',
                [plantName]
            );

            if (results.rows.length > 0) {
                return results.rows.item(0);
            }

            return null;
        } catch (error) {
            console.error('Error getting plant by name:', error);
            return null;
        }
    }
}