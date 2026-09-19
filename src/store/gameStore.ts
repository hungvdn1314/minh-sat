import { create } from 'zustand';
import { CASE_HAM_TU_DATA, getCaseById, getNextCaseId } from '../data/cases';
import { CaseData, GameSaveState } from '../types/case';

export type GameMode = 'title' | 'briefing' | 'map' | 'location' | 'accusation' | 'result';

export type InspectablePropId = 'ivory-chess' | 'double-bottom-teapot' | 'door-latch' | null;

interface GameState {
  caseData: CaseData;
  gameMode: GameMode;
  unlockedCaseIds: string[];
  currentLocationId: string;
  unlockedLocationIds: string[];
  collectedEvidenceIds: string[];
  unlockedTestimonyKeys: string[]; // e.g. "char-son:2"
  solvedPuzzleIds: string[];
  notebookNotes: string[];

  // UI state
  isNotebookOpen: boolean;
  activeCharacterId: string | null;
  activeEvidenceId: string | null;
  activePuzzleId: string | null;
  activeInspectablePropId: InspectablePropId;
  userAnswers: Record<string, string>;
  finalScore: number;
  finalGrade: 'S' | 'A' | 'B' | 'C' | 'F' | null;
  hasFoundHiddenObjective: boolean;

  // Actions
  setGameMode: (mode: GameMode) => void;
  selectCase: (caseId: string) => void;
  moveToLocation: (locationId: string) => void;
  collectEvidence: (evidenceId: string) => void;
  unlockTestimony: (characterId: string, level: number) => void;
  solvePuzzle: (puzzleId: string) => void;
  openNotebook: (open: boolean) => void;
  setActiveCharacter: (characterId: string | null) => void;
  setActiveEvidence: (evidenceId: string | null) => void;
  setActivePuzzle: (puzzleId: string | null) => void;
  setActiveInspectableProp: (propId: InspectablePropId) => void;
  submitAccusation: (answers: Record<string, string>) => void;
  resetGame: () => void;
  loadSaveState: (saved: GameSaveState) => void;
  exportSaveState: () => GameSaveState;
}

