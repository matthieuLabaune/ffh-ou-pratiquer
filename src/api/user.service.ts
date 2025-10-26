import apiClient from './client';
import { User, UserPreferences } from '@/models';

class UserService {
  private readonly endpoint = '/users';

  async getProfile(): Promise<User> {
    return apiClient.get<User>(`${this.endpoint}/me`);
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return apiClient.patch<User>(`${this.endpoint}/me`, data);
  }

  async updatePreferences(preferences: UserPreferences): Promise<User> {
    return apiClient.patch<User>(`${this.endpoint}/me/preferences`, preferences);
  }

  async deleteAccount(): Promise<void> {
    return apiClient.delete<void>(`${this.endpoint}/me`);
  }

  async uploadAvatar(formData: FormData): Promise<User> {
    return apiClient.post<User>(`${this.endpoint}/me/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deleteAvatar(): Promise<User> {
    return apiClient.delete<User>(`${this.endpoint}/me/avatar`);
  }
}

export const userService = new UserService();
export default userService;
