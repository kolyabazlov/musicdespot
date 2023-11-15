import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { AUTH_ENPOINT } from '../../app/api/endpoints';
import { cleanup } from '@redux/actions';
import { RootState } from '../store';

import { Amplify, Auth } from 'aws-amplify';

const { AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_CLIENT_ID } = process.env;
// Amplify.configure({
//   Auth: {
//     userPoolId: AWS_COGNITO_USER_POOL_ID,
//     region: AWS_COGNITO_REGION,
//     userPoolWebClientId: AWS_COGNITO_CLIENT_ID
//   }
// });

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.tokens.access_token;
    // If we have a token set in state, let's assume that we should be passing it.
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

  // добавлять в хедеры Bearer tokens
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
          console.log('session', err, session);
          const { idToken, refreshToken, accessToken } = session;
          // do whatever you want to do now :)
        });
      } catch (e) {
        console.log('Unable to refresh Token', e);
      } finally {
        // try {
        //   const refreshResult = await baseQuery(AUTH_ENPOINT.REFRESH, api, extraOptions);

        //   if (refreshResult.data) {
        //     // retry the initial query
        //     result = await baseQuery(args, api, extraOptions);
        //   } else {
        //     api.dispatch(cleanup());
        //   }
        // }
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

export default baseQueryWithReauth;
