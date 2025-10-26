import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Structure } from '@/models';

interface FavoritesState {
    favorites: Structure[];
    addFavorite: (structure: Structure) => void;
    removeFavorite: (structureId: string) => void;
    isFavorite: (structureId: string) => boolean;
    clearFavorites: () => void;
    getFavoritesByDiscipline: (discipline: string) => Structure[];
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (structure: Structure) => {
                const currentFavorites = get().favorites;
                if (!currentFavorites.some(fav => fav.id === structure.id)) {
                    set({
                        favorites: [...currentFavorites, { ...structure, isFavorite: true }]
                    });
                }
            },

            removeFavorite: (structureId: string) => {
                set({
                    favorites: get().favorites.filter(fav => fav.id !== structureId)
                });
            },

            isFavorite: (structureId: string) => {
                return get().favorites.some(fav => fav.id === structureId);
            },

            clearFavorites: () => {
                set({ favorites: [] });
            },

            getFavoritesByDiscipline: (discipline: string) => {
                return get().favorites.filter(fav =>
                    fav.disciplines.some(d =>
                        d.name.toLowerCase().includes(discipline.toLowerCase())
                    )
                );
            },
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
