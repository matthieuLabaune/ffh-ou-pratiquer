# Plan de Migration Flutter → React Native

## Objectif
Migrer l'application Flutter "oupratiquer" (HandiGo) vers React Native avec Expo en conservant toutes les fonctionnalités et en améliorant l'architecture.

## Stack Technique React Native

### Core
- **React Native** - Framework mobile
- **Expo** - Toolchain et services
- **TypeScript** - Type safety

### State Management
- **Zustand** - State management simple et performant
  - Alternative légère à Redux
  - API simple et intuitive
  - Bon pour ce type d'app

### Navigation
- **React Navigation v6** - Navigation standard RN
  - Bottom Tabs Navigator
  - Stack Navigator
  - Support deep linking

### UI Components
- **React Native Paper** - Material Design
  - Cohérent avec le design Flutter actuel
  - Composants riches
- **React Native Elements** - Composants additionnels

### Maps & Location
- **react-native-maps** - Cartes interactives
- **expo-location** - Géolocalisation

### HTTP & Storage
- **axios** - Client HTTP
- **expo-secure-store** - Stockage sécurisé
- **AsyncStorage** - Stockage simple

### Utilities
- **react-native-dotenv** - Variables d'environnement
- **date-fns** - Manipulation dates
- **expo-linking** - Deep linking et URL externes

## Structure du Projet

```
ffh-ou-pratiquer/
├── docs/                           # Documentation
│   ├── 01-ANALYSE-PROJET-FLUTTER.md
│   ├── 02-PLAN-MIGRATION.md
│   ├── 03-USER-STORIES.md
│   ├── 04-ARCHITECTURE.md
│   └── 05-API-INTEGRATION.md
│
├── src/
│   ├── api/                        # Services API
│   │   ├── client.ts              # Configuration axios
│   │   ├── auth.api.ts            # API Authentication
│   │   ├── structures.api.ts      # API Structures sportives
│   │   ├── reference.api.ts       # API Données de référence
│   │   └── address.api.ts         # API Géolocalisation
│   │
│   ├── components/                 # Composants réutilisables
│   │   ├── common/                # Composants génériques
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loading.tsx
│   │   ├── structure/             # Composants structures
│   │   │   ├── StructureCard.tsx
│   │   │   ├── StructureList.tsx
│   │   │   └── StructureFilters.tsx
│   │   └── map/                   # Composants carte
│   │       ├── MapView.tsx
│   │       └── MarkerCluster.tsx
│   │
│   ├── config/                     # Configuration
│   │   ├── api.config.ts          # Config API
│   │   ├── theme.config.ts        # Thème de l'app
│   │   └── constants.ts           # Constantes
│   │
│   ├── data/                       # Données statiques
│   │   ├── regions.data.ts        # Régions françaises
│   │   └── departements.data.ts   # Départements
│   │
│   ├── hooks/                      # Custom Hooks
│   │   ├── useAuth.ts             # Hook authentification
│   │   ├── useLocation.ts         # Hook géolocalisation
│   │   ├── useStructures.ts       # Hook structures
│   │   └── useDebounce.ts         # Hook debounce
│   │
│   ├── models/                     # Types TypeScript
│   │   ├── structure.model.ts     # Structure sportive
│   │   ├── user.model.ts          # Utilisateur
│   │   ├── reference.model.ts     # Données référence
│   │   └── api.model.ts           # Types API
│   │
│   ├── navigation/                 # Navigation
│   │   ├── AppNavigator.tsx       # Navigateur principal
│   │   ├── MainTabNavigator.tsx   # Tabs
│   │   └── routes.ts              # Routes
│   │
│   ├── screens/                    # Écrans
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── search/
│   │   │   ├── OuPratiquerScreen.tsx
│   │   │   ├── SearchFiltersScreen.tsx
│   │   │   ├── SearchResultsScreen.tsx
│   │   │   └── SearchMapScreen.tsx
│   │   ├── structure/
│   │   │   ├── StructureDetailScreen.tsx
│   │   │   └── StructureContactScreen.tsx
│   │   ├── account/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── AccountScreen.tsx
│   │   │   ├── AccountDetailScreen.tsx
│   │   │   └── LicensesScreen.tsx
│   │   ├── questionnaire/
│   │   │   └── QuestionnaireScreen.tsx
│   │   └── settings/
│   │       └── SettingsScreen.tsx
│   │
│   ├── store/                      # Zustand stores
│   │   ├── auth.store.ts          # Store auth
│   │   ├── structures.store.ts    # Store structures
│   │   ├── filters.store.ts       # Store filtres
│   │   └── reference.store.ts     # Store référence
│   │
│   └── utils/                      # Utilitaires
│       ├── helpers.ts             # Fonctions helper
│       ├── validation.ts          # Validation
│       ├── storage.ts             # Storage helpers
│       └── location.ts            # Helpers géolocalisation
│
├── assets/                         # Assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.example                    # Template env
├── .env                            # Variables env (git ignored)
├── app.json                        # Config Expo
├── package.json
├── tsconfig.json
└── README.md
```

