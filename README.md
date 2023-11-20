<h1 align="center">
    Music Despot
</h1>

<p align="center">
    <img src="./assets/mvp.png" alt="drawing" width="130" style="margin: auto"/>
</p>

1. User uploads list of liked tracks from any music stream service in a format "track - artist".
2. User gets list of all tracks from artists in the uploaded list.
3. User can mark a track in the presented list as "listened".

<h2 align="center">
    Current state
</h2>

- Finishing up the auth system.
- I'm trying to figure out the scheme of interaction of the Discogs API with the front part. 
- Still thinking about the overall architecture of the application.

<h2 align="center">
    Blog
</h2>

### Part 1. Authentication.

#### Chosen service.

I gave up the idea of writing my own authentication service in order to avoid a number of bugs and speed up development. So the first task was to determine the existing solutions. 

The list of solutions *(possible every that exists)*: AWS Cognito, Firebase, Azure ad, Supabase, Keycloak, Lucia, Clark, iron-session, Payload CMS, Stytch, Okta, AuthO, Super tokens, userfront.

I chose AWS Cognito. **Why?** To be honest, every solution has both cons and pros. I chose AWS Cognito simply because AWS has many other services and I can progress maximum of my DevOps skills.

#### Implementation. Features.

- **Next.js 13**  
I have a lot of experience in this and can easily start. 
- **Redux (Toolkit)**  
I decided to use **RTK Query** because it's evolving and good supported feature.
- **AWS client-cognito-identity-provider**  
It has built in support for cognito. Almost every implementation and example in the internet makes requests from client which means *sensetive* variables like *client_id* is open for everyone and makes it possible to DDoS auth system. Also I think it's bad practice to store .env variables publicly. So I developed a solution with Next.js API routes system. Every request goes to Next.js server and only then to Cognito.
 

- **Next.js 13**  
I know my way around Next.js 13 and can get started easily.
- **Redux (Toolkit)**  
I chose **RTK Query** because it's continuously improving and well-supported.
- **AWS client-cognito-identity-provider**  
This tool has built-in support for Cognito. However, most solutions on the web expose sensitive information, like addresses for requests, when making requests from the client. This makes the authentication system vulnerable to DDoS attacks. I consider it bad practice to store any .env variables publicly. Therefore, I've set up a solution using Next.js API routes. Now, every request goes through the Next.js server before reaching Cognito for an added layer of security.
