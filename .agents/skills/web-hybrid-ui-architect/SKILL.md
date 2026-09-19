---
name: web-hybrid-ui-architect
description: "Use this skill when designing or implementing UI/UX for web games across Phaser, Three.js, or Pixi.js. Enforces a hybrid architecture (DOM/Tailwind overlay over Canvas) for razor-sharp text, responsive scaling, touch controls, and Device Pixel Ratio (DPR) limits."
---

# Web Hybrid UI & Responsive Canvas Architecture

This skill governs how UI, text, and canvas scaling are structured in web games.

## 1. The Golden Rule: Canvas vs DOM Hybrid
- **Do NOT render complex text, dialogue boxes, or settings menus inside the Game Canvas.** Canvas text is often blurry on high-DPI screens, lacks accessible screen-reader support, and makes localization cumbersome.
- **The Hybrid Pattern:**
  - **Canvas Layer (z-index 1):** Renders game world, sprites, 3D meshes, particles, shaders.
  - **HTML/DOM Layer (z-index 10):** Renders dialogue overlays, HUD, inventories, buttons, and modal dialogs using standard CSS/Tailwind.

```html
<div id="game-container" class="relative w-screen h-screen overflow-hidden bg-black select-none">
  <!-- Layer 1: Game Canvas -->
  <div id="canvas-mount" class="absolute inset-0 z-1 pointer-events-auto"></div>
  
  <!-- Layer 2: DOM UI Overlay -->
  <div id="ui-overlay" class="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4">
    <!-- Top HUD (Pass pointer-events to interactive buttons) -->
    <header class="pointer-events-auto flex justify-between items-center">
      <div id="quest-tracker" class="bg-slate-900/80 text-white px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-medium">...</div>
      <button id="pause-btn" class="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700">⚙️</button>
    </header>

    <!-- Bottom Dialogue Box -->
    <div id="dialogue-box" class="pointer-events-auto max-w-2xl mx-auto w-full bg-slate-950/90 border border-slate-700 rounded-xl p-4 text-white shadow-2xl backdrop-blur-md hidden">
      <div id="speaker-name" class="text-amber-400 font-bold mb-1 text-sm">Character</div>
      <div id="dialogue-text" class="text-slate-100 text-base leading-relaxed">Dialogue message goes here...</div>
      <div id="dialogue-choices" class="mt-3 flex flex-col gap-2"></div>
    </div>
  </div>
</div>
```

---

## 2. DPR Clamping (Device Pixel Ratio)
Modern mobile and Retina displays have DPR of 3.0+. Rendering a 3D or 2D canvas at 3x resolution will quickly overheat the GPU and drop framerates.
- **Rule:** Always clamp DPR to a maximum of 2.0:
```typescript
export const getSafeDPR = (): number => {
  return Math.min(window.devicePixelRatio || 1, 2.0);
};
```

---

## 3. Responsive Scaling & Letterboxing
- **Phaser 3:** Use `Phaser.Scale.FIT` and `autoCenter: Phaser.Scale.CENTER_BOTH`.
- **Pixi.js v8:** Listen to `window.addEventListener('resize', ...)` and call `app.renderer.resize(window.innerWidth, window.innerHeight)`.
- **Three.js:** Update `camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height);`.
