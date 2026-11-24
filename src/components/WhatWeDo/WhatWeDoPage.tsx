import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  FileText,
  Layers,
  Scale,
  ExternalLink,
  ChevronRight,
  Database,
  BarChart3,
  Compass,
  Lock,
  Globe2,
  ArrowRight,
  Search,
  CheckCircle2,
  Cpu,
  FileCheck2,
  Eye,
  AlertTriangle
} from 'lucide-react';

interface WhatWeDoPageProps {
  onNavigateToDetect: () => void;
  onNavigateToBiodiversity: () => void;
  onNavigateToDashboard: () => void;
  darkMode?: boolean;
}

export const WhatWeDoPage: React.FC<WhatWeDoPageProps> = ({
  onNavigateToDetect,
  onNavigateToBiodiversity,
  onNavigateToDashboard,
  darkMode = false
}) => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'intake' | 'multimodal' | 'cites' | 'human_review'>('multimodal');

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-[#061822] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1E3A2F]'
      }`}>
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= PAGE HERO: CLEAN & IMPACTFUL ================= */}
        <section className="pt-6 sm:pt-10 border-b pb-12 border-emerald-500/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Capabilities & Operational Methodology</span>
              </div>

              <h1 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] ${darkMode ? 'text-white' : 'text-[#0A2E20]'
                }`}>
                Making digital wildlife trade <span className="italic text-[#10B981]">visible, verifiable & actionable.</span>
              </h1>

              <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-[#2D5A46]'}`}>
                Traffickers exploit encrypted social apps, classified ads, and regional slang to trade endangered fauna. SAMRAKSH uncovers covert listings through multimodal signal fusion, CITES-grounded taxonomy, and investigator-guided verification.
              </p>

              {/* Quick Feature Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  Dual-Modality: Text + Image
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  Hindi & Hinglish Codewords
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  CITES Appendix I-III Grounding
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  Zero PII Collection
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onNavigateToDetect}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#10B981]/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Detection Tool</span>
                </button>

                <button
                  onClick={onNavigateToDashboard}
                  className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${darkMode
                    ? 'border-[#10B981]/30 text-white hover:bg-white/10'
                    : 'border-[#2D5A46]/30 text-[#0A2E20] hover:bg-[#E8F5EE]'
                    }`}
                >
                  <BarChart3 className="w-4 h-4 text-[#10B981]" />
                  <span>View Telemetry Dashboard</span>
                </button>
              </div>
            </div>

            {/* Right Emblem Banner */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#10B981]/20 bg-gradient-to-br from-[#0F2D24] to-[#041B12] p-6 text-white w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/95 p-1.5 shadow-md shrink-0">
                    <img src="/logo.png" alt="SAMRAKSH Shield" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#34D399] block">
                      Protected Species Defense
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      SAMRAKSH (संरक्ष)
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">Target Problem:</span>
                    <span className="font-semibold text-emerald-200">Online Wildlife Trafficking</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">Jurisdiction:</span>
                    <span className="font-semibold text-emerald-200">India-First • Global Extensible</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">Primary Beneficiaries:</span>
                    <span className="font-semibold text-emerald-200">WCCB, Forest Depts & NGOs</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-400">Mandatory Rule:</span>
                    <span className="font-semibold text-[#EAB308]">Human-in-the-Loop Triage</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ================= FLOWCHART: COMPLETE SYSTEM PIPELINE ARCHITECTURE ================= */}
        <section id="digital-detection" className="scroll-mt-36 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
              Pillar A — Technical Flowchart
            </span>
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'
              }`}>
              How SAMRAKSH Detects Covert Wildlife Trade
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-[#2D5A46]'}`}>
              An end-to-end 5-stage ingestion, extraction, and verification pipeline:
            </p>
          </div>

          {/* Connected Flowchart Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">

            {/* Step 1 */}
            <div className={`p-5 rounded-2xl border relative flex flex-col justify-between ${darkMode ? 'bg-[#0E2E23]/70 border-[#10B981]/30' : 'bg-white border-[#2D5A46]/20 shadow-sm'
              }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <FileText className="w-5 h-5 text-[#10B981]" />
                </div>
                <h4 className="font-serif text-base font-bold">Intake</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Post screenshots or live URLs from public marketplaces & social groups.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 dark:border-white/5 text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                Screenshots • URLs
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-5 rounded-2xl border relative flex flex-col justify-between ${darkMode ? 'bg-[#0E2E23]/70 border-[#10B981]/30' : 'bg-white border-[#2D5A46]/20 shadow-sm'
              }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <Lock className="w-5 h-5 text-[#10B981]" />
                </div>
                <h4 className="font-serif text-base font-bold">Sanitization</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  EXIF geolocation scrubbed for safety; SHA-256 hash deduplication.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 dark:border-white/5 text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                Zero PII • Hash Dedupe
              </div>
            </div>

            {/* Step 3 */}
            <div className={`p-5 rounded-2xl border relative flex flex-col justify-between ${darkMode ? 'bg-[#0E2E23]/70 border-[#10B981]/30' : 'bg-white border-[#2D5A46]/20 shadow-sm'
              }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <Cpu className="w-5 h-5 text-[#10B981]" />
                </div>
                <h4 className="font-serif text-base font-bold">Dual AI Engine</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Text NLP (XLM-RoBERTa) + Vision (CLIP) fused into a unified signal.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 dark:border-white/5 text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                60% Text + 40% Vision
              </div>
            </div>

            {/* Step 4 */}
            <div className={`p-5 rounded-2xl border relative flex flex-col justify-between ${darkMode ? 'bg-[#0E2E23]/70 border-[#10B981]/30' : 'bg-white border-[#2D5A46]/20 shadow-sm'
              }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center justify-center">4</span>
                  <Scale className="w-5 h-5 text-[#10B981]" />
                </div>
                <h4 className="font-serif text-base font-bold">CITES Grounding</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Matched against CITES Appendices I-III & Wildlife Protection Act schedules.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 dark:border-white/5 text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                Zero Hallucinations
              </div>
            </div>

            {/* Step 5 */}
            <div className={`p-5 rounded-2xl border relative flex flex-col justify-between ${darkMode ? 'bg-[#0E2E23]/70 border-[#10B981]/30' : 'bg-white border-[#2D5A46]/20 shadow-sm'
              }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-[#10B981] text-white text-xs font-bold flex items-center justify-center">5</span>
                  <FileCheck2 className="w-5 h-5 text-[#10B981]" />
                </div>
                <h4 className="font-serif text-base font-bold">Human Dossier</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Investigator queue with full evidence rationale & one-click WCCB export.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 dark:border-white/5 text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                Courtroom-Ready PDF/CSV
              </div>
            </div>

          </div>
        </section>


        {/* ================= PILLAR B: CODEWORD RESOLUTION MATRIX ================= */}
        <section id="ai-analysis" className="scroll-mt-36 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
              Pillar B — Forensic Codeword Resolution
            </span>
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'
              }`}>
              Decoding Regional Trafficking Slang
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-[#2D5A46]'}`}>
              Traffickers disguise illegal wildlife parts behind cultural, religious, or ornamental euphemisms. SAMRAKSH maps these codewords directly to biological taxa:
            </p>
          </div>

          {/* Visual Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-emerald-500/20 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase tracking-wider font-bold text-[11px] ${darkMode ? 'bg-[#0E2E23] text-[#34D399]' : 'bg-[#E8F5EE] text-[#0A2E20]'
                }`}>
                <tr>
                  <th className="py-3.5 px-4">Disguised Listing Codeword</th>
                  <th className="py-3.5 px-4">Alleged Market Context</th>
                  <th className="py-3.5 px-4">Actual Biological Species</th>
                  <th className="py-3.5 px-4">Statutory Protection</th>
                  <th className="py-3.5 px-4">Threat Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-white/10 bg-[#071711]' : 'divide-gray-200 bg-white'}`}>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#10B981]">"Hathajodi" (हथाजोड़ी)</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">Tantric root for prosperity</td>
                  <td className="py-3 px-4 font-semibold">Bengal Monitor Lizard (Varanus) genitals</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-red-500/10 text-red-600 font-bold">WPA Schedule I</span></td>
                  <td className="py-3 px-4 font-bold text-red-500">Critical Poaching</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#10B981]">"White Jade / Natural Bone"</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">Antique ornamental gemstone</td>
                  <td className="py-3 px-4 font-semibold">Asian Elephant (Elephas maximus) Ivory</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-red-500/10 text-red-600 font-bold">CITES Appendix I</span></td>
                  <td className="py-3 px-4 font-bold text-red-500">Commercial Ban</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#10B981]">"Artisanal Fish Leather"</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">Handcrafted leather wallet/boots</td>
                  <td className="py-3 px-4 font-semibold">Sunda / Indian Pangolin (Manis) scales</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-red-500/10 text-red-600 font-bold">CITES Appendix I</span></td>
                  <td className="py-3 px-4 font-bold text-red-500">Severe Extinction Risk</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#10B981]">"Star Pattern Vaastu Pet"</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">Astrological home companion</td>
                  <td className="py-3 px-4 font-semibold">Indian Star Tortoise (Geochelone elegans)</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-bold">CITES Appendix I</span></td>
                  <td className="py-3 px-4 font-bold text-amber-500">High Transit Seizures</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Three Allowed Labels Badge Strip */}
          <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs ${darkMode ? 'bg-[#0E2E23]/50 border-emerald-500/20' : 'bg-[#E8F5EE] border-emerald-500/30'
            }`}>
            <span className="font-bold text-[#0A2E20] dark:text-white">Strict Classification Classes:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold text-[11px]">
                SUSPECTED WILDLIFE TRADE
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-[11px]">
                REQUIRES MANUAL REVIEW
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px]">
                NO EVIDENCE DETECTED
              </span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-300 italic">
              *Human verification is mandatory before reporting.
            </span>
          </div>
        </section>


        {/* ================= PILLAR C: SPECIES AT RISK ================= */}
        <section id="biodiversity-awareness" className="scroll-mt-36 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
              Pillar C — Targeted Wildlife Fauna
            </span>
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'
              }`}>
              Priority Species Monitored
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-[#2D5A46]'}`}>
              Key indicator species most vulnerable to illicit digital trading networks:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pangolin */}
            <div className={`rounded-2xl overflow-hidden border shadow-sm group ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200'
              }`}>
              <div className="h-40 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=600&q=80"
                  alt="Pangolin"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                  CITES App. I
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-base">Indian & Sunda Pangolins</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Target: Scales & keratin derivatives</p>
              </div>
            </div>

            {/* Tiger */}
            <div className={`rounded-2xl overflow-hidden border shadow-sm group ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200'
              }`}>
              <div className="h-40 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80"
                  alt="Bengal Tiger"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                  CITES App. I
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-base">Bengal Tiger</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Target: Claws, skins & bone derivatives</p>
              </div>
            </div>

            {/* Tortoise */}
            <div className={`rounded-2xl overflow-hidden border shadow-sm group ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200'
              }`}>
              <div className="h-40 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80"
                  alt="Star Tortoise"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white">
                  Exotic Pet Market
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-base">Indian Star Tortoise</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Target: Live courier trafficking</p>
              </div>
            </div>

            {/* Elephant */}
            <div className={`rounded-2xl overflow-hidden border shadow-sm group ${darkMode ? 'bg-[#0E2E23]/60 border-white/10' : 'bg-white border-gray-200'
              }`}>
              <div className="h-40 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80"
                  alt="Elephant"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                  CITES App. I
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-base">Asian & African Elephant</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Target: Raw & carved ivory trinkets</p>
              </div>
            </div>
          </div>
        </section>


        {/* ================= PILLAR D & E: TELEMETRY & SAFEGUARDS ================= */}
        <section id="monitoring-insights" className="scroll-mt-36 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left: Telemetry & Dossier (7 cols) */}
            <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-[#0E2E23]/60 border-[#10B981]/25' : 'bg-white border-gray-200 shadow-sm'
              }`}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#10B981] block mb-2">
                Pillar D — Telemetry & Evidence Export
              </span>
              <h3 className="font-serif text-2xl font-bold mb-3">
                Investigator Case Audit Queue
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Flagged posts automatically generate a chain-of-custody dossier containing timestamp, post origin, extracted keywords, and plain-language explanation for forest officers.
              </p>

              <div className="grid grid-cols-3 gap-3 text-center border-t border-b border-gray-200 dark:border-white/10 py-4 mb-6">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#10B981]">100%</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mt-1">Audit Trail</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#EAB308]">WCCB</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mt-1">Format Ready</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-blue-500">CSV / JSON</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 mt-1">Direct Export</div>
                </div>
              </div>

              <button
                onClick={onNavigateToDashboard}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981] hover:underline"
              >
                <span>Open Intelligence Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Ethical AI Safeguards (5 cols) */}
            <div id="responsible-conservation" className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F2D24] to-[#041B12] text-white border border-[#10B981]/25 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] block mb-2">
                  Pillar E — Governance
                </span>
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Ethical Safeguards
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    <span><strong>Zero PII Collection:</strong> No seller phone numbers, addresses, or private identities harvested.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    <span><strong>Human-in-the-Loop Only:</strong> AI assists; qualified human officers make all legal decisions.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                    <span><strong>Lawful Public Sources:</strong> No private chat infiltration or unauthorized intrusions.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-emerald-200 border border-white/10">
                  Compliant with Wildlife Protection Act 1972/2022
                </span>
              </div>
            </div>

          </div>
        </section>


        {/* ================= CALL TO ACTION ================= */}
        <section className="text-center py-10 border-t border-emerald-500/15 space-y-4">
          <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
            Ready to test detection capabilities?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Upload a post screenshot or test sample listings to see multimodal inference in action.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToDetect}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#10B981]/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Detection Platform</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
export default WhatWeDoPage;