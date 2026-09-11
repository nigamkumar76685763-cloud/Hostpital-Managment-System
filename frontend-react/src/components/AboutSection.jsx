import React from 'react';
import { Check, ArrowRight, Award } from 'lucide-react';

export default function AboutSection({ onExploreClick }) {
  const points = [
    'Board-certified specialists across 25+ disciplines',
    'State-of-the-art diagnostic and imaging equipment',
    'Personalized treatment plans with zero delay',
    'Seamless digital records & in-person appointments',
  ];

  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* LEFT IMAGE WITH FLOATING BADGE */}
        <div className="lg:col-span-6 relative">
          <div className="rounded-[32px] overflow-hidden shadow-xl border border-slate-200/80 bg-white p-2">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85"
              alt="Doctor consulting patient"
              className="w-full h-80 sm:h-96 object-cover rounded-[26px]"
            />
          </div>

          {/* FLOATING BADGE */}
          <div className="absolute -bottom-4 -left-2 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-600 block">Top 100 Hospital Network</span>
              <h4 className="text-xs font-bold text-slate-900">Patient Centered Care Excellence</h4>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>Dynamic Modern Healthcare</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Committed to Excellence <br />
            in Every Interaction
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            At MediCare+, we merge advanced medical technology with genuine compassion for over 20 years to deliver top-tier health services across in-clinic, acute care, and post-discharge healthcare.
          </p>

          <div className="space-y-3 pt-2">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{pt}</span>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition hover:scale-105 inline-flex items-center gap-2"
            >
              Explore Services <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
