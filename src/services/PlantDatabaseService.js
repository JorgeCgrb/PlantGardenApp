// src/services/PlantDatabaseService.js
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import Plant from '../models/Plant';
import GrowingInfo from '../models/GrowingInfo';

export class PlantDatabaseService {
    static db = null;

    /**
     * Inicializa la conexión a la base de datos
     * @returns {SQLite.WebSQLDatabase} Instancia de base de datos
     */
    static getDatabase() {
        if (this.db) {
            return this.db;
        }

        this.db = SQLite.openDatabase('gardening.db');
        return this.db;
    }

    /**
     * Inicializa las tablas de la base de datos si no existen
     */
    static async initDatabase() {
        return new Promise((resolve, reject) => {
            try {
                const db = this.getDatabase();
                const initialPlants = [
                        {
                            id: 'albahaca',  // ID único
                            name: 'Albahaca',
                            // ... resto del objeto
                        },
                        {
                            id: 'tomate',    // ID único
                            name: 'Tomate',
                            // ... resto del objeto
                        },
                        // ... más plantas
                    ];
                // Crear la tabla de plantas si no existe
                db.transaction(tx => {
                    tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS plants (
                            id TEXT PRIMARY KEY NOT NULL,
                            name TEXT NOT NULL,
                            category TEXT,
                            imagePath TEXT,
                            description TEXT,
                            startIndoorMonths TEXT,
                            transplantMonths TEXT,
                            sowOutdoorMonths TEXT,
                            harvestMonths TEXT,
                            plantsPerSquare INTEGER,
                            additionalInfo TEXT,
                            varieties TEXT
                        );`,
                        [],
                        () => {
                            console.log('Database initialized successfully');
                            this.checkAndImportInitialData()
                                .then(resolve)
                                .catch(reject);
                        },
                        (_, error) => {
                            console.error('Error creating tables:', error);
                            reject(error);
                        }
                    );
                });
            } catch (error) {
                console.error('Error initializing database:', error);
                reject(error);
            }
        });
    }

    /**
     * Verifica si hay datos en la tabla y en caso contrario importa los datos iniciales
     */
    static async checkAndImportInitialData() {
        const db = this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT COUNT(*) as count FROM plants',
                    [],
                    (_, result) => {
                        const count = result.rows._array[0].count;
                        if (count === 0) {
                            this.importInitialData()
                                .then(resolve)
                                .catch(reject);
                        } else {
                            console.log(`Database already has ${count} plants`);
                            resolve();
                        }
                    },
                    (_, error) => {
                        console.error('Error checking data:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    /**
     * Importa los datos iniciales desde la estructura en memoria
     */
    static async importInitialData() {
        const db = this.getDatabase();

        // Datos de ejemplo para importar
        const initialPlants = [
            {
                id: 'albahaca',
                name: 'Albahaca',
                category: 'Lamiáceas',
                imagePath: 'albahaca',
                description: 'Hierba aromática mediterránea',
                startIndoorMonths: JSON.stringify([2, 3]),
                transplantMonths: JSON.stringify([4, 5]),
                sowOutdoorMonths: JSON.stringify([4, 5, 6]),
                harvestMonths: JSON.stringify([6, 7, 8, 9]),
                plantsPerSquare: 1,
                additionalInfo: JSON.stringify({
                    sunRequirements: 'full_sun',
                    waterNeeds: 'moderate'
                }),
                varieties: JSON.stringify({})
            },
            {
                id: 'tomate',
                name: 'Tomate',
                category: 'Solanáceas',
                imagePath: 'tomate',
                description: 'Fruto versátil solanáceo',
                startIndoorMonths: JSON.stringify([1, 2, 3]),
                transplantMonths: JSON.stringify([4, 5]),
                sowOutdoorMonths: JSON.stringify([4, 5, 6]),
                harvestMonths: JSON.stringify([7, 8, 9, 10]),
                plantsPerSquare: 1,
                additionalInfo: JSON.stringify({
                    sunRequirements: 'full_sun',
                    waterNeeds: 'high'
                }),
                varieties: JSON.stringify({})
            },
            {
                id: 'zanahoria',
                name: 'Zanahoria',
                category: 'Apiáceas',
                imagePath: 'zanahoria',
                description: 'Raíz anaranjada nutritiva',
                startIndoorMonths: JSON.stringify([]),
                transplantMonths: JSON.stringify([]),
                sowOutdoorMonths: JSON.stringify([3, 4, 5, 6, 7, 8]),
                harvestMonths: JSON.stringify([6, 7, 8, 9, 10, 11]),
                plantsPerSquare: 16,
                additionalInfo: JSON.stringify({
                    sunRequirements: 'full_sun',
                    waterNeeds: 'moderate'
                }),
                varieties: JSON.stringify({})
            },
            {
                id: 'ajo',
                name: 'Ajo',
                category: 'Liliáceas',
                imagePath: 'ajo',
                description: 'Bulbo aromático de uso universal',
                startIndoorMonths: JSON.stringify([]),
                transplantMonths: JSON.stringify([]),
                sowOutdoorMonths: JSON.stringify([9, 10, 11]),
                harvestMonths: JSON.stringify([6, 7, 8]),
                plantsPerSquare: 4,
                additionalInfo: JSON.stringify({
                    sunRequirements: 'full_sun',
                    waterNeeds: 'low'
                }),
                varieties: JSON.stringify({})
            },
            {
                id: 'romero',
                name: 'Romero',
                category: 'Lamiáceas',
                imagePath: 'romero',
                description: 'Arbusto aromático mediterráneo',
                startIndoorMonths: JSON.stringify([2, 3]),
                transplantMonths: JSON.stringify([4, 5]),
                sowOutdoorMonths: JSON.stringify([4, 5]),
                harvestMonths: JSON.stringify([6, 7, 8, 9, 10, 11, 12]),
                plantsPerSquare: 1,
                additionalInfo: JSON.stringify({
                    sunRequirements: 'full_sun',
                    waterNeeds: 'low'
                }),
                varieties: JSON.stringify({})
            }
        ];

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                let completed = 0;

                for (const plant of initialPlants) {
                    tx.executeSql(
                        `INSERT INTO plants (
                            id, name, category, imagePath, description,
                            startIndoorMonths, transplantMonths, sowOutdoorMonths,
                            harvestMonths, plantsPerSquare, additionalInfo, varieties
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            plant.id, plant.name, plant.category, plant.imagePath, plant.description,
                            plant.startIndoorMonths, plant.transplantMonths, plant.sowOutdoorMonths,
                            plant.harvestMonths, plant.plantsPerSquare, plant.additionalInfo, plant.varieties
                        ],
                        (_, result) => {
                            completed++;
                            if (completed === initialPlants.length) {
                                console.log(`Imported ${completed} plants successfully`);
                                resolve();
                            }
                        },
                        (_, error) => {
                            console.error('Error importing plant:', error);
                            reject(error);
                        }
                    );
                }
            });
        });
    }

    /**
     * Obtiene todas las plantas de la base de datos
     * @returns {Promise<Array<Plant>>} Array de objetos Plant
     */
    static async getPlants() {
        const db = this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM plants',
                    [],
                    (_, { rows }) => {
                        const plants = [];

                        for (let i = 0; i < rows.length; i++) {
                            const row = rows.item(i);

                            // Convertir las cadenas JSON a objetos
                            const startIndoorMonths = JSON.parse(row.startIndoorMonths || '[]');
                            const transplantMonths = JSON.parse(row.transplantMonths || '[]');
                            const sowOutdoorMonths = JSON.parse(row.sowOutdoorMonths || '[]');
                            const harvestMonths = JSON.parse(row.harvestMonths || '[]');
                            const additionalInfo = JSON.parse(row.additionalInfo || '{}');
                            const varieties = JSON.parse(row.varieties || '{}');

                            // Crear objeto GrowingInfo
                            const growingInfo = new GrowingInfo(
                                startIndoorMonths,
                                transplantMonths,
                                sowOutdoorMonths,
                                harvestMonths,
                                row.plantsPerSquare,
                                additionalInfo
                            );

                            // Crear objeto Plant
                            const plant = new Plant(
                                row.id,
                                row.name,
                                row.category,
                                row.imagePath,
                                row.description,
                                growingInfo,
                                varieties
                            );

                            plants.push(plant);
                        }

                        resolve(plants);
                    },
                    (_, error) => {
                        console.error('Error retrieving plants:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    /**
     * Obtiene una planta por su ID
     * @param {string} plantId - ID de la planta
     * @returns {Promise<Plant|null>} Objeto Plant o null si no se encuentra
     */
    static async getPlantById(plantId) {
        const db = this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM plants WHERE id = ?',
                    [plantId],
                    (_, { rows }) => {
                        if (rows.length === 0) {
                            resolve(null);
                            return;
                        }

                        const row = rows.item(0);

                        // Convertir las cadenas JSON a objetos
                        const startIndoorMonths = JSON.parse(row.startIndoorMonths || '[]');
                        const transplantMonths = JSON.parse(row.transplantMonths || '[]');
                        const sowOutdoorMonths = JSON.parse(row.sowOutdoorMonths || '[]');
                        const harvestMonths = JSON.parse(row.harvestMonths || '[]');
                        const additionalInfo = JSON.parse(row.additionalInfo || '{}');
                        const varieties = JSON.parse(row.varieties || '{}');

                        // Crear objeto GrowingInfo
                        const growingInfo = new GrowingInfo(
                            startIndoorMonths,
                            transplantMonths,
                            sowOutdoorMonths,
                            harvestMonths,
                            row.plantsPerSquare,
                            additionalInfo
                        );

                        // Crear objeto Plant
                        const plant = new Plant(
                            row.id,
                            row.name,
                            row.category,
                            row.imagePath,
                            row.description,
                            growingInfo,
                            varieties
                        );

                        resolve(plant);
                    },
                    (_, error) => {
                        console.error('Error retrieving plant by ID:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    /**
     * Añade una nueva planta a la base de datos
     * @param {Plant} plant - Objeto Plant
     * @returns {Promise<Plant>} La planta añadida
     */
    static async addPlant(plant) {
        const db = this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO plants (
                        id, name, category, imagePath, description,
                        startIndoorMonths, transplantMonths, sowOutdoorMonths,
                        harvestMonths, plantsPerSquare, additionalInfo, varieties
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        plant.id,
                        plant.name,
                        plant.category,
                        plant.imagePath,
                        plant.description,
                        JSON.stringify(plant.growingInfo.startIndoorMonths),
                        JSON.stringify(plant.growingInfo.transplantMonths),
                        JSON.stringify(plant.growingInfo.sowOutdoorMonths),
                        JSON.stringify(plant.growingInfo.harvestMonths),
                        plant.growingInfo.plantsPerSquare,
                        JSON.stringify(plant.growingInfo.additionalInfo),
                        JSON.stringify(plant.varieties)
                    ],
                    (_, result) => {
                        resolve(plant);
                    },
                    (_, error) => {
                        console.error('Error adding plant:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    /**
     * Actualiza una planta existente
     * @param {Plant} plant - Objeto Plant
     * @returns {Promise<Plant>} La planta actualizada
     */
    static async updatePlant(plant) {
        const db = this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `UPDATE plants SET
                        name = ?, category = ?, imagePath = ?, description = ?,
                        startIndoorMonths = ?, transplantMonths = ?, sowOutdoorMonths = ?,
                        harvestMonths = ?, plantsPerSquare = ?, additionalInfo = ?, varieties = ?
                    WHERE id = ?`,
                    [
                        plant.name,
                        plant.category,
                        plant.imagePath,
                        plant.description,
                        JSON.stringify(plant.growingInfo.startIndoorMonths),
                        JSON.stringify(plant.growingInfo.transplantMonths),
                        JSON.stringify(plant.growingInfo.sowOutdoorMonths),
                        JSON.stringify(plant.growingInfo.harvestMonths),
                        plant.growingInfo.plantsPerSquare,
                        JSON.stringify(plant.growingInfo.additionalInfo),
                        JSON.stringify(plant.varieties),
                        plant.id
                    ],
                    (_, result) => {
                        resolve(plant);
                    },
                    (_, error) => {
                        console.error('Error updating plant:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    /**
     * Elimina una planta de la base de datos
     * @param {string} plantId - ID de la planta
     * @returns {Promise<void>}
     */
    static async deletePlant(plantId) {
        const db = this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM plants WHERE id = ?',
                    [plantId],
                    (_, result) => {
                        resolve();
                    },
                    (_, error) => {
                        console.error('Error deleting plant:', error);
                        reject(error);
                    }
                );
            });
        });
    }
}