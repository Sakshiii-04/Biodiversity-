import React from 'react';

export const ConservationImpact: React.FC = () => {
  const partners = [
    {
      name: 'WCCB India',
      role: 'Wildlife Crime Control Bureau',
      desc: 'Statutory body under MoEFCC combating organized wildlife crime across India and coordinating with state forest departments.'
    },
    {
      name: 'CITES',
      role: 'Convention on International Trade in Endangered Species',
      desc: 'Appendices I, II, and III protection categories and scientific cross-border compliance framework.'
    },
    {
      name: 'TRAFFIC India',
      role: 'Wildlife Trade Monitoring Network',
      desc: 'Global monitoring and investigative analysis of illicit commercial trade in wild flora and fauna.'
    },
    {
      name: 'IUCN Red List',
      role: 'Species Survival Commission',
      desc: 'Authoritative global taxonomy assessment and species biological extinction risk indices.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Asymmetric Header */}
      <div className="bg-gradient-to-br from-[#0F2D24] via-[#0A2E20] to-[#041B12] text-white rounded-[44px] p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#10B981]/25 relative overflow-hidden mb-16">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-[#34D399] text-xs uppercase font-bold tracking-widest border border-emerald-500/30">
              FORENSIC ETHICS & INVESTIGATIVE STANDARDS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1]">
              Evidence-based intelligence in service of <span className="italic text-[#34D399]">species conservation.</span>
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              SAMRAKSH operates with a strict human-in-the-loop mandate. Every AI alert provides structured evidence—including species taxonomy, detected trade indicators, and confidence ratings—to assist WCCB, forest departments, and NGO analysts. The platform flags suspected wildlife product sales for verification without making automated judicial accusations.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-[#EAB308]">100%</span>
              <div className="text-xs text-gray-200 font-medium">Mandatory Human Review Before Reporting</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-[#34D399]">36k+</span>
              <div className="text-xs text-gray-200 font-medium">CITES Listed Species Grounded</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-[#6EE7B7]">100+</span>
              <div className="text-xs text-gray-200 font-medium">Languages & Codeword Dialects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="font-serif text-3xl font-bold text-white">0%</span>
              <div className="text-xs text-gray-200 font-medium">Automated Accusations or Premature Flags</div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Framework Partners */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#10B981] block mb-1">
            Global Compliance Alignment
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#0A2E20] dark:text-white">
            Grounded in International Wildlife Law
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0E2E23]/60 rounded-[28px] p-6 shadow-sm border border-[#10B981]/20 hover:shadow-md transition-shadow space-y-2"
            >
              <span className="font-serif text-2xl font-bold text-[#0A2E20] dark:text-white block">
                {p.name}
              </span>
              <div className="text-xs font-semibold text-[#10B981] leading-snug">
                {p.role}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-1">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

