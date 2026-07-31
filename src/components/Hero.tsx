import React from 'react';
import { Sparkles, Calendar, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, BarChart3, Zap } from 'lucide-react';

interface HeroProps {
  onScrollToNova: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToNova, onOpenConsultation }) => {
  return (
    <section className="relative bg-[#0A2540] text-white pt-16 pb-24 overflow-hidden">
      {/* Subtle Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Radial Soft Light Highlights & Professional Polish Radar Rings */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0066FF]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0066FF]/20 to-transparent items-center justify-center pointer-events-none">
        <div className="w-56 h-56 border border-white/10 rounded-full flex items-center justify-center">
          <div className="w-36 h-36 border border-white/20 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border border-[#0066FF]/40 rounded-full" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Executive Tag */}
        <div className="flex justify-start sm:justify-center mb-4">
          <span className="text-[#0066FF] font-bold text-xs uppercase tracking-widest block bg-[#F0F5FF]/10 px-3.5 py-1.5 rounded-sm border border-[#0066FF]/30">
            Global B2B Strategy Agency
          </span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
            Architecting Market Leadership Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#0066FF] to-[#38BDF8]">Precision Strategy</span> & AI Innovation
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#F0F5FF]/80 font-normal leading-relaxed max-w-3xl mx-auto">
            Kiran Markets combines executive-level strategy with data-science to scale high-growth enterprises. Experience an instant discovery audit with <strong className="text-white font-bold">Nova</strong>, our resident AI Marketing Strategist.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScrollToNova}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-sky-200" />
              <span>Launch AI Strategy Audit with Nova</span>
              <ArrowRight className="w-5 h-5 text-white/80" />
            </button>

            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-sm bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/30 transition-all duration-200 backdrop-blur-md"
            >
              <Calendar className="w-5 h-5 text-[#60A5FA]" />
              <span>Book Call with Founder Kiran</span>
            </button>
          </div>

          {/* Guarantee / Value Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>5-Stage AI Discovery Session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero-Obligation Strategy Blueprint</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Executive Delivery in 5 Minutes</span>
            </div>
          </div>
        </div>

        {/* Executive Metric Cards Banner */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <div className="p-5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#0066FF]/40 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Campaign Performance</span>
              <TrendingUp className="w-5 h-5 text-[#0066FF] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">3.4x</div>
            <div className="text-xs text-gray-300 font-medium">Average Marketing Pipeline ROI</div>
          </div>

          <div className="p-5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#0066FF]/40 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Revenue Generated</span>
              <BarChart3 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">$140M+</div>
            <div className="text-xs text-gray-300 font-medium">Enterprise Pipeline Value Created</div>
          </div>

          <div className="p-5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#0066FF]/40 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Client Retention</span>
              <ShieldCheck className="w-5 h-5 text-[#60A5FA] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">98.4%</div>
            <div className="text-xs text-gray-300 font-medium">Annual Client Partner Retention</div>
          </div>

          <div className="p-5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#0066FF]/40 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Time to Market</span>
              <Zap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">14 Days</div>
            <div className="text-xs text-gray-300 font-medium">From Audit to Active Sprint Launch</div>
          </div>
        </div>

      </div>
    </section>
  );
};
