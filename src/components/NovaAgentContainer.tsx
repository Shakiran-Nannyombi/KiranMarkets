import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, User, Bot, Check, ArrowRight, RefreshCw, Calendar, Download, Copy, Volume2, VolumeX, Shield, CheckCircle2 } from 'lucide-react';
import { ChatMessage, DiscoveryContext, StageNumber, StrategyHook } from '../types';
import { PRESET_PILLS } from '../data/agencyData';

interface NovaAgentContainerProps {
  onOpenConsultation: (auditData?: DiscoveryContext, hooks?: StrategyHook[]) => void;
}

export const NovaAgentContainer: React.FC<NovaAgentContainerProps> = ({ onOpenConsultation }) => {
  const [stage, setStage] = useState<StageNumber>(1);
  const [subStep, setSubStep] = useState<'audience' | 'channels' | 'bottleneck' | 'none'>('none');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');

  const [context, setContext] = useState<DiscoveryContext>({
    productService: '',
    targetAudience: '',
    channelsAndBudget: '',
    growthBottleneck: '',
    confirmedSummary: false,
  });

  const [generatedHooks, setGeneratedHooks] = useState<StrategyHook[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize Stage 1 message
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          id: 'msg-1',
          sender: 'nova',
          text: "Welcome to Kiran Markets. I'm Nova, your AI Marketing Strategist. What product, service, or business are you currently looking to market or scale?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          stage: 1,
          quickPills: PRESET_PILLS.stage1,
        },
      ]);
    }
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const addMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  const playNotificationSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      // AudioContext might be blocked until user gesture
    }
  };

  const handleUserInput = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const trimmed = text.trim();
    setInputText('');

    // Add user message to chat
    addMessage({
      sender: 'user',
      text: trimmed,
      stage,
    });

    setIsLoading(true);

    // Process state machine based on stage & subStep
    setTimeout(async () => {
      try {
        if (stage === 1) {
          // Received Product/Service -> Move to Stage 2, Step 1: Target Audience
          const updatedContext = { ...context, productService: trimmed };
          setContext(updatedContext);
          setStage(2);
          setSubStep('audience');

          addMessage({
            sender: 'nova',
            text: `Understood. Scaling ${trimmed} requires precise positioning. Who is your ideal customer or primary target audience?`,
            stage: 2,
            quickPills: PRESET_PILLS.stage2Audience,
          });
          playNotificationSound();
        } else if (stage === 2) {
          if (subStep === 'audience') {
            const updatedContext = { ...context, targetAudience: trimmed };
            setContext(updatedContext);
            setSubStep('channels');

            addMessage({
              sender: 'nova',
              text: `Got it—targeting ${trimmed}. What marketing channels are you using right now (e.g., social, ads, SEO, email), and what scale is your current monthly spend?`,
              stage: 2,
              quickPills: PRESET_PILLS.stage2Channels,
            });
            playNotificationSound();
          } else if (subStep === 'channels') {
            const updatedContext = { ...context, channelsAndBudget: trimmed };
            setContext(updatedContext);
            setSubStep('bottleneck');

            addMessage({
              sender: 'nova',
              text: `Thanks for detailing your active channels (${trimmed}). What is your single biggest growth bottleneck or main goal over the next 3 to 6 months?`,
              stage: 2,
              quickPills: PRESET_PILLS.stage2Bottleneck,
            });
            playNotificationSound();
          } else if (subStep === 'bottleneck') {
            const finalContext = { ...context, growthBottleneck: trimmed };
            setContext(finalContext);
            setSubStep('none');
            setStage(3);

            // Fetch synthesis from Server (Stage 3)
            try {
              const res = await fetch('/api/nova', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  stage: 3,
                  context: finalContext,
                }),
              });
              const data = await res.json();

              const synthesisMsg = data.message || 
                `You are scaling ${finalContext.productService} targeting ${finalContext.targetAudience} via ${finalContext.channelsAndBudget}. Your primary objective over the next 3-6 months is overcoming ${finalContext.growthBottleneck} to accelerate high-margin revenue.\n\nDoes this summarize your current focus accurately, or is there anything else I should know before we brainstorm?`;

              addMessage({
                sender: 'nova',
                text: synthesisMsg,
                stage: 3,
                isSynthesis: true,
                quickPills: ['Yes, that is completely accurate!', 'Looks good! Let us brainstorm.', 'Let me adjust my bottleneck details'],
              });
            } catch (err) {
              const fallbackMsg = `You are scaling ${finalContext.productService} targeting ${finalContext.targetAudience} via ${finalContext.channelsAndBudget}. Your primary objective over the next 3-6 months is overcoming ${finalContext.growthBottleneck} to accelerate high-margin revenue.\n\nDoes this summarize your current focus accurately, or is there anything else I should know before we brainstorm?`;
              addMessage({
                sender: 'nova',
                text: fallbackMsg,
                stage: 3,
                isSynthesis: true,
                quickPills: ['Yes, that is completely accurate!', 'Looks good! Let us brainstorm.'],
              });
            }
            playNotificationSound();
          }
        } else if (stage === 3) {
          // Received confirmation for Stage 3 -> Move to Stage 4 (Tailored Brainstorming)
          const updatedContext = { ...context, confirmedSummary: true };
          setContext(updatedContext);
          setStage(4);

          addMessage({
            sender: 'nova',
            text: "Excellent. Generating 3 tailored marketing campaign hooks based on your exact business profile...",
            stage: 4,
          });

          // Fetch Stage 4 Strategy Hooks from Server
          try {
            const res = await fetch('/api/nova', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                stage: 4,
                context: updatedContext,
              }),
            });
            const data = await res.json();
            const hooks: StrategyHook[] = data.strategies || [];
            setGeneratedHooks(hooks);

            addMessage({
              sender: 'nova',
              text: "Here are 3 high-impact marketing campaign hooks tailored specifically to your growth targets:",
              stage: 4,
              strategies: hooks,
            });

            // Transition to Stage 5 automatically with CTA
            setStage(5);
            setTimeout(() => {
              addMessage({
                sender: 'nova',
                text: "These strategic concepts are just starting points. To map out a complete execution plan and timeline, let's schedule a deep-dive strategy call with Kiran, our founder.",
                stage: 5,
              });
              playNotificationSound();
            }, 600);
          } catch (err) {
            console.error(err);
          }
        } else if (stage === 5 || stage === 4) {
          // Dynamic chat with Nova Agent using Gemini API
          try {
            const chatHistoryForApi = chatMessages.map((m) => ({
              sender: m.sender,
              text: m.text,
            }));

            const res = await fetch('/api/nova/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                messages: chatHistoryForApi,
                userMessage: trimmed,
              }),
            });
            const data = await res.json();
            const novaReply = data.reply || "I have recorded your additional notes. Click below to lock in your strategy consultation with Kiran.";

            addMessage({
              sender: 'nova',
              text: novaReply,
              stage: 5,
            });
          } catch (err) {
            addMessage({
              sender: 'nova',
              text: "I have recorded your additional notes. Click below to lock in your strategy consultation with Kiran.",
              stage: 5,
            });
          }
          playNotificationSound();
        }
      } catch (error) {
        console.error("Error in Nova stage flow:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleReset = () => {
    setStage(1);
    setSubStep('none');
    setContext({
      productService: '',
      targetAudience: '',
      channelsAndBudget: '',
      growthBottleneck: '',
      confirmedSummary: false,
    });
    setGeneratedHooks([]);
    setChatMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'nova',
        text: "Session reset. Welcome to Kiran Markets! What product, service, or business are you currently looking to market or scale?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        stage: 1,
        quickPills: PRESET_PILLS.stage1,
      },
    ]);
  };

  const copyBriefToClipboard = () => {
    const briefText = `KIRAN MARKETS - AI STRATEGY AUDIT BRIEF
Product/Service: ${context.productService || 'N/A'}
Target Audience: ${context.targetAudience || 'N/A'}
Channels & Spend: ${context.channelsAndBudget || 'N/A'}
Growth Bottleneck: ${context.growthBottleneck || 'N/A'}

STRATEGIC CAMPAIGN HOOKS:
${generatedHooks
  .map(
    (h, i) => `${i + 1}. ${h.title}\nStrategic Angle: ${h.strategicAngle}\nExpected Outcome: ${h.expectedOutcome}\nKPI: ${h.kpi}\n`
  )
  .join('\n')}`;

    navigator.clipboard.writeText(briefText);
    alert('Strategy Audit brief copied to clipboard!');
  };

  return (
    <section id="nova-agent-container" className="py-20 bg-[#F0F5FF] border-y border-[#D0E2FF] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A2540]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] font-semibold text-xs tracking-wide uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Strategy Audit Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            Meet <span className="text-[#0066FF]">Nova</span> — Your AI Marketing Strategist
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 font-normal">
            Conduct a real-time 5-stage strategic discovery session to audit your growth bottlenecks and unlock 2-3 tailored campaign blueprints.
          </p>
        </div>

        {/* Main Agent UI Box */}
        <div className="bg-white rounded-2xl shadow-2xl border border-[#D0E2FF] overflow-hidden flex flex-col h-[750px] max-h-[85vh]">
          
          {/* Agent Top Bar */}
          <div className="bg-[#0A2540] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#0066FF]/20">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-[#0066FF] to-[#0A2540] rounded-full flex items-center justify-center p-0.5 shadow-md">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-lg leading-none">Nova AI</h3>
                  <span className="bg-[#F0F5FF] text-[#0066FF] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    Instant Audit
                  </span>
                </div>
                <p className="text-xs text-[#F0F5FF]/70">Strategic Discovery Agent • Kiran Markets</p>
              </div>
            </div>

            {/* Stepper & Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                title={soundEnabled ? "Mute sound cues" : "Enable sound cues"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-gray-300 hover:text-white transition-colors border border-white/10"
                title="Reset session"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Stage Progress Stepper Bar */}
          <div className="bg-[#F8FAFC] px-4 py-3 border-b border-gray-200 flex items-center justify-between overflow-x-auto text-xs text-gray-500">
            <div className="flex items-center gap-2 sm:gap-4 min-w-max mx-auto">
              <div className={`flex items-center gap-1.5 font-medium ${stage >= 1 ? 'text-[#0066FF]' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${stage >= 1 ? 'bg-[#0066FF] text-white' : 'bg-gray-200 text-gray-600'}`}>1</span>
                <span>Discovery</span>
              </div>
              <span className="text-gray-300">→</span>

              <div className={`flex items-center gap-1.5 font-medium ${stage >= 2 ? 'text-[#0066FF]' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${stage >= 2 ? 'bg-[#0066FF] text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
                <span>Context</span>
                {stage === 2 && subStep !== 'none' && (
                  <span className="text-[10px] text-gray-400 capitalize">({subStep})</span>
                )}
              </div>
              <span className="text-gray-300">→</span>

              <div className={`flex items-center gap-1.5 font-medium ${stage >= 3 ? 'text-[#0066FF]' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${stage >= 3 ? 'bg-[#0066FF] text-white' : 'bg-gray-200 text-gray-600'}`}>3</span>
                <span>Synthesis</span>
              </div>
              <span className="text-gray-300">→</span>

              <div className={`flex items-center gap-1.5 font-medium ${stage >= 4 ? 'text-[#0066FF]' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${stage >= 4 ? 'bg-[#0066FF] text-white' : 'bg-gray-200 text-gray-600'}`}>4</span>
                <span>Brainstorming</span>
              </div>
              <span className="text-gray-300">→</span>

              <div className={`flex items-center gap-1.5 font-medium ${stage >= 5 ? 'text-emerald-600 font-bold' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${stage >= 5 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>5</span>
                <span>Consultation</span>
              </div>
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#F8FAFC]">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {msg.sender === 'nova' ? (
                    <div className="w-8 h-8 rounded-full bg-[#0A2540] flex items-center justify-center text-white shadow-md">
                      <Sparkles className="w-4 h-4 text-[#60A5FA]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white font-bold text-xs shadow-md">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div className={`space-y-3 max-w-xl ${msg.sender === 'user' ? 'items-end text-right' : 'items-start'}`}>
                  
                  {/* Bubble */}
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#0066FF] text-white rounded-tr-none'
                        : msg.isSynthesis
                        ? 'bg-[#F0F5FF] text-[#0A2540] border-2 border-[#0066FF]/30 rounded-tl-none font-medium'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Strategy Campaign Hooks Cards Output (Stage 4) */}
                  {msg.strategies && msg.strategies.length > 0 && (
                    <div className="mt-4 space-y-4 text-left w-full">
                      {msg.strategies.map((hook, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl bg-white border border-[#0066FF]/20 shadow-md hover:shadow-lg transition-all"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="font-extrabold text-[#0A2540] text-base flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#0066FF] text-white text-xs flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              {hook.title}
                            </h4>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 whitespace-nowrap">
                              {hook.kpi}
                            </span>
                          </div>

                          <div className="space-y-2 text-xs text-gray-700">
                            <div>
                              <strong className="text-[#0A2540] font-semibold">Strategic Angle:</strong>{' '}
                              <span>{hook.strategicAngle}</span>
                            </div>
                            <div className="pt-1 border-t border-gray-100 text-emerald-700 font-medium">
                              <strong className="text-emerald-900 font-semibold">Expected Outcome:</strong>{' '}
                              <span>{hook.expectedOutcome}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Brief Export & Copy Controls */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={copyBriefToClipboard}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:border-[#0066FF] text-xs font-semibold text-gray-700 transition-colors shadow-sm"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#0066FF]" />
                          <span>Copy Strategy Brief</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quick Pill Suggestions */}
                  {msg.quickPills && msg.quickPills.length > 0 && stage < 4 && (
                    <div className="flex flex-wrap gap-2 pt-1 text-left">
                      {msg.quickPills.map((pill, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleUserInput(pill)}
                          disabled={isLoading}
                          className="px-3 py-1.5 rounded-full bg-white hover:bg-[#F0F5FF] text-xs font-medium text-[#0A2540] border border-[#D0E2FF] hover:border-[#0066FF] transition-all shadow-sm hover:shadow active:scale-95"
                        >
                          + {pill}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-gray-400 block px-1">
                    {msg.sender === 'nova' ? 'Nova Strategist' : 'You'} • {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 items-center text-gray-400 text-xs font-medium">
                <div className="w-8 h-8 rounded-full bg-[#0A2540] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 text-[#60A5FA] animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-ping" />
                  <span>Nova is analyzing your growth profile...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Stage 5 Consultation Callout Banner if Stage >= 4 */}
          {stage >= 4 && (
            <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] text-white p-4 border-t border-[#0066FF]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Strategy Session Complete!</h4>
                  <p className="text-xs text-gray-300">Ready to execute these hooks with Kiran Markets?</p>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation(context, generatedHooks)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm transition-all shadow-lg shadow-[#0066FF]/40 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Call with Kiran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* User Input Form */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserInput(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  stage === 1
                    ? "Type your business/product name or offering..."
                    : stage === 2 && subStep === 'audience'
                    ? "Describe your target audience / ICP..."
                    : stage === 2 && subStep === 'channels'
                    ? "List your active channels & monthly budget..."
                    : stage === 2 && subStep === 'bottleneck'
                    ? "What is your main growth bottleneck or 3-6 month goal?"
                    : stage === 3
                    ? "Confirm or add details before brainstorming..."
                    : "Ask Nova a question or type details..."
                }
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 text-sm outline-none text-gray-900 placeholder:text-gray-400 bg-white"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-[#0A2540] hover:bg-[#0066FF] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#0066FF]" /> Enterprise Data Confidentiality Guaranteed
              </span>
              <span>Powered by Kiran Markets & Gemini AI</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
