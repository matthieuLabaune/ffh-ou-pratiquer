import { create } from 'zustand';
import { StructureSearchParams } from '@/models';
import { Coordinates } from '@/utils';

interface FiltersState {
  // Location
  userLocation: Coordinates | null;
  selectedLocation: Coordinates | null;
  radius: number;
  city: string | null;
  postalCode: string | null;
  
  // Search criteria
  sport: string | null;
  type: string | null;
  amenities: string[];
  searchQuery: string;
  
  // UI state
  isMapView: boolean;
  sortBy: 'distance' | 'name' | 'rating';
  
  // Actions
  setUserLocation: (location: Coordinates | null) => void;
  setSelectedLocation: (location: Coordinates | null) => void;
  setRadius: (radius: number) => void;
  setCity: (city: string | null) => void;
  setPostalCode: (postalCode: string | null) => void;
  setSport: (sport: string | null) => void;
  setType: (type: string | null) => void;
  setAmenities: (amenities: string[]) => void;
  toggleAmenity: (amenity: string) => void;
  setSearchQuery: (query: string) => void;
  setIsMapView: (isMapView: boolean) => void;
  setSortBy: (sortBy: 'distance' | 'name' | 'rating') => void;
  clearFilters: () => void;
  getSearchParams: () => StructureSearchParams;
}

const DEFAULT_RADIUS = 10; // km

export const useFiltersStore = create<FiltersState>((set, get) => ({
  userLocation: null,
  selectedLocation: null,
  radius: DEFAULT_RADIUS,
  city: null,
  postalCode: null,
  sport: null,
  type: null,
  amenities: [],
  searchQuery: '',
  isMapView: false,
  sortBy: 'distance',

  setUserLocation: (location) => set({ userLocation: location }),
  
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  
  setRadius: (radius) => set({ radius }),
  
  setCity: (city) => set({ city }),
  
  setPostalCode: (postalCode) => set({ postalCode }),
  
  setSport: (sport) => set({ sport }),
  
  setType: (type) => set({ type }),
  
  setAmenities: (amenities) => set({ amenities }),
  
  toggleAmenity: (amenity) => {
    const { amenities } = get();
    set({
      amenities: amenities.includes(amenity)
        ? amenities.filter(a => a !== amenity)
        : [...amenities, amenity],
    });
  },
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  setIsMapView: (isMapView) => set({ isMapView }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  clearFilters: () => {
    set({
      selectedLocation: null,
      radius: DEFAULT_RADIUS,
      city: null,
      postalCode: null,
      sport: null,
      type: null,
      amenities: [],
      searchQuery: '',
    });
  },
  
  getSearchParams: (): StructureSearchParams => {
    const state = get();
    const location = state.selectedLocation || state.userLocation;
    
    return {
      latitude: location?.latitude,
      longitude: location?.longitude,
      radius: state.radius,
      city: state.city || undefined,
      postalCode: state.postalCode || undefined,
      sport: state.sport || undefined,
      type: state.type || undefined,
      amenities: state.amenities.length > 0 ? state.amenities : undefined,
    };
  },
}));

export default useFiltersStore;
