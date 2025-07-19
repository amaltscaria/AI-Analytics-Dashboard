import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateLogin, validateRegistration } from "../utils/validation";
import prisma from "../config/prisma";
import { generateToken } from "../utils/auth";

export const register = async (req, res) => {
  try {
    // Validate input
    const validation = validateRegistration(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validation.errors,
      });
    }

    const { username, email, password } = req.body;
    // check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.trim().toLowerCase() },
          { username: username.trim() },
        ],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error:
          existingUser.email === email.trim.toLowerCase()
            ? "Email already registered"
            : "Username already taken",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (err) {
    console.log("Registeration error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    //validate input
    const validation = validateLogin(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validation.errors,
      });
    }
    const { email, password } = req.body;

    // Find user

    const user = await prisma.user.findFirst({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // checkPassword
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const token = generateToken(id);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: "Login successfull",
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    console.log("Login error", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
