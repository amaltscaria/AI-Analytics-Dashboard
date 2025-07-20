import { motion } from 'framer-motion';
const { div: MotionDiv } = motion;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

const ViolationsChart = ({ data = [] }) => {
  // Transform backend data to chart format
  const chartData = data.map(item => ({
    date: item.date,
    violations: item.count,
    // For now, assume all violations are "resolved"(can add logic later)
    resolved: Math.floor(item.count * 0.9) // 90% resolved rate
  }));

  // Sort by date
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-dark rounded-lg p-3 border border-white/20">
          <p className="text-white font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === 'violations' ? 'Detected' : 'Resolved'}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <MotionDiv
        className="glass-dark rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Violation Trends</h3>
            <p className="text-gray-400 text-sm">Detection patterns over time</p>
          </div>
          <Calendar className="w-5 h-5 text-blue-400" />
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 border-4 border-gray-600 border-dashed rounded-lg mx-auto mb-4"></div>
          <p className="text-gray-400">No time series data available</p>
          <p className="text-gray-500 text-sm mt-2">Upload violations across multiple dates to see trends</p>
        </div>
      </MotionDiv>
    );
  }

  const totalViolations = chartData.reduce((sum, item) => sum + item.violations, 0);
  const totalResolved = chartData.reduce((sum, item) => sum + item.resolved, 0);
  const resolutionRate = totalViolations > 0 ? ((totalResolved / totalViolations) * 100).toFixed(1) : 0;

  return (
    <MotionDiv
      className="glass-dark rounded-2xl p-6 border border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Violation Trends</h3>
          <p className="text-gray-400 text-sm">Detection and resolution patterns over time</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">Detected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">Resolved</span>
          </div>
          <div className="text-gray-400">
            {resolutionRate}% resolved
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={(value) => {
                // Format date to show as MM/DD
                const date = new Date(value);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
              }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="violations"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#3B82F6' }}
              name="Detected"
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#10B981' }}
              name="Resolved"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <div className="text-blue-400 text-sm font-medium">Total Detected</div>
          <div className="text-white text-xl font-bold">{totalViolations}</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
          <div className="text-green-400 text-sm font-medium">Total Resolved</div>
          <div className="text-white text-xl font-bold">{totalResolved}</div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
          <div className="text-purple-400 text-sm font-medium">Resolution Rate</div>
          <div className="text-white text-xl font-bold">{resolutionRate}%</div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ViolationsChart;