import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../base-query-with-reauth';
import { AUTH_ENPOINT } from '../../../app/api/endpoints';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { REHYDRATE } from 'redux-persist';

// делать логин - записать в персист - далее при дальнейших запросах будет использоваться этот токен
// остальное - нахуй
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    // when persisting the root reducer
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }

    // when persisting the api reducer
    if (action.type === REHYDRATE && action.key === 'key used with redux-persist') {
      return action.payload;
    }
  },
  endpoints: (builder) => ({
    login: builder.mutation<CognitoUser, LoginRequest>({
      query(credentials) {
        return {
          url: AUTH_ENPOINT.LOGIN,
          method: 'POST',
          body: credentials,
          credentials: 'include'
        };
      },
      transformResponse: (result) => {
        return {
          access_token: result.signInUserSession.accessToken.jwtToken,
          refresh_token: result.signInUserSession.refreshToken.token
        };
      }
    }),
    register: builder.mutation({
      query(data) {
        return {
          url: AUTH_ENPOINT.REGISTER,
          method: 'POST',
          body: data
        };
      }
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
