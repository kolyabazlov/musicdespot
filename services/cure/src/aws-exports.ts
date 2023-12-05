const awsconfig = {
  Auth: {
    // Configure Amplify for use with your user pool
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID

      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      //   signUpVerificationMethod: 'code', // 'code' | 'link'

      //   // OPTIONAL - Hosted UI configuration
      //   loginWith: {
      //     oauth: {
      //       domain: 'your_cognito_domain',
      //       scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      //       redirectSignIn: ['http://localhost:3000/'],
      //       redirectSignOut: ['http://localhost:3000/'],
      //       responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      //     }
      //   }
    }
  }
};

export default awsconfig;
