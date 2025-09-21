# OMR Evaluation Platform By Epic Bytes

A comprehensive system for processing and evaluating Optical Mark Recognition (OMR) sheets with high accuracy and scalability.

## 🏗️ System Architecture

### Core Components
- **Backend API**: FastAPI-based REST API for image processing and scoring
- **ML Pipeline**: CNN-based bubble classification with OpenCV preprocessing
- **Frontend Dashboard**: React-based web interface for uploads and results
- **Database**: PostgreSQL for data persistence and audit trails
- **Reporting**: PDF generation and analytics dashboard

### Scalability Features
- Horizontal scaling with load balancers
- Redis caching for template data
- Queue-based processing for high-volume uploads
- CDN for static assets and processed images

## 📁 Project Structure

```
omr-platform/
├── backend/                 # FastAPI backend
├── frontend/               # React frontend
├── ml_models/              # CNN models and training
├── database/               # Database schemas and migrations
├── docs/                   # Documentation
├── tests/                  # Test suites
└── docker/                 # Docker configurations
```

## 🚀 Quick Start

1. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Database Setup**:
   ```bash
   docker-compose up -d postgres redis
   ```

## 📊 Performance Targets

- **Throughput**: 3000+ sheets per exam day
- **Accuracy**: <0.5% error tolerance
- **Response Time**: <2s per sheet processing
- **Availability**: 99.9% uptime

## 🔧 Key Features

- Mobile camera support with lighting correction
- Multiple template version support
- Human-in-the-loop review system
- Real-time processing status
- Comprehensive audit logging
- Bulk export capabilities

