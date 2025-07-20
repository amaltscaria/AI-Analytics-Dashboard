import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const { div: MotionDiv } = motion;
import { Upload, FileText, CheckCircle, AlertTriangle, X, RefreshCw } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api';

const UploadData = () => {
  const { token } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentUploads = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/upload`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 5 }
      });
      setRecentUploads(response.data.uploads || []);
    } catch (error) {
      console.error('Error fetching uploads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentUploads();
  }, [token]);

  const validateJSON = (jsonData) => {
    const errors = [];
    
    if (!jsonData.drone_id?.trim()) errors.push("drone_id is required");
    if (!jsonData.date?.trim()) errors.push("date is required");
    if (!jsonData.location?.trim()) errors.push("location is required");
    if (!Array.isArray(jsonData.violations)) errors.push("violations must be an array");
    
    if (Array.isArray(jsonData.violations) && jsonData.violations.length === 0) {
      errors.push("violations array cannot be empty");
    }
    
    return { isValid: errors.length === 0, errors };
  };

  const handleFileUpload = async (file) => {
    if (!file.name.endsWith('.json')) {
      toast.error('Please upload a JSON file');
      return;
    }

    try {
      setUploading(true);
      const text = await file.text();
      let jsonData;
      
      try {
        jsonData = JSON.parse(text);
      } catch  {
        toast.error('Invalid JSON format');
        return;
      }

      // Validate JSON structure
      const validation = validateJSON(jsonData);
      if (!validation.isValid) {
        toast.error(`Validation failed: ${validation.errors[0]}`);
        return;
      }

      // Upload to backend
      await axios.post(
        `${API_BASE_URL}/upload/json`,
        jsonData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('File uploaded successfully!');
      
      // Refresh the uploads list
      fetchRecentUploads();

    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.error || 'Upload failed';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'processing': return 'text-yellow-400 bg-yellow-500/20';
      case 'pending': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Upload Area */}
      <div className="glass-dark rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">Upload Drone Data</h2>
          <p className="text-gray-400">Upload JSON files containing AI-detected violations</p>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-xl p-12 transition-all ${
            dragActive 
              ? 'border-blue-500 bg-blue-500/10' 
              : 'border-white/30 hover:border-blue-500/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-center">
            {uploading ? (
              <div className="space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-white font-semibold">Processing upload...</p>
                <p className="text-gray-400 text-sm">Validating and storing violation data</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-blue-400 mx-auto" />
                <h3 className="text-white font-semibold">Drop your JSON files here</h3>
                <p className="text-gray-400">or click to browse</p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer"
                >
                  Select Files
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Expected Format */}
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <h4 className="text-white font-medium mb-2">Expected JSON Format:</h4>
          <pre className="text-gray-400 text-sm overflow-x-auto">
{`{
  "drone_id": "DRONE_ZONE_1",
  "date": "2025-07-19",
  "location": "Zone A",
  "violations": [
    {
      "id": "v1",
      "type": "Fire Detected",
      "timestamp": "10:32:14",
      "latitude": 23.74891,
      "longitude": 85.98523,
      "image_url": "https://example.com/image.jpg"
    }
  ]
}`}
          </pre>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="glass-dark rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Uploads</h3>
          <button
            onClick={fetchRecentUploads}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading uploads...</p>
          </div>
        ) : recentUploads.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No uploads yet. Upload your first JSON file above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentUploads.map((upload) => (
              <MotionDiv
                key={upload.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{upload.filename}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{upload.violationsCount} violations</span>
                      <span>•</span>
                      <span>{upload.droneId}</span>
                      <span>•</span>
                      <span>{upload.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(upload.status)}`}>
                    {upload.status}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{formatDate(upload.uploadTime)}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

export default UploadData;