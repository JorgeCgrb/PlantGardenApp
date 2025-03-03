// src/services/PlantDatabaseService.js (con herramientas de depuración)
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Plant from '../models/Plant';
import GrowingInfo from '../models/GrowingInfo';

export class PlantDatabaseService {
    static db = null;
    static dbName = 'gardening.db';
    static originalDbPath = null;
    static actualDbPath = null;

    /**
     * Inicializa la conexión a la base de datos y proporciona información de depuración
     */
    static async getDatabase() {
        if (this.db) {
            return this.db;
        }

        await this.debugDatabasePaths();

        this.db = SQLite.openDatabase(this.dbName);
        console.log('Database connection opened');
        return this.db;
    }

    /**
     * Muestra información de depuración sobre la ubicación del archivo de base de datos
     */
    static async debugDatabasePaths() {
        try {
            console.log('\n--- DATABASE DEBUG INFO ---');

            // 1. Verificar la existencia del archivo en la carpeta assets
            const assetPath = Asset.fromModule(require('../../assets/gardening.db'));
            console.log('Asset path:', assetPath);

            await assetPath.downloadAsync();
            console.log('Asset downloaded successfully, URI:', assetPath.localUri);
            this.originalDbPath = assetPath.localUri;

            // 2. Verificar la existencia en el sistema de archivos
            const dbDirectory = FileSystem.documentDirectory + 'SQLite/';
            const dbPath = dbDirectory + this.dbName;
            this.actualDbPath = dbPath;

            console.log('Expected DB path:', dbPath);

            // Verificar directorio
            const dirInfo = await FileSystem.getInfoAsync(dbDirectory);
            console.log('SQLite directory exists:', dirInfo.exists);

            // Si no existe el directorio, crearlo
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(dbDirectory, { intermediates: true });
                console.log('Created SQLite directory');
            }

            // Verificar archivo
            const fileInfo = await FileSystem.getInfoAsync(dbPath);
            console.log('DB file exists at target path:', fileInfo.exists);
            if (fileInfo.exists) {
                console.log('DB file size:', fileInfo.size, 'bytes');
            }

            // Copiar el archivo si no existe
            if (!fileInfo.exists && assetPath.localUri) {
                try {
                    await FileSystem.copyAsync({
                        from: assetPath.localUri,
                        to: dbPath
                    });

                    // Verificar nuevamente después de copiar
                    const newFileInfo = await FileSystem.getInfoAsync(dbPath);
                    console.log('DB file copied, exists now:', newFileInfo.exists);
                    if (newFileInfo.exists) {
                        console.log('DB file size after copy:', newFileInfo.size, 'bytes');
                    }
                } catch (copyError) {
                    console.error('Error copying database file:', copyError);
                }
            }

            console.log('--- END OF DEBUG INFO ---\n');
        } catch (error) {
            console.error('Error in database path debugging:', error);
        }
    }

    /**
     * Lista todas las tablas en la base de datos
     */
    static async listAllTables() {
        let tables = [];
        const db = await this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                console.log('\n--- TABLES IN DATABASE ---');

                // Intenta obtener las tablas con una consulta estándar
                tx.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
                    [],
                    (_, { rows }) => {
                        if (rows.length > 0) {
                            console.log('Tables found:');
                            for (let i = 0; i < rows.length; i++) {
                                const tableName = rows.item(i).name;
                                tables.push(tableName);
                                console.log(`- ${tableName}`);
                            }
                        } else {
                            console.log('No tables found with standard query');
                        }

                        // Vamos a intentar una consulta pragma como alternativa
                        tx.executeSql(
                            "PRAGMA table_list",
                            [],
                            (_, { rows: pragmaRows }) => {
                                if (pragmaRows.length > 0) {
                                    console.log('\nTables found with PRAGMA:');
                                    for (let i = 0; i < pragmaRows.length; i++) {
                                        console.log(`- ${pragmaRows.item(i).name}`);
                                    }
                                } else {
                                    console.log('No tables found with PRAGMA query');
                                }

                                console.log('--- END OF TABLES INFO ---\n');
                                resolve(tables);
                            },
                            (_, pragmaError) => {
                                console.log('PRAGMA query error:', pragmaError);
                                resolve(tables); // Resolvemos con las tablas que ya tenemos
                            }
                        );
                    },
                    (_, error) => {
                        console.error('Error listing tables:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    /**
     * Intenta realizar una consulta SELECT *
     * @param {string} tableName - Nombre de la tabla a consultar
     */
    static async debugQueryTable(tableName) {
        const db = await this.getDatabase();

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                console.log(`\n--- TRYING TO QUERY TABLE '${tableName}' ---`);
                tx.executeSql(
                    `SELECT * FROM ${tableName} LIMIT 1`,
                    [],
                    (_, { rows }) => {
                        if (rows.length > 0) {
                            console.log(`Query successful! Found data in ${tableName}`);
                            console.log('First row:', JSON.stringify(rows.item(0), null, 2));
                            resolve(true);
                        } else {
                            console.log(`Table ${tableName} exists but has no data`);
                            resolve(false);
                        }
                    },
                    (_, error) => {
                        console.error(`Error querying table ${tableName}:`, error);
                        resolve(false);
                    }
                );
            });
        });
    }

    /**
     * Inicializa la base de datos con depuración detallada
     */
    static async initDatabase() {
        try {
            console.log('\n--- INITIALIZING DATABASE ---');
            const db = await this.getDatabase();

            // Lista todas las tablas
            const tables = await this.listAllTables();

            // Intenta acceder a tablas específicas
            await this.debugQueryTable('Especies');
            await this.debugQueryTable('Familias');
            await this.debugQueryTable('sqlite_master');

            console.log('--- DATABASE INITIALIZATION COMPLETE ---\n');

            // Si no se encontró la tabla Especies, generamos un error
            if (!tables.includes('Especies')) {
                throw new Error('La tabla Especies no existe en la base de datos cargada');
            }

            return db;
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    /**
     * Intenta obtener plantas de la tabla Especies
     */
    static async getPlants() {
        try {
            const db = await this.getDatabase();

            // Primero, intentemos una consulta básica para depuración
            console.log('\n--- TRYING TO RETRIEVE PLANTS ---');

            return new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT * FROM Especies LIMIT 5',
                        [],
                        (_, { rows }) => {
                            console.log(`Query success! Found ${rows.length} plants`);

                            const plants = [];
                            for (let i = 0; i < rows.length; i++) {
                                const row = rows.item(i);

                                // Log la primera fila para ver la estructura
                                if (i === 0) {
                                    console.log('Sample row structure:', JSON.stringify(row, null, 2));
                                }

                                try {
                                    // Mapear meses de siembra, trasplante y cosecha
                                    const seasonMonths = this.determineSeasonMonths(row['Ciclo floración']);

                                    // Generar ID único
                                    const id = row['Planta'].toLowerCase()
                                        .replace(/\s+/g, '_')
                                        .replace(/[^\w\-]+/g, '')
                                        .replace(/\-\-+/g, '_')
                                        .replace(/^-+/, '')
                                        .replace(/-+$/, '');

                                    // Crear objeto GrowingInfo
                                    const growingInfo = new GrowingInfo(
                                        seasonMonths.startIndoor,
                                        seasonMonths.transplant,
                                        seasonMonths.sowOutdoor,
                                        seasonMonths.harvest,
                                        this.parseSFG(row['SFG Original']),
                                        {
                                            sunRequirements: this.parseLightRequirements(row['Luz']),
                                            waterNeeds: 'moderate',
                                            frostResistant: row['Resistente a heladas'] === 'Sí',
                                            companionPlants: row['Plantas compatibles'],
                                            germinationTime: row['Tiempo de Germinación'],
                                            growingTime: row['Tiempo cultivo (desde germinación)']
                                        }
                                    );

                                    // Crear objeto Plant
                                    const plant = new Plant(
                                        id,
                                        row['Planta'],
                                        row['Familia'],
                                        this.getSimplifiedImageName(row['Planta']),
                                        row['Descripción'],
                                        growingInfo,
                                        {}
                                    );

                                    plants.push(plant);
                                } catch (error) {
                                    console.error(`Error processing plant '${row['Planta']}':`, error);
                                }
                            }

                            console.log(`Successfully created ${plants.length} Plant objects`);
                            console.log('--- END OF PLANTS RETRIEVAL ---\n');

                            resolve(plants);
                        },
                        (_, error) => {
                            console.error('Error retrieving plants:', error);
                            reject(error);
                        }
                    );
                });
            });
        } catch (error) {
            console.error('Error getting plants:', error);
            return [];
        }
    }

    // Resto de métodos (determineSeasonMonths, parseSFG, etc.)
    static determineSeasonMonths(seasonText) {
        const months = {
            startIndoor: [],
            transplant: [],
            sowOutdoor: [],
            harvest: []
        };

        if (!seasonText) return months;

        if (seasonText.includes('Primavera')) {
            months.startIndoor = [1, 2];
            months.transplant = [3, 4];
            months.sowOutdoor = [3, 4, 5];
            months.harvest = [5, 6, 7];
        }
        else if (seasonText.includes('Verano')) {
            months.startIndoor = [3, 4];
            months.transplant = [5, 6];
            months.sowOutdoor = [5, 6, 7];
            months.harvest = [7, 8, 9];
        }
        else if (seasonText.includes('Otoño')) {
            months.startIndoor = [7, 8];
            months.transplant = [8, 9];
            months.sowOutdoor = [8, 9, 10];
            months.harvest = [10, 11, 12];
        }
        else if (seasonText.includes('Invierno')) {
            months.startIndoor = [10, 11];
            months.transplant = [11, 12];
            months.sowOutdoor = [0, 1, 2];
            months.harvest = [2, 3, 4];
        }

        return months;
    }

    static parseSFG(sfgValue) {
        if (!sfgValue) return 1;

        if (typeof sfgValue === 'number') return sfgValue;

        const parsed = parseInt(sfgValue, 10);
        return isNaN(parsed) ? 1 : parsed;
    }

    static parseLightRequirements(lightText) {
        if (!lightText) return 'full_sun';

        if (lightText.includes('Pleno sol')) return 'full_sun';
        if (lightText.includes('Semisombra')) return 'partial_shade';
        if (lightText.includes('Sombra')) return 'shade';

        return 'full_sun';
    }

    static getSimplifiedImageName(plantName) {
        if (!plantName) return 'default';

        const simplifiedName = plantName.toLowerCase();

        const imageMapping = {
            'albahaca': 'albahaca',
            'ajo': 'ajo',
            'romero': 'romero',
            'zanahoria': 'zanahoria',
            'tomate': 'tomate',
            'cebolla': 'onions',
            'pimiento': 'pimientos',
            'pepino': 'pepino',
            'lechuga': 'lechuga',
            'espinaca': 'espinacas',
            'calabacín': 'calabacin',
            'cilantro': 'cilantro'
        };

        for (const [key, value] of Object.entries(imageMapping)) {
            if (simplifiedName.includes(key)) {
                return value;
            }
        }

        return 'default';
    }

    static async getPlantById(plantId) {
        const plants = await this.getPlants();
        return plants.find(plant => plant.id === plantId) || null;
    }
}