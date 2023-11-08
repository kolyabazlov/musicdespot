import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
// @ts-ignore
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from './slices/auth';
import { authApi } from './api/auth';
import storage from 'redux-persist/lib/storage';

export type AppThunk<T = Promise<unknown>> = ThunkAction<T, RootState, unknown, Action<string>>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer
  // auth: authReducer
});

const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    [
      ...getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
      })
    ].concat(logger, authApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

const { dispatch } = store;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const persistor = persistStore(store);

export { dispatch, store };
