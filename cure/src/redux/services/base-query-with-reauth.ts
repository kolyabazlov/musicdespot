import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { cleanup } from '@redux/actions';
import { RootState } from '../store';
import { AUTH_API_ENDPOINT } from '@next-api/endpoints';
import { selectRefreshToken, setTokens } from '@redux/slices/auth/auth-slice';
import { InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access_token;

    if (access_token) {
      headers.set('authorization', `Bearer ${access_token}`);
    }

    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // if (true) {
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refresh_token = selectRefreshToken(api.getState() as RootState);

        const refreshResult = (await fetchBaseQuery({
          baseUrl: '/'
        })(
          {
            url: AUTH_API_ENDPOINT.REFRESH_TOKEN,
            method: 'POST',
            body: {
              refresh_token
            }
          },
          api,
          extraOptions
        )) as QueryReturnValue<InitiateAuthCommandOutput, FetchBaseQueryError, FetchBaseQueryMeta>;

        if (refreshResult?.data) {
          api.dispatch(
            setTokens({
              access_token: refreshResult.data.AuthenticationResult?.AccessToken ?? null,
              refresh_token
            })
          );
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(cleanup());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// остался хук
export default baseQueryWithReauth;
