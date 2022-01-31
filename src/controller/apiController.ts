import { handleAsync } from "../middleware/handleAsync";
import { Request, Response, Router } from "express";
import logger from "../logger";
import { saveEntity } from "../datastore";
import * as gcs from "../gcs";

const apiController = Router();

apiController.get(
  "/list",
  handleAsync(async (req: Request, res: Response) => {
    logger.info("Sending JSON response");
    res.json([
      { id: 1, value: "ABC" },
      { id: 2, value: "DEF" },
      { id: 3, value: "GHI" },
    ]);
  })
);

// save incoming request data to Datastore
apiController.post(
  "/request",
  handleAsync(async (req: Request, res: Response) => {
    const { path, headers, query, body } = req;
    const data = {
      path,
      headers,
      query,
      body,
    };
    const doc = await saveEntity("requests", data);
    res.send(doc);
  })
);

// read a file from GCS and return the file contents as the payload
apiController.get(
  "/:bucket/:file",
  handleAsync(async (req: Request, res: Response) => {
    const { bucket, file } = req.params;
    const data = await gcs.download(bucket, file);
    console.log("data: %o", data);
    res.send(data);
  })
);

export default apiController;
