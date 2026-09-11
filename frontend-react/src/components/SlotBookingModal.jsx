import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, FileText, CheckCircle2, User, Stethoscope, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { appointmentAPI } from '../services/api';

export default function SlotBookingModal({ isOpen, onClose, doctor, user, onBookingSuccess }) {
  const doctorsList = [
    { id: 'doc-1', name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', fee: 800, cabin: 'Suite 302, Heart Wing' },
    { id: 'doc-2', name: 'Dr. David Anderson', specialization: 'Neurologist', fee: 950, cabin: 'Suite 410, Neuro Wing' },
    { id: 'doc-3', name: 'Dr. Michael Chen', specialization: 'Orthopedic Surgeon', fee: 850, cabin: 'Suite 205, Ortho Pavilion' },
    { id: 'doc-4', name: 'Dr. Emily Rodriguez', specialization: 'Pediatric Specialist', fee: 750, cabin: 'Suite 108, Child Wing' },
  ];

  const [selectedDoctorId, setSelectedDoctorId] = useState(doctor?.id || 'doc-1');
  const [appointmentDate, setAppointmentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('02:30 PM');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (doctor?.id) setSelectedDoctorId(doctor.id);
  }, [doctor]);

  const activeDoc = doctorsList.find(d => d.id === selectedDoctorId) || doctor || doctorsList[0];
  const timeSlots = ['09:30 AM', '11:15 AM', '02:30 PM', '04:00 PM', '05:45 PM'];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedDateTime = `${appointmentDate}T${selectedSlot.includes('PM') ? '14:30:00' : '10:00:00'}`;

    const newAppointment = {
      id: 'apt-' + Math.floor(100 + Math.random() * 900),
      doctorId: activeDoc.name,
      specialty: activeDoc.specialization,
      cabin: activeDoc.cabin,
      appointmentTime: formattedDateTime,
      reason: reason || `${activeDoc.specialization} In-Clinic Consultation`,
      fee: activeDoc.fee,
      token: `#C-${Math.floor(10 + Math.random() * 90)}`,
      status: 'CONFIRMED',
    };

    try {
      await appointmentAPI.create({
        doctorId: activeDoc.id,
        patientId: user?.email || 'patient-demo',
        appointmentTime: formattedDateTime,
        reason: newAppointment.reason,
        status: 'CONFIRMED',
      });

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });

      onBookingSuccess(newAppointment);
      onClose();
    } catch (err) {
      // Demo fallback
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
      onBookingSuccess(newAppointment);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-md p-7 relative border border-slate-200/90 shadow-2xl">
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-blue-500/25">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">In-Clinic Reservation</span>
            <h3 className="text-lg font-extrabold text-slate-900">Book In-Person Slot</h3>
            <p className="text-xs text-slate-500">Instant digital queue token & verified room</p>
          </div>
        </div>

        {error && (
          <div className="p-3 my-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs font-semibold text-slate-700">
          {/* DOCTOR PICKER */}
          <div>
            <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Select Specialist</label>
            <div className="relative">
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:border-blue-600 text-slate-900 font-bold transition appearance-none"
              >
                {doctorsList.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.specialization} (₹{doc.fee})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* DATE SELECTOR */}
          <div>
            <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Appointment Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* TIME SLOTS PILLS */}
          <div>
            <label className="block text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Choose Open OPD Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-1 text-xs rounded-xl font-bold transition ${
                    selectedSlot === slot
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* REASON / NOTES */}
          <div>
            <label className="block text-slate-500 mb-1 uppercase tracking-wider text-[10px]">Symptoms / Reason for Visit</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. Follow-up consultation or routine review"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 outline-none focus:bg-white focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* SUMMARY INFO */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-center justify-between text-xs text-blue-900">
            <span>Cabin: <strong>{activeDoc.cabin}</strong></span>
            <span className="font-extrabold text-blue-700">₹{activeDoc.fee}</span>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition hover:scale-[1.02]"
          >
            {loading ? 'Reserving...' : `Confirm Slot (${selectedSlot})`}
          </button>
        </form>
      </div>
    </div>
  );
}
