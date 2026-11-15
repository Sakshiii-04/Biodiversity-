# Executive Brief  
Illegal wildlife trade (IWT) has rapidly migrated online, exposing conservation gaps and enforcement challenges. Our deep review found several promising automated detection initiatives worldwide, but none tailored to India’s context. Key gaps include limited coverage of India‐specific languages and species, failure to monitor encrypted/private channels, and inadequate integration of text and image analysis with investigator workflows. For example, WWF’s Cyber Spotter program in Singapore flags thousands of listings across 12 languages, and Germany’s AI Lab tool can identify 1,250 CITES species in online ads, but no known system targets Indian vernacular or encrypted social-media trade. We examined options (India-focused monitoring, dataset/model development, investigator tools, or hybrid) and recommend a **phased hybrid approach**: first building an ML prototype on curated data (addressing India-specific species/language gaps), then extending to limited lawful monitoring with a reviewer interface. This leverages our findings: existing systems excel at image recognition or text filtering, but India needs context (e.g. “hathajodi” for monitor lizards) and low-cost, accessible tools. We will evaluate with precision/recall on held-out listings, and tie outcomes to SDGs (e.g. SDG15 by protecting species). All claims below cite current primary sources.

# Problem Landscape  
Illegal wildlife trade online is global and growing. Traffickers use websites, e-commerce, and social media to anonymously sell protected species and products across borders. A recent report notes that in one year India had ~60 online IWT cases (ivory, pangolins, exotic pets) and WCCB identified 300 sea-cucumber postings. These digital markets make enforcement harder: encryption and private groups let traffickers operate with impunity.  For example, WTI found that offenders in Odisha (2020–21) used social messaging apps to trade pangolin scales, and formerly open listings quickly vanished when police cracked down, pushing deals into private channels. Indian law (Wildlife Protection Act 1972, as amended 2022) now places *all* CITES species in Schedule IV, meaning international trade needs permits. Enforcement is multi-agency: WCCB leads national intel, working with state forest, police, CISF (airports), customs, etc.  However, as trafficking shifts online, **real-time monitoring and clear evidentiary trails are lacking**. Our evidence shows many online listings remain unchecked: one study scraped Twitter and found 53 ivory-sale posts among 138,000 tweets – a tiny subset pointing to a “needle in a haystack” problem. Overall, while public seizures and reports exist, the scale of online IWT (unknown total listings) and the sophistication of traffickers (codewords, private chats) demand new tech-assisted solutions.

# Existing Automated IWT Monitoring Systems  
We surveyed major efforts to date (Table 1 below). Notably:

- **German Environment Agency AI Lab (UBA/BfN)** – *Pilot tool* for EU markets. It combines web-scraping, OCR, rule-based NLP and image recognition (YOLO, GroundingDINO) to flag ads. It claims coverage of “over 50,000 protected animals” and 1,250 CITES species. The system reportedly “goes beyond keyword search” to handle obscured listings and auto-prioritizes high-risk cases (rare species, odd prices). It is in trial phase with no public release; code is proprietary. (Languages/platforms unspecified, likely major EU languages and social networks).

- **IFAW AI Guardian Portal** – *Operational image-classifier* (IFAW/Baidu) for investigators. Deployed internally since 2020, with a new user portal in 2026. It is a CNN model (Baidu’s ERNIE Vision) trained on animal/product images. IFAW reports it screened 500,000 images and identified 50,000 illegal-product images, leading to removal of ~18,000 illicit posts. The portal identifies 34 endangered species/products at ~86.5% accuracy. It is invite-only (no public API), focusing on image identification rather than automated web crawling.

- **WWF Singapore Cyber Spotters (AISG project)** – *Deployed ML-assisted service*. An AI Singapore (AISG) system, integrated into WWF’s volunteer-based Cyber Spotter program, scans e-commerce listings. Trained on images/text of ivory, pangolin, wild cat, elephant products (plus turtle), it achieved 95.5% detection and 91.1% precision in lab tests. In 2023, volunteers flagged 6,870 suspicious listings across 12 languages. The system filters candidates which humans review; confirmed cases get sent to law enforcement or platforms. It is regional (Asia‐focused) and results are used by WWF (not open-source).

