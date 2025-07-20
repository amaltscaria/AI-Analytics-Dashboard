import { motion } from "framer-motion";
const { div: MotionDiv } = motion;
import { AlertTriangle, MapPin, Clock, ExternalLink } from "lucide-react";

const RecentViolations = () => {
  // Mock data - replace with real API data
  const violations = [
    {
      id: 1,
      type: "Fire Detected",
      location: "Zone A - Sector 3",
      time: "2 hours ago",
      severity: "high",
      drone: "DRONE_ZONE_1",
    },
    {
      id: 2,
      type: "Unauthorized Person",
      location: "Zone B - Entrance",
      time: "4 hours ago",
      severity: "medium",
      drone: "DRONE_ZONE_2",
    },
    {
      id: 3,
      type: "No PPE Kit",
      location: "Zone A - Construction Site",
      time: "6 hours ago",
      severity: "low",
      drone: "DRONE_ZONE_1",
    },
    {
      id: 4,
      type: "Smoke Detection",
      location: "Zone C - Industrial Area",
      time: "8 hours ago",
      severity: "high",
      drone: "DRONE_ZONE_3",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <MotionDiv
      className="glass-dark rounded-2xl p-6 border border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Recent Violations
          </h3>
          <p className="text-gray-400 text-sm">
            Latest security alerts from AI detection
          </p>
        </div>
        <motion.button
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm">View All</span>
          <ExternalLink size={16} />
        </motion.button>
      </div>

      <div className="space-y-4">
        {violations.map((violation, index) => (
          <MotionDiv
            key={violation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">
                  {violation.type}
                </h4>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <MapPin size={12} />
                    <span>{violation.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Clock size={12} />
                    <span>{violation.time}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(
                  violation.severity
                )}`}
              >
                {violation.severity}
              </span>
              <span className="text-gray-400 text-xs">{violation.drone}</span>
            </div>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
};

export default RecentViolations;
