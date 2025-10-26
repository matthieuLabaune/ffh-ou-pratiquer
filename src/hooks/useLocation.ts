import { useState, useEffect, useCallback } from 'react';

// Version simplifiée sans expo-location pour éviter les erreurs
export interface Coordinates {
    latitude: number;
    longitude: number;
}

interface UseLocationReturn {
    location: Coordinates | null;
    isLoading: boolean;
    error: string | null;
    requestLocation: () => Promise<void>;
    clearError: () => void;
}

export const useLocation = (): UseLocationReturn => {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const requestLocation = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        // Mock location pour test (Paris)
        const mockCoords: Coordinates = {
            latitude: 48.8566,
            longitude: 2.3522
        };

        setTimeout(() => {
            setLocation(mockCoords);
            setIsLoading(false);
        }, 500);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        location,
        isLoading,
        error,
        requestLocation,
        clearError,
    };
};

export default useLocation;
