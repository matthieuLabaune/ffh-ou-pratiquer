# Architecture React Native

## Vue d'ensemble

Architecture **Feature-based** avec séparation claire des responsabilités et utilisation de **TypeScript** pour la type safety.

## Principes de conception

### 1. Separation of Concerns
- **Presentation Layer** (Components/Screens)
- **Business Logic Layer** (Hooks/Stores)
- **Data Layer** (API/Storage)

### 2. Single Responsibility
Chaque module a une seule raison de changer

### 3. DRY (Don't Repeat Yourself)
Réutilisation maximale via composants et hooks

### 4. Type Safety
TypeScript strict mode pour éviter les erreurs runtime

---

## Layers Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│    (Screens + Components + UI)          │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│        Business Logic Layer             │
│      (Hooks + Stores + Utils)           │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│           Data Layer                    │
│     (API Services + Storage)            │
└─────────────────────────────────────────┘
```

---

## State Management avec Zustand

### Pourquoi Zustand?

1. **Simple** - API minimaliste
2. **Performant** - Re-renders optimisés
3. **TypeScript-first** - Excellent support TS
4. **Pas de Provider** - Moins de boilerplate
5. **DevTools** - Support Redux DevTools

### Structure d'un Store

```typescript
// src/store/structures.store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Structure {
  id: number;
  name: string;
  // ...
}

interface StructuresState {
  // State
  structures: Structure[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchStructures: (filters?: Filters) => Promise<void>;
  clearStructures: () => void;
}

export const useStructuresStore = create<StructuresState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        structures: [],
        loading: false,
        error: null,
        
        // Actions
        fetchStructures: async (filters) => {
          set({ loading: true, error: null });
          try {
            const data = await structuresApi.search(filters);
            set({ structures: data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
        },
        
        clearStructures: () => set({ structures: [] }),
      }),
      { name: 'structures-store' }
    )
  )
);
```

### Utilisation dans un composant

```typescript
const SearchScreen = () => {
  // Sélecteurs spécifiques pour éviter re-renders
  const structures = useStructuresStore(state => state.structures);
  const loading = useStructuresStore(state => state.loading);
  const fetchStructures = useStructuresStore(state => state.fetchStructures);
  
  useEffect(() => {
    fetchStructures();
  }, []);
  
  return (
    <View>
      {loading && <Loading />}
      {structures.map(s => <StructureCard key={s.id} structure={s} />)}
    </View>
  );
};
```

---

## Custom Hooks Pattern

### Principe
Encapsuler la logique réutilisable dans des hooks personnalisés

### Exemple: useAuth

```typescript
// src/hooks/useAuth.ts
import { useAuthStore } from '../store/auth.store';
import { authApi } from '../api/auth.api';

export const useAuth = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearUser);
  
  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      setUser(response.user);
      await SecureStore.setItemAsync('token', response.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const logout = async () => {
    clearUser();
    await SecureStore.deleteItemAsync('token');
  };
  
  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
};
```

### Exemple: useLocation

```typescript
// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const requestLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission refusée');
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    location,
    loading,
    error,
    requestLocation,
  };
};
```

---

## API Layer

### Client Axios Configuration

```typescript
// src/api/client.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Request interceptor - Ajouter le token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### API Service Pattern

```typescript
// src/api/structures.api.ts
import apiClient from './client';
import { Structure, SearchFilters } from '../models/structure.model';

export const structuresApi = {
  search: async (filters: SearchFilters): Promise<Structure[]> => {
    const response = await apiClient.post('/ou-pratiquer/search', filters);
    return response.data;
  },
  
  getById: async (id: number): Promise<Structure> => {
    const response = await apiClient.get(`/structures/${id}`);
    return response.data;
  },
  
  getNearby: async (lat: number, lng: number, radius: number): Promise<Structure[]> => {
    const response = await apiClient.get('/structures/nearby', {
      params: { lat, lng, radius },
    });
    return response.data;
  },
};
```

---

## Navigation Structure

### React Navigation Setup

```typescript
// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        {/* Auth screens si besoin */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Tab Navigator

```typescript
// src/navigation/MainTabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import OuPratiquerNavigator from './OuPratiquerNavigator';
import AccountNavigator from './AccountNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="OuPratiquer" component={OuPratiquerNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

---

## Component Patterns

### Composition over Inheritance

```typescript
// Bad - Héritage
class BaseCard extends Component {}
class StructureCard extends BaseCard {}

// Good - Composition
const Card = ({ children, ...props }) => (
  <View style={styles.card} {...props}>
    {children}
  </View>
);

const StructureCard = ({ structure }) => (
  <Card>
    <Text>{structure.name}</Text>
  </Card>
);
```

### Container/Presenter Pattern

