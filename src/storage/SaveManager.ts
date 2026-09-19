import localforage from 'localforage';
import { GameSaveState } from '../types/case';

// Configure IndexedDB store via localforage according to web-storage-audio-policy
const saveStore = localforage.createInstance({
  name: 'MinhSat_Game_DB',
  storeName: 'case_save_slots',
  description: 'IndexedDB persistent multi-slot storage for Minh Sát detective cases'
});

export class SaveManager {
  public static async saveGame(slotId: string, state: GameSaveState): Promise<boolean> {
    try {
      const payload: GameSaveState = {
        ...state,
        slotId,
        timestamp: Date.now()
      };
      await saveStore.setItem(slotId, payload);
      return true;
    } catch (err) {
      console.error('Failed to save game to IndexedDB:', err);
      return false;
    }
  }

  public static async loadGame(slotId: string): Promise<GameSaveState | null> {
    try {
      const data = await saveStore.getItem<GameSaveState>(slotId);
      return data || null;
    } catch (err) {
      console.error('Failed to load game from IndexedDB:', err);
      return null;
    }
  }

  public static async getAllSlots(): Promise<{ slotId: string; timestamp: number; caseId: string }[]> {
    try {
      const slots: { slotId: string; timestamp: number; caseId: string }[] = [];
      await saveStore.iterate<GameSaveState, void>((value, key) => {
        slots.push({
          slotId: key,
          timestamp: value.timestamp,
          caseId: value.caseId
        });
      });
      return slots.sort((a, b) => b.timestamp - a.timestamp);
    } catch (err) {
      console.error('Failed to enumerate save slots:', err);
      return [];
    }
  }

  public static async deleteSlot(slotId: string): Promise<boolean> {
    try {
      await saveStore.removeItem(slotId);
      return true;
    } catch (err) {
      console.error('Failed to delete save slot:', err);
      return false;
    }
  }
}
