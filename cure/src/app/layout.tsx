'use client';

import { persistor, store } from '@redux/store';
import '@styles/globals.css';
import { Amplify } from 'aws-amplify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const { AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_CLIENT_ID } = process.env;

Amplify.configure({
  Auth: {
    userPoolId: AWS_COGNITO_USER_POOL_ID,
    region: AWS_COGNITO_REGION,
    userPoolWebClientId: AWS_COGNITO_CLIENT_ID
  }
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
