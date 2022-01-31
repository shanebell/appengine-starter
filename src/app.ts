import bodyParser from "body-parser";
import compression from "compression";
import express, { Express } from "express";
import { logRequest } from "./middleware/logRequest";
import { buildRoutes } from "./routes";
import { handleError } from "./middleware/errorHandler";

const initExpress = (): Express => {
  const app = express();
  app.use(logRequest());
  app.use(bodyParser.json());
  app.use(bodyParser.raw({ type: "application/octet-stream" }));
  app.use(compression());
  return app;
};

export const initApp = (): Express => {
  const app = initExpress();
  app.use("/api", buildRoutes(), handleError);
  return app;
};
