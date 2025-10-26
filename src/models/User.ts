export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  preferences?: UserPreferences;
  favoriteStructures?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  sports: string[];
  location?: {
    city?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
    newsletter: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}
