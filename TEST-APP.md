# 🧪 Guide de Test de l'Application

## ✅ L'application est TESTABLE maintenant !

### 🚀 Démarrer l'App

```bash
cd /Users/matt/Documents/sites/ffh-ou-pratiquer
npm start
```

### 📱 Options de Test

1. **Expo Go (Téléphone)**
   - Scanner le QR code affiché
   - iOS: Appareil photo natif
   - Android: App Expo Go

2. **Simulateur iOS**
   - Appuyer sur `i` dans le terminal
   - Nécessite Xcode installé

3. **Emulator Android**
   - Appuyer sur `a` dans le terminal
   - Nécessite Android Studio

4. **Web Browser**
   - Appuyer sur `w` dans le terminal
   - Navigation limitée sur web

---

## 🎯 Ce que Vous Pouvez Tester

### ✅ Navigation (Phase 4)

**Bottom Tabs** - 4 onglets fonctionnels :
- 🏠 **Accueil** - HomeScreen
- 🔍 **Rechercher** - SearchScreen (placeholder)
- ❤️ **Favoris** - FavoritesScreen (placeholder)
- 👤 **Compte** - AccountScreen

### ✅ Géolocalisation (Phase 3)

**HomeScreen** affiche :
- Position GPS actuelle
- Latitude / Longitude
- Bouton "Activer la géolocalisation"

**Note:** Sur simulateur, position par défaut. Sur device réel, GPS réel.

### ✅ Authentification (Phase 3)

**LoginScreen** :
- Formulaire email + mot de passe
- Bouton "Se connecter"
- Lien "Créer un compte"

**AccountScreen** :
- Affichage profil utilisateur
- Bouton "Se déconnecter"

---

## ⚠️ Backend Pas Encore Prêt

L'application frontend est prête mais le **backend API n'existe pas encore**.

Pour tester la navigation sans backend :

### Option 1 : Mock Temporaire dans authStore

Modifier `src/store/authStore.ts`, fonction `login`:

```typescript
login: async (credentials: LoginCredentials) => {
  set({ isLoading: true, error: null });
  
  // 🧪 MOCK TEMPORAIRE POUR TESTS
  const mockUser: User = {
    id: '1',
    email: credentials.email,
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  await Storage.setItem('auth_token', 'mock-token');
  await Storage.setObject('user', mockUser);
  
  set({
    user: mockUser,
    token: 'mock-token',
    refreshToken: 'mock-refresh',
    isAuthenticated: true,
    isLoading: false,
  });
  return;
  // FIN MOCK - Supprimer quand backend prêt
  
  // Code original (commenté temporairement)
  // try {
  //   const response = await authService.login(credentials);
  //   ...
  // }
},
```

**Puis :**
1. Entrez n'importe quel email/password
2. Cliquez "Se connecter"
3. → Vous serez redirigé vers l'écran Home
4. → Navigation Tabs accessible

### Option 2 : Modifier loadStoredSession

Dans `authStore.ts`, fonction `loadStoredSession`:

```typescript
loadStoredSession: async () => {
  set({ isLoading: true });
  
  // 🧪 AUTO-LOGIN POUR TESTS
  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  set({
    user: mockUser,
    token: 'mock-token',
    isAuthenticated: true,
    isLoading: false,
  });
  return;
  // FIN MOCK
  
  // Code original...
},
```

**Résultat :** L'app démarre directement sur HomeScreen (connecté).

---

## 🎨 Ce Qui Fonctionne

### ✅ Phase 1 : Setup
- Configuration complète
- TypeScript
- ESLint/Prettier
- Structure projet

### ✅ Phase 2 : API Layer
- Client HTTP (fetch)
- Services API
- Modèles TypeScript
- Utilitaires (storage, validation, format, location)

### ✅ Phase 3 : State Management
- 5 Stores Zustand
- 6 Custom Hooks
- Persistence données
- Error/Loading states

### ✅ Phase 4 : Navigation
- React Navigation
- Bottom Tabs
- Auth/Main navigators
- 6 écrans de base
- Navigation guards

---

## 📝 Scénarios de Test

### Scénario 1 : Géolocalisation

1. Démarrer l'app
2. Si pas connecté, ajouter mock auth (voir ci-dessus)
3. Aller sur onglet "Accueil"
4. Voir la demande de permission géolocalisation
5. Autoriser
6. → Latitude/Longitude affichées

### Scénario 2 : Navigation

1. Tester les 4 onglets :
   - Accueil ✅
   - Rechercher ✅ (placeholder)
   - Favoris ✅ (placeholder)
   - Compte ✅

2. Vérifier les icônes
3. Vérifier les titres français
4. Navigation fluide

### Scénario 3 : Authentification

1. **Logout** depuis Account
2. → Retour à LoginScreen
3. Entrer email/password
4. **Login** (avec mock)
5. → Redirection vers Home
6. Session persistante

---

## 🐛 Problèmes Connus

### Sans Backend
- Login réel ne fonctionne pas → Utiliser mock
- Recherche structures impossible → Phase 7
- Favoris vides → Phase 7

### Géolocalisation
- Simulateur: position fictive
- Permission peut être refusée → Réessayer

### Performance
- Premier chargement peut être lent
- Normal pour dev mode

---

## 📊 Progression

**5 phases sur 11 terminées (45%)**

✅ Phase 0 : Préparation
✅ Phase 1 : Setup
✅ Phase 2 : API Layer
✅ Phase 3 : State Management
✅ Phase 4 : Navigation
🔄 Phase 5 : Composants UI (Prochain)
⏳ Phase 6-11 : À venir

---

## 🎯 Prochaines Étapes

### Phase 5 : Composants UI
- StructureCard
- StructureList
- FilterBar
- SearchBar
- MapView

### Phase 6 : Home & Settings
- Écrans complets
- Paramètres app

### Phase 7 : Où Pratiquer (MVP)
- Recherche structures
- Filtres
- Carte
- Détails

---

## 💡 Conseils

1. **Testez d'abord sur simulateur/emulator**
   - Plus rapide pour développer
   - Logs visibles

2. **Puis sur device réel**
   - Géolocalisation réelle
   - Performance réelle
   - Gestes tactiles

3. **Hot Reload**
   - Sauvegardez un fichier
   - → App se recharge automatiquement
   - Gain de temps énorme

4. **Logs**
   - `console.log()` visible dans terminal
   - Ou dans l'app Expo Go (shake device)

---

## 🚀 Commandes Utiles

```bash
# Démarrer
npm start

# Clear cache si problème
npm start -- --clear

# TypeScript check
npx tsc --noEmit

# Lint
npm run lint

# Format
npm run format
```

---

## ✨ Félicitations !

Votre app React Native est **fonctionnelle** et **testable** !

**Phases complétées :**
- ✅ Configuration projet
- ✅ API & State management
- ✅ Navigation & Écrans de base
- ✅ Géolocalisation
- ✅ Authentification (UI)

**Prêt pour continuer avec les composants UI !** 🎨

