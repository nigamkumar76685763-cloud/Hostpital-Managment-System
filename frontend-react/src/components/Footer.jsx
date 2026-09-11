import React from 'react';
import { Plus, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0A101D] text-slate-400 text-xs mt-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* COL 1: BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
                <Plus className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                MediCare<span className="text-blue-500">+</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Committed to excellence in every interaction. Providing patient-centered clinical care, 24/7 emergency response, and certified doctors across every generation.
            </p>
            <div className="text-[11px] text-slate-500">
              National Medical Commission (NMC) & NABH Accredited
            </div>
          </div>

          {/* COL 2: QUICK LINKS */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition">Our Services</a></li>
              <li><a href="#doctors" className="hover:text-white transition">Find Doctors</a></li>
              <li><a href="#booking" className="hover:text-white transition">Book Appointment</a></li>
              <li><a href="#contact" className="hover:text-white transition">Emergency 24/7</a></li>
            </ul>
          </div>

          {/* COL 3: SERVICES */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition">Cardiology</a></li>
              <li><a href="#services" className="hover:text-white transition">Neurology</a></li>
              <li><a href="#services" className="hover:text-white transition">Orthopedics</a></li>
              <li><a href="#services" className="hover:text-white transition">Pediatrics</a></li>
              <li><a href="#services" className="hover:text-white transition">Emergency Care</a></li>
            </ul>
          </div>

          {/* COL 4: CONTACT & OPERATING HOURS */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">Contact Us</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>1200 Healthcare Blvd, Metro Medical Wing</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="text-white font-bold">1-800-MEDICARE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>contact@medicareplus.com</span>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[10px]">
              <span className="text-emerald-400 font-bold block mb-0.5">● Emergency 24/7 Open</span>
              <span>General OPD: Mon-Sat 8am - 9pm</span>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; 2026 MediCare+ Hospital Network. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
