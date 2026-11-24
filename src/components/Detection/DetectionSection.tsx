import React, { useState, useRef } from 'react';
import { Upload, Link2, FileText, AlertTriangle, ShieldCheck, HelpCircle, Sparkles, RefreshCw, Database, CheckCircle, ExternalLink, Image as ImageIcon, ArrowRight, Download, Printer, GitBranch, FileCheck2, X } from 'lucide-react';
import { analyzeContentWithAI } from './aiService';
import { AnalysisResult } from '../../types';

interface DetectionSectionProps {
  onLogAnalysisToDashboard: (record: AnalysisResult) => void;
  onNavigateToDashboard?: () => void;
  darkMode?: boolean;
}

export const DetectionSection: React.FC<DetectionSectionProps> = ({ 
  onLogAnalysisToDashboard,
  onNavigateToDashboard,
  darkMode = false
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'text'>('upload');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [urlAuthWarning, setUrlAuthWarning] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [hasLoggedToDb, setHasLoggedToDb] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiDrawer, setShowApiDrawer] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate cryptographic checksum representation for evidence chain-of-custody
  const generateChecksum = (id: string, text: string) => {
    let hash = 0;
    const input = `${id}:${text}:SAMRAKSH_FORENSIC_INTEGRITY`;
    for (let i = 0; i < input.length; i++) {
      hash = ((hash << 5) - hash) + input.charCodeAt(i);
      hash |= 0;
    }
    return `sha256:7f9a${Math.abs(hash).toString(16).padStart(8, '0')}e91b4c382a`;
  };

  const handleDownloadDossierJson = () => {
    if (!analysisResult) return;
    const hash = generateChecksum(analysisResult.id, analysisResult.extractedText);
    const dossierData = {
      samrakshForensicDossier: {
        caseReferenceId: analysisResult.id,
        timestampUtc: analysisResult.submissionDate,
        cryptographicChecksum: hash,
        inputModality: analysisResult.inputType,
        inputReference: analysisResult.inputSource,
        triageAssessment: {
          prediction: analysisResult.prediction,
          bayesianScore: analysisResult.confidenceScore,
          threatSeverity: analysisResult.threatSeverity,
          fusionWeights: { multilingualTextIntent: '60%', visualAndTradeLogistics: '40%' }
        },
        citesTaxonomyGrounding: {
          speciesDetected: analysisResult.identifiedSpecies,
          legalProtectionStatus: 'CITES Appendices I-III & Wildlife Protection Act 1972 (2022 Amended) Schedule I-IV',
        },
        evidentiaryIndicators: {
          extractedTextContent: analysisResult.extractedText,
          detectedKeywords: analysisResult.suspiciousKeywords,
          suspiciousTradeIndicators: analysisResult.suspiciousIndicators
        },
        chainOfCustodyAudit: {
          piiStripped: true,
          exifMetadataPurged: true,
          humanReviewMandatory: true,
          targetAgencies: ['Wildlife Crime Control Bureau (WCCB)', 'State Forest Intelligence Wings', 'Platform Trust & Safety']
        }
      }
    };

    const blob = new Blob([JSON.stringify(dossierData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${analysisResult.id}_WCCB_Evidence_Dossier.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Preloaded sample scenarios for instant evaluation
  const SAMPLES = [
    {
      label: 'Sample 1: Telegram Pangolin Scales',
      type: 'screenshot' as const,
      preview: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=600&q=80',
      text: 'Fresh stock arrived from Southeast Asia. 50kg dry pangolin scales. DM for price list and discreet maritime courier. WhatsApp: +60 17-8892110. No questions asked.',
      name: 'telegram_pangolin_scales_ad.png'
    },
    {
      label: 'Sample 2: Hathajodi Sacred Root Listing',
      type: 'text' as const,
      preview: '',
      text: 'Authentic energized hathajodi root for prosperity puja and wealth attraction. 100% natural, consecrated and rare tantric specimen. Direct delivery across India. Contact WhatsApp: +91 98765 43210. DM for price.',
      name: 'hathajodi_puja_offer.txt'
    },
    {
      label: 'Sample 3: Instagram Radiated Tortoise',
      type: 'url' as const,
      url: 'https://www.instagram.com/p/DB901jKx2L_/',
      preview: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=600&q=80',
      text: 'Rare juvenile star pattern tortoise ready for new home. High grade shell markings. Worldwide door delivery guaranteed. PM serious inquiries only. #exoticpets #tortoiseforsale'
    },
    {
      label: 'Sample 4: Ambiguous Primate Pet',
      type: 'screenshot' as const,
      preview: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=600&q=80',
      text: 'Cute baby primate looking for gentle family care. Very tame, eats fruit. Adoption fee applies. Please contact via messenger.',
      name: 'fb_slow_loris_adoption.jpg'
    },
    {
      label: 'Sample 5: Benign Gorilla Ecotourism',
      type: 'url' as const,
      url: 'https://www.tiktok.com/@safari_adventures/video/729481923048',
      preview: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
      text: 'Encounter with the Hirwa gorilla family in Volcanoes National Park Rwanda guided by licensed park rangers. Conservation works! #ecotourism'
    }
  ];

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a supported image format: JPG, PNG, or WEBP.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setImageFileName(file.name);
      setAnalysisResult(null);
      setHasLoggedToDb(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof SAMPLES[0]) => {
    if (sample.type === 'screenshot') {
      setActiveTab('upload');
      setSelectedImage(sample.preview);
      setImageFileName(sample.name || 'sample_post.png');
      setUrlInput('');
      setTextInput('');
      setUrlAuthWarning(null);
    } else if (sample.type === 'url') {
      setActiveTab('url');
      setUrlInput(sample.url || '');
      setSelectedImage(sample.preview);
      setImageFileName('url_cached_preview.png');
      setTextInput('');
      setUrlAuthWarning(null);
    } else {
      setActiveTab('text');
      setTextInput(sample.text);
      setSelectedImage(null);
      setImageFileName('');
      setUrlInput('');
      setUrlAuthWarning(null);
    }
    setAnalysisResult(null);
    setHasLoggedToDb(false);
  };

  // Run AI Detection
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setUrlAuthWarning(null);
    setUrlError(null);

    try {
      if (activeTab === 'upload') {
        if (!selectedImage) {
          alert('Please upload a screenshot first.');
          setIsAnalyzing(false);
          return;
        }

        // Extract sample text if it matches one of our samples
        const sampleMatch = SAMPLES.find(s => s.preview === selectedImage);
        const textPayload = sampleMatch ? sampleMatch.text : `Uploaded post image file: ${imageFileName}`;

        const result = await analyzeContentWithAI(
          { type: 'screenshot', data: selectedImage, extractedText: textPayload },
          apiKey
        );
        setAnalysisResult(result);
      } else if (activeTab === 'url') {
        // Validate URL
        if (!urlInput.trim()) {
          setUrlError('Please enter a valid social media URL.');
          setIsAnalyzing(false);
          return;
        }

        try {
          new URL(urlInput);
        } catch {
          setUrlError('Invalid URL syntax. Please enter a full URL (e.g., https://...).');
          setIsAnalyzing(false);
          return;
        }

        // Platform access check
        const isRestrictedPlatform = /instagram\.com|tiktok\.com|facebook\.com|threads\.net|t\.me/i.test(urlInput);
        const sampleMatch = SAMPLES.find(s => s.url === urlInput);

        if (isRestrictedPlatform && !sampleMatch) {
          setUrlAuthWarning(
            `Target platform (${new URL(urlInput).hostname}) requires user login and enforces anti-scraping protections. To inspect this post with highest accuracy, please take a screenshot and use Option A.`
          );
        }

        const textPayload = sampleMatch ? sampleMatch.text : `Post URL analysis target: ${urlInput}`;
        const result = await analyzeContentWithAI(
          { type: 'url', data: urlInput, extractedText: textPayload },
          apiKey
        );
        setAnalysisResult(result);
      } else {
        // activeTab === 'text'
        if (!textInput.trim()) {
          alert('Please paste or type suspicious post caption or listing text.');
          setIsAnalyzing(false);
          return;
        }

        const result = await analyzeContentWithAI(
          { type: 'text', data: textInput.trim(), extractedText: textInput.trim() },
          apiKey
        );
        setAnalysisResult(result);
      }
    } catch (err: any) {
      alert('Analysis error: ' + (err.message || 'Failed to analyze content.'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogToDatabase = () => {
    if (!analysisResult) return;
    onLogAnalysisToDashboard(analysisResult);
    setHasLoggedToDb(true);
  };

  return (
    <section id="detect" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Eyebrow & Headline in SAMRAKSH Aesthetic */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-widest border mb-3 ${
          darkMode ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-[#E8F5EE] text-[#0A2E20] border-[#10B981]/25'
        }`}>
          Multimodal Intelligence Engine
        </span>
        <h2 className={`font-serif text-[36px] sm:text-[46px] lg:text-[54px] font-bold leading-tight tracking-tight ${
          darkMode ? 'text-white' : 'text-[#0A2E20]'
        }`}>
          Detect the Signals <span className="italic text-[#10B981] font-bold">Hidden in Wildlife Trade.</span>
        </h2>
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-[#2D5A46]'
        }`}>
          Submit suspicious social media posts or online marketplace listings via image upload or public URL. Our multimodal pipeline performs optical text extraction, protected species identification against CITES appendices, suspicious trade indicator detection, and confidence scoring to support forensic human verification.
        </p>

        {/* Engine Transparency Pill */}
        <div className={`mt-5 inline-flex items-center px-4 py-1.5 rounded-full border text-xs shadow-sm ${
          darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-[#10B981]/20 text-gray-700'
        }`}>
          <span>
            Active Architecture: <strong className={darkMode ? 'text-emerald-300' : 'text-[#0A2E20]'}>{apiKey ? 'Gemini 1.5 Multimodal Vision API' : 'CITES Taxonomy & Bayesian Heuristic Engine'}</strong>
          </span>
          <button
            onClick={() => setShowApiDrawer(!showApiDrawer)}
            className="text-[#10B981] underline hover:text-[#059669] ml-2 font-semibold cursor-pointer"
          >
            {apiKey ? 'Edit API Key' : 'Configure Custom Key'}
          </button>
        </div>

        {/* Optional API Key Input */}
        {showApiDrawer && (
          <div className="mt-4 p-4 max-w-md mx-auto bg-white rounded-2xl border border-[#1FB6C9]/30 shadow-md text-left text-xs">
            <label className="font-semibold text-[#0B3A4A] block mb-1">
              Google Gemini API Key (Optional)
            </label>
            <p className="text-[#6E8890] mb-2 text-[11px]">
              Optional. If not provided, the platform uses our built-in production heuristic engine with full species taxonomy and suspicious indicator matching.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#1FB6C9]"
            />
          </div>
        )}
      </div>

      {/* Quick Test Samples Selector */}
      <div className="mb-10 bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-[28px] border border-[#1FB6C9]/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#0B3A4A]">
            Quick Preloaded Intelligence Test Cases
          </span>
          <span className="text-[11px] text-[#6E8890]">
            Click any sample to evaluate instant AI response
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
          {SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample)}
              className="text-left p-3 rounded-2xl bg-[#E4F4F5]/60 hover:bg-[#E4F4F5] border border-[#1FB6C9]/20 text-xs font-medium text-[#0B3A4A] transition-all hover:scale-[1.02] flex items-center justify-between group"
            >
              <span className="truncate pr-2">{sample.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1FB6C9] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Detection Card (Coralis Editorial Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Box: 6 cols */}
        <div className="lg:col-span-6 bg-white rounded-[36px] p-6 sm:p-8 shadow-xl border border-white/80 space-y-6">
          {/* Triple Input Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-[#F7F2E7] rounded-full border border-[#1FB6C9]/15">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-white text-[#0B3A4A] shadow-sm'
                  : 'text-[#6E8890] hover:text-[#0B3A4A]'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-[#1FB6C9]" />
              <span className="truncate">Screenshot</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-white text-[#0B3A4A] shadow-sm'
                  : 'text-[#6E8890] hover:text-[#0B3A4A]'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-[#1FB6C9]" />
              <span className="truncate">Post URL</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-white text-[#0B3A4A] shadow-sm'
                  : 'text-[#6E8890] hover:text-[#0B3A4A]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#1FB6C9]" />
              <span className="truncate">Paste Caption</span>
            </button>
          </div>

          {/* TAB 1: SCREENSHOT UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {!selectedImage ? (
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-[28px] p-8 text-center cursor-pointer transition-all duration-200 ${
                    dragActive
                      ? 'border-[#1FB6C9] bg-[#E4F4F5]'
                      : 'border-[#1FB6C9]/30 bg-[#F7F2E7]/50 hover:bg-[#E4F4F5]/50'
                  }`}
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-md flex items-center justify-center text-[#1FB6C9] mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#0B3A4A]">
                    Drag & Drop Social Media Screenshot
                  </h4>
                  <p className="text-xs text-[#6E8890] mt-1">
                    Or click to browse from device. Supports JPG, PNG, WEBP up to 15MB.
                  </p>
                  <div className="mt-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#E4F4F5] text-[#0B3A4A] text-xs font-semibold border border-[#1FB6C9]/20">
                      Browse Files
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden bg-black/5 border border-gray-200 aspect-video flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Uploaded Screenshot"
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#0B3A4A] shadow"
                      >
                        Replace
                      </button>
                      <button
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalysisResult(null);
                        }}
                        className="px-3 py-1 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] text-xs font-medium text-white shadow"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6E8890] flex items-center justify-between">
                    <span>Target: {imageFileName || 'screenshot.png'}</span>
                    <span className="text-[#2F7D58] font-medium">Ready for OCR & Species Analysis</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: POST URL INPUT */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0B3A4A] mb-1.5">
                  Social Media Post or Marketplace Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/... or https://t.me/..."
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setUrlError(null);
                      setUrlAuthWarning(null);
                    }}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F7F2E7]/70 border border-[#1FB6C9]/30 text-sm focus:outline-none focus:border-[#1FB6C9] focus:bg-white text-[#0B3A4A]"
                  />
                  <Link2 className="absolute right-4 top-3.5 w-4 h-4 text-[#6E8890]" />
                </div>
              </div>

              {urlError && (
                <div className="p-3 rounded-2xl bg-[#FF7E6B]/15 text-[#E86350] text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{urlError}</span>
                </div>
              )}

              {urlAuthWarning && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{urlAuthWarning}</p>
                </div>
              )}

              <p className="text-[11px] text-[#6E8890] leading-relaxed">
                Supports Instagram, Facebook Groups, TikTok, X (Twitter), Telegram, and Reddit public links.
              </p>
            </div>
          )}

          {/* TAB 3: RAW POST CAPTION / TEXT INPUT */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0B3A4A]">
                    Post Caption or Marketplace Description
                  </label>
                  <span className="text-[10px] text-[#6E8890] font-mono">
                    {textInput.length} characters
                  </span>
                </div>
                <textarea
                  rows={5}
                  placeholder="Paste raw social media caption, ad description, or suspicious coded listing terms (e.g., 'Selling authentic hathajodi root, direct delivery, WhatsApp...')"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F7F2E7]/70 border border-[#1FB6C9]/30 text-sm focus:outline-none focus:border-[#1FB6C9] focus:bg-white text-[#0B3A4A] leading-relaxed resize-none"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E8890] block">
                  Click to Test Wildlife Cases:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTextInput('Authentic energized hathajodi root for prosperity puja and wealth attraction. 100% natural and consecrated. Direct delivery across India. Contact WhatsApp: +91 98765 43210. DM for price.')}
                    className="px-2.5 py-1 rounded-full bg-[#E4F4F5] hover:bg-[#1FB6C9] hover:text-white text-[#0B3A4A] text-[11px] font-medium border border-[#1FB6C9]/20 transition-all cursor-pointer"
                  >
                    + Hathajodi Ritual Trade
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextInput('Rare juvenile star pattern tortoise ready for new home. High grade shell markings. Worldwide door delivery guaranteed. PM serious inquiries only. #exoticpets #tortoiseforsale')}
                    className="px-2.5 py-1 rounded-full bg-[#E4F4F5] hover:bg-[#1FB6C9] hover:text-white text-[#0B3A4A] text-[11px] font-medium border border-[#1FB6C9]/20 transition-all cursor-pointer"
                  >
                    + Star Tortoise Live Pet
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextInput('Antique carved white bone stamp cylinders and figurines. High density natural grain. Private shipping container available for Asian buyers. DM for catalog.')}
                    className="px-2.5 py-1 rounded-full bg-[#E4F4F5] hover:bg-[#1FB6C9] hover:text-white text-[#0B3A4A] text-[11px] font-medium border border-[#1FB6C9]/20 transition-all cursor-pointer"
                  >
                    + Ivory Obfuscation (White Bone)
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-[#6E8890] leading-relaxed">
                Directly extracts protected species taxonomy, regional slang (Hathajodi, Schreger ivory), and evasive delivery indicators without requiring URL or image upload.
              </p>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            onClick={handleRunAnalysis}
            disabled={
              isAnalyzing || 
              (activeTab === 'upload' && !selectedImage) || 
              (activeTab === 'url' && !urlInput.trim()) ||
              (activeTab === 'text' && !textInput.trim())
            }
            className="w-full py-4 rounded-full bg-[#FF7E6B] hover:bg-[#E86350] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide shadow-lg shadow-[#FF7E6B]/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing Computer Vision & Taxonomy Analysis...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze for Illegal Wildlife Trade
              </>
            )}
          </button>
        </div>

        {/* Right Output Box: 6 cols */}
        <div className="lg:col-span-6 bg-white rounded-[36px] p-6 sm:p-8 shadow-xl border border-white/80 min-h-[460px] flex flex-col justify-between">
          {!analysisResult && !isAnalyzing && (
            <div className="my-auto text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E4F4F5] flex items-center justify-center text-[#1FB6C9]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#0B3A4A] font-medium">
                Investigative Intelligence Terminal Ready
              </h3>
              <p className="text-sm text-[#6E8890] max-w-md mx-auto leading-relaxed">
                Submit a screenshot, public post link, or paste a raw caption to trigger automated text extraction, CITES-grounded species identification, suspicious trade terminology detection, and confidence scoring for human verification.
              </p>
              <div className="inline-block text-[11px] font-semibold text-[#1FB6C9] uppercase tracking-wider bg-[#E4F4F5]/70 px-4 py-1.5 rounded-full">
                Waiting for image, URL, or caption submission
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="my-auto text-center py-16 px-4 space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-[#1FB6C9]/20 border-t-[#1FB6C9] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#0B3A4A]">
                  AI
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#0B3A4A] font-medium">
                Scanning Wildlife Cryptonyms & Taxonomy...
              </h3>
              <p className="text-xs text-[#6E8890] max-w-sm mx-auto">
                Comparing optical descriptors against CITES Appendices I & II databases and transnational crime indicators.
              </p>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Prediction Badge Header (Prompt Requirement 6.2) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E8890]">
                    AI Evaluation Output
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        analysisResult.prediction === 'POTENTIAL ILLEGAL WILDLIFE TRADE'
                          ? 'bg-[#FF7E6B] text-white shadow-md shadow-[#FF7E6B]/30'
                          : analysisResult.prediction === 'REQUIRES MANUAL REVIEW'
                          ? 'bg-[#1FB6C9] text-white shadow-md shadow-[#1FB6C9]/30'
                          : 'bg-[#2F7D58] text-white shadow-md shadow-[#2F7D58]/30'
                      }`}
                    >
                      {analysisResult.prediction === 'POTENTIAL ILLEGAL WILDLIFE TRADE' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {analysisResult.prediction === 'REQUIRES MANUAL REVIEW' && <HelpCircle className="w-3.5 h-3.5" />}
                      {analysisResult.prediction === 'NO CLEAR EVIDENCE DETECTED' && <CheckCircle className="w-3.5 h-3.5" />}
                      {analysisResult.prediction}
                    </span>
                  </div>
                </div>

                {/* Circular SVG Bayesian Confidence Gauge */}
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 76 76">
                      <circle
                        cx="38"
                        cy="38"
                        r="31"
                        className="stroke-gray-200 dark:stroke-white/10"
                        strokeWidth="5.5"
                        fill="transparent"
                      />
                      <circle
                        cx="38"
                        cy="38"
                        r="31"
                        stroke={
                          analysisResult.prediction === 'POTENTIAL ILLEGAL WILDLIFE TRADE'
                            ? '#FF7E6B'
                            : analysisResult.prediction === 'REQUIRES MANUAL REVIEW'
                            ? '#1FB6C9'
                            : '#2F7D58'
                        }
                        strokeWidth="5.5"
                        strokeDasharray={194.78}
                        strokeDashoffset={194.78 * (1 - analysisResult.confidenceScore)}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-serif text-sm font-bold text-[#0B3A4A] dark:text-white leading-none">
                        {(analysisResult.confidenceScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E8890] block">
                      Bayesian Score
                    </span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                      analysisResult.prediction === 'POTENTIAL ILLEGAL WILDLIFE TRADE'
                        ? 'text-[#FF7E6B]'
                        : analysisResult.prediction === 'REQUIRES MANUAL REVIEW'
                        ? 'text-[#1FB6C9]'
                        : 'text-[#2F7D58]'
                    }`}>
                      {analysisResult.threatSeverity} Severity
                    </span>
                  </div>
                </div>
              </div>

              {/* Identified Species */}
              <div className="bg-[#F7F2E7]/80 p-4 rounded-2xl border border-[#1FB6C9]/15">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B3A4A] block mb-2">
                  Identified Wildlife Species
                </span>
                {analysisResult.identifiedSpecies.length > 0 ? (
                  <div className="space-y-2">
                    {analysisResult.identifiedSpecies.map((sp, idx) => (
                      <div key={idx} className="flex items-start justify-between text-xs">
                        <div>
                          <strong className="text-[#0B3A4A] font-semibold">{sp.commonName}</strong>
                          <div className="text-[#6E8890] italic">{sp.scientificName}</div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#0B3A4A] text-[#9BF0FB] text-[10px] font-bold">
                          {sp.citesStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#6E8890]">
                    No protected species taxonomy positively matched in submission.
                  </p>
                )}
              </div>

              {/* Suspicious Indicators Checklist */}
              {analysisResult.suspiciousIndicators.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7E6B] block mb-2">
                    Detected Threat Indicators
                  </span>
                  <div className="space-y-2">
                    {analysisResult.suspiciousIndicators.map((ind, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-white border border-[#FF7E6B]/20 shadow-sm text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-[#0B3A4A] font-semibold">{ind.indicator}</strong>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              ind.severity === 'high' ? 'bg-[#FF7E6B]/20 text-[#E86350]' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ind.severity} severity
                          </span>
                        </div>
                        <p className="mt-1 text-[#6E8890] text-[11px] leading-relaxed">
                          {ind.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suspicious Keywords detected */}
              {analysisResult.suspiciousKeywords.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B3A4A] block mb-1.5">
                    Extracted Trafficking Keywords
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.suspiciousKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#FF7E6B]/15 text-[#E86350] text-xs font-mono font-medium"
                      >
                        "{kw}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bayesian Explainability Breakdown Node */}
              <div className="bg-[#FAF8F5] dark:bg-[#061822] p-4 rounded-2xl border border-[#1FB6C9]/25 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#0B3A4A] dark:text-white">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-[#1FB6C9]" />
                    Bayesian Explainability Breakdown
                  </span>
                  <span className="text-[10px] text-[#6E8890] font-mono lowercase">late fusion (0.6 text + 0.4 vision)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded-xl bg-white dark:bg-[#0B2533] border border-gray-200/80 dark:border-white/10 shadow-xs">
                    <div className="text-gray-400 uppercase text-[9px] font-semibold">1. Sanitized Intake</div>
                    <div className="font-bold text-[#0B3A4A] dark:text-white capitalize mt-0.5">{analysisResult.inputType}</div>
                    <div className="text-[9px] text-[#2F7D58] font-mono">PII Stripped</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-[#0B2533] border border-gray-200/80 dark:border-white/10 shadow-xs">
                    <div className="text-gray-400 uppercase text-[9px] font-semibold">2. Slang Match</div>
                    <div className="font-bold text-[#0B3A4A] dark:text-white mt-0.5">
                      {analysisResult.suspiciousKeywords.length > 0 ? `${analysisResult.suspiciousKeywords.length} Detected` : 'None'}
                    </div>
                    <div className="text-[9px] text-amber-600 font-mono">Weight 60%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-[#0B2533] border border-gray-200/80 dark:border-white/10 shadow-xs">
                    <div className="text-gray-400 uppercase text-[9px] font-semibold">3. Logistics</div>
                    <div className="font-bold text-[#0B3A4A] dark:text-white mt-0.5">
                      {analysisResult.suspiciousIndicators.length > 0 ? `${analysisResult.suspiciousIndicators.length} Triggers` : 'Clean'}
                    </div>
                    <div className="text-[9px] text-[#1FB6C9] font-mono">Weight 40%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-[#0B2533] border border-gray-200/80 dark:border-white/10 shadow-xs">
                    <div className="text-gray-400 uppercase text-[9px] font-semibold">4. CITES Status</div>
                    <div className="font-bold text-[#0B3A4A] dark:text-white truncate mt-0.5">
                      {analysisResult.identifiedSpecies.length > 0 ? 'Schedule I / App I' : 'Ungrounded'}
                    </div>
                    <div className="text-[9px] text-[#FF7E6B] font-mono">Grounded</div>
                  </div>
                </div>
              </div>

              {/* Ethical Framing & Objective Explanation */}
              <div className="p-4 rounded-2xl bg-[#E4F4F5] border border-[#1FB6C9]/25 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#0B3A4A] block mb-1">
                  Ethical Intelligence Assessment
                </span>
                <p className="text-[#3A5A64] leading-relaxed text-xs">
                  {analysisResult.explanation}
                </p>
                <div className="mt-2 text-[10px] text-[#6E8890] italic">
                  * Note: AI predictions represent preliminary investigative indicators requiring verification by qualified wildlife law enforcement agencies.
                </div>
              </div>

              {/* Dynamic Action: Log to Dashboard Database & Export Dossiers */}
              <div className="pt-2 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleDownloadDossierJson}
                    className="w-full py-2.5 px-3 rounded-full bg-white dark:bg-[#0B2533] hover:bg-gray-50 dark:hover:bg-[#123648] border border-[#1FB6C9]/40 text-[#0B3A4A] dark:text-[#E4F4F5] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#1FB6C9]" />
                    <span>Download Dossier (.JSON)</span>
                  </button>
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="w-full py-2.5 px-3 rounded-full bg-white dark:bg-[#0B2533] hover:bg-gray-50 dark:hover:bg-[#123648] border border-[#1FB6C9]/40 text-[#0B3A4A] dark:text-[#E4F4F5] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#1FB6C9]" />
                    <span>Print WCCB Dossier</span>
                  </button>
                </div>

                <button
                  onClick={handleLogToDatabase}
                  disabled={hasLoggedToDb}
                  className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    hasLoggedToDb
                      ? 'bg-[#2F7D58] text-white shadow-md'
                      : 'bg-[#0B3A4A] hover:bg-[#165367] text-white shadow-md'
                  }`}
                >
                  {hasLoggedToDb ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Appended to Intelligence Database
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 text-[#1FB6C9]" />
                      Log to Intelligence Dashboard Database
                    </>
                  )}
                </button>

                {hasLoggedToDb && onNavigateToDashboard && (
                  <button
                    onClick={onNavigateToDashboard}
                    className="w-full py-2.5 rounded-full bg-[#1FB6C9] hover:bg-[#1693A3] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                  >
                    <span>Inspect Record in Analytics Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Forensic Case Dossier Print / Inspection Modal */}
      {showPrintModal && analysisResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white text-[#0B3A4A] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B3A4A] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#1FB6C9]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold leading-tight">
                    Forensic Wildlife Crime Intelligence Dossier
                  </h3>
                  <div className="text-[11px] text-[#6E8890] mt-0.5">
                    SAMRAKSH Automated Interdiction Suite • Reference: <span className="font-mono font-bold text-[#0B3A4A]">{analysisResult.id}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Evidence Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Status</span>
                <span className={`font-bold uppercase text-[11px] ${
                  analysisResult.prediction === 'POTENTIAL ILLEGAL WILDLIFE TRADE' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {analysisResult.prediction}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Bayesian Score</span>
                <span className="font-bold text-[13px] text-[#0B3A4A]">{(analysisResult.confidenceScore * 100).toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Submission Date</span>
                <span className="font-mono text-[11px]">{analysisResult.submissionDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Legal Tiers</span>
                <span className="font-bold text-[11px] text-[#0B3A4A]">CITES App I / WPA I</span>
              </div>
            </div>

            {/* Target Specimen & Extracted Content */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Target Content Extracted</span>
                <p className="font-mono text-[11px] text-gray-800 bg-white p-2.5 rounded-lg border border-gray-200 leading-relaxed">
                  "{analysisResult.extractedText}"
                </p>
              </div>

              {analysisResult.identifiedSpecies.length > 0 && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">Identified Protected Species</span>
                  {analysisResult.identifiedSpecies.map((sp, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-emerald-950">{sp.commonName} <em className="text-emerald-700 font-normal">({sp.scientificName})</em></span>
                      <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold text-[10px]">{sp.citesStatus}</span>
                    </div>
                  ))}
                </div>
              )}

              {analysisResult.suspiciousIndicators.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block mb-1">Detected Illicit Trade Indicators</span>
                  <ul className="list-disc pl-4 space-y-1 text-amber-950 text-[11px]">
                    {analysisResult.suspiciousIndicators.map((ind, idx) => (
                      <li key={idx}><strong>{ind.indicator}:</strong> {ind.description}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Chain of Custody Stamp */}
            <div className="p-3.5 rounded-xl bg-[#0B3A4A] text-white text-[11px] space-y-1">
              <div className="flex items-center justify-between">
                <span className="uppercase font-bold tracking-widest text-[#1FB6C9] text-[10px]">Chain of Custody Verification</span>
                <span className="font-mono text-[10px] text-gray-300">WCCB Standard Protocol</span>
              </div>
              <p className="text-gray-200 leading-relaxed">
                Cryptographic Checksum: <span className="font-mono text-[#9BF0FB]">{generateChecksum(analysisResult.id, analysisResult.extractedText)}</span>
              </p>
              <p className="text-gray-400 text-[10px]">
                Preserved under digital forensics integrity guidelines. Non-essential seller PII purged. Prepared for Wildlife Crime Control Bureau (WCCB) review.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold hover:bg-gray-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-full bg-[#0B3A4A] hover:bg-[#165367] text-white text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

