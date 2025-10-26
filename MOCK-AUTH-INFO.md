# 🧪 Mock d'Authentification Activé

## ⚠️ IMPORTANT

Le mock d'authentification est **temporairement activé** dans `src/store/authStore.ts` pour permettre de tester la navigation sans backend.

## 🎯 Ce Qui Est Mocké

**Fichier:** `src/store/authStore.ts`  
**Fonction:** `loadStoredSession()` (ligne ~134)

**Utilisateur de test:**
- Email: test@example.com
- Nom: John Doe
- Token: mock-token-123

## ✅ Comportement Actuel

1. L'app démarre **directement sur HomeScreen** (pas de LoginScreen)
2. Vous êtes **automatiquement connecté**
3. Les 4 onglets sont **accessibles** :
   - 🏠 Accueil (avec géolocalisation)
   - 🔍 Rechercher
   - ❤️ Favoris
   - 👤 Compte (affiche "John Doe")

## 🔄 Quand Retirer le Mock

### Lorsque votre backend sera prêt :

1. Ouvrez `src/store/authStore.ts`
2. Trouvez la fonction `loadStoredSession` (ligne ~134)
3. **Supprimez** le bloc entre les commentaires :
   ```typescript
   // 🧪 MOCK TEMPORAIRE
   ...
   return;
   // FIN MOCK
   ```

4. **Décommentez** le code original :
   ```typescript
   /* CODE ORIGINAL - Décommenter quand backend prêt
   ...
   */
   ```

### Résultat après suppression du mock :
- L'app démarrera sur **LoginScreen**
- Le vrai login **appellera votre API**
- L'authentification **sera réelle**

## 🚀 Pour Tester Maintenant

L'app devrait déjà être lancée avec le mock actif.

Si vous avez arrêté Expo, relancez :
```bash
npm start
```

Puis scannez le QR code avec Expo Go.

## 📝 Note

Ce mock est **uniquement pour le développement frontend**.  
Il sera **supprimé** dès que le backend sera opérationnel.