- **NYU VIDA “Learn to Sample” (LTS)** – *Research project pipeline*. Uses large language models (LLMs) to label a small representative sample of marketplace ads and trains specialized text classifiers on them. In trials on U.S. e-commerce data, LTS models achieved up to 95% F1, reducing labeling costs. The pipeline is open-source, focusing on varied research queries (e.g. alligator handbags vs shark fins). It has not been packaged as an enforcement tool; rather, it demonstrates scalable labeling and classification for text-based ad detection.

- **Digital Surveillance for Invasive Wildlife Trade (DIWT)/WildlifeTracer (Australia)** – *Completed national project*. Developed by Univ. of Adelaide and CIS, it scraped ~93 websites (ads, classifieds) for exotic pet trade. Over 7 million listings were gathered into a database (diwt.org). Classifieds/forums were 91% of ads; 91% came from U.S. sites. A web portal (WildlifeTracer) lets authorities query this data. This system focused on invasive (non-native) species, not directly on poaching, and it’s now completed and accessible by registration. 

- **Other initiatives** – Various NGOs and labs use AI or apps (e.g. Traffickers Watch Apps, WildScan) to aid reporting, but no single comprehensive system. For instance, Wang et al. (2019) applied unsupervised ML to 138k Twitter posts and found 53 ivory-sale tweets, illustrating feasibility of keyword+topic methods without prior training data. Overall, most existing tools target either images (IFAW, WWF) or text (NYU, Twitter models), but **none is publicly available or tailored to India**. 

**Table 1. Key existing automated IWT monitoring initiatives (2022–26)**  
| System/Org              | Operator          | Status         | Monitored Channels              | Method           | Content | Coverage & Performance                                                    | Access          |
|-------------------------|-------------------|----------------|---------------------------------|------------------|---------|----------------------------------------------------------------------------|-----------------|
| German EA AI Lab | German Env. Agency/BfN | Prototype/Pilot | Web + Social (5 platforms)^    | Web-scrape + NLP + CNN | Text+Image | 50K species+ (incl. 1250 CITES); auto-prioritizes high-risk cases | Pilot; closed   |
| IFAW AI Guardian    | IFAW & Baidu      | Operational    | Investigator-supplied images    | Deep CNN         | Image   | 34 endangered species; 86.5% ID accuracy; 18k posts removed (2020–26) | Invite-only     |
| WWF SG Cyber Spotter | WWF-Singapore/AISG | Deployed (2023) | E-commerce sites (Asia)        | CNN + ML         | Text+Image | Detects ivory, pangolin, etc.; 95.5% recall, 91.1% precision; 6870 listings flagged in 2023 | Internal (WWF)  |
| NYU VIDA LTS  | NYU VIDA (NSF)   | Research       | Online marketplaces (global)    | LLM + classifiers | Text    | Open-source pipeline; up to 95% F1 in experiments on diverse ad data | Public (GitHub) |
| DIWT / WildlifeTracer | Univ. Adelaide/CIS | Completed (2022) | 93 global sites (excl. social)  | Web-scrape + DB  | Text    | 7M listings collected; 91% from classifieds, mostly US sites | Registration    |
| **Others**             | various NGOs      | Pilots/Apps    | Social media, citizen reports   | Keyword or app   | Text+Image | Eg. Twitter study found 53 ivory posts (138k tweets)  | N/A             |

^ *Exact platforms not fully disclosed.*  

**Current-state Capability Map:** In summary, automated IWT detection is *emerging*: computer vision can recognize known products (elephant ivory, pangolin scales, tiger skins), keyword filters can highlight likely ads, and multi-modal pipelines (German tool) combine both. However, coverage is fragmented: image tools lack text understanding; text tools need training data or keyword lists; none handles encrypted/private channels or tracks user networks. Many systems are prototypes or NGO tools, not full public services. 

