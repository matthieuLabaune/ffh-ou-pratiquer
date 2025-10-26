# React Native & Expo - Best Practices Guide

## 🚨 Problèmes Courants & Solutions

### Écran Blanc (Blank White Screen)

**Causes principales:**
1. **Erreur JavaScript non capturée** - L'app crash silencieusement
2. **Navigation mal configurée** - Rendu conditionnel incorrect
3. **Dépendances incompatibles** - Versions conflictuelles
4. **Imports manquants** - Composants non trouvés

**Solutions:**
1. Toujours wrapper avec error boundary
2. Éviter le rendu conditionnel dans les navigators
3. Utiliser `npx expo install` pour les dépendances
4. Tester avec un composant ultra-simple d'abord

### Erreur RNSScreen / RNSModal

**Cause:** Double enregistrement de composants natifs

**Solution:**
```jsx
// App.tsx - TOUJOURS mettre gesture-handler EN PREMIER
import 'react-native-gesture-handler';
import React from 'react';
// ... autres imports
```

**Alternative:** Utiliser une navigation simple sans screens natives

## ✅ Best Practices React Native

### 1. Structure de Projet

```
src/
├── api/          # Services API
├── components/   # Composants réutilisables
├── hooks/        # Custom hooks
├── navigation/   # Navigation setup
├── screens/      # Écrans de l'app
├── store/        # State management
└── utils/        # Utilitaires
```

### 2. Debugging

**Commandes essentielles:**
```bash
# Clear cache
npm start -- --clear

# Reset tout
rm -rf node_modules .expo
npm install
npm start -- --clear

# Logs Android
adb logcat | grep ReactNative

# Logs iOS
npx react-native log-ios
```

**Dans l'app:**
- Shake device → Dev Menu → Remote JS Debugging
- Check console browser pour erreurs JS

### 3. Navigation React Navigation

**✅ FAIRE:**
```jsx
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**❌ NE PAS FAIRE:**
```jsx
// Éviter rendu conditionnel du Navigator
function App() {
  const { isAuth } = useAuth();
  return isAuth ? <MainNav /> : <AuthNav />; // PROBLÈME!
}
```

**✅ MEILLEURE APPROCHE:**
```jsx
function App() {
  const { isAuth } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuth ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 4. State Management (Zustand)

**✅ Simple et performant:**
```typescript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usage
const { count, increment } = useStore();
```

### 5. Gestion d'Erreurs

**Toujours wrapper:**
```jsx
export default function App() {
  try {
    return <MainApp />;
  } catch (error) {
    return <ErrorScreen error={error} />;
  }
}
```

### 6. Performance

**Optimisations:**
- Utiliser `React.memo()` pour composants lourds
- `useMemo` / `useCallback` pour calculs coûteux
- FlatList au lieu de ScrollView pour listes
- Lazy loading des images

### 7. Versions Compatibles

**Toujours utiliser:**
```bash
npx expo install package-name
```

Au lieu de:
```bash
npm install package-name  # Peut causer conflits
```

### 8. Testing

**Progressive approach:**
1. Composant ultra-simple d'abord
2. Ajouter features une par une
3. Tester après chaque ajout
4. Isoler le problème rapidement

## 🔧 Checklist Debugging Écran Blanc

- [ ] App fonctionne avec `<View><Text>Test</Text></View>` ?
- [ ] Erreurs dans la console ?
- [ ] `npm start --clear` fait ?
- [ ] Dépendances à jour avec `npx expo install --check` ?
- [ ] gesture-handler importé EN PREMIER ?
- [ ] Navigation wrapper avec NavigationContainer ?
- [ ] Pas de rendu conditionnel du Navigator ?
- [ ] Tous les screens sont des composants valides ?

## 📚 Ressources

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Troubleshooting](https://docs.expo.dev/build-reference/troubleshooting/)

---

**Règle d'or:** Si ça marche en simple, ajouter features progressivement !
