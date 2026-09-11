/* ===================================================
   AURACARE CLIENT APP (Interactive Logic & REST APIs)
   =================================================== */

// Global State
const state = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    doctors: [],
    departments: [],
    activeFilter: 'all'
};

// API Base URLs (Works both when served by Spring Boot OR via Live Server on port 5500/3000)
const API_BASE = window.location.port === '9090' ? '/api' : 'http://localhost:9090/api';

// DOM Elements
const authTriggerBtn = document.getElementById('authTriggerBtn');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const loginTabBtn = document.getElementById('loginTabBtn');
const registerTabBtn = document.getElementById('registerTabBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const userProfileBadge = document.getElementById('userProfileBadge');
const userNameDisplay = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

const bookingModal = document.getElementById('bookingModal');
const closeBookingModal = document.getElementById('closeBookingModal');
const appointmentForm = document.getElementById('appointmentForm');
const selectedDoctorIdInput = document.getElementById('selectedDoctorId');
const bookingDoctorName = document.getElementById('bookingDoctorName');
const bookingDoctorSpec = document.getElementById('bookingDoctorSpec');

const doctorsGrid = document.getElementById('doctorsGrid');
const departmentsGrid = document.getElementById('departmentsGrid');
const doctorSearchInput = document.getElementById('doctorSearchInput');
const specialtyFilterChips = document.getElementById('specialtyFilterChips');

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    fetchDepartments();
    fetchDoctors();
    setupEventListeners();
});

// AUTH UI STATE SYNC
function updateAuthUI() {
    if (state.token && state.user) {
        authTriggerBtn.classList.add('hidden');
        userProfileBadge.classList.remove('hidden');
        userNameDisplay.textContent = state.user.email ? state.user.email.split('@')[0] : 'User';
    } else {
        authTriggerBtn.classList.remove('hidden');
        userProfileBadge.classList.add('hidden');
    }
}

// TOAST NOTIFICATION GENERATOR
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 350);
    }, 4000);
}

// FETCH DEPARTMENTS (Redis Cached on Backend)
async function fetchDepartments() {
    try {
        const res = await fetch(`${API_BASE}/departments`);
        if (!res.ok) throw new Error('Failed to load departments');
        state.departments = await res.json();
        renderDepartments();
    } catch (err) {
        console.warn('Backend offline or empty. Showing fallback demo departments.');
        state.departments = [
            { id: '1', name: 'Cardiology', description: 'Advanced heart, valve, and vascular care with 24/7 ICU response.', location: 'Wing A, Level 3' },
            { id: '2', name: 'Neurology & Brain', description: 'Comprehensive brain, spine, and nervous system diagnostic surgery.', location: 'Wing B, Level 4' },
            { id: '3', name: 'Orthopedics', description: 'Bone, joint, robotic knee replacement, and sports trauma rehab.', location: 'Wing C, Ground' },
            { id: '4', name: 'Pediatrics', description: 'Child health, neonatal intensive care unit (NICU), and vaccinations.', location: 'Wing A, Level 1' }
        ];
        renderDepartments();
    }
}

function renderDepartments() {
    departmentsGrid.innerHTML = state.departments.map(dept => `
        <div class="dept-card glass">
            <div class="dept-icon"><i data-lucide="cross"></i></div>
            <h3>${dept.name}</h3>
            <p>${dept.description}</p>
            <div class="dept-loc"><i data-lucide="map-pin"></i> ${dept.location}</div>
        </div>
    `).join('');
    lucide.createIcons();
}

// FETCH DOCTORS (Redis Cached on Backend)
async function fetchDoctors() {
    try {
        const res = await fetch(`${API_BASE}/doctors`);
        if (!res.ok) throw new Error('Failed to load doctors');
        state.doctors = await res.json();
        renderDoctors();
    } catch (err) {
        console.warn('Backend offline or empty. Showing fallback demo specialists.');
        state.doctors = [
            { id: 'doc-1', name: 'Dr. Rahul Verma', specialization: 'Cardiology', phone: '+91 98765 43210', experienceYears: 14, email: 'rahul.verma@auracare.com' },
            { id: 'doc-2', name: 'Dr. Ananya Iyer', specialization: 'Neurology', phone: '+91 98765 43211', experienceYears: 11, email: 'ananya.iyer@auracare.com' },
            { id: 'doc-3', name: 'Dr. Vikramaditya Singh', specialization: 'Orthopedics', phone: '+91 98765 43212', experienceYears: 18, email: 'vikram.singh@auracare.com' }
        ];
        renderDoctors();
    }
}

