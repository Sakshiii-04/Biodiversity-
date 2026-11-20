export type SupportedLanguage = 'en' | 'es' | 'fr' | 'id' | 'hi';

export interface TranslationDictionary {
  brandName: string;
  brandSubtitle: string;
  navHome: string;
  navWhatWeDo: string;
  navAboutUs: string;
  navBiodiversity: string;
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
  heroCtaWhatWeDo: string;
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
    brandName: 'SAMRAKSH',
    brandSubtitle: 'Vigilance for the Wild in the Digital Era.',
    navHome: 'Home',
    navWhatWeDo: 'What We Do',
    navAboutUs: 'About Us',
    navBiodiversity: 'Explore Biodiversity',
    navDetect: 'Detection Platform',
    navDashboard: 'Dashboard',
    navArchitecture: 'Architecture',
    ctaDetect: 'Detection Platform',
    ctaAnalytics: 'Intelligence Dashboard',
    heroEyebrow: 'DIGITAL FORENSICS & CONSERVATION',
    heroTitleLine1: 'The Wild Is Under Threat.',
    heroTitleLine2Pre: 'We Follow the ',
    heroTitleLine2Highlight: 'Digital Trail.',
    heroDescription: 'Traffickers exploit digital platforms to trade endangered wildlife. SAMRAKSH uses multimodal AI and CITES taxonomy to uncover covert listings and empower investigators.',
    heroCtaDetect: 'TEST SUSPICIOUS POST',
    heroCtaWhatWeDo: 'WHAT WE DO',
    heroCtaMission: 'OUR CONSERVATION MISSION',
    statHotspots: '10+',
    statHotspotsLabel: 'Global Hotspots Mapped',
    statSeized: '8.8k+',
    statSeizedLabel: 'Seizure Records Analyzed',
    statPrecision: '94%',
    statPrecisionLabel: 'Detection Precision',
    rotateNotice: 'Interactive 3D Globe • Drag to rotate',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode'
  },
  hi: {
    brandName: 'SAMRAKSH',
    brandSubtitle: 'डिजिटल युग में वन्यजीव संरक्षण एवं सतर्कता।',
    navHome: 'मुख्य पृष्ठ',
    navWhatWeDo: 'हम क्या करते हैं',
    navAboutUs: 'हमारे बारे में',
    navBiodiversity: 'जैव विविधता',
    navDetect: 'पहचान मंच',
    navDashboard: 'डैशबोर्ड',
    navArchitecture: 'आर्किटेक्चर',
    ctaDetect: 'पहचान मंच',
    ctaAnalytics: 'डैशबोर्ड',
    heroEyebrow: 'डिजिटल फॉरेंसिक और संरक्षण',
    heroTitleLine1: 'वन्यजीव संकट में हैं।',
    heroTitleLine2Pre: 'हम खोजते हैं ',
    heroTitleLine2Highlight: 'डिजिटल सुराग।',
    heroDescription: 'तस्कर ऑनलाइन प्लेटफॉर्म्स का दुरुपयोग कर रहे हैं। SAMRAKSH संदिग्ध पोस्ट की पहचान कर जांचकर्ताओं को साक्ष्य प्रदान करता है।',
    heroCtaDetect: 'पोस्ट जांचें',
    heroCtaWhatWeDo: 'कार्य समझें',
    heroCtaMission: 'मिशन',
    statHotspots: '10+',
    statHotspotsLabel: 'हॉटस्पॉट निगरानी',
    statSeized: '8.8k+',
    statSeizedLabel: 'जब्ती रिकॉर्ड्स',
    statPrecision: '94%',
    statPrecisionLabel: 'सटीकता',
    rotateNotice: 'इंटरैक्टिव 3D ग्लोब',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड'
  },
  es: {
    brandName: 'SAMRAKSH',
    brandSubtitle: 'Vigilancia para la fauna en la era digital.',
    navHome: 'Inicio',
    navWhatWeDo: 'Qué Hacemos',
    navAboutUs: 'Sobre Nosotros',
    navBiodiversity: 'Biodiversidad',
    navDetect: 'Detección',
    navDashboard: 'Panel',
    navArchitecture: 'Arquitectura',
    ctaDetect: 'Plataforma IA',
    ctaAnalytics: 'Ver Analítica',
    heroEyebrow: 'FORENSE DIGITAL Y CONSERVACIÓN',
    heroTitleLine1: 'La fauna silvestre está amenazada.',
    heroTitleLine2Pre: 'Seguimos el ',
    heroTitleLine2Highlight: 'rastro digital.',
    heroDescription: 'El tráfico ilegal utiliza plataformas digitales. SAMRAKSH combina IA multimodal y taxonomía CITES para visibilizar el tráfico encubierto.',
    heroCtaDetect: 'EVALUAR CONTENIDO',
    heroCtaWhatWeDo: 'QUÉ HACEMOS',
    heroCtaMission: 'NUESTRA MISIÓN',
    statHotspots: '10+',
    statHotspotsLabel: 'Puntos Monitoreados',
    statSeized: '8.8k+',
    statSeizedLabel: 'Registros Analizados',
    statPrecision: '94%',
    statPrecisionLabel: 'Precisión',
    rotateNotice: 'Globo 3D interactivo',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro'
  },
  fr: {
    brandName: 'SAMRAKSH',
    brandSubtitle: "Vigilance pour la faune à l'ère numérique.",
    navHome: 'Accueil',
    navWhatWeDo: 'Nos Actions',
    navAboutUs: 'À Propos',
    navBiodiversity: 'Biodiversité',
    navDetect: 'Détection',
    navDashboard: 'Tableau de Bord',
    navArchitecture: 'Architecture',
    ctaDetect: 'Outil de Détection',
    ctaAnalytics: 'Voir Analytique',
    heroEyebrow: 'EXPERTISE NUMÉRIQUE ET CONSERVATION',
    heroTitleLine1: 'La faune sauvage est en péril.',
    heroTitleLine2Pre: 'Nous suivons la ',
    heroTitleLine2Highlight: 'piste numérique.',
    heroDescription: "Le trafic d'espèces sauvages passe par les réseaux numériques. SAMRAKSH associe analyse IA et statut CITES pour rendre visibles les réseaux illicites.",
    heroCtaDetect: 'TESTER UN CONTENU',
    heroCtaWhatWeDo: 'NOTRE RÔLE',
    heroCtaMission: 'NOTRE MISSION',
    statHotspots: '10+',
    statHotspotsLabel: 'Hotspots Cartographiés',
    statSeized: '8.8k+',
    statSeizedLabel: 'Saisies Analysées',
    statPrecision: '94%',
    statPrecisionLabel: 'Précision',
    rotateNotice: 'Globe 3D interactif',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair'
  },
  id: {
    brandName: 'SAMRAKSH',
    brandSubtitle: 'Kewaspadaan untuk Alam Liar di Era Digital.',
    navHome: 'Beranda',
    navWhatWeDo: 'Yang Kami Lakukan',
    navAboutUs: 'Tentang Kami',
    navBiodiversity: 'Keanekaragaman',
    navDetect: 'Platform Deteksi',
    navDashboard: 'Dasbor',
    navArchitecture: 'Arsitektur',
    ctaDetect: 'Platform AI',
    ctaAnalytics: 'Lihat Dasbor',
    heroEyebrow: 'FORENSIK DIGITAL & KONSERVASI',
    heroTitleLine1: 'Alam liar sedang terancam.',
    heroTitleLine2Pre: 'Kami melacak ',
    heroTitleLine2Highlight: 'jejak digital.',
    heroDescription: 'Perdagangan satwa liar beralih ke ruang digital. SAMRAKSH memadukan AI multimodal dan CITES untuk mengungkap perdagangan tersembunyi.',
    heroCtaDetect: 'UJI KONTEN',
    heroCtaWhatWeDo: 'YANG KAMI LAKUKAN',
    heroCtaMission: 'MISI KONSERVASI',
    statHotspots: '10+',
    statHotspotsLabel: 'Titik Keanekaragaman',
    statSeized: '8.8k+',
    statSeizedLabel: 'Catatan Dianalisis',
    statPrecision: '94%',
    statPrecisionLabel: 'Presisi',
    rotateNotice: 'Bola Dunia 3D Interaktif',
    darkMode: 'Mode Gelap',
    lightMode: 'Mode Terang'
  }
};
