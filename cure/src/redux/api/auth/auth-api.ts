import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../base-query-with-reauth';
import { AUTH_ENPOINT } from '../../../app/api/endpoints';
import { CognitoUser } from 'amazon-cognito-identity-js';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
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
      transformResponse: (result: any) => {
        return {
          access_token: result.signInUserSession.accessToken.jwtToken,
          refresh_token: result.signInUserSession.refreshToken.token
        };
      }
    })
    // register: builder.mutation({
    //   query(data) {
    //     return {
    //       url: AUTH_ENPOINT.REGISTER,
    //       method: 'POST',
    //       body: data
    //     };
    //   }
    // })
  })
});

export const { useLoginMutation } = authApi;