function renderDoctors() {
    const searchTerm = (doctorSearchInput.value || '').toLowerCase();
    const filtered = state.doctors.filter(doc => {
        const matchesSpec = state.activeFilter === 'all' || doc.specialization.toLowerCase() === state.activeFilter.toLowerCase();
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm) || doc.specialization.toLowerCase().includes(searchTerm);
        return matchesSpec && matchesSearch;
    });

    if (filtered.length === 0) {
        doctorsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;" class="glass">
                <p class="text-muted">No specialists found matching criteria.</p>
            </div>
        `;
        return;
    }

    doctorsGrid.innerHTML = filtered.map(doc => `
        <div class="doctor-card glass">
            <div>
                <div class="doctor-avatar">${doc.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                <div class="doctor-info">
                    <h3>${doc.name}</h3>
                    <div class="doctor-spec">${doc.specialization}</div>
                    <div class="doctor-meta">
                        <div><i data-lucide="award"></i> ${doc.experienceYears || 10}+ Years Experience</div>
                        <div><i data-lucide="phone"></i> ${doc.phone || 'Direct Extension'}</div>
                        <div><i data-lucide="mail"></i> ${doc.email || 'doctor@auracare.com'}</div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary btn-full glow-btn book-doc-btn" data-id="${doc.id}" data-name="${doc.name}" data-spec="${doc.specialization}">
                <i data-lucide="calendar-plus"></i> Select & Book Slot
            </button>
        </div>
    `).join('');
    lucide.createIcons();

    // Attach click events to dynamic booking buttons
    document.querySelectorAll('.book-doc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            openBookingModal(btn.dataset.id, btn.dataset.name, btn.dataset.spec);
        });
    });
}

// OPEN BOOKING MODAL
function openBookingModal(id, name, spec) {
    if (!state.token) {
        showToast('Please sign in first to book an appointment!', 'error');
        authModal.classList.remove('hidden');
        return;
    }
    selectedDoctorIdInput.value = id;
    bookingDoctorName.textContent = name;
    bookingDoctorSpec.textContent = spec;

    // Set default datetime to tomorrow 10:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    document.getElementById('appointmentDateTime').value = tomorrow.toISOString().slice(0, 16);

    bookingModal.classList.remove('hidden');
}

// EVENT LISTENERS SETUP
function setupEventListeners() {
    // Auth Modal Triggers
    authTriggerBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
    closeAuthModal.addEventListener('click', () => authModal.classList.add('hidden'));
    closeBookingModal.addEventListener('click', () => bookingModal.classList.add('hidden'));

    // Switch Tabs inside Auth
    loginTabBtn.addEventListener('click', () => {
        loginTabBtn.classList.add('active');
        registerTabBtn.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerTabBtn.addEventListener('click', () => {
        registerTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.classList.add('hidden');
        if (e.target === bookingModal) bookingModal.classList.add('hidden');
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = null;
        state.user = null;
        updateAuthUI();
        showToast('Logged out successfully');
    });

    // Search & Filter
    doctorSearchInput.addEventListener('input', renderDoctors);
    specialtyFilterChips.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            specialtyFilterChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.activeFilter = chip.dataset.filter;
            renderDoctors();
        });
    });

    // Submit Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed. Verify credentials.');

            state.token = data.token;
            state.user = { email: data.email, role: data.role };
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(state.user));

            authModal.classList.add('hidden');
            updateAuthUI();
            showToast(`Welcome back, ${state.user.email}!`);
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    // Submit Register
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const role = document.getElementById('regRole').value;

        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');

            showToast('Account created! Please sign in now.');
            loginTabBtn.click();
            document.getElementById('loginEmail').value = email;
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    // Submit Booking
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const doctorId = selectedDoctorIdInput.value;
        const appointmentTime = document.getElementById('appointmentDateTime').value;
        const reason = document.getElementById('appointmentReason').value;

        const payload = {
            doctorId,
            patientId: state.user.email,
            appointmentTime,
            reason,
            status: 'CONFIRMED'
        };

        try {
            const res = await fetch(`${API_BASE}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Booking failed');

            bookingModal.classList.add('hidden');
            appointmentForm.reset();

            // Fire Celebration Confetti! 🎉
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }

            showToast('🎉 Appointment confirmed successfully! Booking slot reserved.');
        } catch (err) {
            showToast(err.message, 'error');
        }
    });
}
