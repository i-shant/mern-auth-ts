import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (
    err.name === "CastError" &&
    err instanceof mongoose.Error.CastError &&
    err.kind === "ObjectId"
  ) {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}
