# Roadmap de Développement

## Vue d'ensemble

Ce roadmap détaille les étapes de développement de l'application FFH Où Pratiquer avec des estimations de temps et des jalons mesurables.

---

## Phase 0 : Préparation ✅ (Complété)

### Durée : 1 jour

#### Livrables
- [x] Projet Expo créé
- [x] Documentation complète rédigée
  - [x] Analyse projet Flutter
  - [x] Plan de migration
  - [x] User stories
  - [x] Architecture
  - [x] API Integration
  - [x] Quick Start Guide
- [x] Structure de base
- [x] Fichiers de configuration

---

## Phase 1 : Configuration & Setup 🔄 (En cours)

### Durée estimée : 2-3 jours

### Objectifs
Mettre en place l'environnement de développement complet et les fondations du projet.

### Tâches

#### 1.1 Installation Dépendances (2-3h)
- [ ] Installer toutes les dépendances npm
- [ ] Configurer TypeScript
- [ ] Configurer Babel pour path aliases
- [ ] Configurer ESLint & Prettier
- [ ] Vérifier que tout compile

**Commandes :**
```bash
npm install zustand
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-paper axios
npm install react-native-maps
npx expo install expo-location expo-secure-store
npm install react-native-dotenv
```

#### 1.2 Configuration TypeScript (1h)
- [ ] Créer/ajuster tsconfig.json
- [ ] Créer types/env.d.ts
- [ ] Configurer path aliases
- [ ] Vérifier compilation : `npx tsc --noEmit`

#### 1.3 Structure Dossiers (30min)
- [ ] Créer tous les dossiers src/
- [ ] Créer fichiers index.ts pour exports
- [ ] Créer fichiers .gitkeep si nécessaire

#### 1.4 Configuration de Base (2h)
- [ ] src/config/api.config.ts
- [ ] src/config/theme.config.ts
- [ ] src/config/constants.ts
- [ ] Configurer .env avec valeurs de test

#### 1.5 Tests de Base (1h)
- [ ] App.tsx minimal
- [ ] Tester démarrage : `npm start`
- [ ] Tester sur iOS simulator
- [ ] Tester sur Android emulator
- [ ] Tester avec Expo Go

**Critères d'acceptation :**
- ✅ L'app démarre sans erreur
- ✅ TypeScript compile sans erreur
- ✅ ESLint passe sans erreur
- ✅ Tests de base passent

---

## Phase 2 : API Layer 🔜

### Durée estimée : 3-4 jours

### Objectifs
Implémenter toute la couche API et les modèles de données.

### Tâches

#### 2.1 Client API Axios (1 jour)
- [ ] src/api/client.ts avec interceptors
- [ ] Tests de connexion à l'API backend
- [ ] Gestion des erreurs
- [ ] Logging en développement

#### 2.2 Modèles TypeScript (1 jour)
- [ ] src/models/structure.model.ts
- [ ] src/models/user.model.ts
- [ ] src/models/reference.model.ts
- [ ] src/models/api.model.ts

#### 2.3 Services API (1-2 jours)
- [ ] src/api/auth.api.ts
- [ ] src/api/structures.api.ts
- [ ] src/api/reference.api.ts
- [ ] src/api/address.api.ts

#### 2.4 Tests API (0.5 jour)
- [ ] Tests unitaires des services
- [ ] Mocks pour tests
- [ ] Tests d'intégration basiques

**User Stories couvertes :** Aucune (infrastructure)

**Critères d'acceptation :**
- ✅ Tous les endpoints API définis
- ✅ Modèles TypeScript complets
- ✅ Tests passent
- ✅ Connexion à l'API backend fonctionne

---

## Phase 3 : State Management 🔜

### Durée estimée : 2-3 jours

### Objectifs
Créer tous les stores Zustand et custom hooks.

### Tâches

#### 3.1 Stores Zustand (2 jours)
- [ ] src/store/auth.store.ts
- [ ] src/store/structures.store.ts
- [ ] src/store/filters.store.ts
- [ ] src/store/reference.store.ts
- [ ] src/store/cache.store.ts

#### 3.2 Custom Hooks (1 jour)
- [ ] src/hooks/useAuth.ts
- [ ] src/hooks/useLocation.ts
- [ ] src/hooks/useStructures.ts
- [ ] src/hooks/useDebounce.ts
- [ ] src/hooks/useFilters.ts

#### 3.3 Tests (0.5 jour)
- [ ] Tests des stores
- [ ] Tests des hooks

**User Stories couvertes :** Infrastructure

**Critères d'acceptation :**
- ✅ Tous les stores créés et fonctionnels
- ✅ Hooks testés
- ✅ State management opérationnel

---

## Phase 4 : Navigation 🔜

### Durée estimée : 2 jours

### Objectifs
Mettre en place toute la navigation de l'application.

### Tâches

#### 4.1 Navigation Setup (0.5 jour)
- [ ] src/navigation/AppNavigator.tsx
- [ ] src/navigation/routes.ts
- [ ] Types pour navigation

