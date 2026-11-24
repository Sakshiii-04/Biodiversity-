# Project Summary — Illegal Wildlife Trade Detection System
> **Status:** Pre-prototype · Research & Architecture phase  
> **Event context:** SUSTAINOVA 2026 Ideathon (SDG 15) — Round 1 deadline 18 Nov 2026, Round 2 offline 26 Nov 2026  
> **Project name:** SAMRAKSH  
> **Team:** 4 members · Acropolis Institute of Technology and Research, Indore

---

## 1. What This System Does

A **three-part system**:

1. **Crawler** — Automatically scans public listings (OLX, open Facebook groups, open Telegram channels, wildlife forums) for suspicious wildlife product listings.
2. **Detection Engine** — Accepts both crawler-sourced content AND user-submitted content (screenshots / URLs from investigators). Analyzes text + images using ML to flag suspected wildlife product sales.
3. **Human Review Dashboard** — All flagged items go into a review queue. Investigators see individual case dossiers (species ID, confidence, extracted text, suspicious keywords, explanation) AND aggregate analytics. They manually click to export a report / dossier for WCCB / forest dept / NGO.

> **Critical principle:** The system flags *"suspected wildlife product sale"* — NOT *"illegal listing"*. Legality cannot be determined from listing text alone. Human review is mandatory before any report is made. No automatic accusation, ever.

---

## 2. Who Uses It

**Primary users:**
- Wildlife crime investigators (WCCB, state forest departments)
- NGO analysts (WTI, WWF, TRAFFIC India)
- Platform trust-and-safety teams (via API, Phase 3+)

**Secondary users (Phase 3):**
- Citizen volunteers (Cyber Spotter style — flag and submit)
- International enforcement bodies as the system expands beyond India

---

## 3. Novelty — What Makes This Different

Existing tools and their gaps:

| Tool | Coverage gap |
|---|---|
| IFAW AI Guardian | Image-only, 34 species, invite-only, no Indian context |
| WWF SG Cyber Spotter | Asia-focused, not India-specific languages/species |
| German EA AI Lab | EU languages/platforms only, proprietary, no public access |
| NYU VIDA LTS | Research pipeline only, no India data, no investigator UI |

**Our differentiators:**
1. **India-first, world-extensible** — Hindi/Hinglish codewords (e.g. *hathajodi* = monitor lizard genitals), Indian species (pangolin, monitor lizard, star tortoise), Indian enforcement workflow (WCCB-compatible output)
2. **Genuinely multimodal** — combined text + image analysis in a single pipeline (most existing tools do only one)
3. **Human-in-the-loop by design** — not just a flag, but a structured dossier with chain-of-custody metadata
4. **Open-source & free-to-use** — designed for resource-constrained NGOs and forest departments; no expensive infra required
5. **Drift-aware** — new codewords and species can be added without retraining the core model (lexicon + retraining pipeline built in)
6. **Language-agnostic architecture** — XLM-RoBERTa supports 100 languages; expand from India to global without swapping the model

---

## 4. Finalized Tech Stack

### Frontend (React App — Existing, Extend)
| Component | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| 3D Globe (incident map) | Three.js 0.187 |
| Icons | Lucide React |
| Linting | oxlint |

### ML / AI Engine (Phase 2 — Build Next)

**Text Classification:**
- **Model:** XLM-RoBERTa (facebook/xlm-roberta-base)
- **Why:** Covers 100 languages out of the box; best choice for India-first + global expansion; strong Hindi/Hinglish performance; large community and fine-tuning support
- **Pipeline:** TF-IDF + Logistic Regression baseline → fine-tune XLM-RoBERTa → deploy via FastAPI

**Image Classification:**
- **Phase 2 Model:** CLIP (OpenAI) — zero-shot querying ("pangolin scales in a bag") without needing a labelled image dataset
- **Phase 3 Model:** YOLOv8 (fine-tuned) — precise bounding-box detection once real labelled image data is available
- **Why CLIP first:** No image training data yet; CLIP lets us query species/parts by text description zero-shot

**Current Prototype Engine (Phase 1 — Live Now):**
- Deterministic keyword/heuristic engine (TypeScript, in `aiService.ts`)
- CITES taxonomy database (9+ species, Appendix I/II/III)
- 5 trade indicator rulesets (private messaging, bulk trade, permit evasion, etc.)
- Bayesian confidence scoring: `P(Crime|E) = P(E|Crime) × P(Crime) / P(E)`
- Gemini 1.5 Flash Vision API (optional — only used if API key is provided; not core to the architecture)

