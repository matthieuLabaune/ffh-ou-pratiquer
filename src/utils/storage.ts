import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SECURE_KEYS = ['auth_token', 'refresh_token'];

export class Storage {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      if (SECURE_KEYS.includes(key)) {
        await SecureStore.setItemAsync(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
      throw error;
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      if (SECURE_KEYS.includes(key)) {
        return await SecureStore.getItemAsync(key);
      } else {
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      if (SECURE_KEYS.includes(key)) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      for (const key of SECURE_KEYS) {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  static async setObject<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.setItem(key, jsonValue);
  }

  static async getObject<T>(key: string): Promise<T | null> {
    const jsonValue = await this.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }
}

export default Storage;