# Evidence-Backed Gap Analysis  
We assessed hypothesized gaps against sources. The strongest gaps in the Indian context are:  

- **(1) Private/Encrypted Channels** – *Undetected trade in closed networks.* Evidence: Investigations show traffickers increasingly use closed messaging and private groups. One report notes social media groups (often encrypted) as major IWT hubs, allowing anonymity. No existing AI tool can legally monitor encrypted apps or private groups (WhatsApp/Telegram) without cooperation from companies. Consequence: Many transactions (e.g. sale of rare reptiles) likely go unflagged. Current approach: Enforcement relies on tips or human infiltration. Unresolved: How to capture content beyond open web. *Relevance to India*: Extremely high, as WTI found multiple Assam/TN cases via YouTube tracking only with difficulty. **Confidence:** High gap.

- **(2) Multi-language and Context Sensitivity** – *Local languages, codewords, and cultural context.* Evidence: WWF Spotters identified new keywords across 12 languages. WTI’s Maltego case showed "hathajodi" (Hindi term) masking lizard genitals. No current system documents support for Indian languages (Hindi, Bengali, etc.) or slang. The German and Singapore tools do not publicize language support; they may miss India-specific terms. Consequence: High false negatives. Existing approaches (volunteer spotters) rely on manual human knowledge. Unresolved: Automated NLP for Indic languages and evolving jargon. *India relevance:* Critical, given linguistic diversity. **Confidence:** High.

- **(3) Combined Text–Image Detection** – *Poor integration of text and image cues.* Evidence: Apart from the German pilot, most systems specialize. IFAW’s AI Guardian ignores listing text, WWF-SG leverages images/keywords for limited products. However, real listings often pair an image with descriptive text or coded ads. Joint modeling could improve recall. Existing work: some research uses both (e.g. Di Minin et al. 2024 noted absence of such methods). The gap: no out-of-the-box multimodal IWT detector known. Impact: Could catch cases that single-modality misses (e.g. an ambiguous photo with incriminating caption). India relevance: High, as traffickers cleverly disguise images and wording. **Confidence:** Medium.

- **(4) Investigator-Focused Workflow** – *Lack of integrated evidence pipelines.* Evidence: Successful investigations (Maltego case) required manual linking (emails, domains). Current tools flag content but do not track case progress or provenance (except IFAW portal logs images). A reported WCCB-WTI workshop emphasizes the need for forensic and intelligence support. No existing public system provides an interface to annotate, prioritize, and share leads. Consequence: Alerts may not translate to action. Approach: Some NGOs (Coalition to End Wildlife Trafficking Online) coordinate removals, but no formal case management. *India relevance:* Medium; would aid WCCB/workflow. **Confidence:** Medium.

- **(5) Data Scarcity and Bias** – *No large labelled IWT dataset, and potential model bias.* Evidence: Researchers often have to compile their own (e.g. 7M scraped ads, 138k tweets). This suggests lack of public datasets. Consequence: Models may overfit or miss rare cases (pangolins had no tweets in [48]). Existing partial remedy: Open-source NYU code, IFAW’s data (closed), WWF’s volunteer reports. Unresolved: Building representative Indian training data. *India relevance:* High for prototype feasibility. **Confidence:** High.

Ranking, the top three gaps (with evidence) are **Encrypted/private channels**, **Multilingual/context**, and **Data availability/localization**. Each significantly limits existing solutions and our project’s novelty. For example, tracking Amazon or Facebook is moot if sellers switch to WhatsApp, and no evidence tool covers that. Conversely, less critical gaps (e.g. “identifying derivatives” like genetic products) are part of the multilingual/context challenge. All identified gaps would need to be addressed or mitigated in our proposal.

# Recommended Project Direction  
We evaluated four options on novelty, feasibility, data access, and impact:

