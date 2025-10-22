# User Stories & Scénarios

## Epic 1: Authentification & Compte

### US-1.1: Connexion utilisateur
**En tant qu'** utilisateur  
**Je veux** me connecter à l'application  
**Afin de** accéder à mon compte et mes données personnelles

**Critères d'acceptation:**
- [ ] Je peux saisir mon email et mot de passe
- [ ] Je reçois un message d'erreur si les identifiants sont incorrects
- [ ] Je suis redirigé vers l'écran d'accueil après connexion réussie
- [ ] Mes identifiants sont sauvegardés localement (option "Se souvenir")
- [ ] Je reste connecté entre les sessions si activé

**Scénarios:**

**Scénario 1: Connexion réussie**
```
GIVEN je suis sur l'écran de connexion
WHEN je saisis email "user@example.com" et password "Password123"
AND je clique sur "Se connecter"
THEN je vois un loading indicator
AND je suis redirigé vers l'écran d'accueil
AND je vois mon nom affiché dans l'onglet Compte
```

**Scénario 2: Connexion échouée**
```
GIVEN je suis sur l'écran de connexion
WHEN je saisis email "wrong@example.com" et password "wrong"
AND je clique sur "Se connecter"
THEN je vois un message d'erreur "Identifiants incorrects"
AND je reste sur l'écran de connexion
```

### US-1.2: Consultation du compte
**En tant qu'** utilisateur connecté  
**Je veux** consulter les informations de mon compte  
**Afin de** vérifier mes données personnelles et licences

**Critères d'acceptation:**
- [ ] Je vois mon nom, prénom, email
- [ ] Je vois la liste de mes licences
- [ ] Je peux accéder aux détails de chaque licence
- [ ] Je peux me déconnecter

### US-1.3: Gestion des licences
**En tant qu'** utilisateur connecté  
**Je veux** consulter mes licences sportives  
**Afin de** vérifier leur validité et mes affiliations

---

## Epic 2: Recherche de Structures (Où Pratiquer)

### US-2.1: Recherche simple par localisation
**En tant qu'** utilisateur  
**Je veux** rechercher des structures sportives près de moi  
**Afin de** trouver un lieu pour pratiquer mon activité

**Critères d'acceptation:**
- [ ] Je peux activer la géolocalisation
- [ ] Je vois les structures proches de ma position
- [ ] Les résultats sont triés par distance
- [ ] Je peux voir les résultats en liste ou sur carte
- [ ] Chaque structure affiche: nom, distance, type, accessibilité

**Scénarios:**

**Scénario 1: Recherche autour de moi**
```
GIVEN je suis sur l'écran "Où Pratiquer"
WHEN je clique sur "Utiliser ma position"
AND j'accepte la permission de géolocalisation
THEN je vois un loading
AND je vois une liste de structures proches
AND chaque structure affiche la distance (ex: "2.3 km")
AND les structures sont triées par distance croissante
```

**Scénario 2: Recherche par adresse**
```
GIVEN je suis sur l'écran "Où Pratiquer"
WHEN je tape "Paris" dans le champ recherche
AND je sélectionne "Paris, France" dans l'autocomplete
AND je clique sur "Rechercher"
THEN je vois les structures à Paris
AND les résultats affichent la distance depuis Paris centre
```

### US-2.2: Filtres de recherche
**En tant qu'** utilisateur  
**Je veux** filtrer les résultats de recherche  
**Afin de** trouver exactement ce que je cherche

**Critères d'acceptation:**
- [ ] Je peux filtrer par région
- [ ] Je peux filtrer par département
- [ ] Je peux filtrer par discipline sportive
- [ ] Je peux filtrer par type de structure (club, association...)
- [ ] Je peux combiner plusieurs filtres
- [ ] Les filtres sont persistants pendant la session

**Scénarios:**

**Scénario 1: Filtrage par discipline**
```
GIVEN j'ai des résultats de recherche affichés
WHEN je clique sur "Filtres"
AND je sélectionne la discipline "Handball"
AND je clique sur "Appliquer"
THEN je vois uniquement les structures proposant du handball
AND le badge "Handball" apparaît dans les filtres actifs
```

**Scénario 2: Filtrage multiple**
```
GIVEN j'ai des résultats de recherche
WHEN je filtre par région "Île-de-France"
AND je filtre par discipline "Basketball"
AND je filtre par type "Club"
THEN je vois uniquement les clubs de basketball en Île-de-France
AND je vois 3 badges de filtres actifs
```

### US-2.3: Vue carte des résultats
**En tant qu'** utilisateur  
**Je veux** voir les structures sur une carte  
**Afin de** visualiser leur position géographique

**Critères d'acceptation:**
- [ ] Je peux basculer entre vue liste et vue carte
- [ ] Chaque structure est représentée par un marker
- [ ] Je peux cliquer sur un marker pour voir les infos
- [ ] La carte est centrée sur ma position ou la zone de recherche
- [ ] Les markers sont clustérisés quand ils sont proches

### US-2.4: Détails d'une structure
**En tant qu'** utilisateur  
**Je veux** consulter les détails d'une structure  
**Afin de** décider si elle correspond à mes besoins

