import React from 'react';
import { ArrowUpRight, UserCheck, Stethoscope, ShieldAlert, Heart, Building2, Video } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: UserCheck,
      title: 'Expert Doctors',
      desc: 'Round-the-clock board-certified specialists with decades of clinical excellence and patient care.',
    },
    {
      icon: Stethoscope,
      title: 'Modern Equipment',
      desc: 'Latest diagnostic, 3T MRI, catheterization and therapeutic technologies under one unified roof.',
    },
    {
      icon: ShieldAlert,
      title: '24/7 Emergency',
      desc: 'Rapid response ambulance fleet and level-1 trauma surgical center always on 3-minute standby.',
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      desc: 'Patient-first philosophy tailored to family comfort, individualized recovery, and dignity.',
    },
    {
      icon: Building2,
      title: 'Institutional Trust',
      desc: 'NABH and NMC accredited clinical hospital network trusted by over 50,000 satisfied families.',
    },
    {
      icon: Video,
      title: 'Telehealth Access',
      desc: 'Encrypted HD video consults and automated e-prescription delivery straight to your device.',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Patients Choose <br />
            MediCare+
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
          Discover patient-centered healthcare built around human warmth, advanced equipment, and clinical transparency.
        </p>
      </div>

      {/* 6-CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="clean-card rounded-3xl p-6 bg-white flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition">
                <span>View Department</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
