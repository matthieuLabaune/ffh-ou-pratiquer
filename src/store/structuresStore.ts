import { create } from 'zustand';
import { structuresService } from '@/api';
import { Structure, StructureSearchParams } from '@/models';

interface StructuresState {
  structures: Structure[];
  selectedStructure: Structure | null;
  favorites: Structure[];
  total: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  search: (params: StructureSearchParams) => Promise<void>;
  loadMore: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  setSelectedStructure: (structure: Structure | null) => void;
  loadFavorites: (userId: string) => Promise<void>;
  toggleFavorite: (structureId: string) => Promise<void>;
  clearStructures: () => void;
  clearError: () => void;
}

export const useStructuresStore = create<StructuresState>((set, get) => ({
  structures: [],
  selectedStructure: null,
  favorites: [],
  total: 0,
  currentPage: 1,
  pageSize: 20,
  isLoading: false,
  error: null,

  search: async (params: StructureSearchParams) => {
    set({ isLoading: true, error: null });
    try {
      const response = await structuresService.search({
        ...params,
        page: params.page || 1,
        pageSize: params.pageSize || get().pageSize,
      });
      
      set({
        structures: response.structures,
        total: response.total,
        currentPage: response.page,
        pageSize: response.pageSize,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la recherche',
        isLoading: false,
      });
      throw error;
    }
  },

  loadMore: async () => {
    const { currentPage, pageSize, structures } = get();
    set({ isLoading: true, error: null });
    
    try {
      // You'll need to store last search params to reuse them
      // For now, this is a placeholder
      const response = await structuresService.search({
        page: currentPage + 1,
        pageSize,
      });
      
      set({
        structures: [...structures, ...response.structures],
        currentPage: response.page,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors du chargement',
        isLoading: false,
      });
      throw error;
    }
  },

  getById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const structure = await structuresService.getById(id);
      set({
        selectedStructure: structure,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors du chargement',
        isLoading: false,
      });
      throw error;
    }
  },

  setSelectedStructure: (structure: Structure | null) => {
    set({ selectedStructure: structure });
  },

  loadFavorites: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const favorites = await structuresService.getFavorites(userId);
      set({
        favorites,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors du chargement des favoris',
        isLoading: false,
      });
      throw error;
    }
  },

  toggleFavorite: async (structureId: string) => {
    const { favorites, structures } = get();
    const isFavorite = favorites.some(f => f.id === structureId);
    
    try {
      if (isFavorite) {
        await structuresService.removeFromFavorites(structureId);
        set({
          favorites: favorites.filter(f => f.id !== structureId),
          structures: structures.map(s =>
            s.id === structureId ? { ...s, isFavorite: false } : s
          ),
        });
      } else {
        await structuresService.addToFavorites(structureId);
        const structure = structures.find(s => s.id === structureId);
        if (structure) {
          set({
            favorites: [...favorites, { ...structure, isFavorite: true }],
            structures: structures.map(s =>
              s.id === structureId ? { ...s, isFavorite: true } : s
            ),
          });
        }
      }
    } catch (error: any) {
      set({ error: error.message || 'Erreur lors de la mise à jour' });
      throw error;
    }
  },

  clearStructures: () => {
    set({
      structures: [],
      selectedStructure: null,
      total: 0,
      currentPage: 1,
    });
  },

  clearError: () => set({ error: null }),
}));

export default useStructuresStore;
