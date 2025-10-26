import { useCallback, useEffect } from 'react';
import { useStructuresStore, useFiltersStore } from '@/store';
import { StructureSearchParams } from '@/models';

export const useStructures = () => {
  const {
    structures,
    selectedStructure,
    favorites,
    total,
    currentPage,
    isLoading,
    error,
    search,
    loadMore,
    getById,
    setSelectedStructure,
    toggleFavorite,
    clearStructures,
    clearError,
  } = useStructuresStore();

  const { getSearchParams } = useFiltersStore();

  const searchWithFilters = useCallback(
    async (additionalParams?: Partial<StructureSearchParams>) => {
      const params = getSearchParams();
      await search({ ...params, ...additionalParams });
    },
    [search, getSearchParams]
  );

  const refreshSearch = useCallback(() => {
    return searchWithFilters({ page: 1 });
  }, [searchWithFilters]);

  return {
    structures,
    selectedStructure,
    favorites,
    total,
    currentPage,
    isLoading,
    error,
    search: searchWithFilters,
    refresh: refreshSearch,
    loadMore,
    getById,
    setSelectedStructure,
    toggleFavorite,
    clearStructures,
    clearError,
  };
};

export default useStructures;
