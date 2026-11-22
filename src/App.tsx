import { useState, useEffect } from 'react';
import { Navigation, AppPage } from './components/Navigation';
import { Hero } from './components/Hero';
import { LiveTicker } from './components/LiveTicker';
import { Mission } from './components/Mission';
import { WhatWeDoPage } from './components/WhatWeDo/WhatWeDoPage';
import { AboutUsPage } from './components/AboutUs/AboutUsPage';
import { BiodiversityPage } from './components/Biodiversity/BiodiversityPage';
import { DetectionSection } from './components/Detection/DetectionSection';
import { AnalyticsDashboard } from './components/Dashboard/AnalyticsDashboard';
import { ArchitectureSection } from './components/Architecture/ArchitectureSection';
import { ConservationImpact } from './components/Impact/ConservationImpact';
import { CaseStudyResults } from './components/CaseStudyResults';
import { Footer } from './components/Footer';

import { BIODIVERSITY_HOTSPOTS } from './data/hotspotsData';
import { HISTORICAL_INCIDENTS } from './data/incidentsData';
import { INITIAL_ANALYSIS_RECORDS } from './data/initialAnalysisRecords';
import { TRANSLATIONS, SupportedLanguage } from './utils/translations';
import type { HotspotType, IncidentType, AnalysisResult } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const [hotspots] = useState<HotspotType[]>(BIODIVERSITY_HOTSPOTS);
  const [incidents] = useState<IncidentType[]>(HISTORICAL_INCIDENTS);
  const [analysisRecords, setAnalysisRecords] = useState<AnalysisResult[]>(INITIAL_ANALYSIS_RECORDS);

  const dict = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Real-time Language Switcher via Google Translate Engine
  useEffect(() => {
    const triggerTranslation = () => {
      try {
        const targetLang = language;
        if (targetLang === 'en') {
          document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        } else {
          document.cookie = `googtrans=/en/${targetLang}; path=/;`;
          document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname};`;
        }

        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (combo && combo.value !== targetLang) {
          combo.value = targetLang;
          combo.dispatchEvent(new Event('change'));
        }
      } catch (e) {
        // ignore
      }
    };

    triggerTranslation();
  }, [language]);

  // Dynamic Dashboard Update: When user logs an analysis from Detection tool
  const handleLogAnalysisToDashboard = (record: AnalysisResult) => {
    setAnalysisRecords(prev => [record, ...prev]);
  };

  const handleNavigatePage = (page: AppPage, targetSection?: string) => {
    setCurrentPage(page);
    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen font-sans relative selection:bg-emerald-500 selection:text-white dark:selection:bg-emerald-500 dark:selection:text-white transition-colors duration-300 ${
      darkMode ? 'dark bg-[#061822] text-[#E4F4F5]' : 'bg-[#FAF8F5] text-[#1E3A2F]'
    }`}>
      {/* Top Sticky Header — Animated Navigation inspired by TRAFFIC */}
      <Navigation
        currentPage={currentPage}
        onPageChange={handleNavigatePage}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        language={language}
        onLanguageChange={setLanguage}
        dict={dict}
      />

      {/* Main Pages Switch */}
      <main className="pt-2">
        {/* PAGE 1: HOME (Landing Experience: 3D Earth Hero + Mission + Case Studies + Impact) */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 3D Earth Hero with Wallpaper & Quick Access */}
            <Hero
              hotspots={hotspots}
              incidents={incidents}
              onNavigateToDetect={() => handleNavigatePage('detect')}
              onNavigateToWhatWeDo={() => handleNavigatePage('what-we-do')}
              onNavigateToMission={() => {
                const el = document.getElementById('mission');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              dict={dict}
              darkMode={darkMode}
            />

            {/* Live Interdiction Feed / Ticker */}
            <LiveTicker
              darkMode={darkMode}
              onNavigateToDetect={() => handleNavigatePage('detect')}
            />

            {/* Our Mission: Editorial Story & 3 Pillars */}
            <Mission
              onDetectClick={() => handleNavigatePage('detect')}
              onWhatWeDoClick={() => handleNavigatePage('what-we-do')}
              onExploreEarthClick={() => handleNavigatePage('biodiversity')}
              darkMode={darkMode}
            />

            {/* Case Studies / Enforcement Results Section */}
            <CaseStudyResults
              onNavigateToDetect={() => handleNavigatePage('detect')}
              onNavigateToDashboard={() => handleNavigatePage('dashboard')}
            />

            {/* Conservation Impact & Ethical AI Pledge */}
            <ConservationImpact />
          </div>
        )}

        {/* PAGE 2: WHAT WE DO (Dedicated comprehensive work explainer with secondary sticky subnav) */}
        {currentPage === 'what-we-do' && (
          <div className="animate-in fade-in duration-300 pt-28 sm:pt-32">
            <WhatWeDoPage
              onNavigateToDetect={() => handleNavigatePage('detect')}
              onNavigateToBiodiversity={() => handleNavigatePage('biodiversity')}
              onNavigateToDashboard={() => handleNavigatePage('dashboard')}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* PAGE 3: ABOUT US (Dedicated conservation technologist initiative story with secondary sticky subnav) */}
        {currentPage === 'about-us' && (
          <div className="animate-in fade-in duration-300 pt-28 sm:pt-32">
            <AboutUsPage
              onNavigateToWhatWeDo={() => handleNavigatePage('what-we-do')}
              onNavigateToDetect={() => handleNavigatePage('detect')}
              onNavigateToBiodiversity={() => handleNavigatePage('biodiversity')}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* PAGE 4: EXPLORE BIODIVERSITY (Dedicated 3D planetary hotspots & species hub) */}
        {currentPage === 'biodiversity' && (
          <div className="animate-in fade-in duration-300 pt-12 sm:pt-16">
            <BiodiversityPage
              hotspots={hotspots}
              incidents={incidents}
              onNavigateToDetect={() => handleNavigatePage('detect')}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* PAGE 5: DETECTION PLATFORM (Flagship AI Detection Feature) */}
        {currentPage === 'detect' && (
          <div className="animate-in fade-in duration-300 pt-12 sm:pt-16">
            <DetectionSection
              onLogAnalysisToDashboard={handleLogAnalysisToDashboard}
              onNavigateToDashboard={() => handleNavigatePage('dashboard')}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* PAGE 6: DASHBOARD (Analytics & Intelligence Audit Queue) */}
        {currentPage === 'dashboard' && (
          <div className="animate-in fade-in duration-300 pt-12 sm:pt-16">
            <AnalyticsDashboard
              records={analysisRecords}
              onNavigateToDetect={() => handleNavigatePage('detect')}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* PAGE 7: TECHNICAL ARCHITECTURE & RESEARCH */}
        {currentPage === 'architecture' && (
          <div className="animate-in fade-in duration-300 pt-12 sm:pt-16">
            <ArchitectureSection darkMode={darkMode} />
          </div>
        )}
      </main>

      {/* Global Conservation Footer */}
      <Footer onNavigate={(page) => handleNavigatePage(page)} />
    </div>
  );
}

export default App;
