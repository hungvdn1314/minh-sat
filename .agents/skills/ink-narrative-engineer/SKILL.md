---
name: ink-narrative-engineer
description: "Use this skill when authoring branching narratives, visual novel dialogue, character interactions, quest logs, and story trees using Inkle's Ink scripting language and the inkjs web runtime."
---

# Ink Narrative Engineering Workflow

This skill instructs the agent on authoring, formatting, and integrating interactive storylines using **Ink** (`.ink`) and **`inkjs`** for web games.

## 1. Ink Scripting Syntax & Standards
Always produce valid `.ink` scripts that compile cleanly and parse in `inkjs`.

### Knot & Tag Structure
```ink
// File: story.ink
VAR player_has_key = false
VAR affection_detective = 0

=== start ===
# actor:Narrator
Đêm đó, mưa như trút nước xuống thung lũng sương mù.
# actor:Detective # emotion:Serious
Chúng ta chỉ có một cơ hội duy nhất để mở khóa cánh cổng trước khi kẻ thủ ác trốn thoát.

+ [Tìm kiếm xung quanh pho tượng]
    -> search_statue
+ [Nói chuyện thêm với Thám tử]
    -> talk_detective

=== search_statue ===
# actor:Narrator
Bạn tiến lại gần pho tượng cổ và phát hiện một chiếc chìa khóa rỉ sét kẹt trong hốc đá.
~ player_has_key = true
# event:ITEM_ACQUIRED:rusty_key
# sfx:item_pickup
Bạn đã nhận được [Chìa khóa rỉ sét]!
-> gate_interaction

=== talk_detective ===
# actor:Detective # emotion:Smile
~ affection_detective = affection_detective + 1
Cảm ơn bạn đã tin tưởng tôi. Bây giờ hãy tìm lối vào thôi!
-> gate_interaction

=== gate_interaction ===
{ player_has_key:
    # actor:Detective # emotion:Excited
    # event:PUZZLE_UNLOCKED:main_gate
    Tuyệt vời! Chiếc chìa khóa vừa khít ổ khóa!
    -> chapter_2
- else:
    # actor:Detective # emotion:Frown
    Cánh cổng vẫn đang khóa chặt. Chúng ta cần tìm chìa khóa quanh đây.
    -> start
}

=== chapter_2 ===
...
-> END
```

---

## 2. Web Runtime Integration (`inkjs`)
Connect `inkjs` to the DOM or Phaser/Pixi scene:

```typescript
import { Story } from 'inkjs';

export class NarrativeManager {
  private story: Story;

  constructor(storyJson: any) {
    this.story = new Story(storyJson);
  }

  public nextLine(): { text: string; tags: Record<string, string>; choices: string[] } | null {
    if (!this.story.canContinue) {
      return null;
    }

    const text = this.story.Continue() || '';
    const rawTags = this.story.currentTags || [];
    const tags: Record<string, string> = {};

    rawTags.forEach(tag => {
      const [key, val] = tag.split(':');
      if (key && val) tags[key.trim()] = val.trim();
    });

    const choices = this.story.currentChoices.map(c => c.text);
    return { text, tags, choices };
  }

  public makeChoice(index: number) {
    this.story.ChooseChoiceIndex(index);
  }

  public exportSaveState(): string {
    return this.story.state.toJson();
  }

  public loadSaveState(jsonString: string) {
    this.story.state.LoadJson(jsonString);
  }
}
```
