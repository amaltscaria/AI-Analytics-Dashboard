import { motion } from "framer-motion";
const { div: MotionDiv } = motion;
import { Filter, Layers, Download, RotateCcw } from "lucide-react";
import { useFilteredViolations } from "../../hooks/useFilteredViolations";
import ViolationMap from "./ViolationMap";
import FilterBar from "./FilterBar";

const MapView = () => {
  const { violations, stats, loading, filters, setFilters, availableFilters } =
    useFilteredViolations();

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="glass-dark rounded-2xl p-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading map data...</p>
        </div>
      </div>
    );
  }

  // Count violations by type for the quick stats
  const violationCounts =
    stats?.violationsByType.reduce((acc, item) => {
      acc[item.type] = item.count;
      return acc;
    }, {}) || {};

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Map Controls */}
      <div className="glass-dark rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Real-time Surveillance Map
            </h2>
            <p className="text-gray-400">
              Interactive map showing AI-detected violations across monitored
              zones
            </p>
          </div>

          <div className="flex space-x-3">
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers size={16} />
              <span>Layers</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span>Export</span>
            </motion.button>

            <motion.button
              onClick={() =>
                setFilters({ droneId: "", date: "", violationType: "" })
              }
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-500/30 hover:bg-gray-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </motion.button>
          </div>
        </div>

        {/* Quick Stats - Dynamic based on filtered data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-400 font-medium">Fire Detected</span>
            </div>
            <p className="text-white text-2xl font-bold mt-2">
              {violationCounts["Fire Detected"] || 0}
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-400 font-medium">Unauthorized</span>
            </div>
            <p className="text-white text-2xl font-bold mt-2">
              {violationCounts["Unauthorized Person"] || 0}
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-400 font-medium">No PPE</span>
            </div>
            <p className="text-white text-2xl font-bold mt-2">
              {violationCounts["No PPE Kit"] || 0}
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-400 font-medium">Smoke</span>
            </div>
            <p className="text-white text-2xl font-bold mt-2">
              {violationCounts["Smoke Detection"] || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onFiltersChange={handleFiltersChange}
        availableFilters={availableFilters}
      />

      {/* Map Component with Real Data */}
      <ViolationMap violations={violations} filters={filters} />
    </MotionDiv>
  );
};

export default MapView;
