import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/db.js";

import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://drive-app-one-zeta.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as Render health checks
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

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