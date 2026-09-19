export type EvidenceType = 'forensic' | 'document' | 'object' | 'digital' | 'testimony';

export interface Evidence {
  id: string;
  name: string;
  type: EvidenceType;
  description: string;
  detail: string;
  imageUrl?: string;
  foundAt: string; // Location ID
  relatedTo: string[]; // Character IDs
  isKey: boolean;
  collectedAt?: number;
}

export interface Testimony {
  level: number;
  title: string;
  content: string;
  unlockCondition?: string; // Evidence ID or event key required
  isUnlocked: boolean;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  avatar: string;
  description: string;
  secret: string;
  alibi: string;
  isUnlocked: boolean;
  testimonies: Testimony[];
}

export interface Interaction {
  id: string;
  title: string;
  description: string;
  hotspot?: { x: number; y: number; radius?: number };
  evidenceId?: string;
  characterId?: string;
  hasPuzzle?: boolean;
}

export interface Location {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  type: 'crime_scene' | 'public' | 'restricted';
  mapPosition: { x: number; y: number };
  has3DScene: boolean;
  isUnlocked: boolean;
  unlockCondition?: string;
  interactions: Interaction[];
}

export interface TimelineEvent {
  id: string;
  time: string;
  event: string;
  source: string;
  verified: boolean;
}

export interface SolutionQuestion {
  id: string;
  question: string;
  points: number;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    partialPoints?: number;
  }[];
}

export interface Solution {
  culpritId: string;
  motive: string;
  method: string;
  keyEvidenceIds: string[];
  questions: SolutionQuestion[];
}

export interface HiddenObjective {
  id: string;
  title: string;
  description: string;
  requiredClues: string[]; // Evidence IDs required
  unlockedStory: string;
}

export interface CaseData {
  id: string;
  docketNumber?: string;
  title: string;
  subtitle: string;
  difficulty: number;
  estimatedTime: number;
  briefing: string;
  victim?: {
    name: string;
    age: number;
    role: string;
  };
  locations: Location[];
  characters: Character[];
  evidence: Evidence[];
  timeline: TimelineEvent[];
  solution: Solution;
  hiddenObjective: HiddenObjective;
}

export interface GameSaveState {
  version: number;
  timestamp: number;
  slotId: string;
  caseId: string;
  unlockedCaseIds?: string[];
  currentLocationId: string;
  unlockedLocationIds: string[];
  collectedEvidenceIds: string[];
  unlockedTestimonyKeys: string[]; // e.g. "son:1", "huy:2"
  solvedPuzzleIds: string[];
  notebookNotes: string[];
  inkStoryStateJson?: string;
  score?: number;
  grade?: 'S' | 'A' | 'B' | 'C' | 'F';
}

