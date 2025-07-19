import express from "express";
import healthRoutes from "./src/routes/healthRoutes.js";

const app = express();

// Basic middleware
app.use(express.json());

// Health routes
app.use("/api", healthRoutes);

export default app;