#### 4.2 Tab Navigator (0.5 jour)
- [ ] src/navigation/MainTabNavigator.tsx
- [ ] Icons pour tabs
- [ ] Configuration tabs

#### 4.3 Stack Navigators (1 jour)
- [ ] src/navigation/OuPratiquerNavigator.tsx
- [ ] src/navigation/AccountNavigator.tsx
- [ ] Autres navigators nécessaires

**User Stories couvertes :** Infrastructure navigation

**Critères d'acceptation :**
- ✅ Navigation entre tabs fonctionne
- ✅ Navigation dans les stacks fonctionne
- ✅ Deep linking configuré

---

## Phase 5 : Composants UI 🔜

### Durée estimée : 4-5 jours

### Objectifs
Créer tous les composants réutilisables.

### Tâches

#### 5.1 Composants Common (2 jours)
- [ ] src/components/common/Button.tsx
- [ ] src/components/common/Card.tsx
- [ ] src/components/common/Input.tsx
- [ ] src/components/common/Loading.tsx
- [ ] src/components/common/ErrorMessage.tsx
- [ ] src/components/common/EmptyState.tsx

#### 5.2 Composants Structure (1.5 jours)
- [ ] src/components/structure/StructureCard.tsx
- [ ] src/components/structure/StructureList.tsx
- [ ] src/components/structure/StructureFilters.tsx
- [ ] src/components/structure/AccessibilityBadge.tsx

#### 5.3 Composants Map (1 jour)
- [ ] src/components/map/MapView.tsx
- [ ] src/components/map/Marker.tsx
- [ ] src/components/map/MarkerCluster.tsx (si nécessaire)

#### 5.4 Tests Composants (0.5 jour)
- [ ] Tests de rendu
- [ ] Tests d'interaction

**User Stories couvertes :** Infrastructure UI

**Critères d'acceptation :**
- ✅ Tous les composants créés
- ✅ Design cohérent
- ✅ Responsive
- ✅ Tests passent

---

## Phase 6 : Écrans - Home & Settings 🔜

### Durée estimée : 2 jours

### Objectifs
Développer les écrans Home et Settings.

### Tâches

#### 6.1 HomeScreen (1 jour)
- [ ] src/screens/home/HomeScreen.tsx
- [ ] Raccourcis vers fonctions principales
- [ ] Design accueillant

#### 6.2 SettingsScreen (1 jour)
- [ ] src/screens/settings/SettingsScreen.tsx
- [ ] Préférences utilisateur
- [ ] À propos
- [ ] Version

**User Stories couvertes :** US-3.1, US-5.1

**Critères d'acceptation :**
- ✅ HomeScreen navigable
- ✅ SettingsScreen fonctionnel
- ✅ Sauvegarde des préférences

---

## Phase 7 : Écrans - Où Pratiquer (MVP) 🔜

### Durée estimée : 5-6 jours

### Objectifs
Développer la fonctionnalité principale de recherche.

### Tâches

#### 7.1 OuPratiquerScreen (1.5 jours)
- [ ] src/screens/search/OuPratiquerScreen.tsx
- [ ] Champ de recherche
- [ ] Bouton géolocalisation
- [ ] Accès aux filtres

#### 7.2 SearchFiltersScreen (1 jour)
- [ ] src/screens/search/SearchFiltersScreen.tsx
- [ ] Filtres région, département
- [ ] Filtres discipline, type
- [ ] Application des filtres

#### 7.3 SearchResultsScreen (1.5 jours)
- [ ] src/screens/search/SearchResultsScreen.tsx
- [ ] Liste de résultats
- [ ] Tri par distance
- [ ] Bouton basculer carte

#### 7.4 SearchMapScreen (1 jour)
- [ ] src/screens/search/SearchMapScreen.tsx
- [ ] Affichage markers
- [ ] Clustering
- [ ] Info au clic

#### 7.5 StructureDetailScreen (1 jour)
- [ ] src/screens/structure/StructureDetailScreen.tsx
- [ ] Toutes les infos
- [ ] Boutons d'action (appel, email, web)

**User Stories couvertes :** US-2.1, US-2.2, US-2.3, US-2.4

**Critères d'acceptation :**
- ✅ Recherche par localisation fonctionne
- ✅ Filtres fonctionnent
- ✅ Vue carte opérationnelle
- ✅ Détails complets affichés
- ✅ Actions (appel, email) fonctionnent

---

## Phase 8 : Écrans - Authentification & Compte 🔜

### Durée estimée : 3-4 jours

### Objectifs
Développer la gestion de compte utilisateur.

### Tâches

#### 8.1 LoginScreen (1 jour)
- [ ] src/screens/account/LoginScreen.tsx
- [ ] Formulaire login
- [ ] Validation
- [ ] Gestion erreurs

#### 8.2 AccountScreen (1 jour)
- [ ] src/screens/account/AccountScreen.tsx
- [ ] Infos utilisateur
- [ ] Navigation vers détails
- [ ] Déconnexion