**Critères d'acceptation:**
- [ ] Je vois le nom complet
- [ ] Je vois l'adresse complète
- [ ] Je vois les disciplines proposées
- [ ] Je vois le type de structure
- [ ] Je vois les affiliations
- [ ] Je vois le score d'accessibilité HandiGo
- [ ] Je vois les contacts (téléphone, email, site web)
- [ ] Je peux appeler directement
- [ ] Je peux envoyer un email
- [ ] Je peux ouvrir le site web
- [ ] Je vois la position sur une carte

**Scénarios:**

**Scénario 1: Consultation détails**
```
GIVEN je suis sur la liste de résultats
WHEN je clique sur "Club de Handball Paris 15"
THEN je vois l'écran de détails
AND je vois toutes les informations de la structure
AND je vois une mini-carte avec la localisation
AND je vois les boutons d'action (appeler, email, web)
```

**Scénario 2: Appel téléphonique**
```
GIVEN je suis sur les détails d'une structure
AND la structure a un numéro de téléphone
WHEN je clique sur le bouton téléphone
THEN l'application téléphone s'ouvre
AND le numéro est pré-rempli
```

---

## Epic 3: Écran d'Accueil

### US-3.1: Accueil avec accès rapides
**En tant qu'** utilisateur  
**Je veux** accéder rapidement aux fonctions principales  
**Afin de** naviguer efficacement dans l'application

**Critères d'acceptation:**
- [ ] Je vois un écran d'accueil accueillant
- [ ] Je vois des raccourcis vers les fonctions principales
- [ ] Je vois mes dernières recherches (si connecté)
- [ ] Je vois des structures recommandées

---

## Epic 4: Questionnaire d'Accessibilité

### US-4.1: Remplir questionnaire
**En tant qu'** utilisateur  
**Je veux** remplir un questionnaire sur une structure  
**Afin de** contribuer aux données d'accessibilité

**Critères d'acceptation:**
- [ ] Je peux démarrer un questionnaire depuis une structure
- [ ] Je réponds à une série de questions
- [ ] Je peux sauvegarder en brouillon
- [ ] Je peux soumettre le questionnaire
- [ ] Je reçois une confirmation

---

## Epic 5: Paramètres

### US-5.1: Configuration de l'application
**En tant qu'** utilisateur  
**Je veux** configurer l'application  
**Afin de** personnaliser mon expérience

**Critères d'acceptation:**
- [ ] Je peux activer/désactiver la géolocalisation
- [ ] Je peux choisir mon rayon de recherche par défaut
- [ ] Je peux gérer mes préférences de notifications
- [ ] Je peux consulter les mentions légales
- [ ] Je peux consulter la politique de confidentialité
- [ ] Je peux voir la version de l'application

---

## Flows Utilisateurs Principaux

### Flow 1: Première utilisation
```
1. Ouverture de l'app
2. Écran d'accueil
3. Clic sur "Où Pratiquer"
4. Permission géolocalisation demandée
5. Acceptation
6. Affichage structures proches
7. Sélection d'une structure
8. Consultation détails
9. Appel ou email à la structure
```

### Flow 2: Recherche avec filtres
```
1. Accès "Où Pratiquer"
2. Saisie d'une ville dans la recherche
3. Sélection dans l'autocomplete
4. Affichage résultats
5. Clic sur "Filtres"
6. Sélection discipline + type
7. Application filtres
8. Résultats filtrés
9. Basculement vue carte
10. Sélection structure sur carte
11. Consultation détails
```

### Flow 3: Connexion et compte
```
1. Clic onglet "Compte"
2. Clic "Se connecter"
3. Saisie email/password
4. Connexion réussie
5. Affichage informations compte
6. Consultation licences
7. Détails d'une licence
8. Retour compte
9. Déconnexion
```

### Flow 4: Remplir questionnaire
```
1. Recherche d'une structure
2. Ouverture détails
3. Clic "Remplir questionnaire"
4. Réponse questions accessibilité
5. Sauvegarde brouillon
6. Reprise questionnaire
7. Finalisation
8. Soumission
9. Confirmation
```

---

## Priorités de Développement

### MVP (Minimum Viable Product)
**Priorité 1 - Core Features:**
1. US-2.1: Recherche simple par localisation
2. US-2.4: Détails d'une structure
3. US-3.1: Écran d'accueil
4. US-2.3: Vue carte des résultats

**Priorité 2 - Enhanced Search:**
5. US-2.2: Filtres de recherche
6. US-1.1: Connexion utilisateur
7. US-1.2: Consultation du compte

**Priorité 3 - Advanced Features:**
8. US-1.3: Gestion des licences
9. US-4.1: Remplir questionnaire
10. US-5.1: Configuration de l'application

---

## Métriques de Succès

### KPIs Techniques
- Temps de chargement initial < 3s
- Temps de recherche < 2s
- Taux d'erreur API < 1%
- Crash rate < 0.1%

### KPIs Utilisateur
- Taux de conversion recherche → détails > 50%
- Taux d'utilisation géolocalisation > 70%
- Taux d'utilisation filtres > 30%
- Sessions moyennes > 5 min

### KPIs Engagement
- Retour utilisateur < 7 jours > 40%
- Nombre de recherches/session > 3
- Taux de connexion > 20%
