import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NovaAgentContainer } from './components/NovaAgentContainer';
import { ServicesOverview } from './components/ServicesOverview';
import { TrustProofSection } from './components/TrustProofSection';
import { RoiCalculator } from './components/RoiCalculator';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { DiscoveryContext, StrategyHook } from './types';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [auditData, setAuditData] = useState<DiscoveryContext | undefined>();
  const [strategyHooks, setStrategyHooks] = useState<StrategyHook[] | undefined>();

  const handleOpenConsultation = (data?: DiscoveryContext, hooks?: StrategyHook[]) => {
    if (data) setAuditData(data);
    if (hooks) setStrategyHooks(hooks);
    setIsConsultationOpen(true);
  };

  const handleScrollToNova = () => {
    const el = document.getElementById('nova-agent-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#0066FF] selection:text-white">
      {/* Top Announcement Bar */}
      <div className="bg-[#061826] text-white py-2 px-4 text-center text-xs font-semibold border-b border-white/10 flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#0066FF] text-white text-[10px] uppercase font-bold">New Feature</span>
        <span>Meet Nova: Conduct an Instant B2B Marketing Audit in 5 Minutes</span>
        <button
          onClick={handleScrollToNova}
          className="underline text-[#60A5FA] hover:text-white ml-1 transition-colors"
        >
          Launch Audit →
        </button>
      </div>

      {/* Main Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onScrollToNova={handleScrollToNova}
      />

      <main>
        {/* Section 1: Hero */}
        <Hero
          onScrollToNova={handleScrollToNova}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Section 2: Embedded Agent Container (Nova) */}
        <NovaAgentContainer
          onOpenConsultation={(data, hooks) => handleOpenConsultation(data, hooks)}
        />

        {/* Section 3: Services Overview (4 Core Service Cards) */}
        <ServicesOverview
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Section 4: Trust Signals & Social Proof (Case Studies, Testimonials, 4-Step Process) */}
        <TrustProofSection
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Section 5: B2B Growth ROI Calculator */}
        <RoiCalculator
          onOpenConsultation={() => handleOpenConsultation()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onScrollToNova={handleScrollToNova}
      />

      {/* Booking Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        auditData={auditData}
        selectedHooks={strategyHooks}
      />
    </div>
  );
}
