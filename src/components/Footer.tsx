import React, { useState } from 'react';
import { ArrowUpRight, Shield, Mail, MapPin, Phone, CheckCircle2, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onScrollToNova: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onScrollToNova }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#061826] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#0066FF] to-[#00A3FF] flex items-center justify-center font-bold text-white text-lg">
                K
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Kiran<span className="text-[#0066FF]">Markets</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Kiran Markets is a high-end B2B strategic marketing agency. We partner with enterprise technology, FinTech, and healthcare software leaders to engineer predictable revenue engines and carve out market leadership.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Grade Privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
                <span>AI Strategy Enabled</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">Capabilities</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">Brand Positioning Architecture</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Multi-Touch Growth Engine</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Paid Acquisition & Demand Gen</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Lifecycle & CRM Automation</a></li>
            </ul>
          </div>

          {/* Agency Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">Strategy & Proof</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={onScrollToNova} className="hover:text-white transition-colors">Nova AI Audit Engine</button></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">Verified Case Studies</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">4-Step Revenue Process</a></li>
              <li><a href="#roi-calculator" className="hover:text-white transition-colors">B2B Growth ROI Calculator</a></li>
            </ul>
          </div>

          {/* Newsletter / Executive Briefing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">The Executive Briefing</h4>
            <p className="text-xs text-gray-400">Receive bi-weekly B2B growth playbooks & positioning teardowns written by founder Kiran.</p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-gray-500 outline-none focus:border-[#0066FF]"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs transition-colors"
                >
                  Subscribe Briefing
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            )}
          </div>

        </div>

        {/* Global Offices */}
        <div className="py-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0066FF]" />
            <span className="font-semibold text-white">Global Headquarters:</span>
            <span>New York • San Francisco • London</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Inquiries: <strong className="text-white font-medium">hello@kiranmarkets.com</strong></span>
            <span>Direct Strategy Line: <strong className="text-white font-medium">+1 (800) 480-KIRAN</strong></span>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Kiran Markets LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Security Brief</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
