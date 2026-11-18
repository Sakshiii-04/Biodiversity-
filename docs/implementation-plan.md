# Implementation Plan
> **Project:** Illegal Wildlife Trade Detection System (name TBD)  
> **Reference:** Always read `AGENTS.md`, then `STATUS.md`, then `docs/summary.md` first. `STATUS.md` says what is done and what to take next.  
> **Audience:** This file is written for a development agent or engineer picking up the project cold. Every task has a clear owner, inputs, outputs, and acceptance criteria. Do not skip steps or reorder phases without checking dependencies.

---

## How to Read This File

Each task is structured as:
- **Goal** — what it accomplishes
- **Inputs** — files/data/APIs needed before starting
- **Steps** — exact implementation instructions
- **Outputs** — files/endpoints/results produced
- **Acceptance criteria** — how to verify it is done correctly
- **Blockers** — what must be true before this task can start

---

## Phase 1 — Competition Deliverables (Current Priority)

### Task 1.1 — Revise PPT Slide: Tech Stack & System Architecture

**Goal:** Produce a correct, finalized tech stack + architecture slide for the SUSTAINOVA 2026 PPT (Slide 4 of 6).

**Inputs:**
- `docs/summary.md` — canonical project decisions
- `docs/competition.md` — event rules and judging criteria
- `docs/tech-stack-slide.md` — previous draft (outdated, Gemini-centric)

**Key corrections to make:**
1. Remove Gemini as a core component. Gemini is an *optional demo wrapper only* — not architecture.
2. Replace AI Engine section with: XLM-RoBERTa (text) + CLIP → YOLOv8 (image)
3. Backend is Python + FastAPI (not Node/Express)
4. Show dual-modality (text + image fusion) in the architecture flow
5. Use the 5-stage pipeline: Sources → Ingestion → ML Engine → Scoring → Human Review

**Outputs:** Updated `docs/tech-stack-slide.md`

**Acceptance criteria:**
- No mention of Gemini in the core architecture (only as optional note)
- Tech stack table has 4 layers: Frontend, ML Engine, Backend, Data Sources
- Architecture section accurately reflects the 5-stage pipeline
- Speaker notes address: "Why not Gemini?" and "Why XLM-RoBERTa?"
- Slide layout fits on a single PPT slide (not more than 2 columns of content)

---

### Task 1.2 — Revise draw.io Architecture Diagram

**Goal:** Produce an accurate, presentable system architecture diagram matching the finalized pipeline.

**Inputs:** `docs/summary.md` (Section 5 — System Architecture)

**Key changes from previous diagram (`docs/system-architecture.drawio`):**
1. Stage 3 (AI Engine) must show:
   - Text path: XLM-RoBERTa classifier
   - Image path: CLIP (zero-shot) → YOLOv8 (fine-tuned, Phase 3)
   - Fusion: combine text + image scores
2. Remove Gemini references from the main pipeline
3. Add "Sources" box before Stage 2 showing: OLX, open FB groups, open Telegram, user submissions
4. Stage 5 must show both: individual case dossier + aggregate analytics dashboard

**Output:** Updated `docs/system-architecture.drawio`

**Acceptance criteria:**
- Opens correctly in draw.io (app.diagrams.net)
- 5 clearly labelled stages, colour-coded (see original for colour scheme)
- No Gemini in main flow
- Text path and image path visually distinct inside Stage 3
- Legible at standard slide width (~1600px)

---

## Phase 2 — ML Core (Post Round 1)

> **Prerequisites before starting Phase 2:** Round 1 submitted, `docs/summary.md` read in full.

### Task 2.1 — Repository Structure Setup

**Goal:** Create the backend Python project structure alongside the existing React frontend.

**Current repo state:**
```
c:\Sustainova\
├── src\                  ← React frontend (do not touch)
├── public\
├── docs\
├── package.json          ← React app
└── vite.config.ts
```

