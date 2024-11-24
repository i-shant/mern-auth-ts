import type { NextFunction, Response } from "express";
import type { IRequestWithUser, IUser, PayloadType } from "../types";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/User";

export const protect = asyncHandler(
  async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt as string;

    if (token) {
      try {
        const { userId } = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as PayloadType;
        req.user = (await User.findById(userId).select("-password")) as IUser;
        next();
      } catch (err) {
        console.error(err);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
