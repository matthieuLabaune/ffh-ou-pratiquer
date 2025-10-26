import apiClient from './client';
import {
    Structure,
    StructureListResponse,
    StructureSearchParams,
    ApiStructureListResponse,
} from '@/models';
import { transformDirectApiResponse, transformApiStructure, transformDirectApiStructure } from '@/utils/api-transformers';
import { getMockStructures, getMockStructureById } from '@/utils/mock-data';

class StructuresService {
    private readonly endpoint = '/ou-pratiquer';

    async search(params: StructureSearchParams): Promise<StructureListResponse> {
        const hasLocationFilters =
            typeof params.latitude === 'number' && typeof params.longitude === 'number';

        const attemptRequest = async (useLocationFilters: boolean) => {
            const queryParams = new URLSearchParams();

            if (useLocationFilters && hasLocationFilters) {
                queryParams.append('lat', params.latitude!.toString());
                queryParams.append('lng', params.longitude!.toString());
                if (params.radius) {
                    queryParams.append('radius', params.radius.toString());
                }
            }

            if (params.sport) queryParams.append('discipline', params.sport);
            if (params.type) queryParams.append('type', params.type);

            const searchTerm = params.query || params.city || params.postalCode;
            if (searchTerm) {
                queryParams.append('q', searchTerm);
            }
            if (params.page) queryParams.append('page', params.page.toString());

            const query = queryParams.toString();
            console.log(
                '🌐 Tentative de connexion à l\'API:',
                `${this.endpoint}/search${query ? `?${query}` : ''}`,
            );

            const apiResponse = await apiClient.get<any>(
                `${this.endpoint}/search${query ? `?${query}` : ''}`,
                { timeout: 15000 },
            );

            const payload = Array.isArray(apiResponse.data)
                ? apiResponse.data
                : apiResponse.data?.data ?? [];

            return transformDirectApiResponse(payload);
        };

        let lastError: unknown;

        try {
            return await attemptRequest(hasLocationFilters);
        } catch (error) {
            lastError = error;
        }

        if (hasLocationFilters) {
            console.warn('⚠️ Recherche géolocalisée indisponible, tentative sans filtre de distance.');
            try {
                return await attemptRequest(false);
            } catch (error) {
                lastError = error;
            }
        }

        console.warn('⚠️ API indisponible, utilisation des données mock:', lastError);
        const count = params.pageSize || 10;
        return getMockStructures(count, params.sport);
    }

    async getById(id: string): Promise<Structure> {
        try {
            console.log('🌐 Récupération des détails de la structure:', `${this.endpoint}/structure/${id}`);
            const apiResponse = await apiClient.get<any>(`${this.endpoint}/structure/${id}`, { timeout: 15000 });

            // L'API peut retourner { data: {...} } ou directement {...}
            const structureData = apiResponse.data?.data || apiResponse.data || apiResponse;

            console.log('✅ Détails de la structure récupérés:', structureData.name);

            // Utiliser le transformateur direct qui gère le format simple de l'API
            return transformDirectApiStructure(structureData);
        } catch (error: any) {
            console.warn('⚠️ API indisponible pour la structure, utilisation des données mock:', error?.message || error);

            const mockStructure = getMockStructureById(id);
            if (!mockStructure) {
                throw new Error(`Structure avec l'ID ${id} non trouvée`);
            }
            return mockStructure;
        }
    }

    async getNearby(
        latitude: number,
        longitude: number,
        radius: number = 10
    ): Promise<StructureListResponse> {
        return this.search({ latitude, longitude, radius });
    }

    async getByCity(city: string, page: number = 1): Promise<StructureListResponse> {
        return this.search({ city, page });
    }

    async getBySport(sport: string, page: number = 1): Promise<StructureListResponse> {
        return this.search({ sport, page });
    }

    async getFavorites(userId: string): Promise<Structure[]> {
        return apiClient.get<Structure[]>(`/users/${userId}/favorites`);
    }

    async addToFavorites(structureId: string): Promise<void> {
        return apiClient.post<void>(`${this.endpoint}/structure/${structureId}/favorite`);
    }

    async removeFromFavorites(structureId: string): Promise<void> {
        return apiClient.delete<void>(`${this.endpoint}/structure/${structureId}/favorite`);
    }

    async getSummary(): Promise<{ total_affiliations: number; total_licensees: number; total_disciplines: number }> {
        return apiClient.get(`/handigo/summary`);
    }
}

export const structuresService = new StructuresService();
export default structuresService;
