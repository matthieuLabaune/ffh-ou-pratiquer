# Fix Navigation - Correction du composant SearchBar

## Problème identifié
L'erreur `Cannot read property 'level3' of undefined` empêchait la navigation vers l'écran de recherche.

### Cause racine
Le composant `SearchBar.tsx` utilisait une ancienne structure de thème incompatible avec notre configuration actuelle :
- Import: `import theme from '../../config/theme'` (objet par défaut)
- Utilisation: `theme.colors.text.secondary`, `theme.borderRadius.round`, etc.
- Notre thème exporte: `export const colors = {...}` (exports nommés)

## Corrections apportées

### 1. Installation de @expo/vector-icons
```bash
npm install @expo/vector-icons
```

### 2. Refactorisation complète de SearchBar.tsx

**AVANT** (structure de thème incompatible) :
```typescript
import theme from '../../config/theme';
// ...
color={theme.colors.text.secondary}
backgroundColor: theme.colors.background,
borderRadius: theme.borderRadius.round,
```

**APRÈS** (compatible avec notre thème) :
```typescript
import { colors, spacing } from '@/config/theme';
// ...
color={colors.textSecondary}
backgroundColor: colors.surface,
borderRadius: 8,
```

### 3. Corrections spécifiques
- ✅ **Icônes** : `@expo/vector-icons` → `MaterialCommunityIcons`
- ✅ **Couleurs** : `theme.colors.text.secondary` → `colors.textSecondary`
- ✅ **Espacement** : `theme.spacing.md` → `spacing.md`
- ✅ **Interface** : Ajout de `TouchableOpacity` pour le bouton clear
- ✅ **Import** : Utilisation du chemin `@/config/theme` au lieu du chemin relatif

## Impact
Le composant `SearchBar` était automatiquement chargé via `src/components/common/index.ts` même si non utilisé directement, causant l'erreur de référence de thème lors de la navigation.

## Test de validation
1. ✅ Le serveur Expo démarre sans erreur
2. ✅ Plus d'erreur `Cannot read property 'level3' of undefined`
3. 🔄 Navigation vers l'écran de recherche maintenant possible

## Fichiers modifiés
- `src/components/common/SearchBar.tsx` - Refactorisation complète
- `package.json` - Ajout de @expo/vector-icons

## À tester
1. Naviguer vers l'onglet "Rechercher"
2. Vérifier que l'écran s'affiche correctement
3. Confirmer que l'API charge les vraies structures FFH
