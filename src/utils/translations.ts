export type SupportedLanguage = 'en' | 'es' | 'fr' | 'id' | 'hi';

export interface TranslationDictionary {
  brandSubtitle: string;
  navEarth: string;
  navDetect: string;
  navDashboard: string;
  navArchitecture: string;
  ctaDetect: string;
  ctaAnalytics: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2Pre: string;
  heroTitleLine2Highlight: string;
  heroDescription: string;
  heroCtaDetect: string;
  heroCtaMission: string;
  statHotspots: string;
  statHotspotsLabel: string;
  statSeized: string;
  statSeizedLabel: string;
  statPrecision: string;
  statPrecisionLabel: string;
  rotateNotice: string;
  darkMode: string;
  lightMode: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandSubtitle: 'India-First Wildlife Trade Intelligence Platform',
    navEarth: 'Earth & Mission',
    navDetect: 'Wildlife Trade Detection',
    navDashboard: 'Intelligence Dashboard',
    navArchitecture: 'Architecture & Research',
    ctaDetect: 'AI Detection Tool',
    ctaAnalytics: 'Intelligence Dashboard',
    heroEyebrow: 'INDIA-FIRST MULTIMODAL WILDLIFE TRADE INTELLIGENCE',
    heroTitleLine1: 'The Wild Is Under Threat.',
    heroTitleLine2Pre: 'We Follow the ',
    heroTitleLine2Highlight: 'Digital Trail.',
    heroDescription: 'Illegal wildlife trade is increasingly moving into digital spaces. WILDINTEL uses AI-assisted text and image analysis to identify suspicious wildlife-trade content and support evidence-based investigations.',
    heroCtaDetect: 'DETECT WILDLIFE TRADE',
    heroCtaMission: 'Discover Our Mission',
    statHotspots: '10+',
    statHotspotsLabel: 'Hotspots Monitored',
    statSeized: '8.8k+',
    statSeizedLabel: 'Seizure Records Mapped',
    statPrecision: '94%',
    statPrecisionLabel: 'Detection Precision',
    rotateNotice: 'Interactive 3D Globe • Drag to rotate',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode'
  },
  hi: {
    brandSubtitle: 'भारत का पहला वन्यजीव व्यापार आसूचना मंच',
    navEarth: 'पृथ्वी और मिशन',
    navDetect: 'तस्करी पहचान (AI)',
    navDashboard: 'इंटेलीजेंस डैशबोर्ड',
    navArchitecture: 'आर्किटेक्चर व रिसर्च',
    ctaDetect: 'AI पहचान टूल',
    ctaAnalytics: 'एनालिटिक्स देखें',
    heroEyebrow: 'मल्टीमॉडल वन्यजीव अपराध आसूचना',
    heroTitleLine1: 'वन्यजीव संकट में हैं।',
    heroTitleLine2Pre: 'हम खोजते हैं ',
    heroTitleLine2Highlight: 'डिजिटल निशान।',
    heroDescription: 'अवैध वन्यजीव व्यापार तेजी से डिजिटल माध्यमों पर फैल रहा है। WILDINTEL संदिग्ध पोस्ट की पहचान करने और साक्ष्य-आधारित जांच में सहायता के लिए AI-संचालित विश्लेषण का उपयोग करता है।',
    heroCtaDetect: 'तस्करी की पहचान करें',
    heroCtaMission: 'हमारा मिशन जानें',
    statHotspots: '10+',
    statHotspotsLabel: 'हॉटस्पॉट निगरानी',
    statSeized: '8.8k+',
    statSeizedLabel: 'जब्ती रिकॉर्ड',
    statPrecision: '94%',
    statPrecisionLabel: 'पहचान सटीकता',
    rotateNotice: 'इंटरैक्टिव 3D ग्लोब • घुमाने के लिए ड्रैग करें',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड'
  },
  es: {
    brandSubtitle: 'Plataforma de Inteligencia contra el Tráfico de Vida Silvestre',
    navEarth: 'Tierra y Misión',
    navDetect: 'Detección de Tráfico',
    navDashboard: 'Panel de Análisis',
    navArchitecture: 'Arquitectura e Investigación',
    ctaDetect: 'Herramienta IA',
    ctaAnalytics: 'Ver Analítica',
    heroEyebrow: 'INTELIGENCIA MULTIMODAL DE VIDA SILVESTRE',
    heroTitleLine1: 'La vida silvestre está amenazada.',
    heroTitleLine2Pre: 'Seguimos el ',
    heroTitleLine2Highlight: 'rastro digital.',
    heroDescription: 'El tráfico ilegal de fauna se traslada cada vez más a espacios digitales. WILDINTEL utiliza análisis de texto e imagen asistido por IA para identificar publicaciones sospechosas y apoyar investigaciones.',
    heroCtaDetect: 'DETECTAR TRÁFICO',
    heroCtaMission: 'Descubre la Misión',
    statHotspots: '10+',
    statHotspotsLabel: 'Puntos Monitoreados',
    statSeized: '8.8k+',
    statSeizedLabel: 'Registros de Incautación',
    statPrecision: '94%',
    statPrecisionLabel: 'Precisión de Detección',
    rotateNotice: 'Globo 3D interactivo • Arrastra para rotar',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro'
  },
  fr: {
    brandSubtitle: 'Plateforme de Renseignement sur le Trafic de Faune',
    navEarth: 'Terre & Mission',
    navDetect: 'Détection du Trafic',
    navDashboard: 'Tableau de Bord',
    navArchitecture: 'Architecture & Recherche',
    ctaDetect: 'Outil IA',
    ctaAnalytics: 'Voir Analytique',
    heroEyebrow: 'INTELLIGENCE MULTIMODALE DE LA FAUNE',
    heroTitleLine1: 'La faune sauvage est menacée.',
    heroTitleLine2Pre: 'Nous suivons la ',
    heroTitleLine2Highlight: 'piste numérique.',
    heroDescription: "Le commerce illégal d'espèces sauvages se déplace vers les espaces numériques. WILDINTEL utilise l'analyse de texte et d'image pour identifier les contenus suspects et soutenir les enquêtes.",
    heroCtaDetect: 'DÉTECTER LE TRAFIC',
    heroCtaMission: 'Découvrir la Mission',
    statHotspots: '10+',
    statHotspotsLabel: 'Hotspots Surveillés',
    statSeized: '8.8k+',
    statSeizedLabel: 'Saisies Cartographiées',
    statPrecision: '94%',
    statPrecisionLabel: 'Précision de Détection',
    rotateNotice: 'Globe 3D interactif • Glissez pour tourner',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair'
  },
  id: {
    brandSubtitle: 'Platform Intelijen Perdagangan Satwa Liar',
    navEarth: 'Bumi & Misi',
    navDetect: 'Deteksi Perdagangan Ilegal',
    navDashboard: 'Dasbor Analitik',
    navArchitecture: 'Arsitektur & Riset',
    ctaDetect: 'Alat Deteksi AI',
    ctaAnalytics: 'Lihat Analitik',
    heroEyebrow: 'INTELIJEN MULTIMODAL PERDAGANGAN SATWA LIAR',
    heroTitleLine1: 'Alam liar sedang terancam.',
    heroTitleLine2Pre: 'Kami melacak ',
    heroTitleLine2Highlight: 'jejak digital.',
    heroDescription: 'Perdagangan satwa liar ilegal semakin beralih ke ruang digital. WILDINTEL memanfaatkan analisis teks dan citra berbasis AI untuk mengidentifikasi konten mencurigakan dan mendukung investigasi.',
    heroCtaDetect: 'DETEKSI PERDAGANGAN',
    heroCtaMission: 'Pelajari Misi Kami',
    statHotspots: '10+',
    statHotspotsLabel: 'Hotspot Dipantau',
    statSeized: '8.8k+',
    statSeizedLabel: 'Catatan Penyitaan',
    statPrecision: '94%',
    statPrecisionLabel: 'Presisi Deteksi',
    rotateNotice: 'Bola Dunia 3D Interaktif • Geser untuk memutar',
    darkMode: 'Mode Gelap',
    lightMode: 'Mode Terang'
  }
};

