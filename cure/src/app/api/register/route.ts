import { Amplify, Auth } from 'aws-amplify';

const { AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_CLIENT_ID } = process.env;

// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html#API_SignUp_Errors
const awsCognitoSignUpError = (error: { name: string; code: string }) => {
  switch (error.name) {
    case 'CodeDeliveryFailureException':
      return { status: 400, statusText: 'CodeDeliveryFailureException' };
    case 'ForbiddenException':
      return { status: 400, statusText: 'ForbiddenException' };
    case 'InternalErrorException':
      return { status: 400, statusText: 'InternalErrorException' };
    case 'InvalidEmailRoleAccessPolicyException':
      return { status: 400, statusText: 'InvalidEmailRoleAccessPolicyException' };
    case 'InvalidLambdaResponseException':
      return { status: 400, statusText: 'InvalidLambdaResponseException' };
    case 'InvalidParameterException':
      return { status: 400, statusText: 'InvalidParameterException' };
    case 'InvalidPasswordException':
      return { status: 400, statusText: 'InvalidPasswordException' };
    case 'InvalidSmsRoleAccessPolicyException':
      return { status: 400, statusText: 'InvalidSmsRoleAccessPolicyException' };
    case 'InvalidSmsRoleTrustRelationshipException':
      return { status: 400, statusText: 'InvalidSmsRoleTrustRelationshipException' };
    case 'NotAuthorizedException':
      return { status: 400, statusText: 'NotAuthorizedException' };
    case 'ResourceNotFoundException':
      return { status: 400, statusText: 'ResourceNotFoundException' };
    case 'TooManyRequestsException':
      return { status: 400, statusText: 'TooManyRequestsException' };
    case 'UnexpectedLambdaException':
      return { status: 400, statusText: 'UnexpectedLambdaException' };
    case 'UserLambdaValidationException':
      return { status: 400, statusText: 'UserLambdaValidationException' };
    case 'UsernameExistsException':
      return { status: 400, statusText: 'UsernameExistsException' };
  }
};

export async function POST(request: Request) {
  const req = await request.json();

  Amplify.configure({
    Auth: {
      userPoolId: AWS_COGNITO_USER_POOL_ID,
      region: AWS_COGNITO_REGION,
      userPoolWebClientId: AWS_COGNITO_CLIENT_ID
    }
  });

  try {
    const res = await Auth.signUp({
      username: req.username,
      password: req.password,
      attributes: {
        email: req.email
      }
    });

    // here the answer is readable stream :(
    return Response.json(res);
  } catch (err: any) {
    return new Response(null, awsCognitoSignUpError(err));
  }
}
