import { UserState } from './types';

const user = (state: UserState) => state.user;

const userId = (state: UserState) => state.user.uid;

export const userSelectors = {
  user,
  userId,
};
