import { UserState } from './types';

const user = (state: UserState) => state.user;

const userId = (state: UserState) => state.user.uid;

const referralLink = (state: UserState) => user(state)?.referralLink || '';

export const userSelectors = {
  user,
  userId,
  referralLink,
};
