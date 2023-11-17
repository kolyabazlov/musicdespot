import { CognitoIdentityProviderClient, AuthFlowType, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { NextResponse } from 'next/server';

const { AWS_COGNITO_REGION } = process.env;

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization');
  const access_token = authorization ? authorization.split(' ').at(1) : null;

  if (!access_token) {
    throw new Error('There is not authorization header in request to /api/user');
  }

  const params = {
    AccessToken: access_token
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: AWS_COGNITO_REGION
  });

  const getUserCommand = new GetUserCommand(params);

  try {
    const res = await cognitoClient.send(getUserCommand);
    console.log('res', res);
    return NextResponse.json(res, { status: res['$metadata'].httpStatusCode });
  } catch (err: any) {
    return NextResponse.json(err.toString(), { status: err['$metadata'].httpStatusCode });
  }
}
