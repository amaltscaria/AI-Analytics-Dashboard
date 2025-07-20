import { motion } from 'framer-motion';
const { div: MotionDiv } = motion;
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const ViolationTypesPieChart = ({ data = [] }) => {
  // Color scheme for different violation types
  const COLORS = {
    'Fire Detected': '#ef4444',
    'Unauthorized Person': '#f59e0b', 
    'No PPE Kit': '#3b82f6',
    'Smoke Detection': '#8b5cf6',
    'Equipment Malfunction': '#10b981',
    'Restricted Area': '#f97316'
  };

  // Transform data for recharts
  const chartData = data.map(item => ({
    name: item.type,
    value: item.count,
    color: COLORS[item.type] || '#6b7280'
  }));

  const totalViolations = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalViolations) * 100).toFixed(1);
      
      return (
        <div className="glass-dark rounded-lg p-3 border border-white/20">
          <p className="text-white font-medium">{data.name}</p>
          <p style={{ color: data.payload.color }}>
            Count: {data.value}
          </p>
          <p className="text-gray-400 text-sm">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300 text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
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
            <h3 className="text-lg font-semibold text-white">Violation Types</h3>
            <p className="text-gray-400 text-sm">Distribution by violation category</p>
          </div>
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 border-4 border-gray-600 border-dashed rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">No violation data available</p>
          <p className="text-gray-500 text-sm mt-2">Upload drone data to see distribution</p>
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
          <h3 className="text-lg font-semibold text-white">Violation Types</h3>
          <p className="text-gray-400 text-sm">Distribution by violation category</p>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold">{totalViolations}</p>
          <p className="text-gray-400 text-sm">Total Violations</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed breakdown */}
      <div className="mt-6 space-y-3">
        {chartData.map((item, index) => {
          const percentage = ((item.value / totalViolations) * 100).toFixed(1);
          
          return (
            <MotionDiv
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-white font-semibold">{item.value}</span>
                <span className="text-gray-400 text-sm ml-2">({percentage}%)</span>
              </div>
            </MotionDiv>
          );
        })}
      </div>
    </MotionDiv>
  );
};

export default ViolationTypesPieChart;