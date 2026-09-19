---
trigger: always_on
---
# Web Game Development Core Directives (Phaser / Three.js / Pixi.js)

When designing, architecting, implementing, or debugging web games for interactive, puzzle, exploration, boardgame, or visual novel genres, you MUST strictly adhere to the following directives:

## 1. ARCHITECTURE & SEPARATION OF CONCERNS
- **Model-View Decoupling:** Keep game rules, state logic, and puzzle verification headless (pure TypeScript/JS). Do not interleave game rules into render loops.
- **Hybrid UI Golden Rule:**
  - Game Canvas (z-index 1) is ONLY for rendering the game world, characters, 3D meshes, and animations.
  - DOM/HTML/Tailwind overlay (z-index 10) MUST be used for text-heavy dialogue, visual novel boxes, inventories, forms, and settings menus to ensure 100% crisp typography on all screens.

## 2. PERFORMANCE & LIFECYCLE
- **DPR Clamping:** Always cap `devicePixelRatio` to `Math.min(window.devicePixelRatio || 1, 2.0)` to protect mobile GPUs from overheating.
- **GPU Resource Disposal:** When switching scenes or unmounting components, ALWAYS explicitly call `.dispose()` or `.destroy({ children: true, texture: true })` on all geometries, materials, and textures.
- **Object Pooling:** Never allocate new Sprites or GameObjects inside `update()` or `requestAnimationFrame()`. Use Object Pools.

## 3. BROWSER AUTOPLAY & STORAGE
- **Audio Unlock:** Never attempt to play audio immediately on page load. Always gate audio behind an initial user gesture ('click' or 'touchstart') to satisfy browser Autoplay policies.
- **Persistent Storage:** Never use plain `localStorage` for primary game saves. Use IndexedDB via `localforage` or `idb` with structured multi-slot save schemas.

## 4. NARRATIVE & PUZZLE STANDARDS
- For narrative/dialogue games, use the **Inkle Ink** specification (`.ink`) integrated via `inkjs`.
- For grid-based movement or Sokoban puzzles in Phaser, use **Grid Engine** rather than free-form physics.
