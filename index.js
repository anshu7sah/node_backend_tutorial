import express from "express";
import { ApiError } from "./customErrorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnection } from "./util/database.js";
import authRouter from "./router/auth.js";
import cookieSession from "cookie-session";
import categoryRouter from "./router/category.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["skjvbkjdsvkjsdkvj"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// const allowed = [
//   "https://meet.google.com",
//   "google.com",
//   "https://monkeytype.com",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowed.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new ApiError("Not allowed by CORS", 400));
//       }
//     },
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
  return res.status(err.statusCode).json({ message: err.message });
});
