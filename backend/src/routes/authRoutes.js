import express from "express";
import { getMe, register } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getMe); 

export default router;