#### 8.3 AccountDetailScreen (0.5 jour)
- [ ] src/screens/account/AccountDetailScreen.tsx
- [ ] Détails complets

#### 8.4 LicensesScreen (1 jour)
- [ ] src/screens/account/LicensesScreen.tsx
- [ ] Liste licences
- [ ] Détails licence

**User Stories couvertes :** US-1.1, US-1.2, US-1.3

**Critères d'acceptation :**
- ✅ Connexion fonctionne
- ✅ Token sauvegardé
- ✅ Infos compte affichées
- ✅ Licences consultables

---

## Phase 9 : Features Additionnelles 🔜

### Durée estimée : 2-3 jours

### Objectifs
Ajouter les fonctionnalités secondaires.

### Tâches

#### 9.1 QuestionnaireScreen (1-2 jours)
- [ ] src/screens/questionnaire/QuestionnaireScreen.tsx
- [ ] Questions dynamiques
- [ ] Sauvegarde brouillon
- [ ] Soumission

#### 9.2 Améliorations UX (1 jour)
- [ ] Animations
- [ ] Feedback visuels
- [ ] Optimisations

**User Stories couvertes :** US-4.1

---

## Phase 10 : Polish & Testing 🔜

### Durée estimée : 4-5 jours

### Objectifs
Finaliser l'application pour production.

### Tâches

#### 10.1 Tests Complets (2 jours)
- [ ] Tests unitaires manquants
- [ ] Tests d'intégration
- [ ] Tests E2E basiques
- [ ] Coverage > 70%

#### 10.2 Performance (1 jour)
- [ ] Optimisation FlatLists
- [ ] Optimisation images
- [ ] Lazy loading
- [ ] Code splitting

#### 10.3 Accessibilité (0.5 jour)
- [ ] Labels accessibilité
- [ ] Navigation clavier
- [ ] Screen reader

#### 10.4 Documentation (0.5 jour)
- [ ] Finaliser README
- [ ] Commentaires code
- [ ] Guide déploiement

#### 10.5 Build & Déploiement (1 jour)
- [ ] Configuration EAS Build
- [ ] Build iOS
- [ ] Build Android
- [ ] Tests sur devices physiques

**Critères d'acceptation :**
- ✅ Tests > 70% coverage
- ✅ Performance optimale
- ✅ Accessible
- ✅ Builds production OK

---

## Phase 11 : Production & Monitoring 🔜

### Durée estimée : 2 jours

### Tâches

#### 11.1 Déploiement (1 jour)
- [ ] Soumission App Store
- [ ] Soumission Play Store
- [ ] Configuration domaine
- [ ] Documentation utilisateur

#### 11.2 Monitoring (1 jour)
- [ ] Sentry ou équivalent
- [ ] Analytics
- [ ] Crash reporting
- [ ] User feedback

---

## Résumé Temporel

| Phase | Durée | Statut |
|-------|-------|--------|
| Phase 0 : Préparation | 1 jour | ✅ Complété |
| Phase 1 : Setup | 2-3 jours | 🔄 En cours |
| Phase 2 : API Layer | 3-4 jours | 🔜 À venir |
| Phase 3 : State Management | 2-3 jours | 🔜 À venir |
| Phase 4 : Navigation | 2 jours | 🔜 À venir |
| Phase 5 : Composants UI | 4-5 jours | 🔜 À venir |
| Phase 6 : Home & Settings | 2 jours | 🔜 À venir |
| Phase 7 : Où Pratiquer (MVP) | 5-6 jours | 🔜 À venir |
| Phase 8 : Compte | 3-4 jours | 🔜 À venir |
| Phase 9 : Features Add. | 2-3 jours | 🔜 À venir |
| Phase 10 : Polish & Testing | 4-5 jours | 🔜 À venir |
| Phase 11 : Production | 2 jours | 🔜 À venir |
| **TOTAL** | **32-42 jours** | **~6-8 semaines** |

---

## Jalons (Milestones)

### Milestone 1 : Infrastructure Ready
**Date cible :** J+5  
**Critères :**
- API layer complet
- State management opérationnel
- Navigation configurée

### Milestone 2 : MVP Fonctionnel
**Date cible :** J+20  
**Critères :**
- Recherche de structures fonctionne
- Vue liste et carte
- Détails structures
- Compte utilisateur

### Milestone 3 : Feature Complete
**Date cible :** J+30  
**Critères :**
- Toutes les fonctionnalités implémentées
- Tests en place
- Performance optimisée

### Milestone 4 : Production Ready
**Date cible :** J+40  
**Critères :**
- Builds production OK
- Déployé sur stores
- Monitoring actif

---

## Prochaine Action

**Pour démarrer Phase 1 :**
```bash
cd /Users/matt/Documents/sites/ffh-ou-pratiquer
# Suivre le guide : docs/00-QUICK-START.md
```

---

**Note :** Les durées sont des estimations. Ajuster selon la complexité rencontrée et les retours utilisateurs.
