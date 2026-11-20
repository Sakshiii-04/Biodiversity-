import React from 'react';
import {
  ShieldCheck,
  Target,
  Eye,
  Globe2,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  School,
  Layers,
  Cpu,
  FileCheck2,
  Search,
  Scale
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigateToWhatWeDo: () => void;
  onNavigateToDetect: () => void;
  onNavigateToBiodiversity: () => void;
  darkMode?: boolean;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateToWhatWeDo,
  onNavigateToDetect,
  onNavigateToBiodiversity,
  darkMode = false
}) => {
  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-[#061822] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1E3A2F]'
      }`}>
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= HERO: CLEAN & EDITORIAL ================= */}
        <section className="pt-6 sm:pt-10 border-b pb-12 border-emerald-500/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Conservation Intelligence Initiative</span>
              </div>

              <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] ${darkMode ? 'text-white' : 'text-[#0A2E20]'
                }`}>
                Technology in Service of <span className="italic text-[#10B981]">Earth’s Living Heritage.</span>
              </h1>

              <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-[#2D5A46]'}`}>
                SAMRAKSH is an India-first conservation initiative developed to equip frontline forest officers and wildlife crime investigators with intelligent, explainable digital vigilance tools.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onNavigateToWhatWeDo}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#10B981]/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Explore What We Do</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateToBiodiversity}
                  className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${darkMode
                    ? 'border-[#10B981]/30 text-white hover:bg-white/10'
                    : 'border-[#2D5A46]/30 text-[#0A2E20] hover:bg-[#E8F5EE]'
                    }`}
                >
                  <Globe2 className="w-4 h-4 text-[#10B981]" />
                  <span>3D Hotspot Map</span>
                </button>
              </div>
            </div>

            {/* Emblem Card */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="rounded-3xl p-8 bg-gradient-to-br from-[#0F2D24] to-[#041B12] border border-[#10B981]/30 shadow-2xl text-white text-center w-full max-w-md">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-white/95 p-2 shadow-xl mb-4">
                  <img src="/logo.png" alt="SAMRAKSH Official Shield" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-wide">
                  SAMRAKSH (संरक्ष)
                </h3>
                <p className="text-xs text-[#A7F3D0] mt-1 uppercase tracking-widest font-semibold">
                  Vigilance for the Wild in the Digital Era.
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-[#34D399] block">SDG 15.7</span>
                    <span className="text-[10px] text-gray-400">Halt Poaching</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-[#34D399] block">SDG 16</span>
                    <span className="text-[10px] text-gray-400">Enforcement Triage</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ================= WHO WE ARE: 4 INFOGRAPHIC TILES ================= */}
        <section id="who-we-are" className="scroll-mt-24 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
              Origin & Academic Foundations
            </span>
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'
              }`}>
              Who We Are
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Tile 1 */}
            <div className={`p-6 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10B981]">
                <School className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold">Research Team</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Department of Computer Science & Engineering at <strong>AITR Indore</strong>.
              </p>
            </div>

            {/* Tile 2 */}
            <div className={`p-6 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10B981]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold">SUSTAINOVA 2026</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Developed for the UN SDG Ideathon under Domain 15 (Biodiversity & Forests).
              </p>
            </div>

            {/* Tile 3 */}
            <div className={`p-6 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10B981]">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold">The Problem</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Wildlife trade moved online into encrypted chats, coded Hindi slang & classifieds.
              </p>
            </div>

            {/* Tile 4 */}
            <div className={`p-6 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10B981]">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold">The Solution</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Free, accessible multimodal screening pipeline tailored for Indian enforcement.
              </p>
            </div>
          </div>
        </section>


        {/* ================= PHILOSOPHY: EMBLEM BREAKDOWN DIAGRAM ================= */}
        <section id="why-samraksh" className="scroll-mt-24 p-6 sm:p-10 rounded-3xl bg-[#0A2E20] text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl space-y-6 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] block mb-1">
                Etymology & Emblem Symbolism
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold">
                Why <span className="italic text-[#34D399]">SAMRAKSH (संरक्ष)?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xl font-serif text-[#34D399] font-bold block">सम् (Sam)</span>
                <span className="text-xs font-semibold text-emerald-200 block">Holistic Completeness</span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Signifies unified protection across all fauna—tigers, elephants, tortoises, birds, and marine biodiversity.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xl font-serif text-[#34D399] font-bold block">रक्ष् (Raksh)</span>
                <span className="text-xs font-semibold text-emerald-200 block">Active Guardianship</span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The ancient root meaning to guard and shield. Represented by the protective shield and data vigilance pixels.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xl font-serif text-[#34D399] font-bold block">पर्ण (Leaves)</span>
                <span className="text-xs font-semibold text-emerald-200 block">Ecosystem Restoration</span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The living foliage at the shield base symbolizes the flourishing natural habitats we aim to safeguard.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ================= MISSION & VISION: DUAL VISUAL CARDS ================= */}
        <section id="mission-vision" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-3 ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10B981]">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#10B981] block">Mandate</span>
            <h3 className="font-serif text-xl font-bold">Our Mission</h3>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Provide frontline investigators with multimodal detection tools for online listings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Decode vernacular trade slang (hathajodi, white jade) into statutory CITES categories.</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-3 ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10B981]">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#10B981] block">Future State</span>
            <h3 className="font-serif text-xl font-bold">Our Vision</h3>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Eradicate digital safe havens for wildlife traffickers across Indian and global platforms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Halt anthropogenic species extinction through accessible, open, human-guided technology.</span>
              </li>
            </ul>
          </div>
        </section>


        {/* ================= 5-POINT APPROACH: CONNECTED FLOWCHART ================= */}
        <section id="our-approach" className="scroll-mt-24 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
              Integrated Methodology
            </span>
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'
              }`}>
              Our 5-Point Approach
            </h2>
          </div>

          {/* 5-Step Connected Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { num: '01', title: 'AI Detection', desc: 'XLM-RoBERTa text model + CLIP visual feature extraction' },
              { num: '02', title: 'Content Forensics', desc: 'Decoding disguised courier terms & off-platform DM redirects' },
              { num: '03', title: 'CITES Grounding', desc: 'Strict Appendix I-III alignment preventing AI hallucinations' },
              { num: '04', title: 'Hotspot Mapping', desc: 'Connecting digital listings to vulnerable geographic origins' },
              { num: '05', title: 'Lawful Action', desc: 'Courtroom-ready dossiers for WCCB & Forest Department officers' },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#0E2E23]/40 border-white/10' : 'bg-white border-gray-200 shadow-sm'
                  }`}
              >
                <div className="text-emerald-500 font-bold text-sm mb-1">{step.num}</div>
                <h4 className="font-bold text-xs mb-1.5">{step.title}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* ================= CALL TO ACTION ================= */}
        <section className="text-center py-10 border-t border-emerald-500/15 space-y-4">
          <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
            Join us in defending wildlife
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Experience how SAMRAKSH uncovers covert wildlife trade across digital channels.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={onNavigateToDetect}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#10B981]/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Test Suspicious Post</span>
            </button>
            <button
              onClick={onNavigateToWhatWeDo}
              className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${darkMode ? 'border-[#10B981]/30 text-white hover:bg-white/10' : 'border-[#2D5A46]/30 text-[#0A2E20] hover:bg-[#E8F5EE]'
                }`}
            >
              <span>Read What We Do</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
export default AboutUsPage;