```typescript
// Container - Logique
const StructureListContainer = () => {
  const structures = useStructuresStore(state => state.structures);
  const loading = useStructuresStore(state => state.loading);
  
  return <StructureListPresenter structures={structures} loading={loading} />;
};

// Presenter - UI Pure
const StructureListPresenter = ({ structures, loading }) => {
  if (loading) return <Loading />;
  
  return (
    <FlatList
      data={structures}
      renderItem={({ item }) => <StructureCard structure={item} />}
    />
  );
};
```

### Render Props Pattern

```typescript
const DataLoader = ({ url, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData(url).then(setData).finally(() => setLoading(false));
  }, [url]);
  
  return children({ data, loading });
};

// Usage
<DataLoader url="/structures">
  {({ data, loading }) => (
    loading ? <Loading /> : <StructureList structures={data} />
  )}
</DataLoader>
```

---

## Performance Optimizations

### 1. Memoization

```typescript
// Memo pour composants
const StructureCard = React.memo(({ structure }) => {
  // ...
}, (prev, next) => prev.structure.id === next.structure.id);

// useMemo pour calculs coûteux
const sortedStructures = useMemo(
  () => structures.sort((a, b) => a.distance - b.distance),
  [structures]
);

// useCallback pour fonctions
const handlePress = useCallback(
  (id) => navigation.navigate('Detail', { id }),
  [navigation]
);
```

### 2. FlatList Optimization

```typescript
<FlatList
  data={structures}
  renderItem={renderItem}
  keyExtractor={item => item.id.toString()}
  windowSize={10}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  removeClippedSubviews={true}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

### 3. Image Optimization

```typescript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl, priority: FastImage.priority.normal }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>
```

---

## Error Handling

### Global Error Boundary

```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log à un service de tracking
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```typescript
try {
  const data = await structuresApi.search(filters);
  set({ structures: data });
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Erreur serveur
      set({ error: error.response.data.message });
    } else if (error.request) {
      // Pas de réponse
      set({ error: 'Pas de connexion réseau' });
    } else {
      // Autre erreur
      set({ error: error.message });
    }
  }
}
```

---

## Testing Strategy

### Unit Tests - Hooks

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

test('should login successfully', async () => {
  const { result } = renderHook(() => useAuth());
  
  await act(async () => {
    await result.current.login('user@test.com', 'password');
  });
  
  expect(result.current.isAuthenticated).toBe(true);
});
```

### Integration Tests - Components

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import SearchScreen from '../SearchScreen';

test('should search structures', async () => {
  const { getByPlaceholderText, getByText } = render(<SearchScreen />);
  
  fireEvent.changeText(
    getByPlaceholderText('Rechercher...'),
    'Paris'
  );
  
  fireEvent.press(getByText('Rechercher'));
  
  await waitFor(() => {
    expect(getByText('Club Paris 15')).toBeTruthy();
  });
});
```

---

## Folder Structure Détaillée

```
src/
├── api/
│   ├── client.ts                 # Axios client configuré
│   ├── auth.api.ts              # API auth
│   ├── structures.api.ts        # API structures
│   ├── reference.api.ts         # API référence
│   └── address.api.ts           # API adresses
│
├── components/
│   ├── common/                  # Composants génériques
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Loading.tsx
│   │   └── index.ts
│   ├── structure/               # Composants structures
│   │   ├── StructureCard.tsx
│   │   ├── StructureList.tsx
│   │   ├── StructureFilters.tsx
│   │   └── index.ts
│   └── map/                     # Composants carte
│       ├── MapView.tsx
│       ├── Marker.tsx
│       └── index.ts
│
├── config/
│   ├── api.config.ts            # Config API
│   ├── theme.config.ts          # Thème
│   └── constants.ts             # Constantes
│
├── hooks/
│   ├── useAuth.ts
│   ├── useLocation.ts
│   ├── useStructures.ts
│   ├── useDebounce.ts
│   └── index.ts
│
├── models/
│   ├── structure.model.ts
│   ├── user.model.ts
│   ├── reference.model.ts
│   └── api.model.ts
│
├── navigation/
│   ├── AppNavigator.tsx
│   ├── MainTabNavigator.tsx
│   ├── OuPratiquerNavigator.tsx
│   ├── AccountNavigator.tsx
│   └── routes.ts
│
├── screens/
│   ├── home/
│   ├── search/
│   ├── structure/
│   ├── account/
│   ├── questionnaire/
│   └── settings/
│
├── store/
│   ├── auth.store.ts
│   ├── structures.store.ts
│   ├── filters.store.ts
│   └── reference.store.ts
│
└── utils/
    ├── helpers.ts
    ├── validation.ts
    ├── storage.ts
    └── location.ts
```
