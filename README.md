# FFH Où Pratiquer - React Native

Application mobile React Native avec Expo pour rechercher des structures sportives accessibles.

## 🎯 À propos

Migration de l'application Flutter "oupratiquer" (HandiGo) vers React Native avec Expo. Application permettant de rechercher des clubs, associations et structures sportives en France avec un focus sur l'accessibilité.

## 📱 Fonctionnalités

### Version 1.0 (MVP)
- ✅ Recherche de structures sportives par localisation
- ✅ Géolocalisation et recherche autour de moi
- ✅ Filtres avancés (région, département, discipline, type)
- ✅ Affichage résultats en liste et carte
- ✅ Détails complets des structures
- ✅ Contact direct (téléphone, email, site web)
- ✅ Authentification utilisateur
- ✅ Gestion du compte et licences

### Futures versions
- 📋 Questionnaire d'évaluation accessibilité
- ⭐ Favoris et historique
- 🔔 Notifications
- 🌐 Mode hors ligne

## 🛠 Stack Technique

### Core
- **React Native** + **Expo**
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Navigation** - Navigation

### UI/UX
- **React Native Paper** - Material Design
- **react-native-maps** - Cartes
- **expo-location** - Géolocalisation

### API & Data
- **Axios** - HTTP client
- **expo-secure-store** - Stockage sécurisé
- **react-native-dotenv** - Variables env

## 📋 Prérequis

```bash
node >= 18.0.0
npm >= 9.0.0
expo-cli (installé globalement ou via npx)
```

## 🚀 Installation

### 1. Cloner le projet
```bash
cd /Users/matt/Documents/sites
git clone <repository-url> ffh-ou-pratiquer
cd ffh-ou-pratiquer
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
cp .env.example .env
```

Éditer `.env` avec vos configurations :
```env
API_BASE_URL=https://your-api-url.com/api
GOOGLE_MAPS_API_KEY=your_key_here
```

### 4. Lancer l'application

#### Développement
```bash
# Démarrer Expo
npm start

# iOS (nécessite macOS + Xcode)
npm run ios

# Android (nécessite Android Studio)
npm run android

# Web
npm run web
```

#### Expo Go
1. Installer Expo Go sur votre téléphone
2. Scanner le QR code affiché dans le terminal

## 📁 Structure du Projet

```
ffh-ou-pratiquer/
├── docs/                    # Documentation complète
│   ├── 01-ANALYSE-PROJET-FLUTTER.md
│   ├── 02-PLAN-MIGRATION.md
│   ├── 03-USER-STORIES.md
│   ├── 04-ARCHITECTURE.md
│   └── 05-API-INTEGRATION.md
│
├── src/
│   ├── api/                # Services API
│   ├── components/         # Composants réutilisables
│   ├── config/            # Configuration
│   ├── hooks/             # Custom Hooks
│   ├── models/            # Types TypeScript
│   ├── navigation/        # Navigation
│   ├── screens/           # Écrans
│   ├── store/             # Zustand stores
│   └── utils/             # Utilitaires
│
├── assets/                # Images, icônes, fonts
├── .env                   # Variables d'environnement (git ignored)
├── .env.example          # Template des variables
├── app.json              # Config Expo
├── package.json
└── tsconfig.json
```

## 🔧 Configuration

### Variables d'environnement (.env)

```env
# API
API_BASE_URL=https://your-api.com/api
API_TIMEOUT=30000

# Maps
GOOGLE_MAPS_API_KEY=your_key
MAPBOX_ACCESS_TOKEN=your_token

# App
APP_NAME=FFH Où Pratiquer
ENVIRONMENT=development
```

### Configuration Expo (app.json)

Voir `app.json` pour la configuration complète Expo.

## 📖 Documentation

### Documentation complète disponible dans `/docs` :

1. **01-ANALYSE-PROJET-FLUTTER.md** - Analyse du projet Flutter original
2. **02-PLAN-MIGRATION.md** - Plan de migration vers React Native
3. **03-USER-STORIES.md** - User stories et scénarios détaillés
4. **04-ARCHITECTURE.md** - Architecture technique détaillée
5. **05-API-INTEGRATION.md** - Documentation API et intégration

### Quick Links
- [User Stories](docs/03-USER-STORIES.md)
- [Architecture](docs/04-ARCHITECTURE.md)
- [API Integration](docs/05-API-INTEGRATION.md)

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests avec coverage
npm run test:coverage

# Tests e2e
npm run test:e2e
```

## 🏗 Build

### Development Build
```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android
```

### Production Build
```bash
# iOS
eas build --profile production --platform ios

# Android
eas build --profile production --platform android
```

## 📱 Publication

### Expo Go (pour tests)
```bash
expo publish
```

### App Stores (production)
```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

## 🤝 Contribution

### Workflow Git
```bash
# Créer une branche feature
git checkout -b feature/ma-fonctionnalite

# Commits
git commit -m "feat: ajout de la fonctionnalité X"

# Push et PR
git push origin feature/ma-fonctionnalite
```

### Conventions de commit
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage code
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

## 🐛 Debugging

### React Native Debugger
```bash
# Ouvrir le menu dev
- iOS: Cmd+D
- Android: Cmd+M

# Options utiles :
- Reload (r)
- Debug JS Remotely
- Show Performance Monitor
```

### Logs
```bash
# Logs Expo
npx expo start

# Logs natifs iOS
npx react-native log-ios

# Logs natifs Android
npx react-native log-android
```

## 📊 État du Projet

### ✅ Phase 1 : Setup (Complété)
- [x] Création projet Expo
- [x] Documentation complète
- [x] Architecture définie
- [x] User stories

### 🚧 Phase 2 : En cours
- [ ] Installation dépendances
- [ ] Configuration TypeScript
- [ ] Setup navigation
- [ ] Configuration API

### ⏳ Phases suivantes
- [ ] Phase 3 : API Integration
- [ ] Phase 4 : Components UI
- [ ] Phase 5 : Screens
- [ ] Phase 6 : Testing
- [ ] Phase 7 : Déploiement

## 🔗 Liens Utiles

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnavigation.org/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)

### Projet Original
- Projet Flutter : `/Users/matt/flutter_01/oupratiquer/oupratiquer`

## 👥 Équipe

- **Développeur** : Matt
- **Projet** : Migration Flutter → React Native

## 📄 Licence

Propriétaire - FFH (Fédération Française de Handball)

## 📮 Support

Pour toute question ou problème :
1. Consulter la documentation dans `/docs`
2. Vérifier les issues GitHub
3. Contacter l'équipe de développement

---

**Version** : 1.0.0  
**Dernière mise à jour** : Octobre 2025  
**Status** : En développement 🚧
