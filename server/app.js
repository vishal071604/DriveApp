import "dotenv/config";
import express from "express";
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"; //apis
import fileRoutes from "./routes/fileRoutes.js";
import cors from "cors"; // connect for frontend and backend

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json()); // JSON
app.use(cookieParser()); 

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

// route
app.get("/", (req, res) => {
  res.json({ message: "Server running 🚀" });
});

// DB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});