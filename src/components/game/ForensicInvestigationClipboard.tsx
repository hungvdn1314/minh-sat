import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import {
  ClipboardCheck,
  ChevronUp,
  ChevronDown,
  Lock,
  Clock,
  Crosshair,
  KeyRound
} from 'lucide-react';

export interface DeadlockClueRequirement {
  label: string;
  evidenceId?: string;
  puzzleId?: string;
}

export interface DeadlockInquiry {
  id: string;
  code: string;
  title: string;
  question: string;
  icon: 'locked-room' | 'timeline' | 'weapon' | 'gold';
  associatedEvidenceIds: string[];
  associatedPuzzleId?: string;
  clues: DeadlockClueRequirement[];
}

export const CASE_HAM_TU_DEADLOCKS: DeadlockInquiry[] = [
  {
    id: 'deadlock-locked-room',
    code: 'TRỌNG ĐIỂM #01',
    title: 'Cơ Chế Khóa Cửa Phòng Kín',
    question: 'Then cài cửa lim dày 5cm khóa chặt từ bên trong khi nạn nhân đã chết. Làm thế nào hung thủ khóa then cài từ ngoài hành lang?',
    icon: 'locked-room',
    associatedEvidenceIds: ['EVD-HT-02'],
    associatedPuzzleId: 'puzzle-cord-physics',
    clues: [
      {
        label: 'Mẩu chỉ sáp vàng & khe hở then cửa (EVD-HT-02)',
        evidenceId: 'EVD-HT-02'
      },
      {
        label: 'Thực nghiệm vật lý: Rút dây luồn chốt then cài',
        puzzleId: 'puzzle-cord-physics'
      }
    ]
  },
  {
    id: 'deadlock-timeline',
    code: 'TRỌNG ĐIỂM #02',
    title: 'Thời Điểm Tử Vong & Ngoại Phạm 21h45',
    question: 'Nạn nhân tắt thở từ 20h45 trong lúc mất điện. Tại sao ấm trà sen vẫn nóng ấm lúc 22h35 và có tiếng Phát quát tháo lúc 21h45?',
    icon: 'timeline',
    associatedEvidenceIds: ['EVD-HT-04', 'EVD-HT-05'],
    associatedPuzzleId: 'puzzle-timeline',
    clues: [
      {
        label: 'Ấm trà 2 đáy giữ nhiệt & thuốc kích tim (EVD-HT-04)',
        evidenceId: 'EVD-HT-04'
      },
      {
        label: 'Băng cassette Sony đứt dây ghi âm tiếng quát (EVD-HT-05)',
        evidenceId: 'EVD-HT-05'
      },
      {
        label: 'Ma trận đối chiếu chuỗi thời gian tử vong 20h45',
        puzzleId: 'puzzle-timeline'
      }
    ]
  },
  {
    id: 'deadlock-weapon',
    code: 'TRỌNG ĐIỂM #03',
    title: 'Hung Khí Rãnh Siết Cổ Kép',
    question: 'Vết bầm tím 0.8mm khía xoắn kép và cặn tinh thể nhựa thông trên cổ tử thi trùng khớp với hung khí gì trong tiệm?',
    icon: 'weapon',
    associatedEvidenceIds: ['EVD-HT-01', 'EVD-HT-06'],
    associatedPuzzleId: 'puzzle-microscope',
    clues: [
      {
        label: 'Rãnh siết xoắn kép trên cổ nạn nhân (EVD-HT-01)',
        evidenceId: 'EVD-HT-01'
      },
      {
        label: 'Dây đàn violon số 2 bằng ruột cừu bọc bạc (EVD-HT-06)',
        evidenceId: 'EVD-HT-06'
      },
      {
        label: 'Giám định vi thể kính hiển vi quang học 40x',
        puzzleId: 'puzzle-microscope'
      }
    ]
  },
  {
    id: 'deadlock-motive',
    code: 'TRỌNG ĐIỂM #04',
    title: 'Bàn Cờ Ngà Voi & 100 Lượng Vàng',
    question: '100 lượng vàng lá Kim Thành biến mất. Vì sao quân Hắc Tướng trên bàn cờ bị cưa đôi và manh mối cất giấu ở đâu?',
    icon: 'gold',
    associatedEvidenceIds: ['EVD-HT-03', 'EVD-HT-08', 'EVD-HT-09'],
    associatedPuzzleId: 'puzzle-trigrams',
    clues: [
      {
        label: 'Quân cờ Hắc Tướng bị cưa rỗng ruột (EVD-HT-03)',
        evidenceId: 'EVD-HT-03'
      },
      {
        label: 'Thẻ gỗ Tiệm Vàng Vĩnh Hương & Mảnh Bát Quái (EVD-HT-08)',
        evidenceId: 'EVD-HT-08'
      },
      {
        label: 'Giải mã hộp mật mã Bát Quái Càn Khảm Cấn Chấn',
        puzzleId: 'puzzle-trigrams'
      }
    ]
  }
];

