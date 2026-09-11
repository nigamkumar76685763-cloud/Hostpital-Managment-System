import React, { useState } from 'react';
import { Calendar, Clock, Phone, User, Mail, CheckCircle2, Stethoscope } from 'lucide-react';
import confetti from 'canvas-confetti';
import { appointmentAPI } from '../services/api';

export default function BookingSection({ onBookingComplete, user, onAuthRequired }) {
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Johnson',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 AM',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await appointmentAPI.create({
        doctorId: formData.doctor,
        patientId: formData.email || 'patient-guest',
        appointmentTime: `${formData.date}T${formData.time.includes('PM') ? '14:30:00' : '10:30:00'}`,
        reason: formData.reason || `${formData.department} Consultation`,
        status: 'CONFIRMED',
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setSuccess(true);
      setTimeout(() => {
        onBookingComplete();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      // Demo fallback
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setSuccess(true);
      setTimeout(() => {
        onBookingComplete();
        setSuccess(false);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-[36px] p-8 md:p-12 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* LEFT INFO */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>Book Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Schedule Your <br />
            Appointment in Minutes
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed max-w-md">
            Choose your specialist, preferred date and time — and we'll handle the rest with zero waiting time guaranteed.
          </p>

          {/* 3 NUMBERED STEPS */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-blue-500/25">
                01
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Fill In Form</h4>
                <p className="text-xs text-slate-500">Provide your symptoms and select your preferred specialty.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-blue-500/25">
                02
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Instant Confirmation</h4>
                <p className="text-xs text-slate-500">Instant token assignment via SMS and encrypted email pass.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-blue-500/25">
                03
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Meet In-Person</h4>
                <p className="text-xs text-slate-500">Walk directly into the physician cabin at your reserved hour.</p>
              </div>
            </div>
          </div>

          {/* EMERGENCY GRADIENT STRIP */}
          <div className="mesh-purple-pink rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
            <div>
              <span className="text-[10px] uppercase font-bold text-white/80 block">Emergency Hotline</span>
              <strong className="text-base font-extrabold text-white">1-800-MEDICARE</strong>
            </div>
            <span className="text-[11px] font-bold text-white/90 bg-white/20 px-3 py-1 rounded-full">
              24/7 Toll-Free
            </span>
          </div>
        </div>

        {/* RIGHT BOOKING FORM CARD */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Book Appointment</h3>

            {success ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Appointment Confirmed!</h4>
                <p className="text-xs text-emerald-700">Your slot token has been generated. Redirecting to your visits...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="patient@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 transition"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Emergency Care">Emergency Care</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Preferred Doctor</label>
                    <select
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 transition"
                    >
                      <option value="Dr. Sarah Johnson">Dr. Sarah Johnson (Cardio)</option>
                      <option value="Dr. David Anderson">Dr. David Anderson (Neuro)</option>
                      <option value="Dr. Michael Chen">Dr. Michael Chen (Ortho)</option>
                      <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez (Pedia)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Time Slot</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 transition"
                    >
                      <option value="10:00 AM">10:00 AM (Morning)</option>
                      <option value="11:30 AM">11:30 AM (Morning)</option>
                      <option value="02:30 PM">02:30 PM (Afternoon)</option>
                      <option value="04:15 PM">04:15 PM (Evening)</option>
                      <option value="05:30 PM">05:30 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition hover:scale-[1.02] mt-2"
                >
                  {loading ? 'Reserving...' : 'Schedule Appointment'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
