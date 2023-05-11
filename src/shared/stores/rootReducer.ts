import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { googleApi } from 'api';
import { placeReducer } from './place';
import { userReducer } from './user';
import { reactionsReducer } from './reactions';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: [
    'uid',
    'firstName',
    'lastName',
    'email',
    'name',
    'photoURL',
    'referrer',
    'referralsCount',
    'provider',
  ],
  timeout: 0,
};

const placePersistConfig = {
  key: 'place',
  storage: AsyncStorage,
  whitelist: [
    'location',
  ],
  timeout: 0,
};

export const rootReducer = combineReducers({
  reactions: reactionsReducer,
  place: persistReducer(placePersistConfig, placeReducer),
  user: persistReducer(userPersistConfig, userReducer),
  [googleApi.reducerPath]: googleApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
