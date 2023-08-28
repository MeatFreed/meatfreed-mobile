import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { brevoApi, googleApi, preferencesApi } from 'api';
import { rootReducer } from './rootReducer';

const createStore = () => configureStore({
  reducer: rootReducer,
  middleware: [
    thunk,
    googleApi.middleware,
    brevoApi.middleware,
    preferencesApi.middleware,
  ],
});

export const store = createStore();

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
