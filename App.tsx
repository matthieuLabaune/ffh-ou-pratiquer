import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './src/screens/home/HomeScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import FavoritesScreen from './src/screens/favorites/FavoritesScreen';
import AccountScreen from './src/screens/account/AccountScreen';
import StructureDetailScreen from './src/screens/structure/StructureDetailScreen';
import { colors } from './src/config/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.surfaceVariant,
                },
            }}
        >
            <Tab.Screen
                name="Accueil"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Rechercher"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favoris"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="heart" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Compte"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Main" component={TabNavigator} />
                        <Stack.Screen name="StructureDetails" component={StructureDetailScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
                <StatusBar style="auto" />
            </PaperProvider>
        </SafeAreaProvider>
    );
}
