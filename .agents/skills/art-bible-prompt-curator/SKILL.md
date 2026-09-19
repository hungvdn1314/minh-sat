---
name: art-bible-prompt-curator
description: "Use this skill when defining game art direction, building visual bibles, selecting restricted color palettes (Lospec), establishing texel density constraints, and crafting consistent AI generation prompts for Midjourney, Scenario, or Stable Diffusion."
---

# Art Bible & Consistent Asset Prompt Engineering

This skill ensures that all game visuals maintain unified color palettes, lighting rules, and camera perspectives.

## 1. Restricted Color Palettes (Lospec Standards)
Choose and lock 1 palette for the entire game:
- **Pico-8 (16 colors):** Best for retro pixel puzzles.
- **Endesga 32 (32 colors):** Rich, vibrant palette for top-down adventure and tilesets.
- **Sweet Pastels / Cozy Tone:** For narrative visual novels and casual board games.

---

## 2. Prompt Templates by Asset Type

### A. Isometric 3D Diorama / Puzzle Prop
```text
Isometric 3D model of [PROP_NAME, e.g. a medieval wooden chest with bronze locks], low poly style, clean geometric facets, flat cel-shaded lighting, warm ambient occlusion, vibrant solid colors, isolated on solid white background, game ready asset, no text, no shadows --no realistic textures, photorealism
```

### B. Visual Novel Character Portrait (Expression Variants)
```text
Front-facing character portrait of [CHARACTER_DESCRIPTION, e.g. a 25-year-old female detective with trenchcoat], [EXPRESSION, e.g. confident smile / shocked disbelief], clean 2D anime vector style, cell shaded, high detail lineart, clear silhouette, solid neutral background, upper body portrait --no blur, noise, realistic shading
```

### C. 2D Top-Down Sprite / Tileset Element
```text
Top-down 2D game asset of [OBJECT_NAME, e.g. stone dungeon floor switch], orthographic top view, 32x32 pixel art style, clean outline, flat lighting, transparent background, seamless tileable --no perspective, 3D render
```
