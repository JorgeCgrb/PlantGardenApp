// App.js (modificado)
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { PlantsProvider } from './src/viewmodels/PlantsViewModel';
import { GardensProvider } from './src/viewmodels/GardensViewModel';
import { CalendarProvider } from './src/viewmodels/CalendarViewModel';
import { initializeDatabase } from './src/services/StorageService';
import { PlantDatabaseService } from './src/services/PlantDatabaseService';
import './src/utils/i18n';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            try {
                // Inicializa la base de datos Storage
                await initializeDatabase();

                // Inicializa la base de datos de plantas
                await PlantDatabaseService.initDatabase();
                console.log('Plants database initialized');

                setIsLoading(false);
            } catch (error) {
                console.error('Initialization error:', error);
                // Incluso si hay error, permitimos que la app se inicie
                setIsLoading(false);
            }
        }

        initialize();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <GardensProvider>
                <PlantsProvider>
                    <CalendarProvider>
                        <NavigationContainer>
                            <StatusBar style="auto" />
                            <AppNavigator />
                        </NavigationContainer>
                    </CalendarProvider>
                </PlantsProvider>
            </GardensProvider>
        </SafeAreaProvider>
    );
}