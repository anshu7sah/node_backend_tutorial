import { ApiError } from "../customErrorHandler.js";
import { User } from "../model/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { username, email, password, age } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return new ApiError("Email already exist", 401);
  }
  console.log("users");
  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name: username,
    email,
    password: hashpassword,
    age,
  });

  return res.status(201).json({ message: "User registered successfully" });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return new ApiError("Credentials do not match", 401);
  }

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return new ApiError("Credentials do not match", 401);
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  req.session = {
    ...req.session,
    jwt: token,
  };
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //   maxAge: 24 * 60 * 60 * 1000,
  // });

  return res.status(201).json({ message: "login successfully" });
};

export const logoutController = (req, res) => {
  req.session = null;
  return res.status(200).json({ message: "logout successfully" });
};

export const profileController = (req, res) => {
  return res.status(200).json({ data: req.user });
};
