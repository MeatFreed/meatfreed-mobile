import { Routes } from 'navigation';

export const screens = [
  Routes.RESTAURANT_NAVIGATOR,
  Routes.RESTAURANT_DETAILS,
  Routes.POST_NAVIGATOR,
  Routes.POST_DETAILS,
];

export const getStatusBar = (routeName: Routes) => screens.includes(routeName);
