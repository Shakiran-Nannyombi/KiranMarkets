import React, { useState } from 'react';
import { Sparkles, Calendar, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onScrollToNova: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onScrollToNova }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#0A2540]/10 text-[#0A2540] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-sm bg-[#0066FF] flex items-center justify-center font-extrabold text-white text-lg shadow-md">
            K
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight uppercase text-[#0A2540]">
              Kiran<span className="text-[#0066FF]">Markets</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#0A2540]/70">
          <button onClick={() => scrollToSection('services')} className="hover:text-[#0066FF] transition-colors">
            Services
          </button>

          <button 
            onClick={onScrollToNova}
            className="flex items-center gap-1.5 text-[#0066FF] hover:text-[#0A2540] transition-colors font-bold group"
          >
            <Sparkles className="w-4 h-4 text-[#0066FF] group-hover:rotate-12 transition-transform" />
            <span>Nova AI Strategy</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
            </span>
          </button>

          <button onClick={() => scrollToSection('case-studies')} className="hover:text-[#0066FF] transition-colors">
            Case Studies
          </button>

          <button onClick={() => scrollToSection('process')} className="hover:text-[#0066FF] transition-colors">
            Process
          </button>

          <button onClick={() => scrollToSection('roi-calculator')} className="hover:text-[#0066FF] transition-colors">
            ROI Calculator
          </button>
        </nav>

        {/* Header CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2 bg-[#0A2540] hover:bg-[#0066FF] text-white text-sm font-bold rounded-sm transition-all shadow-md flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#0066FF]" />
            <span>Get Audit</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onScrollToNova}
            className="p-2 rounded-lg bg-[#0066FF]/20 text-[#60A5FA] border border-[#0066FF]/30 text-xs font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Nova</span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A2540] border-b border-white/10 px-4 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('services')}
            className="block w-full text-left py-2 text-gray-200 hover:text-white font-medium text-base"
          >
            Services Architecture
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToNova();
            }}
            className="flex items-center justify-between w-full text-left py-2 text-[#60A5FA] font-semibold text-base"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0066FF]" /> AI Strategy Audit (Nova)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Live</span>
          </button>
          <button
            onClick={() => scrollToSection('case-studies')}
            className="block w-full text-left py-2 text-gray-200 hover:text-white font-medium text-base"
          >
            Proof & Case Studies
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="block w-full text-left py-2 text-gray-200 hover:text-white font-medium text-base"
          >
            Our Process
          </button>
          <button
            onClick={() => scrollToSection('roi-calculator')}
            className="block w-full text-left py-2 text-gray-200 hover:text-white font-medium text-base"
          >
            B2B Growth ROI Calculator
          </button>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
