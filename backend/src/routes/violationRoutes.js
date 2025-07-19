import express from "express";
import { getViolations, getViolationStats } from "../controllers/violationsController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getViolations);
router.get("/stats", authenticateToken, getViolationStats);

export default router;