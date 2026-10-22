# Realism & Cinematic Pass — Change Specification

> **Target:** `/home/morty/codes/projects/3d_project`
> **Branch:** `feature/realism-pass` (pushed, baseline commit `892dcdc`)
> **Issue:** https://github.com/ali-ahadi1105/ali-ahadi-3d-portfolio/issues/1
> **Deliverable for:** Claude Code (paste §2 as the prompt)
> **Status:** spec only — no implementation committed yet. Only `package.json` / `package-lock.json` are modified (deps added, see §1).

---

## 1. Dependencies (already added to `package.json`)

```json
"@react-three/postprocessing": "^3.2.2",
"gsap": "^3.15.0",
"postprocessing": "^6.39.5",
```

Peer check (`@react-three/postprocessing@3.2.2`): requires `@react-three/fiber >= 9.7.0` (have 9.8.2), `postprocessing ^6.36.0` (have 6.39.5), `react >= 19` (have 19.3.1), `three >= 0.156.0` (have 0.186.1). ✅ compatible.

Available and confirmed present in the installed drei@10.7.9: `Environment`, `Lightformer`, `ContactShadows`, `AccumulativeShadows`, `useProgress`, `ScrollControls`, `Preload`.

---

## 2. Why it currently reads "beginner prototype"

Measured against five reference sites via Chrome DevTools Protocol (renderer string, resource waterfall, bundle text search):

| Site | Stack | Realism techniques found | Total transfer |
|---|---|---|---|
| jordan-breton.com | Vite + vanilla three | postprocessing (bloom/SSAO/tonemap), GSAP, Tweakpane, GLTF+KTX2+Draco, RGBE env, film grain + vignette | 3.1 MB |
| hubtown.co.in | Nuxt + Tailwind | postprocessing bloom, Lenis scroll, GLB+KTX2 normal maps, terrain/water shaders | 6.5 MB |
| ameen-abdullah.dev | Vue + Vite | `three.webgpu` chunk, Lenis, GSAP, Howler, WebGPU sakura loader | 3.0 MB |
| weisdevice.xyz | three + GSAP + Howler | custom GLSL shaders, simplex noise, glTF/Draco | 2.8 MB |
| bilal.show | three + spline | scroll-driven music-box narrative | 0.23 MB |

**Common denominator this repo lacks entirely:**

1. Flat `meshStandardMaterial` colours — **no normal maps, no roughness variation, no reflections**.
   Counts of flat `meshStandardMaterial` usages: `Bookshelf.tsx` 26, `DeskStation.tsx` 24, `CozySofaCat.tsx` 19, `FloorPlant.tsx` 13, `RoomEnclosure.tsx` 12.
2. No tone mapping, no exposure control → washed-out, low contrast.
3. No environment map → metal/glass surfaces dead.
4. No postprocessing → no bloom, DOF, vignette, grain, AO.
5. Hard `camera.position.lerp(target, 0.065)` in `CameraController.tsx:57-58` — constant-speed slide, no ease, no inertia.
6. Dust = raw `THREE.Points` with `pointsMaterial size={0.035}` (`SunlightParticles.tsx:40-47`) → hard-edged squares.
7. Sunbeam = plain `meshStandardMaterial` geometry (`RoomEnclosure.tsx:116+`) → reads as a solid wedge, not light.
8. `App.css` is still the **Vite starter template** (`.counter`, `.hero`, `#center`, `#next-steps`, `#docs`) — dead CSS, 184 lines.
9. No scroll narrative at all: `document.body.scrollHeight === 813` (viewport height) on every reference; this site has no scroll story.

---

## 3. File-by-file change list

### 3.1 `src/utils/pbrTextures.ts` — **NEW FILE**

Procedural PBR texture factory. Generates canvas maps at runtime, memoized at module level (generate once, reuse).

Required exports:

```ts
export interface PbrMaps {
  map: THREE.CanvasTexture        // sRGB
  normalMap: THREE.CanvasTexture  // linear, NOT sRGB
  roughnessMap: THREE.CanvasTexture // linear, NOT sRGB
}
export function heightToNormal(heightCanvas: HTMLCanvasElement, strength?: number): THREE.CanvasTexture
export function getOakWoodMaps(): PbrMaps
export function getPlasterMaps(): PbrMaps
export function getFabricMaps(): PbrMaps
export function getParquetFloorMaps(): PbrMaps
export function getBookSpineMaps(): PbrMaps
export function getCeramicMaps(): PbrMaps
```

