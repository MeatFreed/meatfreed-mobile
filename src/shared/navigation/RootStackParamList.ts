import { RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

type OfferScreenType = Routes.VOUCHER_DETAILS | Routes.RAFFLE_DETAILS

export type RootStackParamList = {
  [Routes.BOTTOM_TAB_BAR_NAVIGATOR]: undefined;
  [Routes.AUTH_NAVIGATOR]: {
    screen: Routes,
    params?: {
      code?: string;
    },
  };
  [Routes.MY_WALLET_NAVIGATOR]: undefined;
  [Routes.SIGN_UP_CONFIRMATION]: undefined;
  [Routes.MAIN_NAVIGATOR]: undefined;
  [Routes.HOME_NAVIGATOR]: undefined;
  [Routes.OFFERS_NAVIGATOR]: undefined;
  [Routes.POSTS_NAVIGATOR]: undefined;
  [Routes.MY_WALLET_TOP_TAB_NAVIGATOR]: undefined;
  [Routes.ALL_OFFERS]: undefined;
  [Routes.CLAIMED_OFFERS]: undefined;
  [Routes.RAFFLES]: undefined;
  [Routes.DEALS]: undefined;
  [Routes.POST_NAVIGATOR]: {
    screen: Routes.POST_DETAILS,
    params: {
      contentId: string;
    }
  };
  [Routes.OFFERS_TOP_TAB_NAVIGATOR]: undefined;
  [Routes.RESTAURANT_FAVORITES]: undefined;
  [Routes.OFFER_NAVIGATOR]: {
    screen: OfferScreenType,
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
  [Routes.WELCOME]: {
    code?: string;
  };
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
  [Routes.VOUCHER_DETAILS]: {
    contentId: string;
  },
  [Routes.RAFFLE_DETAILS]: {
    contentId: string;
  },
  [Routes.REFERRAL]: undefined;
  [Routes.PROFILE]: undefined;
  [Routes.SETTINGS]: undefined;
};

export type WelcomeProp = RouteProp<RootStackParamList, Routes.WELCOME>;

export type PostDetailsProp = RouteProp<RootStackParamList, Routes.POST_DETAILS>;

export type RestaurantDetailsProp = RouteProp<RootStackParamList, Routes.RESTAURANT_DETAILS>;

export type OfferDetailsProp = RouteProp<RootStackParamList, Routes.VOUCHER_DETAILS>;

export type SignUpProp = RouteProp<RootStackParamList, Routes.SIGN_UP>;
