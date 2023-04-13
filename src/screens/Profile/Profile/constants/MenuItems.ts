/* eslint-disable react/react-in-jsx-scope */
import { Routes } from 'navigation';
import i18n from 'i18next';
import { RouteService } from 'services';

export const menuItems = [
  {
    title: i18n.t('menu.settings'),
    onPress: () => RouteService.navigate(Routes.SETTINGS),
    iconName: 'settings-outline',
  },
];
