import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Siren, MapPin, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function EmergencyBanner() {
  const [dispatched, setDispatched] = useState(false);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="apple-card p-8 bg-gradient-to-r from-red-50 via-white to-white border border-red-200/60 shadow-lg relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* LEFT INFO */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2D55]/10 text-[#FF2D55] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF2D55] animate-ping"></span>
            <span>24/7 Level-1 Emergency & Trauma Care</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Urgent Medical Emergency?
          </h3>

          <p className="text-xs sm:text-sm text-[#86868B] max-w-xl leading-relaxed">
            Direct hotline to our trauma response unit. GPS-enabled ICU ambulances with paramedical staff dispatched within 3 minutes of confirmation.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1D1D1F] pt-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FF2D55]" /> Avg Ambulance ETA: <strong className="text-[#FF2D55]">7.5 Mins</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0071E3]" /> 18 Active Hospital Fleets
            </span>
          </div>
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
          <a
            href="tel:1800800911"
            className="apple-pill w-full sm:w-auto px-7 py-3.5 bg-[#FF2D55] hover:bg-[#FF375F] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,45,85,0.35)] transition"
          >
            <PhoneCall className="w-4 h-4" /> Call 1800-800-HELP
          </a>

          <button
            onClick={() => setDispatched(true)}
            disabled={dispatched}
            className={`apple-pill w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition border ${
              dispatched
                ? 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/30'
                : 'bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] border-black/[0.08] shadow-sm'
            }`}
          >
            <Siren className="w-4 h-4 text-[#FF2D55]" />
            {dispatched ? 'Ambulance Dispatched (ETA 7 min)' : 'Request Rapid Ambulance'}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