export const useGameStore = create<GameState>((set, get) => ({
  caseData: CASE_HAM_TU_DATA,
  gameMode: 'title',
  unlockedCaseIds: ['case-ham-tu', 'case-001'],
  currentLocationId: 'loc-hamtu-floor2',
  unlockedLocationIds: ['loc-hamtu-floor2', 'loc-hamtu-floor1', 'loc-hamtu-ground'],
  collectedEvidenceIds: [],
  unlockedTestimonyKeys: ['char-chin:1', 'char-tuan:1', 'char-lan:1', 'char-dai:1'],
  solvedPuzzleIds: [],
  notebookNotes: ['24/10: Tiếp nhận thụ lý kỳ án phòng kín Tiệm Kim Hoàn Vạn Lợi (#905/CSHS-ĐT)'],

  isNotebookOpen: false,
  activeCharacterId: null,
  activeEvidenceId: null,
  activePuzzleId: null,
  activeInspectablePropId: null,
  userAnswers: {},
  finalScore: 0,
  finalGrade: null,
  hasFoundHiddenObjective: false,

  setGameMode: (mode) => set({ gameMode: mode }),

  selectCase: (caseId: string) => {
    const newCase = getCaseById(caseId);
    const initialLoc = newCase.locations[0]?.id || '';
    const unlockedLocs = newCase.locations.filter(l => l.isUnlocked).map(l => l.id);
    const initialTestimonies = newCase.characters.flatMap(c =>
      c.testimonies.filter(t => t.level === 1).map(t => `${c.id}:${t.level}`)
    );

    set({
      caseData: newCase,
      gameMode: 'briefing',
      currentLocationId: initialLoc,
      unlockedLocationIds: unlockedLocs.length > 0 ? unlockedLocs : [initialLoc],
      collectedEvidenceIds: [],
      unlockedTestimonyKeys: initialTestimonies,
      solvedPuzzleIds: [],
      notebookNotes: [`Tiếp nhận thụ lý hồ sơ: ${newCase.title} (#${newCase.docketNumber || newCase.id})`],
      isNotebookOpen: false,
      activeCharacterId: null,
      activeEvidenceId: null,
      activePuzzleId: null,
      userAnswers: {},
      finalScore: 0,
      finalGrade: null,
      hasFoundHiddenObjective: false
    });
  },

  moveToLocation: (locationId) => set({
    currentLocationId: locationId,
    gameMode: 'location',
    activeCharacterId: null,
    activeEvidenceId: null,
    activePuzzleId: null
  }),

  collectEvidence: (evidenceId) => {
    const { collectedEvidenceIds, caseData, unlockedTestimonyKeys, notebookNotes } = get();
    if (collectedEvidenceIds.includes(evidenceId)) return;

    const newEvidenceList = [...collectedEvidenceIds, evidenceId];
    const foundEv = caseData.evidence.find(e => e.id === evidenceId);
    const newNotes = foundEv 
      ? [...notebookNotes, `Thu thập: ${foundEv.name} - ${foundEv.description}`]
      : notebookNotes;

    // Check unlocking testimonies for characters
    const newUnlockedKeys = [...unlockedTestimonyKeys];
    caseData.characters.forEach(char => {
      char.testimonies.forEach(t => {
        if (t.unlockCondition === evidenceId) {
          const key = `${char.id}:${t.level}`;
          if (!newUnlockedKeys.includes(key)) {
            newUnlockedKeys.push(key);
            newNotes.push(`Manh mối mới: Mở khóa lời khai cấp ${t.level} của ${char.name}`);
          }
        }
      });
    });

    const isHiddenObjFound = caseData.hiddenObjective
      ? caseData.hiddenObjective.requiredClues.every(id => newEvidenceList.includes(id))
      : newEvidenceList.includes('EVD-12');

    set({
      collectedEvidenceIds: newEvidenceList,
      unlockedTestimonyKeys: newUnlockedKeys,
      notebookNotes: newNotes,
      hasFoundHiddenObjective: isHiddenObjFound
    });
  },

  unlockTestimony: (characterId, level) => {
    const key = `${characterId}:${level}`;
    const { unlockedTestimonyKeys } = get();
    if (!unlockedTestimonyKeys.includes(key)) {
      set({ unlockedTestimonyKeys: [...unlockedTestimonyKeys, key] });
    }
  },

  solvePuzzle: (puzzleId) => {
    const { solvedPuzzleIds, collectEvidence, notebookNotes } = get();
    if (solvedPuzzleIds.includes(puzzleId)) return;

    let solvedNote = 'Đã giải mã thành công câu đố thực nghiệm.';

    if (puzzleId === 'cipher-paper') {
      collectEvidence('EVD-12');
      solvedNote = 'Giải mã thành công: NJOI QIBU → MINH PHAT (Dịch lùi 1 ký tự)';
    } else if (puzzleId === 'puzzle-microscope') {
      collectEvidence('EVD-HT-06');
      solvedNote = 'Giám định vi vết: Rãnh siết 0.8mm và cặn nhựa thông trùng khớp 100% dây cước đàn Tỳ bà số 2!';
    } else if (puzzleId === 'puzzle-trigrams') {
      collectEvidence('EVD-HT-14');
      solvedNote = 'Mở khóa Bát Quái: Bật mở ngăn bí mật chứa cuộn vi phim Microfilm của Người Giữ Sổ!';
    } else if (puzzleId === 'puzzle-cord-physics') {
      collectEvidence('EVD-HT-02');
      solvedNote = 'Thực nghiệm vật lý: Chứng minh thủ phạm dùng chỉ sáp giật rơi then đồng từ ngoài khe cửa!';
    } else if (puzzleId === 'puzzle-timeline') {
      solvedNote = 'Ma trận thời gian: Bác bỏ hoàn toàn bằng chứng ngoại phạm và vạch trần tiếng quát ghi âm lúc 21h45!';
    }

    set({
      solvedPuzzleIds: [...solvedPuzzleIds, puzzleId],
      activePuzzleId: null,
      notebookNotes: [...notebookNotes, solvedNote]
    });
  },

  openNotebook: (open) => set({ isNotebookOpen: open }),
  setActiveCharacter: (characterId) => set({ activeCharacterId: characterId }),
  setActiveEvidence: (evidenceId) => set({ activeEvidenceId: evidenceId }),
  setActivePuzzle: (puzzleId) => set({ activePuzzleId: puzzleId }),
  setActiveInspectableProp: (propId) => set({ activeInspectablePropId: propId }),

  submitAccusation: (answers) => {
    const { caseData, collectedEvidenceIds, unlockedCaseIds } = get();
    let score = 0;

    caseData.solution.questions.forEach(q => {
      const selectedOptionId = answers[q.id];
      const option = q.options.find(o => o.id === selectedOptionId);
      if (option?.isCorrect) {
        score += q.points;
      }
    });

    // Grade calculation
    let grade: 'S' | 'A' | 'B' | 'C' | 'F' = 'F';
    if (score >= 90) grade = 'S';
    else if (score >= 70) grade = 'A';
    else if (score >= 50) grade = 'B';
    else if (score >= 30) grade = 'C';
    else grade = 'F';

    const hasHidden = caseData.hiddenObjective
      ? caseData.hiddenObjective.requiredClues.every(id => collectedEvidenceIds.includes(id))
      : collectedEvidenceIds.includes('EVD-12');

    // Unlock next case if Grade S or A
    let nextUnlockedCaseIds = [...unlockedCaseIds];
    if (grade === 'S' || grade === 'A') {
      const nextCaseId = getNextCaseId(caseData.id);
      if (nextCaseId && !nextUnlockedCaseIds.includes(nextCaseId)) {
        nextUnlockedCaseIds.push(nextCaseId);
      }
    }

    set({
      userAnswers: answers,
      finalScore: score,
      finalGrade: grade,
      hasFoundHiddenObjective: hasHidden,
      unlockedCaseIds: nextUnlockedCaseIds,
      activeCharacterId: null,
      activeEvidenceId: null,
      activePuzzleId: null,
      gameMode: 'result'
    });
  },

  resetGame: () => {
    const { caseData } = get();
    const initialLoc = caseData.locations[0]?.id || 'loc-apt507';
    const unlockedLocs = caseData.locations.filter(l => l.isUnlocked).map(l => l.id);
    const initialTestimonies = caseData.characters.flatMap(c =>
      c.testimonies.filter(t => t.level === 1).map(t => `${c.id}:${t.level}`)
    );

    set({
      gameMode: 'title',
      currentLocationId: initialLoc,
      unlockedLocationIds: unlockedLocs.length > 0 ? unlockedLocs : [initialLoc],
      collectedEvidenceIds: [],
      unlockedTestimonyKeys: initialTestimonies,
      solvedPuzzleIds: [],
      notebookNotes: [`Tiếp nhận vụ án: ${caseData.title} (#${caseData.docketNumber || caseData.id})`],
      isNotebookOpen: false,
      activeCharacterId: null,
      activeEvidenceId: null,
      activePuzzleId: null,
      userAnswers: {},
      finalScore: 0,
      finalGrade: null,
      hasFoundHiddenObjective: false
    });
  },

  loadSaveState: (saved) => {
    const loadedCase = saved.caseId ? getCaseById(saved.caseId) : get().caseData;
    const unlockedCases = saved.unlockedCaseIds || get().unlockedCaseIds;
    set({
      caseData: loadedCase,
      unlockedCaseIds: unlockedCases,
      currentLocationId: saved.currentLocationId,
      unlockedLocationIds: saved.unlockedLocationIds,
      collectedEvidenceIds: saved.collectedEvidenceIds,
      unlockedTestimonyKeys: saved.unlockedTestimonyKeys,
      solvedPuzzleIds: saved.solvedPuzzleIds,
      notebookNotes: saved.notebookNotes,
      gameMode: 'location'
    });
  },

  exportSaveState: (): GameSaveState => {
    const state = get();
    return {
      version: 1,
      timestamp: Date.now(),
      slotId: 'slot-autosave',
      caseId: state.caseData.id,
      unlockedCaseIds: state.unlockedCaseIds,
      currentLocationId: state.currentLocationId,
      unlockedLocationIds: state.unlockedLocationIds,
      collectedEvidenceIds: state.collectedEvidenceIds,
      unlockedTestimonyKeys: state.unlockedTestimonyKeys,
      solvedPuzzleIds: state.solvedPuzzleIds,
      notebookNotes: state.notebookNotes
    };
  }
}));

if (typeof window !== 'undefined') {
  (window as any).__gameStore = useGameStore;
}

