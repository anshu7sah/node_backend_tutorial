import express from "express";
import { createCategory, getAllCategory } from "../controller/category.js";
import { authGuard } from "../middleware/guard.js";
import { AdminGuard } from "../middleware/AdminGuard.js";

const router = express.Router();

router.post("/category", authGuard, AdminGuard, createCategory);

router.get("/category", getAllCategory);

export default router;
