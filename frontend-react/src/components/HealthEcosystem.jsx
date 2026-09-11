import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, ShieldCheck, Zap, ArrowUpRight, CheckCircle2, Droplets, Wind, Moon } from 'lucide-react';

export default function HealthEcosystem() {
  const [activeMetric, setActiveMetric] = useState('cardio');

  const metrics = {
    cardio: {
      title: 'Cardiovascular Health',
      value: '72 BPM',
      sub: 'Resting Heart Rate',
      color: '#FF2D55',
      badge: 'Normal Sinus',
      desc: 'Real-time telemetry monitored via OPD diagnostic devices. Zero irregular spikes observed during last consultation.',
      ringPercent: 88,
    },
    oxygen: {
      title: 'Blood Oxygen (SpO2)',
      value: '99%',
      sub: 'Optimal Oxygenation',
      color: '#0071E3',
      badge: 'Clinically Optimal',
      desc: 'Monitored across respiratory and post-operative wards. Stable baseline with deep lung capacity indicators.',
      ringPercent: 96,
    },
    efficiency: {
      title: 'OPD Flow Punctuality',
      value: '94.8%',
      sub: 'On-Time Consultation',
      color: '#34C759',
      badge: 'Punctual Queue',
      desc: 'Automated token sequencing ensures less than 12 minutes wait time from check-in to consultation room.',
      ringPercent: 92,
    },
    sleep: {
      title: 'Sleep & Recovery',
      value: '8.2 Hrs',
      sub: 'Deep Sleep Baseline',
      color: '#5856D6',
      badge: 'Restorative',
      desc: 'Patient circadian and recovery tracking integrated into post-discharge wellness treatment plans.',
      ringPercent: 82,
    }
  };

  const active = metrics[activeMetric];

  return (
    <section className="space-y-8 pt-8">
      {/* SECTION TITLE */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider shadow-sm">
          <span>Unified Health Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
          Vitals & Activity Rings, <br className="hidden sm:inline" />
          <span className="text-[#0071E3]">tracked in real time.</span>
        </h2>
        <p className="text-sm text-[#86868B]">
          Just like your Apple Watch, AuraCare monitors clinical telemetry and hospital efficiency metrics continuously.
        </p>
      </motion.div>

      {/* INTERACTIVE ECOSYSTEM BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT: APPLE HEALTH CONCENTRIC RINGS VISUALIZER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 apple-card p-8 flex flex-col items-center justify-center text-center bg-white relative overflow-hidden"
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* SVG CONCENTRIC RINGS */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
              {/* RING 1: RED (CARDIO) */}
              <circle cx="110" cy="110" r="90" stroke="#FF2D55" strokeWidth="14" strokeOpacity="0.15" fill="none" />
              <circle 
                cx="110" cy="110" r="90" 
                stroke="#FF2D55" strokeWidth="14" strokeLinecap="round" fill="none"
                strokeDasharray="565.48"
                strokeDashoffset={565.48 - (565.48 * 0.88)}
                className="transition-all duration-1000 ease-out"
              />

              {/* RING 2: GREEN (EFFICIENCY) */}
              <circle cx="110" cy="110" r="70" stroke="#34C759" strokeWidth="14" strokeOpacity="0.15" fill="none" />
              <circle 
                cx="110" cy="110" r="70" 
                stroke="#34C759" strokeWidth="14" strokeLinecap="round" fill="none"
                strokeDasharray="439.82"
                strokeDashoffset={439.82 - (439.82 * 0.94)}
                className="transition-all duration-1000 ease-out"
              />

              {/* RING 3: BLUE (OXYGEN) */}
              <circle cx="110" cy="110" r="50" stroke="#0071E3" strokeWidth="14" strokeOpacity="0.15" fill="none" />
              <circle 
                cx="110" cy="110" r="50" 
                stroke="#0071E3" strokeWidth="14" strokeLinecap="round" fill="none"
                strokeDasharray="314.15"
                strokeDashoffset={314.15 - (314.15 * 0.98)}
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* CENTER ICON & VALUE */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center mb-1 text-white shadow-md transition-colors"
                style={{ backgroundColor: active.color }}
              >
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">{active.value}</span>
              <span className="text-[10px] text-[#86868B] font-semibold">{active.badge}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-5 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#FF2D55]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D55]"></span> Cardio
            </span>
            <span className="flex items-center gap-1.5 text-[#34C759]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]"></span> Flow
            </span>
            <span className="flex items-center gap-1.5 text-[#0071E3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]"></span> Oxygen
            </span>
          </div>
        </motion.div>

        {/* RIGHT: INTERACTIVE CARDS */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(metrics).map(([key, data]) => {
            const isSelected = activeMetric === key;
            return (
              <motion.div
                key={key}
                onClick={() => setActiveMetric(key)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`apple-card p-6 cursor-pointer border transition-all ${
                  isSelected 
                    ? 'border-[#0071E3] bg-white ring-2 ring-[#0071E3]/20 shadow-md' 
                    : 'border-black/[0.05] bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">{data.title}</span>
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: data.color }}
                  ></div>
                </div>

                <div className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{data.value}</div>
                <div className="text-xs font-medium text-[#86868B] mt-0.5">{data.sub}</div>

                <p className="text-xs text-[#86868B] mt-3 pt-3 border-t border-black/[0.04] leading-relaxed">
                  {data.desc}
                </p>

                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold" style={{ color: data.color }}>
                  <span>{data.badge}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
