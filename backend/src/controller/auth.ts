import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../model/User";
import generateToken from "../utils/generateToken";

// @desc    Auth user & get token
// @route   POST /api/auth
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const user = await User.findOne({ email }).exec();

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user.id);

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user and clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    res.sendStatus(204); //No content
    return;
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  //   res.cookie("jwt", "", {
  //     httpOnly: true,
  //     expires: new Date(0),
  //   });
  res.status(200).json({
    message: "Logged out successfully",
  });
};
