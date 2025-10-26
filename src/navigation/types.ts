import { Structure } from '@/models';

export type RootStackParamList = {
    Main: undefined;
    Auth: undefined;
    StructureDetails: {
        structureId: string;
        structure?: Structure;  // Structure optionnelle passée directement
        searchResults?: Structure[];  // Tableau complet pour le swipe
        initialIndex?: number;  // Index de la structure actuelle
    };
    QuestionnaireStart: undefined;
    QuestionnaireResult: { submissionId: string };
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Search: undefined;
    Favorites: undefined;
    Account: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
