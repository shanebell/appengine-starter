import { IRouter, Router } from "express";
import apiController from "./apiController";

export const buildRoutes = (): IRouter => {
  const routes = Router();
  routes.use("/", apiController);
  return routes;
};