interface ForensicInvestigationClipboardProps {
  onOpenPuzzle?: (puzzleId: string) => void;
  onOpenEvidence?: (evidenceId: string) => void;
}

export const ForensicInvestigationClipboard: React.FC<ForensicInvestigationClipboardProps> = ({
  onOpenPuzzle,
  onOpenEvidence
}) => {
  const { collectedEvidenceIds, solvedPuzzleIds } = useGameStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDeadlockId, setActiveDeadlockId] = useState<string | null>(CASE_HAM_TU_DEADLOCKS[0].id);

  const getDeadlockStatus = (deadlock: DeadlockInquiry) => {
    const isPuzzleSolved = deadlock.associatedPuzzleId
      ? solvedPuzzleIds.includes(deadlock.associatedPuzzleId)
      : false;
    const evidenceFoundCount = deadlock.associatedEvidenceIds.filter(id =>
      collectedEvidenceIds.includes(id)
    ).length;

    const isFullySolved = isPuzzleSolved || evidenceFoundCount === deadlock.associatedEvidenceIds.length;
    const isPartiallyInvestigated = evidenceFoundCount > 0 || isPuzzleSolved;

    return {
      isFullySolved,
      isPartiallyInvestigated,
      evidenceFoundCount,
      totalEvidence: deadlock.associatedEvidenceIds.length
    };
  };

  const solvedCount = CASE_HAM_TU_DEADLOCKS.filter(d => getDeadlockStatus(d).isFullySolved).length;

  const handleToggle = () => {
    audioManager.playSfx('page_turn');
    setIsOpen(prev => !prev);
  };

  const getIcon = (type: DeadlockInquiry['icon']) => {
    switch (type) {
      case 'locked-room': return <Lock className="w-4 h-4 text-amber-400" />;
      case 'timeline': return <Clock className="w-4 h-4 text-sky-400" />;
      case 'weapon': return <Crosshair className="w-4 h-4 text-red-400" />;
      case 'gold': return <KeyRound className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="absolute bottom-4 left-4 z-30 pointer-events-auto select-none max-w-sm sm:max-w-md w-full">
      {/* 1. Folded State: Pinned Diegetic Clipboard Tab */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="group relative px-4 py-2.5 rounded-sm bg-[#1e150d] hover:bg-[#2c1e13] border-2 border-[#5c4632] shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3 text-xs font-typewriter transition-all cursor-pointer hover:-translate-y-0.5"
          title="Mở Bảng Kẹp Hồ Sơ Điều Tra Hiện Trường"
        >
          {/* Miniature Metal Spring Clip Visual */}
          <div className="absolute -top-2 left-6 w-12 h-3.5 bg-gradient-to-b from-stone-400 to-stone-600 rounded-t-xs border border-stone-300 shadow-sm" />

          <div className="flex items-center gap-2.5">
            <ClipboardCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-left">
              <div className="text-[9px] font-mono font-black text-amber-500/90 uppercase tracking-wider">
                HỒ SƠ KHÁM NGHIỆM #905
              </div>
              <div className="text-xs font-dossier-serif font-bold text-[#f5ebd7]">
                4 Trọng Điểm Phá Án
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`rubber-stamp text-[9px] py-0.5 px-2 font-black ${
              solvedCount === 4
                ? 'stamp-green'
                : solvedCount > 0
                  ? 'stamp-amber'
                  : 'stamp-red'
            }`}>
              {solvedCount}/4 ĐÃ BẺ GÃY
            </span>
            <ChevronUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>
      )}

      {/* 2. Expanded State: Full Wooden Forensic Clipboard Sheet */}
      {isOpen && (
        <div className="forensic-clipboard relative p-4 pt-8 rounded-md shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-3 duration-200">
          {/* Heavy Metal Top Spring Clip */}
          <div className="forensic-clipboard-clip cursor-pointer" onClick={handleToggle} />

          {/* Top Clipboard Docket Header */}
          <div className="border-b border-[#5c4632] pb-2.5 mb-3 flex items-start justify-between">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                CÔNG AN TP. HỒ CHÍ MINH • ĐỘI TRỌNG ÁN QUẬN 5
              </div>
              <h2 className="text-sm font-bold font-dossier-serif uppercase tracking-wider text-[#f5ebd7]">
                Biên Bản Trọng Điểm Khám Nghiệm #905
              </h2>
            </div>

            <button
              onClick={handleToggle}
              className="p-1 rounded bg-black/40 hover:bg-red-950/80 text-stone-300 hover:text-red-300 border border-stone-700 transition-colors cursor-pointer"
              title="Thu gọn bảng kẹp hồ sơ"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Deadlock Accordion Cards List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-typewriter text-xs">
            {CASE_HAM_TU_DEADLOCKS.map((deadlock) => {
              const status = getDeadlockStatus(deadlock);
              const isSelected = activeDeadlockId === deadlock.id;

              return (
                <div
                  key={deadlock.id}
                  className={`rounded border transition-all ${
                    status.isFullySolved
                      ? 'bg-[#141e17] border-emerald-700/80 shadow-inner'
                      : isSelected
                        ? 'bg-[#221810] border-amber-600 shadow-md'
                        : 'bg-[#18120b] border-[#423120] hover:border-[#63482e]'
                  }`}
                >
                  {/* Deadlock Card Header */}
                  <div
                    onClick={() => {
                      audioManager.playSfx('click');
                      setActiveDeadlockId(isSelected ? null : deadlock.id);
                    }}
                    className="p-2.5 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded bg-black/50 border border-stone-700/80 shrink-0">
                        {getIcon(deadlock.icon)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-mono text-amber-400/90 font-bold uppercase">
                          {deadlock.code}
                        </div>
                        <h3 className="text-xs font-bold font-dossier-serif text-[#f2ecdc] truncate">
                          {deadlock.title}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {status.isFullySolved ? (
                        <span className="rubber-stamp stamp-green text-[8px] py-0.2 px-1.5 font-bold">
                          ĐÃ BẺ GÃY
                        </span>
                      ) : status.isPartiallyInvestigated ? (
                        <span className="rubber-stamp stamp-amber text-[8px] py-0.2 px-1.5 font-bold">
                          {status.evidenceFoundCount}/{status.totalEvidence} MANH MỐI
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-stone-500 uppercase px-1.5 py-0.5 rounded bg-black/40 border border-stone-800">
                          CHƯA RÕ
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Deadlock Details */}
                  {isSelected && (
                    <div className="px-3 pb-3 pt-1 border-t border-[#3d2c1c] space-y-2.5 text-[11px] bg-black/25">
                      {/* Core Mystery Question */}
                      <div className="p-2 rounded bg-[#0c0906] border border-[#3d2c1c] text-[#cfbf9e] italic leading-relaxed">
                        <span className="font-bold text-amber-300 not-italic uppercase font-mono text-[9px] block mb-0.5">
                          Nghi vấn mấu chốt:
                        </span>
                        "{deadlock.question}"
                      </div>

                      {/* Associated Evidences & Forensic Puzzles */}
                      <div className="space-y-1.5">
                        <div className="text-[9px] font-mono font-bold text-stone-400 uppercase tracking-wider">
                          Tang chứng & Thực nghiệm liên quan:
                        </div>

                        {deadlock.clues.map((clue, idx) => {
                          const isEvidenceCollected = clue.evidenceId
                            ? collectedEvidenceIds.includes(clue.evidenceId)
                            : false;
                          const isPuzzleCompleted = clue.puzzleId
                            ? solvedPuzzleIds.includes(clue.puzzleId)
                            : false;
                          const isDone = isEvidenceCollected || isPuzzleCompleted;

                          return (
                            <div
                              key={idx}
                              className={`p-1.5 rounded border flex items-center justify-between gap-2 ${
                                isDone
                                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                                  : 'bg-[#18120c] border-[#382618] text-[#c4b5a0]'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center text-[9px] font-black shrink-0 ${
                                  isDone
                                    ? 'bg-emerald-600 border-emerald-400 text-white'
                                    : 'border-stone-600 text-transparent'
                                }`}>
                                  {isDone ? '✓' : ''}
                                </div>
                                <span className={`text-[10px] truncate ${isDone ? 'line-through text-emerald-300/80 font-medium' : ''}`}>
                                  {clue.label}
                                </span>
                              </div>

                              <div className="shrink-0 flex items-center gap-1">
                                {clue.puzzleId && onOpenPuzzle && (
                                  <button
                                    onClick={() => {
                                      audioManager.playSfx('click');
                                      onOpenPuzzle(clue.puzzleId!);
                                    }}
                                    className="px-1.5 py-0.5 rounded bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-[9px] font-mono font-bold border border-amber-600 cursor-pointer"
                                  >
                                    THỰC NGHIỆM
                                  </button>
                                )}
                                {clue.evidenceId && onOpenEvidence && isEvidenceCollected && (
                                  <button
                                    onClick={() => {
                                      audioManager.playSfx('click');
                                      onOpenEvidence(clue.evidenceId!);
                                    }}
                                    className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[9px] font-mono border border-stone-600 cursor-pointer"
                                  >
                                    HỒ SƠ
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Status Summary */}
          <div className="pt-2.5 mt-2.5 border-t border-[#5c4632] flex items-center justify-between text-[10px] font-mono text-stone-400">
            <span className="italic">
              * Khám nghiệm dấu vết trong phòng để tích xanh trọng điểm.
            </span>
            <button
              onClick={handleToggle}
              className="text-amber-400 hover:text-amber-300 font-bold uppercase cursor-pointer"
            >
              [THU GỌN]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
