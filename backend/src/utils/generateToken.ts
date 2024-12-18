import type { Response } from "express";
import type { PayloadType } from "../types";
import jwt from "jsonwebtoken";

export default function generateToken(res: Response, userId: string) {
  const payload: PayloadType = { userId };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}
