import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import {
  X,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface TimeSlotNode {
  time: string;
  correctActor: string;
  correctAction: string;
  clueHint: string;
}

const TIMELINE_NODES: TimeSlotNode[] = [
  {
    time: '20:30',
    correctActor: 'dai',
    correctAction: 'act-dai-demand',
    clueHint: 'Khách VIP đi xe Peugeot đến, đòi lại sổ cái hối lộ trước đoàn thanh tra nhưng bị Phát cự tuyệt'
  },
  {
    time: '20:45',
    correctActor: 'chin',
    correctAction: 'act-chin-kill',
    clueHint: 'THỜI ĐIỂM TỬ VONG THỰC TẾ: Siết cổ Phát bằng dây đàn số 2, giật then cài qua khe sàn tạo phòng kín'
  },
  {
    time: '21:00',
    correctActor: 'storm',
    correctAction: 'act-storm-blackout',
    clueHint: 'Bão số 7 quét qua, cúp điện toàn Bến Hàm Tử; Đại nấp ở sân sau (ống pô xe còn nóng 52°C)'
  },
  {
    time: '21:45',
    correctActor: 'cassette',
    correctAction: 'act-fake-shout',
    clueHint: 'CHỨNG CỨ NGOẠI PHẠM GIẢ: Máy cassette Sony TCM sau bàn thờ phát tiếng quát giả đánh lừa Tuấn'
  }
];

const ACTORS = [
  { id: 'dai', name: 'Trần Quốc Đại (Thanh tra kinh tế)' },
  { id: 'chin', name: 'Thợ Chín "Kính Lão" (Nghệ nhân kim hoàn)' },
  { id: 'tuan', name: 'Lương Gia Tuấn (Con trai trưởng)' },
  { id: 'lan', name: 'Trịnh Mỹ Lan (Vợ kế)' },
  { id: 'storm', name: 'Mưa bão số 7 & Mất điện diện rộng' },
  { id: 'cassette', name: 'Băng Cassette Sony TCM hẹn giờ' }
];

const ACTIONS = [
  { id: 'act-dai-demand', label: 'Đến đòi lại sổ hối lộ bằng vàng nhưng bị nạn nhân khước từ' },
  { id: 'act-chin-kill', label: 'Siết cổ Phát bằng dây đàn số 2 & giật chốt then đồng qua khe sàn' },
  { id: 'act-storm-blackout', label: 'Mất điện toàn Bến Hàm Tử; Đại nấp sau hiên trú mưa chờ lấy sổ' },
  { id: 'act-fake-shout', label: 'Băng cước cửa kích hoạt máy cassette phát tiếng quát giả' },
  { id: 'act-tuan-steal', label: 'Lên thư phòng trộm di chúc xé góc vứt vào sọt rác' },
  { id: 'act-lan-tea', label: 'Mang bình trà sen vôi sống lên lầu 2 rồi chạy về phòng' }
];

interface TimelineDeductionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimelineDeductionModal: React.FC<TimelineDeductionModalProps> = ({
  isOpen,
  onClose
}) => {
  const { solvePuzzle } = useGameStore();

  const [assignments, setAssignments] = useState<Record<string, { actor: string; action: string }>>({
    '20:30': { actor: '', action: '' },
    '20:45': { actor: '', action: '' },
    '21:00': { actor: '', action: '' },
    '21:45': { actor: '', action: '' }
  });

  const [verificationResult, setVerificationResult] = useState<{
    tested: boolean;
    success: boolean;
    matchedCount: number;
  }>({ tested: false, success: false, matchedCount: 0 });

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleActorChange = (time: string, actorId: string) => {
    audioManager.playSfx('click');
    setAssignments(prev => ({
      ...prev,
      [time]: { ...prev[time], actor: actorId }
    }));
    setVerificationResult({ tested: false, success: false, matchedCount: 0 });
  };

  const handleActionChange = (time: string, actionId: string) => {
    audioManager.playSfx('click');
    setAssignments(prev => ({
      ...prev,
      [time]: { ...prev[time], action: actionId }
    }));
    setVerificationResult({ tested: false, success: false, matchedCount: 0 });
  };

  const handleVerify = () => {
    audioManager.playSfx('stamp');
    let matches = 0;

    TIMELINE_NODES.forEach(node => {
      const user = assignments[node.time];
      if (user.actor === node.correctActor && user.action === node.correctAction) {
        matches += 1;
      }
    });

    const isAllCorrect = matches === TIMELINE_NODES.length;
    setVerificationResult({ tested: true, success: isAllCorrect, matchedCount: matches });

    if (isAllCorrect) {
      audioManager.playSfx('puzzle_solve');
      solvePuzzle('puzzle-timeline');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 pointer-events-auto select-none">
      <div className="relative w-full max-w-4xl bg-[#14100c] border-2 border-[#8a7663] rounded shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#1e1710] border-b border-[#4a3b2c] text-amber-200">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp stamp-green text-[10px] py-0.5 px-2">
              MA TRẬN SUY LUẬN THỜI GIAN
            </span>
            <div>
              <h2 className="text-base font-bold font-dossier-serif text-amber-100 leading-none">
                Bóc Trần Lời Khai Giả & Tiếng Quát Ngoại Phạm 21h45
              </h2>
              <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-0.5">
                ĐỐI CHIẾU NHIỆT ĐỘ TỬ THI • MÁY CASSETTE • PÔ XE PEUGEOT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-black/40 hover:bg-red-950/80 text-stone-300 hover:text-red-300 border border-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeline Table Body */}
        <div className="p-6 overflow-y-auto space-y-4 bg-[#110d09] text-amber-100">
          <div className="p-3 rounded bg-amber-950/30 border border-amber-800/60 text-xs font-mono text-amber-200 leading-relaxed flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Hãy sắp xếp chính xác AI đã làm GÌ vào 4 mốc thời gian then chốt đêm 24/10 để bẻ gãy chứng cứ ngoại phạm giả và khám phá bí ẩn phòng kín!
            </span>
          </div>

          <div className="space-y-3.5">
            {TIMELINE_NODES.map((node) => {
              const userVal = assignments[node.time];
              const isMatched = verificationResult.tested &&
                userVal.actor === node.correctActor &&
                userVal.action === node.correctAction;

              return (
                <div
                  key={node.time}
                  className={`p-4 rounded border transition-all ${
                    isMatched
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
                      : verificationResult.tested
                        ? 'bg-red-950/30 border-red-800/80'
                        : 'bg-[#1a140e] border-[#4a3b2c]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#3b2b1d] pb-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded bg-stone-900 border border-amber-600/80 text-amber-400 font-mono font-bold text-sm">
                        {node.time}
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-300">
                        {node.clueHint}
                      </span>
                    </div>

                    {isMatched && (
                      <span className="rubber-stamp stamp-green text-[9px] py-0.5 px-2 shrink-0">
                        CHÍNH XÁC 100%
                      </span>
                    )}
                  </div>

                  {/* Dropdowns for Actor and Action */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-stone-400 uppercase font-bold">
                        ĐỐI TƯỢNG CÓ MẶT / CHỦ THỂ:
                      </label>
                      <select
                        value={userVal.actor}
                        onChange={(e) => handleActorChange(node.time, e.target.value)}
                        className="w-full p-2 rounded bg-stone-900 border border-stone-700 text-xs font-mono text-amber-200 focus:border-amber-500 cursor-pointer"
                      >
                        <option value="">-- CHỌN NHÂN VẬT / SỰ KIỆN --</option>
                        {ACTORS.map(a => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-stone-400 uppercase font-bold">
                        HÀNH VI THỰC TẾ DIỄN RA:
                      </label>
                      <select
                        value={userVal.action}
                        onChange={(e) => handleActionChange(node.time, e.target.value)}
                        className="w-full p-2 rounded bg-stone-900 border border-stone-700 text-xs font-mono text-amber-200 focus:border-amber-500 cursor-pointer"
                      >
                        <option value="">-- CHỌN HÀNH VI ĐÃ XÁC MINH --</option>
                        {ACTIONS.map(act => (
                          <option key={act.id} value={act.id}>{act.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification Feedback Banner */}
          {verificationResult.tested && (
            <div className={`p-4 rounded border flex items-center justify-between gap-4 animate-in fade-in duration-200 ${
              verificationResult.success
                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                : 'bg-red-950/80 border-red-600 text-red-200'
            }`}>
              <div className="flex items-center gap-3">
                {verificationResult.success ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-xs font-mono uppercase">
                    {verificationResult.success
                      ? 'SUY LUẬN HOÀN TOÀN CHÍNH XÁC! PHÁ VỠ CHỨNG CỨ NGOẠI PHẠM!'
                      : `CHƯA KHỚP TOÀN BỘ: ĐÚNG ${verificationResult.matchedCount}/4 MỐC THỜI GIAN`}
                  </h4>
                  <p className="text-xs font-typewriter mt-0.5">
                    {verificationResult.success
                      ? 'Nạn nhân đã chết lúc 20h45! Tiếng thét 21h45 chỉ là đoạn băng ghi âm phát qua máy cassette! Thợ Chín không thể chối cãi!'
                      : 'Hãy lưu ý rãnh bầm siết cổ và độ cứng tử thi chứng minh nạn nhân đã tử vong TRƯỚC khi cúp điện!'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-[#18120c] border-t border-[#3b2b1d] flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-400">
            HỆ THỐNG ĐỐI CHIẾU LOGIC HÌNH SỰ (GOLDEN IDOL DEDUCTION ENGINE)
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleVerify}
              className="px-6 py-2 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-mono text-xs uppercase tracking-wider font-bold shadow-lg border border-amber-400 cursor-pointer"
            >
              ĐỐI CHIẾU LẬP LUẬN
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-mono text-xs uppercase tracking-wider font-bold border border-stone-600 cursor-pointer"
            >
              ĐÓNG
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
