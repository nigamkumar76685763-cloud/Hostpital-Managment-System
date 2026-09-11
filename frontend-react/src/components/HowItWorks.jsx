import React from 'react';
import { motion } from 'framer-motion';
import { Search, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenBooking }) {
  const steps = [
    {
      step: '01',
      title: 'Find Your Specialist',
      desc: 'Browse verified medical profiles with patient ratings, real OPD hours, and consultation fees.',
      icon: Search,
      color: '#0071E3',
    },
    {
      step: '02',
      title: 'Reserve Guaranteed Slot',
      desc: 'Select your preferred date & time. Get instant confirmation without token queues or advance fees.',
      icon: CalendarCheck,
      color: '#5856D6',
    },
    {
      step: '03',
      title: 'Walk In & Consult',
      desc: 'Show your digital token at the clinic reception. Walk directly into the consultation suite within 10 minutes.',
      icon: CheckCircle2,
      color: '#34C759',
    },
  ];

  return (
    <section className="space-y-8 pt-8">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider shadow-sm">
          <span>Effortless Patient Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
          Three steps to <br className="hidden sm:inline" />
          <span className="text-[#0071E3]">world-class medical care.</span>
        </h2>
      </motion.div>

      {/* STEPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="apple-card p-8 bg-white relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-bold font-mono text-black/10 group-hover:text-[#1D1D1F]/20 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#86868B] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs font-semibold text-[#0071E3]">
                <span>Step {item.step} Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
