# Hospital Management System (Master Brain Context)
> This document preserves full system context to prevent redundant work and token waste.

## 1. System Architecture
- **Backend Framework**: Spring Boot 3.3.3 (Java 21) on Port 9090
- **Database**: MongoDB (Entities: User, Doctor, Department, Patient, Appointment, Insurance)
- **Cache**: Redis Cloud (host: `geese-lace-brass-20336.db.redis.io:18990`) with JSON Serialization and 10-min TTL
- **Security**: Spring Security 6 + JWT (`JwtAuthenticationFilter` with Bearer token)
- **Messaging**: Kafka (Temporarily commented for local testing)

## 2. API Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Public: `GET /api/departments/**`, `GET /api/doctors/**` (PermitAll + Redis Cached)
- Protected: `POST /api/appointments`, `GET /api/appointments/**`, `GET /api/patients/**`

## 3. Frontend Architecture
- Location: `src/main/resources/static/` (Served directly by Spring Boot on `http://localhost:9090`)
- Structure:
  - `index.html`: Landing page, Doctor catalog, Hero, Modals
  - `style.css`: Glassmorphism, Deep Void Blue (#0A0F1D) + Electric Cyan (#00F2FE)
  - `app.js`: API Service, JWT LocalStorage token manager, Scroll animations, Modals

## 4. Design Guidelines
- Modern typography: Google Fonts (`Outfit` & `Inter`)
- 60fps smooth scroll animations (Intersection Observer)
- Interactive popups & toasts for appointment booking and authentication

## 5. Master Roadmap & Learning Tracker (Must-Have Enterprise Features)

### 🟢 Completed Features:
- [x] Spring Boot 3.3.3 Clean Layered Backend + MongoDB
- [x] Spring Security 6 + JWT Authentication (`JwtAuthenticationFilter`)
- [x] Redis Cloud Caching (Departments & Doctors with 10-min TTL & instant cache eviction)
- [x] Global Exception Handling (Custom error payloads)
- [x] Standalone JAR packaging + Procfile
- [x] Decoupled Animated Frontend (`frontend-react` React 19 + Tailwind CSS)
- [x] **Swagger / OpenAPI 3.0** (`springdoc-openapi-starter-webmvc-ui` - Interactive browser documentation at `/swagger-ui/index.html`)
- [x] **Doctor Availability Toggle & Metadata** (`available` toggle, consultation fee, experience, ratings at `PATCH /api/doctors/{id}/availability`)
- [x] **Slot Conflict Prevention & Off-duty Blocker** in `AppointmentServiceImpl`
- [x] **Patient & Doctor Specific Appointment Queries** (`/api/appointments/patient/{id}`, `/api/appointments/doctor/{id}`)
- [x] **Status Lifecycle & Prescription Notes** (`PATCH /api/appointments/{id}/status`, `POST /api/appointments/{id}/prescription`)
- [x] **Medical Prescription PDF Generator** (`OpenPDF` dynamic streaming at `GET /api/appointments/{id}/prescription-pdf`)
- [x] **Admin Dashboard Analytics Engine** (MongoDB aggregation metrics at `GET /api/analytics/dashboard`)
- [x] **Spring Boot Actuator Health & Metrics** (`/actuator/health`, `/actuator/metrics`)
- [x] **Production Docker & Docker Compose** (`Dockerfile` multi-stage build + `docker-compose.yml` for App + Mongo + Redis)

