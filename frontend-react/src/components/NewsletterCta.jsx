import React, { useState } from 'react';
import { Send, CheckCircle, Clock, Heart, Bed, ShieldCheck } from 'lucide-react';

export default function NewsletterCta() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="hero-mesh rounded-[36px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        
        {/* TOP ROW: HEADLINE & SUBSCRIBE INPUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-white/20">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="glass-pill px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white inline-block">
              Stay Ahead of Your Health Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Get Expert Health Tips <br />
              Delivered to Your Inbox
            </h2>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg leading-relaxed font-normal">
              Subscribe to our monthly clinical newsletter covering preventive medicine, pediatric advice, cardiology insights, and verified lifestyle tips.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card-hero rounded-2xl p-4 sm:p-5">
              {subscribed ? (
                <div className="flex items-center gap-2 text-white text-xs font-bold py-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span>Thank you! You are subscribed to MediCare+ health tips.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-medium rounded-xl px-4 py-3 outline-none shadow-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs tracking-wider uppercase transition shadow-md"
                  >
                    Subscribe Now
                  </button>
                  <p className="text-[10px] text-white/70 text-center pt-1">
                    No spam. Encrypted database. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* BOTTOM METRICS ROW INSIDE GRADIENT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 text-center sm:text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">&lt; 8 min</div>
            <div className="text-[11px] text-white/80 uppercase font-semibold mt-0.5">Emergency Response</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">24/7</div>
            <div className="text-[11px] text-white/80 uppercase font-semibold mt-0.5">Caring Specialists</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">120+</div>
            <div className="text-[11px] text-white/80 uppercase font-semibold mt-0.5">Modern ICU Beds</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">50M+</div>
            <div className="text-[11px] text-white/80 uppercase font-semibold mt-0.5">Health Consultations</div>
          </div>
        </div>

      </div>
    </section>
  );
}
