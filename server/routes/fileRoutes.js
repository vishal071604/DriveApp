import express from "express";
import upload from "../utils/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadFile, getFiles, deleteFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);
router.get("/", authMiddleware, getFiles);
router.delete("/:id", authMiddleware, deleteFile);

export default router;