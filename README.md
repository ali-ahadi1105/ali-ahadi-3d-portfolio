# Ali Ahadi — 3D Cyber-Infrastructure Portfolio

High-performance, lightweight 3D Developer Portfolio tailored for **Ali Ahadi** (Backend Developer | Node.js | TypeScript | PKI Registration Authority & AI Agents).

Inspired by cyber OS terminals and spatial architectures, engineered to load instantly without heavy multi-megabyte 3D asset downloads.

---

## ⚡ Performance Highlights (Solving Sample Site Slowness)

| Metric | Reference Site | Ali Ahadi Portfolio |
|---|---|---|
| **3D Asset Weight** | ~35 MB GLTF Room & Textures | **0 MB** (100% Procedural WebGL Geometries) |
| **Audio Weight** | ~5 MB MP3 Files | **0 KB** (Web Audio API Synthesizer) |
| **Gzipped Bundle** | ~40 MB total download | **~340 KB total gzip** |
| **Initial Load Time** | 5s – 15s | **< 400ms** |
| **GPU Utilization** | High constant load | Optimized camera & geometry instancing |

---

## 🚀 Room & Interactive Features

1. **Sunset Minimalist Developer Room (Light Cozy Theme):**
   - **Sunset Window View**: Large window with outdoor sunset panorama (gradient twilight sky, glowing sun horizon, mountain silhouettes).
   - **Cozy Armchair & Blanket**: Upholstered chair with tapered wooden legs and draped warm throw blanket.
   - **Sleeping Cat (Animated)**: Orange tabby cat curled up asleep on the armchair with gentle breathing motion. Clicking the cat triggers a realistic purr sound easter egg!
   - **Patterned Area Rug**: Decorative woven carpet under the desk and sofa.
   - **Standing Wooden Bookshelf**: 4-tier bookshelf filled with engineering books (Distributed Systems, Go, Clean Architecture, Linux, PKI), trinkets, and potted cactus.
   - **Tall Floor Plant**: Large potted Monstera deliciosa in ceramic planter near the window.
   - **Programmer Desk Station**: Light oak desk with white legs, ergonomic chair, steaming coffee mug, desk lamp, and mini server NAS.

2. **Core Interactive Desk Elements:**
   - **Workstation Monitor**: Ultrawide display. Clicking zooms camera to screen and opens tabs:
     - `01 Experience` (Part Software Group - PKI Registration Authority, 7k-9k daily users)
     - `02 Architecture` (Interactive simulation of PKI & Redis Staging Flow)
     - `03 Skills Matrix` (Node.js, TypeScript, Redis, Mocha, Go)
     - `04 AI Agents & MCP` (Google ADK & Model Context Protocol)
     - `05 Bash Terminal` (Interactive shell with `whoami`, `skills`, `pki-status`, `sudo hire ali`)
   - **Smartphone**: Modern smartphone with glowing screen. Clicking zooms camera to mobile interface with direct call, email, LinkedIn, GitHub, and instant message dispatcher.
   - **Developer ID Card & Notebook**: Developer badge & notes. Clicking zooms camera to profile card with bio, education (Khayyam Univ 2021), languages, interests, and PDF resume print.

3. **Performance:**
   - 100% Procedural Three.js geometries: Zero heavy GLTF downloads!
   - Web Audio API Sound Effects: Zero external audio files!
   - Total bundle: ~344 KB gzipped. Instant load under 400ms.

---

## 🛠️ Stack

- **Framework**: React 19 + TypeScript + Vite
- **3D Engine**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Styling**: Tailwind CSS v4
- **Animation & FX**: Canvas Confetti, Web Audio API Synthesizer
- **Icons**: Lucide Icons

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
