# 🎨 Minh Sát (明察) — Game Art Bible & Diegetic UI Design System

> **Design Read:** Authentic Saigon Detective Neo-Noir. 
> Atmospheric, physical, and deeply tactile. Replaces generic web portal conventions with real physical artifacts from an investigator's desk: weathered manila police dossiers, typewriter forms with coffee stains, crimson rubber stamps, polaroid crime photos with metal paperclips, cassette audio recorders, and rain-streaked neon city lights.

---

## 1. Aesthetic Vision & Inspirations
- **Core Setting:** District 2 & Saigon River, 2:00 AM rainy night. Gritty, melancholic, bureaucratic, and grounded.
- **Visual References:**
  - *L.A. Noire & Disco Elysium:* Deep diegetic immersion, authentic character expressions, physical case folders.
  - *Return of the Obra Dinn & Case of the Golden Idol:* Rigorous forensic deduction, physical logbooks and manifests.
  - *Wong Kar-wai Cinematography:* Amber halogen tungsten lighting, Venetian blind shadows, rainy window street neon.

---

## 2. Restricted Color Palette (The Manila & Crimson Noir Palette)

| Token | Hex | Role & Usage |
| :--- | :--- | :--- |
| **`--desk-wood-deep`** | `#0a0806` | Deepest shadows, mahogany desk grain, background edge falloff. |
| **`--desk-wood-mid`** | `#1a130c` | Detective desk surface, wooden frames, shadow gradient. |
| **`--manila-paper`** | `#e3d7bf` | Primary case documents, official police forms, envelope base. |
| **`--manila-aged`** | `#cfbf9e` | Worn document edges, folds, file folder tabs, index cards. |
| **`--typewriter-ink`** | `#1c1e24` | Primary body text, police stamps, printed case records. |
| **`--forensic-crimson`**| `#991b1b` | Top Secret stamps, evidence numbers, urgent police dispatch marks. |
| **`--amber-glow`** | `#d97706` | Desk lamp cone of light, active highlights, key clues, caution. |
| **`--caution-yellow`** | `#eab308` | Police cordon tape, forensic scale markers (#12), highlights. |
| **`--rain-street-cyan`**| `#083344` | Window cold light, ambient street reflections, night contrast. |

> [!CAUTION]
> **BANNED UI SLOP:** Generic purple/violet AI gradients, pure `#000000` or `#0f172a` flat card grids, dot matrix patterns, rounded pill badges (`rounded-full` tags), and developer tech credits on game screens.

---

## 3. Typography Rules

1. **Case Titles & Solemn Markers:**
   - Font Family: `Cinzel`, `Merriweather`, `Georgia`, serif.
   - Styling: Bold or Black, uppercase, letter-spacing `0.1em` to `0.2em`.
2. **Police Documents, Transcripts & Briefings:**
   - Font Family: `JetBrains Mono`, `Courier Prime`, `Courier New`, monospace.
   - Styling: Authentic monospace typewriter feel, uneven opacity simulating ribbon ink.
3. **Handwritten Detective Annotations:**
   - Font Family: Cursive / Script / Casual Handwriting.
   - Styling: Tilted angles (`-2deg` to `3deg`), crimson or fountain pen blue ink.

---

## 4. Materiality & Diegetic UI System

Every screen component MUST correspond to a physical object on the detective's desk:
- **Title Screen:** Detective's desk with lamp, badge, coffee, and sealed Manila case file. Action is breaking the evidence tape.
- **Case Briefing:** An open police incident docket with letterhead, polaroid photo paperclipped to the margin, and an interactive micro-cassette player.
- **Crime Scene (3D):** Darkened apartment explored with physical flashlight raycaster; top-right forensic clipboard checklist.
- **Field HUD:** Leather police wallet badge, folded tactical map, leather notebook.
- **Interrogation:** Physical clipboard transcript, suspect composure meter, evidence presentation drawer.
- **Puzzle:** Desk desk-calendar formula matching physical cipher paper.
- **Accusation & Verdict:** Official indictment sheet with fountain pen signature and final police verdict stamp.
