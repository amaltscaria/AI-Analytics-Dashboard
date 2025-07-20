import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { motion } from "framer-motion";
const { div: MotionDiv } = motion;
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import L from "leaflet";
// eslint-disable-next-line no-unused-vars
const ViolationMap = ({ violations = [], filters }) => {
  // Use real data if available, otherwise fall back to mock
  const mockViolations = [
    {
      id: 1,
      type: "Fire Detected",
      latitude: 23.74891,
      longitude: 85.98523,
      timestamp: "10:32:14",
      date: "2025-07-19",
      droneId: "DRONE_ZONE_1",
      location: "Zone A - Sector 3",
      imageUrl: "https://via.placeholder.com/150/ff6b6b/ffffff?text=Fire",
    },
    {
      id: 2,
      type: "Unauthorized Person",
      latitude: 23.74901,
      longitude: 85.98621,
      timestamp: "10:45:51",
      date: "2025-07-19",
      droneId: "DRONE_ZONE_2",
      location: "Zone B - Entrance",
      imageUrl: "https://via.placeholder.com/150/4ecdc4/ffffff?text=Person",
    },
    {
      id: 3,
      type: "No PPE Kit",
      latitude: 23.74921,
      longitude: 85.98472,
      timestamp: "10:58:42",
      date: "2025-07-19",
      droneId: "DRONE_ZONE_1",
      location: "Zone A - Construction",
      imageUrl: "https://via.placeholder.com/150/ffe66d/ffffff?text=PPE",
    },
    {
      id: 4,
      type: "Smoke Detection",
      latitude: 23.74875,
      longitude: 85.9859,
      timestamp: "11:15:20",
      date: "2025-07-19",
      droneId: "DRONE_ZONE_3",
      location: "Zone C - Industrial",
      imageUrl: "https://via.placeholder.com/150/a8e6cf/ffffff?text=Smoke",
    },
  ];

  const displayViolations = violations.length > 0 ? violations : mockViolations;

  // Mock boundary polygon (replace with real GeoJSON)
  const boundaryPolygon = [
    [23.7489, 85.9852],
    [23.751, 85.989],
    [23.7495, 85.991],
    [23.747, 85.9875],
    [23.7489, 85.9852],
  ];

  const getMarkerColor = (type) => {
    switch (type) {
      case "Fire Detected":
        return "#ef4444";
      case "Unauthorized Person":
        return "#f59e0b";
      case "No PPE Kit":
        return "#3b82f6";
      case "Smoke Detection":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const createCustomIcon = (type) => {
    const color = getMarkerColor(type);
    return new L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-2xl overflow-hidden border border-white/10"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Violation Map
            </h3>
            <p className="text-gray-400 text-sm">
              Real-time drone surveillance coverage
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-400">Fire</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-400">Person</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">PPE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400">Smoke</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-96 relative">
        <MapContainer
          center={[23.7489, 85.9852]}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Boundary Polygon */}
          <Polygon
            positions={boundaryPolygon}
            pathOptions={{
              fillColor: "#3b82f6",
              fillOpacity: 0.1,
              color: "#3b82f6",
              weight: 2,
              opacity: 0.8,
              dashArray: "5, 5",
            }}
          />

          {/* Violation Markers */}
          {displayViolations.map((violation) => (
            <Marker
              key={violation.id}
              position={[violation.latitude, violation.longitude]}
              icon={createCustomIcon(violation.violationType || violation.type)}
            >
              <Popup className="custom-popup">
                <div className="p-0 max-w-xs">
                  <div className="flex items-start space-x-3">
                    <img
                      src={violation.imageUrl}
                      alt={violation.type}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle
                          size={16}
                          style={{ color: getMarkerColor(violation.type) }}
                        />
                        <h4 className="font-semibold text-gray-900 truncate">
                          {violation.type}
                        </h4>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span className="truncate">{violation.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>
                            {violation.timestamp} • {violation.date}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Drone: {violation.droneId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </MotionDiv>
  );
};

export default ViolationMap;