1. **India-focused Monitoring/Detection** – Building a comprehensive crawler+classifier for Indian IWT. *Pros:* Direct alignment to our goal; fills “no India tool” gap. *Cons:* Large scope for an ideathon; legal/ethical issues scraping Indian platforms; many technical challenges (languages, closed groups) uncovered above. Also overlaps conceptually with existing projects (NYU pipeline, German tool) albeit with local focus. 

2. **Dataset/Model for a Detection Weakness** – Focus on one modality or weakness. For instance, train a text classifier on India-specific IWT listings (codewords, languages). *Pros:* More doable scope; can leverage transfer learning. A clear ML deliverable. *Cons:* Incremental innovation; risk of insufficient data. But if we target a documented gap (e.g. detecting monitor lizard ads via “hathajodi”), this could be novel regionally.

3. **Investigator Workflow Prototype** – Develop an interface to link detections to evidence. *Pros:* Addresses integration gap; many components exist (databases, UI frameworks). Could demo a dashboard. *Cons:* Less “AI” novelty; risk of being too modest. Could be positioned as an enabler for any detection engine (not specific to our idea).

4. **Phased Hybrid Approach** – Combine (2) and (3): first, build a prototype classifier (text and/or image) on a curated India-specific dataset; second, demonstrate how alerts feed into a review interface for investigators. *Pros:* Balanced – yields both a technical model and a user workflow, mirroring proven pipelines (NYU LTS → WWF Spotters). It acknowledges that full monitoring is beyond scope, so we pivot to solving a subproblem (data/model) plus human-in-the-loop review. *Cons:* Still ambitious, but feasible if well-scoped (e.g. focus on one species or platform initially).

**Recommendation:** Option 4, *phased hybrid*, is most defensible. It is novel (no existing India-specific model/workflow known), leverages our students’ ML skills, and can be validated on sample data. We would clearly position it as a **prototype and regional adaptation**, not a final enforcement system. Compared to (1), it is realistic for an ideathon; compared to (2) or (3) alone, it combines strengths and addresses the top gaps of data deficiency and process integration. 

For example, we could begin by collecting a small dataset of public IWT posts (e.g. seized WTI records or scraped classifieds) and train a text classifier to detect *hathajodi* or other coded terms, supplemented by image features. Then we build a simple web dashboard where new listings (fetched or user-uploaded) are flagged and annotated, enabling a “cyber spotter” style review. This directly ties evidence (listings) to action (potential enforcement leads). 

# Dataset and Technical Feasibility  
No ready-made IWT detection dataset exists for India. Known sources: IFAW’s internal labelled images (not public) and WWF’s volunteer reports. We will create data by **web scraping** (permissible public sources) and/or collaborating with NGOs for anonymized records. Potential data includes: (a) e-commerce ads in English/Hindi (e.g. OLX, exotic pet forums), (b) social media posts from open groups (e.g. Telegram/FB), (c) NGO-curated lists (e.g. from Maltego case). Synthetic data (image search for species, data augmentation) might expand variety.

A realistic prototype: start small, e.g. focus on one taxon (e.g. monitor lizards or pangolins) with multilingual keywords. Baseline approach:  
- **Text Model:** Fine-tune a transformer (e.g. multilingual BERT) for classification. (Define *language model:* an AI tool that converts text into numerical features for classification.) We could use the LTS pipeline idea: manually label a few hundred posts, train initial classifier, then active learning to expand labels.  
- **Image Model:** Use a CNN (e.g. YOLOv5 – an object detection CNN) to flag images of interest (tiger skins, lizard parts). Pre-trained models on ImageNet + custom fine-tuning can be feasible with limited data. Consider using CLIP (zero-shot image+text embedding) to handle novel queries.  

Evaluation: Split data into train/test sets to report precision and recall. Emphasize precision (minimize false alerts) to avoid wasting enforcement time. For imbalanced data, also report F1-score. Control leakage by ensuring no same listing in train and test. Possibly cross-validate by platform. Due to class imbalance (few illegal posts), use precision/recall curves or an F1 balance. No single accuracy metric should be “invented” without evidence.  

