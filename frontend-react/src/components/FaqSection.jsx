import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does digital slot reservation guarantee zero waiting time?',
      a: 'AuraCare synchronizes with the doctor’s live clinic consultation queue. When you book a 2:30 PM slot, the system reserves a dedicated 20-minute window and assigns a pre-generated token. As long as you arrive 5 minutes prior, you proceed straight into the physician’s room.',
    },
    {
      q: 'Can I cancel or reschedule my appointment slot?',
      a: 'Yes, absolutely. You can cancel or reschedule any upcoming appointment directly from your "My Records & Visits" patient portal with zero penalty fees up to 1 hour before the scheduled time.',
    },
    {
      q: 'Are all doctors on AuraCare verified by medical councils?',
      a: 'Every practicing doctor on our platform is verified through the National Medical Commission (NMC) and respective state medical councils with mandatory license and malpractice history vetting.',
    },
    {
      q: 'Is my personal health data and prescription history private?',
      a: 'AuraCare employs AES-256 end-to-end encryption compliant with HIPAA and India’s Ayushman Bharat Digital Mission (ABDM). Your medical records cannot be accessed by third parties without your explicit OTP consent.',
    },
    {
      q: 'What should I do in case of a medical emergency?',
      a: 'For life-threatening emergencies, please call our 24/7 dedicated trauma hotline at 1800-800-HELP or click "Request Rapid Ambulance" to dispatch a GPS-enabled mobile ICU unit to your location.',
    },
  ];

  return (
    <section className="space-y-8 pt-8 max-w-3xl mx-auto">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider shadow-sm">
          <span>Common Inquiries</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F]">
          Frequently asked questions.
        </h2>
      </motion.div>

      {/* ACCORDION */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="apple-card bg-white overflow-hidden border border-black/[0.05]"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-[#86868B] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'transform rotate-180 text-[#0071E3]' : ''
                  }`} 
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-xs sm:text-sm text-[#86868B] leading-relaxed border-t border-black/[0.04] pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
