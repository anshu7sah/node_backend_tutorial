import express from "express";
import upload from "../middleware/multer.js";
import { ApiError } from "../customErrorHandler.js";

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  console.log("router is working fine");
  try {
    return res.status(201).json({
      message: "Image upload successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.log("uploading error");
    throw new ApiError("failed to upload image", 500);
  }
});

export default router;
