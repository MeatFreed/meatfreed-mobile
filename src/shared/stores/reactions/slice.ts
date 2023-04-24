import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReactionType } from 'api';
import { ReactionsReducer } from './types';

const initialState: ReactionsReducer = {
  reactions: [],
};

const reactions = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    setReactions: (state, { payload }: PayloadAction<ReactionType[]>) => {
      state.reactions = payload;
    },
  },
});

export const {
  reducer: reactionsReducer,
  actions: { setReactions },
} = reactions;
