import React from 'react';
import { ScanSearch, FileSearch, ShieldCheck, ArrowRight, Sparkles, Scale, Globe2, Landmark } from 'lucide-react';

interface MissionProps {
  onDetectClick: () => void;
  onWhatWeDoClick?: () => void;
  onExploreEarthClick: () => void;
  darkMode?: boolean;
}

export const Mission: React.FC<MissionProps> = ({ 
  onDetectClick, 
  onWhatWeDoClick, 
  onExploreEarthClick,
  darkMode = false 
}) => {
  return (
    <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Introduction Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        
        {/* Left Column: Editorial Headline & Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-widest border ${
            darkMode 
              ? 'bg-[#0E2E23] text-[#A7F3D0] border-[#10B981]/30' 
              : 'bg-[#E8F5EE] text-[#0A2E20] border-[#10B981]/25'
          }`}>
            MULTIMODAL INTELLIGENCE & DIGITAL VIGILANCE
          </span>

          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] ${
            darkMode ? 'text-white' : 'text-[#0A2E20]'
          }`}>
            Exposing online wildlife crime with <span className="italic text-[#10B981]">evidence-based clarity.</span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-[#2D5A46]'
          }`}>
            Traffickers have migrated from open physical markets into encrypted social channels, online marketplaces, and discreet courier networks. <strong>SAMRAKSH (संरक्ष)</strong> identifies suspicious digital listings across text and imagery, resolving CITES-listed species, regional vernacular codewords, and evasive shipping indicators to arm investigators with actionable, courtroom-ready intelligence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onDetectClick}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#10B981]/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Suspicious Post</span>
            </button>

            {onWhatWeDoClick ? (
              <button
                onClick={onWhatWeDoClick}
                className={`text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
                  darkMode ? 'text-[#A7F3D0] hover:text-white' : 'text-[#0A2E20] hover:text-[#10B981]'
                }`}
              >
                <span>Read What We Do</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onExploreEarthClick}
                className={`text-xs font-semibold uppercase tracking-wider underline underline-offset-4 cursor-pointer ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-[#0A2E20] hover:text-[#10B981]'
                }`}
              >
                Back to Earth Globe ↑
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Imagery with Luminous Badge */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-md h-[440px] overflow-hidden rounded-3xl shadow-2xl border-4 border-white/60 dark:border-white/10 group">
            <img
              src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1000&q=80"
              alt="Critically Endangered Pangolin in Habitat"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            {/* Luminous overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0A2E20]/90 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#34D399]">
                Digital Forensics & Interception
              </span>
              <p className="font-serif text-lg font-light text-emerald-50 mt-1 leading-snug">
                "Over 7,000 species are threatened by the digital black market annually."
              </p>
              <span className="text-[11px] text-emerald-200/80 block mt-1">— UNODC World Wildlife Crime Report & WCCB India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Framework & Regulatory Alignment Bar */}
      <div className={`mb-16 p-6 rounded-2xl border transition-colors ${
        darkMode 
          ? 'bg-[#0E2E23]/40 border-[#10B981]/20 text-gray-200' 
          : 'bg-[#FAF8F5] border-[#10B981]/25 text-[#0A2E20]'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#10B981]">
              Regulatory & Inter-Agency Alignment
            </span>
            <h4 className="font-serif text-lg font-medium">
              Standardized Against Global & National Enforcement Protocols
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              darkMode ? 'bg-[#061822]/80 border-emerald-500/30 text-emerald-300' : 'bg-white border-emerald-600/20 text-emerald-800'
            }`}>
              <Globe2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>UN SDG 15 & 16</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              darkMode ? 'bg-[#061822]/80 border-emerald-500/30 text-emerald-300' : 'bg-white border-emerald-600/20 text-emerald-800'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>WCCB Op Wildnet VI</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              darkMode ? 'bg-[#061822]/80 border-emerald-500/30 text-emerald-300' : 'bg-white border-emerald-600/20 text-emerald-800'
            }`}>
              <Scale className="w-3.5 h-3.5 text-[#10B981]" />
              <span>CITES App. I–III</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              darkMode ? 'bg-[#061822]/80 border-emerald-500/30 text-emerald-300' : 'bg-white border-emerald-600/20 text-emerald-800'
            }`}>
              <Landmark className="w-3.5 h-3.5 text-[#10B981]" />
              <span>TRAFFIC Standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Wildlife Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`rounded-3xl p-8 shadow-sm border transition-all duration-300 hover:shadow-xl group ${
          darkMode ? 'bg-[#0E2E23]/60 border-[#10B981]/20' : 'bg-white border-[#2D5A46]/15'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-6 group-hover:bg-[#10B981] group-hover:text-white transition-colors">
            <ScanSearch className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#10B981]">
            Pillar 01
          </span>
          <h3 className={`font-serif text-2xl font-medium mt-1 mb-3 ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
            Multimodal Visual Recognition
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Simultaneous optical identification of high-risk anatomical wildlife parts including pangolin scales, ivory carvings, tiger derivatives, and live specimens concealed in ordinary packaging.
          </p>
        </div>

        <div className={`rounded-3xl p-8 shadow-sm border transition-all duration-300 hover:shadow-xl group ${
          darkMode ? 'bg-[#0E2E23]/60 border-[#10B981]/20' : 'bg-white border-[#2D5A46]/15'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-[#E86350]/15 text-[#E86350] flex items-center justify-center mb-6 group-hover:bg-[#E86350] group-hover:text-white transition-colors">
            <FileSearch className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#E86350]">
            Pillar 02
          </span>
          <h3 className={`font-serif text-2xl font-medium mt-1 mb-3 ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
            Codeword & Indicator Mapping
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            NLP analysis detecting regional Indian and global obfuscation slang (e.g. hathajodi, carved white bone), private messaging redirects, and disguised courier logistics used to bypass standard filters.
          </p>
        </div>

        <div className={`rounded-3xl p-8 shadow-sm border transition-all duration-300 hover:shadow-xl group ${
          darkMode ? 'bg-[#0E2E23]/60 border-[#10B981]/20' : 'bg-white border-[#2D5A46]/15'
        }`}>
          <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-6 group-hover:bg-[#10B981] group-hover:text-white transition-colors">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#10B981]">
            Pillar 03
          </span>
          <h3 className={`font-serif text-2xl font-medium mt-1 mb-3 ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
            CITES Taxonomy & Evidence Triage
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Systematic cross-referencing against CITES Appendices I–III and Wildlife Protection Act schedules, producing structured case dossiers with chain-of-custody logging for human verification.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Mission;
