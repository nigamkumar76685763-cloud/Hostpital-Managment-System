import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Vikram Malhotra',
      role: 'Heart Bypass Recovery Patient',
      doctor: 'Dr. Rahul Verma (Cardiology)',
      quote: 'Booking the slot took under 30 seconds. When I arrived at Apollo Block A, my digital token was already on the screen. Best hospital experience in 20 years.',
      rating: 5,
      date: '2 weeks ago',
    },
    {
      name: 'Sunita Mehra',
      role: 'Chronic Migraine Patient',
      doctor: 'Dr. Priya Sharma (Neurology)',
      quote: 'The doctor spent 45 unhurried minutes reviewing my MRI scans and sleep history. All digital prescriptions and follow-up lab tests were sent to my phone.',
      rating: 5,
      date: '1 month ago',
    },
    {
      name: 'Karan Singhania',
      role: 'ACL Knee Arthroscopy',
      doctor: 'Dr. Amitav Sen (Orthopedics)',
      quote: 'Zero waiting line. I checked in at 10:15 AM and was in Dr. Amitav’s cabin by 10:22 AM. Transparent fee and post-op physio roadmap provided right away.',
      rating: 5,
      date: '3 weeks ago',
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
          <span>Verified Patient Outcomes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
          Stories of healing and trust.
        </h2>
        <p className="text-sm text-[#86868B]">
          Read verified feedback from patients who booked in-clinic visits through AuraCare.
        </p>
      </motion.div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="apple-card p-7 bg-white flex flex-col justify-between"
          >
            <div>
              {/* STARS */}
              <div className="flex items-center gap-1 mb-4 text-[#FF9500]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF9500]" />
                ))}
              </div>

              {/* QUOTE */}
              <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed italic mb-6">
                "{rev.quote}"
              </p>
            </div>

            {/* PATIENT INFO */}
            <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-semibold text-xs text-[#1D1D1F]">{rev.name}</h4>
                  <CheckCircle className="w-3 h-3 text-[#0071E3] fill-[#0071E3]/20" />
                </div>
                <p className="text-[11px] text-[#86868B]">{rev.role}</p>
                <p className="text-[10px] text-[#0071E3] font-medium mt-0.5">{rev.doctor}</p>
              </div>

              <span className="text-[10px] text-[#86868B]">{rev.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
