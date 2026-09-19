import { CaseData } from '../../types/case';
import { CASE_HAM_TU_DATA } from './case-ham-tu/caseData';
import { CASE_001_MVS } from './case-001/caseData';
import { CASE_002_DATA } from './case-002/caseData';
import { CASE_003_DATA } from './case-003/caseData';
import { CASE_004_DATA } from './case-004/caseData';

export const ALL_CASES: CaseData[] = [
  CASE_HAM_TU_DATA,
  CASE_001_MVS,
  CASE_002_DATA,
  CASE_003_DATA,
  CASE_004_DATA
];

export const getCaseById = (caseId: string): CaseData => {
  const found = ALL_CASES.find(c => c.id === caseId);
  return found || CASE_HAM_TU_DATA;
};

export const getNextCaseId = (currentCaseId: string): string | null => {
  const currentIndex = ALL_CASES.findIndex(c => c.id === currentCaseId);
  if (currentIndex >= 0 && currentIndex < ALL_CASES.length - 1) {
    return ALL_CASES[currentIndex + 1].id;
  }
  return null;
};

export {
  CASE_HAM_TU_DATA,
  CASE_001_MVS,
  CASE_002_DATA,
  CASE_003_DATA,
  CASE_004_DATA
};
