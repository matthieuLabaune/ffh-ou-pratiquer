// Test de l'API depuis React Native
import { apiClient } from './client';

export const testApi = async () => {
    console.log('🧪 Test API démarré...');

    try {
        // Test de base sur /handigo/summary (qui fonctionne selon les logs)
        console.log('📊 Test 1: /handigo/summary');
        const summary = await apiClient.get('/handigo/summary', { timeout: 15000 });
        console.log('✅ Summary réussi:', summary);

        // Test de la recherche avec discipline
        console.log('🔍 Test 2: /ou-pratiquer/search?discipline=aviron');
        const searchResult = await apiClient.get('/ou-pratiquer/search?discipline=aviron', { timeout: 15000 });
        console.log('✅ Recherche réussie:', searchResult);

        // Test de la recherche sans paramètres
        console.log('🔍 Test 3: /ou-pratiquer/search');
        const searchAll = await apiClient.get('/ou-pratiquer/search', { timeout: 15000 });
        console.log('✅ Recherche sans paramètres réussie:', searchAll);

    } catch (error) {
        console.error('❌ Erreur de test API:', error);
        if (error instanceof Error) {
            console.error('❌ Détails de l\'erreur:', {
                message: error.message,
                status: (error as any).status,
                stack: error.stack
            });
        }
    }
};
