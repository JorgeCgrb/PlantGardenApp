// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { PlantsProvider } from './src/viewmodels/PlantsViewModel';
import { GardensProvider } from './src/viewmodels/GardensViewModel';
import { CalendarProvider } from './src/viewmodels/CalendarViewModel';
import { initializeDatabase } from './src/services/StorageService';
import './src/utils/i18n'; // Importar configuración de i18n

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            await initializeDatabase();
            setIsLoading(false);
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