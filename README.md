# 🏥 Medicare+ / AuraCare — Enterprise Hospital Management System

> Production-grade, high-throughput Hospital Information & OPD Management Backend built with **Java 21, Spring Boot 3.3.3, Spring Security 6, Redis Distributed Caching, MongoDB, and OpenPDF**.

---

## 🚀 Key Architectural Highlights

- **Stateless Role-Based Security:** Spring Security 6 + JWT (`JwtAuthenticationFilter`) with dedicated roles (`ROLE_ADMIN`, `ROLE_DOCTOR`, `ROLE_PATIENT`).
- **Google OAuth2 Authentication:** One-click Google sign-in (`POST /api/auth/google`) with automatic user provisioning and JWT token issuance.
- **Distributed Caching Layer:** Redis In-Memory caching with JSON serialization, custom 10-minute TTL, and automatic cache invalidation (`@CacheEvict`) on mutations.
- **Conflict-Free Appointment Scheduler:** Real-time doctor availability checks (`isAvailable`), conflict-free slot reservation, automated OPD token generation (`OPD-XXX`), and status lifecycle (`CONFIRMED`, `CANCELLED`, `COMPLETED`).
- **Clinical Prescription PDF Engine:** Automated in-memory generation and direct streaming of digital medical prescriptions using OpenPDF (`GET /api/appointments/{id}/prescription-pdf`).
- **Admin Analytics Dashboard:** Real-time MongoDB aggregation metrics for patient admissions, doctor availability, appointment queues, and revenue forecasting.
- **Database Auto-Seeder:** `DataInitializer` pre-populates verified doctors, departments, and demo accounts out-of-the-box.
- **Modern React 19 Frontend:** Luxury Apple-inspired UI with Tailwind CSS v4, slot booking modal, and patient dashboard.
- **Production Observability:** Spring Boot Actuator health checks and metrics (`/actuator/health`, `/actuator/metrics`).
- **OpenAPI 3.0 / Swagger UI:** Interactive documentation and playground at `http://localhost:9090/swagger-ui/index.html`.
- **Containerization:** Multi-stage `Dockerfile` and `docker-compose.yml` to spin up App + MongoDB + Redis in a single command.

---

## 👥 Pre-Configured Demo Accounts

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Admin** | `admin@medicare.com` | `admin123` | Full control over doctors, departments & analytics |
| **Doctor** | `doctor@medicare.com` | `doctor123` | Manage appointments, toggle availability & write prescriptions |
| **Patient** | `patient@medicare.com` | `patient123` | Book appointments, download prescription PDFs & view vitals |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Tailwind CSS v4, Lucide Icons, Vite 8, Axios |
| **Backend Language** | Java 21 (LTS) |
| **Backend Framework** | Spring Boot 3.3.3 (WebMVC, Security 6, Data MongoDB, Data Redis, Actuator) |
| **Database** | MongoDB 7.0 (Collections: Users, Doctors, Patients, Appointments, Departments, Insurance) |
| **Cache** | Redis 7.2 (Distributed Cache & Session Store) |
| **Security & OAuth** | JWT (io.jsonwebtoken:jjwt:0.12.6), BCrypt, Google OAuth2 |
| **Documentation** | SpringDoc OpenAPI 3.0 / Swagger UI 2.6.0 |
| **PDF Generation**| OpenPDF 1.3.39 |
| **DevOps** | Docker, Docker Compose, Maven |

---

## 📡 Core API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user (`ADMIN`, `DOCTOR`, `PATIENT`) | Public |
| `POST` | `/api/auth/login` | Authenticate credentials and receive Bearer JWT | Public |
| `POST` | `/api/auth/google` | 1-Click Google OAuth2 login & account provisioning | Public |

### 👨‍⚕️ Doctors (`/api/doctors`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/doctors` | List all doctors (Redis Cached) | Public |
| `GET` | `/api/doctors/{id}` | Get doctor profile by ID (Redis Cached) | Public |
| `GET` | `/api/doctors/specialization/{spec}` | Filter doctors by department | Authenticated |
| `POST` | `/api/doctors` | Register new doctor profile | `ROLE_ADMIN` |
| `PATCH` | `/api/doctors/{id}/availability` | Toggle doctor on-duty/off-duty status | `ADMIN`, `DOCTOR` |
| `PUT` | `/api/doctors/{id}` | Update doctor profile details | `ROLE_ADMIN` |
| `DELETE` | `/api/doctors/{id}` | Delete doctor profile | `ROLE_ADMIN` |

### 📅 Appointments (`/api/appointments`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/appointments` | Book appointment (with slot conflict & off-duty check) | `PATIENT`, `DOCTOR`, `ADMIN` |
| `GET` | `/api/appointments` | List all appointments | `DOCTOR`, `ADMIN` |
| `GET` | `/api/appointments/{id}` | Get appointment by ID | Authenticated |
| `GET` | `/api/appointments/patient/{patientId}` | Get appointment history for patient | Authenticated |
| `GET` | `/api/appointments/doctor/{doctorId}` | Get scheduled appointments for doctor | `DOCTOR`, `ADMIN` |
| `PATCH` | `/api/appointments/{id}/status` | Update status (`CONFIRMED`, `CANCELLED`, `COMPLETED`) | Authenticated |
| `POST` | `/api/appointments/{id}/prescription` | Add medical diagnosis and Rx medicines | `DOCTOR`, `ADMIN` |
| `GET` | `/api/appointments/{id}/prescription-pdf` | Stream downloadable Prescription PDF | Authenticated |
| `DELETE` | `/api/appointments/{id}` | Cancel/delete appointment record | `DOCTOR`, `ADMIN` |

### 📊 Admin Analytics (`/api/analytics`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/analytics/dashboard` | Real-time counts, status breakdown & revenue metrics | `DOCTOR`, `ADMIN` |

### 🏥 Patients (`/api/patients`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/patients` | Paginated & sorted patient records | `DOCTOR`, `ADMIN` |
| `GET` | `/api/patients/filter` | Multi-criteria dynamic search (disease, age, blood group) | `DOCTOR`, `ADMIN` |
| `POST` | `/api/patients` | Register patient record | `DOCTOR`, `ADMIN` |

---

## ⚡ Quick Start & Running Locally

### Option 1: Run with Docker Compose (Recommended)
```bash
docker-compose up -d --build
```
The entire ecosystem (Spring Boot app on port 9090, MongoDB on port 27017, and Redis on port 6379) will start automatically.

### Option 2: Run with Maven Locally
1. Ensure local MongoDB is running at `mongodb://localhost:27017/hospital_db`.
2. Run backend:
```bash
./mvnw spring-boot:run
```
3. Access interactive Swagger UI at:
```
http://localhost:9090/swagger-ui/index.html
```
4. Health check endpoint:
```
http://localhost:9090/actuator/health
```

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
