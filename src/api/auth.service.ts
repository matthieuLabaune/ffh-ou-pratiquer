import apiClient from './client';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  PasswordResetRequest,
  PasswordResetConfirm,
} from '@/models';

class AuthService {
  private readonly endpoint = '/auth';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.endpoint}/login`,
      credentials
    );
    
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.endpoint}/register`,
      data
    );
    
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    await apiClient.post<void>(`${this.endpoint}/logout`);
    apiClient.setToken(null);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.endpoint}/refresh`,
      { refreshToken }
    );
    
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  }

  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    return apiClient.post<void>(`${this.endpoint}/password-reset`, data);
  }

  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    return apiClient.post<void>(`${this.endpoint}/password-reset/confirm`, data);
  }

  async verifyEmail(token: string): Promise<void> {
    return apiClient.post<void>(`${this.endpoint}/verify-email`, { token });
  }

  setToken(token: string | null) {
    apiClient.setToken(token);
  }

  getToken(): string | null {
    return apiClient.getToken();
  }
}

export const authService = new AuthService();
export default authService;
