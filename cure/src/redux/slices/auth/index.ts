import { cleanup } from '@redux/actions';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface AuthState {
  user: any;
  tokens: {
    access_token: string | null;
    refresh_token: string | null;
  };
}

const initialState: AuthState = {
  user: null,
  tokens: {
    access_token: null,
    refresh_token: null
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.tokens.access_token = action.payload.access_token;
      state.tokens.refresh_token = action.payload.refresh_token;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(cleanup, () => initialState);
  }
});

export const { setCredentials } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage
};

export default persistReducer(persistConfig, authSlice.reducer);