Rules:
- Canvas size **512** (not 1024) to keep payload small.
- `map.colorSpace = THREE.SRGBColorSpace`. `normalMap` and `roughnessMap` stay `NoColorSpace`/linear — this is the single most common bug in this stack.
- `heightToNormal` = Sobel gradient over the luminance of the height canvas → RGB normal map, tileable.
- Roughness map = contrast-inverted height, remapped to a target roughness range per material.
- All maps get `wrapS/wrapT = RepeatWrapping` and a `repeat` set by the caller.
- Wood: grain lines + elliptical knots. Plaster: low-frequency fBm noise. Fabric: cross-hatch weave. Parquet: plank grid with per-plank hue jitter + grain. Book spines: coloured bands + title bars.

### 3.2 `src/utils/textures.ts` — **MODIFY**

- Keep `createSunsetTexture()` and `createRugTexture()` as-is (they already work).
- Extend the rug with a derived normal map via `heightToNormal` (weave bump) — change the `AreaRug` material to `meshPhysicalMaterial` with `map` + `normalMap` + `roughnessMap`.
- Add `createRadialSpriteTexture()` — 128×128 radial-gradient white→transparent, for dust motes and light shafts.

### 3.3 `src/components/3d/Effects.tsx` — **NEW FILE**

```tsx
export function Effects({ focusTarget }: { focusTarget: 'room' | 'monitor' | 'phone' | 'card' })
```

- `<EffectComposer multisampling={4}>` containing, in order: `SMAA`, `Bloom` (`mipmapBlur`, `luminanceThreshold ≈ 0.9`, `intensity ≈ 0.6`), `DepthOfField` (`focusDistance` animated per preset, `bokehScale ≈ 2.5`), `Vignette` (`eskil={false}`, `offset 0.28`, `darkness 0.55`), `Noise` (`opacity ≈ 0.025`, `premultiply`).
- DOF focus distance must lerp toward the active focus target, not snap.
- If `N8AO`/`SSAO` is used, verify it renders in this exact stack; otherwise rely on `ContactShadows` (drei) instead.

### 3.4 `src/components/3d/Scene3D.tsx` — **MODIFY** (heaviest change)

Current: `<Canvas shadows camera={{position:[3,3,3.8], fov:44}} dpr={[1,1.5]}>` at line 26-34, `onCreated` at 35-38, `ambientLight` 43, `directionalLight` 46-61, second `directionalLight` 63, `pointLight` 64, `SunlightParticles` 100, `CameraController` 103, `OrbitControls` 109.

Changes:

| # | Change | Where |
|---|---|---|
| a | `gl={{ antialias: false, powerPreference: 'high-performance' }}` (SMAA in composer instead) | Canvas props, line 26-34 |
| b | `dpr={[1, 2]}` | line 29 |
| c | `shadows="soft"` (PCFSoft) | line 27 |
| d | In `onCreated`: `gl.toneMapping = THREE.ACESFilmicToneMapping`, `gl.toneMappingExposure = 1.05`, assert `gl.outputColorSpace === THREE.SRGBColorSpace` | line 35-38 |
| e | Add `<Environment resolution={256}>` with `<Lightformer>` children: large warm rect key at window position (`[-4, 3.2, -0.4]`, `form="rect"`, `intensity 2.5`, `color "#ffd7a0"`, scale ~3×3.8), cool sky fill above (`color "#cfe4ff"`, intensity 0.6), warm floor bounce below (`color "#f0d9b5"`, intensity 0.4), small rim behind (`color "#ffe9c4"`, intensity 1.2) | after lights, ~line 65 |
| f | Retune key `directionalLight` intensity 2.6→~3.2, `shadow-mapSize` 1024→2048, add `shadow-normalBias={0.02}` to kill floor acne, align direction with the window | lines 46-61 |
| g | Add `<hemisphereLight args={['#dbeafe', '#c9a87a', 0.35]}>` | near line 43 |
| h | Mount `<Effects focusTarget={preset} />` inside `<Suspense>` | after line 100 |
| i | Replace `<SunlightParticles count={110}/>` with the new soft-sprite version | line 100 |
| j | Add `<ContactShadows>` under the desk/sofa/plant for grounding | near line 100 |
| k | Mount the new volumetric sunbeam mesh (replaces the geometry in `RoomEnclosure.tsx`) | near line 68 |

