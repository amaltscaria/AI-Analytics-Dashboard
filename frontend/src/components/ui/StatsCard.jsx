import { motion } from 'framer-motion';
const {div: MotionDiv} = motion;
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const StatsCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colors = {
    red: 'from-red-500 to-pink-600',
    blue: 'from-blue-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') return <TrendingUp size={16} className="text-green-400" />;
    if (changeType === 'decrease') return <TrendingDown size={16} className="text-red-400" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-green-400';
    if (changeType === 'decrease') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <MotionDiv
      className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-white text-3xl font-bold mb-2">{value}</p>
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </MotionDiv>
  );
};

export default StatsCard;