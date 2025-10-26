import { useUserStore } from '@/store';
import { UserPreferences, User } from '@/models';

export const useUser = () => {
  const {
    preferences,
    isLoading,
    error,
    loadPreferences,
    updatePreferences,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    clearError,
  } = useUserStore();

  return {
    preferences,
    isLoading,
    error,
    loadPreferences,
    updatePreferences,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    clearError,
  };
};

export default useUser;
