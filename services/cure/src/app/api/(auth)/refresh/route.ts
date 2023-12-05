import { CognitoIdentityProviderClient, AuthFlowType, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { NextResponse } from 'next/server';

const { AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_CLIENT_ID } = process.env;

export async function POST(request: Request) {
  const body = await request.json();

  const params = {
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: AWS_COGNITO_CLIENT_ID,
    UserPoolId: AWS_COGNITO_USER_POOL_ID,
    AuthParameters: {
      REFRESH_TOKEN: body?.refresh_token
    }
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: AWS_COGNITO_REGION
  });

  const initiateAuthCommand = new InitiateAuthCommand(params);

  try {
    const res = await cognitoClient.send(initiateAuthCommand);

    return NextResponse.json(res, { status: res['$metadata'].httpStatusCode });
  } catch (err: any) {
    return NextResponse.json(err.toString(), { status: err['$metadata'].httpStatusCode });
  }
}