Technical stack: Likely open-source tools (e.g. Python scikit-learn, PyTorch). We’ll define frameworks: *CNN* (Convolutional Neural Network, a type of image classifier) and *LLM* (Large Language Model) briefly on first use. Data storage could be simple CSV or a small database. Depending on time, an existing app/template (e.g. Streamlit or Flask) can serve as the dashboard. Cloud costs are low for a prototype.

# Indian Legal & Operational Context  
Indian wildlife law (Wildlife Protection Act, 1972, amended 2022) strictly regulates trade. Key points:  
- **Schedules:** Schedule I/II species (e.g. tigers, elephants, rhinos) are fully protected; any trade or possession (even online selling) is illegal. Schedule IV (post-2022) includes all CITES Appendix species, meaning exports/imports require government permits. Thus, any online listing of a protected species without proof of permit is suspicious or illegal. Our tool would flag such content; **human reviewers must then check permit status** – we will emphasize that the output is *suspicious content*, not judicial proof.  

- **Enforcement structure:** The Wildlife Crime Control Bureau (WCCB) is the central agency handling inter-state and international IWT, supported by state forest departments, police, customs, and airport security. WCCB also liaises with CITES (designated Management Authority). In practice, forestry/wildlife officers, sometimes with police, investigate and seize contraband. Collaboration (SAWEN, IBCA, NGOs) is common. 

- **Procedure:** When a suspicious listing is found, one cannot publicly accuse individuals. Instead, investigators gather evidence (screenshots, metadata) and possibly use legal provisions (e.g. Section 91/92 CrPC) to demand info from platforms or telecom. The evidence must be carefully logged. We will propose a workflow consistent with these rules: our prototype will only scrape *public* sites (no hacking into private groups), and any data retention would note source/time for traceability (GDPR-like caution). 

- **Permissible data use:** We will *not* recommend unauthorized access to private chats, sharing private data without consent, or entrapment. Instead, we suggest focusing on open postings (public websites, open-group posts) or collaborations with authorities. For example, if an online marketplace cooperates, our system could ingest flagged posts from them. All development will follow ethical guidelines (e.g. only publicly visible data, anonymize personally identifiable info in outputs). 

In summary, we will build a “lawful prototype” by using open-source data and authorized channels (e.g. public APIs, NGO-provided samples). We will document that a real deployment would require official partnership (e.g. WCCB or social media companies’ agreement) and avoid any recommendation of covert scraping.

# SDG Alignment & Impact  
Combating IWT ties to several UN Sustainable Development Goals. Key linkages:  
- **SDG 15 (Life on Land):** By detecting illicit trade, we protect endangered species and ecosystems. For instance, intercepting even a few trafficking networks could save many animals (e.g. the WCCB-led pangolin bust prevented dozens of wild-caught animals). We do *not* claim “one listing flagged = one animal saved,” but cite IFAW’s successes: their AI screened 500k images and helped remove 18k illegal posts, an effort toward reducing poaching demand.  
- **SDG 16 (Peace, Justice & Institutions):** IWT often funds organized crime, undermining rule of law. Our project strengthens institutions by providing evidence and tools that law enforcement can use. Collaboration (e.g. between tech NGOs and WCCB) is an example of building strong partnerships. We reference how workshops stressed unified action and how data sharing (e.g. police-forest cooperation) improves outcomes.  
- **SDG 12 (Responsible Consumption):** By raising awareness (e.g. highlighting the “illicit” nature of products like *hathajodi*) and supporting demand-reduction campaigns, we promote more responsible behavior. WTI explicitly uses education (“mass sensitization”) to reduce demand among artisans. Our system could feed data into awareness campaigns (e.g. which products are most targeted).  
- **SDG 17 (Partnerships):** This project by nature requires multi-stakeholder cooperation. Existing initiatives (WWF with AISG, IFAW with Baidu, WTI with enforcement) show cross-sector action. We will encourage partnerships (e.g. with WTI for data, with platform coalitions).  

