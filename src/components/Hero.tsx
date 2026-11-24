import React, { useState } from 'react';
import { EarthGlobe } from './Globe/EarthGlobe';
import { HotspotType, IncidentType } from '../types';
import { Sparkles, ChevronRight, Wind, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { TranslationDictionary } from '../utils/translations';

export interface NatureWallpaper {
  name: string;
  category: 'blue' | 'green' | 'dark' | 'amber';
  url: string;
  biome: string;
}

// Nature wallpapers
export const NATURE_WALLPAPERS: NatureWallpaper[] = [
  {
    name: 'Glacial Alpine Lagoon',
    category: 'blue',
    url: '/wallpapers/wallpaper-1-alpine-lake.jpg',
    biome: 'Pristine Montane Glacial Lake & Pine Forest'
  },
  {
    name: 'Temperate Rainforest Fjord',
    category: 'dark',
    url: '/wallpapers/wallpaper-2-misty-fjord.jpg',
    biome: 'Misty Coastal Fjord & Coniferous Canopy'
  },
  {
    name: 'Serpentine Alpine Ridge',
    category: 'green',
    url: '/wallpapers/wallpaper-3-winding-forest.jpg',
    biome: 'High-Altitude Winding Forest Pass'
  },
  {
    name: 'Coralis Coastal Lagoon',
    category: 'blue',
    url: '/wallpapers/wallpaper-4-turquoise-coast.jpg',
    biome: 'Pristine Turquoise Shore & Shallow Reef'
  },
  {
    name: 'Emerald Gorge Sanctuary',
    category: 'green',
    url: '/wallpapers/wallpaper-5-emerald-bridge.jpg',
    biome: 'Ancient Forest River Canyon & Arched Pass'
  },
  {
    name: 'Pelagic Marine Haven',
    category: 'blue',
    url: '/wallpapers/wallpaper-6-ocean-turtles.jpg',
    biome: 'Sunlit Deep Ocean & Wild Sea Turtle Sanctuary'
  },
  {
    name: 'Sunbeam Primeval Forest',
    category: 'amber',
    url: '/wallpapers/wallpaper-7-sunbeam-forest.jpg',
    biome: 'Morning Sunbeams & Deciduous Canopy Trail'
  }
];

interface HeroProps {
  hotspots: HotspotType[];
  incidents: IncidentType[];
  onNavigateToDetect: () => void;
  onNavigateToWhatWeDo?: () => void;
  onNavigateToMission: () => void;
  dict?: TranslationDictionary;
  darkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  hotspots,
  incidents,
  onNavigateToDetect,
  onNavigateToWhatWeDo,
  onNavigateToMission,
  dict,
  darkMode = false
}) => {
  const [activeWallpaperIdx, setActiveWallpaperIdx] = useState<number>(0);

  const activeWallpaper = NATURE_WALLPAPERS[activeWallpaperIdx] || NATURE_WALLPAPERS[0];

  const handleScrollDown = () => {
    const el = document.getElementById('mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  const handleNextWallpaper = () => {
    setActiveWallpaperIdx(prev => (prev + 1) % NATURE_WALLPAPERS.length);
  };

  return (
    <section className={`relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden pt-20 pb-4 transition-colors duration-300 select-none ${
      darkMode ? 'text-[#E4F4F5]' : 'text-[#1E3A2F]'
    }`}>
      {/* Dynamic Nature Wallpapers Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {NATURE_WALLPAPERS.map((wp, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              activeWallpaperIdx === idx ? 'opacity-90' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${wp.url})` }}
          />
        ))}

        {/* Directional Vignette Gradient Wash with Nature-Inspired Tones */}
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
          darkMode
            ? 'bg-gradient-to-r from-[#061822]/95 via-[#061822]/65 to-[#061822]/25'
            : 'bg-gradient-to-r from-[#FAF8F5]/94 via-[#FAF8F5]/60 to-[#FAF8F5]/20'
        }`} />
      </div>

      {/* Main Grid: Fits 100% within initial screen without scrolling */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center flex-1 my-auto min-h-0">
        
        {/* Left Column: Clean Editorial Headline & Content */}
        <div className="lg:col-span-5 space-y-3.5 lg:pr-2 text-left z-20">
          
          {/* Brand Eyebrow Pill Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[13px] font-bold uppercase tracking-widest shadow-sm ${
            darkMode
              ? 'bg-[#0E2E23]/90 border-[#10B981]/40 text-[#A7F3D0]'
              : 'bg-[#E8F5EE] border-[#10B981]/30 text-[#0A2E20]'
          }`}>
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>INDIA-FIRST MULTIMODAL WILDLIFE INTELLIGENCE PLATFORM</span>
          </div>

          {/* Cormorant Garamond Main Headline */}
          <h1 className={`font-serif text-[32px] sm:text-[38px] lg:text-[46px] xl:text-[52px] font-bold leading-[1.08] tracking-tight ${
            darkMode ? 'text-white' : 'text-[#0A2E20]'
          }`}>
            {dict?.heroTitleLine1 || 'The Wild Is Under Threat.'}
            <br />
            <span className={`italic font-bold relative ${darkMode ? 'text-[#E4F4F5]' : 'text-[#0A2E20]'}`}>
              {dict?.heroTitleLine2Pre || 'We Follow the '}
              <span className="text-[#10B981] dark:text-[#34D399] not-italic">
                {dict?.heroTitleLine2Highlight || 'Digital Trail.'}
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className={`text-[15px] sm:text-[16.5px] font-medium leading-relaxed max-w-md ${
            darkMode ? 'text-[#CBD5E1]' : 'text-[#2D5A46]'
          }`}>
            {dict?.heroDescription || 'Illegal wildlife trade has rapidly migrated into online marketplaces and encrypted social spaces. SAMRAKSH combines multimodal intelligence, CITES-grounded taxonomy, and investigator workflows to make covert wildlife trafficking visible.'}
          </p>

          {/* Action CTAs */}
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToDetect}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[14px] font-bold uppercase tracking-widest shadow-xl shadow-[#10B981]/35 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-100" />
              <span>{dict?.heroCtaDetect || 'TEST SUSPICIOUS POST'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {onNavigateToWhatWeDo ? (
              <button
                onClick={onNavigateToWhatWeDo}
                className={`text-[14px] font-bold uppercase tracking-widest transition-colors underline underline-offset-8 decoration-[#10B981]/60 hover:decoration-[#10B981] cursor-pointer flex items-center gap-1.5 ${
                  darkMode ? 'text-[#A7F3D0] hover:text-white' : 'text-[#0A2E20] hover:text-[#10B981]'
                }`}
              >
                <span>{dict?.heroCtaWhatWeDo || 'WHAT WE DO'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onNavigateToMission}
                className={`text-[14px] font-bold uppercase tracking-widest transition-colors underline underline-offset-8 decoration-[#10B981]/60 hover:decoration-[#10B981] cursor-pointer ${
                  darkMode ? 'text-[#A7F3D0] hover:text-white' : 'text-[#0A2E20] hover:text-[#10B981]'
                }`}
              >
                {dict?.heroCtaMission || 'Our Conservation Mission'}
              </button>
            )}
          </div>

          {/* Stats Bar with Frosted Glass Backing */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border shadow-sm grid grid-cols-3 gap-3 max-w-md ${
            darkMode 
              ? 'bg-[#061822]/75 border-[#10B981]/25 text-[#E4F4F5]' 
              : 'bg-white/80 border-[#10B981]/25 text-[#0A2E20]'
          }`}>
            <div>
              <div className={`font-serif text-[28px] lg:text-[32px] font-bold ${
                darkMode ? 'text-white' : 'text-[#0A2E20]'
              }`}>
                {dict?.statHotspots || '10+'}
              </div>
              <div className={`text-[11px] uppercase font-bold tracking-wider mt-0.5 ${
                darkMode ? 'text-[#8AAFB8]' : 'text-[#2D5A46]'
              }`}>
                {dict?.statHotspotsLabel || 'Hotspots Monitored'}
              </div>
            </div>
            <div>
              <div className="font-serif text-[28px] lg:text-[32px] font-bold text-[#E86350] dark:text-[#FFA193]">
                {dict?.statSeized || '8.8k+'}
              </div>
              <div className={`text-[11px] uppercase font-bold tracking-wider mt-0.5 ${
                darkMode ? 'text-[#8AAFB8]' : 'text-[#2D5A46]'
              }`}>
                {dict?.statSeizedLabel || 'Seizure Records Mapped'}
              </div>
            </div>
            <div>
              <div className="font-serif text-[28px] lg:text-[32px] font-bold text-[#10B981]">
                {dict?.statPrecision || '94%'}
              </div>
              <div className={`text-[11px] uppercase font-bold tracking-wider mt-0.5 ${
                darkMode ? 'text-[#8AAFB8]' : 'text-[#2D5A46]'
              }`}>
                {dict?.statPrecisionLabel || 'Detection Precision'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent 3D Earth Globe */}
        <div className="lg:col-span-7 relative h-[60vh] sm:h-[68vh] lg:h-[78vh] xl:h-[82vh] max-h-[820px] w-full flex items-center justify-center lg:translate-x-3 overflow-visible">
          <div className="w-full h-full relative bg-transparent overflow-visible">
            <EarthGlobe
              hotspots={hotspots}
              incidents={incidents}
              onNavigateToDetect={onNavigateToDetect}
              onRotationChange={(wpIdx) => setActiveWallpaperIdx(wpIdx)}
              onNextWallpaper={handleNextWallpaper}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Unified Control Dock */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-20 flex items-center justify-between pb-1 select-none shrink-0">
        
        {/* Left: Scroll Down Action Button */}
        <button
          onClick={handleScrollDown}
          className={`group flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md shadow-sm transition-all hover:scale-105 cursor-pointer text-[13px] font-semibold ${
            darkMode
              ? 'bg-[#0E2E23]/90 border-[#10B981]/30 text-white hover:border-[#10B981]'
              : 'bg-white/90 border-[#2D5A46]/20 text-[#0A2E20] hover:border-[#10B981]'
          }`}
          title="Scroll down to explore"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] group-hover:scale-125 transition-transform" />
          <span className="uppercase tracking-widest text-[12px] font-bold">SCROLL DOWN</span>
          <ChevronDown className="w-4 h-4 text-[#10B981] animate-bounce" />
        </button>

        {/* Center: Atmospheric Biome Indicator & Wallpaper Selector */}
        <div className={`hidden sm:flex items-center gap-2.5 backdrop-blur-md px-4 py-2 rounded-full border shadow-md text-[13px] transition-colors duration-300 ${
          darkMode
            ? 'bg-[#0E2E23]/85 border-[#10B981]/30 text-[#E4F4F5]'
            : 'bg-white/90 border-[#2D5A46]/20 text-[#0A2E20]'
        }`}>
          <div className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-[#10B981]" />
            <span className="text-[13px] font-semibold">
              Biome: <strong className={darkMode ? 'text-[#34D399]' : 'text-[#0A2E20]'}>{activeWallpaper.name}</strong>
            </span>
          </div>

          {/* Dots for Nature Wallpapers */}
          <div className={`flex items-center gap-1.5 pl-2 border-l ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {NATURE_WALLPAPERS.map((wp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWallpaperIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeWallpaperIdx === idx
                    ? 'bg-[#10B981] ring-2 ring-[#10B981]/40 scale-125'
                    : darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Switch to ${wp.name}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden sm:block w-28 pointer-events-none" />
      </div>
    </section>
  );
};
export default Hero;
