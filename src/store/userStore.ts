import { create } from 'zustand';
import { userService } from '@/api';
import { User, UserPreferences } from '@/models';
import { Storage } from '@/utils';
import { useAuthStore } from './authStore';

interface UserState {
  preferences: UserPreferences | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadPreferences: () => Promise<void>;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  uploadAvatar: (formData: FormData) => Promise<void>;
  deleteAvatar: () => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  preferences: null,
  isLoading: false,
  error: null,

  loadPreferences: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.getProfile();
      set({
        preferences: user.preferences || null,
        isLoading: false,
      });
      
      // Update user in auth store
      useAuthStore.getState().updateUser(user);
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors du chargement',
        isLoading: false,
      });
      throw error;
    }
  },

  updatePreferences: async (preferences: UserPreferences) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.updatePreferences(preferences);
      
      // Update storage
      await Storage.setObject('user', user);
      
      set({
        preferences: user.preferences || null,
        isLoading: false,
      });
      
      // Update user in auth store
      useAuthStore.getState().updateUser(user);
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la mise à jour',
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfile: async (data: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.updateProfile(data);
      
      // Update storage
      await Storage.setObject('user', user);
      
      set({
        preferences: user.preferences || null,
        isLoading: false,
      });
      
      // Update user in auth store
      useAuthStore.getState().updateUser(user);
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la mise à jour',
        isLoading: false,
      });
      throw error;
    }
  },

  uploadAvatar: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.uploadAvatar(formData);
      
      // Update storage
      await Storage.setObject('user', user);
      
      set({ isLoading: false });
      
      // Update user in auth store
      useAuthStore.getState().updateUser(user);
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de l\'upload',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteAvatar: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.deleteAvatar();
      
      // Update storage
      await Storage.setObject('user', user);
      
      set({ isLoading: false });
      
      // Update user in auth store
      useAuthStore.getState().updateUser(user);
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la suppression',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useUserStore;