Potential impact metrics (beyond project scope) include: # of listings flagged, # of successful take-down requests forwarded, or # of enforcement actions initiated. For this ideathon, we focus on foundational metrics (model precision/recall) and ensure our PPT highlights *verifiable claims* rather than lofty impact projections.

# PPT Research Pack  

**Slide 1: Problem Statement** – *Key message:* Online IWT is pervasive and under-monitored.  
  - **Claims/Stats:** “Global IWT trades $7–23 B/year; India saw 60+ online cases last year. WCCB notes social media & apps now major trade channels.”  
  - **Sources:** [41], [39], [21].  
  - **Visual:** World map or infographic of trafficking routes; screenshot of a disguised listing (e.g. “Hatha Jodi” post) with highlight.  
  - **Slide text vs. spoken:** On-slide: “IWT often hides online: dozens of cases detected in India”. Spoken: elaborate on medium (social networks, apps) and mention challenge from [36†L130-L139].  
  - **Caveats:** Not all online listings are illegal; need verification.  
  - **Judge questions:** “How big is this problem in India?” (Answer: thousands of posts likely, but 522 cybercrime cases in 2020 suggest growing trend).

**Slide 2: Proposed Solution & Innovation** – *Key message:* A hybrid ML and analyst workflow to flag suspicious listings in Indian contexts.  
  - **Claims:** “Existing AI systems detect wildlife images, but none cover Indian languages or encrypted chats. We target *Indian-specific listings* (vernacular, local markets) with a combined text+image model, reviewed by experts.”  
  - **Sources:** [50] (new keywords, languages), [36] (example codeword), [3] (beyond keywords approach).  
  - **Visual:** Diagram of solution (crawler → ML filters → analyst interface).  
  - **On-slide text:** “AI + human review for India-specific IWT detection.”  
  - **Spoken:** Explain novelty: adaptation to India (species, languages); mention “no AI tool currently identifies ‘Hatha Jodi’ as monitor lizard”.  
  - **Caveats:** Prototype will be limited to public data and known species; we will not violate privacy.  
  - **Likely questions:** “Why not just use existing tools?” (Answer: they ignore Indian context, new codewords etc.)

**Slide 3: Tech Stack & Architecture** – *Key message:* ML classifiers (image + multilingual text) + open-source pipelines.  
  - **Claims/Elements:** “We will use CNNs (e.g. YOLO) for images and Transformer NLP (e.g. multilingual BERT) for text. Data is scraped from public listings (e-commerce, forums). Model performance will be evaluated by precision/recall, to ensure we flag true IWT posts. System architecture: Python backend, simple web dashboard.”  
  - **Sources:** [3] (YOLO mention), [21] (evaluation, 95% F1).  
  - **Visual:** Annotated system diagram (browser/web crawlers, ML models, UI).  
  - **On-slide vs. spoken:** On-slide: “CNN & NLP with human vetting.” Spoken: define YOLO (real-time object detector) and LLM briefly; emphasize open-source.  
  - **Caveats:** Model accuracy depends on training data quality; region-specific tuning needed.  
  - **Questions:** “How will you handle new species or codewords?” (Train iteratively with new data, human feedback loop as in Cyber Spotters).

**Slide 4: Feasibility, Viability & Roadmap** – *Key message:* Prototype achievable in phases with clear validation.  
  - **Claims:** “Step 1: Build dataset & model for one IWT category (e.g. monitor lizards) using public ads. Step 2: Develop analyst interface. We will validate with held-out test posts: target >85% precision, >70% recall (analogous to WWF’s 91% accuracy). If successful, expand to more species and voluntary pilot (e.g. with WTI analysts).”  
  - **Sources:** [18] (95.5% detection, 91.1% accuracy), [21] (95% F1).  
  - **Visual:** Timeline or phased Gantt chart.  
  - **On-slide:** “Phase 1: Model & dataset; Phase 2: Dashboard & trials.”  
  - **Spoken:** Discuss resource needs (GPU time is modest), highlight that many open-source libraries exist.  
  - **Caveats:** Data privacy must be enforced; we depend on NGO cooperation for data.  
  - **Questions:** “How will you measure success?” (Use precision/recall on labeled test cases; possibly count law enforcement referrals or removals triggered in a pilot).

