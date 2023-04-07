import { Routes } from 'navigation';

export const screens = [
  Routes.WELCOME,
  Routes.SIGN_IN,
  Routes.SIGN_UP,
];

export const getStatusBar = (routeName: Routes) => screens.includes(routeName);
