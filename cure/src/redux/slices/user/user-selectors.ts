import { RootState } from '@redux/store';

export const selectUserUsername = (state: RootState) => state.user.Username;
