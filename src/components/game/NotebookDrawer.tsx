import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { BookOpen, X, AlertCircle, Clock, Users, FileText, Sparkles } from 'lucide-react';

export const NotebookDrawer: React.FC = () => {
  const {
    isNotebookOpen,
    openNotebook,
    caseData,
    collectedEvidenceIds,
    unlockedTestimonyKeys,
    notebookNotes,
    hasFoundHiddenObjective
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'evidence' | 'characters' | 'timeline' | 'notes'>('evidence');

  if (!isNotebookOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-xl h-full bg-[#18130d] border-l-4 border-[#473523] shadow-2xl flex flex-col text-[#dfd2ba] font-typewriter">
        
        {/* Notebook Leather Cover Header */}
        <div className="p-5 border-b-2 border-[#473523] bg-[#100c08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="rubber-stamp stamp-amber text-[9px]">SỔ TAY TRINH SÁT</span>
                <span className="text-xs font-mono text-[#8c745d]">{caseData.docketNumber || '#507/CSHS-ĐT'}</span>
              </div>
              <h1 className="text-base font-bold text-[#f5ebd7] mt-0.5 font-dossier-serif">{caseData.title}</h1>
            </div>
          </div>
          <button
            onClick={() => {
              audioManager.playSfx('page_turn');
              openNotebook(false);
            }}
            className="p-1.5 rounded bg-[#2e2116] hover:bg-[#423122] text-[#a89582] hover:text-white transition-colors cursor-pointer border border-[#523d2b]"
            title="Đóng sổ tay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tactile Manila Index Tabs */}
        <div className="flex border-b-2 border-[#473523] bg-[#0d0a07] px-3 pt-2 gap-1 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => { audioManager.playSfx('click'); setActiveTab('evidence'); }}
            className={`flex items-center gap-1.5 py-2 px-3.5 border-t-2 rounded-t font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'evidence'
                ? 'border-[#991b1b] text-[#1c1917] bg-[#dfd2ba] shadow-md'
                : 'border-transparent text-[#8a7663] hover:text-[#dfd2ba] hover:bg-[#1a140e]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Vật Chứng ({collectedEvidenceIds.length}/{caseData.evidence.length})</span>
          </button>

          <button
            onClick={() => { audioManager.playSfx('click'); setActiveTab('characters'); }}
            className={`flex items-center gap-1.5 py-2 px-3.5 border-t-2 rounded-t font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'characters'
                ? 'border-[#991b1b] text-[#1c1917] bg-[#dfd2ba] shadow-md'
                : 'border-transparent text-[#8a7663] hover:text-[#dfd2ba] hover:bg-[#1a140e]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Nhân Chứng</span>
          </button>

          <button
            onClick={() => { audioManager.playSfx('click'); setActiveTab('timeline'); }}
            className={`flex items-center gap-1.5 py-2 px-3.5 border-t-2 rounded-t font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'timeline'
                ? 'border-[#991b1b] text-[#1c1917] bg-[#dfd2ba] shadow-md'
                : 'border-transparent text-[#8a7663] hover:text-[#dfd2ba] hover:bg-[#1a140e]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Dòng Thời Gian</span>
          </button>

          <button
            onClick={() => { audioManager.playSfx('click'); setActiveTab('notes'); }}
            className={`flex items-center gap-1.5 py-2 px-3.5 border-t-2 rounded-t font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'notes'
                ? 'border-[#991b1b] text-[#1c1917] bg-[#dfd2ba] shadow-md'
                : 'border-transparent text-[#8a7663] hover:text-[#dfd2ba] hover:bg-[#1a140e]'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Ghi Chép</span>
          </button>
        </div>

        {/* Tab Contents Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#140f0a]">
          {/* TAB 1: EVIDENCE */}
          {activeTab === 'evidence' && (
            <div className="space-y-3">
              {caseData.evidence.map((ev) => {
                const isFound = collectedEvidenceIds.includes(ev.id);
                return (
                  <div
                    key={ev.id}
                    className={`p-4 rounded border-2 transition-all ${
                      isFound
                        ? 'dossier-sheet text-[#1c1917] shadow-lg'
                        : 'bg-[#211912] border-[#382a1d] text-[#735e4b] opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${isFound ? 'bg-[#991b1b] text-white' : 'bg-[#332418] text-[#8a7663]'}`}>
                          {ev.id}
                        </span>
                        <h3 className="font-bold text-sm font-dossier-serif">
                          {isFound ? ev.name : '??? (Vật chứng chưa phát hiện)'}
                        </h3>
                      </div>
                      {isFound ? (
                        <span className="rubber-stamp stamp-red text-[8px] py-0.5 px-1.5">
                          ĐÃ THU GIỮ
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[#8a7663]">CHƯA TÌM THẤY</span>
                      )}
                    </div>

                    {isFound ? (
                      <div className="mt-2.5 space-y-2 text-xs">
                        <p className="text-[#3d2f21] leading-relaxed">{ev.description}</p>
                        <div className="p-2.5 rounded bg-[#f4ebd9] border border-[#b8a688] text-[#1c1917] font-mono text-xs">
                          <span className="font-bold text-[#991b1b]">KẾT LUẬN GIÁM ĐỊNH: </span>
                          {ev.detail}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#8a7663] mt-2 italic font-mono">
                        * Dùng đèn pin rà soát hiện trường 507 hoặc đối chất với các nghi phạm.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: CHARACTERS */}
          {activeTab === 'characters' && (
            <div className="space-y-4">
              {caseData.characters.map((char) => (
                <div key={char.id} className="dossier-sheet p-4 rounded text-[#1c1917] shadow-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-[#8a7663] pb-2">
                    <div>
                      <h3 className="font-bold text-base font-dossier-serif">{char.name}</h3>
                      <p className="text-xs text-[#991b1b] font-mono font-bold">{char.role} • {char.age} tuổi</p>
                    </div>
                    <span className="rubber-stamp stamp-amber text-[8px]">HỒ SƠ LÝ LỊCH</span>
                  </div>

                  <p className="text-xs text-[#3d2f21] leading-relaxed">{char.description}</p>

                  <div className="p-2.5 bg-[#f5ebd7] border border-[#b8a688] rounded text-xs space-y-1">
                    <div className="text-[#1c1917]">
                      <span className="font-bold text-[#7a4e2d] font-mono">KHAI BÁO NGOẠI PHẠM: </span>
                      {char.alibi}
                    </div>
                  </div>

                  {/* Testimonies list */}
                  <div className="space-y-2 pt-2 border-t border-[#8a7663]">
                    <h4 className="text-[11px] font-mono text-[#5c4736] font-bold uppercase tracking-wider">
                      BIÊN BẢN LỜI KHAI THEO CẤP ĐỘ:
                    </h4>
                    {char.testimonies.map((t) => {
                      const isUnlocked = unlockedTestimonyKeys.includes(`${char.id}:${t.level}`);
                      return (
                        <div
                          key={t.level}
                          className={`p-2.5 rounded text-xs border ${
                            isUnlocked
                              ? 'bg-[#fcf9f2] border-[#b8a688] text-[#1c1917] shadow-sm'
                              : 'bg-[#e0d5c1]/50 border-[#c4b6a1] text-[#735e4b] italic'
                          }`}
                        >
                          <div className="font-bold text-[#991b1b] mb-1 font-mono">
                            Cấp {t.level}: {isUnlocked ? t.title : 'Lời khai bị niêm phong'}
                          </div>
                          <p>{isUnlocked ? t.content : 'Cần thu thập thêm vật chứng liên đới để mở khóa thẩm vấn.'}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="p-4 rounded dossier-sheet shadow-lg">
              <div className="border-b-2 border-[#8a7663] pb-2 mb-4 flex items-center justify-between">
                <span className="font-dossier-serif font-bold text-sm text-[#1c1917] uppercase">
                  TIẾN TRÌNH THỜI GIAN ÁN MẠNG (18/09)
                </span>
                <span className="rubber-stamp stamp-red text-[8px]">SƠ ĐỒ TÁC CHIẾN</span>
              </div>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-1 before:bg-[#991b1b]">
                {caseData.timeline.map((item) => (
                  <div key={item.id} className="relative">
                    {/* Red Pushpin marker */}
                    <div className="absolute -left-[26px] top-1 w-4 h-4 rounded-full bg-[#991b1b] border-2 border-[#fef08a] shadow-md" />
                    
                    <div className="bg-[#fcf9f2] p-2.5 rounded border border-[#b8a688] shadow-sm">
                      <div className="text-xs font-mono text-[#991b1b] font-black">{item.time} (18/09)</div>
                      <div className="text-xs text-[#1c1917] font-bold mt-0.5">{item.event}</div>
                      <div className="text-[10px] text-[#735e4b] font-mono mt-0.5">Nguồn xác minh: {item.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NOTES & OVERARCHING */}
          {activeTab === 'notes' && (
            <div className="flex-1 flex flex-col space-y-3 min-h-[520px]">
              {hasFoundHiddenObjective && (
                <div className="p-3 rounded bg-[#fef08a] border-2 border-[#ca8a04] text-[#713f12] space-y-1 shadow-md">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#854d0e]">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    MANH MỐI TỔ CHỨC: MINH PHÁT HOLDINGS
                  </div>
                  <p className="text-xs leading-relaxed font-serif text-[#713f12]">
                    Mẩu giấy mật mã đã chỉ ra cái tên "Minh Phát Holdings". Vụ án mạng tại 507 không đơn thuần là ân oán cá nhân, mà là một nút thắt trong đường dây rửa tiền ngầm!
                  </p>
                </div>
              )}

              {/* Authentic Lined Detective Notepad Paper */}
              <div className="lined-notebook rounded shadow-lg flex-1 flex flex-col pt-3 pb-6 relative overflow-hidden min-h-[460px]">
                {/* Notebook Header Tape */}
                <div className="pl-[68px] pr-4 pb-2 mb-1 border-b border-red-500/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#991b1b] font-bold uppercase tracking-wider">
                    NHẬT KÝ ĐIỀU TRA NGOÀI HIỆN TRƯỜNG // 1989
                  </span>
                  <span className="rubber-stamp stamp-amber text-[8px] py-0.5 px-1.5">
                    GHI CHÉP GỐC
                  </span>
                </div>

                {/* Notes List Placed Strictly Right of Red Margin Line (at 56px) */}
                <div className="pl-[68px] pr-4 flex-1 flex flex-col space-y-0 text-xs font-mono text-[#1a1714]">
                  {notebookNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="min-h-[28px] flex items-baseline gap-2 leading-[28px] border-b border-blue-200/40"
                    >
                      <span className="text-[#991b1b] font-bold shrink-0 text-[11px]">#{idx + 1}</span>
                      <span className="text-[#1c1917] font-semibold select-text">{note}</span>
                    </div>
                  ))}

                  {/* Empty Ruled Lines Filler to eliminate any blank dark gap */}
                  {Array.from({ length: Math.max(3, 14 - notebookNotes.length) }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="h-[28px] border-b border-blue-200/20 w-full"
                    />
                  ))}
                </div>

                {/* Bottom Signature Line */}
                <div className="pl-[68px] pr-6 pt-3 mt-auto flex items-center justify-between text-[10px] font-mono text-[#786450] italic border-t border-amber-900/10">
                  <span>Điều tra viên thụ lý: Đ/c Lê Minh Sơn</span>
                  <span>Ký xác nhận: ✍️</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notebook Footer */}
        <div className="p-3.5 border-t-2 border-[#473523] bg-[#100c08] text-center">
          <span className="text-[11px] text-[#8a7663] font-mono">
            [ Hồ sơ nghiệp vụ được tự động đồng bộ vào IndexedDB ]
          </span>
        </div>
      </div>
    </div>
  );
};
