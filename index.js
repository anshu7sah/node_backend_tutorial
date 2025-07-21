import express from "express";
import { ApiError } from "./customErrorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnection } from "./util/database.js";
import authRouter from "./router/auth.js";
import cookieSession from "cookie-session";
import categoryRouter from "./router/category.js";
import uploadRouter from "./router/upload.js";
import orderRouter from "./router/order.js";
import webhook from "./router/webhook.js";

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
// app.use(cookieParser("good"));
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// model...schema of database
// view ...to serve the html from the Server
// controller.....method implementation

app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", orderRouter);
app.use("/api", webhook);

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
