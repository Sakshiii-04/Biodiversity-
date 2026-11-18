Rules for every AI coding agent working on this repository (Antigravity, Cursor, Claude Code, Copilot, Windsurf, Cline, Aider). Project: Illegal Wildlife Trade (IWT) detection system for SUSTAINOVA 2026 (SDG 15). Follow these rules exactly and in order.

1. At the start of every session, before generating or editing anything, read this file completely, then STATUS.md completely, then docs/summary.md. Read the matching task in docs/implementation-plan.md before working on it.
2. Run `git status` and `git fetch`. If the local branch is behind its remote, tell the user to pull before you continue. Do not pull, push, commit, merge or switch branches unless the user asks.
3. Work on the task the user names. If the user names none, take the first unblocked TODO in the "Next up" list in STATUS.md. Never take a task that someone else has marked IN_PROGRESS.
4. Before editing any code, claim the task in STATUS.md: set its status to IN_PROGRESS, set the owner to the user's name (check `git config user.name`, ask once if unclear) and set today's date.
5. When the task is finished and the quality gates pass, update STATUS.md: set the task to DONE with the date, list the files you created or changed, write one to three handoff lines for the next person (what to know, what is still open) and update "Next up".
6. If you stop early or get blocked, set the task to BLOCKED, or leave it IN_PROGRESS, with a note saying exactly where you stopped and why.
7. Order of authority: the user's current instruction, then this file, then the decisions log in STATUS.md, then docs/summary.md, then docs/implementation-plan.md. If two sources conflict, stop, name the conflict and ask the user. Do not guess.

8. The frontend is strictly read-only. This covers src/, public/, index.html, package.json, package-lock.json, vite.config.ts, every tsconfig file, the oxlint config and any other frontend file. Never edit, create, delete, rename, format or auto-fix anything there, even for a one-line fix, a type sync, or Task 2.7. You may read these files.
9. Do not run npm, npx, tsc, oxlint or any other command that writes into the frontend folders or node_modules.
10. If a backend task needs a frontend change, do not make it. Add a line under "Requests for the frontend owner" in STATUS.md with the exact file, the change needed and the reason, then continue with the backend work.
11. Prove the frontend stayed untouched: run `git status --porcelain -- src public index.html package.json package-lock.json vite.config.ts` at the start and at the end of every task. The two outputs must be identical.

12. You may write to backend/, data/lexicons/, notebooks/ and STATUS.md. Nothing else.
13. docs/ is read-only, except a file that the current task explicitly names as its output.
14. The folder "Training data/" is read-only and gitignored. Copy files you need into data/raw/ instead of editing them in place.
15. data/raw/, data/processed/ and backend/models/checkpoints/ are gitignored. Never track them.

16. Never label a listing as illegal. Legality cannot be decided from listing text. The only allowed predictions are "SUSPECTED WILDLIFE TRADE", "REQUIRES MANUAL REVIEW" and "NO EVIDENCE DETECTED".
17. Human review is mandatory. Never write code that auto-reports, auto-flags to law enforcement or sends notifications without a human step.
18. Never crawl, store or output seller names, account handles, phone numbers, emails or any other personal identifier.
19. In the WLT-OSN dataset (share_data.csv) the `source` column leaks the label. Never use it as a model feature. Always split with GroupShuffleSplit on source_group.
20. Phase 2 is stateless. Do not add a database, migrations, tables or sessions. POST /analyze keeps no state.
21. Before the first task that touches the API schema, complete Task 2.0 in STATUS.md: read src/types/index.ts and src/components/Detection/aiService.ts (read-only) and record the exact AnalysisResult field names and literal values, including the allowed inputType values, in the decisions log. If they differ from the labels in rule 16 or from the plan, do not change the frontend and do not silently change the backend; report the difference to the user.
22. The backend contract lives in backend/api/schemas.py and must match src/types/index.ts. Fusion: text and image gives 0.6 * text_prob + 0.4 * image_confidence, text only gives text_prob, image only gives image_confidence. Thresholds on the fused score: >= 0.75 SUSPECTED WILDLIFE TRADE, Critical, FLAGGED_FOR_HUMAN_ENFORCEMENT; >= 0.50 SUSPECTED WILDLIFE TRADE, Elevated, FLAGGED_FOR_HUMAN_ENFORCEMENT; >= 0.30 REQUIRES MANUAL REVIEW, Elevated, FLAGGED_FOR_HUMAN_ENFORCEMENT; below 0.30 NO EVIDENCE DETECTED, Negligible, CLEARED.

23. Use uv for all Python environment and package work, never pip. Python 3.11 or newer. The virtual environment lives at backend/.venv. Setup from backend/ in PowerShell: `uv venv --python 3.11`, then `.venv\Scripts\Activate.ps1`, then `uv pip install torch==2.5.1 torchvision==0.20.1 --index-url https://download.pytorch.org/whl/cu121`, then `uv pip install -r requirements.txt -r requirements-dev.txt`. Plain `pip install torch` on Windows installs a CPU-only build, so install torch first with the CUDA index.
24. requirements.txt must not list torch or torchvision. Dev-only tools such as ruff go in requirements-dev.txt.
25. Run every backend command from inside backend/. The code uses root-relative imports such as `from api.routes import router` and `from config import settings`, so running from the repo root breaks imports.
26. Every model must take its device from config.get_device(), which returns cuda when available and falls back to cpu. The environment variable DEVICE=cpu forces cpu.
27. The local GPU is a 4 GB GTX 1650. Never run full XLM-RoBERTa fine-tuning locally with AdamW unless the embedding layer is frozen. Prefer training on Kaggle or Colab and copying the checkpoint into backend/models/checkpoints/. Inference runs locally. In transformers 4.46 use `eval_strategy`, not `evaluation_strategy`.
28. Use PowerShell-compatible commands. For manual HTTP checks use `curl.exe`, not `curl`.

29. Before marking any backend task DONE, run these from backend/ with the venv active and confirm each exits with code 0 in the current session: `ruff check .`, then `ruff format --check .`, then `pytest -q`.
30. Models load lazily, inside the FastAPI lifespan or on first request, never at import time. `pytest -q` must not load model weights and must not download anything or call an external API. Mock models in unit tests and mark any real-model test with the `slow` marker.
31. The test suite must include a TestClient test that GET /health returns {"status": "ok"}, and a test that the AnalysisResult schema matches tests/fixtures/analysis_result_keys.json.
32. Never disable lint rules, add blanket `# noqa`, or skip, weaken or delete a failing test to get a pass. Fix the cause.
33. In your completion message, paste the final output lines of each gate command and of the frontend check from rule 11.
34. Never hardcode secrets or API keys. Read them from environment variables. The Gemini key is optional and demo-only; Gemini must never be the core detection engine.

35. Keep these lines in .gitignore:
```
data/*
!data/lexicons/
!data/README.md
Training data/
backend/models/checkpoints/*
.env*
!.env.example
__pycache__/
.venv/
.pytest_cache/
.ruff_cache/
.ipynb_checkpoints/
```
36. Check `git status` before proposing a commit. Stage specific files by name, never `git add -A` or `git add .`. Make sure no data, checkpoint, credential or frontend file is staged.
37. In STATUS.md keep one row per task, edit only your own task row, the "Next up" list and the log, and append to the log instead of rewriting it. This keeps merges clean when teammates and their agents work in parallel.
