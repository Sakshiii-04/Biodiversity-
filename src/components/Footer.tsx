import React from 'react';
import { ShieldCheck, ExternalLink, ArrowUp, Sparkles, Scale } from 'lucide-react';
import { AppPage } from './Navigation';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A2E20] text-white pt-20 pb-12 border-t border-[#10B981]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">

          {/* Col 1: Brand & Charter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg shrink-0">
                <img src="/logo.png" alt="SAMRAKSH Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none block">
                    SAMRAKSH
                  </span>
                  <span className="font-serif text-lg font-medium text-[#34D399]">
                    (संरक्ष)
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#A7F3D0] block mt-0.5">
                  Vigilance for the Wild in the Digital Era.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E2E8F0]/80 leading-relaxed pr-4">
              India-first multimodal digital wildlife trade detection and biodiversity conservation platform. Combining interactive planetary intelligence, CITES-grounded taxonomy, regional codeword resolution, and evidence-based decision support for human investigators.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[11px] border border-white/10">
                <Scale className="w-3.5 h-3.5 text-[#34D399]" />
                UN SDG 15 • Wildlife Protection Act (1972/2022)
              </span>
            </div>
          </div>

          {/* Col 2: Platform Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#34D399] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-[#E2E8F0]/85">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#34D399] transition-colors cursor-pointer text-left"
                >
                  Home (Overview & Earth Hub)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('what-we-do')}
                  className="hover:text-[#34D399] transition-colors cursor-pointer text-left"
                >
                  What We Do (Capabilities & Story)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-us')}
                  className="hover:text-[#34D399] transition-colors cursor-pointer text-left"
                >
                  About Us (Mission, Vision & Roots)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('biodiversity')}
                  className="hover:text-[#34D399] transition-colors cursor-pointer text-left"
                >
                  Explore Biodiversity (3D Hotspots)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('detect')}
                  className="hover:text-[#34D399] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#34D399]" />
                  <span>Detection Platform (AI Tool)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-[#34D399] transition-colors cursor-pointer text-left"
                >
                  Dashboard (Telemetry & Audits)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Statutory Frameworks (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#34D399] block">
              Conservation & Governance
            </span>
            <ul className="space-y-2.5 text-xs text-[#E2E8F0]/85">
              <li>
                <a
                  href="http://wccb.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#34D399] transition-colors inline-flex items-center gap-1"
                >
                  WCCB (Govt. of India) <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="https://cites.org/eng/app/appendices.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#34D399] transition-colors inline-flex items-center gap-1"
                >
                  CITES Appendices I, II & III <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.traffic.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#34D399] transition-colors inline-flex items-center gap-1"
                >
                  TRAFFIC Wildlife Monitoring <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.iucnredlist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#34D399] transition-colors inline-flex items-center gap-1"
                >
                  IUCN Red List of Threatened Species <ExternalLink className="w-3 h-3 text-white/50" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('architecture')}
                  className="hover:text-[#34D399] transition-colors cursor-pointer text-left"
                >
                  Technical Architecture Slide (Round 1)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Attribution (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#34D399] block">
              Initiative
            </span>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Developed for <strong>SUSTAINOVA 2026</strong> Ideathon (SDG 15).
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Acropolis Institute of Technology and Research (AITR), Indore.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer text-white"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
          <div>
            © 2026 SAMRAKSH (संरक्ष). Built in support of UN Sustainable Development Goal 15 (Life on Land).
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Mandatory Human Review</span>
            <span>•</span>
            <span>Zero PII Storage</span>
            <span>•</span>
            <span>Open Access Conservation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
