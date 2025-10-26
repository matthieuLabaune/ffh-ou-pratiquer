import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-paper';
import { useAuth } from '@/hooks';

export default function AccountScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Mon Compte
        </Text>
      </View>

      {user && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Profil</Text>
            <Divider style={styles.divider} />
            <Text>Email: {user.email}</Text>
            <Text>Nom: {user.firstName} {user.lastName}</Text>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Paramètres</Text>
          <Divider style={styles.divider} />
          <Text>Paramètres - À implémenter</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#B00020"
      >
        Se déconnecter
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#0066CC',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    margin: 15,
  },
  divider: {
    marginVertical: 10,
  },
  logoutButton: {
    margin: 15,
  },
});
