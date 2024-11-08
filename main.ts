import { Application, Request, Response, NextFunction } from "express";
import { mainError } from "./error/mainError";
import { handleError } from "./error/handleError";
import { HTTP } from "./utils/enums";

import user from "./router/userRouter";
import property from "./router/propertyRouter";
import client from "./router/clientRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api", user);
    app.use("/api", property);
    app.use("/api", client);

    app.get("/", (req: Request, res: Response): any => {
      try {
        return res.status(200).json({
          message: "Welcome to IndoBai API v1",
        });
      } catch (error) {
        res.status(404).json({
          message: "Error loading",
        });
      }
    });

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainError({
          name: `Route Error`,
          message: `Route Error: because the page, ${req.originalUrl} doesn't exist`,
          status: HTTP.BAD_REQUEST,
          success: false,
        })
      );
    });
    app.use(handleError);
  } catch (error) {
    return error;
  }
};
