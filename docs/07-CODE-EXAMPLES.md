# Exemples de Code

Ce fichier contient des exemples concrets de code pour démarrer rapidement.

## 1. Premier Store Zustand

### src/store/structures.store.ts

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { structuresApi } from '../api/structures.api';
import { Structure, SearchFilters } from '../models/structure.model';

interface StructuresState {
  // State
  structures: Structure[];
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
  
  // Actions
  setStructures: (structures: Structure[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: SearchFilters) => void;
  
  // Async actions
  fetchStructures: (filters?: SearchFilters) => Promise<void>;
  fetchNearby: (lat: number, lng: number, radius?: number) => Promise<void>;
  clearStructures: () => void;
}

export const useStructuresStore = create<StructuresState>()(
  devtools(
    (set, get) => ({
      // Initial state
      structures: [],
      loading: false,
      error: null,
      filters: {},
      
      // Setters
      setStructures: (structures) => set({ structures }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setFilters: (filters) => set({ filters }),
      
      // Fetch structures with filters
      fetchStructures: async (filters) => {
        set({ loading: true, error: null });
        try {
          const data = await structuresApi.search(filters || get().filters);
          set({ structures: data, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Une erreur est survenue',
            loading: false 
          });
        }
      },
      
      // Fetch nearby structures
      fetchNearby: async (lat, lng, radius = 10) => {
        set({ loading: true, error: null });
        try {
          const data = await structuresApi.getNearby(lat, lng, radius);
          set({ structures: data, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Une erreur est survenue',
            loading: false 
          });
        }
      },
      
      // Clear structures
      clearStructures: () => set({ structures: [], error: null }),
    }),
    { name: 'structures-store' }
  )
);
```

## 2. Custom Hook useStructures

### src/hooks/useStructures.ts

```typescript
import { useCallback } from 'react';
import { useStructuresStore } from '../store/structures.store';

export const useStructures = () => {
  // Sélecteurs
  const structures = useStructuresStore((state) => state.structures);
  const loading = useStructuresStore((state) => state.loading);
  const error = useStructuresStore((state) => state.error);
  const filters = useStructuresStore((state) => state.filters);
  
  // Actions
  const fetchStructures = useStructuresStore((state) => state.fetchStructures);
  const fetchNearby = useStructuresStore((state) => state.fetchNearby);
  const clearStructures = useStructuresStore((state) => state.clearStructures);
  const setFilters = useStructuresStore((state) => state.setFilters);
  
  // Search with current filters
  const search = useCallback(async () => {
    await fetchStructures(filters);
  }, [fetchStructures, filters]);
  
  // Update and search
  const searchWithFilters = useCallback(async (newFilters: any) => {
    setFilters(newFilters);
    await fetchStructures(newFilters);
  }, [setFilters, fetchStructures]);
  
  return {
    // State
    structures,
    loading,
    error,
    filters,
    
    // Actions
    search,
    searchWithFilters,
    fetchNearby,
    clearStructures,
    setFilters,
  };
};
```

## 3. Composant StructureCard

### src/components/structure/StructureCard.tsx

```typescript
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Structure } from '../../models/structure.model';

interface StructureCardProps {
  structure: Structure;
  onPress: (structure: Structure) => void;
}

export const StructureCard: React.FC<StructureCardProps> = ({ structure, onPress }) => {
  return (
    <Card style={styles.card} onPress={() => onPress(structure)}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {structure.name}
          </Text>
          {structure.distance && (
            <Chip mode="outlined" compact>
              {structure.distance.toFixed(1)} km
            </Chip>
          )}
        </View>
        
        <Text variant="bodyMedium" style={styles.address}>
          {structure.address.street}
        </Text>
        <Text variant="bodySmall" style={styles.city}>
          {structure.address.postcode} {structure.address.city}
        </Text>
        
        <View style={styles.disciplines}>
          {structure.disciplines.slice(0, 3).map((discipline, index) => (
            <Chip key={index} compact style={styles.disciplineChip}>
              {discipline}
            </Chip>
          ))}
          {structure.disciplines.length > 3 && (
            <Text variant="bodySmall" style={styles.moreText}>
              +{structure.disciplines.length - 3}
            </Text>
          )}
        </View>
        
        {structure.accessibility && (
          <Chip 
            mode="flat" 
            compact 
            style={[
              styles.accessibilityChip,
              { backgroundColor: getAccessibilityColor(structure.accessibility.score) }
            ]}
          >
            {structure.accessibility.label}
          </Chip>
        )}
      </Card.Content>
    </Card>
  );
};

const getAccessibilityColor = (score: number): string => {
  if (score >= 4) return '#4CAF50';
  if (score >= 3) return '#FFC107';
  return '#F44336';
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  address: {
    marginTop: 4,
  },
  city: {
    color: '#666',
    marginBottom: 8,
  },
  disciplines: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  disciplineChip: {
    marginRight: 4,
  },
  moreText: {
    alignSelf: 'center',
    color: '#666',
  },
  accessibilityChip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});
