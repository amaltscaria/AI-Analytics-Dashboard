import express from "express";
import { uploadJSON } from "../controllers/uploadController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/json", authenticateToken, uploadJSON);

export default router;