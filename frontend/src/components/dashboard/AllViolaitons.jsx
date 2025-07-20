import { useState, useMemo } from "react";
import { motion } from "framer-motion";
const { div: MotionDiv } = motion;
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  AlertTriangle,
  MapPin,
  Clock,
  Camera,
} from "lucide-react";
import { useFilteredViolations } from "../../hooks/useFilteredViolations";
import FilterBar from "./FilterBar";

const AllViolations = () => {
  const { violations, loading, error, setFilters, availableFilters } =
    useFilteredViolations();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search and sort violations
  const processedViolations = useMemo(() => {
    let filtered = violations;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (violation) =>
          violation.violationType
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          violation.droneId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          violation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          violation.violationId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [violations, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(processedViolations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedViolations = processedViolations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const getSeverityColor = (type) => {
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

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="glass-dark rounded-2xl p-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading violations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-dark rounded-2xl p-6 border border-red-500/30">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">
            Failed to Load Violations
          </h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-dark rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              All Violations
            </h2>
            <p className="text-gray-400">
              Complete list of detected security violations
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-gray-400 text-sm">
              {processedViolations.length} of {violations.length} violations
            </span>
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span>Export</span>
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search violations by type, drone ID, location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onFiltersChange={handleFiltersChange}
        availableFilters={availableFilters}
      />

      {/* Table */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-dark rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort("violationType")}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>Type</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort("droneId")}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>Drone</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort("location")}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>Location</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort("date")}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>Date & Time</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <span className="text-gray-300">Coordinates</span>
                </th>
                <th className="text-left p-4">
                  <span className="text-gray-300">Severity</span>
                </th>
                <th className="text-left p-4">
                  <span className="text-gray-300">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedViolations.map((violation, index) => (
                <tr
                  key={`${violation.id}-${index}`}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4">
                    <MotionDiv
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-white font-medium">
                        {violation.violationType}
                      </span>
                    </MotionDiv>
                  </td>
                  <td className="p-4">
                    <MotionDiv
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <span className="text-blue-400 font-mono text-sm">
                        {violation.droneId}
                      </span>
                    </MotionDiv>
                  </td>
                  <td className="p-4">
                    <MotionDiv
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                      className="flex items-center space-x-2"
                    >
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-gray-300">
                        {violation.location}
                      </span>
                    </MotionDiv>
                  </td>
                  <td className="p-4">
                    <MotionDiv
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                      className="flex items-center space-x-2"
                    >
                      <Clock size={14} className="text-gray-400" />
                      <div>
                        <div className="text-white text-sm">
                          {violation.date} {violation.timestamp}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {formatDateTime(violation.createdAt)}
                        </div>
                      </div>
                    </MotionDiv>
                  </td>
                  <td className="p-4">
                    <MotionDiv
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.4 }}
                      className="text-gray-300 text-sm font-mono"
                    >
                      <div>{violation.latitude.toFixed(5)}</div>
                      <div>{violation.longitude.toFixed(5)}</div>
                    </MotionDiv>
                  </td>
                  <td className="p-4">
                    <MotionDiv
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.5 }}
                    >
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(
                          violation.violationType
                        )}`}
                      >
                        {violation.violationType.includes("Fire") ||
                        violation.violationType.includes("Smoke")
                          ? "High"
                          : violation.violationType.includes("Unauthorized")
                          ? "Medium"
                          : "Low"}
                      </span>
                    </MotionDiv>
                  </td>
                  <td className="p-4">
                    <MotionDiv
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.6 }}
                      className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <motion.button
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={16} />
                      </motion.button>
                      {violation.imageUrl && (
                        <motion.button
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Camera size={16} />
                        </motion.button>
                      )}
                    </MotionDiv>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between p-4 border-t border-white/10"
        >
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, processedViolations.length)}{" "}
              of {processedViolations.length}
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white/5 border border-white/20 rounded px-3 py-1 text-white text-sm"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === 1 ? 1 : 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <span className="text-white px-3 py-1 bg-blue-500/20 rounded">
              {currentPage} of {totalPages}
            </span>

            <motion.button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: currentPage === totalPages ? 1 : 1.1 }}
              whileTap={{ scale: currentPage === totalPages ? 1 : 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
};

export default AllViolations;
