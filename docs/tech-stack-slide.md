# Tech Stack & System Architecture — PPT Slide Content (Revised)
> **Slide 4 of 6** · SUSTAINOVA 2026 Ideathon · SDG 15 — Life on Land  
> **Target Theme:** End-to-End Multimodal Wildlife Trade Detection & Intelligence Pipeline  
> **Reference:** Aligned with `docs/summary.md` & `docs/implementation-plan.md`

---

## 1. Slide Header & Key Message
- **Main Heading:** Tech Stack & System Architecture
- **Subheading:** An Open-Source, Multimodal Intelligence Pipeline Tailored for Indian Context & Global Scalability
- **Core Pitch:** "We combine multilingual NLP (XLM-RoBERTa) and computer vision (CLIP → YOLOv8) with a strict human-in-the-loop review workflow. Our architecture runs on accessible student compute, eliminates black-box hallucination, and delivers actionable evidentiary dossiers for enforcement authorities."

---

## 2. Tech Stack (Four-Tier Architecture Table)

| Layer | Technologies Selected | Justification & Architectural Role |
|---|---|---|
| **Frontend & Geospatial UI** | **React 19 + TypeScript + Vite 8**<br>• Tailwind CSS v4<br>• Interactive Geospatial Hotspot Map<br>• Lucide Icons & oxlint | Sub-second HMR and lightweight bundle for low-spec investigator workstations. Real-time incident mapping and analytical triage interface for forensic investigators. |
| **Multimodal ML Core** | **Text:** XLM-RoBERTa (`xlm-roberta-base`) + Indian Codeword Lexicon<br>**Vision:** CLIP (`ViT-B/32`) → YOLOv8<br>**Knowledge:** CITES / WPA Schedule Taxonomy DB | **Text:** 100-language transformer fine-tuned on IWT listings; native handling of Hindi & Hinglish slang (*hathajodi*, *khurpa*).<br>**Vision:** Zero-shot query capability for rare wildlife parts without pre-labelled datasets; transitions to YOLOv8 bounding boxes in Phase 3.<br>**Fusion:** Late-fusion calibrated scoring (0.6 text + 0.4 vision). |
| **Backend & Ingestion** | **Python (FastAPI)**<br>• Playwright (Headless Crawler)<br>• Redis + BullMQ (Async Tasks)<br>• PostgreSQL (Audit Store) | High-throughput asynchronous API serving ML inference. Playwright enables ethical, rate-limited public listing ingestion (OLX, open forums). PostgreSQL preserves tamper-resistant evidentiary logs. |
| **Training Data & Evaluation** | **Mou et al. WLT-OSN (ICWSM 2024)**<br>• Stringham et al. (PLOS ONE 2021)<br>• CITES Trade & Seizure DBs | Group-aware cross-validation by source to prevent label leakage. Evaluated rigorously on Precision, Recall, and PR-AUC (Target: Precision > 85%, Recall > 70%). |

> ℹ️ **Architectural Note on Gemini / Commercial LLMs:**  
> Gemini 1.5 Flash is strictly an **optional demonstration wrapper** in the Phase 1 web UI for zero-setup evaluator testing. It is **not** part of our core production architecture. Real-world enforcement requires reproducible, verifiable, low-cost local models (XLM-RoBERTa + CLIP) that do not leak investigation queries to third-party cloud APIs.

---

## 3. Five-Stage Pipeline (System Architecture Flow)

