# AppEngine starter

This project is a starter template for writing web applications on Google AppEngine using:

- [Node.js](https://nodejs.dev/) server using [Express](https://expressjs.com/)
- [React](https://reactjs.org/) client with Material-UI (using [create-react-app](https://create-react-app.dev/))
- [Typescript](https://www.typescriptlang.org/)

This project includes some basic functionality to interact with Google Cloud Storage and Datastore.

## Running locally

Open the Google Cloud Console and download a credentials key for the default AppEngine service account in your GCP project. Save this file locally as `credentials.json`. Note: this is only required
locally as credentials are handled automatically when deployed to AppEngine.

Ensure you have Node.js `lts/gallium` (v16) installed.

From the root of this project:

```bash
npm run install:all
npm run start:client
npm run start:server
```

When running locally the server runs on port 8080 and the client runs on port 3000. In local mode the client is configured to proxy any unknown requests to the server. This allows local development of
backend API endpoints while maintaining hot-reloading etc in the client. Access the application via http://localhost:3000 and it will automatically proxy API calls to the server.

Both the `start:client` and `start:server` scripts watch for changes and automatically recompile, restart etc.

## Deploying to AppEngine

Ensure you have the [gcloud](https://cloud.google.com/sdk/gcloud) command line tool installed.

Configure `gcloud`:

```bash
gcloud auth login
gcloud config set project my-project-id
```

Deploy the application to AppEngine:

```bash
npm run deploy
```

