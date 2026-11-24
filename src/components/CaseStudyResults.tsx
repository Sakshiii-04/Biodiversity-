import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface CaseStudyResultsProps {
  onNavigateToDetect?: () => void;
  onNavigateToDashboard?: () => void;
}

export const CaseStudyResults: React.FC<CaseStudyResultsProps> = ({
  onNavigateToDetect,
  onNavigateToDashboard
}) => {
  const cardsData = [
    {
      id: 'card-1',
      bgStyle: {
        background: 'linear-gradient(135deg, #0A2E20 0%, #061B13 100%)'
      },
      title: 'Operation Thunder',
      outcome: 'Maritime transit contraband interdicted',
      stat1: {
        value: '+11.9 T',
        label: 'Scales Seized'
      },
      stat2: {
        value: 'US$48M',
        label: 'Trade Interdicted'
      },
      photo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1200&auto=format&fit=crop',
      alt: 'Pangolin scale seizure interdiction'
    },
    {
      id: 'card-2',
      bgStyle: {
        background: 'linear-gradient(135deg, #0E3B2A 0%, #082419 100%)'
      },
      title: 'Operation Save Kurma',
      outcome: 'Online pet trade syndicate dismantled',
      stat1: {
        value: '1,364',
        label: 'Specimens Rescued'
      },
      stat2: {
        value: '94%',
        label: 'Detection Precision'
      },
      photo: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?q=80&w=1200&auto=format&fit=crop',
      alt: 'Star tortoise conservation rescue'
    },
    {
      id: 'card-3',
      bgStyle: {
        background: 'linear-gradient(135deg, #0A2E20 0%, #041810 100%)'
      },
      title: 'Project Predator',
      outcome: 'Digital black market listings swept',
      stat1: {
        value: '+84%',
        label: 'Codewords Flagged'
      },
      stat2: {
        value: '100%',
        label: 'Human Review Triage'
      },
      photo: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop',
      alt: 'Bengal tiger habitat patrol'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto case-study-section">
      <div className="bg-[#FAF8F5] dark:bg-[#081F17] rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#10B981]/20 shadow-xl transition-all">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Operational Interdiction Impact</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A2E20] dark:text-white leading-[1.15]">
            Measurable Results with <span className="italic text-[#10B981]">SAMRAKSH</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Frontline enforcement agencies and conservation analysts confront rapidly migrating online wildlife trade. The verified benchmark operations below illustrate how multimodal AI and CITES taxonomy grounding assist real-world investigations.
          </p>

          <div className="w-16 h-[2px] bg-[#10B981] mx-auto mt-6" />
        </div>

        {/* 3 Result Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 mb-12">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="group relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl border border-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
              style={{
                ...card.bgStyle,
                minHeight: '480px'
              }}
            >
              {/* Subtle top ambient glow */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#10B981]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#10B981]/25 transition-all duration-500" />

              {/* Card Top */}
              <div className="relative z-10 flex items-start justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#A7F3D0] font-medium mt-1">
                    {card.outcome}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shrink-0 text-[#34D399]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Card Middle: Stats */}
              <div className="relative z-10 grid grid-cols-2 gap-4 items-center py-4 my-auto border-t border-b border-white/15">
                <div className="pr-3">
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none">
                    {card.stat1.value}
                  </div>
                  <div className="text-[11px] text-[#A7F3D0] font-bold mt-1.5 uppercase tracking-wider">
                    {card.stat1.label}
                  </div>
                </div>

                <div className="pl-3 border-l border-white/15">
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none">
                    {card.stat2.value}
                  </div>
                  <div className="text-[11px] text-[#A7F3D0] font-bold mt-1.5 uppercase tracking-wider">
                    {card.stat2.label}
                  </div>
                </div>
              </div>

              {/* Card Bottom: Photo */}
              <div className="relative z-10 mt-6 pt-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/2] shadow-lg border border-white/20 bg-black/20 group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={card.photo}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Centered Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              if (onNavigateToDashboard) {
                onNavigateToDashboard();
              } else if (onNavigateToDetect) {
                onNavigateToDetect();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0A2E20] hover:bg-[#10B981] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <span>Open Intelligence Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default CaseStudyResults;
