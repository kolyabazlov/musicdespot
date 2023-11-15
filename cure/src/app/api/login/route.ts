import { Amplify, Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

const { AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_CLIENT_ID } = process.env;

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // console.log('request', username, password);

  Amplify.configure({
    Auth: {
      userPoolId: AWS_COGNITO_USER_POOL_ID,
      region: AWS_COGNITO_REGION,
      userPoolWebClientId: AWS_COGNITO_CLIENT_ID
    }
  });

  try {
    let result: CognitoUser = await Auth.signIn({
      username,
      password
    });

    // console.log('user getIdToken', (await Auth.currentSession()).getIdToken());
    // console.log('user getAccessToken', (await Auth.currentSession()).getAccessToken());
    // console.log('user getRefreshToken', (await Auth.currentSession()).getRefreshToken());

    // console.log('result', result);

    // Не понимаю как вернуть всю инфу а не только токены
    return Response.json(result);
  } catch (err: any) {
    console.log('err', err);
    return err;
  }
}
