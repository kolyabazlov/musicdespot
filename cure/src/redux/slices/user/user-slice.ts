import { GetUserResponse } from '@aws-sdk/client-cognito-identity-provider';
import { RootState } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// export interface UserState {
//   access_token: string | null;
//   refresh_token: string | null;
// }

type UserState = {
  [K in keyof GetUserResponse]: GetUserResponse[K] | null | undefined;
};

const initialState = {
  Username: null
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, { payload }: PayloadAction<UserState>) => {
      state.Username = payload.Username;
    }
  }
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
