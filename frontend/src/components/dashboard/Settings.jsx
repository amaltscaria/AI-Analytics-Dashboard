import { motion } from 'framer-motion';
const {div: MotionDiv} = motion;
import { User, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glass-dark rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>
        
        <div className="space-y-6">
          {[
            { icon: User, title: 'Profile Settings', desc: 'Manage your account information' },
            { icon: Bell, title: 'Notifications', desc: 'Configure alert preferences' },
            { icon: Shield, title: 'Security', desc: 'Password and authentication settings' },
            { icon: Palette, title: 'Appearance', desc: 'Theme and display options' },
          ].map((setting, index) => (
            <MotionDiv
              key={setting.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <setting.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{setting.title}</h3>
                  <p className="text-gray-400 text-sm">{setting.desc}</p>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
};

export default Settings;