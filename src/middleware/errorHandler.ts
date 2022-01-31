import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { NotFoundError } from "../error/errors";

class ApiError {
  constructor(public code: string, public message: string, public path?: string) {}
}

const sendError = (res: Response, statusCode: number, ...errors: ApiError[]) => {
  res.status(statusCode).json({ errors });
};

const handleError: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof NotFoundError) {
    return sendError(res, 404, new ApiError("not_found", err.message));
  }

  return sendError(res, 500, new ApiError("unknown", "An unexpected error has occurred"));
};

export { handleError };
