import React from 'react';
import { Stethoscope, Heart, Brain, Bone, Activity, Baby, Eye, ShieldAlert } from 'lucide-react';

export default function DepartmentsSection() {
  const departments = [
    {
      id: 1,
      name: 'Cardiology & Heart Center',
      desc: 'Comprehensive interventional cardiology, echocardiograms, and 24/7 cardiac emergency ICU.',
      icon: Heart,
      accent: 'from-rose-500/20 to-red-500/5',
      border: 'hover:border-rose-500/40',
      iconColor: 'text-rose-400',
      room: 'Wing A • Level 3'
    },
    {
      id: 2,
      name: 'Neurology & Spine',
      desc: 'Cutting-edge neuro-diagnostics, microsurgery, migraine treatments, and stroke rehabilitation.',
      icon: Brain,
      accent: 'from-purple-500/20 to-indigo-500/5',
      border: 'hover:border-purple-500/40',
      iconColor: 'text-purple-400',
      room: 'Wing B • Level 4'
    },
    {
      id: 3,
      name: 'Orthopedics & Joint Care',
      desc: 'Robotic joint replacements, sports injury medicine, spine trauma repair, and arthritis therapy.',
      icon: Bone,
      accent: 'from-amber-500/20 to-orange-500/5',
      border: 'hover:border-amber-500/40',
      iconColor: 'text-amber-400',
      room: 'Wing C • Ground Floor'
    },
    {
      id: 4,
      name: 'Pediatrics & NICU',
      desc: 'Specialized neonatal intensive care, child immunization, pediatric surgeries, and wellness.',
      icon: Baby,
      accent: 'from-emerald-500/20 to-teal-500/5',
      border: 'hover:border-emerald-500/40',
      iconColor: 'text-emerald-400',
      room: 'Wing A • Level 1'
    },
  ];

  return (
    <section id="departments" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-[#00D9FF] text-xs font-bold uppercase tracking-widest font-outfit mb-3">
          <Activity className="w-4 h-4" /> Medical Infrastructure
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
          Specialized Medical Wings
        </h2>
        <p className="text-gray-400 text-sm mt-3">
          Equipped with advanced diagnostic robotics, sterile laminar airflow theatres, and sub-10 minute trauma response.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.id}
              className={`glass-card p-6 border border-white/10 ${d.border} hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${d.accent} rounded-bl-full pointer-events-none transition-all duration-300 group-hover:scale-125`} />
              
              <div className={`w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center ${d.iconColor} mb-5 shadow-inner`}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold font-outfit text-white mb-2">{d.name}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">{d.desc}</p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>{d.room}</span>
                <span className="text-emerald-400 font-bold">24/7 OPEN</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
