import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, XCircle, User, Activity, Heart, ShieldCheck, 
  FileText, Download, LogOut, Plus, Stethoscope, AlertCircle, 
  CheckCircle2, MapPin, Phone, Award, ChevronRight, Pill
} from 'lucide-react';
import { appointmentAPI, analyticsAPI } from '../services/api';

export default function PatientDashboard({ 
  user = { name: 'Rahul Sharma', email: 'rahul.sharma@medicare.com' }, 
  onLogout = () => {}, 
  onBackHome = () => {}, 
  onBookNew = () => {}, 
  appointments = [], 
  setAppointments = () => {} 
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'history' | 'records'
  const [liveMetrics, setLiveMetrics] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const currentAppointments = Array.isArray(appointments) ? appointments : [];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await analyticsAPI.getDashboard();
        setLiveMetrics(res.data);
      } catch (err) {
        // Fallback to local default metrics
      }
    };
    fetchAnalytics();
  }, []);

  const pastAppointments = [
    {
      id: 'apt-098',
      doctorId: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      appointmentTime: '2026-08-12T11:00:00',
      reason: 'Right Ankle Sprain & Joint Physio',
      fee: 850,
      status: 'COMPLETED',
      prescription: 'RX-88402.pdf',
    },
    {
      id: 'apt-091',
      doctorId: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      appointmentTime: '2026-07-28T16:15:00',
      reason: 'Annual Vaccination & Growth Audit',
      fee: 750,
      status: 'COMPLETED',
      prescription: 'RX-77219.pdf',
    },
  ];

  const medicalRecords = [
    { id: 'rec-1', title: 'Cardiovascular 2D Echo Report', doctor: 'Dr. Sarah Johnson', date: '10 Aug 2026', size: '2.4 MB', type: 'Lab Test' },
    { id: 'rec-2', title: 'Brain & Spine MRI Contrast Scan', doctor: 'Dr. David Anderson', date: '22 Jul 2026', size: '18.1 MB', type: 'Radiology' },
    { id: 'rec-3', title: 'Comprehensive Blood Panel (CBC & Lipid)', doctor: 'Apollo PathLabs', date: '15 Jun 2026', size: '1.2 MB', type: 'Biochemistry' },
  ];

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment slot?')) return;
    try {
      await appointmentAPI.updateStatus(id, 'CANCELLED');
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
    } catch (err) {
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleDownloadSlip = async (apt) => {
    const aptId = apt.id || 'sample';
    setDownloadingId(aptId);
    try {
      const response = await appointmentAPI.downloadPrescription(aptId);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `MedicarePlus_Prescription_${aptId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Direct Printable Medical Prescription Slip
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Medicare+ Official OPD Slip - ${apt.id || 'OPD-102'}</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1e293b; }
                .header { border-bottom: 3px solid #184c78; padding-bottom: 12px; text-align: center; }
                .title { font-size: 22px; font-weight: 800; color: #184c78; }
                .meta-table { width: 100%; border-collapse: collapse; margin-top: 25px; }
                .meta-table td { padding: 10px; border: 1px solid #cbd5e1; font-size: 13px; }
                .rx-box { margin-top: 25px; padding: 15px; background: #f8fafc; border-left: 4px solid #184c78; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="title">MEDICARE+ MULTI-SPECIALTY CLINIC</div>
                <p>124 Health Avenue, Cyber City • Official Digital OPD Prescription Summary</p>
              </div>
              <table class="meta-table">
                <tr><td><strong>Patient:</strong> ${user?.name || 'Verified Patient'}</td><td><strong>Doctor:</strong> ${apt.doctorId || 'Lead Consultant'}</td></tr>
                <tr><td><strong>Token:</strong> ${apt.token || apt.tokenNumber || 'OPD-102'}</td><td><strong>Date:</strong> ${apt.appointmentTime || apt.appointmentDate || 'Today'}</td></tr>
                <tr><td><strong>Status:</strong> ${apt.status || 'CONFIRMED'}</td><td><strong>Fee:</strong> ₹${apt.fee || 500}</td></tr>
              </table>
              <div class="rx-box">
                <h4>Clinical Evaluation & Rx</h4>
                <p>${apt.reason || apt.diagnosis || 'Routine clinical OPD checkup and vitals assessment.'}</p>
                <p><strong>Prescription:</strong> Tab Paracetamol 650mg TDS • Multivitamin daily</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP WELCOME & LOGOUT BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-blue-500/25 shrink-0">
            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {user?.name || user?.email?.split('@')[0] || 'Patient Portal'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase">
                Active Patient
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>Patient ID: <strong className="text-slate-800">#MED-90412</strong></span>
              <span>•</span>
              <span>Account: <strong className="text-slate-800">{user?.email || 'patient@medicare.com'}</strong></span>
            </p>
          </div>
        </div>

        {/* TOP ACTIONS: BACK TO HOME, BOOK NEW SLOT & SINGLE LOGOUT */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onBackHome}
            className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            ← Back to Home
          </button>

          <button
            onClick={onBookNew}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition hover:scale-105 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Book New Slot
          </button>

          {/* THE SINGLE LOGOUT BUTTON FOR DASHBOARD */}
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Log out of your account"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* 2. STATS & METRICS GRID (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* STAT 1 */}
        <div className="clean-card p-5 bg-white rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Appointments</span>
            <div className="text-2xl font-extrabold text-slate-900">{currentAppointments.length} Upcoming</div>
          </div>
        </div>

        {/* STAT 2 */}
        <div className="clean-card p-5 bg-white rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 fill-pink-600" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Vitals Status</span>
            <div className="text-2xl font-extrabold text-slate-900">72 BPM / Normal</div>
          </div>
        </div>

        {/* STAT 3 */}
        <div className="clean-card p-5 bg-white rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Blood Pressure</span>
            <div className="text-2xl font-extrabold text-slate-900">120 / 80 mmHg</div>
          </div>
        </div>

        {/* STAT 4 */}
        <div className="clean-card p-5 bg-white rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Medical Vault</span>
            <div className="text-2xl font-extrabold text-slate-900">3 E-Reports</div>
          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT GRID (12 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: VISITS & RECORDS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TAB SELECTOR */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-sm flex items-center gap-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Upcoming Appointments ({currentAppointments.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Past Visit History
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'records'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Lab Reports & Vault
            </button>
          </div>

          {/* TAB 1: UPCOMING APPOINTMENTS */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {currentAppointments.length === 0 ? (
                <div className="clean-card rounded-3xl p-12 text-center bg-white">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">No Upcoming Appointments</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">You have zero active slots scheduled at MediCare+.</p>
                  <button
                    onClick={onBookNew}
                    className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md"
                  >
                    Schedule an Appointment
                  </button>
                </div>
              ) : (
                currentAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="clean-card rounded-3xl p-6 bg-white flex flex-col justify-between border border-slate-200/90 shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      {/* CARD TOP ROW */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-sm shrink-0 border border-blue-100">
                            Dr
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-extrabold text-base text-slate-900">{apt.doctorId}</h3>
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-extrabold">
                                {apt.specialty || 'Specialist OPD'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{apt.cabin || 'Main Clinical Complex, Suite 302'}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start">
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            {apt.status || 'CONFIRMED'}
                          </span>
                        </div>
                      </div>

                      {/* CARD DETAILS */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-xs">
                        <div className="bg-slate-50 p-3 rounded-2xl">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Scheduled Time</span>
                          <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            {new Date(apt.appointmentTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(apt.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Token & Queue</span>
                          <span className="font-bold text-slate-800 mt-0.5 block">
                            {apt.token || '#A-14'} • Direct Cabin Entry
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Consultation Fee</span>
                          <span className="font-extrabold text-blue-600 mt-0.5 block">
                            ₹{apt.fee || 800} (Paid / In-Clinic)
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 bg-blue-50/50 p-3 rounded-xl mb-2">
                        <strong>Reason:</strong> {apt.reason || 'General Clinical Follow-up'}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => handleDownloadSlip(apt)}
                        disabled={downloadingId === (apt.id || 'sample')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition disabled:opacity-50"
                      >
                        <Download className={`w-3.5 h-3.5 ${downloadingId === (apt.id || 'sample') ? 'animate-bounce' : ''}`} />
                        {downloadingId === (apt.id || 'sample') ? 'Generating PDF...' : 'Download Official Prescription (PDF)'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel Slot
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: PAST VISIT HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {pastAppointments.map((past) => (
                <div key={past.id} className="clean-card rounded-2xl p-5 bg-white border border-slate-200/80">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{past.doctorId}</h4>
                      <p className="text-xs text-slate-500">{past.specialty} • Completed on {new Date(past.appointmentTime).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                      {past.status}
                    </span>
                  </div>

                  <div className="py-3 text-xs text-slate-600 flex items-center justify-between">
                    <span>Clinical Diagnosis: <strong>{past.reason}</strong></span>
                    <button 
                      onClick={() => handleDownloadSlip(past)}
                      className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Prescription (PDF)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MEDICAL RECORDS VAULT */}
          {activeTab === 'records' && (
            <div className="space-y-3">
              {medicalRecords.map((rec) => (
                <div key={rec.id} className="clean-card rounded-2xl p-5 bg-white flex items-center justify-between border border-slate-200/80">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{rec.title}</h4>
                      <p className="text-xs text-slate-500">{rec.doctor} • {rec.date} ({rec.size})</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadSlip({ id: rec.id, doctorId: rec.doctor, reason: rec.title })}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-bold transition flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: PATIENT PROFILE & VITALS SIDEBAR (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* PROFILE SUMMARY CARD */}
          <div className="clean-card rounded-3xl p-6 bg-white border border-slate-200/80 space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">Patient Information</h3>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Blood Group</span>
                <strong className="text-slate-900 bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-bold">O+ Positive</strong>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Age / Gender</span>
                <strong className="text-slate-900">29 Yrs • Male</strong>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Emergency Phone</span>
                <strong className="text-slate-900">+91 98765 43210</strong>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-400">Known Allergies</span>
                <strong className="text-amber-600 font-bold">Penicillin (Mild)</strong>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Insurance Cover</span>
                <strong className="text-blue-600 font-bold">Star Health (Active)</strong>
              </div>
            </div>
          </div>

          {/* REALTIME VITALS CARD */}
          <div className="clean-card rounded-3xl p-6 bg-white border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">Clinical Vitals</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> Heart Rate
                </span>
                <strong className="text-slate-900 font-extrabold text-sm">72 BPM</strong>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-500" /> Oxygen (SpO2)
                </span>
                <strong className="text-slate-900 font-extrabold text-sm">99%</strong>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-indigo-500" /> Blood Pressure
                </span>
                <strong className="text-slate-900 font-extrabold text-sm">120 / 80</strong>
              </div>
            </div>
          </div>

          {/* HOSPITAL CONTACT BOX */}
          <div className="mesh-purple-pink rounded-3xl p-6 text-white space-y-3 shadow-md">
            <span className="text-[10px] uppercase font-bold text-white/80 block tracking-widest">Immediate Support</span>
            <h4 className="text-lg font-extrabold leading-tight">Need Urgent Hospital Assistance?</h4>
            <p className="text-xs text-white/90">Direct 24/7 hotline to trauma emergency ward and pharmacy dispatch.</p>
            <a
              href="tel:1800633422"
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-700 font-bold text-xs shadow-md transition hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" /> Call 1-800-MEDICARE
            </a>
          </div>



        </div>

      </div>
    </div>
  );
}