**Target state after this task:**
```
c:\Sustainova\
├── src\                  ← React frontend (unchanged)
├── backend\              ← NEW: Python FastAPI backend
│   ├── main.py                    ← creates FastAPI app, CORS, includes api.routes
│   ├── requirements.txt       ← no torch/torchvision (installed separately, see uv setup)
│   ├── requirements-dev.txt   ← ruff
│   ├── pytest.ini
│   ├── pyproject.toml         ← ruff config only
│   ├── config.py
│   ├── models\
│   │   ├── __init__.py
│   │   ├── text_classifier.py
│   │   ├── image_classifier.py
│   │   ├── fusion.py              ← score fusion + classification thresholds
│   │   └── checkpoints\           ← fine-tuned weights (gitignored)
│   ├── api\
│   │   ├── __init__.py
│   │   ├── routes.py              ← APIRouter: /health, /analyze
│   │   └── schemas.py             ← AnalysisResult Pydantic model
│   ├── data\
│   │   ├── __init__.py
│   │   ├── loader.py
│   │   └── preprocessor.py
│   ├── evaluation\
│   │   ├── __init__.py
│   │   └── metrics.py
│   ├── scripts\
│   │   ├── train_text.py
│   │   └── evaluate.py
│   └── tests\
│       ├── test_health.py
│       ├── test_schema_contract.py
│       └── fixtures\analysis_result_keys.json
├── data\                 ← NEW: training/test data (gitignored)
│   ├── raw\
│   ├── processed\
│   └── lexicons\
└── notebooks\            ← NEW: Jupyter notebooks for exploration
```

