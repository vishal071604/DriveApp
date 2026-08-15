import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Server running 🚀",
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});