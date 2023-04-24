import { Routes } from 'navigation';

export const screens = [
  Routes.WELCOME,
];

export const getStatusBar = (routeName: Routes) => screens.includes(routeName);
