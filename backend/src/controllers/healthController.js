import prisma from "../config/prisma.js";

export const healthCheck = async (req, res) => {
  res.json({
    status: "OK",
    message: "Drone Analytics API is running",
    timestamp: new Date().toISOString(),
  });
};

export const dbConnectionTest = async (req, res) => {
  try {
    // Simple database query to test connection
    const userCount = await prisma.user.count();
    res.json({
      status: "Database connected",
      userCount,
      message: "Prisma connection working",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Database error",
      error: error.message,
    });
  }
};
