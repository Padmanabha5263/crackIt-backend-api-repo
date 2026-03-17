// middle ware to check all the request is authenticated or not
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../util/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: string = req.get("Authorization");
    const token: string = authHeader.split(" ")[1];
    if (!token) {
      throw new AppError("Token not provided", 401);
    }

    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
    ) as JwtPayload;
    if (!decodeToken) {
      throw new AppError("Invalid token", 401);
    }
   (req as any).user = decodeToken;
    next();
  } 
  catch (error) {
    next(error);
  }
};
