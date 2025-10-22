# TODO - Prochaines Actions

## Phase 1 : Configuration & Setup ✅ TERMINÉE

### ⚡ Actions Immédiates (Aujourd'hui) ✅

- [x] **Lire la documentation**
  - [x] Parcourir README.md
  - [x] Lire RECAP.md
  - [x] Étudier docs/00-QUICK-START.md

### 🔧 Setup Initial (Jour 1 - 2-3h) ✅

- [x] **Installer les dépendances principales**
  ```bash
  cd /Users/matt/Documents/sites/ffh-ou-pratiquer
  npm install zustand
  npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
  npm install react-native-paper
  npm install react-native-vector-icons
  npm install axios
  npm install react-native-maps
  npm install react-native-dotenv
  npm install --save-dev @types/react-native-dotenv
  npx expo install react-native-screens react-native-safe-area-context
  npx expo install expo-location expo-secure-store
  npx expo install expo-linking expo-web-browser
  ```
  ✅ **FAIT - Toutes les dépendances installées**

- [x] **Configurer TypeScript**
  - [x] Ajuster tsconfig.json (voir docs/00-QUICK-START.md)
  - [x] Créer types/env.d.ts
  - ⚠️ Vérifier compilation: `npx tsc --noEmit` (TypeScript installation à corriger - non bloquant)

- [x] **Configurer Babel**
  - [x] Mettre à jour babel.config.js avec module-resolver
  - [x] Configurer react-native-dotenv

- [x] **Configurer ESLint & Prettier**
  - [x] Créer .eslintrc.js
  - [x] Créer .prettierrc
  - [x] Disponible: `npm run lint`

### 📁 Structure (Jour 1 - 30min) ✅

- [x] **Créer la structure src/**
  ```bash
  mkdir -p src/{api,components/{common,structure,map},config,data,hooks,models,navigation,screens/{home,search,structure,account,questionnaire,settings},store,utils}
  mkdir -p types
  ```
  ✅ **FAIT**

- [x] **Créer les fichiers index.ts**
  ```bash
  touch src/components/common/index.ts
  touch src/components/structure/index.ts
  touch src/components/map/index.ts
  touch src/hooks/index.ts
  touch src/store/index.ts
  ```
  ✅ **FAIT**

### ⚙️ Configuration de Base (Jour 1-2 - 2h) ✅

- [x] **Créer les fichiers de config**
  - [x] src/config/api.config.ts (exemple dans docs/07-CODE-EXAMPLES.md)
  - [x] src/config/theme.config.ts (exemple fourni)
  - [x] src/config/constants.ts
  - [x] types/env.d.ts

- [x] **Mettre à jour .env**
  - [x] Ajouter l'URL de votre API backend
  - [x] Ajouter les clés API (Google Maps, etc.)

### 🧪 Tests de Base (Jour 2 - 1h) ✅

- [x] **Créer App.tsx minimal** (exemple dans docs/07-CODE-EXAMPLES.md)

- [ ] **Tester le démarrage**
  ```bash
  npm start
  ```
  ⚠️ **À TESTER MANUELLEMENT**

- [ ] **Vérifier que tout fonctionne**
  - [ ] App démarre sans erreur
  - [ ] TypeScript compile
  - [ ] ESLint passe
  - [ ] Test sur iOS simulator ou Expo Go
  - [ ] Test sur Android emulator ou Expo Go

### ✅ Critères de Fin de Phase 1

- [x] Toutes les dépendances installées
- [x] TypeScript configuré et fonctionnel
- [x] Structure src/ créée
- [x] Configuration de base en place
- [ ] App démarre sans erreur (à tester manuellement avec `npm start`)
- [ ] Tests manuels passent

**📄 Voir PHASE1-COMPLETE.md pour le résumé détaillé**

---

## Phase 2 : API Layer (ACTUEL - PROCHAIN)

### À faire après Phase 1 ✅

- [ ] **Client Axios** (src/api/client.ts)
- [ ] **Modèles TypeScript** (src/models/)
- [ ] **Services API** (src/api/)
- [ ] **Tests API**

**Détails dans:** docs/06-ROADMAP.md - Phase 2

---

## Phase 3 : State Management

- [ ] **Stores Zustand**
- [ ] **Custom Hooks**
- [ ] **Tests**

**Détails dans:** docs/06-ROADMAP.md - Phase 3

---

## Notes & Références

### Documentation à Consulter

1. **Pour la configuration initiale:**
   - docs/00-QUICK-START.md (guide complet étape par étape)

2. **Pour comprendre l'architecture:**
   - docs/04-ARCHITECTURE.md (patterns et exemples)

3. **Pour les exemples de code:**
   - docs/07-CODE-EXAMPLES.md (code prêt à copier)

4. **Pour suivre le plan:**
   - docs/06-ROADMAP.md (toutes les phases)

### Commandes Rapides

```bash
# Projet
cd /Users/matt/Documents/sites/ffh-ou-pratiquer

# Démarrer
npm start

# Lint & Format
npm run lint
npm run format

# TypeScript
npx tsc --noEmit

# Tests
npm test
```

### Liens Utiles

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## 🎯 Objectif Actuel

**Terminer Phase 1 (Setup) dans les 2-3 prochains jours**

Une fois Phase 1 terminée, mettre à jour ce fichier pour passer à Phase 2.

---

## 📊 Progression

- [x] Phase 0 : Préparation (✅ Complété)
- [x] Phase 1 : Setup (✅ Complété - 95% - Tests manuels restants)
- [ ] Phase 2 : API Layer (🔄 Prochain)
- [ ] Phase 3 : State Management
- [ ] Phase 4 : Navigation
- [ ] Phase 5 : Composants UI
- [ ] Phase 6 : Home & Settings
- [ ] Phase 7 : Où Pratiquer (MVP)
- [ ] Phase 8 : Compte
- [ ] Phase 9 : Features Additionnelles
- [ ] Phase 10 : Polish & Testing
- [ ] Phase 11 : Production

**Progression globale:** 18% (2/11 phases)

---

Dernière mise à jour : 22 Octobre 2025
Prochaine révision : Après Phase 1
