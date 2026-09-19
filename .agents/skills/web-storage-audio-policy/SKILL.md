---
name: web-storage-audio-policy
description: "Use this skill when implementing audio systems, BGM/SFX playback, browser autoplay policy unlockers, and persistent save/load systems using IndexedDB (localforage/idb) for web games."
---

# Web Audio Autoplay Policy & Persistent Storage

This skill provides production-ready implementations for browser audio restrictions and robust save/load systems.

## 1. Browser Autoplay Policy & Audio Unlocker
Browsers (Chrome, Safari, iOS) automatically mute or suspend `AudioContext` until the user interacts with the document.

### The Gatekeeper Implementation
```typescript
export class AudioUnlocker {
  private static unlocked = false;

  public static init(onUnlocked?: () => void) {
    if (this.unlocked) return;

    const unlock = () => {
      // Resume Web Audio Context if present
      if (window.AudioContext || (window as any).webkitAudioContext) {
        const dummyCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (dummyCtx.state === 'suspended') {
          dummyCtx.resume();
        }
      }
      this.unlocked = true;
      if (onUnlocked) onUnlocked();

      // Clean up event listeners
      ['click', 'touchstart', 'keydown'].forEach(evt => 
        window.removeEventListener(evt, unlock)
      );
    };

    ['click', 'touchstart', 'keydown'].forEach(evt => 
      window.addEventListener(evt, unlock, { once: true, passive: true })
    );
  }
}
```

### Sound Management Rules
1. **Auto-mute on tab hidden:**
   ```typescript
   document.addEventListener('visibilitychange', () => {
     if (document.hidden) {
       SoundManager.muteAll();
     } else {
       SoundManager.unmuteAll();
     }
   });
   ```
2. **Audio Sprites:** Combine 20-50 short SFX into a single `.mp3` or `.webm` file to reduce HTTP request overhead on web hosting.

---

## 2. Multi-Slot Save System via IndexedDB
Do NOT rely solely on `localStorage` (limited to 5MB, vulnerable to browser cache purging). Use **`localforage`** or **`idb`** for robust IndexedDB storage.

### Save Data Schema Template
```typescript
import localforage from 'localforage';

export interface GameSaveState {
  version: number;
  timestamp: number;
  slotId: string;
  chapter: string;
  inkStoryStateJson: string; // Serialized narrative state
  puzzleState: Record<string, boolean>; // Solved puzzle flags
  inventory: string[];
  playerPosition?: { x: number; y: number; room: string };
}

export class SaveManager {
  private static store = localforage.createInstance({
    name: 'MyWebGameDB',
    storeName: 'save_slots'
  });

  public static async saveSlot(slotId: string, state: GameSaveState): Promise<void> {
    state.timestamp = Date.now();
    await this.store.setItem(slotId, state);
  }

  public static async loadSlot(slotId: string): Promise<GameSaveState | null> {
    return await this.store.getItem<GameSaveState>(slotId);
  }

  public static async listSlots(): Promise<string[]> {
    return await this.store.keys();
  }
}
```
