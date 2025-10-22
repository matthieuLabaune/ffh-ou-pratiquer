// Exemple de service API utilisant fetch natif

import { httpClient } from '@config/api.config';

// Type d'exemple pour une structure
export interface Structure {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  latitude: number;
  longitude: number;
  type: string;
}

// Type pour les résultats de recherche
export interface SearchResult<T> {
  data: T[];
  total: number;
  page: number;
}

/**
 * Service pour rechercher des structures
 * Utilise fetch natif via HttpClient
 */
export const structuresService = {
  /**
   * Rechercher des structures près d'une position
   */
  async searchNearby(
    latitude: number,
    longitude: number,
    radius: number = 10
  ): Promise<SearchResult<Structure>> {
    try {
      const endpoint = `/structures/search?lat=${latitude}&lng=${longitude}&radius=${radius}`;
      return await httpClient.get<SearchResult<Structure>>(endpoint);
    } catch (error) {
      console.error('Error searching structures:', error);
      throw error;
    }
  },

  /**
   * Obtenir une structure par son ID
   */
  async getById(id: string): Promise<Structure> {
    try {
      return await httpClient.get<Structure>(`/structures/${id}`);
    } catch (error) {
      console.error('Error fetching structure:', error);
      throw error;
    }
  },

  /**
   * Rechercher par nom ou ville
   */
  async search(query: string): Promise<SearchResult<Structure>> {
    try {
      const endpoint = `/structures/search?q=${encodeURIComponent(query)}`;
      return await httpClient.get<SearchResult<Structure>>(endpoint);
    } catch (error) {
      console.error('Error searching structures:', error);
      throw error;
    }
  },
};

/**
 * Exemple d'utilisation :
 * 
 * const results = await structuresService.searchNearby(48.8566, 2.3522, 10);
 * console.log(`Found ${results.total} structures`);
 * results.data.forEach(structure => {
 *   console.log(structure.nom);
 * });
 */
