import React from 'react';
import { Star, CheckCircle, ArrowRight, Clock } from 'lucide-react';

export default function DoctorCatalog({ onSelectDoctor }) {
  const specialists = [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      experience: 14,
      rating: 4.9,
      reviews: 420,
      fee: 800,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      available: 'Today at 2:30 PM',
      isAvailable: true,
    },
    {
      id: 'doc-2',
      name: 'Dr. David Anderson',
      specialization: 'Neurologist',
      experience: 12,
      rating: 4.8,
      reviews: 310,
      fee: 950,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      available: 'Today at 4:15 PM',
      isAvailable: true,
    },
    {
      id: 'doc-3',
      name: 'Dr. Michael Chen',
      specialization: 'Orthopedic Surgeon',
      experience: 16,
      rating: 4.9,
      reviews: 512,
      fee: 850,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      available: 'Tomorrow at 10:00 AM',
      isAvailable: true,
    },
    {
      id: 'doc-4',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Pediatric Specialist',
      experience: 9,
      rating: 5.0,
      reviews: 290,
      fee: 750,
      image: 'https://images.unsplash.com/photo-1594824813686-224422204c35?auto=format&fit=crop&w=400&q=80',
      available: 'Off-Duty (On Leave)',
      isAvailable: false,
    },
  ];

  return (
    <section id="doctors" className="max-w-6xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>In Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Key Healthcare Specialists
          </h2>
        </div>

        <button 
          onClick={() => onSelectDoctor(specialists[0])}
          className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition self-start sm:self-auto"
        >
          All Doctors
        </button>
      </div>

      {/* 4 DOCTOR CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {specialists.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => onSelectDoctor(doc)}
            className="clean-card rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer group bg-white border border-slate-200/80"
          >
            {/* PORTRAIT CONTAINER WITH BLUE PASTEL BACKGROUND */}
            <div className="relative pt-6 px-6 bg-gradient-to-b from-blue-100/60 via-blue-50/40 to-white flex justify-center">
              {/* ON-DUTY / OFF-DUTY BADGE */}
              <div className="absolute top-4 right-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-sm ${
                  doc.isAvailable 
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                    : 'bg-amber-100 text-amber-700 border border-amber-300'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${doc.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  {doc.isAvailable ? 'On-Duty' : 'Off-Duty'}
                </span>
              </div>

              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition duration-300">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* DOCTOR INFO */}
            <div className="p-5 text-center flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                  {doc.specialization}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition">
                  {doc.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-2">
                  <span className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                    {doc.rating}
                  </span>
                  <span>•</span>
                  <span>{doc.reviews} reviews</span>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block font-semibold">Consultation</span>
                  <span className="text-sm font-extrabold text-slate-900">₹{doc.fee}</span>
                </div>

                <button
                  disabled={!doc.isAvailable}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (doc.isAvailable) onSelectDoctor(doc);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm transition ${
                    doc.isAvailable
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 group-hover:scale-105'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {doc.isAvailable ? 'Book Slot' : 'Off-Duty'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
