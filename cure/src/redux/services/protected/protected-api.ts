import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../base-query-with-reauth';
import { PROTECTED_API_ENDPOINT } from '@next-api/endpoints';
import { GetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';

export const protectedApi = createApi({
  reducerPath: 'protectedApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query<GetUserCommandOutput, any>({
      query: () => ({
        url: PROTECTED_API_ENDPOINT.USER
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setUser(data));
        } catch (err) {
          console.log('Error on RTK protected-api getUser', err);
        }
      }
    })
  })
});

export const { useLazyGetUserQuery } = protectedApi;
