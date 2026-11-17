import React from 'react';
import {
  AlertTriangle,
  Clock,
  Coins,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Search,
  Database,
  Eye,
  GitBranch,
  Network
} from 'lucide-react';

interface ArchitectureSectionProps {
  darkMode?: boolean;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ darkMode = false }) => {
  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-[#061822] text-[#E4F4F5]' : 'bg-[#F7F2E7] text-[#1E293B]'
    }`}>
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HEADER SECTION (Matching User Reference Image) */}
        <div className="text-center space-y-4 pt-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[14px] font-bold uppercase tracking-widest shadow-sm ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/40 text-[#1E6544]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#2F7D58] animate-pulse" />
            AI ARCHITECTURE & SCIENTIFIC INTELLIGENCE
          </div>

          {/* Main Heading Bold per User Request */}
          <h1 className={`font-serif text-[40px] sm:text-[52px] lg:text-[64px] font-bold leading-tight tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Research & <span className="italic font-bold text-[#1E6544] dark:text-[#9BF0FB]">Implementation</span>
          </h1>

          <p className={`text-[17px] sm:text-[19px] max-w-2xl mx-auto leading-relaxed font-sans font-medium ${
            darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
          }`}>
            Technical architecture and data-driven solutions for systemic illegal wildlife trade monitoring and autonomous interdiction.
          </p>
        </div>

        {/* SECTION 1: THE REALITY OF GLOBAL WILDLIFE CRIME (4 Metric Boxes) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-[27px] sm:text-[34px] font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            The Reality of Global Wildlife Crime
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                $23B+
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Annual Illicit Trade
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Transnational criminal revenue
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                7,000+
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Targeted Species
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Mammals, reptiles, flora & marine fauna
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                150+
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Active Trafficking Rings
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Across SE Asia, Africa & Latin America
              </div>
            </div>

            <div className={`p-6 rounded-2xl border text-center transition-all hover:scale-[1.02] shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`font-serif text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                1:1,162
              </div>
              <div className={`text-xs font-bold uppercase tracking-wider mt-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Ranger Shortage
              </div>
              <div className={`text-[11px] mt-1 font-medium ${
                darkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}>
                Ratio of field rangers to protected biomes
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CORE CHALLENGES ADDRESSED (2x2 Grid with Metric Badges) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Core Challenges Addressed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Challenge 1 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    The Detection Delay
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  15–30% Early Alert
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                By the time physical contraband is seized at container ports, wild breeding populations have already suffered irreversible collapse. Early digital detection at the social-media stage is critical for preemptive interdiction.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    Smuggling Evasion & Dialect Code
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  +84% Evasion Velocity
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Traffickers constantly rotate obfuscated keywords, phonetic puns, acronyms, and emoji ciphers, rendering static keyword filters and platform blacklist algorithms obsolete within weeks.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    The Information Bottleneck
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  1–3 Weeks Triage Lag
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Human verification backlogs cause critical intelligence to expire before warrants can be drafted. A digital marketplace lead loses 90% of actionable value once sellers rotate burner accounts after 48 hours.
              </p>
            </div>

            {/* Challenge 4 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                  }`}>
                    <Coins className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-base ${
                    darkMode ? 'text-white' : 'text-[#0B3A4A]'
                  }`}>
                    Cross-Border Jurisdictional Deficit
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  darkMode ? 'bg-[#1FB6C9]/20 text-[#9BF0FB]' : 'bg-[#2F7D58]/15 text-[#1E6544]'
                }`}>
                  80% Value Lost
                </span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Syndicates intentionally route procurement, payments, transit, and consumer fulfillment across separate legal jurisdictions, exploiting slow inter-agency requests and disparate evidence standards.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: WHAT WE BRING (4 Horizontal Cards) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Core System Pillars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <Workflow className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                Human-in-the-Loop Triage
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                All flagged listings route into an investigator queue. The system flags suspected wildlife trade, strictly avoiding automated accusations.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <Eye className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                Multimodal Dual Pipeline
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Simultaneous image and text evaluation to detect CITES species, derivatives (scales, ivory, skins), and concealed delivery signals.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <Network className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                Bayesian Confidence Model
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Probabilistic confidence scoring calculating joint likelihood across species matches, keyword triggers, and logistical indicators.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                <ShieldCheck className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                CITES Grounded Taxonomy
              </h3>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Grounded CITES Appendices I/II/III taxonomy database preventing ungrounded assertions and producing structured forensic dossiers.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: TECHNICAL ARCHITECTURE (3 Columns) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Implementation Architecture & Roadmap
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                Phase 1: Live Prototype (Current)
              </div>
              <div className={`font-bold text-sm mb-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                React 19 + TypeScript + Three.js + Heuristic Engine
              </div>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Operational client application featuring 3D Three.js incident globe, deterministic CITES rulesets, indicator parsing, Bayesian confidence scoring, and case CSV export.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                Optional Integration (Live Demo)
              </div>
              <div className={`font-bold text-sm mb-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                Google Gemini 1.5 Multimodal Vision API
              </div>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Optional client-side API key configuration enabling direct browser multimodal OCR and visual examination without requiring a mandatory cloud server backend.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border shadow-sm ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
              }`}>
                Phase 2 & 3: Planned Backend & ML Roadmap
              </div>
              <div className={`font-bold text-sm mb-2 ${
                darkMode ? 'text-white' : 'text-[#0B3A4A]'
              }`}>
                XLM-RoBERTa + CLIP / YOLOv8 + FastAPI Backend
              </div>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
              }`}>
                Planned architecture: fine-tuned XLM-RoBERTa text model for 100 languages & Indian codewords (*hathajodi*), zero-shot CLIP/YOLOv8 vision, FastAPI server, Redis queue, and Playwright crawler.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: IMPLEMENTATION DETAILS (4 Technical Cards with Architecture Diagrams) */}
        <div className="space-y-6">
          <h2 className={`text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0B3A4A]'
          }`}>
            Implementation Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Temporal Aggregation */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  Time-Series Post Monitoring Window
                </div>
                
                <div className="flex items-center justify-between gap-1 py-4 text-center">
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[10px] text-gray-500 font-bold">t=0</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Frame 0</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Raw Image</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[10px] text-gray-500 font-bold">t=1</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Frame 1</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Context</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[10px] text-gray-500 font-bold">t=2</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Frame 2</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Payment</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border shadow-xs ${
                    darkMode ? 'bg-[#1FB6C9]/20 border-[#1FB6C9]' : 'bg-[#2F7D58]/15 border-[#1E6544]'
                  }`}>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Aggregator</div>
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Bayesian Σ</div>
                    <div className={`text-[9px] font-semibold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Audit</div>
                  </div>
                </div>

                <div className={`p-2.5 rounded border border-dashed text-[10px] ${
                  darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/40 text-gray-300' : 'bg-white border-[#2F7D58]/40 text-[#1E293B]'
                }`}>
                  <span className={`font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Confidence Score:</span> P(Crime|E) = [P(E|Crime) × P(Crime)] / P(E)
                  <br />
                  <span className="opacity-90 font-medium">Cross-verified across 3 evidentiary nodes • 0.94 Conviction Threshold</span>
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <Network className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  Bayesian Evidence Scoring (Implemented)
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Operational Bayesian confidence model fusing multi-node signals: species keyword matches, CITES protection tier, off-platform messaging cues, and evasive delivery promises into a joint conviction metric.
                </p>
              </div>
            </div>

            {/* Card 2: A2A Agentic Architecture */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  Multilingual NLP & Slang Resolution Pipeline (Roadmap)
                </div>
                
                <div className="grid grid-cols-2 gap-3 py-3 text-center">
                  <div className={`p-2.5 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className={`text-[10px] uppercase font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>
                      Stage 1: NLP
                    </div>
                    <div className={`text-[11px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>
                      XLM-RoBERTa Base
                    </div>
                    <div className={`text-[9px] mt-1 font-medium ${darkMode ? 'text-gray-400' : 'text-[#475569]'}`}>
                      100 Languages & Hinglish
                    </div>
                  </div>
                  <div className={`p-2.5 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className={`text-[10px] uppercase font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>
                      Stage 2: Lexicon
                    </div>
                    <div className={`text-[11px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>
                      Indian Codewords
                    </div>
                    <div className={`text-[9px] mt-1 font-medium ${darkMode ? 'text-gray-400' : 'text-[#475569]'}`}>
                      Hathajodi, White Bone, etc.
                    </div>
                  </div>
                </div>

                <div className={`flex items-center justify-center gap-2 py-1 text-[10px] font-bold ${
                  darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'
                }`}>
                  <span>⇄ Fast Keyword Dispatch</span>
                  <span>•</span>
                  <span>Zero-Retrain Codeword Drift ⇄</span>
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <GitBranch className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  Multilingual Codeword Classification (Planned Roadmap)
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Phase 2 pipeline: fine-tuning XLM-RoBERTa across 100 languages to identify Hindi/Hinglish codewords (e.g., hathajodi = monitor lizard genitals) and obscure trade slang without retraining core weights.
                </p>
              </div>
            </div>

            {/* Card 3: Hallucination Prevention */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  Multi-Gate Hallucination Guardrail Protocol
                </div>
                
                <div className="flex items-center justify-between gap-1.5 py-3 text-center">
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Gate 1</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Zero-Shot ViT</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Gate 2</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>CITES Grounding</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#1FB6C9]/20 border-[#1FB6C9]' : 'bg-[#2F7D58]/15 border-[#1E6544]'
                  }`}>
                    <div className={`text-[9px] font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Gate 3</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Schema JSON</div>
                  </div>
                </div>

                <div className={`p-2 rounded border text-[10px] ${
                  darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-gray-300' : 'bg-white border-[#2F7D58]/30 text-[#1E293B]'
                }`}>
                  <span className={`font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Verification Result:</span> Zero ungrounded assertions allowed. Non-CITES fauna or legal pets automatically filtered without false positive flags.
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <ShieldCheck className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  CITES Grounding & Hallucination Guard (Implemented)
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Operational multi-layer validation combining context-engineered prompts with verified CITES Appendices I–III taxonomy rulesets, ensuring that non-protected species or legal pets never trigger false accusations.
                </p>
              </div>
            </div>

            {/* Card 4: Computer Vision Pipeline */}
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/20' : 'bg-white border-[#2F7D58]/25'
            }`}>
              {/* Architecture Blueprint Diagram */}
              <div className={`rounded-xl border p-4 text-[11px] font-mono select-none overflow-x-auto ${
                darkMode ? 'bg-[#071E28] border-[#1FB6C9]/30 text-white' : 'bg-[#F4F9F6] border-[#2F7D58]/35 text-[#0B3A4A]'
              }`}>
                <div className={`text-center font-bold pb-2 border-b ${
                  darkMode ? 'text-[#9BF0FB] border-[#1FB6C9]/20' : 'text-[#1E6544] border-[#2F7D58]/25'
                }`}>
                  Fine-Grained Fauna & Derivative Segmentation (Roadmap)
                </div>
                
                <div className="flex items-center justify-between gap-1.5 py-3 text-center">
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Input</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>Multimodal Post</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30' : 'bg-white border-[#2F7D58]/35'
                  }`}>
                    <div className="text-[9px] text-gray-500 font-bold">Stage 1</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>CLIP Zero-Shot</div>
                  </div>
                  <div className="text-gray-400 font-bold">→</div>
                  <div className={`p-2 rounded border ${
                    darkMode ? 'bg-[#1FB6C9]/20 border-[#1FB6C9]' : 'bg-[#2F7D58]/15 border-[#1E6544]'
                  }`}>
                    <div className={`text-[9px] font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Stage 2</div>
                    <div className={`text-[10px] font-bold ${darkMode ? 'text-white' : 'text-[#0B3A4A]'}`}>YOLOv8 Boxes</div>
                  </div>
                </div>

                <div className={`p-2 rounded border text-[10px] ${
                  darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-gray-300' : 'bg-white border-[#2F7D58]/30 text-[#1E293B]'
                }`}>
                  <span className={`font-bold ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`}>Target Anatomies:</span> Raw tusks, processed ivory carvings, pangolin keratin scales, tiger bone glue, live exotic avifauna cages.
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-base flex items-center gap-2 mb-1 ${
                  darkMode ? 'text-white' : 'text-[#0B3A4A]'
                }`}>
                  <Eye className={`w-4 h-4 ${darkMode ? 'text-[#9BF0FB]' : 'text-[#1E6544]'}`} />
                  Computer Vision & Derivative Segmentation (Planned Roadmap)
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'
                }`}>
                  Phase 2/3 vision roadmap: zero-shot CLIP querying for parts/derivatives without labelled datasets, transitioning to fine-tuned YOLOv8 bounding box detection for pangolin scales, ivory, and skins.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 6: BOTTOM QUICK BADGES (Exact Replica of Reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Phase 1 Implemented</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              CITES Rules Engine & 3D Three.js
            </div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Optional Integration</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              Gemini 1.5 Multimodal Vision API
            </div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Phase 2 Text Model</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              XLM-RoBERTa 100-Language NLP
            </div>
          </div>

          <div className={`px-4 py-3 rounded-xl border text-center text-xs font-semibold shadow-xs ${
            darkMode ? 'bg-[#0B2533] border-[#1FB6C9]/30 text-[#9BF0FB]' : 'bg-white border-[#2F7D58]/30 text-[#0B3A4A]'
          }`}>
            <div className="font-bold">Phase 2/3 Vision</div>
            <div className={`text-[10px] mt-0.5 font-medium ${darkMode ? 'text-[#B0D1DA]' : 'text-[#475569]'}`}>
              Zero-Shot CLIP & YOLOv8 Boxes
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
