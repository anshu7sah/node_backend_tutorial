import express from "express";
import { ApiError } from "./customErrorHandler.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("intermediate");
  next();
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  if (email) {
    throw new ApiError("Email already exist", 401);
  }
  console.log(username);
  console.log(email);
  console.log(password);
  res.status(201).send("register successfully");
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("listening on port 3000 express");
});
