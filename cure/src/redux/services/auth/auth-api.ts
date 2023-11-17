import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { AuthState, setTokens } from '@redux/slices/auth/auth-slice';
import { AUTH_API_ENDPOINT } from '@next-api/endpoints';

interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginRequest>({
      query(credentials) {
        return {
          url: AUTH_API_ENDPOINT.LOGIN,
          method: 'POST',
          body: credentials,
          credentials: 'include'
        };
      },
      transformResponse: (result: InitiateAuthCommandOutput) => {
        return {
          access_token: result.AuthenticationResult?.AccessToken ?? null,
          refresh_token: result.AuthenticationResult?.RefreshToken ?? null
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setTokens(data));
        } catch (err) {
          // `onError` side-effect
          console.log('Error on RTK login', err);
        }
      }
    })
    // register: builder.mutation({
    //   query(data) {
    //     return {
    //       url: AUTH_API_ENDPOINT.REGISTER,
    //       method: 'POST',
    //       body: data
    //     };
    //   }
    // })
  })
});

export const { useLoginMutation } = authApi;
