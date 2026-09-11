import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Smartphone, Pill, Video, CheckCircle2, Lock, Sparkles, QrCode } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section className="space-y-8 pt-8">
      {/* SECTION HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider shadow-sm">
          <span>Architected for Precision</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
          Built like no other <br className="hidden sm:inline" />
          <span className="text-[#0071E3]">hospital management system.</span>
        </h2>
        <p className="text-sm text-[#86868B]">
          Engineered from ground up with modern distributed systems, military-grade privacy, and clinical speed.
        </p>
      </motion.div>

      {/* APPLE BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* BENTO CARD 1: 2-COLUMN SPAN - AI SMART TRIAGE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 apple-card p-8 bg-gradient-to-br from-white via-white to-blue-50/40 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider block">Intelligent OPD Router</span>
            <h3 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight">
              Instant Clinical Symptom Triage.
            </h3>
            <p className="text-sm text-[#86868B] max-w-lg leading-relaxed">
              Our neural triage algorithms match symptoms directly with the most qualified sub-specialist in 10 seconds, eliminating misdirected appointments and OPD delays.
            </p>
          </div>

          {/* SIMULATED TRIAGE INTERFACE */}
          <div className="mt-8 bg-white rounded-2xl p-4 border border-black/[0.06] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#34C759] animate-ping"></div>
              <span className="text-xs font-medium text-[#1D1D1F]">
                Input: <em className="text-[#0071E3]">"Mild arrhythmia after workout"</em>
              </span>
            </div>
            <span className="apple-pill bg-blue-50 text-[#0071E3] text-[11px] font-semibold px-3 py-1 border border-blue-100">
              Matched: Dr. Rahul Verma (Electrophysiology)
            </span>
          </div>
        </motion.div>

        {/* BENTO CARD 2: ZERO QUEUE QR TOKEN */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="apple-card p-8 bg-white flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#34C759] uppercase tracking-wider block">Seamless Check-In</span>
            <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">Zero-Queue Digital Token.</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Arrive at the clinic, scan your Apple Wallet or digital pass, and walk straight into the physician's suite.
            </p>
          </div>

          <div className="mt-6 bg-[#F5F5F7] rounded-2xl p-4 text-center">
            <span className="text-[10px] text-[#86868B] uppercase font-semibold">Active Hospital Token</span>
            <div className="text-3xl font-bold font-mono text-[#1D1D1F] mt-1">#A-042</div>
            <span className="text-[10px] text-[#34C759] font-medium block mt-0.5">2 Patients Ahead (~7 Mins)</span>
          </div>
        </motion.div>

        {/* BENTO CARD 3: ENCRYPTED HEALTH VAULT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="apple-card p-8 bg-white flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5856D6]/10 text-[#5856D6] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#5856D6] uppercase tracking-wider block">Privacy Core</span>
            <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">Encrypted Health Vault.</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              AES-256 encrypted diagnostic records. Only you and your authorized physician have decryption keys.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#5856D6] bg-purple-50 px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4" /> HIPAA & ABDM Certified
          </div>
        </motion.div>

        {/* BENTO CARD 4: EXPRESS LAB & PHARMACY */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="apple-card p-8 bg-white flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF9500]/10 text-[#FF9500] flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#FF9500] uppercase tracking-wider block">Pharma Dispatch</span>
            <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">Doorstep Medicines & Labs.</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Digital e-prescriptions routed automatically to our licensed hospital pharmacy for 45-min delivery.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-[#86868B] border-t border-black/[0.04] pt-3">
            <span>Avg Dispatch Time</span>
            <strong className="text-[#1D1D1F]">38 Minutes</strong>
          </div>
        </motion.div>

        {/* BENTO CARD 5: 24/7 TELEHEALTH */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="apple-card p-8 bg-white flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF2D55]/10 text-[#FF2D55] flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#FF2D55] uppercase tracking-wider block">Virtual Care</span>
            <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">Instant HD Video Consults.</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Can't make it to clinic? Connect via encrypted high-definition video with on-duty emergency physicians.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-[#86868B] border-t border-black/[0.04] pt-3">
            <span>Availability</span>
            <strong className="text-[#34C759]">24 Hours / 7 Days</strong>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