```
[ STAGE 1: INGESTION SOURCES ]
  ├── Automated Ethical Crawler (OLX, Open Telegram, Open FB Groups, Forums)
  └── Investigator Direct Submission (Screenshots, Post URLs, Suspected Text)
            │
            ▼
[ STAGE 2: PRE-PROCESSING & SANITIZATION ]
  ├── SHA-256 Deduplication (prevents redundant inference)
  ├── Privacy Stripping (EXIF metadata & non-essential PII removal)
  └── Language Routing & Text Normalization (Hindi / Hinglish / English)
            │
            ▼
[ STAGE 3: DUAL-MODALITY ML ENGINE ]
  ├── Text Path: XLM-RoBERTa + Indian Wildlife Slang Lexicon (extracts species & commercial intent)
  ├── Vision Path: CLIP ViT Zero-Shot Matching (scales, ivory, pelts, illegal cages)
  └── CITES & WPA Knowledge Grounding (validates Schedule I–IV & Appendix status)
            │
            ▼
[ STAGE 4: MULTIMODAL FUSION & CONFIDENCE SCORING ]
  ├── Late Fusion Formula: Score = 0.6 · P(Text) + 0.4 · P(Image)
  ├── Bayesian Risk Calibration: Evaluates evasive trade indicators (DM price, discreet courier)
  └── 3-Class Triage Router:
        • POTENTIAL ILLEGAL WILDLIFE TRADE (Score ≥ 0.75 → Critical Flag)
        • REQUIRES MANUAL REVIEW (0.30 ≤ Score < 0.75 → Elevated Flag)
        • NO CLEAR EVIDENCE DETECTED (Score < 0.30 → Cleared)
            │
            ▼
[ STAGE 5: HUMAN-IN-THE-LOOP & ACTIONABLE OUTPUTS ]
  ├── Mandatory Human Review Queue (No automated legal accusations)
  ├── Forensic Evidentiary Dossier (Species ID, legal tier, highlighted keywords, confidence, chain-of-custody)
  └── WCCB / Forest Dept / Platform Takedown Export (PDF / JSON) + Hotspot Analytics Dashboard
```

---

## 4. Key Architectural Decisions (To Highlight to Judges)

1. **Dual-Modality Over Single-Modality:**  
   Traffickers deliberately post innocent text with incriminating photos, or generic animal photos with coded sales captions. Single-modality filters fail. Our fused pipeline catches cross-modal discrepancies.
2. **India-First, Globally Expandable:**  
   Trained on vernacular Indian terminology (*hathajodi*, *safed sona*) while using a 100-language transformer foundation (XLM-RoBERTa), enabling immediate international expansion without model refactoring.
3. **Guaranteed Zero-Hallucination Guardrail:**  
   Predictions are grounded in hard-coded CITES Appendices (I/II/III) and Indian Wildlife Protection Act (1972/2022) Schedules. Classifications output strict, validated schemas—not freeform LLM hallucinations.
4. **Strict Human-in-the-Loop Protocol:**  
   The model defines targets as **"suspected wildlife trade"** rather than "illegal," acknowledging that legality requires permit verification. Automated accusations are architecturally blocked.
5. **Compute & Cost Feasibility:**  
   The entire pipeline is engineered to train and run inference on accessible student hardware (4 GB GPU laptop / CPU fallback) with open-source models, eliminating recurring SaaS API fees for underfunded wildlife NGOs.

---

## 5. Slide Layout Guide (For PowerPoint / Canva)

```
+------------------------------------------------------------------------------------+
|  TECH STACK & SYSTEM ARCHITECTURE                                  [SDG 15 / 16]   |
|  Multimodal Open-Source Pipeline for Wildlife Trade Detection                      |
+--------------------------------------------------+---------------------------------+
|  LEFT PANEL (40% width): TECH STACK              | RIGHT PANEL (60% width):        |
|                                                  | SYSTEM ARCHITECTURE PIPELINE    |
|  [Frontend & UI]                                 |                                 |
|  • React 19 + TypeScript + Vite 8                |  [Stage 1: Sources]             |
|  • Interactive Geospatial Hotspot Map            |   Crawlers & Manual Inputs      |
|  • Tailwind CSS v4                               |          ↓                      |
|                                                  |  [Stage 2: Ingestion]           |
|  [ML Core - Dual-Modality]                       |   Deduplication & Privacy Strip |
|  • Text: XLM-RoBERTa + CITES Lexicon             |          ↓                      |
|  • Vision: CLIP Zero-Shot (Phase 2) →            |  [Stage 3: Dual ML Engine]      |
|    YOLOv8 Object Detection (Phase 3)             |   Text (XLM-R) + Vision (CLIP)  |
|  • Grounding: CITES & WPA 2022 DB                |   Grounding to CITES Taxonomy   |
|                                                  |          ↓                      |
|  [Backend & Data Pipeline]                       |  [Stage 4: Fusion & Scoring]    |
|  • Python FastAPI + Redis Queue                  |   Score = 0.6(Text) + 0.4(Img)  |
|  • Playwright (Ethical Public Scraping)          |   3-Class Risk Classification   |
|  • PostgreSQL Evidentiary Storage                |          ↓                      |
|                                                  |  [Stage 5: Review & Dossier]    |
|  [Validation Benchmarks]                         |   Human Triage → WCCB Export    |
|  • WLT-OSN + Stringham Datasets                  |                                 |
|  • Metric Focus: Precision > 85%, Recall > 70%   |                                 |
+--------------------------------------------------+---------------------------------+
|  BOTTOM BAR: CORE PRINCIPLES                                                       |
|  [✓ Dual-Modality Fusion] [✓ Vernacular Indian Codewords] [✓ Human-in-the-Loop]    |
|  [✓ Strict CITES Grounding] [✓ 100% Open-Source & Student-Compute Feasible]        |
+------------------------------------------------------------------------------------+
```

