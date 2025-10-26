# Configuration de l'app avec votre API Laravel via ngrok

## Étapes pour connecter l'app mobile à votre API Laravel locale

### 1. Démarrez ngrok pour exposer votre API Laravel

```bash
# Dans votre projet Laravel (ou dans un terminal séparé)
ngrok http 8000
# ou si votre Laravel tourne sur un autre port :
# ngrok http 80
```

Vous verrez une sortie comme :
```
Forwarding  https://xxxx-xxxx-xxxx.ngrok-free.app -> http://localhost:8000
```

### 2. Copiez l'URL HTTPS ngrok

Copiez l'URL **HTTPS** (pas HTTP) qui ressemble à :
```
https://1234-56-789-012-34.ngrok-free.app
```

### 3. Mettez à jour le fichier .env

Ouvrez le fichier `.env` à la racine du projet React Native et modifiez :

```bash
# Remplacez cette ligne :
EXPO_PUBLIC_API_URL=https://your-ngrok-url.ngrok.io/api

# Par votre vraie URL ngrok (ajoutez /api à la fin) :
EXPO_PUBLIC_API_URL=https://1234-56-789-012-34.ngrok-free.app/api
```

### 4. Redémarrez l'app Expo

```bash
# Arrêtez Expo (Ctrl+C) puis :
npm start -- --clear
```

Ou simplement pressez `r` dans le terminal Expo pour recharger.

### 5. Vérifiez que l'app se connecte à l'API

L'application va maintenant appeler les endpoints suivants de votre API Laravel :

- **Recherche de structures** : `GET /api/ou-pratiquer/search?q=...`
- **Détail d'une structure** : `GET /api/ou-pratiquer/structure/{id}`
- **Statistiques FFH** : `GET /api/handigo/summary`
- **Login** : `POST /api/handigo/login`

## Mapping des routes

### API Laravel → App React Native

| Endpoint Laravel | Utilisation dans l'app |
|-----------------|------------------------|
| `GET /api/ou-pratiquer/search` | Recherche de structures (SearchScreen) |
| `GET /api/ou-pratiquer/structure/{id}` | Détails d'une structure |
| `GET /api/handigo/summary` | Statistiques d'accueil (HomeScreen) |
| `POST /api/handigo/login` | Connexion utilisateur |

### Paramètres de recherche supportés

L'app envoie ces paramètres à `/api/ou-pratiquer/search` :

- `q` : Recherche textuelle (nom, ville, discipline)
- `lat` + `lng` : Coordonnées GPS
- `radius` : Rayon de recherche en km
- `discipline` : Filtre par discipline
- `type` : Type de structure
- `page` : Pagination

## Tester la connexion

### Dans votre navigateur
Testez que l'API répond via ngrok :
```
https://votre-url.ngrok.io/api/handigo/summary
```

Vous devriez voir :
```json
{
  "total_affiliations": 123,
  "total_licensees": 456,
  "total_disciplines": 78
}
```

### Dans l'app mobile
1. Ouvrez l'écran **Rechercher**
2. Tapez un nom de ville ou de structure
3. Vous devriez voir les résultats de votre base de données Laravel

## Troubleshooting

### L'app ne se connecte pas à l'API

1. Vérifiez que ngrok tourne toujours
2. Vérifiez que l'URL dans `.env` est correcte (avec HTTPS et /api)
3. Redémarrez l'app Expo avec `npm start -- --clear`
4. Vérifiez les logs Expo pour les erreurs réseau

### Erreur CORS

Si vous avez des erreurs CORS dans Laravel, ajoutez dans `config/cors.php` :

```php
'allowed_origins' => ['*'],  // En développement seulement !
```

### ngrok se déconnecte

ngrok génère une nouvelle URL à chaque redémarrage. Vous devrez :
1. Copier la nouvelle URL
2. Mettre à jour `.env`
3. Redémarrer l'app

### URL ngrok expire

Avec la version gratuite de ngrok, l'URL change à chaque redémarrage.
Pour une URL permanente, utilisez ngrok pro ou un autre service de tunneling.

## Prochaines étapes

Une fois connecté, vous pouvez :

- ✅ Tester la recherche de structures
- ✅ Voir les détails d'une structure
- ✅ Tester la géolocalisation
- ✅ Tester le login
- ✅ Ajouter des structures aux favoris (nécessite authentification)
