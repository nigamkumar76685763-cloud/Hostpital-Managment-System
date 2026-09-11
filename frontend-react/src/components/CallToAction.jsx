import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function CallToAction({ onOpenBooking }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="apple-card p-10 sm:p-14 bg-gradient-to-br from-[#1D1D1F] via-[#111113] to-[#0A0A0C] text-white text-center relative overflow-hidden shadow-2xl"
    >
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#0071E3]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FF2D55]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white tracking-wide">
          <Heart className="w-3.5 h-3.5 text-[#FF2D55] fill-[#FF2D55]" />
          <span>Care at the Speed of Life</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
          Ready to experience <br />
          <span className="bg-gradient-to-r from-[#0071E3] via-[#34C759] to-[#64D2FF] bg-clip-text text-transparent">
            seamless healthcare?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
          Reserve in-clinic slots with leading medical specialists today. 100% digital tokens, zero hospital queues, and comprehensive digital care records.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="apple-pill w-full sm:w-auto px-8 py-4 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,113,227,0.45)] transition hover:scale-105"
          >
            <Calendar className="w-4 h-4" /> Book Clinic Consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5 text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#34C759]" /> Zero Cancellation Penalty
          </span>
          <span>•</span>
          <span>Instant Token Generation</span>
          <span>•</span>
          <span>NMC Verified Doctors</span>
        </div>
      </div>
    </motion.section>
  );
}
