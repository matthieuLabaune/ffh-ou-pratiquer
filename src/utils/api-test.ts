/**
 * Utilitaire pour tester l'API Laravel via ngrok
 * Utilisez ce script pour déboguer les problèmes de connexion
 */

import { API_CONFIG } from '@/config/api.config';

export class ApiTester {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        console.log('🔗 URL de base API:', this.baseUrl);
    }

    async testConnection(): Promise<void> {
        console.log('🧪 Test de connexion à l\'API...');

        try {
            // Test simple de ping
            const response = await fetch(`${this.baseUrl}/handigo/summary`, {
                method: 'GET',
                headers: {
                    ...API_CONFIG.HEADERS,
                },
            });

            console.log('📡 Status:', response.status);
            console.log('📋 Headers:', Object.fromEntries(response.headers));

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Données reçues:', data);
                return data;
            } else {
                const errorText = await response.text();
                console.error('❌ Erreur HTTP:', response.status, errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.error('💥 Erreur de connexion:', error);
            throw error;
        }
    }

    async testSearchEndpoint(query?: string): Promise<void> {
        console.log('🔍 Test de l\'endpoint de recherche...');

        try {
            const url = query
                ? `${this.baseUrl}/ou-pratiquer/search?q=${encodeURIComponent(query)}`
                : `${this.baseUrl}/ou-pratiquer/search`;

            console.log('🌐 URL de test:', url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    ...API_CONFIG.HEADERS,
                },
            });

            console.log('📡 Status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Nombre de résultats:', data?.data?.length || 0);
                console.log('📊 Premier résultat:', data?.data?.[0]);
                return data;
            } else {
                const errorText = await response.text();
                console.error('❌ Erreur recherche:', response.status, errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.error('💥 Erreur recherche:', error);
            throw error;
        }
    }

    async testAll(): Promise<void> {
        console.log('🚀 Début des tests API...');

        try {
            await this.testConnection();
            await this.testSearchEndpoint();
            await this.testSearchEndpoint('hockey');

            console.log('🎉 Tous les tests API sont passés !');
        } catch (error) {
            console.error('💥 Échec des tests API:', error);
        }
    }
}

export const apiTester = new ApiTester();
