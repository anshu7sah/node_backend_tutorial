import { ApiError } from "../customErrorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const authGuard = async (req, res, next) => {
  const token = req.session.jwt;

  if (!token) {
    throw new ApiError("not authorize", 403);
  }
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  if (!verify) {
    throw new ApiError("not authorize", 403);
  }
  const user = await User.findOne({ email: verify.email }, { password: 0 });
  if (!user) {
    // throw new ApiError("not authorize", 403);
    next(new ApiError("not authorize", 403));
  }
  req.user = user;
  next();
};
