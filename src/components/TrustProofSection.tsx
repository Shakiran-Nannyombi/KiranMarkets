import React, { useState } from 'react';
import { ShieldCheck, Award, Star, ArrowUpRight, CheckCircle2, Building2, Quote, ChevronRight } from 'lucide-react';
import { CASE_STUDIES, TESTIMONIALS, PROCESS_TIMELINE } from '../data/agencyData';

interface TrustProofSectionProps {
  onOpenConsultation: () => void;
}

export const TrustProofSection: React.FC<TrustProofSectionProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCaseStudies = activeTab === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.industry.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="case-studies" className="py-24 bg-[#0A2540] text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0066FF]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#38BDF8]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 text-[#60A5FA] border border-[#0066FF]/30 font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
            <span>Verified Results & Executive Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Data-Backed Proof, Not Agency Promises
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Explore how we partnered with enterprise SaaS, FinTech, and HealthTech organizations to engineer high-velocity revenue growth.
          </p>
        </div>

        {/* Case Studies Filter Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all' ? 'bg-[#0066FF] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Case Studies
            </button>
            <button
              onClick={() => setActiveTab('saas')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'saas' ? 'bg-[#0066FF] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Enterprise SaaS
            </button>
            <button
              onClick={() => setActiveTab('fintech')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'fintech' ? 'bg-[#0066FF] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              FinTech
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'health' ? 'bg-[#0066FF] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              HealthTech
            </button>
          </div>
        </div>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {filteredCaseStudies.map((study) => (
            <div
              key={study.id}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-[#0066FF]/50 transition-all duration-300 group"
            >
              <div>
                {/* Industry & Metric Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-300 border border-white/10">
                    {study.industry}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#60A5FA] block">{study.heroMetric}</span>
                    <span className="text-[10px] text-gray-400 font-medium block">{study.heroMetricLabel}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#60A5FA] transition-colors leading-snug">
                  {study.headline}
                </h3>
                <p className="text-xs text-gray-400 font-semibold mb-6 uppercase tracking-wider">
                  Client: {study.clientName}
                </p>

                {/* Challenge & Solution */}
                <div className="space-y-3 text-xs text-gray-300 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                  <div>
                    <strong className="text-white block font-semibold mb-1">The Bottleneck:</strong>
                    <span className="text-gray-400">{study.challenge}</span>
                  </div>
                  <div>
                    <strong className="text-[#60A5FA] block font-semibold mb-1">Kiran Markets Strategy:</strong>
                    <span className="text-gray-300">{study.solution}</span>
                  </div>
                </div>

                {/* Key Results */}
                <div className="space-y-2 mb-8">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Verified Impacts:</span>
                  {study.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Action */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] bg-[#0066FF]/20 text-[#60A5FA] border border-[#0066FF]/30">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#0066FF] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <span>Request Similar Case Brief</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Client Testimonials Section */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] block mb-2">Executive Endorsements</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Trusted by C-Suite B2B Leaders</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between relative"
              >
                <Quote className="w-8 h-8 text-[#0066FF]/40 mb-4" />

                <p className="text-sm text-gray-200 leading-relaxed italic mb-8">
                  "{test.quote}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <img
                    src={test.avatarUrl}
                    alt={test.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0066FF]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm truncate">{test.author}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                        {test.metric}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{test.title}</p>
                    <p className="text-[11px] text-[#60A5FA] font-medium truncate">{test.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Strategy Process Timeline Section */}
        <div id="process" className="mt-24 pt-20 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">Our Execution Blueprint</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              The 4-Step Revenue Architecture Process
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              From initial Nova AI discovery audit to full-funnel multi-touch execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_TIMELINE.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#0066FF]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#0066FF] group-hover:text-[#60A5FA] transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phase</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-[#60A5FA] font-semibold mb-3">{step.subtitle}</p>
                  <p className="text-xs text-gray-300 leading-relaxed mb-6">{step.description}</p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Deliverables:</span>
                    {step.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <ChevronRight className="w-3 h-3 text-[#0066FF]" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
