import { motion } from "framer-motion";
const { div: MotionDiv } = motion;
import { AlertTriangle, MapPin, Clock, ExternalLink } from "lucide-react";

const RecentViolations = ({ violations = [], onViewAll }) => {
  const getSeverityColor = (type) => {
    // Determine severity based on violation type
    switch (type) {
      case "Fire Detected":
      case "Smoke Detection":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Unauthorized Person":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "No PPE Kit":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSeverityText = (type) => {
    switch (type) {
      case "Fire Detected":
      case "Smoke Detection":
        return "high";
      case "Unauthorized Person":
        return "medium";
      case "No PPE Kit":
        return "low";
      default:
        return "medium";
    }
  };

  // eslint-disable-next-line no-unused-vars
  const getViolationIcon = (type) => {
    return AlertTriangle; // You could customize this per type
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const violationDate = new Date(dateString);
    const diffInHours = Math.floor((now - violationDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Less than 1 hour ago";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  if (violations.length === 0) {
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
        </div>

        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No violations found</p>
          <p className="text-gray-500 text-sm mt-2">
            Upload some drone data to see violations here
          </p>
        </div>
      </MotionDiv>
    );
  }

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
          onClick={onViewAll}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm">View All</span>
          <ExternalLink size={16} />
        </motion.button>
      </div>

      <div className="space-y-4">
        {violations.map((violation, index) => {
          const IconComponent = getViolationIcon(violation.violationType);

          return (
            <MotionDiv
              key={`${violation.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">
                    {violation.violationType}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <MapPin size={12} />
                      <span className="truncate">
                        {violation.location} • {violation.date}{" "}
                        {violation.timestamp}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm mt-1">
                    <Clock size={12} />
                    <span>{formatTimeAgo(violation.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(
                    violation.violationType
                  )}`}
                >
                  {getSeverityText(violation.violationType)}
                </span>
                <span className="text-gray-400 text-xs">
                  {violation.droneId}
                </span>
              </div>
            </MotionDiv>
          );
        })}
      </div>

      {violations.length >= 4 && (
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            Load more violations...
          </button>
        </div>
      )}
    </MotionDiv>
  );
};

export default RecentViolations;
