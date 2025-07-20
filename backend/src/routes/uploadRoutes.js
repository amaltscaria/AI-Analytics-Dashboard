import express from "express";
import { getUploads, uploadJSON } from "../controllers/uploadController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/json", authenticateToken, uploadJSON);
router.get("/", authenticateToken, getUploads); 

export default router;