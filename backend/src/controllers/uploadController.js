import prisma from "../config/prisma.js";
import { validateJSONUpload } from "../utils/validation.js";

export const uploadJSON = async (req, res) => {
  try {
    // Get user from JWT middleware (we'll create this)
    const userId = req.userId;
    
    // Validate JSON structure
    const validation = validateJSONUpload(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: "Invalid JSON format",
        details: validation.errors
      });
    }

    const { drone_id, date, location, violations } = req.body;

    // Create upload record
    const upload = await prisma.upload.create({
      data: {
        filename: `drone_${drone_id}_${date}.json`,
        droneId: drone_id,
        date,
        location,
        userId,
        status: "processing"
      }
    });

    // Create violation records
    const violationData = violations.map(violation => ({
      violationId: violation.id,
      droneId: drone_id,
      violationType: violation.type,
      timestamp: violation.timestamp,
      date,
      latitude: violation.latitude,
      longitude: violation.longitude,
      imageUrl: violation.image_url,
      location,
      uploadId: upload.id
    }));

    await prisma.violation.createMany({
      data: violationData
    });

    // Update upload status
    await prisma.upload.update({
      where: { id: upload.id },
      data: { 
        status: "completed",
        processedAt: new Date()
      }
    });

    res.status(201).json({
      message: "JSON uploaded and processed successfully",
      upload: {
        id: upload.id,
        filename: upload.filename,
        violationsCount: violations.length,
        status: "completed"
      }
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload processing failed" });
  }
};

export const getUploads = async (req, res) => {
  try {
    const userId = req.userId; // From JWT middleware
    const { limit = 10, offset = 0 } = req.query;

    const uploads = await prisma.upload.findMany({
      where: { userId },
      include: {
        _count: {
          select: { violations: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const uploadsWithCounts = uploads.map(upload => ({
      id: upload.id,
      filename: upload.filename,
      droneId: upload.droneId,
      date: upload.date,
      location: upload.location,
      status: upload.status,
      violationsCount: upload._count.violations,
      uploadTime: upload.createdAt,
      processedAt: upload.processedAt
    }));

    const total = await prisma.upload.count({ where: { userId } });

    res.json({
      uploads: uploadsWithCounts,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: total > parseInt(offset) + uploads.length
      }
    });

  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
};