import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { theme } from './src/config/theme.config';
import { useState } from 'react';

export default function App() {
  const [status, setStatus] = useState('Phase 1: Setup ✅');

  const testAPI = () => {
    setStatus('API Client prêt ! (fetch natif)');
    setTimeout(() => setStatus('Phase 1: Setup ✅'), 2000);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Text style={styles.title}>FFH Où Pratiquer</Text>
          <Text style={styles.subtitle}>{status}</Text>
          <Button mode="contained" onPress={testAPI} style={styles.button}>
            Test API Client
          </Button>
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
});
