import "dotenv/config";
import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/error";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});
