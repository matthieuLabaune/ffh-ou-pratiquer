# Intégration API & Configuration

## Configuration de l'environnement

### Installation des dépendances

```bash
npm install react-native-dotenv
npm install --save-dev @types/react-native-dotenv
```

### Fichier .env

```env
# API Configuration
API_BASE_URL=https://your-ngrok-url.ngrok-free.app/api
API_TIMEOUT=30000

# Endpoints
OU_PRATIQUER_ENDPOINT=/ou-pratiquer/search
STRUCTURES_ENDPOINT=/structures
AUTH_ENDPOINT=/auth
REFERENCE_ENDPOINT=/reference

# API Headers
API_CONTENT_TYPE=application/json
NGROK_SKIP_BROWSER_WARNING=true

# Map API Keys (à obtenir)
GOOGLE_MAPS_API_KEY=your_google_maps_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# App Config
APP_NAME=FFH Où Pratiquer
APP_VERSION=1.0.0
ENVIRONMENT=development
```

### Configuration TypeScript pour .env

```typescript
// types/env.d.ts
declare module '@env' {
  export const API_BASE_URL: string;
  export const API_TIMEOUT: string;
  export const OU_PRATIQUER_ENDPOINT: string;
  export const STRUCTURES_ENDPOINT: string;
  export const AUTH_ENDPOINT: string;
  export const REFERENCE_ENDPOINT: string;
  export const GOOGLE_MAPS_API_KEY: string;
  export const MAPBOX_ACCESS_TOKEN: string;
  export const NGROK_SKIP_BROWSER_WARNING: string;
}
```

---

## Client API (Axios)

### Configuration du client

```typescript
// src/api/client.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL, API_TIMEOUT, NGROK_SKIP_BROWSER_WARNING } from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': NGROK_SKIP_BROWSER_WARNING,
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Ajouter le token si disponible
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log en dev
    if (__DEV__) {
      console.log('🔵 API Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('🔴 Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('🟢 API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    if (__DEV__) {
      console.error('🔴 Response Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
    }
    
    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('auth_token');
      // TODO: Navigate to login
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## Services API

### 1. Authentication API

```typescript
// src/api/auth.api.ts
import apiClient from './client';
import { AUTH_ENDPOINT } from '@env';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/login`, credentials);
    return response.data;
  },
  
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/register`, data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await apiClient.post(`${AUTH_ENDPOINT}/logout`);
  },
  
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/refresh`);
    return response.data;
  },
  
  me: async (): Promise<LoginResponse['user']> => {
    const response = await apiClient.get(`${AUTH_ENDPOINT}/me`);
    return response.data;
  },
};
```

### 2. Structures API

```typescript
// src/api/structures.api.ts
import apiClient from './client';
import { OU_PRATIQUER_ENDPOINT, STRUCTURES_ENDPOINT } from '@env';
import { Structure, StructureDetail, SearchFilters } from '../models/structure.model';

export const structuresApi = {
  // Recherche de structures
  search: async (filters: SearchFilters): Promise<Structure[]> => {
    const response = await apiClient.post(OU_PRATIQUER_ENDPOINT, filters);
    return response.data;
  },
  
  // Structures à proximité
  getNearby: async (
    latitude: number,
    longitude: number,
    radius: number = 10
  ): Promise<Structure[]> => {
    const response = await apiClient.get(`${STRUCTURES_ENDPOINT}/nearby`, {
      params: { latitude, longitude, radius },
    });
    return response.data;
  },
  
  // Détails d'une structure
  getById: async (id: number): Promise<StructureDetail> => {
    const response = await apiClient.get(`${STRUCTURES_ENDPOINT}/${id}`);
    return response.data;
  },
  
  // Recherche par nom
  searchByName: async (query: string): Promise<Structure[]> => {
    const response = await apiClient.get(`${STRUCTURES_ENDPOINT}/search`, {
      params: { q: query },
    });
    return response.data;
  },
};
```

### 3. Reference Data API

```typescript
// src/api/reference.api.ts
import apiClient from './client';
import { REFERENCE_ENDPOINT } from '@env';
import { Region, Departement, Discipline, StructureType } from '../models/reference.model';

export const referenceApi = {
  // Régions
  getRegions: async (): Promise<Region[]> => {
    const response = await apiClient.get(`${REFERENCE_ENDPOINT}/regions`);
    return response.data;
  },
  
  // Départements
  getDepartements: async (regionId?: number): Promise<Departement[]> => {
    const params = regionId ? { region_id: regionId } : {};
    const response = await apiClient.get(`${REFERENCE_ENDPOINT}/departements`, { params });
    return response.data;
  },
  
  // Disciplines sportives
  getDisciplines: async (): Promise<Discipline[]> => {
    const response = await apiClient.get(`${REFERENCE_ENDPOINT}/disciplines`);
    return response.data;
  },
  
  // Types de structures
  getStructureTypes: async (): Promise<StructureType[]> => {
    const response = await apiClient.get(`${REFERENCE_ENDPOINT}/structure-types`);
    return response.data;
  },
};
```

### 4. Address API (Géolocalisation)

```typescript
// src/api/address.api.ts
import apiClient from './client';

export interface AddressResult {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    postcode?: string;
    country?: string;
  };
}

export const addressApi = {
  // Recherche d'adresse (Nominatim API)
  searchAddress: async (query: string): Promise<AddressResult[]> => {
    const response = await apiClient.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 5,
          countrycodes: 'fr',
        },
      }
    );
    return response.data;
  },
  
  // Reverse geocoding
  reverseGeocode: async (
    latitude: number,
    longitude: number
  ): Promise<AddressResult> => {
    const response = await apiClient.get(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
          addressdetails: 1,
        },
      }
    );
    return response.data;
  },
};
```

