import { RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

export type RootStackParamList = {
  [Routes.BOTTOM_TAB_BAR_NAVIGATOR]: undefined;
  [Routes.AUTH_NAVIGATOR]: undefined;
  [Routes.MAIN_NAVIGATOR]: undefined;
  [Routes.HOME_NAVIGATOR]: undefined;
  [Routes.OFFER_NAVIGATOR]: undefined;
  [Routes.POSTS_NAVIGATOR]: undefined;
  [Routes.POST_NAVIGATOR]: {
    screen: Routes.POST_DETAILS,
    params: {
      contentId: string;
    }
  };
  [Routes.PROFILE_NAVIGATOR]: undefined;
  [Routes.RESTAURANT_NAVIGATOR]: {
    screen: Routes.RESTAURANT_DETAILS,
    params: {
      contentId: string;
    }
  },
  [Routes.WELCOME]: undefined;
  [Routes.SIGN_IN]: undefined;
  [Routes.SIGN_UP]: {
    code?: string;
  };
  [Routes.POSTS]: undefined;
  [Routes.POST_DETAILS]: {
    contentId: string;
  };
  [Routes.RESTAURANTS]: undefined;
  [Routes.RESTAURANT_DETAILS]: {
    contentId: string;
  },
  [Routes.OFFER]: undefined;
  [Routes.REFERRAL]: undefined;
  [Routes.PROFILE]: undefined;
  [Routes.SETTINGS]: undefined;
};

export type PostDetailsProp = RouteProp<RootStackParamList, Routes.POST_DETAILS>;

export type RestaurantDetailsProp = RouteProp<RootStackParamList, Routes.RESTAURANT_DETAILS>;

export type SignUpProp = RouteProp<RootStackParamList, Routes.SIGN_UP>;
