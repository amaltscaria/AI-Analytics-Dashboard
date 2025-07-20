import { useState } from 'react';
import { motion } from 'framer-motion';
const { div: MotionDiv } = motion;
import { Filter, X, Calendar, MapPin, AlertTriangle } from 'lucide-react';

const FilterBar = ({ onFiltersChange, availableFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    droneId: '',
    date: '',
    violationType: ''
  });

  const { droneIds = [], dates = [], violationTypes = [] } = availableFilters;

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { droneId: '', date: '', violationType: '' };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-2xl p-6 border border-white/10 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {activeFiltersCount > 0 && (
            <motion.button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-1 text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
              <span className="text-sm">Clear All</span>
            </motion.button>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30"
          >
            <Filter size={16} />
            <span>{isOpen ? 'Hide' : 'Show'} Filters</span>
          </button>
        </div>
      </div>

      <MotionDiv
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen || window.innerWidth >= 1024 ? 'auto' : 0,
          opacity: isOpen || window.innerWidth >= 1024 ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Drone ID Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <MapPin size={16} />
              <span>Drone ID</span>
            </label>
            <select
              value={filters.droneId}
              onChange={(e) => handleFilterChange('droneId', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Drones</option>
              {droneIds.map(droneId => (
                <option key={droneId} value={droneId} className="bg-gray-800">
                  {droneId}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <Calendar size={16} />
              <span>Date</span>
            </label>
            <select
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Dates</option>
              {dates.map(date => (
                <option key={date} value={date} className="bg-gray-800">
                  {date}
                </option>
              ))}
            </select>
          </div>

          {/* Violation Type Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <AlertTriangle size={16} />
              <span>Violation Type</span>
            </label>
            <select
              value={filters.violationType}
              onChange={(e) => handleFilterChange('violationType', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {violationTypes.map(type => (
                <option key={type} value={type} className="bg-gray-800">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {filters.droneId && (
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  <MapPin size={12} />
                  <span>{filters.droneId}</span>
                  <button
                    onClick={() => handleFilterChange('droneId', '')}
                    className="hover:text-blue-300"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.date && (
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  <Calendar size={12} />
                  <span>{filters.date}</span>
                  <button
                    onClick={() => handleFilterChange('date', '')}
                    className="hover:text-green-300"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {filters.violationType && (
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  <AlertTriangle size={12} />
                  <span>{filters.violationType}</span>
                  <button
                    onClick={() => handleFilterChange('violationType', '')}
                    className="hover:text-purple-300"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </MotionDiv>
    </MotionDiv>
  );
};

export default FilterBar;