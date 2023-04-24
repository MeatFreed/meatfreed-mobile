import { ReactionType } from 'api';

export interface ReactionsReducer {
  reactions: ReactionType[];
}

export interface ReactionsState {
  reactions: ReactionsReducer;
}
