export interface Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

export interface Contact {
    phone?: string;
    mobile?: string;
    email?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
}

export interface Discipline {
    id: string;
    name: string;
    category?: string;
    icon?: string;
}

export interface Mobility {
    id: string;
    name: string;
    description?: string;
}

export interface Structure {
    id: string;
    name: string;
    type: string;
    description?: string;
    address: Address;
    contact: Contact;
    disciplines: Discipline[];
    mobilities: Mobility[];
    photos?: string[];
    rating?: number;
    reviewCount?: number;
    verified: boolean;
    distance?: number;
    isFavorite?: boolean;
    season?: string;
    region?: string;
    departement?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Interface pour les données reçues de l'API Laravel
export interface ApiStructure {
    id: string;
    structure: {
        id: string;
        name: string;
        type: string;
        address?: {
            street: string;
            city: string;
            postal_code: string;
            latitude?: number;
            longitude?: number;
        };
    };
    disciplines: Array<{
        id: string;
        name: string;
    }>;
    mobilities: Array<{
        id: string;
        name: string;
    }>;
    season: string;
}

export interface StructureListResponse {
    data: Structure[];
    total?: number;
    page?: number;
    pageSize?: number;
    source?: 'api' | 'mock';
}

// Response de l'API Laravel
export interface ApiStructureListResponse {
    data: ApiStructure[];
    meta?: {
        total: number;
        per_page: number;
        current_page: number;
    };
}

export interface StructureSearchParams {
    latitude?: number;
    longitude?: number;
    radius?: number;
    sport?: string;
    type?: string;
    city?: string;
    postalCode?: string;
    query?: string;
    amenities?: string[];
    page?: number;
    pageSize?: number;
}
