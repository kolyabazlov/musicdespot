import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../base-query-with-reauth';

export const protectedApi = createApi({
  reducerPath: 'protectedApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNothing: builder.query({
      query() {
        return {
          url: 'http://localhost:3001/hello',
          method: 'GET',
          headers: {
            Authorization: 'text/plain'
          },
          credentials: 'include'
        };
      }
    })
  })
});

export const { useLazyGetNothingQuery } = protectedApi;
