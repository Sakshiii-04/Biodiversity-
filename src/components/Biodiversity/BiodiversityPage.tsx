import React, { useState } from 'react';
import { EarthGlobe } from '../Globe/EarthGlobe';
import { HotspotType, IncidentType } from '../../types';
import { Globe2, Sparkles, MapPin, Compass } from 'lucide-react';

interface BiodiversityPageProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  onNavigateToDetect: () => void;
  darkMode?: boolean;
}

export const BiodiversityPage: React.FC<BiodiversityPageProps> = ({
  hotspots,
  incidents,
  onNavigateToDetect,
  darkMode = false
}) => {
  const [threatFilter, setThreatFilter] = useState<'All' | 'Critical' | 'High' | 'Vulnerable'>('All');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotType | null>(hotspots[0] || null);

  const filteredHotspots = threatFilter === 'All' 
    ? hotspots 
    : hotspots.filter(h => h.threatLevel === threatFilter);

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? 'bg-[#061822] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1E3A2F]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b pb-8 border-emerald-500/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
              <Globe2 className="w-4 h-4 text-[#10B981]" />
              <span>Interactive Planetary Intelligence</span>
            </div>

            <h1 className={`font-serif text-3xl sm:text-5xl font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-[#0A2E20]'
            }`}>
              Explore Global <span className="italic text-[#10B981]">Biodiversity Hotspots</span>
            </h1>

            <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-[#2D5A46]'}`}>
              Rotate the interactive 3D Earth to examine high-priority biodiversity hotspots, endangered species under acute trade pressure, and verified historical wildlife crime seizure incidents.
            </p>
          </div>

          {/* Threat Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl border bg-white/50 dark:bg-[#0E2E23]/60 border-emerald-500/20 self-start md:self-auto">
            {(['All', 'Critical', 'High', 'Vulnerable'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setThreatFilter(level)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  threatFilter === level
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-[#0A2E20] hover:bg-gray-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Earth Globe Canvas Box */}
        <div className={`relative h-[550px] sm:h-[620px] rounded-3xl overflow-hidden border shadow-2xl ${
          darkMode ? 'bg-[#030D12] border-[#10B981]/25' : 'bg-[#03131D] border-[#2D5A46]/20'
        }`}>
          {/* Overlay Notice */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-xs flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#10B981] animate-spin" style={{ animationDuration: '8s' }} />
            <span>Click and drag globe to rotate • Hover markers to inspect</span>
          </div>

          <EarthGlobe
            hotspots={filteredHotspots}
            incidents={incidents}
            onNavigateToDetect={onNavigateToDetect}
          />
        </div>

        {/* Hotspot Roster & Species Matrix */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
              Monitored Biodiversity Hotspots ({filteredHotspots.length})
            </h2>
            <span className="text-xs text-gray-500">Showing {threatFilter} Threat Level</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedHotspot?.id === hotspot.id
                    ? darkMode
                      ? 'bg-[#0E2E23] border-[#10B981] ring-2 ring-[#10B981]/40'
                      : 'bg-white border-[#10B981] ring-2 ring-[#10B981]/30 shadow-md'
                    : darkMode
                      ? 'bg-[#0A1F18]/60 border-[#10B981]/20 hover:border-[#10B981]/50'
                      : 'bg-white border-[#2D5A46]/15 hover:border-[#2D5A46]/40'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs uppercase font-bold tracking-widest text-[#10B981]">
                      {hotspot.region}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    hotspot.threatLevel === 'Critical'
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
                      : hotspot.threatLevel === 'High'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {hotspot.threatLevel} Threat
                  </span>
                </div>

                <h3 className={`font-serif text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
                  {hotspot.name}
                </h3>
                
                <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {hotspot.description}
                </p>

                <div className="pt-3 border-t border-emerald-500/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                    Key Vulnerable Species ({hotspot.species.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {hotspot.species.slice(0, 3).map((sp, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                          darkMode ? 'bg-[#0E2E23] text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {sp.name}
                      </span>
                    ))}
                    {hotspot.species.length > 3 && (
                      <span className="text-[10px] text-gray-500 py-0.5">+{hotspot.species.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Hotspot Deep Dive */}
        {selectedHotspot && (
          <div className={`p-8 sm:p-10 rounded-3xl border shadow-xl space-y-6 ${
            darkMode ? 'bg-[#0E2E23]/80 border-[#10B981]/30' : 'bg-white border-[#2D5A46]/20'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/15 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#10B981] tracking-widest">
                  Featured Hotspot Deep Dive
                </span>
                <h3 className={`font-serif text-2xl sm:text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-[#0A2E20]'}`}>
                  {selectedHotspot.name} ({selectedHotspot.country})
                </h3>
              </div>
              <button
                onClick={onNavigateToDetect}
                className="px-5 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Screen Posts From This Region</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Biodiversity Significance
                  </h4>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedHotspot.biodiversitySignificance}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Conservation Action & Enforcement
                  </h4>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedHotspot.conservationAction}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">
                  Protected Species in this Hotspot
                </h4>
                <div className="space-y-2.5">
                  {selectedHotspot.species.map((sp, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border flex items-center justify-between ${
                        darkMode ? 'bg-[#0A1F18] border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs sm:text-sm">{sp.name}</div>
                        <div className="text-[11px] italic text-gray-500">{sp.scientificName}</div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
                          {sp.citesAppendix}
                        </span>
                        <div className="text-[10px] text-amber-500 font-semibold mt-0.5">{sp.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default BiodiversityPage;
