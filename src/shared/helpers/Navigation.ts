import { Routes } from 'navigation';

export const screens = [
  Routes.RESTAURANT_NAVIGATOR,
  Routes.RESTAURANT_DETAILS,
  Routes.POST_NAVIGATOR,
  Routes.POST_DETAILS,
  Routes.OFFER_NAVIGATOR,
  Routes.VOUCHER_DETAILS,
  Routes.RAFFLE_DETAILS,
  Routes.WELCOME,
  Routes.AUTH_NAVIGATOR,
  Routes.SIGN_IN,
  Routes.SIGN_UP,
];

export const getStatusBar = (routeName: Routes) => screens.includes(routeName);
