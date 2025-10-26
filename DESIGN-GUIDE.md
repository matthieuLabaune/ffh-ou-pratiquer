# 🎨 Guide de Design - FFH Où Pratiquer

## 📋 Référence App Flutter Originale

### Thème Principal

**Couleurs:**
- Primary: `#000000` (noir)
- Background: `#FFFFFF` (blanc)
- Surface: `#FAFAFA` (gris très clair)
- Text Primary: `#212121` (noir 87%)
- Text Secondary: `#757575` (gris 60%)

**AppBar:**
- Background: Noir (`#000000`)
- Text: Blanc (`#FFFFFF`)
- Elevation: 2
- Font Size: 20px
- Font Weight: 600

**Cards:**
- Background: `#FAFAFA` (grey.shade50)
- Border: `#BDBDBD` (grey.shade400), 1.5px
- Border Radius: 12px
- Elevation: 0
- Padding: 16px
- Margin: 16px horizontal, 8px vertical

### Navigation Bottom Bar

**4 Onglets:**
1. 🏠 Accueil
2. 🔍 Où Pratiquer (Recherche)
3. 📚 Médiathèque
4. 👤 Mon Compte

**Style:**
- Selected Color: Noir
- Unselected Color: Gris
- Background: Blanc
- Elevation: 8

---

## 🎯 Composants Principaux

### 1. StructureCard (PlaceCard)

**Design:**
```
┌─────────────────────────────────────┐
│ [Région] [Département]              │ ← Tags colorés
│                                     │
│ Nom de la structure                 │ ← Titre gras (18px)
│                                     │
│ Adresse, Ville                      │ ← Gris (14px)
│                                     │
│ [Disc 1] [Disc 2] [Disc 3]...       │ ← Tags disciplines
└─────────────────────────────────────┘
```

**Specs:**
- Border radius: 12px
- Background: `#FAFAFA`
- Border: 1.5px `#BDBDBD`
- Padding: 16px
- Margin: 16px horizontal, 8px vertical

**Tags Région/Département:**
- Région: Background `#3949AB` (indigo.shade600)
- Département: Background `#1E88E5` (blue.shade600)
- Text: Blanc
- Font Size: 12px
- Padding: 8px horizontal, 4px vertical
- Border Radius: 12px

**Disciplines Tags:**
- Voir DisciplineTag component
- Max 8 disciplines affichées
- Si plus: afficher "+ X autres"

### 2. DisciplineTag

**Style:**
- Background: Varie selon discipline
- Text: Blanc
- Font Size: 12px
- Font Weight: 500
- Padding: 6px horizontal, 4px vertical
- Border Radius: 8px

**Couleurs par discipline:**
- Hockey sur glace: `#1976D2` (blue.shade700)
- Handball: `#F57C00` (orange.shade700)
- Basketball: `#E64A19` (deepOrange.shade600)
- Football: `#388E3C` (green.shade700)
- Natation: `#0288D1` (lightBlue.shade700)
- Tennis: `#7B1FA2` (purple.shade700)
- Autre: `#616161` (grey.shade700)

### 3. FilterBar

**Design:**
```
┌─────────────────────────────────────┐
│ [Ville ▼] [Discipline ▼] [Type ▼]  │
└─────────────────────────────────────┘
```

**Specs:**
- Background: Blanc
- Elevation: 2
- Padding: 12px
- Spacing: 8px entre filtres

**Filter Chips:**
- Background: Blanc
- Border: 1px gris
- Border Radius: 8px
- Padding: 8px 12px
- Text: 14px

### 4. SearchBar

**Design:**
```
┌─────────────────────────────────────┐
│ 🔍 Rechercher...                    │
└─────────────────────────────────────┘
```

**Specs:**
- Background: Blanc
- Border: 1px gris
- Border Radius: 24px
- Padding: 12px 16px
- Icon: Gris
- Placeholder: Gris clair

---

## 📱 Écrans Principaux

### Home Screen

**Sections:**
1. Header avec logo
2. Carte interactive (optionnel)
3. Recherche rapide
4. Suggestions

### Search Screen (Où Pratiquer)

**Layout:**
1. SearchBar en haut
2. FilterBar (sticky)
3. Active Filters (si filtres actifs)
4. Résultats en liste OU carte
5. Toggle Liste/Carte

**Empty State:**
- Icon: 🔍
- Text: "Aucune structure trouvée"
- Suggestion: "Essayez d'élargir vos critères"

**Loading State:**
- Spinner centré
- Text: "Recherche en cours..."

### Structure Detail Screen

**Sections:**
1. Header Section
   - Nom de la structure
   - Adresse
   - Distance (si disponible)
   
2. Disciplines Section
   - Liste des disciplines
   - Tags colorés

3. Contact Section
   - Téléphone
   - Email
   - Site web

4. Accessibility Section (si disponible)
   - Informations Handigo
   - Note accessibilité

5. Map Section
   - Carte interactive
   - Marker de la structure

---

## 🎨 Design Tokens React Native

### Couleurs

```typescript
export const colors = {
  primary: '#000000',
  background: '#FFFFFF',
  surface: '#FAFAFA',
  card: '#FAFAFA',
  border: '#BDBDBD',
  text: {
    primary: '#212121',
    secondary: '#757575',
    inverse: '#FFFFFF',
  },
  tags: {
    region: '#3949AB',
    department: '#1E88E5',
  },
  disciplines: {
    hockey: '#1976D2',
    handball: '#F57C00',
    basketball: '#E64A19',
    football: '#388E3C',
    swimming: '#0288D1',
    tennis: '#7B1FA2',
    default: '#616161',
  },
};
```

### Espacements

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};
```

### Typographie

```typescript
export const typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700',
  },
  h2: {
    fontSize: 20,
    fontWeight: '600',
  },
  h3: {
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
  },
};
```

### Border Radius

```typescript
export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  round: 24,
};
```

### Shadows

```typescript
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
};
```

---

## ✅ Checklist Composants à Créer

### Phase 5 - Composants UI

- [ ] **src/components/common/StructureCard.tsx**
  - Card avec design Flutter
  - Tags région/département
  - Tags disciplines
  - onPress navigation

- [ ] **src/components/common/DisciplineTag.tsx**
  - Tag coloré par discipline
  - Mapping couleurs

- [ ] **src/components/common/SearchBar.tsx**
  - Input recherche
  - Icon recherche
  - onChangeText callback

- [ ] **src/components/common/FilterBar.tsx**
  - Filtres horizontaux
  - Dropdown/Chips
  - Active filters display

- [ ] **src/components/common/LoadingSpinner.tsx**
  - ActivityIndicator centré
  - Text optionnel

- [ ] **src/components/common/EmptyState.tsx**
  - Icon
  - Message
  - Suggestion

- [ ] **src/components/common/ErrorMessage.tsx**
  - Alert/Banner
  - Retry button

---

## 🚀 Prochaines Étapes

1. Créer le fichier `src/config/theme.ts` avec les design tokens
2. Créer les composants common dans l'ordre:
   - DisciplineTag
   - StructureCard
   - SearchBar
   - FilterBar
   - LoadingSpinner
   - EmptyState
   - ErrorMessage
3. Tester chaque composant
4. Intégrer dans les écrans

---

**Dernière mise à jour:** 26 Octobre 2025
