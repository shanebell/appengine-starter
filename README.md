# AppEngine starter

This project is a starter template for writing web applications on Google AppEngine using:

- [Node.js](https://nodejs.dev/) server using [Express](https://expressjs.com/)
- [React](https://reactjs.org/) client with Material-UI (using [create-react-app](https://create-react-app.dev/))
- [Typescript](https://www.typescriptlang.org/)

## Running locally

Ensure you have Node.js `lts/fermium` (v14) installed. 

From the root directory:

```bash
npm i
npm install:all
npm run start:client
npm run start:server
```

When running locally the server runs on port 8080 and the client runs on port 3000. In local mode the server is configured to proxy requests to the client.
If you access the application via http://localhost:8080 it will automatically proxy requests to the React client. 

Note: do not access the client directly because it will not handle backend requests correctly.

Both the `start:client` and `start:server` scripts watch for changes and automatically recompile, restart etc.

## Deploying to AppEngine

Ensure you have the [gcloud](https://cloud.google.com/sdk/gcloud) command line tool installed.

Authenticate with `gcloud` and set the appropriate project.

```bash
gcloud auth login
gcloud config set project my-project-id
```

Run the deployment.

```bash
npm run deploy
```

