import React from 'react';
import { Sparkles, Heart, Activity, CheckCircle2, Phone, Play, Stethoscope } from 'lucide-react';

export default function HeroSection({ onBookClick }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-2 pb-6">
      {/* MESH GRADIENT HERO CARD */}
      <div className="hero-mesh rounded-[36px] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
        
        {/* BACKGROUND AMBIENT HIGHLIGHTS */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            {/* TAG */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[11px] font-bold tracking-widest uppercase text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Premium Healthcare 24/7</span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Your Trusted <br />
              Partner in <br />
              Modern Healthcare
            </h1>

            {/* DESCRIPTION */}
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              At MediCare+, we combine advanced medical technology with genuine compassion to deliver exceptional care that transforms lives across every generation.
            </p>

            {/* FLOATING GLASS STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* STAT CARD 1 */}
              <div className="glass-card-hero rounded-2xl p-4 text-white">
                <span className="text-[11px] font-semibold text-white/80 block">Fast Appointments</span>
                <div className="text-3xl font-extrabold text-white mt-0.5">96%</div>
                <p className="text-[11px] text-white/80 mt-1 leading-snug">
                  Patient satisfaction rate across all verified OPD and emergency departments.
                </p>
              </div>

              {/* STAT CARD 2 */}
              <div className="glass-card-hero rounded-2xl p-4 text-white flex flex-col justify-between">
                <div className="flex items-center -space-x-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-900">JD</div>
                  <div className="w-7 h-7 rounded-full bg-pink-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-pink-900">SA</div>
                  <div className="w-7 h-7 rounded-full bg-emerald-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-900">MK</div>
                  <div className="w-7 h-7 rounded-full bg-purple-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-purple-900">+</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">10K+ Active Patients</div>
                  <p className="text-[11px] text-white/80">Trust our board-certified clinics</p>
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="px-7 py-3.5 rounded-full bg-white text-blue-600 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-lg shadow-black/10 transition hover:scale-105"
              >
                Schedule Appointment Now
              </button>
            </div>
          </div>

          {/* RIGHT DOCTOR HERO IMAGE & FLOATING EQUIPMENT CARDS */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* FLOATING EQUIPMENT CARD 1 (Top Right) */}
            <div className="absolute top-2 right-2 bg-white/95 rounded-2xl p-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5 z-20 hidden sm:flex">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="text-left pr-2">
                <span className="text-[11px] font-bold text-slate-900 block">Digital Stethoscope</span>
                <span className="text-[9px] text-slate-500 font-medium">Telemetry v4.2</span>
              </div>
            </div>

            {/* FLOATING EQUIPMENT CARD 2 (Middle Right) */}
            <div className="absolute top-20 -right-2 bg-white/95 rounded-2xl p-2.5 shadow-lg border border-slate-100 flex items-center gap-2 z-20 hidden sm:flex">
              <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
                <Play className="w-3.5 h-3.5 fill-pink-600" />
              </div>
              <div className="text-left pr-2">
                <span className="text-[10px] font-bold text-slate-900 block">Live Monitoring</span>
                <span className="text-[9px] text-emerald-600 font-bold">● Active 72 BPM</span>
              </div>
            </div>

            {/* MAIN DOCTOR PHOTO */}
            <div className="relative z-10 max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=85"
                alt="Head Doctor"
                className="w-full h-auto object-cover max-h-[460px]"
              />
            </div>

            {/* EMERGENCY HOTLINE STRIP (Bottom) */}
            <div className="mt-4 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-2.5 shadow-xl border border-white/50 flex items-center gap-3 z-20">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">24/7 Emergency Care</span>
                <strong className="text-xs text-blue-700 font-extrabold">1-800-MEDICARE</strong>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TICKER RIBBON BELOW HERO */}
      <div className="mt-6 overflow-hidden py-3 opacity-30 select-none">
        <div className="animate-ticker text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-slate-500 whitespace-nowrap">
          <span>MEDICARE PLUS ✦ EXCELLENCE IN CARE ✦ VERIFIED CLINICS ✦ ADVANCED DIAGNOSTICS ✦ MEDICARE PLUS ✦ EXCELLENCE IN CARE ✦ VERIFIED CLINICS ✦ ADVANCED DIAGNOSTICS ✦ </span>
          <span>MEDICARE PLUS ✦ EXCELLENCE IN CARE ✦ VERIFIED CLINICS ✦ ADVANCED DIAGNOSTICS ✦ MEDICARE PLUS ✦ EXCELLENCE IN CARE ✦ VERIFIED CLINICS ✦ ADVANCED DIAGNOSTICS ✦ </span>
        </div>
      </div>
    </section>
  );
}
