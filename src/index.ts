import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import logger from "./logger";
import * as firestore from "./firestore";
import * as gcs from "./gcs";

const app = express();

app.use(bodyParser.raw({ type: "application/octet-stream" }));
app.use(bodyParser.json());

const handleAsync =
  (handlerFn: (req: Request, res: Response, next?: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    handlerFn(req, res, next)
      .then(() => next())
      .catch((error: any) => next(error));

app.get(
  "/api/list",
  handleAsync(async (req: Request, res: Response) => {
    logger.info("Sending JSON response");
    res.json([
      { id: 1, value: "ABC" },
      { id: 2, value: "DEF" },
      { id: 3, value: "GHI" },
    ]);
  })
);

// read a file from GCS and return the file contents as the payload
app.get(
  "/api/gcs/:bucket/:file",
  handleAsync(async (req: Request, res: Response) => {
    const { bucket, file } = req.params;
    const data = await gcs.download(bucket, file);
    res.send(data);
  })
);

// save incoming request data to Firestore
app.post(
  "/api/request",
  handleAsync(async (req: Request, res: Response) => {
    const { path, headers, query, body } = req;
    const data = {
      path,
      headers,
      query,
      body,
    };
    const doc = await firestore.saveDocument("requests", data);
    res.send(doc);
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
