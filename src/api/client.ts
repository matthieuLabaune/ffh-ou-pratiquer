import { API_CONFIG } from '@/config/api.config';

export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export interface RequestConfig extends RequestInit {
    timeout?: number;
}

class HttpClient {
    private baseURL: string;
    private defaultTimeout: number;
    private token: string | null = null;

    constructor(baseURL: string, timeout: number = 30000) {
        this.baseURL = baseURL;
        this.defaultTimeout = timeout;
    }

    setToken(token: string | null) {
        this.token = token;
    }

    getToken(): string | null {
        return this.token;
    }

    private async request<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        const { timeout = this.defaultTimeout, headers, ...fetchConfig } = config;

        const url = `${this.baseURL}${endpoint}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const defaultHeaders: Record<string, string> = {
                ...API_CONFIG.HEADERS,
            };

            if (this.token) {
                defaultHeaders['Authorization'] = `Bearer ${this.token}`;
            }

            const response = await fetch(url, {
                ...fetchConfig,
                headers: {
                    ...defaultHeaders,
                    ...headers,
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(
                    errorData.message || `HTTP Error ${response.status}`,
                    response.status,
                    errorData
                );
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return (await response.text()) as any;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new ApiError('Request timeout');
                }
                throw new ApiError(error.message);
            }

            throw new ApiError('Unknown error occurred');
        }
    }

    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'GET',
        });
    }

    async post<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'DELETE',
        });
    }
}

export const apiClient = new HttpClient(
    API_CONFIG.BASE_URL,
    API_CONFIG.TIMEOUT
);

export default apiClient;