> **Why not Gemini as the core?** Gemini is cloud-dependent, has per-request costs at scale, is a black box (not explainable), and cannot be fine-tuned on our IWT-specific data. It is kept as an *optional enhancement* for the demo, not the architecture.

### Backend (Phase 2 — Build After Round 1)
| Component | Technology |
|---|---|
| API server | Python + FastAPI |
| ML model serving | FastAPI + Hugging Face Transformers |
| Database | PostgreSQL (audit log, case management) |
| Async queue | Redis + BullMQ (crawler ingestion pipeline) |
| Crawler | Playwright (ethical, public listings only) |
| Deployment | Docker + free-tier cloud (Render / Railway) |

---

## 5. System Architecture — 5-Stage Pipeline

```
SOURCES → INGESTION → ML ENGINE → SCORING → HUMAN REVIEW → DOSSIER OUTPUT
```

**Stage 1 — Sources**
- Public listings: OLX, open Facebook groups, open Telegram channels, wildlife trade forums
- User-submitted: investigators paste URLs or upload screenshots directly

**Stage 2 — Ingestion & Pre-processing**
- Image normalization (resize, EXIF strip for privacy)
- Language detection (for routing to correct text model)
- SHA-256 deduplication (never reprocess a known listing)
- Metadata extraction: timestamp, platform, listing text

**Stage 3 — ML Engine (Dual-modality)**
- **Text path:** XLM-RoBERTa text classifier → species/product keyword detection → trade indicator pattern matching → language-aware codeword resolution (hathajodi → monitor lizard)
- **Image path:** CLIP zero-shot → species/part identification → packaging/shipping cue detection
- **Fusion:** Combine text + image confidence scores into a joint signal

**Stage 4 — Confidence Scoring & Classification**
- 3-class output: `SUSPECTED WILDLIFE TRADE` / `REQUIRES MANUAL REVIEW` / `NO EVIDENCE DETECTED`
- Threat severity: `Critical` / `Elevated` / `Low` / `Negligible`
- Hallucination/false-positive guard: CITES taxonomy grounding (Appendix I/II/III lookup) + schema-validated JSON output
- Bayesian confidence model across text + image evidence nodes

**Stage 5 — Human Review & Dossier**
- All positives enter investigator queue — no auto-action
- Dossier contains: species ID + CITES status, extracted text, suspicious keywords, confidence score, full plain-language explanation, chain-of-custody log
- Investigator clicks "Export Report" → structured PDF/JSON for WCCB / forest dept / platform team
- Aggregate analytics dashboard: trends by species, region, platform, time

---

## 6. Training Data & Evaluation

### Text Data (Priority)

| Dataset | Status | Notes |
|---|---|---|
| **Mou et al. WLT-OSN** (ICWSM 2024) | ✅ In use | 8,676 rows (255 positive ~3%), ivory-focused, English tweets. Kaggle: `shrianshshrivastava/mou-et-al-wlt-osn-dataset`. **Never use `source` column as a feature — it leaks the label.** Use group-aware CV by source. |
| **Stringham et al. 2021** (PLOS ONE) | ⏳ Not yet loaded | ~16.5k labelled online listings, 148 English marketplaces. GitHub: `ocstringham/text_classification_wildlife_trade`. Labels = relevance (not legality) — good for Stage 1 relevance gate. |
| **VIDA-NYU wildlife_pipeline** | ⚠️ Unverified | ~1M ads, 41 marketplaces, 235 species, 20 languages. Only code confirmed. Check LTS folder / email authors for data. arXiv 2407.18898, 2504.21211. |
| **chhatrapathisivaji on GitHub** | ⚠️ Unverified | Multimodal (DistilBERT + images). Use as architecture reference only until data quality checked. |

### Lexicons & Species Reference

| Resource | Use |
|---|---|
| **Stringham species seizure dataset** (Data in Brief 2021) | ~4.9k taxa, 45k+ common names in 100+ languages, 110 use-types. figshare: `14914773`. Use for query generation + weak labels. |
| **Alfino & Roberts ivory codewords** (Oryx 2018) | 19 codewords (eBay, UK/Italy/France/Spain). Seed lexicon. |
| **Custom CITES taxonomy DB** (in `aiService.ts`) | 9 species, Appendix I/II/III, keywords including Hindi variants. Extend this. |

