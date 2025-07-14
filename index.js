import express from "express";
import { ApiError } from "./customErrorHandler.js";
import cors from "cors";

const app = express();

const allowed = ["https://meet.google.com", "google.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new ApiError("Not allowed by CORS", 400));
      }
    },
  })
);
app.use(express.json());

// model...schema of database
// view ...to serve the html from the Server
// controller.....method implementation

app.use((req, res, next) => {
  console.log("intermediate");
  next();
});

app.get("/login", (req, res) => {
  res.json({ message: "you are good" });
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
