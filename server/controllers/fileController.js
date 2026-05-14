import imagekit from "../config/imagekit.js";
import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // upload to ImageKit
    const result = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: file.originalname,
    });
    
    // save to DB
    const newFile = await File.create({
      userId: req.user.id, // from auth middleware (next step)
      fileName: file.originalname,
      fileUrl: result.url,
      fileType: file.mimetype,
      size: file.size,
    });

    res.status(201).json({
      message: "File uploaded",
      file: newFile,
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET FILES
export const getFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id }).sort({
      createdAt: -1,
    }); // latest first

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE FILE
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // check ownership
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await file.deleteOne();

    res.json({ message: "File deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
