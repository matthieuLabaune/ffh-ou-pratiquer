export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  StructureDetails: { structureId: string };
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
    interface RootParamList extends RootStackParamList {}
  }
}
