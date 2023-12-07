<h1 align="center">
    Music Despot
</h1>

<p align="center">
    <img src="./assets/mvp.png" alt="drawing" width="130" style="margin: auto"/>
</p>

1. User installs chrome extension.
2. User can login in the extension.
3. User can mark a track as "listened" on the page of music service. (at first on yandex music)

<h2 align="center">
    Current state
</h2>

- Using Amazon services - ApiGateway, Cognito, RDS, Lambda, AppSync, create a functionallity when user can mark track as "listened" on the yandex music website and then make a record to the database, that related to Cognito users database.

<h2 align="center">
    Done
</h2>

- Cognito setup
- Auth system for musicdespot.com
- Draft of chrome extension
- Plan

<h2 align="center">
    Blog
</h2>

### Part 2. Simplifying MVP.

I realised that I need to make simplier start for user.  
The first goal was the following steps of the user flow:

1. User uploads list of liked tracks from any music stream service in a format "track - artist".
2. User gets list of all tracks from artists in the uploaded list.
3. User can mark a track in the presented list as "listened".

Now I realised that I need to chrome extension that gives you a possibility to mark a track as "listened" on the reqired streming service.

---

### Part 1. Authentication.

#### Chosen service.

I gave up the idea of writing my own authentication service in order to avoid a number of bugs and speed up development. So the first task was to determine the existing solutions. 

The list of solutions *(possible every that exists)*: AWS Cognito, Firebase, Azure ad, Supabase, Keycloak, Lucia, Clark, iron-session, Payload CMS, Stytch, Okta, AuthO, Super tokens, userfront.

I chose AWS Cognito. **Why?** To be honest, every solution has both cons and pros. I chose AWS Cognito simply because AWS has many other services and I can progress maximum of my DevOps skills.

#### Implementation. Features.

- **Next.js 13**  
I know my way around Next.js 13 and can get started easily.
- **Redux (Toolkit)**  
I chose **RTK Query** because it's continuously improving and well-supported.
- **AWS client-cognito-identity-provider**  
This tool has built-in support for Cognito. However, most solutions on the web expose sensitive information, like addresses for requests, when making requests from the client. This makes the authentication system vulnerable to DDoS attacks. I consider it bad practice to store any .env variables publicly. Therefore, I've set up a solution using Next.js API routes. Now, every request goes through the Next.js server before reaching Cognito for an added layer of security.
