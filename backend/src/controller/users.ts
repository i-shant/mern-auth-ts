import type { Response } from "express";
import type { IRequestWithUser } from "../types";
import asyncHandler from "express-async-handler";
import User from "../model/User";

// @desc    Get user
// @route   GET /api/users
// @access  Private
export const getUser = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const user = await User.findById(req.user);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);
