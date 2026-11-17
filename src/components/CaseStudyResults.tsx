import React, { useState } from 'react';

interface CaseStudyResultsProps {
  onNavigateToDetect?: () => void;
  onNavigateToDashboard?: () => void;
}

export const CaseStudyResults: React.FC<CaseStudyResultsProps> = ({
  onNavigateToDetect,
  onNavigateToDashboard
}) => {
  // Option to toggle between WILDINTEL Enforcement results and original Agency Demo visuals
  const [activeMode, setActiveMode] = useState<'wildintel' | 'agency'>('wildintel');

  const headlineWords = [
    'How',
    'enforcement',
    'agencies',
    'achieved',
    'measurable',
    'results',
    'with',
    'WILDINTEL'
  ];

  const cardsData = [
    {
      id: 'card-1',
      bgStyle: {
        background: 'radial-gradient(circle at top, rgb(176, 64, 18), rgb(46, 13, 4))'
      },
      title: activeMode === 'wildintel' ? 'Operation Thunder' : 'Hotel Mira',
      outcome: activeMode === 'wildintel' ? 'Maritime transit interdicted' : 'Regional visibility boosted',
      monogram: 'mountain',
      stat1: {
        value: activeMode === 'wildintel' ? '+11.9 T' : '+240%',
        label: activeMode === 'wildintel' ? 'Scales Seized' : 'Website Visitors'
      },
      stat2: {
        value: activeMode === 'wildintel' ? 'US$48M' : '+180%',
        label: activeMode === 'wildintel' ? 'Trade Interdicted' : 'Direct Inquiries'
      },
      photo: activeMode === 'wildintel'
        ? 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1200&auto=format&fit=crop'
        : 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c42a7f3d-d802-4377-8cc6-9c209cdfad5f.webp',
      alt: activeMode === 'wildintel' ? 'Pangolin scale seizure interdiction' : 'Alpine chalet hotel at sunset'
    },
    {
      id: 'card-2',
      bgStyle: {
        background: 'linear-gradient(180deg, rgb(236, 96, 28), rgb(250, 150, 56))'
      },
      title: activeMode === 'wildintel' ? 'Operation Save Kurma' : 'Nordhaus Estates',
      outcome: activeMode === 'wildintel' ? 'Online syndicate dismantled' : 'Leads multiplied',
      monogram: 'house',
      stat1: {
        value: activeMode === 'wildintel' ? '1,364' : '+663%',
        label: activeMode === 'wildintel' ? 'Specimens Rescued' : 'Online Leads'
      },
      stat2: {
        value: activeMode === 'wildintel' ? '+94%' : '+32%',
        label: activeMode === 'wildintel' ? 'Detection Precision' : 'Organic Traffic'
      },
      photo: activeMode === 'wildintel'
        ? 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?q=80&w=1200&auto=format&fit=crop'
        : 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d469e4d7-94ba-4457-ad51-b589766069f0.webp',
      alt: activeMode === 'wildintel' ? 'Star tortoise conservation rescue' : 'Warm real-estate showroom model'
    },
    {
      id: 'card-3',
      bgStyle: {
        background: 'radial-gradient(circle at top, rgb(132, 52, 22), rgb(24, 9, 5))'
      },
      title: activeMode === 'wildintel' ? 'Project Predator' : 'Studio Belle Peau',
      outcome: activeMode === 'wildintel' ? 'Digital black market swept' : 'From invisible to fully booked',
      monogram: 'lotus',
      stat1: {
        value: activeMode === 'wildintel' ? '+84%' : '+362%',
        label: activeMode === 'wildintel' ? 'Codewords Flagged' : 'Qualified Leads'
      },
      stat2: {
        value: activeMode === 'wildintel' ? '100%' : '+75%',
        label: activeMode === 'wildintel' ? 'Triage Compliance' : 'Online Bookings'
      },
      photo: activeMode === 'wildintel'
        ? 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop'
        : 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e791074d-795e-4b42-ad94-a6b113ecb72d.webp',
      alt: activeMode === 'wildintel' ? 'Bengal tiger habitat patrol' : 'Candle-lit spa treatment room'
    }
  ];

  const renderMonogram = (type: string) => {
    switch (type) {
      case 'mountain':
        return (
          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          </svg>
        );
      case 'house':
        return (
          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        );
      case 'lotus':
      default:
        return (
          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9s-9-4.03-9-9a9 9 0 0 1 9-9z" strokeDasharray="2 3" opacity="0.3" />
            <path d="M12 3c2 4 4 7 4 10a4 4 0 0 1-8 0c0-3 2-6 4-10z" />
            <path d="M12 13c3-1 6-1 8 2-2 3-5 3-8 1z" />
            <path d="M12 13c-3-1-6-1-8 2 2 3 5 3 8 1z" />
          </svg>
        );
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto case-study-section">
      {/* Container styled with light background & sunset aesthetics */}
      <div className="bg-[#FDFDFD] dark:bg-[#081f2c] rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#EAE2D0] dark:border-[#1FB6C9]/20 shadow-xl transition-all">
        {/* Header Block with entrance animation */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-6">
          {/* Subtle View Switcher Pill */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F7F2E7] dark:bg-[#061822] rounded-full border border-[#EAE2D0] dark:border-white/10 mb-2">
            <button
              onClick={() => setActiveMode('wildintel')}
              className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all ${
                activeMode === 'wildintel'
                  ? 'bg-[#B8460F] text-white shadow-sm'
                  : 'text-[#3A5A64] dark:text-[#E4F4F5]/70 hover:text-black'
              }`}
            >
              WILDINTEL Impact
            </button>
            <button
              onClick={() => setActiveMode('agency')}
              className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all ${
                activeMode === 'agency'
                  ? 'bg-[#B8460F] text-white shadow-sm'
                  : 'text-[#3A5A64] dark:text-[#E4F4F5]/70 hover:text-black'
              }`}
            >
              Elo One Demo
            </button>
          </div>

          {/* Staggered Entrance Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#000] dark:text-white leading-[1.15]">
            {headlineWords.map((word, idx) => (
              <span
                key={idx}
                className="inline-block mr-2.5 transition-transform duration-500 hover:-translate-y-0.5"
                style={{
                  animation: `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60}ms backwards`
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Lead Text */}
          <p
            className="text-base sm:text-lg text-[#2B2B2B] dark:text-[#E4F4F5]/85 leading-relaxed max-w-2xl mx-auto font-light"
            style={{ animation: 'fadeIn 0.8s ease-out 0.4s backwards' }}
          >
            {activeMode === 'wildintel'
              ? 'Our partners confront complex wildlife trafficking across digital borders, but the goal is always the same: measurable results. The verified operations below show the impact that is actually possible.'
              : 'Our clients come from very different industries, but the goal is always the same: measurable results. The projects below show the results that are actually possible.'}
          </p>

          {/* Thin Rule */}
          <div
            className="w-16 h-[1.5px] bg-[#B8460F]/40 mx-auto mt-6"
            style={{ animation: 'expandWidth 0.7s ease-out 0.5s backwards' }}
          />
        </div>

        {/* 3 Sunset Orange Result Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 mb-12">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className="group relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
              style={{
                ...card.bgStyle,
                minHeight: '490px',
                animation: `cardRise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.2 + index * 0.12}s backwards`
              }}
            >
              {/* Subtle top ambient glow */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/20 transition-all duration-500" />

              {/* Card Top: Client / Case Name, Outcome & Monogram */}
              <div className="relative z-10 flex items-start justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                    {card.outcome}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 shrink-0">
                  {renderMonogram(card.monogram)}
                </div>
              </div>

              {/* Card Middle: Two Big Stats Divided by Thin White Rule */}
              <div className="relative z-10 grid grid-cols-2 gap-4 items-center py-4 my-auto border-t border-b border-white/20">
                <div className="pr-3">
                  <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none font-sans">
                    {card.stat1.value}
                  </div>
                  <div className="text-xs text-white/75 font-medium mt-1.5 uppercase tracking-wider">
                    {card.stat1.label}
                  </div>
                </div>

                <div className="pl-3 border-l border-white/25">
                  <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none font-sans">
                    {card.stat2.value}
                  </div>
                  <div className="text-xs text-white/75 font-medium mt-1.5 uppercase tracking-wider">
                    {card.stat2.label}
                  </div>
                </div>
              </div>

              {/* Card Bottom: Photo Framed by Stacked Translucent "Paper" Layers that Fan Out on Hover */}
              <div className="relative z-10 mt-6 pt-2">
                {/* Layer 1 (Bottom paper sheet) */}
                <div
                  className="absolute inset-x-2 -top-2.5 h-16 bg-white/20 rounded-2xl backdrop-blur-sm transition-transform duration-500 ease-out origin-bottom-left group-hover:-rotate-3 group-hover:-translate-y-2 group-hover:bg-white/25"
                  aria-hidden="true"
                />

                {/* Layer 2 (Middle paper sheet) */}
                <div
                  className="absolute inset-x-1 -top-1.5 h-16 bg-white/35 rounded-2xl backdrop-blur-sm transition-transform duration-500 ease-out origin-bottom-right group-hover:rotate-3 group-hover:-translate-y-1 group-hover:bg-white/40"
                  aria-hidden="true"
                />

                {/* Layer 3 (Top Photo Container, 3:2 aspect ratio) */}
                <div className="relative z-20 rounded-2xl overflow-hidden aspect-[3/2] shadow-lg border border-white/30 bg-black/20 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={card.photo}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Centered Button: White pill with soft border, darkening on hover */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              if (onNavigateToDetect) {
                onNavigateToDetect();
              } else if (onNavigateToDashboard) {
                onNavigateToDashboard();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#B8460F] font-semibold text-sm sm:text-base border border-[#B8460F]/30 hover:border-[#B8460F] hover:bg-[#FAF7F0] shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.8s backwards' }}
          >
            {activeMode === 'wildintel' ? 'View All Intelligence Cases' : 'View more projects'}
          </button>
        </div>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 4rem; }
        }
        @keyframes cardRise {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .case-study-section * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
