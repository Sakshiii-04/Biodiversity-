import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  Sun,
  Moon,
  Languages,
  Search,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { SupportedLanguage, TranslationDictionary } from '../utils/translations';

export type AppPage = 'home' | 'what-we-do' | 'about-us' | 'biodiversity' | 'detect' | 'dashboard' | 'architecture';

interface NavigationProps {
  currentPage: AppPage;
  onPageChange: (page: AppPage, targetSection?: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  dict?: TranslationDictionary;
}

const LANGUAGES_LIST: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'id', label: 'Bahasa', flag: '🇮🇩' },
];

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  darkMode = false,
  onToggleDarkMode,
  language = 'en',
  onLanguageChange,
  dict
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<'what-we-do' | 'about-us' | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubSection, setActiveSubSection] = useState<string>('overview');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Hotkey (Ctrl + K / Cmd + K) for Command Palette / Quick Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnterNav = (menu: 'what-we-do' | 'about-us') => {
    if (navMenuTimeoutRef.current) clearTimeout(navMenuTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeaveNav = () => {
    navMenuTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (page: AppPage, targetSection?: string) => {
    onPageChange(page, targetSection);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (targetSection) {
      setActiveSubSection(targetSection);
    } else {
      setActiveSubSection('overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentLangObj = LANGUAGES_LIST.find(l => l.code === language) || LANGUAGES_LIST[0];

  // Primary navigation links:
  // Home | What We Do | About Us | Biodiversity | Detection Platform | Dashboard | Architecture & Research
  const navItems = [
    { id: 'home' as AppPage, label: dict?.navHome || 'Home' },
    {
      id: 'what-we-do' as AppPage,
      label: dict?.navWhatWeDo || 'What We Do',
      hasDropdown: true,
      dropdownKey: 'what-we-do' as const,
    },
    {
      id: 'about-us' as AppPage,
      label: dict?.navAboutUs || 'About Us',
      hasDropdown: true,
      dropdownKey: 'about-us' as const,
    },
    {
      id: 'biodiversity' as AppPage,
      label: dict?.navBiodiversity || 'Biodiversity',
    },
    { id: 'detect' as AppPage, label: dict?.navDetect || 'Detection Platform' },
    { id: 'dashboard' as AppPage, label: dict?.navDashboard || 'Dashboard' },
    { id: 'architecture' as AppPage, label: dict?.navArchitecture || 'Architecture' },
  ];

  // Secondary subnav tabs for "What We Do" (mirroring traffic.org clean topic subnav)
  const whatWeDoSubSections = [
    { id: 'overview', label: 'Overview', sectionId: '' },
    { id: 'digital-detection', label: 'Digital Detection', sectionId: 'digital-detection' },
    { id: 'ai-analysis', label: 'AI Content Analysis', sectionId: 'ai-analysis' },
    { id: 'biodiversity-awareness', label: 'Biodiversity Awareness', sectionId: 'biodiversity-awareness' },
    { id: 'monitoring-insights', label: 'Monitoring & Insights', sectionId: 'monitoring-insights' },
    { id: 'responsible-conservation', label: 'Ethical Conservation', sectionId: 'responsible-conservation' },
  ];

  // Secondary subnav tabs for "About Us"
  const aboutUsSubSections = [
    { id: 'overview', label: 'Overview', sectionId: '' },
    { id: 'who-we-are', label: 'Who We Are', sectionId: 'who-we-are' },
    { id: 'why-samraksh', label: 'Why SAMRAKSH?', sectionId: 'why-samraksh' },
    { id: 'mission-vision', label: 'Mission & Vision', sectionId: 'mission-vision' },
    { id: 'our-approach', label: 'Our Approach', sectionId: 'our-approach' },
  ];

  // Quick search keywords
  const searchSuggestions = [
    { title: 'Pangolin Scales & Keratin Derivatives', category: 'CITES Appendix I • Critical Protection', page: 'detect' as AppPage },
    { title: 'Hathajodi (Bengal Monitor Lizard Hemipenis)', category: 'Hindi Codeword Resolution • WPA Sch. I', page: 'what-we-do' as AppPage, section: 'ai-analysis' },
    { title: 'Indian Star Tortoise (Vaastu Pet Trade)', category: 'Live Exotic Reptile • WPA Sch. I', page: 'detect' as AppPage },
    { title: 'White Jade / Schreger Ivory Carvings', category: 'Trade Indicator • Forensic Identification', page: 'what-we-do' as AppPage, section: 'ai-analysis' },
    { title: 'Bengal Tiger Claws, Skin & Bones', category: 'CITES Appendix I • High Threat', page: 'what-we-do' as AppPage, section: 'biodiversity-awareness' },
    { title: 'Western Ghats Biodiversity Hotspot', category: 'Hotspot Explorer • 3D Planetary Map', page: 'biodiversity' as AppPage },
    { title: 'Sundarbans Mangrove Tiger Reserve', category: 'Hotspot Explorer • Estuarine Ecosystem', page: 'biodiversity' as AppPage },
    { title: 'Indo-Burma Border Wildlife Corridor', category: 'Hotspot Explorer • Transnational Route', page: 'biodiversity' as AppPage },
    { title: 'Multimodal Bayesian Fusion Engine', category: 'AI Architecture & Research Flowchart', page: 'architecture' as AppPage },
    { title: 'WCCB Operation Wildnet VI Protocol', category: 'Statutory & Regulatory Alignment', page: 'what-we-do' as AppPage, section: 'monitoring-insights' },
    { title: 'Platform Traffic Telemetry (Telegram, OLX, Meta)', category: 'Surveillance Telemetry', page: 'dashboard' as AppPage },
    { title: 'Print WCCB Case Dossier (PDF/JSON)', category: 'Forensic Case Export Tool', page: 'dashboard' as AppPage },
  ];

  const filteredSearchResults = searchSuggestions.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ================= PRIMARY TRAFFIC-STYLE HEADER ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#0B0F0D]/95 backdrop-blur-md shadow-2xl border-b border-[#10B981]/25'
          : 'bg-[#0B0F0D]/90 backdrop-blur-sm border-b border-white/10'
          } text-white`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>

          {/* Brand Logo: SAMRAKSH */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="relative w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-xl bg-white p-0.5 flex items-center justify-center shadow-md shadow-[#10B981]/25 border border-white/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img src="/logo.png" alt="SAMRAKSH Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-serif text-[24px] sm:text-[26px] font-bold tracking-tight leading-none text-white block">
                SAMRAKSH
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold block mt-0.5 text-[#A7F3D0] whitespace-nowrap">
                Vigilance for the Wild in the Digital Era.
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links — Exact TRAFFIC-style underline and hover animation */}
          <nav
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
            onMouseLeave={handleMouseLeaveNav}
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isDropdownActive = item.hasDropdown && activeDropdown === item.dropdownKey;

              return (
                <div
                  key={item.id}
                  className="relative py-2"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnterNav(item.dropdownKey)}
                >
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${isActive
                      ? 'text-[#34D399]'
                      : 'text-gray-200 hover:text-[#34D399]'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownActive ? 'rotate-180 text-[#34D399]' : 'text-gray-400'}`} />
                    )}

                    {/* TRAFFIC Signature: Bold Emerald Underline Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#10B981] shadow-sm shadow-[#10B981]" />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right Utility Controls: Search Icon, Language Selector, Dark Mode, Action CTA */}
          <div className="hidden sm:flex items-center gap-2.5">

            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Search Species & Platform Modules"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#34D399]" />
            </button>

            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 transition-all cursor-pointer"
                title="Select Language"
              >
                <Languages className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{currentLangObj.flag} {currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-[#10B981]/30 bg-[#0B0F0D] shadow-2xl py-1 z-50 animate-traffic-dropdown">
                  {LANGUAGES_LIST.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors ${language === lang.code
                        ? 'bg-[#10B981]/20 text-[#34D399] font-bold'
                        : 'text-gray-300 hover:bg-white/5'
                        }`}
                    >
                      <span>{lang.flag} {lang.label}</span>
                      {language === lang.code && <span className="text-[10px] text-[#10B981]">●</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Switch */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-full border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 transition-all cursor-pointer"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-gray-300" />}
              </button>
            )}

          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 text-gray-300 hover:text-white"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#34D399]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-white/20 bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#34D399]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ================= TRAFFIC-STYLE SUBNAV STRIP — centered plain links ================= */}
        {activeDropdown === 'what-we-do' && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 animate-traffic-dropdown"
            style={{ background: '#141414', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }}
            onMouseEnter={() => handleMouseEnterNav('what-we-do')}
            onMouseLeave={handleMouseLeaveNav}
          >
            <div className="flex items-center justify-center h-12 px-8 gap-1">
              {[
                { label: 'Digital Trade Detection', section: 'digital-detection' },
                { label: 'AI Content Analysis', section: 'ai-analysis' },
                { label: 'Biodiversity Awareness', section: 'biodiversity-awareness' },
                { label: 'Monitoring & Insights', section: 'monitoring-insights' },
                { label: 'Responsible Conservation', section: 'responsible-conservation' },
              ].map((item, i, arr) => (
                <React.Fragment key={i}>
                  <button
                    onClick={() => handleLinkClick('what-we-do', item.section)}
                    className="text-[13px] font-medium text-gray-300 hover:text-[#34D399] hover:bg-white/5 rounded transition-all duration-150 whitespace-nowrap px-4 py-1.5 cursor-pointer"
                  >
                    {item.label}
                  </button>
                  {i < arr.length - 1 && (
                    <span className="text-gray-600 select-none text-sm">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {activeDropdown === 'about-us' && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 animate-traffic-dropdown"
            style={{ background: '#141414', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }}
            onMouseEnter={() => handleMouseEnterNav('about-us')}
            onMouseLeave={handleMouseLeaveNav}
          >
            <div className="flex items-center justify-center h-12 px-8 gap-1">
              {[
                { label: 'Who We Are', section: 'who-we-are' },
                { label: 'Our Mission & Vision', section: 'mission-vision' },
                { label: 'Why SAMRAKSH?', section: 'why-samraksh' },
                { label: 'Our Approach', section: 'our-approach' },
              ].map((item, i, arr) => (
                <React.Fragment key={i}>
                  <button
                    onClick={() => handleLinkClick('about-us', item.section)}
                    className="text-[13px] font-medium text-gray-300 hover:text-[#34D399] hover:bg-white/5 rounded transition-all duration-150 whitespace-nowrap px-4 py-1.5 cursor-pointer"
                  >
                    {item.label}
                  </button>
                  {i < arr.length - 1 && (
                    <span className="text-gray-600 select-none text-sm">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECONDARY STICKY SUB-NAVIGATION BAR (TRAFFIC SIGNATURE) ================= */}
        {(currentPage === 'what-we-do' || currentPage === 'about-us') && (
          <div
            className="w-full border-t border-[#1E2E27] bg-[#111815] animate-traffic-subnav"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-11 text-xs">
              <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar py-1">
                {(currentPage === 'what-we-do' ? whatWeDoSubSections : aboutUsSubSections).map((sub) => {
                  const isSelected = activeSubSection === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActiveSubSection(sub.id);
                        if (sub.sectionId) {
                          const el = document.getElementById(sub.sectionId);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`relative py-1.5 px-3 text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap ${isSelected
                        ? 'text-[#34D399] font-bold'
                        : 'text-gray-300 hover:text-[#34D399]'
                        }`}
                    >
                      <span>{sub.label}</span>
                      {isSelected && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#34D399]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>


      {/* ================= SEARCH MODAL DRAWER ================= */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
          <div className="bg-[#0B0F0D] border border-[#10B981]/40 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Search className="w-5 h-5 text-[#34D399]" />
                <span className="font-serif text-lg font-bold">Search SAMRAKSH Intelligence Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-400 bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  ESC to close
                </span>
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search species (e.g. Pangolin), codewords (e.g. hathajodi), or topics..."
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#10B981]"
                autoFocus
              />
            </div>

            {/* Suggestions */}
            <div className="space-y-1.5 pt-2 max-h-72 overflow-y-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block mb-2">
                Quick Results / Recommended Destinations
              </span>
              {filteredSearchResults.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleLinkClick(res.page, res.section);
                    setSearchModalOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="font-serif text-sm font-bold text-white group-hover:text-[#34D399]">
                      {res.title}
                    </div>
                    <div className="text-[11px] text-gray-400">{res.category}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#34D399] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#0B0F0D]/98 backdrop-blur-xl border-b border-[#10B981]/30 shadow-2xl z-40 overflow-y-auto p-6 space-y-4 text-white">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <div key={item.id} className="border-b border-white/10 pb-2">
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full text-left py-2.5 text-base font-bold uppercase tracking-wider flex items-center justify-between ${isActive ? 'text-[#34D399]' : 'text-gray-200'
                      }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  {/* Sub-links in mobile */}
                  {item.hasDropdown && (
                    <div className="pl-3 py-1 space-y-1.5">
                      {(item.dropdownKey === 'what-we-do' ? whatWeDoSubSections.slice(1) : aboutUsSubSections.slice(1)).map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLinkClick(item.id, sub.sectionId)}
                          className="w-full text-left py-1 text-xs text-gray-400 hover:text-white block"
                        >
                          • {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick CTA */}
          <div className="pt-4">
            <button
              onClick={() => handleLinkClick('detect')}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Detect Wildlife Trade</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
