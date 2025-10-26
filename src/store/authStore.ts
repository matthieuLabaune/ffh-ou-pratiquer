import { create } from 'zustand';
import { authService } from '@/api';
import { User, LoginCredentials, RegisterData } from '@/models';
import { Storage } from '@/utils';

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<void>;
    loadStoredSession: () => Promise<void>;
    clearError: () => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: true, // TODO: Change to false when auth is implemented
    isLoading: false,
    error: null,

    login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.login(credentials);

            // Store tokens securely
            await Storage.setItem('auth_token', response.token);
            await Storage.setItem('refresh_token', response.refreshToken);
            await Storage.setObject('user', response.user);

            set({
                user: response.user,
                token: response.token,
                refreshToken: response.refreshToken,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Erreur de connexion',
                isLoading: false,
                isAuthenticated: false,
            });
            throw error;
        }
    },

    register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.register(data);

            await Storage.setItem('auth_token', response.token);
            await Storage.setItem('refresh_token', response.refreshToken);
            await Storage.setObject('user', response.user);

            set({
                user: response.user,
                token: response.token,
                refreshToken: response.refreshToken,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message || 'Erreur d\'inscription',
                isLoading: false,
                isAuthenticated: false,
            });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear storage
            await Storage.removeItem('auth_token');
            await Storage.removeItem('refresh_token');
            await Storage.removeItem('user');

            set({
                user: null,
                token: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
        }
    },

    refreshSession: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await authService.refreshToken(refreshToken);

            await Storage.setItem('auth_token', response.token);
            await Storage.setItem('refresh_token', response.refreshToken);
            await Storage.setObject('user', response.user);

            set({
                user: response.user,
                token: response.token,
                refreshToken: response.refreshToken,
                isAuthenticated: true,
            });
        } catch (error: any) {
            // If refresh fails, logout
            get().logout();
            throw error;
        }
    },

    loadStoredSession: async () => {
        set({ isLoading: true });

        // 🧪 MOCK TEMPORAIRE POUR TESTS - À RETIRER QUAND BACKEND PRÊT
        console.log('⚠️ Using MOCK authentication for testing');
        const mockUser: User = {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await Storage.setItem('auth_token', 'mock-token-123');
        await Storage.setObject('user', mockUser);

        set({
            user: mockUser,
            token: 'mock-token-123',
            refreshToken: 'mock-refresh-123',
            isAuthenticated: true,
            isLoading: false,
        });
        return;
        // FIN MOCK - Supprimer les lignes ci-dessus quand backend est prêt

        /* CODE ORIGINAL - Décommenter quand backend prêt
        try {
          const token = await Storage.getItem('auth_token');
          const refreshToken = await Storage.getItem('refresh_token');
          const user = await Storage.getObject<User>('user');
    
          if (token && user) {
            authService.setToken(token);
            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error loading session:', error);
          set({ isLoading: false });
        }
        */
    },

    clearError: () => set({ error: null }),

    updateUser: (user: User) => set({ user }),
}));

export default useAuthStore;
