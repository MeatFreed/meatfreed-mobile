import { RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

export type RootStackParamList = {
  [Routes.BOTTOM_TAB_BAR_NAVIGATOR]: undefined;
  [Routes.AUTH_NAVIGATOR]: undefined;
  [Routes.MAIN_NAVIGATOR]: undefined;
  [Routes.SEARCH_NAVIGATOR]: undefined;
  [Routes.OFFER_NAVIGATOR]: undefined;
  [Routes.POST_NAVIGATOR]: undefined;
  [Routes.PROFILE_NAVIGATOR]: undefined;
  [Routes.WELCOME]: undefined;
  [Routes.SIGN_IN]: undefined;
  [Routes.SIGN_UP]: {
    code?: string;
  };
  [Routes.POSTS]: undefined;
  [Routes.POST_DETAILS]: {
    contentId: string;
  };
  [Routes.SEARCH]: {
    placeId: string;
  };
  [Routes.OFFER]: undefined;
  [Routes.REFERRAL]: undefined;
  [Routes.PROFILE]: undefined;
  [Routes.SETTINGS]: undefined;
};

export type PostDetailsProp = RouteProp<RootStackParamList, Routes.POST_DETAILS>;

export type SearchProp = RouteProp<RootStackParamList, Routes.SEARCH>;

export type SignUpProp = RouteProp<RootStackParamList, Routes.SIGN_UP>;
