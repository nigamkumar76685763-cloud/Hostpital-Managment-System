import React from 'react';
import { ArrowRight, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export default function ServicesSection({ onSelectService }) {
  const services = [
    {
      id: 'cardiology',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      tag: 'DEPARTMENT',
      title: 'Cardiology',
      desc: 'Comprehensive care from acute diagnosis to restorative surgery, catheterization, and advanced clinical care.',
    },
    {
      id: 'neurology',
      type: 'mesh-pink',
      tag: 'CLINICAL FOCUS',
      title: 'Neurology',
      desc: 'Modern care for complex brain, spine, and nervous system disorders through multidisciplinary therapy.',
    },
    {
      id: 'orthopedics',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      tag: 'DEPARTMENT',
      title: 'Orthopedics',
      desc: 'Advanced spine, joint and muscle treatment systems including arthroscopic procedures and recovery programs.',
    },
    {
      id: 'radiology',
      type: 'mesh-blue',
      tag: 'DIAGNOSTIC',
      title: 'Radiology',
      desc: 'High-definition 3T MRI, 128-slice CT scans, and digital imaging reporting with zero wait times.',
    },
    {
      id: 'pediatrics',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      tag: 'DEPARTMENT',
      title: 'Pediatrics',
      desc: 'Compassionate, dedicated care for infants, kids, and teens through specialized clinical wellness wings.',
    },
    {
      id: 'emergency',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80',
      tag: 'DEPARTMENT',
      title: 'Emergency Care',
      desc: '24/7 level-1 emergency and ICU units ready with instant surgical suites and mobile ambulance response.',
    },
  ];

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span className="w-2 h-0.5 bg-blue-600"></span>
            <span>Our Specialties</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Our Range of <br />
            Healthcare Services
          </h2>
        </div>

        <button 
          onClick={() => onSelectService('All')}
          className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 shadow-sm transition hover:bg-slate-50 self-start sm:self-auto"
        >
          View All Services
        </button>
      </div>

      {/* 6-CARD GRID (3x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item) => {
          if (item.type === 'mesh-pink') {
            return (
              <div 
                key={item.id}
                onClick={() => onSelectService(item.title)}
                className="mesh-purple-pink rounded-3xl p-7 text-white flex flex-col justify-between shadow-lg cursor-pointer hover:-translate-y-1 transition duration-300 min-h-[290px]"
              >
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/80 bg-white/20 px-2.5 py-1 rounded-full inline-block mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-white/90 leading-relaxed font-normal">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white pt-4">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          }

          if (item.type === 'mesh-blue') {
            return (
              <div 
                key={item.id}
                onClick={() => onSelectService(item.title)}
                className="mesh-blue-cyan rounded-3xl p-7 text-white flex flex-col justify-between shadow-lg cursor-pointer hover:-translate-y-1 transition duration-300 min-h-[290px]"
              >
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/80 bg-white/20 px-2.5 py-1 rounded-full inline-block mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-white/90 leading-relaxed font-normal">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white pt-4">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          }

          // Image card
          return (
            <div 
              key={item.id}
              onClick={() => onSelectService(item.title)}
              className="clean-card rounded-3xl p-5 flex flex-col justify-between cursor-pointer min-h-[290px]"
            >
              <div>
                <div className="rounded-2xl overflow-hidden h-36 mb-4 bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-blue-600 block mb-1">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 pt-3 border-t border-slate-100 mt-2">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
