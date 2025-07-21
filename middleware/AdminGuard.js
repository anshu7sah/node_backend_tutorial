import { ApiError } from "../customErrorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const AdminGuard = async (req, res, next) => {
  const user = req.user;
  if (!user && user.role !== "admin") {
    // throw new ApiError("not authorize", 403);
    next(new ApiError("not authorize", 403));
  }
  next();
};
