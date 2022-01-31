import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "../logger";

const logRequest = (): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export { logRequest };
