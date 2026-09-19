# Saigon Detective Neo-Noir 1980s-90s Diegetic Design System Directives

When authoring, refactoring, or expanding any UI, visual screen, dialog, puzzle, or case content in the Minh Sát (明察) codebase, ALL agents and developers MUST strictly adhere to the following directives:

## 1. THE DIEGETIC GOLDEN RULE (VẬT PHẨM BÀN ĐIỀU TRA)
- **Zero Web Portal Aesthetic:** NEVER render generic SaaS dashboard cards, pure black floating empty containers, neon-glowing video game buttons, or modern rounded web pills (`rounded-full` tags, `#3b82f6` blue accents).
- **Physical Materiality:** Every screen component MUST correspond to a physical object located in an investigator's office or crime scene:
  - Documents MUST use `<DossierSheet>` (aged Manila paper `#ded3be`, stamped seals, coffee rings).
  - Suspect photos MUST use `<PolaroidCard>` (photo border, metal paperclip, typewriter caption).
  - Inspection tasks MUST use `<ForensicClipboard>` (wooden board grain, metal spring clip).
  - Sticky memos MUST use `<StickyNote>` (post-it note with red pushpin).
  - Verification & status MUST use `<RubberStamp>` (distressed ink in crimson, amber, or green).
  - Crime scene markers MUST use `<EvidenceTentMarker>` (yellow triangular tents `#01`, `#03`, `#07`, `#12`).
  - Letterheads MUST use `<PoliceLetterhead>` (official People's Police department header with docket number).

## 2. RESTRICTED COLOR PALETTE (MANILA & CRIMSON NOIR)
- **Desk Wood Deep:** `#0a0806` to `#18130d` (Mahogany table surface, shadows).
- **Manila Paper:** `#ded3be` / `#e3d7bf` (Official police forms, case dossiers).
- **Typewriter Ink:** `#1c1e24` (Dark carbon ribbon text).
- **Forensic Crimson:** `#991b1b` / `#8a1c1c` (Top Secret stamps, critical clues, red yarn).
- **Halogen Amber:** `#d97706` / `#b45309` (Desk lamp glow, active pin highlights).
- **Caution Yellow:** `#facc15` / `#ca8a04` (Evidence tent markers, police tape).
- **BANNED COLORS:** Generic AI purple/violet gradients, cyan cyberpunk HUD lines, neon green ECG medical displays.

## 3. TYPOGRAPHY HIERARCHY
- **Official Headings & Case Numbers:** `Merriweather`, `Cinzel`, `Georgia`, serif (`font-dossier-serif`).
- **Police Transcripts, Forms, Clues & Logs:** `JetBrains Mono`, `Courier New`, monospace (`font-typewriter`).
- **Notes & Annotations:** Italicized script or typewriter carbon ribbon simulation.

## 4. CRIME SCENE 3D RENDERING STANDARDS
- **Hitboxes:** Three.js hitboxes MUST be completely invisible (`opacity: 0.0`, `visible: false`). NEVER render colored glowing rectangular boxes or pulsating overlays on top of crime scene photos.
- **Evidence Discovery:** When an item is discovered, render a physical yellow `<EvidenceTentMarker>` beside the prop and tick off the item on the wooden `<ForensicClipboard>` with a red ink stamp.

## 5. CASE EXPANSION ARCHITECTURE (DATA-DRIVEN)
- To add a new case (e.g. Case 002, Case 003):
  - Do NOT modify or duplicate existing React view components.
  - ONLY add data files in `src/data/cases/case-xxx/caseData.ts` and narrative trees in `src/ink/case-xxx/testimonies.ink`.
  - The engine automatically renders the case using the unified diegetic design system.
