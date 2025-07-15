import express from "express";
import {
  loginController,
  logoutController,
  profileController,
  registerController,
} from "../controller/auth.js";
import { authGuard } from "../middleware/guard.js";

const router = new express.Router();

router.post("/login", loginController);

router.post("/register", registerController);
router.get("/profile", authGuard, profileController);

router.get("/logout", logoutController);

export default router;