### 3.5 `src/components/3d/RoomEnclosure.tsx` — **MODIFY**

- Floor (line 21-28): flat `meshStandardMaterial color="#ebdcc7"` → `meshPhysicalMaterial` with parquet `map`/`normalMap`/`roughnessMap`, `repeat` ~6×6, `clearcoat 0.1`.
- Walls (line 32-47): flat `#f6f3eb` / `#f2eee4` → `meshPhysicalMaterial` with plaster maps, `roughness ~0.92`.
- Baseboards (50-56): keep colour, add `roughness 0.35` + slight `clearcoat`.
- Window trim (63-105): give the frame `metalness 0.05` + `roughness 0.25` and a subtle `clearcoat`; the glass overlay (82-91) gets `transmission 0.6` + `thickness 0.02` + `ior 1.45`.
- **Delete** the fake volumetric sunbeam block at line 116+ and replace with a reference to the new shader mesh (3.6).

### 3.6 `src/components/3d/VolumetricSunbeam.tsx` — **NEW FILE**

- Custom `shaderMaterial` (or `onBeforeCompile`) with uniforms `uTime`, `uColor`, `uIntensity`.
- Fragment shader: radial falloff × vertical falloff × animated noise (value noise, 2 octaves) so the shaft shimmers.
- `blending: THREE.AdditiveBlending`, `depthWrite: false`, `transparent: true`, `side: THREE.DoubleSide`, `toneMapped: false`.
- Geometry: a tapered box / cone frustum spanning window → floor, with a soft alpha ramp at both ends.
- Driven by `useFrame` updating `uTime`.

### 3.7 `src/components/3d/SunlightParticles.tsx` — **MODIFY**

- Replace `pointsMaterial size={0.035}` (line 40) with `pointsMaterial` using `map={radialSprite}` + `transparent` + `depthWrite: false` + `blending: AdditiveBlending` + `sizeAttenuation`.
- Keep count ≤ 200.
- Add gentle per-particle sine sway on X/Z in addition to the existing Y drift (line 19-30).
- Cache the sprite texture in module scope, not per-render.

### 3.8 `src/components/3d/CameraController.tsx` — **MODIFY**

- **Keep** `export type CameraPreset = 'room' | 'monitor' | 'phone' | 'card'` and the **exact** `PRESET_CONFIGS` targets (lines 12-33) — the existing `CameraController`, `HeaderNav`, `App.tsx`, and the three `Interactive*` components all depend on this contract.
- **Replace** `camera.position.lerp(targetPos, 0.065)` / `currentTarget.current.lerp(targetLookAt, 0.065)` (lines 57-58) with a critically-damped spring or GSAP timeline. Target: ~0.8 s ease-in-out per transition, overshoot ≤ 2%.
- Add mouse-parallax on the room view: offset ≤ 0.12 units, eased, returns to rest when the pointer is idle.
- Add a scroll-driven dolly path: the page becomes scrollable in room view, scroll moves the camera along overview → desk close → back.
- Keep `isUserInteracting` guard (lines 45-48) and the Escape/preset behaviour intact.

### 3.9 `src/components/3d/DeskStation.tsx` — **MODIFY**

24 flat `meshStandardMaterial` usages. Replace the desk top (line 25-33) with oak `meshPhysicalMaterial` + maps (`clearcoat 0.25` for a varnished top). Chair fabric → fabric maps. Metal legs → `metalness 0.85 / roughness 0.28`. Keep every geometry argument unchanged.

### 3.10 `src/components/3d/Bookshelf.tsx` — **MODIFY**

26 flat usages. Shelf carcass → oak maps. The individual book meshes → `getBookSpineMaps()` variants with per-book `map.offset`/`repeat` so no two spines repeat.

### 3.11 `src/components/3d/CozySofaCat.tsx` — **MODIFY**

19 flat usages. Upholstery → fabric maps with `roughness 0.85`. Blanket → fabric maps, warmer tint, higher `roughness 0.95`. Wood legs keep colour + `roughness 0.5`. Keep the breathing animation (lines 18-25) and the purr easter egg (27-31) untouched.

### 3.12 `src/components/3d/FloorPlant.tsx` — **MODIFY**

