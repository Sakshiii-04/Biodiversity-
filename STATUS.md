# STATUS.md - shared handoff for all humans and AI agents

Read this file in full at the start of every session, after AGENTS.md. Update it at the end of every task. Last updated: 2026-11-17.

## Next up

Take the first unblocked TODO that nobody has claimed. Several lanes can run in parallel between teammates.

1. Task 2.0 - contract check against the frontend (read-only). No dependencies.
2. Task 2.1 - backend scaffold and uv environment. No dependencies (verified: `backend/` does not exist yet).
3. After 2.1: lane A text (2.2, then 2.3, then 2.4), lane B image (2.5), lane C lexicon (first part of 3.2: data/lexicons/india_codewords.json only).
4. After 2.4 and 2.5: Task 2.6 fusion and API.

## Tasks

Status values: TODO, IN_PROGRESS, DONE, BLOCKED, HUMAN_ONLY, UNKNOWN. Plan details live in docs/implementation-plan.md.

| Task | Status | Owner | Updated | Notes |
|---|---|---|---|---|
| 1.1 PPT tech stack slide | DONE | S-H-R-I-A-N-S-H | 2026-11-17 | Completed and verified in docs/tech-stack-slide.md. |
| 1.2 draw.io architecture diagram | DONE | S-H-R-I-A-N-S-H | 2026-11-17 | Completed and verified in docs/system-architecture.drawio. |
| 2.0 Check contract vs src/types/index.ts (read-only) | TODO | | | Record literals and inputType values in the decisions log. |
| 2.1 Backend scaffold, uv env, tests/config files | TODO | | | Verified: backend/ does not exist yet. |
| 2.2 Load and validate WLT-OSN | TODO | | | Needs 2.1. |
| 2.3 TF-IDF baseline | TODO | | | Needs 2.2. |
| 2.4 XLM-RoBERTa fine-tuning | TODO | | | Needs 2.3. Train on Kaggle or Colab; agent prepares script and notebook. |
| 2.5 CLIP zero-shot image classifier | TODO | | | Needs 2.1. Can run in parallel with lane A. |
| 2.6 Fusion and /analyze API | TODO | | | Needs 2.4 and 2.5. May start with stubs. |
| 2.7 Connect frontend to backend | HUMAN_ONLY | frontend owner | | Frontend is read-only for agents. Agents must not do this. |
| 3.1 Public listing crawler | TODO | | | Phase 3. Needs Phase 2 evaluated and a platform ToS review. |
| 3.2 Hindi/Hinglish codewords | TODO | | | Lexicon file can start any time. |
| 3.3 YOLOv8 fine-tuning | BLOCKED | | | Needs 500+ labelled images. |
| 4.1 Docker | TODO | | | Phase 4. |
| 4.2 Evaluation report | TODO | | | Phase 4. |

## Decisions log

Settled decisions. Do not reopen without asking the user.

1. Predictions are only SUSPECTED WILDLIFE TRADE, REQUIRES MANUAL REVIEW, NO EVIDENCE DETECTED. Never "illegal".
2. Phase 2 backend is stateless (Option A). No database until Phase 3.
3. Frontend is read-only for agents. Frontend changes go through "Requests for the frontend owner" below.
4. Package manager is uv with backend/.venv. Torch is installed first from the cu121 index and is not listed in requirements.txt.
5. Local machine is a Windows laptop with a GTX 1650 (4 GB). Inference runs locally on GPU with CPU fallback. XLM-R training happens on Kaggle or Colab, or locally only with frozen embeddings.
6. No free cloud hosting for the API is assumed (free tiers are too small or restricted). Round 2 on 26 Nov is offline, so the demo runs locally. Keep the heuristic fallback in aiService.ts.
7. Backend structure follows Task 2.1 in the plan, plus models/fusion.py, api/schemas.py, main.py, tests/, pytest.ini, pyproject.toml (ruff config), requirements-dev.txt.
8. All backend commands run from inside backend/.
9. Quality gates: ruff check, ruff format --check, pytest -q, plus the frontend-untouched check (see AGENTS.md).
10. data/raw, data/processed, backend/models/checkpoints and "Training data/" are gitignored. data/lexicons is tracked.

## Open questions

1. Do the literal labels and the inputType values in src/types/index.ts match AGENTS.md rule 22? Text-only submissions need a representation. Resolved by Task 2.0.
2. Final project name (team decision).
3. Who owns which lane? Fill the Owner column when tasks are claimed.

## Requests for the frontend owner

None yet. Add one line per request: file, change, reason, requested by, date.

## Log

Append one line per event, newest at the bottom. Format: date - person or agent - what happened.

- 2026-11-17 - Claude - Created STATUS.md and AGENTS.md; synced docs/implementation-plan.md (uv, tests, frontend read-only).
- 2026-11-17 - Antigravity - Initialized AGENTS.md and STATUS.md in root; verified Phase 1 deliverables (Tasks 1.1 & 1.2 marked DONE); verified backend/ does not exist yet (Task 2.1 ready as TODO).
