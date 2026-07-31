import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Mail, Building, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { BookingFormData, DiscoveryContext, StrategyHook } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditData?: DiscoveryContext;
  selectedHooks?: StrategyHook[];
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  auditData,
  selectedHooks,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    companyName: '',
    preferredDate: '',
    preferredTime: '10:00 AM EST',
    projectBrief: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill if Nova session provided audit data
  useEffect(() => {
    if (auditData) {
      const briefParts = [];
      if (auditData.productService) briefParts.push(`Product/Service: ${auditData.productService}`);
      if (auditData.targetAudience) briefParts.push(`Target Audience: ${auditData.targetAudience}`);
      if (auditData.channelsAndBudget) briefParts.push(`Channels & Budget: ${auditData.channelsAndBudget}`);
      if (auditData.growthBottleneck) briefParts.push(`Primary Bottleneck: ${auditData.growthBottleneck}`);

      setFormData((prev) => ({
        ...prev,
        companyName: auditData.productService || prev.companyName,
        projectBrief: briefParts.join('\n'),
      }));
    }
  }, [auditData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const timeSlots = [
    '09:00 AM EST',
    '10:30 AM EST',
    '01:00 PM EST',
    '02:30 PM EST',
    '04:00 PM EST'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#D0E2FF] max-h-[92vh] overflow-y-auto text-[#0A2540]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoImg}
                alt="Kiran Markets Logo"
                className="w-12 h-12 rounded-xl bg-[#0A2540] object-contain p-1.5 shadow-md border border-[#0A2540]/10"
              />
              <div>
                <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" /> Deep-Dive Strategy Session
                </span>
                <h3 className="text-2xl font-extrabold text-[#0A2540]">
                  Schedule Strategy Call with Kiran
                </h3>
                <p className="text-xs text-gray-500">Founder & Principal Web Strategist at Kiran Markets</p>
              </div>
            </div>

            {/* Nova Audit Sync Notification if available */}
            {auditData && auditData.productService && (
              <div className="mb-6 p-4 rounded-xl bg-[#F0F5FF] border border-[#D0E2FF] flex items-start gap-3 text-xs text-[#0A2540]">
                <Sparkles className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-0.5">Nova Audit Brief Connected:</strong>
                  <span>Your responses regarding <strong className="font-semibold">{auditData.productService}</strong> have been pre-loaded into Kiran's briefing package.</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Work Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="s.jenkins@company.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs"
                    />
                  </div>
                </div>

              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company / Organization *</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Acme Enterprise Inc."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-xs"
                  />
                </div>
              </div>

              {/* Date & Time Slot Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Call Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0066FF] outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Time Slot *</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#0066FF] outline-none text-xs bg-white"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Brief / Custom Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Growth Bottlenecks / Notes</label>
                <textarea
                  rows={3}
                  value={formData.projectBrief}
                  onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                  placeholder="Tell Kiran about your growth goals or specific questions..."
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#0066FF] outline-none text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm transition-all shadow-lg shadow-[#0066FF]/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Confirming Appointment...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Lock In Consultation with Kiran</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                Strict Privacy Policy • No hard sales pitch • 100% executive strategic value
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Consultation Confirmed</span>
              <h3 className="text-2xl font-extrabold text-[#0A2540]">Strategy Call Locked In!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <strong className="text-[#0A2540]">{formData.fullName}</strong>. Kiran has received your booking request for <strong className="text-[#0066FF]">{formData.companyName}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F0F5FF] border border-[#D0E2FF] text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-[#D0E2FF] pb-2 font-bold text-[#0A2540]">
                <span>Host:</span>
                <span>Kiran (Founder, Kiran Markets)</span>
              </div>
              <div className="flex justify-between border-b border-[#D0E2FF] pb-2">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-semibold text-[#0066FF]">{formData.preferredDate || 'Upcoming Date'} @ {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Calendar Invite Sent to:</span>
                <span className="font-semibold text-[#0A2540]">{formData.email}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              A calendar invite and Zoom video link have been dispatched to your inbox.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0A2540] text-white font-semibold text-xs hover:bg-[#0066FF] transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
