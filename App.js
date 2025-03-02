import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { PlantsProvider } from './src/viewmodels/PlantsViewModel';
import { GardensProvider } from './src/viewmodels/GardensViewModel';
import { CalendarProvider } from './src/viewmodels/CalendarViewModel';
import { LanguageProvider } from './src/utils/i18n';
import { initializeDatabase } from './src/services/StorageService';

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
        // Aquí podrías mostrar una pantalla de carga
        return null;
    }

    return (
        <SafeAreaProvider>
            <LanguageProvider>
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
            </LanguageProvider>
        </SafeAreaProvider>
    );
}