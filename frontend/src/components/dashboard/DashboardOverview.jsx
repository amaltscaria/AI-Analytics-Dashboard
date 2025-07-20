import { motion } from "framer-motion";
const { div: MotionDiv } = motion;
import {
  TrendingUp,
  AlertTriangle,
  Shield,
  MapPin,
  Calendar,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useFilteredViolations } from "../../hooks/useFilteredViolations";
import StatsCard from "../ui/StatsCard";
import ViolationTypesPieChart from "./ViolationTypesPieChart";
import ViolationsChart from "./ViolationsChart";
import RecentViolations from "./RecentViolations";
import FilterBar from "./FilterBar";
import toast from "react-hot-toast";

const DashboardOverview = ({ setActiveTab }) => {
  const {
    violations,
    stats,
    loading,
    error,
    filters,
    setFilters,
    availableFilters,
    refreshData,
  } = useFilteredViolations();

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    refreshData();
    toast.success("Dashboard refreshed!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="glass-dark rounded-2xl p-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-dark rounded-2xl p-6 border border-red-500/30">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Failed to Load Data</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
console.log(stats)
  // Calculate stats from filtered data
  const totalViolations = stats?.totalViolations || 0;
  const violationsByType = stats?.violationsByType || [];
  const violationsByDrone = stats?.violationsByDrone || [];
  const violationsByDate = stats?.violationsByDate || [];
  console.log(violationsByDate)

  const statsCards = [
    {
      title: "Total Violations",
      value: totalViolations.toLocaleString(),
      change:
        totalViolations > 0 ? `${totalViolations} found` : "No violations",
      changeType: totalViolations > 0 ? "increase" : "neutral",
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "Active Drones",
      value: violationsByDrone.length.toString(),
      change:
        violationsByDrone.length > 0
          ? `${violationsByDrone.length} active`
          : "No drones",
      changeType: violationsByDrone.length > 0 ? "increase" : "neutral",
      icon: Shield,
      color: "blue",
    },
    {
      title: "Violation Types",
      value: violationsByType.length.toString(),
      change: violationsByType.length > 0 ? "Multiple types" : "No types",
      changeType: violationsByType.length > 0 ? "increase" : "neutral",
      icon: MapPin,
      color: "green",
    },
    {
      title: "Detection Rate",
      value: totalViolations > 0 ? "100%" : "0%",
      change: totalViolations > 0 ? "All detected" : "No data",
      changeType: totalViolations > 0 ? "increase" : "neutral",
      icon: TrendingUp,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back to your AI Analytics Dashboard
            </h2>
            <p className="text-gray-400">
              Monitor drone surveillance data and security violations in
              real-time
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all"
            >
              <RefreshCw size={16} />
              <span className="hidden md:inline">Refresh</span>
            </button>
            <div className="hidden md:flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span className="text-sm">Last updated: Now</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span className="text-sm">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* Filter Bar */}
      <FilterBar
        onFiltersChange={handleFiltersChange}
        availableFilters={availableFilters}
      />

      {/* Results Summary */}
      {(filters.droneId || filters.date || filters.violationType) && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-dark rounded-xl p-4 border border-blue-500/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                Showing {totalViolations} violation
                {totalViolations !== 1 ? "s" : ""}
                {filters.droneId && ` from ${filters.droneId}`}
                {filters.date && ` on ${filters.date}`}
                {filters.violationType && ` of type "${filters.violationType}"`}
              </span>
            </div>
            <button
              onClick={() =>
                setFilters({ droneId: "", date: "", violationType: "" })
              }
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </MotionDiv>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <MotionDiv
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </MotionDiv>
        ))}
      </div>

      {/* Charts Section */}

      <div className="space-y-6">
        {/* Top row - Line chart and pie chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ViolationTypesPieChart data={violationsByType} />
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ViolationsChart data={violationsByDate} />
          </MotionDiv>
        </div>

        {/* Bottom row - Recent violations full width */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RecentViolations
            violations={violations.slice(0, 4)}
            onViewAll={() => setActiveTab("violations")}
          />
        </MotionDiv>
      </div>
    </div>
  );
};

export default DashboardOverview;
