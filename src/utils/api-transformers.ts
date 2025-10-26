import { Structure, ApiStructure, ApiStructureListResponse, StructureListResponse } from '@/models';

/**
 * Transforme une structure de l'API Laravel vers notre modèle interne
 */
export function transformApiStructure(apiStructure: ApiStructure): Structure {
    return {
        id: apiStructure.id,
        name: apiStructure.structure.name,
        type: apiStructure.structure.type,
        address: {
            street: apiStructure.structure.address?.street || '',
            city: apiStructure.structure.address?.city || '',
            postalCode: apiStructure.structure.address?.postal_code || '',
            country: 'France',
            latitude: apiStructure.structure.address?.latitude,
            longitude: apiStructure.structure.address?.longitude,
        },
        contact: {
            // Ces champs peuvent être ajoutés plus tard depuis l'API
        },
        disciplines: apiStructure.disciplines.map(d => ({
            id: d.id,
            name: d.name,
        })),
        mobilities: apiStructure.mobilities.map(m => ({
            id: m.id,
            name: m.name,
        })),
        verified: true,
        season: apiStructure.season,
    };
}

/**
 * Transforme la réponse de l'API Laravel vers notre modèle de liste
 */
export function transformApiStructureList(apiResponse: ApiStructureListResponse): StructureListResponse {
    return {
        data: apiResponse.data.map(transformApiStructure),
        total: apiResponse.meta?.total,
        page: apiResponse.meta?.current_page,
        pageSize: apiResponse.meta?.per_page,
        source: 'api',
    };
}

/**
 * Transforme une structure directe de l'API FFH vers notre modèle interne
 */
export function transformDirectApiStructure(item: any): Structure {
    return {
        id: item.id.toString(),
        name: item.name,
        type: item.type,
        address: {
            street: item.address || '',
            city: item.city || '',
            postalCode: item.postal_code || '',
            country: 'France',
            latitude: item.latitude ? parseFloat(item.latitude) : undefined,
            longitude: item.longitude ? parseFloat(item.longitude) : undefined,
        },
        contact: {
            phone: item.phone || undefined,
            mobile: item.mobile || undefined,
            email: item.email || undefined,
            website: item.website || undefined,
        },
        disciplines: (item.disciplines || []).map((name: string) => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name,
        })),
        mobilities: (item.mobilities || []).map((name: string) => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name,
        })),
        verified: true,
        region: item.region,
        departement: item.departement,
    };
}

/**
 * Transforme une réponse directe de l'API (array simple) vers notre modèle
 */
export function transformDirectApiResponse(apiData: any[]): StructureListResponse {
    const structures = apiData.map((item: any) => transformDirectApiStructure(item));
    return {
        data: structures,
        total: structures.length,
        source: 'api',
    };
}
