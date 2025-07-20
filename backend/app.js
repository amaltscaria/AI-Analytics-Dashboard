import express from "express";
import cors from 'cors';
import healthRoutes from "./src/routes/healthRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import violationsRoutes from './src/routes/violationRoutes.js'

const app = express();

// Basic middleware
app.use(express.json());
app.use(cors());

// Health routes
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/violations', violationsRoutes);

export default app;
 