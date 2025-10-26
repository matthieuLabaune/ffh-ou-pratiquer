# Corrections API - Connexion React Native ↔ Laravel

## Problème identifié
L'API Laravel FFH fonctionne correctement (testé avec Postman et curl), mais l'application React Native utilisait les données mockées à cause de deux problèmes :

### 1. Timeout trop court
- **Problème** : Timeout de 5000ms (5s) trop court pour ngrok
- **Solution** : Augmentation à 15000ms (15s)

### 2. Format de réponse API mal interprété
- **Problème** : L'API retourne `{"data": [structures...]}` mais le code tentait d'appliquer `.map()` directement sur la réponse complète
- **Solution** : Extraction de `apiResponse.data` avant transformation

## Corrections apportées

### `/src/api/structures.service.ts`
```typescript
// AVANT
const apiResponse = await apiClient.get<any[]>(...)
return transformDirectApiResponse(apiResponse);

// APRÈS
const apiResponse = await apiClient.get<{data: any[]}>(...)
return transformDirectApiResponse(apiResponse.data);
```

### `/src/utils/api-transformers.ts`
Ajout de `transformDirectApiStructure()` pour le format API FFH :
```typescript
export function transformDirectApiStructure(item: any): Structure {
  return {
    id: item.id.toString(),
    name: item.name,
    address: {
      street: item.address || '',
      city: item.city || '',
      postalCode: item.postal_code || '',
      latitude: item.latitude ? parseFloat(item.latitude) : undefined,
      longitude: item.longitude ? parseFloat(item.longitude) : undefined,
    },
    contact: {
      phone: item.phone || undefined,
      mobile: item.mobile || undefined,
      email: item.email || undefined,
      website: item.website || undefined,
    },
    disciplines: (item.disciplines || []).map((name: string) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
    })),
    // ... autres champs
  };
}
```

### `/src/models/Structure.ts`
Ajout des champs manquants :
- `mobile` dans Contact
- `region` et `departement` dans Structure
- `season` optionnel

## Test de validation

### Curl (fonctionne) :
```bash
curl -H "ngrok-skip-browser-warning: true" \
  "https://2dc1217ab612.ngrok-free.app/api/ou-pratiquer/search?discipline=aviron"
```

### Réponse API (format correct) :
```json
{
  "data": [
    {
      "id": 5990,
      "name": "AVIRON CLUB ORLEANS OUEST",
      "city": "OLIVET (45160)",
      "address": "2575 Rue De La Source",
      "disciplines": ["Aviron"],
      "mobilities": ["Déficience auditive", ...],
      "latitude": "47.8505674",
      "longitude": "1.9285634"
    }
  ]
}
```

## Résultat attendu
- ✅ L'API FFH fonctionne via ngrok
- ✅ Les données sont correctement transformées
- ✅ Plus de timeout avec un délai de 15s
- ✅ Affichage des vraies structures au lieu des données mockées

## Pour tester
1. Lancer l'app avec `npx expo start`
2. Naviguer vers l'écran "Rechercher"
3. Vérifier que les vraies structures FFH s'affichent
4. Tester les filtres par discipline (ex: "aviron")

## Étapes suivantes
1. ✅ Résoudre la connexion API
2. 🔄 Activer la géolocalisation (après correction Laravel des colonnes lat/lng)
3. 🔄 Intégrer Google Maps
4. 🔄 Optimiser les performances (pagination, cache)
