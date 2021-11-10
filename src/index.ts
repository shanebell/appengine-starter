import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { ClientRequest, IncomingMessage } from "http";
import logger from "./logger";

const app = express();

app.use(bodyParser.raw({ type: "application/octet-stream" }));

const handleAsync =
  (handlerFn: (req: Request, res: Response, next?: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    handlerFn(req, res, next)
      .then(() => next())
      .catch((error: any) => next(error));

app.get(
  "/_ah/warmup",
  handleAsync(async (req: Request, res: Response) => {
    logger.info("Initalising application");
    // perform initialisation tasks here
    res.send("ok");
  })
);

app.get(
  "/api/list",
  handleAsync(async (req: Request, res: Response) => {
    res.json([
      { id: 1, value: "ABC" },
      { id: 2, value: "DEF" },
      { id: 3, value: "GHI" },
      { id: 4, value: "JKL" },
      { id: 5, value: "MNO" },
    ]);
  })
);

app.get(
  "/api/hello",
  handleAsync(async (req: Request, res: Response) => {
    res.send("hello");
  })
);

// When running locally proxy requests to the React frontend
if (process.env.NODE_ENV !== "production") {
  app.use(
    "*",
    createProxyMiddleware({
      target: "http://localhost:3000",
      onProxyReq: (proxyReq: ClientRequest, req: IncomingMessage) => {
        fixRequestBody(proxyReq, req);
      },
      proxyTimeout: 30000,
      secure: false,
      changeOrigin: true,
    })
  );
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
