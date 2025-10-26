import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Text,
    Button,
    Card,
    ActivityIndicator,
    Divider
} from 'react-native-paper';
import { API_CONFIG } from '@/config/api.config';
import { apiTester } from '@/utils/api-test';
import { structuresService } from '@/api';

export default function ApiDebugScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]);
    };

    const testApiConnection = async () => {
        setIsLoading(true);
        addLog('🧪 Début du test de connexion API...');

        try {
            addLog(`🔗 URL de base: ${API_CONFIG.BASE_URL}`);
            addLog(`📋 Headers: ${JSON.stringify(API_CONFIG.HEADERS)}`);

            // Test via apiTester
            await apiTester.testConnection();
            addLog('✅ Test de connexion réussi');

            // Test via service
            const summary = await structuresService.getSummary();
            addLog(`📊 Summary reçu: ${JSON.stringify(summary)}`);

        } catch (error) {
            addLog(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
            console.error('Erreur complète:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const testSearchEndpoint = async () => {
        setIsLoading(true);
        addLog('🔍 Début du test de recherche...');

        try {
            const result = await structuresService.search({ city: 'Paris' });
            addLog(`🏒 Recherche réussie: ${result.data?.length || 0} résultats`);

            if (result.data && result.data.length > 0) {
                addLog(`📍 Premier résultat: ${result.data[0].name || 'Nom non disponible'}`);
            }
        } catch (error) {
            addLog(`❌ Erreur recherche: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
            console.error('Erreur complète:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearLogs = () => {
        setLogs([]);
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>🧪 Debug API</Text>

                    <View style={styles.configSection}>
                        <Text variant="titleMedium">Configuration actuelle:</Text>
                        <Text style={styles.configText}>URL: {API_CONFIG.BASE_URL}</Text>
                        <Text style={styles.configText}>Timeout: {API_CONFIG.TIMEOUT}ms</Text>
                        <Text style={styles.configText}>
                            Headers: {JSON.stringify(API_CONFIG.HEADERS, null, 2)}
                        </Text>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={styles.buttonsSection}>
                        <Button
                            mode="contained"
                            onPress={testApiConnection}
                            loading={isLoading}
                            disabled={isLoading}
                            style={styles.button}
                        >
                            🔗 Tester connexion
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={testSearchEndpoint}
                            loading={isLoading}
                            disabled={isLoading}
                            style={styles.button}
                        >
                            🔍 Tester recherche
                        </Button>

                        <Button
                            mode="text"
                            onPress={clearLogs}
                            disabled={isLoading}
                            style={styles.button}
                        >
                            🗑️ Vider les logs
                        </Button>
                    </View>

                    <Divider style={styles.divider} />

                    <Text variant="titleMedium">Logs en temps réel:</Text>

                    {isLoading && (
                        <ActivityIndicator animating={true} style={styles.loader} />
                    )}

                    <View style={styles.logsContainer}>
                        {logs.length === 0 ? (
                            <Text style={styles.noLogs}>Aucun log pour le moment</Text>
                        ) : (
                            logs.map((log, index) => (
                                <Text key={index} style={styles.logEntry}>
                                    {log}
                                </Text>
                            ))
                        )}
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 15,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    configSection: {
        marginBottom: 15,
    },
    configText: {
        fontFamily: 'monospace',
        fontSize: 12,
        backgroundColor: '#f0f0f0',
        padding: 8,
        marginVertical: 2,
    },
    divider: {
        marginVertical: 15,
    },
    buttonsSection: {
        marginBottom: 15,
    },
    button: {
        marginVertical: 5,
    },
    loader: {
        marginVertical: 10,
    },
    logsContainer: {
        backgroundColor: '#1e1e1e',
        padding: 10,
        borderRadius: 5,
        maxHeight: 300,
    },
    noLogs: {
        color: '#888',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    logEntry: {
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: 11,
        marginVertical: 1,
    },
});
