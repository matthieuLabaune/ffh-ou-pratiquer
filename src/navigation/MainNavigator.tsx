import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { MainTabParamList } from './types';
import { colors } from '@/config/theme';

// Placeholder screens - will be created in next phase
import HomeScreen from '@/screens/home/HomeScreen';
import SearchScreen from '@/screens/search/SearchScreen';
import FavoritesScreen from '@/screens/favorites/FavoritesScreen';
import AccountScreen from '@/screens/account/AccountScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.navActive,
                tabBarInactiveTintColor: colors.navInactive,
                tabBarStyle: {
                    backgroundColor: colors.navBackground,
                    borderTopWidth: 0,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Search':
                            iconName = focused ? 'map-marker' : 'map-marker-outline';
                            break;
                        case 'Favorites':
                            iconName = focused ? 'book-open' : 'book-open-outline';
                            break;
                        case 'Account':
                            iconName = focused ? 'account' : 'account-outline';
                            break;
                        default:
                            iconName = 'help';
                    }

                    return (
                        <View
                            style={[
                                styles.iconContainer,
                                focused && styles.iconContainerActive,
                            ]}
                        >
                            <MaterialCommunityIcons name={iconName as any} size={35} color={color} />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Accueil',
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    title: 'Pratiquer',
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    title: 'Média',
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    title: 'Compte',
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    iconContainerActive: {
        backgroundColor: 'rgba(40, 53, 147, 0.1)', // colors.primary avec opacité
    },
});

export default MainNavigator;
