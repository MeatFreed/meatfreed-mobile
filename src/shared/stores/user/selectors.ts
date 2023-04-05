import { UserState } from './types';

const user = (state: UserState) => state.user;

export const userSelectors = {
  user,
};
