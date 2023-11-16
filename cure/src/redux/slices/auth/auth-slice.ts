import { RootState } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
}

const initialState = {
  access_token: null,
  refresh_token: null
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, { payload: { access_token, refresh_token } }: PayloadAction<AuthState>) => {
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    }
  }
});

export const { setTokens } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage
};

export default persistReducer(persistConfig, authSlice.reducer);

export const selectRefreshToken = (state: RootState) => state.auth.refresh_token;