```

## 4. Écran de Recherche (Exemple Simple)

### src/screens/search/OuPratiquerScreen.tsx

```typescript
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Button, ActivityIndicator } from 'react-native-paper';
import { useStructures } from '../../hooks/useStructures';
import { useLocation } from '../../hooks/useLocation';
import { StructureCard } from '../../components/structure/StructureCard';
import { Structure } from '../../models/structure.model';

export const OuPratiquerScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { structures, loading, search, fetchNearby } = useStructures();
  const { location, requestLocation, loading: locationLoading } = useLocation();
  
  const handleSearch = () => {
    search();
  };
  
  const handleNearby = async () => {
    await requestLocation();
  };
  
  useEffect(() => {
    if (location) {
      fetchNearby(
        location.coords.latitude,
        location.coords.longitude
      );
    }
  }, [location]);
  
  const handleStructurePress = (structure: Structure) => {
    navigation.navigate('StructureDetail', { structureId: structure.id });
  };
  
  const renderItem = ({ item }: { item: Structure }) => (
    <StructureCard structure={item} onPress={handleStructurePress} />
  );
  
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Rechercher..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchbar}
      />
      
      <Button 
        mode="contained" 
        onPress={handleNearby}
        loading={locationLoading}
        style={styles.button}
      >
        Structures proches de moi
      </Button>
      
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={structures}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucune structure trouvée</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    margin: 16,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  loader: {
    marginTop: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
});
```

## 5. Navigation Setup

### src/navigation/AppNavigator.tsx

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### src/navigation/MainTabNavigator.tsx

```typescript
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/home/HomeScreen';
import OuPratiquerNavigator from './OuPratiquerNavigator';
import AccountScreen from '../screens/account/AccountScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#000',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="OuPratiquer" 
        component={OuPratiquerNavigator}
        options={{
          title: 'Où Pratiquer',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
        options={{
          title: 'Compte',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
```

## 6. API Client

### src/api/client.ts

```typescript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('auth_token');
      // Navigate to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## 7. App.tsx Principal

### App.tsx

```typescript
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/config/theme.config';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

## 8. Configuration Thème

### src/config/theme.config.ts

```typescript
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    secondary: '#666666',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onBackground: '#000000',
    onSurface: '#000000',
  },
  roundness: 8,
};
```

---

## 🚀 Ordre de Développement Suggéré

1. **Configuration** (Jour 1)
   - Installer dépendances
   - Configurer TypeScript
   - Créer structure dossiers

2. **API Layer** (Jour 2-3)
   - client.ts
   - Modèles TypeScript
   - Services API

3. **State** (Jour 4)
   - Premier store (structures)
   - Premier hook (useStructures)

4. **Navigation** (Jour 5)
   - AppNavigator
   - MainTabNavigator

5. **Premiers Composants** (Jour 6-7)
   - StructureCard
   - Loading, Error components

6. **Premier Écran** (Jour 8-10)
   - OuPratiquerScreen
   - Test complet du flow

---

Ces exemples vous donnent une base solide pour démarrer. Adaptez-les selon vos besoins !
