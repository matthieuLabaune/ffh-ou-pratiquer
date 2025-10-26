# 🗺️ Roadmap - Application HANDIGO

## ✅ Phase 1-4 : Complétées
- ✅ Migration Flutter → React Native
- ✅ Écrans principaux (Home, Search, Favorites, Account)
- ✅ Design HANDIGO (indigo/violet/orange)
- ✅ Navigation Bottom Tabs + Stack
- ✅ Intégration API structures
- ✅ Recherche et filtres
- ✅ Détails des structures
- ✅ Navigation swipe entre structures
- ✅ Bouton scroll to top

---

## 🎯 Phase 5 : Vue Carte Interactive (EN COURS)

### A. Implémentation de la carte
- [ ] Installer `react-native-maps` et dépendances
- [ ] Créer `MapViewScreen.tsx`
- [ ] Afficher les structures sous forme de marqueurs
- [ ] Clustering des marqueurs (performance)
- [ ] Centrage automatique sur la position utilisateur
- [ ] Bouton pour recentrer sur ma position
- [ ] InfoWindow/Callout personnalisé au clic sur marqueur

### B. Navigation vers la carte
- [ ] Bouton FAB "Map" depuis `SearchScreen` → navigation vers MapView
- [ ] Passer les résultats de recherche à la MapView
- [ ] Synchronisation filtres Search ↔ Map

### C. Interactions sur la carte
- [ ] Clic sur marqueur → afficher mini-card de la structure
- [ ] Bouton "Voir détails" → navigation vers StructureDetailScreen
- [ ] Calcul de distance depuis position utilisateur
- [ ] Tri par proximité

---

## 🎨 Phase 6 : Améliorations UX

### A. Animations et transitions
- [ ] Animations de transition entre écrans
- [ ] Skeleton loaders pendant chargement
- [ ] Animation d'apparition des cards (fade-in)
- [ ] Bounce effect sur boutons
- [ ] Swipe gestures améliorés

### B. Gestion des favoris avec API
- [ ] Endpoint API pour sauvegarder favoris
- [ ] Synchronisation favoris locaux ↔ serveur
- [ ] Indicateur visuel ajout/retrait favori
- [ ] Toast/Snackbar de confirmation
- [ ] Persistance offline avec AsyncStorage

### C. Partage de structures
- [ ] Bouton "Partager" sur StructureDetailScreen
- [ ] Utiliser `react-native-share`
- [ ] Générer lien profond (deep link)
- [ ] Partage vers réseaux sociaux/email/SMS
- [ ] Génération d'image de preview (Open Graph)

### D. Navigation itinéraire
- [ ] ✅ Bouton "Obtenir l'itinéraire" (déjà implémenté)
- [ ] Choix du mode : Google Maps / Apple Maps / Waze
- [ ] Dialog de sélection de l'app
- [ ] Fallback navigateur web si apps non installées

### E. Améliorations de recherche
- [ ] Historique des recherches (AsyncStorage)
- [ ] Suggestions automatiques (autocomplétion)
- [ ] Recherche vocale (speech-to-text)
- [ ] Filtres avancés : horaires, équipements spécifiques
- [ ] Sauvegarde des filtres préférés

### F. Accessibilité et UX
- [ ] Support lecteur d'écran (screen reader)
- [ ] Augmentation de la taille du texte
- [ ] Mode sombre (dark mode)
- [ ] Labels ARIA corrects
- [ ] Navigation au clavier (tablette)
- [ ] Feedback haptique (vibrations)

---

## 📊 Phase 7 : API des statistiques

### Home Screen
- [ ] Endpoint `/api/statistics/summary`
- [ ] Afficher vraies stats (Sports, Structures, Licences)
- [ ] Mise à jour temps réel
- [ ] Cache des stats (refresh toutes les heures)

---

## 👤 Phase 8 : Écran Account complet

### A. Authentification
- [ ] Écran de connexion fonctionnel
- [ ] Écran d'inscription
- [ ] Récupération mot de passe
- [ ] Gestion du token JWT
- [ ] Refresh token automatique

### B. Profil utilisateur
- [ ] Affichage des infos (nom, email, photo)
- [ ] Édition du profil
- [ ] Upload photo de profil
- [ ] Gestion des licences FFH
- [ ] Historique des recherches

### C. Paramètres
- [ ] Préférences de notification
- [ ] Gestion des données personnelles
- [ ] Supprimer le compte
- [ ] Export des données (RGPD)

---

## 🎓 Phase 9 : Fonctionnalités avancées

### A. Questionnaire Sport
- [ ] Écran de questionnaire interactif
- [ ] Questions sur handicap/préférences/niveau
- [ ] Algorithme de recommandation
- [ ] Résultats avec sports suggérés
- [ ] Navigation vers structures proposant ces sports

### B. Médiathèque
- [ ] Liste de ressources/guides
- [ ] PDF téléchargeables
- [ ] Vidéos accessibilité
- [ ] Fiches pratiques par sport

### C. Notifications
- [ ] Notifications push (Firebase/Expo)
- [ ] Nouvelles structures près de moi
- [ ] Événements sportifs adaptés
- [ ] Rappels de renouvellement licence

---

## 🐛 Bugs et corrections

### À corriger
- [ ] Vérifier gestion erreurs API
- [ ] Optimiser performance FlatList (memo, PureComponent)
- [ ] Tester sur iOS + Android
- [ ] Corriger warnings console
- [ ] Tester en mode offline

---

## 📱 Déploiement

### Préparation
- [ ] Tests E2E (Detox)
- [ ] Tests unitaires (Jest)
- [ ] Icônes et splash screens
- [ ] Configuration App Store / Play Store
- [ ] Privacy Policy / Terms of Service
- [ ] Build iOS (TestFlight)
- [ ] Build Android (Play Console)

---

**Dernière mise à jour :** 26 octobre 2025
**Version actuelle :** Phase 4 complétée → Démarrage Phase 5
