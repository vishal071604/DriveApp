import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./database/db.js";

import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

// Home
app.get("/", (req, res) => {
    res.json({
        message: "Server running"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});