**Slide 5: SDG Alignment & Impact** – *Key message:* Supports SDG15/16/12/17 via tech-enabled conservation.  
  - **Claims:** “By detecting illegal trade, we protect biodiversity (SDG15); by empowering law enforcement (SDG16); by discouraging demand (SDG12) and fostering partnerships (SDG17). For example, our alerts could aid enforcement seizures (as WCCB did via YouTube intelligence).”  
  - **Sources:** [41] (pangolin case, cybercrime data), [35] (demand reduction emphasis), [50] (platform cooperation).  
  - **Visual:** SDG icons with relevant keywords (Life on Land, Justice, Consumption, Partnerships).  
  - **On-slide:** List 4 SDGs with icons; note “Research-backed approach (not mere claims).”  
  - **Spoken:** Caution: detection ≠ immediate savings, but cite examples (18k posts removed suggests thousands of animals potentially spared from sale). Emphasize long-term indicators (policy changes, NGO reports).  
  - **Questions:** “How will you link listings to actual conservation?” (By collaborating with enforcement to track how many flagged cases lead to seizures; by contributing data to NGOs’ demand-reduction campaigns).

**Claim-to-Source Register (selection):** “Pandemic saw traffickers move online; IFAW’s AI screened 500k images and 18k removals; WWFSingapore system: 95.5% detection; volunteers flagged 6,870 listings (2023); India had 60 online IWT cases last year; WP Act 2022: all CITES under Schedule IV; Maltego/WTI found “Hatha Jodi” lizard trade (9% of 1,245 posts).” Dates and sources will be annotated on slides.

# Overlap, Risks & Review  

- **Overlap with existing projects:** Our solution is not a direct copy of any current system. It combines elements (ML detection + reviewer dashboard) that some projects partly have, but none focus on India or integrate text-image specifically for Indian languages. We will transparently position this as an *adaptation/prototype*, not claiming to surpass, say, IFAW’s image portal. If a judge notes similar ML pipelines (NYU LTS), we’ll emphasize our local data focus and interface novelty.

- **Weak claims:** We must avoid overclaiming impact (e.g. “animals saved” without data). All performance stats come from cited sources. For our prototype, we will not guess accuracy – we plan to measure it. We’ll also clarify that flagged “suspicious” content is not proven illegal until verified.

- **Risks and caveats:** Data privacy and legal risk are paramount. We explicitly will not do anything unauthorized (no login to private groups, no impersonation). Traffickers could adapt (e.g. new codewords) – we’ll note that models must be continually updated. False positives risk crying wolf; we’ll tune thresholds for high precision. Judge might ask about privacy: we’ll respond that we only process publicly posted content, and do not store personal identifiers in reports.

- **Feasibility risks:** Without sufficient data, model may underperform. We mitigate by planning a focused pilot (one species/category). Also, cloud costs or computation should be small (we can use one GPU and small data). Platform cooperation: we assume public scrapes and do not rely on private APIs. 

- **Likely objections:** “Why can’t we just work with WTI/WWF instead?” We’ll say we intend to collaborate, but they currently lack such a tool. “Is AI needed?” We’ll show that manual search is too laborious (the “needle in haystack” problem) and that automation is already empowering NGOs (IFAW, WWF examples).

# Next Steps  
Unresolved issues to address: We need to define exact species/language scope for prototype (e.g. start with monitor lizards/Hindi). We need to acquire initial data – perhaps ask WTI/TRAFFIC for example posts. We should also review platform policies (e.g. Facebook terms on data use). Prioritized next steps: 
1. Data gathering strategy (scraping plan or partner data).  
2. Quick label a small dataset (100–500 posts) to start training.  
3. Rapid prototype ML model to test proof-of-concept.  
4. Outline UI workflow for analysts.  
We will document all assumptions and invite feedback from law enforcement and conservation mentors.