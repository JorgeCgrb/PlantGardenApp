// src/screens/DatabaseDebugScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlantDatabaseService } from '../services/PlantDatabaseService';

const DatabaseDebugScreen = () => {
    const [debugInfo, setDebugInfo] = useState('Inicializando depuración...');
    const [tables, setTables] = useState([]);
    const [plants, setPlants] = useState([]);

    const runDatabaseTests = async () => {
        try {
            setDebugInfo('Iniciando pruebas de base de datos...\n');

            // Inicializar la base de datos
            await PlantDatabaseService.getDatabase();
            appendDebugInfo('Base de datos inicializada\n');

            // Listar tablas
            const tablesList = await PlantDatabaseService.listAllTables();
            setTables(tablesList);
            appendDebugInfo(`Tablas encontradas: ${tablesList.join(', ')}\n`);

            // Intentar acceder a Especies
            const success = await PlantDatabaseService.debugQueryTable('Especies');
            appendDebugInfo(`Acceso a tabla Especies: ${success ? 'EXITOSO' : 'FALLIDO'}\n`);

            // Intentar obtener plantas
            try {
                const plantsData = await PlantDatabaseService.getPlants();
                setPlants(plantsData);
                appendDebugInfo(`Plantas recuperadas: ${plantsData.length}\n`);
            } catch (error) {
                appendDebugInfo(`Error recuperando plantas: ${error.message}\n`);
            }

            appendDebugInfo('Pruebas de base de datos completadas');
        } catch (error) {
            appendDebugInfo(`ERROR: ${error.message}`);
        }
    };

    const appendDebugInfo = (text) => {
        setDebugInfo(prev => prev + text);
    };

    useEffect(() => {
        runDatabaseTests();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Depuración de Base de Datos</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={runDatabaseTests}
            >
                <Text style={styles.buttonText}>Ejecutar Pruebas Nuevamente</Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollView}>
                <Text style={styles.sectionTitle}>Información de depuración:</Text>
                <Text style={styles.debugText}>{debugInfo}</Text>

                <Text style={styles.sectionTitle}>Tablas detectadas ({tables.length}):</Text>
                {tables.map((table, index) => (
                    <Text key={index} style={styles.tableItem}>• {table}</Text>
                ))}

                <Text style={styles.sectionTitle}>Plantas cargadas ({plants.length}):</Text>
                {plants.map((plant, index) => (
                    <Text key={index} style={styles.plantItem}>
                        {index + 1}. {plant.name} ({plant.id}) - {plant.category}
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        padding: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 16,
        marginBottom: 8,
    },
    debugText: {
        color: '#DDD',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    tableItem: {
        color: '#FFF',
        marginLeft: 8,
        marginBottom: 4,
    },
    plantItem: {
        color: '#FFF',
        marginLeft: 8,
        marginBottom: 4,
    },
});

export default DatabaseDebugScreen;