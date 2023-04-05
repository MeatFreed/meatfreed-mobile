import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { placeReducer } from './place';
import { userReducer } from './user';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: [
    'uid',
    'firstName',
    'lastName',
    'email',
    'referrer',
    'referralsCount',
    'provider',
  ],
  timeout: 0,
};

export const rootReducer = combineReducers({
  place: placeReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
