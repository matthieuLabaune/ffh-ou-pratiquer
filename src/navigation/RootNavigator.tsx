import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store';
import { RootStackParamList } from './types';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import StructureDetailScreen from '@/screens/structure/StructureDetailScreen';
import MapViewScreen from '@/screens/map';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Main" component={MainNavigator} />
                        <Stack.Screen name="StructureDetails" component={StructureDetailScreen} />
                        <Stack.Screen name="MapView" component={MapViewScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Auth" component={AuthNavigator} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
