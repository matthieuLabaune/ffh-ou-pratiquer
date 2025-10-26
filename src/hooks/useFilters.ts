import { useFiltersStore } from '@/store';

export const useFilters = () => {
  const {
    userLocation,
    selectedLocation,
    radius,
    city,
    postalCode,
    sport,
    type,
    amenities,
    searchQuery,
    isMapView,
    sortBy,
    setUserLocation,
    setSelectedLocation,
    setRadius,
    setCity,
    setPostalCode,
    setSport,
    setType,
    setAmenities,
    toggleAmenity,
    setSearchQuery,
    setIsMapView,
    setSortBy,
    clearFilters,
    getSearchParams,
  } = useFiltersStore();

  return {
    // State
    userLocation,
    selectedLocation,
    radius,
    city,
    postalCode,
    sport,
    type,
    amenities,
    searchQuery,
    isMapView,
    sortBy,
    
    // Actions
    setUserLocation,
    setSelectedLocation,
    setRadius,
    setCity,
    setPostalCode,
    setSport,
    setType,
    setAmenities,
    toggleAmenity,
    setSearchQuery,
    setIsMapView,
    setSortBy,
    clearFilters,
    getSearchParams,
  };
};

export default useFilters;
