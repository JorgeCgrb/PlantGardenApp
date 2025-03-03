// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../utils/i18n';

// Import screens
import GardensScreen from '../screens/GardensScreen';
import PlantsScreen from '../screens/PlantsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import GuideScreen from '../screens/GuideScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewGardenScreen from '../screens/NewGardenScreen';
import GardenDetailScreen from '../screens/GardenDetailScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const GardensStack = createStackNavigator();
const PlantsStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const GuideStack = createStackNavigator();
const SettingsStack = createStackNavigator();

// Gardens stack
function GardensStackScreen() {
    return (
        <GardensStack.Navigator>
            <GardensStack.Screen name="Gardens" component={GardensScreen} />
            <GardensStack.Screen name="GardenDetail" component={GardenDetailScreen} />
            <GardensStack.Screen name="NewGarden" component={NewGardenScreen} />
        </GardensStack.Navigator>
    );
}

// Plants stack
function PlantsStackScreen() {
    return (
        <PlantsStack.Navigator>
            <PlantsStack.Screen name="Plants" component={PlantsScreen} />
            <PlantsStack.Screen name="PlantDetail" component={PlantDetailScreen} />
        </PlantsStack.Navigator>
    );
}

// Calendar stack
function CalendarStackScreen() {
    return (
        <CalendarStack.Navigator>
            <CalendarStack.Screen name="Calendar" component={CalendarScreen} />
        </CalendarStack.Navigator>
    );
}

// Guide stack
function GuideStackScreen() {
    return (
        <GuideStack.Navigator>
            <GuideStack.Screen name="Guide" component={GuideScreen} />
        </GuideStack.Navigator>
    );
}

// Settings stack
function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
}

// Main tab navigator
export default function AppNavigator() {
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopColor: '#333',
                }
            }}
        >
            <Tab.Screen
                name="GardensTab"
                component={GardensStackScreen}
                options={{
                    tabBarLabel: t('gardens'),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="grid" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="PlantsTab"
                component={PlantsStackScreen}
                options={{
                    tabBarLabel: t('plants'),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="sprout" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="CalendarTab"
                component={CalendarStackScreen}
                options={{
                    tabBarLabel: t('calendar'),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="GuideTab"
                component={GuideStackScreen}
                options={{
                    tabBarLabel: t('guide'),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStackScreen}
                options={{
                    tabBarLabel: t('settings'),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}