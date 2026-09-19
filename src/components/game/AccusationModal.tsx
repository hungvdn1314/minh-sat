import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { Scale, X, AlertTriangle, CheckCircle2, Stamp } from 'lucide-react';

interface AccusationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccusationModal: React.FC<AccusationModalProps> = ({ isOpen, onClose }) => {
  const { caseData, collectedEvidenceIds, submitAccusation } = useGameStore();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, optionId: string) => {
    audioManager.playSfx('click');
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const isAllAnswered = caseData.solution.questions.every(q => !!answers[q.id]);
  const isMissingEvidence = collectedEvidenceIds.length < 3;

  const handleSubmit = () => {
    if (!isAllAnswered) {
      alert('Vui lòng hoàn thành đầy đủ tất cả các điều khoản cáo trạng trước khi ký biên bản kết luận!');
      return;
    }
    audioManager.playSfx('stamp');
    submitAccusation(answers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md pointer-events-auto animate-in zoom-in-95 duration-200 select-none">
      <div className="w-full max-w-2xl dossier-sheet rounded-md border-2 border-[#b09e80] shadow-[0_35px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header: Official Judicial Letterhead */}
        <div className="p-4 sm:p-5 bg-[#d4c5a9] border-b-2 border-[#16181d]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-red-900/10 border border-red-900/30 text-red-900">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rubber-stamp stamp-red text-[10px]">CÁO TRẠNG KHỞI TỐ</span>
                <span className="text-xs font-typewriter text-[#373d4d] font-bold">{caseData.docketNumber || '#507/CSHS-ĐT'}</span>
              </div>
              <h1 className="font-dossier-serif font-black text-sm sm:text-base text-[#16181d] mt-0.5 uppercase tracking-wide">
                BẢN KẾT LUẬN ĐIỀU TRA & LỆNH BẮT KHẨN CẤP
              </h1>
            </div>
          </div>
          <button
            onClick={() => {
              audioManager.playSfx('click');
              onClose();
            }}
            className="p-1.5 rounded bg-[#ebdcc4] hover:bg-[#c9b798] text-slate-800 transition-colors cursor-pointer border border-[#b8a688]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body: Judicial Articles */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto font-typewriter text-xs text-[#1c1e24]">
          
          {/* Missing Evidence Warning Note */}
          {isMissingEvidence && (
            <div className="p-3 bg-[#ebd0a2] border-l-4 border-amber-700 rounded-r text-[#5c3a09] flex items-center gap-3 text-xs shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0" />
              <span>
                <strong>Cảnh báo điều tra viên:</strong> Bạn mới chỉ thu thập được {collectedEvidenceIds.length}/5 vật chứng. Lời cáo trạng có thể bị bẻ gãy nếu thiếu chứng cứ vật lý thuyết phục!
              </span>
            </div>
          )}

          {/* Clauses List */}
          <div className="space-y-5">
            {caseData.solution.questions.map((q, qIndex) => (
              <div key={q.id} className="space-y-2 p-3.5 rounded bg-[#f4ece0] border border-[#cfbf9e] shadow-sm">
                <div className="flex items-center justify-between border-b border-[#16181d]/10 pb-1.5 font-bold text-[#16181d]">
                  <span className="text-red-900 uppercase tracking-wider">
                    ĐIỀU {qIndex + 1}: {q.question}
                  </span>
                  <span className="text-[10px] text-[#6b5a4b] font-mono">({q.points} điểm)</span>
                </div>

                <div className="space-y-1.5 mt-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`w-full text-left p-2.5 rounded border transition-all flex items-center justify-between text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-[#181a20] text-[#f2ecdc] border-[#181a20] font-bold shadow-md'
                            : 'bg-[#faf6ee] border-[#cfbf9e] text-[#2c303c] hover:bg-[#eadecc]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full border flex items-center justify-center text-[8px] ${isSelected ? 'border-amber-400 bg-amber-500 text-slate-950 font-black' : 'border-slate-400'}`}>
                            {isSelected ? '✓' : ''}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions: Signing & Stamping */}
        <div className="p-4 bg-[#d4c5a9] border-t-2 border-[#16181d]/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[11px] font-typewriter text-[#484f63]">
            Đã xác nhận: <strong>{Object.keys(answers).length}/{caseData.solution.questions.length}</strong> điều khoản
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#cfbf9e] hover:bg-[#bfae8a] text-xs font-typewriter font-bold text-[#2a303d] transition-colors cursor-pointer border border-[#ab9b7a]"
            >
              Tiếp Tục Điều Tra
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={`px-5 py-2.5 rounded text-xs font-typewriter font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-xl ${
                isAllAnswered
                  ? 'bg-[#8a1c1c] hover:bg-[#a12222] text-[#fbf6ec] cursor-pointer hover:scale-102 border border-red-950 shadow-red-950/40'
                  : 'bg-[#9e8f77] text-[#695d4b] cursor-not-allowed border border-[#857760]'
              }`}
            >
              <Stamp className="w-4 h-4 text-amber-300" />
              <span>KÝ TÊN BẢN CÁO TRẠNG & BAN HÀNH LỆNH BẮT</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
