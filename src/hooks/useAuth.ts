import { useEffect } from 'react';
import { useAuthStore } from '@/store';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    loadStoredSession,
    clearError,
  } = useAuthStore();

  // Load stored session on mount
  useEffect(() => {
    loadStoredSession();
  }, [loadStoredSession]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};

export default useAuth;
