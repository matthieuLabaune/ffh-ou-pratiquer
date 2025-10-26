import { Structure, StructureListResponse } from '@/models';

// Données mock pour le développement
const MOCK_STRUCTURES: Structure[] = [
    {
        id: '1',
        name: 'Club Handisport de Paris',
        type: 'Club',
        address: {
            street: '123 Rue de la République',
            city: 'Paris',
            postalCode: '75001',
            country: 'France',
            latitude: 48.8566,
            longitude: 2.3522,
        },
        contact: {
            phone: '01 23 45 67 89',
            email: 'contact@club-paris.fr',
            website: 'https://club-paris.fr',
        },
        disciplines: [
            { id: '1', name: 'Basketball' },
            { id: '2', name: 'Tennis' },
            { id: '3', name: 'Natation' },
        ],
        mobilities: [
            { id: '1', name: 'Fauteuil roulant' },
            { id: '2', name: 'Déficience visuelle' },
        ],
        verified: true,
        season: '2025',
        distance: 2.5,
    },
    {
        id: '2',
        name: 'Association Sportive Lyon Handisport',
        type: 'Association',
        address: {
            street: '456 Avenue des Sports',
            city: 'Lyon',
            postalCode: '69001',
            country: 'France',
            latitude: 45.7640,
            longitude: 4.8357,
        },
        contact: {
            phone: '04 12 34 56 78',
            email: 'contact@lyon-handisport.fr',
        },
        disciplines: [
            { id: '4', name: 'Handball' },
            { id: '5', name: 'Athlétisme' },
        ],
        mobilities: [
            { id: '3', name: 'Déficience motrice' },
        ],
        verified: true,
        season: '2025',
        distance: 1.8,
    },
    {
        id: '3',
        name: 'Centre Sportif Marseille Handisport',
        type: 'Structure publique',
        address: {
            street: '789 Boulevard de la Mer',
            city: 'Marseille',
            postalCode: '13001',
            country: 'France',
            latitude: 43.2965,
            longitude: 5.3698,
        },
        contact: {
            phone: '04 91 23 45 67',
            email: 'accueil@marseille-handisport.fr',
            website: 'https://marseille-handisport.fr',
        },
        disciplines: [
            { id: '6', name: 'Rugby' },
            { id: '7', name: 'Voile' },
            { id: '8', name: 'Tennis de table' },
        ],
        mobilities: [
            { id: '4', name: 'Amputé' },
            { id: '5', name: 'Paralysie cérébrale' },
        ],
        verified: true,
        season: '2025',
        distance: 5.2,
    },
    {
        id: '4',
        name: 'École de Sport Adaptée Toulouse',
        type: 'École',
        address: {
            street: '321 Rue de l\'Éducation',
            city: 'Toulouse',
            postalCode: '31000',
            country: 'France',
            latitude: 43.6047,
            longitude: 1.4442,
        },
        contact: {
            email: 'info@toulouse-sport-adapte.fr',
        },
        disciplines: [
            { id: '9', name: 'Football' },
            { id: '10', name: 'Cyclisme' },
        ],
        mobilities: [
            { id: '6', name: 'Déficience intellectuelle' },
        ],
        verified: false,
        season: '2025',
        distance: 8.7,
    },
    {
        id: '5',
        name: 'Piscine Adaptée Bordeaux',
        type: 'Structure publique',
        address: {
            street: '654 Allée des Nageurs',
            city: 'Bordeaux',
            postalCode: '33000',
            country: 'France',
            latitude: 44.8378,
            longitude: -0.5792,
        },
        contact: {
            phone: '05 56 78 90 12',
            website: 'https://bordeaux-natation.fr',
        },
        disciplines: [
            { id: '11', name: 'Natation' },
            { id: '12', name: 'Water-polo' },
        ],
        mobilities: [
            { id: '7', name: 'Toutes déficiences' },
        ],
        verified: true,
        season: '2025',
        distance: 12.3,
    },
];

export function getMockStructures(
    count: number = 5,
    filterDiscipline?: string
): StructureListResponse {
    let structures = [...MOCK_STRUCTURES];

    // Filtrer par discipline si spécifié
    if (filterDiscipline && filterDiscipline !== 'Toutes') {
        structures = structures.filter(structure =>
            structure.disciplines.some(d =>
                d.name.toLowerCase().includes(filterDiscipline.toLowerCase())
            )
        );
    }

    return {
        data: structures.slice(0, count),
        total: structures.length,
        source: 'mock',
    };
}

export function getMockStructureById(id: string): Structure | null {
    return MOCK_STRUCTURES.find(s => s.id === id) || null;
}
