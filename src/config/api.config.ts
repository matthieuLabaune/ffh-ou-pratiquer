// Configuration API - Utilise les variables d'environnement Expo
export const API_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // En-tête requis pour ngrok gratuit
        'ngrok-skip-browser-warning': 'true',
    },
};

console.log('✅ API_CONFIG loaded:', API_CONFIG.BASE_URL);
console.log('🔧 EXPO_PUBLIC_API_URL env var:', process.env.EXPO_PUBLIC_API_URL);
console.log('📋 API_CONFIG headers:', API_CONFIG.HEADERS);
