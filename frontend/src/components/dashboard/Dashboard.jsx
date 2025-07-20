import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import MapView from '../components/dashboard/MapView';
import UploadData from '../components/dashboard/UploadData';
import Settings from '../components/dashboard/Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'map':
        return <MapView />;
      case 'upload':
        return <UploadData />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;