import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface JwtTokens {
  access_token: string | null;
  refresh_token: string | null;
}

interface AuthState {
  tokens: JwtTokens;
}

const initialState = {
  tokens: {
    access_token: null,
    refresh_token: null
  }
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { tokens } }: PayloadAction<{ tokens: JwtTokens }>) => {
      state.tokens = tokens;
    }
  }
});

export const { setCredentials } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage
};

export default persistReducer(persistConfig, authSlice.reducer);
