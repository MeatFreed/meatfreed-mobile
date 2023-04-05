import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

export const IcoMoonConfig = require('assets/resources/selection.json');

export const Icon = createIconSetFromIcoMoon(
  IcoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);