## Phases de Migration

### Phase 1: Setup & Configuration (1-2 jours)
- [x] Créer projet Expo
- [ ] Installer dépendances
- [ ] Configurer TypeScript
- [ ] Configurer environnement (.env)
- [ ] Setup navigation
- [ ] Setup Zustand stores
- [ ] Configurer thème

### Phase 2: API Integration (2-3 jours)
- [ ] Créer client API axios
- [ ] Implémenter services API
  - [ ] Authentication
  - [ ] Structures
  - [ ] Référence data
  - [ ] Géolocalisation
- [ ] Types TypeScript pour API
- [ ] Tests API basiques

### Phase 3: State Management (1-2 jours)
- [ ] Store authentification
- [ ] Store structures
- [ ] Store filtres de recherche
- [ ] Store données de référence
- [ ] Custom hooks

### Phase 4: Composants UI (3-4 jours)
- [ ] Composants communs
  - [ ] Buttons
  - [ ] Cards
  - [ ] Inputs
  - [ ] Loading states
- [ ] Composants structures
  - [ ] Structure cards
  - [ ] Structure lists
  - [ ] Filters
- [ ] Composants carte
  - [ ] MapView
  - [ ] Markers

### Phase 5: Écrans - Navigation (2 jours)
- [ ] Bottom Tab Navigator
- [ ] Stack navigators
- [ ] HomeScreen (skeleton)

### Phase 6: Écrans - Où Pratiquer (3-4 jours)
- [ ] OuPratiquerScreen (recherche)
- [ ] SearchFiltersScreen
- [ ] SearchResultsScreen (liste)
- [ ] SearchMapScreen (carte)
- [ ] StructureDetailScreen
- [ ] StructureContactScreen

### Phase 7: Écrans - Compte (2-3 jours)
- [ ] LoginScreen
- [ ] AccountScreen
- [ ] AccountDetailScreen
- [ ] LicensesScreen

### Phase 8: Écrans - Autres (2 jours)
- [ ] QuestionnaireScreen
- [ ] SettingsScreen
- [ ] AboutScreen

### Phase 9: Features Avancées (2-3 jours)
- [ ] Géolocalisation temps réel
- [ ] Recherche avec autocomplete
- [ ] Filtres avancés
- [ ] Cache & offline mode
- [ ] Deep linking

### Phase 10: Polish & Testing (3-4 jours)
- [ ] Optimisations performance
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Accessibilité
- [ ] Documentation
- [ ] Build & déploiement

## Durée totale estimée: 3-4 semaines

## Différences clés avec Flutter

### 1. State Management
**Flutter (Provider)**:
```dart
class OuPratiquerViewModel extends ChangeNotifier {
  List<Place> _places = [];
  
  void loadPlaces() {
    // logic
    notifyListeners();
  }
}
```

**React Native (Zustand)**:
```typescript
const useStructuresStore = create<StructuresStore>((set) => ({
  structures: [],
  loadStructures: async () => {
    // logic
    set({ structures: data });
  },
}));
```

### 2. Navigation
**Flutter**:
```dart
Navigator.push(context, MaterialPageRoute(
  builder: (context) => DetailScreen()
));
```

**React Native**:
```typescript
navigation.navigate('StructureDetail', { id });
```

### 3. API Calls
**Flutter**:
```dart
final response = await http.get(uri, headers: headers);
final data = json.decode(response.body);
```

**React Native**:
```typescript
const response = await axios.get(url, { headers });
const data = response.data;
```

### 4. Storage
**Flutter**:
```dart
final prefs = await SharedPreferences.getInstance();
await prefs.setString('key', value);
```

**React Native**:
```typescript
await SecureStore.setItemAsync('key', value);
```

## Avantages de la migration

### 1. Écosystème JavaScript
- Plus grande communauté
- Plus de packages disponibles
- Meilleure intégration web

### 2. Hot Reload amélioré
- Expo Go pour tests rapides
- Fast Refresh

### 3. TypeScript
- Type safety
- Meilleure DX
- Moins d'erreurs runtime

### 4. Zustand vs Provider
- Plus simple
- Moins de boilerplate
- Meilleures performances

### 5. React Navigation
- Plus flexible
- Meilleure documentation
- Deep linking natif

## Challenges à anticiper

### 1. Maps
- Configuration plus complexe
- API keys nécessaires
- Performance sur Android

### 2. Géolocalisation
- Permissions runtime
- Background location
- Précision variable

### 3. Build & Déploiement
- Configuration native plus lourde
- EAS Build pour Expo

### 4. Performance
- Liste longues → FlatList optimisé
- Images → FastImage
- Animations → Reanimated

## Next Steps

1. Finaliser documentation
2. Installer dépendances
3. Setup configuration de base
4. Commencer par l'API integration
5. Développer screen par screen selon user stories