13 flat usages. Planter → ceramic maps (`clearcoat 0.6`). Leaves → `meshPhysicalMaterial` with `sheen 0.3`, `transmission 0.08`, `thickness 0.2` for a translucent-leaf look. Soil stays high-roughness.

### 3.13 `src/components/3d/InteractiveMonitor.tsx` / `InteractivePhone.tsx` / `InteractiveCard.tsx` — **MODIFY**

- Instant colour swap on hover (Monitor line 48-51 `color={hovered || isFocused ? '#0284c7' : '#e2e8f0'}`, Phone line 35-38, Card line 51-54) → animate the material colour in `useFrame` toward the target colour (lerp factor ~0.12). This is a visible "premium" tell in every reference site.
- Bezel/frame → `meshPhysicalMaterial` with `clearcoat 0.8`, `roughness 0.18` so the window light catches the edge.
- Keep `onClick` → `onSelectPreset` wiring and the `Html` hint labels.

### 3.14 `src/App.tsx` — **MODIFY**

- Mount a preloader: `useProgress()` from drei (scene is procedural, so no asset progress — use a short mount delay + fade) that fades out over ~600 ms.
- Add the scroll container so the room view can be scrolled (currently `overflow-hidden` on body in `index.css` line 14 — this must be relaxed in room view and re-locked when a focus panel is open).
- Keep `currentPreset` state, `Escape` handler (lines 25-34), the three focus views, and the bottom pill.

### 3.15 `src/App.css` — **MODIFY**

- **Delete the whole Vite starter template** (`.counter` 1-18, `.hero` 20-57, `#center` 59-71, `#next-steps` 73-96, `#docs` 98-105, `#next-steps ul` 107-...). None of it is imported meaningfully; `App.tsx` does not import `App.css` at all — verify and then delete the file.
- Add the loader fade + scroll-rail styles here.

### 3.16 `src/index.css` — **MODIFY**

- `body { overflow: hidden }` (line 14) currently blocks scroll — reconcile with the scroll narrative.
- Keep `.warm-sunlight` overlay but lower its opacity so it doesn't wash out the now tone-mapped render (line 36-39).

### 3.17 `README.md` — **MODIFY**

- The performance table (lines 11-17) claims "0 MB assets, ~340 KB gzip, < 400 ms" — update with the post-change measured numbers.

---

## 4. Hard constraints

1. **No external binary assets.** Everything procedural / runtime-generated. Total transfer target **< 1.5 MB** (currently ~344 KB gzip).
2. Stack stays React 19 + TypeScript + Vite + three + @react-three/fiber + @react-three/drei. Additions limited to `@react-three/postprocessing`, `postprocessing`, `gsap`.
3. `npm run build` must pass with zero TS errors; `npm run lint` (oxlint) must pass.
4. Do **not** change the visual identity — sunset warm cream room stays. Only realism and cinematic quality change.
5. Do **not** touch `src/data/resumeData.ts` content or the copy inside `src/components/ui/windows/*`.
6. Keep the interaction contract: click monitor / phone / ID card → camera zoom + panel; `Escape` → back to room; sound toggle works.

---

## 5. Acceptance criteria

| # | Criterion | How verified |
|---|---|---|
| 1 | `npm run build` succeeds, 0 TS errors | build output |
| 2 | `npm run lint` clean | lint output |
| 3 | Tone mapping, env reflections, PBR normal/roughness maps, and a postprocessing chain are **visibly** active | headless Chrome screenshot, not code reading |
| 4 | Camera transitions are eased; scroll beats move the camera | screenshot pair before/after scroll + preset clicks |
| 5 | No transferred asset > 150 KB; total transfer < 1.5 MB | `performance.getEntriesByType('resource')` sum |
| 6 | 60 FPS at 1440×900 on a mid-range laptop | frame-time sample |
| 7 | Click-to-focus, Escape, and sound toggle still work | interaction test over CDP |

---

## 6. Verification harness (ready to run)

`/home/morty/.hermes/cache/scratch/shot.py` — opens headless Chrome (already running on `http://127.0.0.1:9222`), loads the site, captures PNGs of the room view + each focus preset + the scrolled state, and prints the resource waterfall summary. Run with `SITE_URL=http://127.0.0.1:4173/ python3 shot.py <outdir>` after `npm run build && npm run preview`.

Reference measurement script: `/home/morty/.hermes/cache/scratch/probe2.py` (used to produce the table in §2).
