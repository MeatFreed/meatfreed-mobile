import { RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

export type RootStackParamList = {
  [Routes.BOTTOM_TAB_BAR_NAVIGATOR]: undefined;
  [Routes.AUTH_NAVIGATOR]: undefined;
  [Routes.MAIN_NAVIGATOR]: undefined;
  [Routes.SEARCH_NAVIGATOR]: undefined;
  [Routes.OFFER_NAVIGATOR]: undefined;
  [Routes.LEARN_NAVIGATOR]: undefined;
  [Routes.WELCOME]: undefined;
  [Routes.SIGN_IN]: undefined;
  [Routes.SIGN_UP]: {
    code?: string;
  };
  [Routes.LEARN]: undefined;
  [Routes.LEARN_DETAILS]: {
    uid: string;
  };
  [Routes.SEARCH]: {
    placeId: string;
  };
  [Routes.OFFER]: undefined;
  [Routes.REFERRAL]: undefined;
};

export type LearnDetailsProp = RouteProp<RootStackParamList, Routes.LEARN_DETAILS>;

export type SearchProp = RouteProp<RootStackParamList, Routes.SEARCH>;

export type SignUpProp = RouteProp<RootStackParamList, Routes.SIGN_UP>;
