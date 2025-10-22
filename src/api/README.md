# API Services

Ce dossier contient tous les services API de l'application.

## Architecture

Au lieu d'utiliser Axios, nous utilisons **fetch natif** pour plus de sécurité et moins de dépendances.

### HttpClient (`src/config/api.config.ts`)

Client HTTP personnalisé avec :
- ✅ Timeout configurable
- ✅ Headers par défaut
- ✅ Gestion des erreurs
- ✅ Support GET, POST, PUT, DELETE
- ✅ Pas de dépendances externes

### Utilisation de Base

```typescript
import { httpClient } from '@config/api.config';

// GET request
const data = await httpClient.get<MyType>('/endpoint');

// POST request
const result = await httpClient.post<ResultType>('/endpoint', { 
  key: 'value' 
});

// PUT request
await httpClient.put('/endpoint', { id: 1, name: 'Updated' });

// DELETE request
await httpClient.delete('/endpoint/123');
```

### Créer un Service

```typescript
// src/api/myservice.service.ts
import { httpClient } from '@config/api.config';

export interface MyData {
  id: string;
  name: string;
}

export const myService = {
  async getAll(): Promise<MyData[]> {
    return httpClient.get<MyData[]>('/my-endpoint');
  },
  
  async getById(id: string): Promise<MyData> {
    return httpClient.get<MyData>(`/my-endpoint/${id}`);
  },
  
  async create(data: Partial<MyData>): Promise<MyData> {
    return httpClient.post<MyData>('/my-endpoint', data);
  },
};
```

### Gestion des Erreurs

```typescript
try {
  const data = await httpClient.get('/endpoint');
} catch (error) {
  if (error instanceof Error) {
    if (error.message === 'Request timeout') {
      // Timeout
    } else if (error.message.startsWith('HTTP Error:')) {
      // Erreur serveur
    } else {
      // Erreur réseau
    }
  }
}
```

### Avantages de fetch natif

✅ **Sécurité** : Pas de dépendances externes avec potentielles failles  
✅ **Performance** : Natif au navigateur/React Native  
✅ **Simplicité** : API standard  
✅ **Maintenance** : Une dépendance en moins à maintenir  
✅ **TypeScript** : Support natif des types  

### Configuration

Les variables d'environnement sont dans `.env` :

```
API_BASE_URL=http://votre-api.com/api
API_TIMEOUT=30000
```

## Services Disponibles

- `structures.service.ts` - Recherche et récupération de structures
- _À venir : auth.service.ts, user.service.ts, etc._

## Prochaines Étapes

1. Créer les autres services (auth, user, etc.)
2. Ajouter un intercepteur pour l'authentification
3. Ajouter un cache avec AsyncStorage
4. Ajouter la gestion offline
