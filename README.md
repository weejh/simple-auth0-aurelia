# simple-auth0-aurelia
Simple test of aurelia with auth0, using the seed project from auth0

## Getting Started

Clone the repo, then:

```bash
npm install
jspm install
```

Create .env file with parameters:
* AUTH0_CLIENT_ID
* AUTH0_CLIENT_SECRET
* AUTH0_DOMAIN

Create auth0-variables.js file with parameters:
* var AUTH0_CLIENT_ID
* var AUTH0_DOMAIN
* var AUTH0_CALLBACK_URL=location.href;

Run the application with a web server.

```bash
nodemon server1.js
```
