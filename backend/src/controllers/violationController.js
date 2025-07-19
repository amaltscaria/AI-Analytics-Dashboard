import prisma from "../config/prisma.js";

export const getViolations = async (req, res) => {
  try {
    const { droneId, date, type, limit = 50, offset = 0 } = req.query;
    
    // Build filter conditions
    const where = {};
    if (droneId) where.droneId = droneId;
    if (date) where.date = date;
    if (type) where.violationType = type;

    const violations = await prisma.violation.findMany({
      where,
      include: {
        upload: {
          select: { filename: true, createdAt: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const total = await prisma.violation.count({ where });

    res.json({
      violations,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: total > parseInt(offset) + violations.length
      }
    });

  } catch (error) {
    console.error("Get violations error:", error);
    res.status(500).json({ error: "Failed to fetch violations" });
  }
};

export const getViolationStats = async (req, res) => {
  try {
    // Total violations
    const totalViolations = await prisma.violation.count();

    // Violations by type
    const violationsByType = await prisma.violation.groupBy({
      by: ['violationType'],
      _count: { violationType: true }
    });

    // Violations by drone
    const violationsByDrone = await prisma.violation.groupBy({
      by: ['droneId'],
      _count: { droneId: true }
    });

    // Violations by date (last 7 days)
    const violationsByDate = await prisma.violation.groupBy({
      by: ['date'],
      _count: { date: true },
      orderBy: { date: 'desc' },
      take: 7
    });

    res.json({
      totalViolations,
      violationsByType: violationsByType.map(item => ({
        type: item.violationType,
        count: item._count.violationType
      })),
      violationsByDrone: violationsByDrone.map(item => ({
        droneId: item.droneId,
        count: item._count.droneId
      })),
      violationsByDate: violationsByDate.map(item => ({
        date: item.date,
        count: item._count.date
      }))
    });

  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};