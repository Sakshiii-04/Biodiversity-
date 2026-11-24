import React from 'react';
import { Radio, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface LiveTickerProps {
  darkMode?: boolean;
  onNavigateToDetect?: () => void;
}

interface TickerSignal {
  platform: 'TELEGRAM' | 'OLX' | 'FACEBOOK' | 'WHATSAPP' | 'TIKTOK' | 'WECHAT';
  timeAgo: string;
  threat: 'CRITICAL' | 'ELEVATED' | 'REVIEW';
  species: string;
  snippet: string;
}

const SIGNALS: TickerSignal[] = [
  {
    platform: 'TELEGRAM',
    timeAgo: '14m ago',
    threat: 'CRITICAL',
    species: 'Sunda Pangolin',
    snippet: '50kg dried pangolin scales flagged with evasive maritime courier delivery offer'
  },
  {
    platform: 'OLX',
    timeAgo: '42m ago',
    threat: 'ELEVATED',
    species: 'Indian Star Tortoise',
    snippet: 'Live exotic pet listing intercepted using Vaastu prosperity cryptonym'
  },
  {
    platform: 'WHATSAPP',
    timeAgo: '1h ago',
    threat: 'CRITICAL',
    species: 'Bengal Monitor Lizard',
    snippet: 'Hathajodi sacred root ritual sales ring routed to encrypted group'
  },
  {
    platform: 'FACEBOOK',
    timeAgo: '2h ago',
    threat: 'CRITICAL',
    species: 'African Elephant',
    snippet: '"Carved white bone" with Schreger grain lines flagged as illegal ivory trade'
  },
  {
    platform: 'TIKTOK',
    timeAgo: '3h ago',
    threat: 'REVIEW',
    species: 'Slow Loris',
    snippet: 'Cute primate private rehoming video flagged for commercial adoption disguise'
  },
  {
    platform: 'WECHAT',
    timeAgo: '4h ago',
    threat: 'CRITICAL',
    species: 'Helmeted Hornbill',
    snippet: 'Solid red casque head blocks tracked across Southeast Asia border corridor'
  }
];

export const LiveTicker: React.FC<LiveTickerProps> = ({ darkMode = false, onNavigateToDetect }) => {
  return (
    <div className={`w-full border-y relative z-20 overflow-hidden select-none transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#061822] border-[#10B981]/25 text-gray-200' 
        : 'bg-[#0B0F0D] border-[#10B981]/30 text-white'
    }`}>
      <div className="max-w-[1440px] mx-auto flex items-center">
        
        {/* Fixed Left Header Pill */}
        <div className={`px-4 sm:px-6 py-2.5 flex items-center gap-2 border-r shrink-0 z-10 ${
          darkMode 
            ? 'bg-[#0B2533] border-[#10B981]/30 text-[#A7F3D0]' 
            : 'bg-[#0E2E23] border-[#10B981]/35 text-[#34D399]'
        }`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
            Live Interdiction Feed
          </span>
        </div>

        {/* Marquee Track with CSS Animation */}
        <div className="overflow-hidden whitespace-nowrap py-2 relative flex-1 group">
          <div className="inline-flex items-center gap-8 animate-marquee group-hover:[animation-play-state:paused] cursor-pointer" onClick={onNavigateToDetect}>
            {/* Render items twice for continuous infinite loop effect */}
            {[...SIGNALS, ...SIGNALS].map((sig, idx) => (
              <div 
                key={idx} 
                className="inline-flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors shrink-0"
              >
                {/* Platform Tag */}
                <span className={`px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase tracking-wider ${
                  sig.platform === 'TELEGRAM' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                  sig.platform === 'WHATSAPP' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  sig.platform === 'OLX' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  sig.platform === 'FACEBOOK' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  sig.platform === 'TIKTOK' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {sig.platform}
                </span>

                {/* Threat Badge */}
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                  sig.threat === 'CRITICAL' ? 'bg-red-500/25 text-red-300 border border-red-500/40' :
                  sig.threat === 'ELEVATED' ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {sig.threat}
                </span>

                <span className="font-semibold text-white">
                  {sig.species}:
                </span>

                <span className="text-gray-300 truncate max-w-sm sm:max-w-md">
                  {sig.snippet}
                </span>

                <span className="text-gray-500 text-[10px] font-mono">
                  • {sig.timeAgo}
                </span>

                <span className="text-[#10B981] ml-4 opacity-40">│</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        {onNavigateToDetect && (
          <button
            onClick={onNavigateToDetect}
            className={`hidden md:flex items-center gap-1 px-4 py-2 text-[11px] font-bold uppercase tracking-wider border-l shrink-0 transition-colors cursor-pointer ${
              darkMode 
                ? 'bg-[#0B2533] border-[#10B981]/30 text-[#A7F3D0] hover:text-white' 
                : 'bg-[#0E2E23] border-[#10B981]/35 text-[#34D399] hover:text-white'
            }`}
          >
            <span>Scan Post</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
export default LiveTicker;
