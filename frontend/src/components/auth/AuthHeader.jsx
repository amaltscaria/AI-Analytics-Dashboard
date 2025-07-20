import { Drone, Shield } from 'lucide-react';
import {motion} from 'framer-motion';
const { div: MotionDiv } = motion;

const AuthHeader = ({ isLogin }) => {
  return (
    <div className="text-center mb-8">
      <MotionDiv 
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Drone className="w-8 h-8 text-white" />
      </MotionDiv>
      <h1 className="text-2xl font-bold text-white mb-2">
        AI Drone Analytics
      </h1>
      <p className="text-gray-400">
        {isLogin ? 'Welcome back to your dashboard' : 'Create your analytics account'}
      </p>
    </div>
  );
};

export default AuthHeader;