import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { getNextCaseId, getCaseById } from '../../data/cases';
import { DossierCaseSelector } from './DossierCaseSelector';
import {
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Flame,
  FolderArchive
} from 'lucide-react';

export const ResultModal: React.FC = () => {
  const {
    gameMode,
    finalScore,
    finalGrade,
    hasFoundHiddenObjective,
    caseData,
    userAnswers,
    resetGame,
    selectCase
  } = useGameStore();

  const [isCaseSelectorOpen, setIsCaseSelectorOpen] = useState<boolean>(false);

  if (gameMode !== 'result') return null;

  const nextCaseId = getNextCaseId(caseData.id);
  const nextCase = nextCaseId ? getCaseById(nextCaseId) : null;
  const isCaseSolved = finalGrade === 'S' || finalGrade === 'A';

  const gradeTitles: Record<string, string> = {
    S: 'MINH SÁT — ĐẠI THÁM TỬ HUYỀN THOẠI',
    A: 'THÁM TỬ ĐIỀU TRA XUẤT SẮC',
    B: 'PHÁ ÁN THÀNH CÔNG — CÒN SƠ HỞ NHỎ',
    C: 'SUY ĐOÁN THIẾU BẰNG CHỨNG XÁC THỰC',
    F: 'KẾT LUẬN SAI LỆCH — HUNG THỦ TẨU THOÁT',
  };

  const headlines: Record<string, string> = {
    S: `ĐẠI ÁN ${caseData.title.toUpperCase()} SÁNG TỎ: BẺ GÃY HIỆN TRƯỜNG GIẢ VÀ LẬT TẨY ĐƯỜNG DÂY TỘI PHẠM!`,
    A: `CẢNH SÁT BẮT KHẨN CẤP THỦ PHẠM VỤ ÁN ${caseData.title.toUpperCase()}!`,
    B: 'BẮT GIỮ ĐỒNG PHẠM, NHƯNG KẺ CHỦ MƯU THỰC SỰ ĐÃ KỊP TẨU TÁN DẤU VẾT TRONG ĐÊM MƯA!',
    C: 'TÒA ÁN TRẢ HỒ SƠ: CHỨNG CỨ KẾT TỘI THIẾU TÍNH THUYẾT PHỤC TRƯỚC HỘI ĐỒNG XÉT XỬ!',
    F: 'HUNG THỦ TẨU THOÁT NGOẠN MỤC: VỤ ÁN CHÍNH THỨC RƠI VÀO BẾ TẮC!',
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md pointer-events-auto animate-in zoom-in-95 duration-200 select-none overflow-y-auto">
        <div className="w-full max-w-2xl dossier-sheet rounded-md border-2 border-[#b09e80] shadow-[0_40px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
          
          {/* Newspaper Masthead */}
          <div className="p-4 sm:p-5 bg-[#d8caa7] border-b-2 border-[#16181d]/25 text-center space-y-1">
            <div className="flex items-center justify-between text-[10px] font-typewriter text-[#42495b] border-b border-[#16181d]/15 pb-1">
              <span>BÁO CÔNG AN TP. HỒ CHÍ MINH</span>
              <span>HỒ SƠ {caseData.docketNumber || `#${caseData.id}`}</span>
              <span>PHÁT HÀNH NỘI BỘ</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-dossier-serif tracking-widest text-[#16181d] pt-1 uppercase">
              BẢN TIN CHUYÊN ÁN HÌNH SỰ
            </h2>

            <div className="py-2 px-3 bg-[#e8dcc4] border border-[#c2b093] rounded my-2">
              <h1 className="text-sm sm:text-base font-bold font-dossier-serif text-red-950 uppercase leading-snug">
                "{headlines[finalGrade || 'F']}"
              </h1>
            </div>
          </div>

          {/* Detective Rating Stamp & Score Ribbon */}
          <div className="px-6 py-4 bg-[#ebdcc4] border-b border-[#16181d]/15 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded border-4 border-red-800 flex items-center justify-center text-3xl font-black font-mono text-red-800 transform -rotate-3 bg-red-800/10 shadow-inner">
                {finalGrade}
              </div>
              <div>
                <div className="rubber-stamp stamp-red text-xs">
                  {gradeTitles[finalGrade || 'F']}
                </div>
                <div className="text-xs font-typewriter text-[#3b4353] font-bold mt-1">
                  Điểm Đánh Giá Chuyên Môn: <span className="text-sm text-red-950 font-black">{finalScore}</span> / 100 Điểm
                </div>
              </div>
            </div>

            {isCaseSolved && nextCase && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="rubber-stamp stamp-green text-[9px]">ĐÃ MỞ KHÓA VỤ TIẾP THEO</span>
                <span className="text-[10px] font-mono text-amber-900 mt-1 font-bold">
                  {nextCase.docketNumber || `#${nextCase.id}`}
                </span>
              </div>
            )}
          </div>

          {/* Breakdown Body */}
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto font-typewriter text-xs text-[#1c1e24]">
            
            {/* Classified Telegram for Hidden Objective */}
            {hasFoundHiddenObjective ? (
              <div className="p-3.5 bg-[#f4e2bf] border-2 border-amber-600/80 rounded space-y-1.5 shadow-md">
                <div className="flex items-center gap-2 font-bold text-amber-950 uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>BỨC ĐIỆN MẬT MỞ KHÓA: {caseData.hiddenObjective?.title.toUpperCase() || 'MANH MỐI BÍ MẬT'}</span>
                </div>
                <p className="text-[11px] text-[#3e3427] leading-relaxed italic">
                  {caseData.hiddenObjective?.unlockedStory}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-[#ebdcc4] border border-[#c4b395] text-[11px] text-[#695d4b] italic rounded text-center">
                ⚠️ Bạn chưa tìm đủ manh mối để giải mã mục tiêu mật: {caseData.hiddenObjective?.title || 'Tổ chức Người Giữ Sổ'}.
              </div>
            )}

            {/* Forensic Deductions Check */}
            <div className="space-y-2.5 pt-2">
              <div className="font-bold text-[#16181d] uppercase tracking-wider text-[11px] border-b border-[#16181d]/10 pb-1">
                Biên Bản Đối Chiếu Bằng Chứng:
              </div>

              {caseData.solution.questions.map((q) => {
                const userOptId = userAnswers[q.id];
                const userOpt = q.options.find(o => o.id === userOptId);
                const correctOpt = q.options.find(o => o.isCorrect);
                const isCorrect = userOpt?.isCorrect;

                return (
                  <div key={q.id} className="p-3 rounded bg-[#f4ece0] border border-[#cfbf9e] space-y-1 shadow-sm">
                    <div className="flex items-center justify-between font-bold text-[#16181d]">
                      <span>{q.question}</span>
                      {isCorrect ? (
                        <span className="text-emerald-800 flex items-center gap-1 font-mono font-black">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> +{q.points}đ
                        </span>
                      ) : (
                        <span className="text-red-800 flex items-center gap-1 font-mono font-black">
                          <XCircle className="w-3.5 h-3.5 text-red-700" /> +0đ
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#474e61]">
                      <span>Lựa chọn của thám tử: </span>
                      <span className={isCorrect ? 'text-emerald-950 font-bold' : 'text-red-950 font-bold line-through'}>
                        {userOpt?.text || 'Chưa chọn'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-red-900 text-[10px] font-bold">
                        Kết luận thực tế: {correctOpt?.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-[#d8caa7] border-t-2 border-[#16181d]/25 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  resetGame();
                }}
                className="px-3.5 py-2.5 rounded bg-[#cfbf9e] hover:bg-[#bfae8a] text-xs font-typewriter font-bold text-[#2a303d] transition-colors cursor-pointer border border-[#ab9b7a] flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Điều Tra Lại</span>
              </button>

              <button
                onClick={() => {
                  audioManager.playSfx('page_turn');
                  setIsCaseSelectorOpen(true);
                }}
                className="px-3.5 py-2.5 rounded bg-[#2e2318] hover:bg-[#403121] text-amber-300 text-xs font-typewriter font-bold transition-colors cursor-pointer border border-[#594432] flex items-center gap-1.5"
              >
                <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
                <span>Kho Hồ Sơ</span>
              </button>
            </div>

            {isCaseSolved && nextCase ? (
              <button
                onClick={() => {
                  audioManager.playSfx('page_turn');
                  selectCase(nextCase.id);
                }}
                className="px-5 py-2.5 rounded bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 text-xs font-typewriter font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-950/50 cursor-pointer hover:scale-102 transition-all border border-amber-900"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>TIẾP NHẬN {nextCase.docketNumber || `#${nextCase.id}`} ▶</span>
              </button>
            ) : isCaseSolved && !nextCase ? (
              <div className="flex items-center gap-2">
                <span className="rubber-stamp stamp-green text-xs">
                  HOÀN TẤT CHIẾN DỊCH MINH SÁT
                </span>
                <button
                  onClick={() => {
                    audioManager.playSfx('page_turn');
                    resetGame();
                  }}
                  className="px-5 py-2.5 rounded bg-[#8a1c1c] hover:bg-[#a12222] text-[#fbf6ec] text-xs font-typewriter font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-950/40 cursor-pointer hover:scale-102 transition-all border border-red-950"
                >
                  <span>VỀ BÀN LÀM VIỆC</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  audioManager.playSfx('page_turn');
                  resetGame();
                }}
                className="px-5 py-2.5 rounded bg-[#8a1c1c] hover:bg-[#a12222] text-[#fbf6ec] text-xs font-typewriter font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-950/40 cursor-pointer hover:scale-102 transition-all border border-red-950"
              >
                <span>ĐÓNG HỒ SƠ & VỀ BÀN LÀM VIỆC</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Case Selector Modal */}
      <DossierCaseSelector
        isOpen={isCaseSelectorOpen}
        onClose={() => setIsCaseSelectorOpen(false)}
      />
    </>
  );
};
