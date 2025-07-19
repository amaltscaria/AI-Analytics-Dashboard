import express from "express";
import {
  dbConnectionTest,
  healthCheck,
} from "../controllers/healthController.js";

const router = express.Router();

router.get("/health", healthCheck);
router.get("/db-test", dbConnectionTest);

export default router;
