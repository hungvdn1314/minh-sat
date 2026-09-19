---
name: mystery-narrative-architect
description: "Use this skill when designing, structuring, or writing detective, mystery, puzzle-investigation, and visual novel game narratives. Enforces fair-play whodunit rules, puzzle dependency graphs (PDG), the three-clue rule, suspect information asymmetry matrices, and Saigon Neo-Noir atmosphere."
---

# Mystery Narrative Architecture & Game Design Workflow

This skill instructs agents and narrative designers on authoring professional, airtight mystery game storylines, interrogation dialogue trees, and deductive gameplay loops.

---

## 1. Core Philosophy: The Fair-Play Whodunit Standard

Every detective case MUST adhere to the **Fair-Play Whodunit Doctrine** (adapted from Ronald Knox's Decalogue):
1. **Equal Ground:** The player and the detective start on identical informational footing. Every clue, motive, and physical constraint necessary to deduce the culprit MUST be observable by the player *before* the final Accusation Phase.
2. **Zero Supernatural / Random Tricks:** Locked-room puzzles, alibis, and causes of death must have rational mechanical, physical, or chemical explanations.
3. **No 11th-Hour Culprits:** The true culprit must be introduced in the early/mid stages of the case, never spawned out of nowhere at the climax.
4. **Distinguish Objective Truth from Subjective Testimony:** Physical forensic evidence never lies; suspects almost always lie (or misremember).

---

## 2. The 5 Core Frameworks for Mystery Game Design

### Framework A: Backward Design & Puzzle Dependency Graph (PDG)
Never design a mystery case chronologically forward. Always design **strictly backward**:

```
[1. The Ground Truth]  --->  [2. Tampering & Staging]  --->  [3. Residual Evidence]  --->  [4. Puzzle Dependency Graph]
(Who, how, when, why)       (What killer manipulated)        (What killer missed)         (The player's DAG)
```

1. **The Ground Truth:** Define exact reality first:
   - *Culprit:* Who killed whom?
   - *Time & Location:* Exact timestamp and physical mechanics.
   - *Motive:* The root driving force (greed, blackmail, self-preservation, revenge).
   - *Method:* Precise weapon, poison, or physical apparatus.
2. **Tampering & Staging:** How did the culprit attempt to disguise the crime?
   - Did they stage it as suicide, accidental fall, or robbery?
   - How did they lock the room from outside or fabricate an alibi?
3. **Residual Evidence:** What physical traces, timeline gaps, or witness quirks did the killer fail to erase?
4. **Puzzle Dependency Graph (PDG):**
   - Model the case as a **Directed Acyclic Graph (DAG)** using Mermaid.
   - Nodes are Clues and Deductions; Edges are logical deductions.
   - Verify: **No dead ends, no isolated clues, no logical bottlenecks without alternative paths.**

### Framework B: The Three-Clue Rule (Justin Alexander)
For **every critical conclusion** required to solve the case, provide at least **3 independent clues** across distinct vectors:

| Vector | Type in Engine | Example Clue |
| :--- | :--- | :--- |
| **1. Forensic / Physical** | `forensic` / `object` | Chemical residue in a cup, slip-knot mechanics, scratched lock frame. |
| **2. Testimonial / Social** | `testimony` | Noise heard through a shared wall, slip of the tongue, behavioral panic. |
| **3. Documentary / Digital** | `document` / `digital` | CCTV gap log, encrypted cipher note, forged shipping manifest. |

*Rule:* If the player overlooks or misunderstands one clue, the remaining two prevent gameplay stagnation.

### Framework C: Suspect Information Asymmetry & Motivation Matrix
Every non-player character in a mystery case must be defined by this 4-parameter matrix:

```typescript
interface SuspectMatrix {
  knowledge: string;      // The actual truth the suspect witnessed or knows
  secret: string;         // Personal dirty laundry UNRELATED to murder (debts, infidelity, theft)
  motiveToLie: string;    // Why they lie to the detective (fear of arrest, losing job, mafia threats)
  pressurePoint: string;  // The specific evidence ID or contradiction that breaks their psychological defense
}
```

*Interrogation Rule:* A suspect never confesses immediately. The detective must confront their lie with their specific `pressurePoint`, inflicting psychological damage (`# composureDelta`) to unlock their true knowledge.

### Framework D: Mystery Interactive Beat Sheet (5-Beat Case Pacing)
1. **Beat 1 — The Staged Scene (Initial Misconception):** The crime scene looks deceptively like suicide or an accident. The player makes a preliminary inspection.
2. **Beat 2 — The Alibi Web (Surface Interrogations):** Suspects deliver seemingly airtight alibis. Everything seems mundane or resolved.
3. **Beat 3 — The Organic Red Herring:** A juicy, deceptive lead surfaces (e.g., heated argument over money or passion) that tempts the player to jump to conclusions, but actually uncovers a secondary secret.
4. **Beat 4 — The Breakthrough Contradiction:** A physical anomaly contradicts the staged narrative (e.g., knot tied from outside, blackout timestamp, impossible anatomy). The suicide theory collapses.
5. **Beat 5 — Psychological Climax & Accusation:** The detective confronts the suspects, breaks their composure through contradictory physical proof, unmasks the culprit, and uncovers the macro-conspiracy clue.

### Framework E: Deduction Synthesis (Clue Pairing)
True detective gameplay is NOT clicking every dialogue option until the game solves itself. The player must **synthesize** disparate facts:
- `[Fact A: Victim was heavily sedated with Zolpidem]` + `[Fact B: Rope knot required high athletic precision]` = **[Deduction: Victim was murdered and hoisted by someone else]**.

---

## 3. Saigon Neo-Noir Atmosphere & Dialogue Directives

When authoring dialogue, narrative voice, and descriptive prose for the Saigon Detective setting (late 1980s – early 1990s):

### Character Voices & Dialects
1. **The Veteran Neighbor (e.g., Vũ Thanh Sơn):**
   - Laconic, disciplined, suspicious of modern post-war opportunists. Speaks with dignity, military terminology (*"kỹ thuật bện đôi"*, *"đội cứu nạn đường sông"*), drinks bitter tea, dislikes bureaucratic incompetence.
2. **The Blue-Collar Suspect (e.g., Đỗ Quang Huy):**
   - Nervous, street-smart, defensive. Uses Southern street vernacular (*"thám tử ơi"*, *"banh bóng"*, *"siết nợ"*). Vacillates between feigned ignorance and trembling panic when cornered.
3. **The Noir Detective:**
   - Observant, slightly cynical, weary, yet driven by an incorruptible sense of justice. Internal monologue focuses on sensory details: the hum of neon signs, smell of rain on asphalt, tobacco smoke, typewriter ribbon ink.

### Anti-Slop Writing Discipline
- **NEVER** use generic fantasy/sci-fi AI idioms (*"little did he know"*, *"a testament to"*, *"delve into the darkness"*).
- Keep dialogue punchy, realistic, subtext-heavy. People in distress speak in fragments, interrupt themselves, and evade direct questions.

---

## 4. Inkle Ink (`.ink`) Scripting Standards for Detective Interrogations

All dialogue scripts in `src/ink/case-xxx/` MUST use standardized Ink syntax and metadata tags:

```ink
// Example: Interrogation Knot with Composure Delta & Evidence Gate
VAR has_evd05 = false
VAR has_evd03 = false

=== huy_interview ===
# actor:Đỗ Quang Huy # emotion:Nervous # sfx:dialogue
Dạ... thám tử muốn hỏi gì về ca trực tối đó?

+ [Hỏi về sổ trực ca đêm]
    -> huy_shift_log
+ {has_evd05} [Chất vấn khoảng trống 15 phút trên băng CCTV]
    -> huy_cctv_pressure
+ {has_evd03} [Tung ra bằng chứng vết cạy ban công phía hành lang kỹ thuật]
    -> huy_breakdown
+ [Dừng thẩm vấn]
    -> END

=== huy_cctv_pressure ===
# actor:Đỗ Quang Huy # emotion:Sweating # composureDelta:-40 # sfx:dialogue
(Huy giật bắn người, bàn tay run run chùi vội mồ hôi trên cổ áo sờn)
Cái... cái đó là do đầu ghi cáp cũ quá nhiệt sập nguồn thôi anh!
-> huy_interview

=== huy_breakdown ===
# actor:Đỗ Quang Huy # emotion:Panicked # composureDelta:-60 # event:NOTE:huy_confession # sfx:evidence
(Huy khuỵu xuống, hai mắt đỏ hoe vì hoảng loạn)
Tôi van thám tử tha cho tôi! Có người đưa tôi 50 triệu tiền mặt bảo rút jack cam đúng 15 phút... Tôi không ngờ họ lên giết người!
-> huy_interview
```

### Tag Taxonomy:
- `# actor:<Name>`: Name rendered on typewriter letterhead.
- `# emotion:<Neutral | Nervous | Sweating | Panicked | Shocked | Resolute>`: Drives UI character portraits.
- `# composureDelta:<negative integer>`: Inflicts damage to the suspect's composure bar (0–100).
- `# event:<NOTE:id | UNLOCK:location_id>`: Dispatches game events to Case Notebook.
- `# sfx:<dialogue | evidence | click | page_turn>`: Triggers audio cues synchronized with text.

---

## 5. Multi-Model Collaboration Pipeline

When authoring cases with AI assistants, delegate by cognitive specialization:
1. **Claude (Sonnet / Opus):** Primary author for narrative prose, character dialogue in Vietnamese, and Noir flavor text.
2. **GPT (GPT-4o / o-series):** Logic auditor. Provide it with the Ground Truth and suspect testimonies to probe for contradictions, plot holes, or missing evidence paths.
3. **Gemini Pro:** World Bible continuity supervisor. Supply with `docs/CONSPIRACY_ARC.md` to ensure recurring suspects, dates, and historical details stay 100% consistent across episodes.
