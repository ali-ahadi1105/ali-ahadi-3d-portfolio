You are implementing a realism + cinematic upgrade pass on an existing 3D developer portfolio.

REPO: /home/morty/codes/projects/3d_project  (branch feature/realism-pass)
FULL SPEC: /home/morty/codes/projects/3d_project/docs/REALISM_PASS_SPEC.md

READ THE SPEC FIRST, then read every file it names before editing. The spec lists exact
file paths, exact line numbers, what to replace, and what to keep.

KEY FACTS (already verified, do not re-litigate):
- Stack: React 19 + TypeScript + Vite 8 + three 0.186 + @react-three/fiber 9.8 + @react-three/drei 10.7 + Tailwind v4.
- Already installed: @react-three/postprocessing 3.2.2, postprocessing 6.39.5, gsap 3.15.0.
- Confirmed available in drei 10.7.9: Environment, Lightformer, ContactShadows, AccumulativeShadows, useProgress, ScrollControls, Preload.
- The scene is 100% procedural geometry. There are NO binary assets and you must not add any.
- Total transfer must stay under 1.5 MB.
- The room is a warm sunset "golden hour" home-office. Keep that identity — only make it look real and cinematic.

THE PROBLEM (why it currently reads as a beginner prototype):
- Every surface is a flat `meshStandardMaterial` with a single colour. No normal maps, no
  roughness variation, no reflections. 12-26 flat material usages per component file.
  Bookshelf 26, DeskStation 24, CozySofaCat 19, FloorPlant 13, RoomEnclosure 12.
- No tone mapping -> washed out, low contrast.
- No environment map -> metal and glass look dead.
- No postprocessing -> no bloom, no depth of field, no vignette, no film grain, no AO.
- Camera uses constant-speed `lerp(target, 0.065)` (CameraController.tsx:57-58) -> slides, never eases.
- Dust particles are raw THREE.Points with a square sprite (SunlightParticles.tsx:40).
- The "volumetric sunbeam" is plain geometry (RoomEnclosure.tsx:116+) -> reads as a solid wedge.
- src/App.css is still the untouched Vite starter template (.counter, .hero, #center, #next-steps, #docs).

DELIVERABLE: a scene that is visibly cinematic — ACES tone mapping, real environment
reflections on metal/glass, PBR surfaces with normal + roughness maps, a postprocessing
chain, soft god-rays through the window, soft round dust motes, and an eased cinematic
camera with a scroll-driven beat.

EXECUTION ORDER (follow it):
1. Read spec + all named files.
2. Add the procedural PBR texture module (spec 3.1) first — everything else depends on it.
   Generate canvas maps at runtime, memoized at module scope. 512px canvases.
   IMPORTANT: set `map.colorSpace = THREE.SRGBColorSpace` on COLOUR maps only.
   normalMap and roughnessMap must stay linear (NoColorSpace) — getting this wrong is the
   single most common failure in this stack.
   Write a `heightToNormal(canvas, strength)` helper that Sobels the luminance of a height
   canvas into a tileable RGB normal map. Derive roughness maps from the same height.
3. Renderer pipeline + environment + lighting (spec 3.4).
4. Swap materials across RoomEnclosure, DeskStation, Bookshelf, CozySofaCat, FloorPlant,
   AreaRug (spec 3.5, 3.9-3.12). Keep every geometry argument and every animation intact.
5. Volumetric sunbeam shader (spec 3.6) + soft dust sprites (spec 3.7).
6. Postprocessing chain (spec 3.4h, 3.3) with DOF focus distance lerped toward the active preset.
7. Camera: critically-damped spring / GSAP easing, mouse parallax, scroll dolly (spec 3.8).
   CRITICAL: keep `export type CameraPreset = 'room' | 'monitor' | 'phone' | 'card'` and keep the
   exact PRESET_CONFIGS targets — HeaderNav, App.tsx and the three Interactive* components all
   depend on that contract.
8. Hover colour transitions instead of instant swaps in the three Interactive* components (spec 3.13).
9. Preloader, scroll container, App.css cleanup, index.css scroll lock, README numbers (3.14-3.17).
10. `npm run build` and `npm run lint`. Fix every error. Re-run until both are clean.

HARD CONSTRAINTS
- No binary assets, no CDN fetches for textures/models/audio.
- `npm run build` zero TS errors; `npm run lint` clean (oxlint).
- Do not change the sunset visual identity.
- Do not change the content of src/data/resumeData.ts or the copy inside src/components/ui/windows/*.
- Keep working: click monitor / phone / ID card -> camera zoom + panel opens; Escape -> back to room; sound toggle.
- Work only inside /home/morty/codes/projects/3d_project.
- Do NOT commit, do NOT push, do NOT open a PR. The reviewer handles git.
- Do not add new runtime dependencies beyond the three already in package.json.

WHEN DONE, print:
- A table of files added/changed -> one line each on what changed.
- Final `npm run build` output (bundle sizes).
- Final `npm run lint` result.
- The npm packages added.
- Any scope decision you made and why.
- Any place where the spec was wrong or ambiguous and what you did instead.
