import multer from "multer";

import { storage } from "../helper/cloudinary.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const filename = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, filename);
//   },
// });

// const storage=multer.memoryStorage();

const upload = multer({ storage });

export default upload;
