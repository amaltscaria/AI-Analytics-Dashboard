import { motion } from 'framer-motion';
const {div: MotionDiv} = motion;
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import StatsCard from '../ui/StatsCard';
import ViolationsChart from './ViolationsChart';
import RecentViolations from './RecentViolations';

const DashboardOverview = () => {
  // Mock data - replace with real API calls
  const stats = [
    {
      title: 'Total Violations',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Active Drones',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: Shield,
      color: 'blue'
    },
    {
      title: 'Areas Monitored',
      value: '15',
      change: 'No change',
      changeType: 'neutral',
      icon: MapPin,
      color: 'green'
    },
    {
      title: 'Detection Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'purple'
    }
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
              Monitor drone surveillance data and security violations in real-time
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span className="text-sm">Last updated: Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span className="text-sm">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ViolationsChart />
        </MotionDiv>
        
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentViolations />
        </MotionDiv>
      </div>
    </div>
  );
};

export default DashboardOverview;