---

## Modèles TypeScript

### Structure Models

```typescript
// src/models/structure.model.ts

export interface Structure {
  id: number;
  name: string;
  type: string;
  address: {
    street: string;
    city: string;
    postcode: string;
    department: string;
    region: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distance?: number; // En km
  disciplines: string[];
  accessibility?: {
    score: number;
    label: string;
  };
}

export interface StructureDetail extends Structure {
  description?: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  affiliations: string[];
  openingHours?: {
    [key: string]: string;
  };
  facilities: string[];
  photos?: string[];
}

export interface SearchFilters {
  query?: string;
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // En km
  };
  region?: number;
  department?: number;
  discipline?: number;
  structureType?: number;
  accessibility?: boolean;
}
```

### Reference Models

```typescript
// src/models/reference.model.ts

export interface Region {
  id: number;
  code: string;
  name: string;
}

export interface Departement {
  id: number;
  code: string;
  name: string;
  regionId: number;
}

export interface Discipline {
  id: number;
  name: string;
  category?: string;
  icon?: string;
}

export interface StructureType {
  id: number;
  name: string;
  description?: string;
}
```

### User Models

```typescript
// src/models/user.model.ts

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  licenses: License[];
}

export interface License {
  id: number;
  number: string;
  discipline: string;
  season: string;
  status: 'active' | 'expired' | 'pending';
  expirationDate: string;
  structure?: {
    id: number;
    name: string;
  };
}
```

---

## Error Handling

### Custom Error Types

```typescript
// src/utils/errors.ts

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Erreur de connexion') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthError extends Error {
  constructor(message: string = 'Erreur d\'authentification') {
    super(message);
    this.name = 'AuthError';
  }
}
```

### Error Handler Utility

```typescript
// src/utils/errorHandler.ts
import { AxiosError } from 'axios';
import { ApiError, NetworkError, AuthError } from './errors';

export const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Pas de réponse - Problème réseau
    if (!axiosError.response) {
      return new NetworkError('Impossible de contacter le serveur');
    }
    
    // Erreur authentification
    if (axiosError.response.status === 401) {
      return new AuthError('Session expirée, veuillez vous reconnecter');
    }
    
    // Erreur serveur
    const message = axiosError.response.data?.message || axiosError.message;
    return new ApiError(
      message,
      axiosError.response.status,
      axiosError.response.data?.code
    );
  }
  
  return error instanceof Error ? error : new Error('Erreur inconnue');
};
```

---

## Cache Strategy

### React Query Alternative avec Zustand

```typescript
// src/store/cache.store.ts
import { create } from 'zustand';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // en ms
}

interface CacheStore {
  cache: Map<string, CacheEntry<any>>;
  set: <T>(key: string, data: T, expiresIn?: number) => void;
  get: <T>(key: string) => T | null;
  clear: (key?: string) => void;
}

export const useCacheStore = create<CacheStore>((set, get) => ({
  cache: new Map(),
  
  set: (key, data, expiresIn = 5 * 60 * 1000) => {
    const entry: CacheEntry<typeof data> = {
      data,
      timestamp: Date.now(),
      expiresIn,
    };
    
    const newCache = new Map(get().cache);
    newCache.set(key, entry);
    set({ cache: newCache });
  },
  
  get: (key) => {
    const entry = get().cache.get(key);
    
    if (!entry) return null;
    
    // Check expiration
    if (Date.now() - entry.timestamp > entry.expiresIn) {
      get().clear(key);
      return null;
    }
    
    return entry.data;
  },
  
  clear: (key) => {
    if (key) {
      const newCache = new Map(get().cache);
      newCache.delete(key);
      set({ cache: newCache });
    } else {
      set({ cache: new Map() });
    }
  },
}));
```

### Usage avec cache

```typescript
// src/store/structures.store.ts
import { useCacheStore } from './cache.store';

export const useStructuresStore = create<StructuresStore>((set, get) => ({
  structures: [],
  
  fetchStructures: async (filters) => {
    const cacheKey = `structures_${JSON.stringify(filters)}`;
    const cached = useCacheStore.getState().get(cacheKey);
    
    if (cached) {
      set({ structures: cached });
      return;
    }
    
    const data = await structuresApi.search(filters);
    
    useCacheStore.getState().set(cacheKey, data, 10 * 60 * 1000); // 10 min
    set({ structures: data });
  },
}));
```

---

## Testing API

### Mock API pour tests

```typescript
// src/api/__mocks__/structures.api.ts
import { Structure } from '../../models/structure.model';

const mockStructures: Structure[] = [
  {
    id: 1,
    name: 'Club de Handball Paris 15',
    type: 'Club',
    address: {
      street: '123 Rue du Sport',
      city: 'Paris',
      postcode: '75015',
      department: 'Paris',
      region: 'Île-de-France',
    },
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    disciplines: ['Handball'],
  },
];

export const structuresApi = {
  search: jest.fn().mockResolvedValue(mockStructures),
  getById: jest.fn().mockResolvedValue(mockStructures[0]),
  getNearby: jest.fn().mockResolvedValue(mockStructures),
};
```

### Tests des services

```typescript
// src/api/__tests__/structures.api.test.ts
import { structuresApi } from '../structures.api';

describe('Structures API', () => {
  it('should search structures', async () => {
    const filters = { query: 'handball' };
    const results = await structuresApi.search(filters);
    
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Club de Handball Paris 15');
  });
});
```

---

## Configuration Expo pour API

### app.json

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ],
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_IOS_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ANDROID_API_KEY"
        }
      }
    }
  }
}
```
