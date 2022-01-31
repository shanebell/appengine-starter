import { NextFunction, Request, Response } from "express";

const handleAsync = (handlerFn: (req: Request, res: Response, next?: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return handlerFn(req, res, next).catch(next);
  };
};

export { handleAsync };
