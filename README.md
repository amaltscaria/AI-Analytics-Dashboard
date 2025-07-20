# AI Drone Analytics Dashboard

A comprehensive full-stack web application that simulates an AI-powered drone surveillance system for monitoring security violations across multiple zones. Built with modern technologies and containerized for easy deployment.

## 🚀 Features

### Core Functionality
- **📊 Real-time Dashboard** - Interactive overview with KPIs, charts, and statistics
- **🗺️ Interactive Map View** - Leaflet-based map with violation markers and boundary overlays
- **📋 Comprehensive Data Table** - Sortable, searchable, and filterable violations list
- **📈 Advanced Analytics** - Time series charts and pie charts for violation distribution
- **📤 JSON File Upload** - Drag-and-drop interface for AI report ingestion
- **🔍 Multi-criteria Filtering** - Filter by drone ID, date, and violation type across all views

### Technical Features
- **🔐 JWT Authentication** - Secure user registration and login system
- **📱 Responsive Design** - Mobile-first design with glassmorphism effects
- **⚡ Real-time Updates** - Event-driven data refresh across components
- **🐳 Docker Ready** - Fully containerized for consistent deployment
- **🔒 Data Validation** - Comprehensive input validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for modern styling
- **Framer Motion** for smooth animations
- **Recharts** for interactive data visualizations
- **React Leaflet** for map integration
- **Axios** for API communication

### Backend
- **Node.js 22** with Express.js
- **PostgreSQL** with Prisma ORM
- **JWT** for authentication
- **Comprehensive validation** with custom middleware
- **RESTful API** design

### DevOps
- **Docker & Docker Compose** for containerization
- **Nginx** for production proxy and static file serving
- **Multi-stage builds** for optimized containers

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drone-analytics-dashboard
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000

The application will automatically:
- Set up PostgreSQL database
- Run database migrations
- Build and serve the frontend
- Configure API proxy routing

## 📊 Sample Data

Use these sample JSON files to test the application:

### Sample Upload Format
```json
{
  "drone_id": "DRONE_ZONE_1",
  "date": "2025-07-19",
  "location": "Zone A - Industrial Sector",
  "violations": [
    {
      "id": "v1",
      "type": "Fire Detected",
      "timestamp": "10:32:14",
      "latitude": 23.74891,
      "longitude": 85.98523,
      "image_url": "https://via.placeholder.com/300/ff6b6b/ffffff?text=Fire+Detected"
    }
  ]
}
```

## 🎯 Key Features Demo

### 1. Dashboard Overview
- **KPI Cards**: Total violations, active drones, violation types, detection rates
- **Time Series Chart**: Violation trends over time with detection/resolution rates
- **Pie Chart**: Violation type distribution with interactive tooltips
- **Recent Violations**: Latest security alerts with severity indicators

### 2. Interactive Map
- **Violation Markers**: Color-coded by violation type with custom icons
- **Boundary Polygon**: Static zone overlay for area monitoring
- **Interactive Popups**: Detailed violation information with images
- **Real-time Filtering**: Dynamic marker updates based on filter criteria

### 3. Data Management
- **Advanced Filtering**: Multi-criteria filtering across all views
- **Comprehensive Search**: Full-text search across violation data
- **Data Export**: Export capabilities for reporting
- **Upload Validation**: Real-time JSON validation with detailed error messages

### 4. User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for enhanced interactions
- **Loading States**: Professional loading indicators and skeleton screens
- **Error Handling**: Graceful error handling with user-friendly messages

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Data Upload
- `POST /api/upload/json` - Upload JSON violation data (protected)
- `GET /api/upload` - Get upload history (protected)

### Violations
- `GET /api/violations` - Get violations with filtering (protected)
- `GET /api/violations/stats` - Get aggregated statistics (protected)

### Health Check
- `GET /api/health` - Server health check
- `GET /api/db-test` - Database connection test

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard-specific components
│   ├── layout/        # Layout components
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── contexts/         # React context providers
├── pages/           # Page components
└── utils/           # Utility functions
```

### Backend Architecture
```
backend/src/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── routes/         # API route definitions
├── utils/          # Utility functions
└── app.js          # Express application setup
```

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt with salt rounds
- **Input Validation** on all API endpoints
- **SQL Injection Protection** via Prisma ORM
- **CORS Configuration** for secure cross-origin requests
- **Environment Variable Protection** for sensitive data

## 🚀 Deployment

The application is fully containerized and ready for deployment:

### Development
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

### Production (Docker)
```bash
docker-compose up --build
```

### Environment Variables
The application uses environment-aware configuration:
- **Development**: Direct API calls to localhost:3000
- **Production**: Nginx proxy routing for optimized performance

## 📈 Performance Features

- **Optimized Builds** with Vite's fast bundling
- **Code Splitting** for faster initial load times
- **Image Optimization** with modern formats
- **Database Indexing** for efficient queries
- **Connection Pooling** for database performance
- **Nginx Gzipping** for reduced transfer sizes

## 🎨 Design System

- **Glassmorphism UI** with backdrop blur effects
- **Dark Theme** optimized for long-term usage
- **Consistent Color Palette** with semantic color usage
- **Typography Scale** for hierarchical information
- **Micro-interactions** for enhanced user engagement
- **Responsive Breakpoints** for all device sizes

## 👨‍💻 Development

### Local Development Setup
1. Install dependencies for both frontend and backend
2. Set up local PostgreSQL database
3. Configure environment variables
4. Run development servers

### Database Schema
- **Users**: Authentication and user management
- **Uploads**: File upload tracking and metadata
- **Violations**: Individual violation records with geolocation

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This project follows modern development practices:
- **Git Flow** branching strategy
- **Conventional Commits** for clear history
- **Component-based Architecture** for maintainability
- **TypeScript-ready** structure for future enhancements

---

**Built with ❤️ for modern drone surveillance analytics**