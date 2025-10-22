# Guide de Démarrage Rapide

## 🎯 Objectif
Ce guide vous permet de démarrer rapidement le développement de l'application FFH Où Pratiquer.

## 📝 Étape 1 : Installation des dépendances

### Core Dependencies
```bash
cd /Users/matt/Documents/sites/ffh-ou-pratiquer

# Installer les dépendances de base
npm install

# State Management
npm install zustand

# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-paper react-native-vector-icons
npm install @react-native-community/datetimepicker

# Maps & Location
npm install react-native-maps
npx expo install expo-location

# HTTP & Storage
npm install axios
npx expo install expo-secure-store @react-native-async-storage/async-storage

# Environment Variables
npm install react-native-dotenv
npm install --save-dev @types/react-native-dotenv

# Utilities
npm install date-fns
npx expo install expo-linking expo-web-browser

# Dev Dependencies
npm install --save-dev typescript @types/react @types/react-native
npm install --save-dev @testing-library/react-native @testing-library/jest-native
npm install --save-dev eslint prettier
```

## 📝 Étape 2 : Configuration TypeScript

### Créer tsconfig.json
```bash
# Si pas déjà créé
npx tsc --init
```

### Configuration recommandée (tsconfig.json)
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "target": "esnext",
    "module": "commonjs",
    "lib": ["esnext"],
    "jsx": "react-native",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@hooks/*": ["src/hooks/*"],
      "@store/*": ["src/store/*"],
      "@api/*": ["src/api/*"],
      "@utils/*": ["src/utils/*"],
      "@models/*": ["src/models/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## 📝 Étape 3 : Configuration Babel

### babel.config.js
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            '@store': './src/store',
            '@api': './src/api',
            '@utils': './src/utils',
            '@models': './src/models',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
```

## 📝 Étape 4 : Configuration ESLint & Prettier

### .eslintrc.js
```javascript
module.exports = {
  root: true,
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### .prettierrc
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## 📝 Étape 5 : Structure des dossiers

```bash
# Créer la structure src/
mkdir -p src/{api,components/{common,structure,map},config,data,hooks,models,navigation,screens/{home,search,structure,account,questionnaire,settings},store,utils}

# Créer les fichiers types
mkdir -p types
```

## 📝 Étape 6 : Fichiers de configuration initiaux

### src/config/api.config.ts
```typescript
import { API_BASE_URL, API_TIMEOUT } from '@env';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT, 10) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};
```

### src/config/theme.config.ts
```typescript
import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#000000',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
  },
};
```

### src/config/constants.ts
```typescript
export const CONSTANTS = {
  DEFAULT_SEARCH_RADIUS: 10, // km
  MAX_SEARCH_RESULTS: 100,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  DEBOUNCE_DELAY: 300, // ms
};
```

## 📝 Étape 7 : Types pour environnement

### types/env.d.ts
```typescript
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
  export const APP_NAME: string;
  export const APP_VERSION: string;
  export const ENVIRONMENT: string;
}
```

## 📝 Étape 8 : App.tsx de base

### App.tsx
```typescript
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/config/theme.config';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        {/* Navigation will be added here */}
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

## 📝 Étape 9 : Scripts package.json

### Ajouter dans package.json
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json}\"",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 📝 Étape 10 : Gitignore

### .gitignore
```
# Expo
.expo/
dist/
web-build/

# dependencies
node_modules/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# macOS
.DS_Store

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/

# Build
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
```

## ✅ Checklist de Vérification

Avant de commencer le développement, vérifier :

- [ ] Node.js installé (>= 18)
- [ ] npm installé (>= 9)
- [ ] Toutes les dépendances installées (`npm install`)
- [ ] Fichier `.env` créé et configuré
- [ ] TypeScript configuré
- [ ] Structure des dossiers créée
- [ ] L'application démarre (`npm start`)

## 🚀 Premier Test

```bash
# Démarrer l'application
npm start

# Scanner le QR code avec Expo Go
# ou
# Appuyer sur 'i' pour iOS simulator
# Appuyer sur 'a' pour Android emulator
# Appuyer sur 'w' pour web
```

## 📚 Prochaines Étapes

1. **Développer l'API Client** (voir docs/05-API-INTEGRATION.md)
2. **Créer les Stores Zustand** (voir docs/04-ARCHITECTURE.md)
3. **Développer les Composants** (commencer par common/)
4. **Implémenter la Navigation**
5. **Développer les Écrans** (suivre les User Stories)

## 🆘 Troubleshooting

### Problème : Module not found
```bash
# Nettoyer le cache
npx expo start -c
```

### Problème : TypeScript errors
```bash
# Vérifier la config TypeScript
npx tsc --noEmit
```

### Problème : Metro bundler
```bash
# Réinitialiser le cache
rm -rf node_modules
npm install
npx expo start -c
```

## 📞 Support

- Documentation : `/docs`
- Issues : Créer une issue sur GitHub
- Contact : Équipe de développement

---

**Prêt à coder !** 🚀

Commencez par créer le premier composant ou service selon le plan de migration dans `docs/02-PLAN-MIGRATION.md`.
