import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =========================
// SIGNUP
// =========================

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// LOGIN
// =========================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Detect production environment
    const isProduction =
      process.env.NODE_ENV === "production";

    // Store token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction
          ? "none"
          : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login success",
      });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// LOGOUT
// =========================

export const logout = async (req, res) => {
  try {
    const isProduction =
      process.env.NODE_ENV === "production";

    res
      .clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction
          ? "none"
          : "lax",
      })
      .status(200)
      .json({
        message: "Logged out successfully",
      });

  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};