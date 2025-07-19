import express from "express";
import prisma from "./src/config/prisma.js";

const app = express();

// Basic middleware
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Drone Analytics API is running',
    timestamp: new Date().toISOString()
  });
});

// Database test route
app.get('/api/db-test', async (req, res) => {
  try {
    // Simple database query to test connection
    const userCount = await prisma.user.count();
    res.json({
      status: 'Database connected',
      userCount,
      message: 'Prisma connection working'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Database error',
      error: error.message
    });
  }
});

export default app;