---

## 6. Presenter Script & Judge Defense (Speaker Notes)

### 🎙️ 60-Second Presentation Pitch:
> *"Judges, existing wildlife crime monitoring tools fail because they are either image-only like IFAW, English-only like US academic pipelines, or closed commercial prototypes. Furthermore, generic cloud LLMs hallucinate and incur unsustainable API costs for conservation departments.*  
>  
> *Our architecture solves this through an open-source, dual-modality pipeline. Ingestion feeds into two parallel paths: **XLM-RoBERTa** captures multilingual intent and Indian vernacular codewords like 'hathajodi' across 100 languages, while **CLIP** performs zero-shot vision recognition on disguised wildlife parts. These outputs are fused into a calibrated Bayesian threat score grounded against official CITES and Wildlife Protection Act schedules.*  
>  
> *Critically, our system never acts as an automated judge. Every flagged listing generates a forensic dossier complete with chain-of-custody metadata, which is routed to human investigators at WCCB or state forest departments. Best of all, this entire stack runs on free-tier, open-source tooling feasible on a standard 4 GB GPU."*

---

### 🛡️ Anticipated Judge Questions & Bulletproof Answers:

**Q1: "Why not just use Gemini, Claude, or GPT-4 Vision for the entire system?"**  
> **Answer:**  
> 1. **Data Sovereignty & Security:** Forest departments and enforcement agencies cannot legally submit sensitive ongoing cyber investigations to external proprietary cloud APIs.  
> 2. **Cost at Scale:** Scanning hundreds of thousands of social media posts via cloud LLM APIs costs thousands of dollars per month. Our stack (XLM-RoBERTa + CLIP) runs locally on modest hardware with zero marginal inference cost.  
> 3. **Fine-tuning & Reproducibility:** You cannot reliably fine-tune commercial closed LLMs on proprietary criminal vernacular or guarantee reproducible Bayesian probability thresholds.  

**Q2: "Why choose XLM-RoBERTa over BERT or an Indian-specific model like MuRIL?"**  
> **Answer:**  
> *"While MuRIL is excellent for Indian languages, our long-term roadmap expands from India to global wildlife trafficking routes (Southeast Asia, Africa, Europe). XLM-RoBERTa natively supports 100 languages out of the box, allowing us to support Hindi, Hinglish, Bengali, Tamil, and English today, and expand globally tomorrow without rebuilding the pipeline."*

**Q3: "How do you handle traffickers constantly inventing new codewords?"**  
> **Answer:**  
> *"We decouple our system into a robust semantic text classifier and a dynamically updated CITES keyword lexicon. When investigators discover new slang—such as a new phonetic misspelling—it can be added to the taxonomy database in seconds for immediate regex and heuristic boosting without requiring a full model retraining cycle."*

**Q4: "What happens if a legitimate antique dealer or nature photographer gets flagged?"**  
> **Answer:**  
> *"That is why our pipeline includes negative indicator filtering (e.g. conservation terms, scientific provenance) and why the system's output is explicitly defined as 'Suspected Wildlife Product Sale' rather than 'Illegal Crime.' No listing is ever auto-reported or publicly accused; an investigator verifies permits and provenance before taking action."*

**Q5: "How is the geospatial map/globe rendered on the dashboard?"**  
> **Answer:**  
> *"In our web prototype, client-side WebGL / Three.js powers the interactive globe for dynamic demonstration and hotspot tracking. In field deployment, this interfaces with standard lightweight 2D GIS mapping (Leaflet / GeoJSON) to run smoothly on low-bandwidth forest department stations."*
