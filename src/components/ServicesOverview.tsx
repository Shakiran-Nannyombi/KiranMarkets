import React, { useState } from 'react';
import { Compass, TrendingUp, Target, Cpu, ArrowRight, CheckCircle2, Sparkles, X, Clock, Layers } from 'lucide-react';
import { AGENCY_SERVICES } from '../data/agencyData';
import { ServiceCardData } from '../types';

interface ServicesOverviewProps {
  onOpenConsultation: () => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#0066FF]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#0066FF]" />;
      case 'Target':
        return <Target className="w-6 h-6 text-[#0066FF]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#0066FF]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0066FF]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white text-[#0A2540] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F5FF] text-[#0066FF] border border-[#D0E2FF] font-semibold text-xs uppercase tracking-wider">
            <span>Capabilities Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight">
            Full-Spectrum B2B Growth Services
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            We do not sell isolated tactics. We build integrated revenue engines designed for enterprise scale, velocity, and market authority.
          </p>
        </div>

        {/* 4 Core Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AGENCY_SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-[#0066FF]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#F0F5FF] border border-[#D0E2FF] flex items-center justify-center group-hover:bg-[#0066FF] transition-colors">
                    {React.cloneElement(getIcon(service.iconName), {
                      className: 'w-7 h-7 text-[#0066FF] group-hover:text-white transition-colors'
                    })}
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-[#0A2540] group-hover:text-[#0066FF] transition-colors block">
                      {service.metric}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                      {service.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Service Title & Desc */}
                <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#0066FF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Capabilities List */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100 mb-8">
                  {service.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <button
                onClick={() => setSelectedService(service)}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-[#F0F5FF] hover:bg-[#0066FF] text-[#0066FF] hover:text-white font-semibold text-sm transition-all duration-200 group/btn"
              >
                <span>Explore Service Architecture</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-[#0A2540] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold">Unsure which service mix matches your growth stage?</h4>
            <p className="text-sm text-gray-300">Run our 5-minute AI strategy audit with Nova or speak with founder Kiran.</p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm transition-all shadow-lg shadow-[#0066FF]/30 whitespace-nowrap"
          >
            Schedule Blueprint Session
          </button>
        </div>

      </div>

      {/* Service Deep-Dive Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#D0E2FF] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#F0F5FF] flex items-center justify-center">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider">Service Architecture</span>
                <h3 className="text-xl font-extrabold text-[#0A2540]">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              {selectedService.deepDive.overview}
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0066FF]" /> Deliverable Framework
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.deepDive.deliverables.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#F0F5FF] text-xs font-semibold text-[#0A2540] border border-[#D0E2FF] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1.5 font-bold text-[#0A2540]">
                    <Clock className="w-4 h-4 text-[#0066FF]" /> Typical Execution Velocity:
                  </span>
                  <span className="font-bold text-[#0066FF]">{selectedService.deepDive.typicalTimeline}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 text-xs text-gray-700">
                  <strong className="text-[#0A2540]">Verified Enterprise Impact:</strong> {selectedService.deepDive.impactCase}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-semibold"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenConsultation();
                }}
                className="px-5 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-bold shadow-md shadow-[#0066FF]/20"
              >
                Inquire for This Service
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
