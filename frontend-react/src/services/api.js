import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:9090/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  googleLogin: (data) => API.post('/auth/google', data),
};

export const doctorAPI = {
  getAll: () => API.get('/doctors'),
  getById: (id) => API.get(`/doctors/${id}`),
  toggleAvailability: (id, available) => API.patch(`/doctors/${id}/availability?available=${available}`),
};

export const departmentAPI = {
  getAll: () => API.get('/departments'),
};

export const appointmentAPI = {
  create: (data) => API.post('/appointments', data),
  getAll: () => API.get('/appointments'),
  getByPatient: (patientId) => API.get(`/appointments/patient/${patientId}`),
  getByDoctor: (doctorId) => API.get(`/appointments/doctor/${doctorId}`),
  updateStatus: (id, status) => API.patch(`/appointments/${id}/status?status=${status}`),
  downloadPrescription: (id) => API.get(`/appointments/${id}/prescription-pdf`, { responseType: 'blob' }),
  delete: (id) => API.delete(`/appointments/${id}`),
};

export const analyticsAPI = {
  getDashboard: () => API.get('/analytics/dashboard'),
};

export default API;
