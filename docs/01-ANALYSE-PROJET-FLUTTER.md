# Analyse du Projet Flutter Original

## Vue d'ensemble
**Nom**: oupratiquer (HandiGo)
**Type**: Application Flutter pour la recherche de structures sportives accessibles
**Version**: 1.0.0+1

## Architecture

### Structure des dossiers
```
lib/
├── config/          # Configuration API et environnement
├── data/            # Données de référence (régions, départements)
├── models/          # Modèles de données
├── services/        # Services API et logique métier
├── viewmodels/      # ViewModels (pattern MVVM)
├── views/           # Écrans et composants UI
└── widgets/         # Widgets réutilisables
```

### Dépendances principales

#### State Management & Navigation
- **provider: ^6.1.2** - State management (pattern utilisé dans tout le projet)
- **shared_preferences: ^2.1.0** - Persistance locale

#### Network & API
- **http: ^1.4.0** - Requêtes HTTP
- **flutter_dotenv: ^5.1.0** - Configuration environnement (.env)

#### UI & Maps
- **flutter_map: ^7.0.2** - Cartes interactives
- **latlong2: ^0.9.1** - Coordonnées géographiques

#### Utilities
- **device_info_plus: ^11.5.0** - Info appareil
- **url_launcher: ^6.3.2** - Ouverture URLs externes
- **flutter_launcher_icons: ^0.14.4** - Génération icônes

## Services API

### 1. API Service (api_service.dart)
Service générique pour les requêtes API

### 2. OuPratiquerApiService (ou_pratiquer_api_service.dart)
Service spécifique pour la recherche de structures sportives
- Endpoint: `/ou-pratiquer/search`

### 3. AuthService (auth_service.dart)
Gestion de l'authentification
- Sauvegarde locale des credentials
- Token management

### 4. ReferenceDataService (reference_data_service.dart)
Gestion des données de référence (régions, départements, disciplines)

### 5. AutocompleteService (autocomplete_service.dart)
Service d'autocomplétion pour les recherches

### 6. AddressApiService (address_api_service.dart)
Service pour la géolocalisation et recherche d'adresses

## Modèles de données

### Structures principales
1. **Place** - Lieu/Structure sportive
2. **EnhancedPlace** - Place avec données enrichies
3. **StructureDetail** - Détails complets d'une structure
4. **Region** - Région française
5. **Departement** - Département français
6. **Discipline** - Discipline sportive
7. **StructureType** - Type de structure (club, association, etc.)
8. **Affiliation** - Affiliation d'une structure
9. **TagItem** - Tags pour filtres
10. **HandigoSummary** - Résumé accessibilité HandiGo

## ViewModels (State Management)

### 1. HomeViewModel
Gestion de l'écran d'accueil
- Chargement des données initiales
- État de l'application

### 2. SearchViewModel
Gestion de la recherche générique
- Filtres de recherche
- Résultats

### 3. OuPratiquerViewModel
Gestion de la recherche "Où Pratiquer"
- Recherche géolocalisée
- Filtres avancés (région, département, discipline)

### 4. EnhancedSearchViewModel
Recherche enrichie avec plus de critères

### 5. StructureDetailViewModel
Détails d'une structure spécifique

## Écrans principaux

### Navigation
- **NavigationManager** - Gestionnaire principal de navigation (4 tabs)
  - Home
  - Où Pratiquer
  - Compte
  - Paramètres

### Écrans Home
- **HomeScreen** - Écran d'accueil

### Écrans Où Pratiquer
- **OuPratiquerSearchView** - Recherche de structures
- **OuPratiquerResultsView** - Résultats de recherche
- **OuPratiquerMapView** - Vue carte des résultats
- **StructureDetailView** - Détails d'une structure
- **StructureContactView** - Contact d'une structure

### Écrans Compte
- **LoginScreen** - Connexion
- **CompteView** - Vue du compte utilisateur
- **CompteDetailsView** - Détails du compte
- **LicenseView** - Gestion des licences

### Écrans Recherche
- **SearchScreen** - Recherche générique
- **AdvancedSearchView** - Recherche avancée
- **SearchResultsView** - Résultats de recherche
- **SearchMapView** - Vue carte des résultats

### Écrans Questionnaire
- **QuestionnaireView** - Questionnaire d'évaluation

### Écrans Paramètres
- **SettingsView** - Paramètres de l'application

## Configuration API

### Fichier .env
```env
API_BASE_URL=https://your-ngrok-url.ngrok-free.app/api
OU_PRATIQUER_ENDPOINT=/ou-pratiquer/search
API_TIMEOUT=30
API_CONTENT_TYPE=application/json
NGROK_SKIP_BROWSER_WARNING=true
```

### Headers par défaut
- `Content-Type: application/json`
- `ngrok-skip-browser-warning: true` (pour développement ngrok)

## Assets

### Images
- `assets/images/` - Images de l'application

### Icons
- `assets/icons/` - Icônes personnalisées
- `assets/nav_app_icons/` - Icônes de navigation

## Fonctionnalités principales

### 1. Recherche de structures sportives
- Recherche par nom, localisation
- Filtres: région, département, discipline, type
- Résultats en liste et carte

### 2. Géolocalisation
- Recherche autour de ma position
- Affichage sur carte interactive
- Calcul de distance

### 3. Détails des structures
- Informations complètes
- Accessibilité HandiGo
- Contact (téléphone, email, site web)

### 4. Authentification
- Connexion utilisateur
- Gestion du compte
- Licences

### 5. Questionnaire
- Évaluation d'accessibilité

### 6. Données de référence
- Régions françaises
- Départements français
- Disciplines sportives
- Types de structures

## Pattern utilisé
**MVVM (Model-View-ViewModel)** avec Provider pour le state management

### Flow typique:
1. **View** déclenche une action
2. **ViewModel** traite la logique
3. **Service** fait l'appel API
4. **Model** structure les données
5. **ViewModel** notifie la **View** (notifyListeners)
6. **View** se reconstruit

## Points d'attention pour la migration

### 1. State Management
Flutter utilise Provider → React Native pourrait utiliser:
- Context API + Hooks
- Redux Toolkit
- Zustand
- MobX

### 2. Navigation
Flutter Navigator → React Navigation

### 3. Maps
flutter_map → react-native-maps

### 4. HTTP
http package → axios ou fetch API

### 5. Storage
shared_preferences → AsyncStorage ou expo-secure-store

### 6. Environnement
flutter_dotenv → react-native-dotenv ou expo-constants

### 7. Composants UI
Material/Cupertino → React Native Elements, NativeBase, ou custom

## Backend API (Laravel)
L'application communique avec une API Laravel (non incluse dans ce projet)
- Authentification
- CRUD structures
- Recherche géolocalisée
- Données de référence