**Steps:**
1. Create `c:\Sustainova\backend\` directory structure as above
2. Create `c:\Sustainova\data\` directory structure as above
3. Create `c:\Sustainova\notebooks\` directory
4. Update `.gitignore` as listed in `AGENTS.md` rule 35 (`data/*` with `!data/lexicons/` kept, checkpoints, `Training data/`, `.env*`, caches)
5. Create `backend\requirements.txt` with contents specified in Task 2.2
6. Create `backend\config.py` with environment variable loading

**uv environment setup (run from `backend\`, PowerShell):**
```
uv venv --python 3.11
.venv\Scripts\Activate.ps1
uv pip install torch==2.5.1 torchvision==0.20.1 --index-url https://download.pytorch.org/whl/cu121
uv pip install -r requirements.txt -r requirements-dev.txt
```
`requirements-dev.txt` contains `ruff`. torch is installed first from the CUDA index because plain PyPI wheels on Windows are CPU-only.

**`backend\requirements.txt` contents:**
```
fastapi==0.115.5
uvicorn[standard]==0.32.1
pydantic==2.10.1
pydantic-settings==2.6.1
transformers==4.46.3
sentence-transformers==3.3.1
scikit-learn==1.5.2
pandas==2.2.3
numpy==1.26.4
pillow==11.0.0
python-multipart==0.0.17
httpx==0.28.0
pytest==8.3.4
python-dotenv==1.0.1
```

**`backend\config.py` contents:**
```python
from pydantic_settings import BaseSettings
from pathlib import Path

BACKEND_DIR = Path(__file__).parent
REPO_DIR = BACKEND_DIR.parent  # '/' inside Docker, so set DATA_DIR there

class Settings(BaseSettings):
    # Paths
    data_dir: Path = REPO_DIR / "data"  # override with DATA_DIR env var
    models_dir: Path = BACKEND_DIR / "models" / "checkpoints"
    
    # Text model
    text_model_name: str = "xlm-roberta-base"
    text_model_checkpoint: str = ""  # filled after fine-tuning
    
    # Image model
    clip_model_name: str = "openai/clip-vit-base-patch32"
    
    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    frontend_origin: str = "http://localhost:5173"
    
    # Optional demo key (not used in production pipeline)
    gemini_api_key: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
```

**`backend\main.py` contents:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from config import settings

app = FastAPI(title="IWT Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

app.include_router(router)
```

**Acceptance criteria:**
- The uv setup commands above complete without errors, and `python -c "import torch; print(torch.cuda.is_available())"` prints `True` on the GTX 1650 laptop
- Directory structure matches the target exactly
- `.gitignore` updated: `data/raw/`, `data/processed/`, `backend/models/checkpoints/`, `.env*`, `Training data/` are excluded; `data/lexicons/` stays tracked
- `ruff check .`, `ruff format --check .` and `pytest -q` all pass from `backend\`
- `python -c "from config import settings; print(settings.text_model_name)"` prints `xlm-roberta-base`
- `uvicorn main:app` starts (once Task 2.6 adds the routes) and `GET /health` responds

---

### Task 2.2 — Load and Validate Training Data

**Goal:** Load, clean, and validate the Mou et al. WLT-OSN dataset as the primary text training source.

**Inputs:**
- Kaggle dataset: `shrianshshrivastava/mou-et-al-wlt-osn-dataset` (file: `share_data.csv`)
- `docs/summary.md` Section 6 — dataset notes

**Critical known issues with this dataset (do not ignore):**
1. `source` column **leaks the label** — never include as a feature, ever
2. Class imbalance: ~255 positives (~3%) vs ~8,421 negatives
3. Near-duplicates exist — deduplicate before splitting
4. Positives concentrated in `seed_0` and `seed_r1` sources
5. Some label noise: "ivory" as a colour, advocacy posts about anti-poaching

**Steps:**

Create `backend/data/loader.py`:
```python
import pandas as pd
from pathlib import Path
from sklearn.model_selection import GroupShuffleSplit
import hashlib

def load_wlt_osn(csv_path: Path) -> pd.DataFrame:
    """
    Load and validate the Mou et al. WLT-OSN dataset.
    Returns a cleaned DataFrame with columns: text, label, source_group.
    NEVER includes 'source' column as a feature.
    """
    df = pd.read_csv(csv_path)
    
    # Validate expected columns
    required = {'tweet_text_cleaned', 'label', 'source'}
    assert required.issubset(df.columns), f"Missing columns: {required - set(df.columns)}"
    
    # Deduplicate by text hash
    df['_text_hash'] = df['tweet_text_cleaned'].apply(
        lambda x: hashlib.md5(str(x).encode()).hexdigest()
    )
    df = df.drop_duplicates(subset='_text_hash').drop(columns='_text_hash')
    
    # Keep only needed columns (explicitly exclude 'source' from features)
    df = df[['tweet_text_cleaned', 'label', 'source']].rename(
        columns={'tweet_text_cleaned': 'text', 'source': 'source_group'}
    )
    
    # Report class balance
    print(f"Loaded {len(df)} rows | Positives: {df['label'].sum()} ({df['label'].mean()*100:.1f}%)")
    print(f"Source groups: {df['source_group'].value_counts().to_dict()}")
    
    return df


def group_aware_split(df: pd.DataFrame, test_size: float = 0.2, seed: int = 42):
    """
    Split by source_group to prevent data leakage.
    Training set and test set will not share any source groups.
    """
    gss = GroupShuffleSplit(n_splits=1, test_size=test_size, random_state=seed)
    train_idx, test_idx = next(gss.split(df, groups=df['source_group']))
    return df.iloc[train_idx].reset_index(drop=True), df.iloc[test_idx].reset_index(drop=True)
```

**Validation notebook:** Create `notebooks/01_data_validation.ipynb` that:
1. Loads the dataset using `load_wlt_osn()`
2. Checks class balance and prints it
3. Checks for near-duplicates (cosine similarity > 0.95 on TF-IDF vectors)
4. Plots source-group distribution
5. Runs the group-aware split and verifies no source group appears in both train and test

**Acceptance criteria:**
- `load_wlt_osn()` runs without errors on the Kaggle CSV
- Deduplication reduces row count (confirms duplicates were present)
- Group-aware split: zero overlap between `train['source_group'].unique()` and `test['source_group'].unique()`
- Printed output shows ~255 positives, ~8,421 negatives
- Notebook produces a source-group distribution plot

---

### Task 2.3 — TF-IDF Baseline Text Classifier

**Goal:** Establish a reproducible TF-IDF + Logistic Regression baseline before training any transformer.

**Inputs:** Cleaned dataset from Task 2.2

**Why do this first:** Provides a sanity-check floor. If XLM-RoBERTa doesn't beat it, something is wrong.

**Create `backend/models/text_classifier.py` (baseline section):**
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import precision_score, recall_score, f1_score, average_precision_score
import numpy as np

def build_tfidf_baseline(max_features: int = 20000, C: float = 1.0) -> Pipeline:
    return Pipeline([
        ('tfidf', TfidfVectorizer(
            max_features=max_features,
            ngram_range=(1, 2),
            sublinear_tf=True,
            min_df=2
        )),
        ('clf', LogisticRegression(
            C=C,
            class_weight='balanced',  # critical for 3% positive rate
            max_iter=1000,
            solver='lbfgs'
        ))
    ])

def evaluate(y_true, y_pred, y_prob, threshold: float = 0.5) -> dict:
    y_pred_thresh = (y_prob >= threshold).astype(int)
    return {
        'precision': precision_score(y_true, y_pred_thresh, zero_division=0),
        'recall': recall_score(y_true, y_pred_thresh, zero_division=0),
        'f1': f1_score(y_true, y_pred_thresh, zero_division=0),
        'pr_auc': average_precision_score(y_true, y_prob),
    }
```

**Create `backend/scripts/train_text.py` (baseline mode):**
- Load dataset, run group-aware split
- Fit TF-IDF baseline on train, evaluate on test
- Print and save metrics to `data/processed/baseline_metrics.json`
- Target from literature: PR-AUC ~0.86–0.89 on random CV (note: held-out source performance varies significantly — `seed_r1` ~0.785, `seed_0` ~0.989, `seeds→followers` ~0.274)

**Acceptance criteria:**
- Script runs end-to-end without errors
- `baseline_metrics.json` written with keys: `precision`, `recall`, `f1`, `pr_auc`
- PR-AUC >= 0.75 on the held-out test split (lower than random CV is expected due to group-aware split)
- Metrics are reproducible (same result on two runs with same seed)

---

### Task 2.4 — XLM-RoBERTa Fine-tuning

**Goal:** Fine-tune `xlm-roberta-base` on the WLT-OSN dataset for IWT text classification.

**Inputs:** Cleaned, split dataset from Task 2.2; baseline metrics from Task 2.3

**Hardware constraint:** The local GPU has 4 GB. Full fine-tuning with AdamW is likely to run out of memory, so either freeze the embedding layer or train on Kaggle/Colab and copy the checkpoint into `backend/models/checkpoints/xlm-roberta-iwt/`. Use gradient checkpointing + small batch size either way.

**Add to `backend/models/text_classifier.py` (transformer section):**
```python
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    TrainingArguments, Trainer, EarlyStoppingCallback
)
import torch

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
MODEL_NAME = "xlm-roberta-base"

def get_tokenizer():
    return AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize_dataset(df, tokenizer, max_length: int = 128):
    """128 tokens is sufficient for social media posts; keeps GPU memory low."""
    encodings = tokenizer(
        df['text'].tolist(),
        truncation=True,
        padding='max_length',
        max_length=max_length,
        return_tensors='pt'
    )
    return encodings

def get_training_args(output_dir: str) -> TrainingArguments:
    return TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=5,
        per_device_train_batch_size=8,       # 4GB GPU constraint
        per_device_eval_batch_size=16,
        gradient_checkpointing=True,          # 4GB GPU constraint
        fp16=torch.cuda.is_available(),       # mixed precision if GPU available
        learning_rate=2e-5,
        weight_decay=0.01,
        eval_strategy='epoch',
        save_strategy='epoch',
        load_best_model_at_end=True,
        metric_for_best_model='f1',
        logging_steps=50,
        warmup_ratio=0.1,
        dataloader_num_workers=0,             # Windows compatibility
    )
```

**Class imbalance handling:** Use `class_weight='balanced'` equivalent in Trainer via a custom loss in a subclassed Trainer. Positive weight = `n_negatives / n_positives` ≈ 33.

**Acceptance criteria:**
- Fine-tuning completes without OOM errors (locally with frozen embeddings, or on Kaggle/Colab)
- Checkpoint saved to `backend/models/checkpoints/xlm-roberta-iwt/`
- F1 on held-out test set >= TF-IDF baseline F1
- PR-AUC on held-out test set >= TF-IDF baseline PR-AUC
- Evaluation metrics written to `data/processed/xlmr_metrics.json`
- Model correctly flags these test sentences (manual check):
  - `"pangolin scales for sale, dm for price, discreet shipping"` → positive
  - `"spotted a pangolin at Kanha tiger reserve, beautiful creature"` → negative

---

### Task 2.5 — CLIP Zero-Shot Image Classifier

**Goal:** Build an image classification module using CLIP that can identify suspected wildlife products without any labelled image training data.

**Why CLIP first:** No labelled IWT image dataset is available yet. CLIP's zero-shot capability lets us query images using natural language descriptions of what we're looking for.

**Create `backend/models/image_classifier.py`:**
```python
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import torch
from typing import List
import io, base64

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
CLIP_MODEL = "openai/clip-vit-base-patch32"

# Positive query prompts — describe what IWT products look like
# Update this list as new species/products are added
IWT_POSITIVE_QUERIES = [
    "pangolin scales in a bag for sale",
    "dried pangolin scales wildlife product",
    "elephant ivory tusk carved",
    "elephant ivory jewellery for sale",
    "tiger skin pelt fur",
    "tiger bone medicine",
    "rhinoceros horn carved cup",
    "monitor lizard body parts",
    "dried wildlife products packaged for sale",
    "live exotic animal in a small cage",
    "slow loris pet video",
    "wildlife product packaged for shipping",
]

# Negative query prompts — describe what legitimate content looks like
IWT_NEGATIVE_QUERIES = [
    "wildlife photographer in the field",
    "national park safari vehicle",
    "wildlife conservation documentary",
    "zoo animal in enclosure",
    "domestic pet cat dog",
    "legal antique carved bone with certificate",
]

def load_clip_model():
    model = CLIPModel.from_pretrained(CLIP_MODEL).to(DEVICE)
    processor = CLIPProcessor.from_pretrained(CLIP_MODEL)
    return model, processor

def classify_image(
    image: Image.Image,
    model: CLIPModel,
    processor: CLIPProcessor,
    threshold: float = 0.4
) -> dict:
    """
    Zero-shot classify an image for IWT content.
    Returns: confidence score (0-1), top matching query, classification.
    """
    all_queries = IWT_POSITIVE_QUERIES + IWT_NEGATIVE_QUERIES
    
    inputs = processor(
        text=all_queries,
        images=image,
        return_tensors="pt",
        padding=True
    ).to(DEVICE)
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits_per_image[0]  # shape: [num_queries]
        probs = logits.softmax(dim=0).cpu().numpy()
    
    pos_score = float(probs[:len(IWT_POSITIVE_QUERIES)].sum())
    top_idx = probs[:len(IWT_POSITIVE_QUERIES)].argmax()
    top_query = IWT_POSITIVE_QUERIES[top_idx]
    
    return {
        'image_confidence': pos_score,
        'top_matching_query': top_query,
        'image_classification': 'SUSPECTED' if pos_score >= threshold else 'UNCLEAR',
    }

def decode_base64_image(b64_string: str) -> Image.Image:
    """Utility: decode a base64 image string to a PIL Image."""
    if b64_string.startswith('data:image'):
        b64_string = b64_string.split(',')[1]
    return Image.open(io.BytesIO(base64.b64decode(b64_string))).convert('RGB')
```

**Acceptance criteria:**
- `load_clip_model()` completes on a 4 GB GPU without OOM
- `classify_image()` returns a dict with `image_confidence`, `top_matching_query`, `image_classification`
- Manual test: an image of pangolin scales scores `image_confidence > 0.4`
- Manual test: an image of a dog scores `image_confidence < 0.3`
- Processes a 512×512 image in under 3 seconds on the 4 GB GPU

---

### Task 2.6 — Score Fusion & Classification Engine

**Goal:** Combine text classifier output + image classifier output into a single unified `AnalysisResult`.

**Inputs:**
- Text confidence from XLM-RoBERTa (Task 2.4)
- Image confidence from CLIP (Task 2.5)
- CITES taxonomy DB (currently in `src/components/Detection/aiService.ts` — extract to a shared JSON)

**Output schema:** Must match `src/types/index.ts` → `AnalysisResult` type exactly (this is the contract between frontend and backend).

**Create three files** (the app itself is created in `backend/main.py`, Task 2.1):

`backend/api/schemas.py`:
```python
from pydantic import BaseModel
from typing import Optional, Literal

class AnalysisResult(BaseModel):
    """Must match src/types/index.ts AnalysisResult exactly."""
    id: str
    submissionDate: str
    inputType: Literal['screenshot', 'url']
    inputSource: str
    prediction: Literal[
        'SUSPECTED WILDLIFE TRADE',
        'NO EVIDENCE DETECTED',
        'REQUIRES MANUAL REVIEW'
    ]
    confidenceScore: float
    identifiedSpecies: list
    extractedText: str
    suspiciousKeywords: list[str]
    suspiciousIndicators: list
    explanation: str
    analysisStatus: Literal['COMPLETED', 'FLAGGED_FOR_HUMAN_ENFORCEMENT', 'CLEARED']
    threatSeverity: Literal['Critical', 'Elevated', 'Low', 'Negligible']
    imageUrl: Optional[str] = None
    isSample: bool = False
```

`backend/models/fusion.py`:
```python
def fuse_scores(text_prob: float, image_confidence: float, has_image: bool) -> float:
    """
    Combine text and image confidence scores.
    If no image, use text score only.
    Fusion: weighted average (text weight 0.6, image weight 0.4).
    """
    if not has_image:
        return text_prob
    return 0.6 * text_prob + 0.4 * image_confidence

def classify(fused_score: float) -> tuple:
    """Returns (prediction, threat_severity, analysis_status)."""
    if fused_score >= 0.75:
        return ('SUSPECTED WILDLIFE TRADE', 'Critical', 'FLAGGED_FOR_HUMAN_ENFORCEMENT')
    elif fused_score >= 0.5:
        return ('SUSPECTED WILDLIFE TRADE', 'Elevated', 'FLAGGED_FOR_HUMAN_ENFORCEMENT')
    elif fused_score >= 0.3:
        return ('REQUIRES MANUAL REVIEW', 'Elevated', 'FLAGGED_FOR_HUMAN_ENFORCEMENT')
    else:
        return ('NO EVIDENCE DETECTED', 'Negligible', 'CLEARED')
```

`backend/api/routes.py`:
```python
from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
from api.schemas import AnalysisResult
from models.fusion import fuse_scores, classify

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResult)
async def analyze(
    input_type: str = Form(...),
    text_content: Optional[str] = Form(None),
    url: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
):
    # 1. Text classification
    # 2. Image classification (if image provided)
    # 3. Score fusion
    # 4. CITES taxonomy lookup
    # 5. Build and return AnalysisResult
    pass  # implement after Tasks 2.4 and 2.5 are complete

@router.get("/health")
def health():
    return {"status": "ok"}
```

**Score fusion logic:**
- Text-only submission: use text probability directly
- Image-only submission: use CLIP confidence directly  
- Both text + image: `fused = 0.6 × text_prob + 0.4 × image_confidence`
- Classification thresholds: `>= 0.75` → Critical flag, `>= 0.5` → Elevated flag, `>= 0.3` → Manual review, `< 0.3` → Clear

**Acceptance criteria:**
- `GET /health` returns `{"status": "ok"}`
- `POST /analyze` with text input returns a valid `AnalysisResult` JSON matching the TypeScript type
- `POST /analyze` with image input returns a valid `AnalysisResult` JSON
- `POST /analyze` with both text + image uses the fusion formula
- Response time < 5 seconds for text-only, < 10 seconds for image-only on 4 GB GPU
- CORS allows requests from `http://localhost:5173`

---

### Task 2.7 — Connect React Frontend to FastAPI Backend

> **HUMAN_ONLY.** The frontend is read-only for AI agents (`AGENTS.md` rules 8–11). Agents must not perform this task. Record the needed change under "Requests for the frontend owner" in `STATUS.md` instead.

**Goal:** Replace the heuristic engine in `aiService.ts` with calls to the FastAPI backend, while keeping the heuristic as a fallback when the backend is unavailable.

**Inputs:**
- `src/components/Detection/aiService.ts` (current heuristic engine)
- FastAPI running at `http://localhost:8000` (Task 2.6)

**Changes to `aiService.ts`:**
1. Add a `BACKEND_URL` constant (default: `http://localhost:8000`, configurable via `VITE_BACKEND_URL` env var)
2. Add a `analyzeContentWithBackend()` function that POSTs to `/analyze`
3. Modify `analyzeContentWithAI()` to try the backend first, fall back to heuristic engine on failure
4. Keep all existing types and exports unchanged (no breaking changes to the React component)

**Fallback chain:**
```
analyzeContentWithAI()
  ├── try: POST to FastAPI /analyze
  │     └── success → return AnalysisResult
  └── catch: network error or timeout
        └── fall through to heuristic engine (existing code)
```

**New env variable:** Add `VITE_BACKEND_URL=http://localhost:8000` to `.env.local` (gitignored)

**Acceptance criteria:**
- With FastAPI running: detection uses the ML model, `isSample: false`
- With FastAPI stopped: detection falls back to heuristic engine automatically, no crash
- No existing UI components need changes — `AnalysisResult` type is unchanged
- `VITE_BACKEND_URL` can be overridden via `.env.local`

---

## Phase 3 — Crawler + Multilingual Expansion

> **Prerequisite:** Phase 2 complete and evaluated.

### Task 3.1 — Public Listing Crawler

**Goal:** Build an ethical, rate-limited Playwright crawler for public listings.

**Scope:** OLX India, open Facebook groups (via public search), open Telegram channels (via web.telegram.org search).

**Constraints:**
- Respect `robots.txt` on all platforms
- Rate limit: max 1 request per 3 seconds per domain
- No login, no CAPTCHA solving, no private/encrypted content
- Store only: listing text, listing URL, image URL, timestamp, platform name
- Do NOT store: seller name, seller profile URL, phone/email, any PII

**Create `backend/scripts/crawl.py`:**
- Use Playwright async API
- Accept a `--query` argument (species/keyword to search)
- Output JSONL to `data/raw/crawled_{timestamp}.jsonl`
- Each record: `{text, url, image_url, platform, crawled_at, query_used}`
- Skip URLs already seen (maintain a local `data/raw/seen_urls.txt` dedup set)

**Acceptance criteria:**
- Crawl completes for a given query without errors
- Output JSONL is valid (parse with `json.loads()` per line)
- No PII fields in output
- Rate limiting: logs show no more than 1 req/3s per domain
- `robots.txt` check: script refuses to crawl disallowed paths

---

### Task 3.2 — Add Hindi/Hinglish Codeword Dataset

**Goal:** Extend the taxonomy database and text classifier with India-specific codewords.

**Inputs:** `src/components/Detection/aiService.ts` (existing keyword DB), `docs/summary.md` Section 6 (Stringham species dataset)

**Steps:**
1. Create `data/lexicons/india_codewords.json` with structure:
```json
{
  "hathajodi": {"species": "Indian Monitor Lizard", "scientific": "Varanus bengalensis", "language": "Hindi", "cites": "Appendix II"},
  "khurpa": {"species": "Pangolin scales (slang)", "scientific": "Manis crassicaudata", "language": "Hindi/Hinglish", "cites": "Appendix I"},
  "safed sona": {"species": "Elephant ivory ('white gold')", "scientific": "Elephas maximus", "language": "Hindi", "cites": "Appendix I"}
}
```
2. Load `data/lexicons/india_codewords.json` in `backend/models/text_classifier.py` as an additional feature layer
3. Extend `IWT_POSITIVE_QUERIES` in `image_classifier.py` with Hindi descriptions (translated) for CLIP

**Acceptance criteria:**
- `"hathajodi for sale dm me"` → positive classification (text model)
- `"safed sona available contact telegram"` → positive classification (text model)
- `india_codewords.json` has at least 10 entries with species, scientific name, language, CITES appendix

---

### Task 3.3 — YOLOv8 Fine-tuning (when labelled image data available)

**Goal:** Fine-tune YOLOv8 for precise bounding-box detection of IWT products (replaces CLIP zero-shot when enough data exists).

**Prerequisite:** At least 500 labelled images (bounding box annotations) across target species products.

**Data format:** YOLO format — one `.txt` per image, one line per bounding box: `class_id x_center y_center width height` (normalized 0–1).

**Target classes:**
```
0: pangolin_scales
1: elephant_ivory_raw
2: elephant_ivory_carved
3: tiger_skin
4: rhinoceros_horn
5: live_exotic_bird_caged
6: monitor_lizard_parts
7: suspicious_packaging
```

**Training command:**
```bash
yolo train model=yolov8s.pt data=data/yolo/iwt.yaml epochs=50 imgsz=640 batch=8 device=0
```

**`data/yolo/iwt.yaml`:**
```yaml
path: ../data/yolo
train: images/train
val: images/val
nc: 8
names: [pangolin_scales, elephant_ivory_raw, elephant_ivory_carved, tiger_skin, rhinoceros_horn, live_exotic_bird_caged, monitor_lizard_parts, suspicious_packaging]
```

**Acceptance criteria:**
- Training completes on 4 GB GPU without OOM (use `imgsz=640`, `batch=8`)
- mAP@0.5 >= 0.60 on validation set
- Replace CLIP in `image_classifier.py` with YOLOv8 when this threshold is met
- Checkpoint saved to `backend/models/checkpoints/yolov8-iwt/`

---

## Phase 4 — Open Release & Pilot

### Task 4.1 — Docker Containerization

**Goal:** Package backend as a Docker container for reproducible deployment.

**Create `backend/Dockerfile`:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv
COPY requirements.txt .
RUN uv pip install --system torch==2.5.1 torchvision==0.20.1 --index-url https://download.pytorch.org/whl/cpu \
 && uv pip install --system -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Create `docker-compose.yml` at repo root:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
      - ./backend/models/checkpoints:/app/models/checkpoints
    environment:
      - DATA_DIR=/app/data
      - TEXT_MODEL_CHECKPOINT=/app/models/checkpoints/xlm-roberta-iwt
  frontend:
    image: node:20-alpine
    working_dir: /app
    volumes:
      - .:/app
    command: sh -c "npm install && npm run dev -- --host"
    ports:
      - "5173:5173"
    environment:
      - VITE_BACKEND_URL=http://backend:8000
```

**Acceptance criteria:**
- `docker-compose up` starts both services without errors
- Frontend at `http://localhost:5173` connects to backend at `http://backend:8000`
- Detection works end-to-end in the containerized environment

---

### Task 4.2 — Evaluation Report Generation

**Goal:** Produce a reproducible, honest evaluation report for NGO/WCCB audiences.

**Create `backend/evaluation/metrics.py` and `backend/scripts/evaluate.py`:**

Report must include:
- Precision, Recall, F1 on held-out test set (group-aware split)
- Precision-Recall curve (saved as `data/processed/pr_curve.png`)
- Confusion matrix
- Per-source-group breakdown (expected: `seed_r1` and `seeds→followers` will be harder)
- Failure mode analysis: 10 worst false positives, 10 worst false negatives with explanation
- Statement: "These results were obtained on a held-out test set. No test data was used in training or model selection."

**Acceptance criteria:**
- Report generated as `data/processed/evaluation_report.md`
- PR curve image saved and embedded in report
- All metrics are reproducible (same values on two runs)
- Failure mode section present with at least 5 false positives and 5 false negatives

---

## Appendix A — Key Contracts

### A1 — AnalysisResult Type (must never change without updating both sides)

Frontend definition: `src/types/index.ts`  
Backend definition: `backend/api/schemas.py` → `AnalysisResult` Pydantic model  
These must stay in sync. If you change one, change the other in the same commit.  
**Label note:** prediction labels follow `docs/summary.md` (`SUSPECTED WILDLIFE TRADE` / `REQUIRES MANUAL REVIEW` / `NO EVIDENCE DETECTED`) and never say "illegal". Verify the literal strings against `src/types/index.ts` and `aiService.ts` and update the frontend in the same commit if they differ.

### A2 — API Endpoints

| Method | Path | Input | Output |
|---|---|---|---|
| `GET` | `/health` | — | `{"status": "ok"}` |
| `POST` | `/analyze` | `multipart/form-data`: `input_type`, `text_content?`, `url?`, `image?` | `AnalysisResult` JSON |

### A3 — Classification Thresholds

| Fused Score | Prediction | Threat Severity |
|---|---|---|
| >= 0.75 | SUSPECTED WILDLIFE TRADE | Critical |
| >= 0.50 | SUSPECTED WILDLIFE TRADE | Elevated |
| >= 0.30 | REQUIRES MANUAL REVIEW | Elevated |
| < 0.30 | NO EVIDENCE DETECTED | Negligible |

### A4 — Score Fusion Formula

`fused_score = 0.6 × text_probability + 0.4 × image_confidence`  
If no image: `fused_score = text_probability`  
If no text: `fused_score = image_confidence`

---

## Appendix B — Do Not Do List

- ❌ Do not use the `source` column in `share_data.csv` as a model feature (label leakage)
- ❌ Do not store seller PII in any database or output file
- ❌ Do not auto-send reports without investigator approval
- ❌ Do not scrape private/encrypted channels (WhatsApp, private Telegram groups)
- ❌ Do not label any listing as "illegal" — only "suspected"
- ❌ Do not use Gemini API as the core detection engine (only optional demo wrapper)
- ❌ Do not break the `AnalysisResult` type contract without updating both frontend and backend
- ❌ Do not commit raw training data to git (`data/` is gitignored)
- ❌ Do not remove the heuristic fallback engine from `aiService.ts` — it must remain as the offline fallback
- ❌ Do not edit anything under `src/`, `public/` or other frontend files (agents: read-only)
- ❌ Do not use pip; use uv (see `AGENTS.md` rule 23)
