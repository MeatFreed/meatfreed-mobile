import { ReactionsState } from './types';

const data = (state: ReactionsState) => state.reactions;

const reactions = (state: ReactionsState) => data(state).reactions;

export const reactionsSelectors = {
  reactions,
};
