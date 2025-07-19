import express from "express";

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

export default app;