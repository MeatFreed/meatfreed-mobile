import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { brevoApi, googleApi, preferencesApi } from 'api';
import { placeReducer } from './place';
import { userReducer } from './user';
import { reactionsReducer } from './reactions';
import { notificationsReducer } from './notifications';
import { settingsReducer } from './settings';

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
    'referralLink',
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
  notifications: notificationsReducer,
  settings: settingsReducer,
  [brevoApi.reducerPath]: brevoApi.reducer,
  [preferencesApi.reducerPath]: preferencesApi.reducer,
  [googleApi.reducerPath]: googleApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
