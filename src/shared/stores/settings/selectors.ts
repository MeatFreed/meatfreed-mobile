import { SettingsState } from './types';

const all = (state: SettingsState) => state.settings;

const totalMilesConvertedToMeters = (
  state: SettingsState,
) => all(state).totalMilesConvertedToMeters;

export const settingsSelectors = {
  totalMilesConvertedToMeters,
};
