
# AI Resume & Portfolio Builder — Canva-Style PRO

**Why this one?**
- 10+ Canva-inspired templates (Neo, Classic, Minimal, Professional Blue, Elegant Gray, Creative Gradient, Minimalist Outline, Vibrant Accent, Corporate Dark, Pastel)
- Modern UI (Tailwind, dark mode, glass effects), template thumbnails
- AI Tailoring (summary, bullets, keywords)
- **Mock Mode enabled by default** → works even if OpenAI credits = 0
- Local save (localStorage), PDF export, photo upload

---

## Prerequisites
- Node.js LTS (20+ recommended)
- VS Code
- (Optional) OpenAI API key for live AI

---

## Run (two terminals)

### 1) Backend
```powershell
cd server
copy .env.example .env
# If you want real AI, edit .env and set your OPENAI_API_KEY, and set MOCK_AI=false
npm install
npm run dev
```
API → http://localhost:4000  (health: `/api/health`)

### 2) Frontend
```powershell
cd ../client
copy .env.local.example .env.local
npm install
npm run dev
```
UI → http://localhost:5173

---

## Switch AI Modes
- **Mock (default)**: server/.env → `MOCK_AI=true` (no key required)
- **Live**: set `OPENAI_API_KEY=sk-...`, `MODEL=gpt-4o-mini`, `MOCK_AI=false`, then restart server.

---

## Build (optional)
- Client: `npm run build`
- Server: `npm run build` then `npm start`
