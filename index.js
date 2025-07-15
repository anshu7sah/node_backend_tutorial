import express from "express";
import { ApiError } from "./customErrorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnection } from "./util/database.js";
import authRouter from "./router/auth.js";
import cookieSession from "cookie-session";
import categoryRouter from "./router/category.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser("good"));
// app.use(
//   cookieSession({
//     name: "token",
//     path: "/",
//     keys: ["dsvknkvnlk"],
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     maxAge: 60 * 60 * 24 * 30,
//   })
// );

// model...schema of database
// view ...to serve the html from the Server
// controller.....method implementation

app.use("/api", authRouter);
app.use("/api", categoryRouter);

async function startServer() {
  mongoConnection()
    .then(() => {
      console.log("mongodb Connected Successfully");
      app.listen(PORT, () => {
        console.log(`Server started successfully on port: ${PORT}`);
      });
    })
    .catch((e) => new ApiError(e.message, 500));
}
startServer();

app.use((err, req, res, next) => {
  console.log(err.message);
  return res.status(err.statusCode).json({ message: err.message });
});