### Ground Truth (Seizures / Legal Trade)

| Resource | Use |
|---|---|
| CITES Trade Database (trade.cites.org, v2025.1) | 20M+ legal trade shipments — negative signal context |
| CITES Illegal Trade Database (citesdata.un.org) | Seizures since 2016 — species-level ground truth |
| TRAFFIC Wildlife Trade Portal (wildlifetradeportal.org) | Open-access seizure data |

### Evaluation Plan
- **Primary metrics:** Precision, Recall, F1 on held-out test set (group-aware split by source to prevent leakage)
- **Target (from literature):** >85% precision, >70% recall (WWF achieved 91.1% precision, 95.5% recall)
- **Secondary:** Live demo on real examples + analyst usability feedback
- **Transparency:** Report where the model fails; flag known failure modes (new codewords, non-English, image-only listings)

---

## 7. Legal & Ethical Constraints

- **Only public data:** No scraping of private chats, encrypted groups, or login-walled content
- **No personal data retention:** No seller names/identifiers stored beyond what a dossier requires
- **No automatic accusation:** Every flag requires human review before any report
- **Indian law alignment:** WPA 1972 (amended 2022) — Schedule I/II fully protected; Schedule IV = all CITES species. Output is "suspected" not "illegal" — legality is for investigators to determine
- **Ethical data use:** Follow platform ToS; anonymise PII in outputs; document data provenance for chain-of-custody
- **Planned cooperation:** Real deployment requires WCCB / platform partnership — we don't recommend covert scraping in production

---

## 8. Phased Roadmap

| Phase | Timeline | Deliverable |
|---|---|---|
| **Phase 1: Prototype + PPT** | Now | React app (heuristic engine), competition PPT, 2-min video |
| **Phase 2: ML Core** | Post Round 1 | FastAPI backend + XLM-RoBERTa text classifier on WLT-OSN data + CLIP image model; connect to React frontend |
| **Phase 3: Crawler + Expansion** | Post Round 2 | Playwright crawler for public listings + multilingual expansion (beyond Hindi) + YOLOv8 fine-tuning |
| **Phase 4: Open Release + Pilot** | Long-term | Open-source release + NGO/WCCB pilot + documentation for self-hosting |

---

## 9. SDG Alignment

| SDG | How |
|---|---|
| **SDG 15 — Life on Land** | Direct: detecting trade in protected species (pangolin, tiger, elephant) reduces poaching pressure |
| **SDG 16 — Peace, Justice & Institutions** | Provides structured evidentiary dossiers to enforcement bodies (WCCB, forest dept); strengthens institutional capacity |
| **SDG 12 — Responsible Consumption** | Data on demand patterns (which species, which regions) feeds awareness campaigns and demand-reduction programs |
| **SDG 17 — Partnerships** | Architecture requires multi-stakeholder collaboration (tech + NGO + enforcement + platforms); open-source design enables it |

---

## 10. Key Open Questions / Next Steps

- [ ] Finalize project name (team decision)
- [ ] Load and validate Stringham 2021 dataset + VIDA-NYU pipeline data
- [ ] Build hand-labeled gold test set (100–200 posts, diverse sources, non-ivory species)
- [ ] Add Hindi/Hinglish examples to WLT-OSN; label monitor lizard / pangolin posts
- [ ] Design FastAPI endpoint schema (input → AnalysisResult type already defined in `src/types/index.ts`)
- [ ] Platform ToS review before crawler development (OLX, FB, Telegram)
- [ ] Seek data collaboration with WTI / TRAFFIC India

---

## 11. Files & Codebase Context

| Path | What it is |
|---|---|
| `src/components/Detection/aiService.ts` | Current heuristic engine + Gemini API wrapper. CITES taxonomy DB and trade indicators live here. |
| `src/types/index.ts` | `AnalysisResult` type — this is the canonical output schema for all future ML models too |
| `src/components/Architecture/ArchitectureSection.tsx` | Architecture section of the demo site |
| `src/data/hotspotsData.ts` | Biodiversity hotspot data for the globe |
| `src/data/incidentsData.ts` | Historical IWT incident data for the globe |
| `docs/competition.md` | Event rules, judging criteria, deadlines |
| `docs/deep-research-report (1).md` | Literature review: existing tools, gap analysis, dataset inventory |
| `docs/summary.md` | ← This file. The canonical project context document |
