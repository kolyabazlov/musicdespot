// import { Amplify, Auth } from 'aws-amplify';

// const { AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_CLIENT_ID } = process.env;

// export async function POST(request: Request) {
//   const req = await request.json();

//   console.log('request', req);

//   Amplify.configure({
//     Auth: {
//       userPoolId: AWS_COGNITO_USER_POOL_ID,
//       region: AWS_COGNITO_REGION,
//       userPoolWebClientId: AWS_COGNITO_CLIENT_ID
//     }
//   });

//   try {
//     const res = await Auth.signIn({
//       username: req.username,
//       password: req.password
//     });

//     // here the answer is readable stream :(

//     console.log('response login', res);
//     return Response.json(res);
//   } catch (err: any) {
//     console.log('err', err);
//     return err;
//   }
// }
