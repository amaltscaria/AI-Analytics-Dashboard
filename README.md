# AI Drone Analytics Dashboard

Full-stack web application for monitoring and analyzing drone safety violations with real-time updates.

## Project Overview

This dashboard processes daily JSON reports from drones monitoring safety violations (fires, unauthorized personnel, missing PPE) and provides interactive analytics through maps, charts, and real-time updates.

## Features

### Core Features
- **File Upload**: Drag & drop JSON violation data with validation
- **Dashboard**: Real-time KPI cards and interactive charts
- **Map Visualization**: Leaflet map with violation markers and popups
- **Data Table**: Sortable, filterable violation list with pagination
- **Advanced Filtering**: Filter by drone ID, date range, violation type

### Bonus Features
- **Authentication**: JWT-based secure login system
- **Real-time Updates**: WebSocket live data streaming
- **Global Search**: Search across all violation fields
- **Export**: CSV and PDF export functionality
- **Theme Toggle**: Dark/light mode with persistence
- **Mobile Responsive**: Optimized for all devices

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Leaflet.js
- **Backend**: Node.js, Express, Prisma ORM, Socket.io
- **Database**: PostgreSQL, Redis
- **Deployment**: Docker, Docker Compose, Nginx

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

### Development Setup
```bash
# Clone repository
git clone <repository-url>
cd drone-analytics-dashboard

# Start databases only
docker-compose up postgres redis -d

# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Production Deployment
```bash
docker-compose up --build
```

Access the application at `http://localhost:3000`

## Sample Data Format

```json
{
  "drone_id": "DRONE_ZONE_1",
  "date": "2025-07-10",
  "location": "Zone A",
  "violations": [
    {
      "id": "v1",
      "type": "Fire Detected",
      "timestamp": "10:32:14",
      "latitude": 23.74891,
      "longitude": 85.98523,
      "image_url": "https://via.placeholder.com/150"
    }
  ]
}
```

## Development Progress

- [x] Project setup and planning
- [ ] Authentication system
- [ ] File upload and validation
- [ ] Dashboard with KPIs and charts
- [ ] Map integration
- [ ] Real-time updates
- [ ] Export functionality
- [ ] Docker deployment

## Demo

Demo video will be available upon completion.

## Documentation

- [Project Plan](PROJECT_PLAN.md)
- API Documentation (coming soon)
