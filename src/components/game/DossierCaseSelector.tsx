import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ALL_CASES } from '../../data/cases';
import { audioManager } from '../../audio/AudioManager';
import { RubberStamp } from '../ui/diegetic/RubberStamp';
import {
  FolderArchive,
  Lock,
  Flame,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Search,
  X,
  FileSpreadsheet
} from 'lucide-react';

interface DossierCaseSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierCaseSelector: React.FC<DossierCaseSelectorProps> = ({
  isOpen,
  onClose
}) => {
  const { caseData, unlockedCaseIds, selectCase } = useGameStore();

  if (!isOpen) return null;

  const handleSelectCase = (caseId: string) => {
    audioManager.playSfx('page_turn');
    selectCase(caseId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md pointer-events-auto animate-in fade-in duration-200 select-none overflow-y-auto">
      
      {/* Container: Physical Filing Cabinet / Wood Desk Drawer */}
      <div className="w-full max-w-5xl manila-folder rounded-lg border-2 border-[#574332] shadow-[0_45px_100px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col max-h-[94vh] relative">
        
        {/* Top Filing Archive Header */}
        <div className="p-4 sm:p-5 bg-[#2c2116] border-b-2 border-[#574332] flex items-center justify-between text-[#e4d4ba]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#1c140e] border border-[#574332] flex items-center justify-center text-amber-500 shadow-inner">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-typewriter tracking-[0.2em] text-[#a89582] uppercase">
                CƠ QUAN CẢNH SÁT ĐIỀU TRA • TỔ TRỌNG ÁN ĐẶC BIỆT
              </div>
              <h2 className="text-lg sm:text-xl font-black font-dossier-serif text-[#f5ebd9] uppercase tracking-wider flex items-center gap-3">
                KHO LƯU TRỮ HỒ SƠ CHUYÊN ÁN (MINH SÁT)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RubberStamp variant="amber" size="sm">
              CHIẾN DỊCH SAIGON 1980s
            </RubberStamp>
            <button
              onClick={() => {
                audioManager.playSfx('click');
                onClose();
              }}
              className="p-2 rounded hover:bg-[#3d2e1f] text-[#cbbba0] hover:text-white transition-colors cursor-pointer border border-[#574332]"
              title="Đóng lưu trữ (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Narrative Arc Banner: The Shadow Ledger Connection */}
        <div className="px-5 py-2.5 bg-[#1f170f] border-b border-[#473627] flex items-center justify-between text-xs font-typewriter text-[#bfaea0]">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-500" />
            <span>
              Mục tiêu chiến dịch: Thu thập 4 trang mật ký để vạch trần tổ chức <strong className="text-amber-400">"Người Giữ Sổ" (The Ledger Keeper)</strong>
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#8f7e6f]">
            Đã mở khóa: <strong className="text-amber-300">{unlockedCaseIds.length}</strong>/{ALL_CASES.length} Vụ án
          </div>
        </div>

        {/* The 4 Physical Manila Dossiers Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#120d08]/95">
          {ALL_CASES.map((c, index) => {
            const isUnlocked = unlockedCaseIds.includes(c.id);
            const isCurrentCase = caseData.id === c.id;

            return (
              <div
                key={c.id}
                className={`relative rounded-sm border-2 transition-all p-5 flex flex-col justify-between gap-4 ${
                  isUnlocked
                    ? isCurrentCase
                      ? 'dossier-sheet border-[#785b40] shadow-[0_12px_32px_rgba(217,119,6,0.35)] ring-2 ring-amber-600'
                      : 'dossier-sheet border-[#998267] hover:border-[#73593f] shadow-xl hover:scale-[1.01]'
                    : 'bg-[#18120b]/95 border-[#38281a] opacity-80 shadow-inner'
                }`}
              >
                {/* Folder Top Tab */}
                <div className="flex items-center justify-between border-b border-[#523e2d]/30 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      isUnlocked
                        ? 'bg-[#2b2014] text-amber-300 border border-[#523e2d]'
                        : 'bg-[#22180e] text-[#806d5c] border border-[#38281a]'
                    }`}>
                      VỤ ÁN #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className={`text-[11px] font-mono font-bold ${
                      isUnlocked ? 'text-[#523e2d]' : 'text-[#736250]'
                    }`}>
                      {c.docketNumber || `#${c.id}`}
                    </span>
                  </div>

                  {isCurrentCase && (
                    <RubberStamp variant="green" size="sm">
                      ĐANG THỤ LÝ
                    </RubberStamp>
                  )}
                  {!isUnlocked && (
                    <RubberStamp variant="red" size="sm">
                      NIÊM PHONG KHÓA
                    </RubberStamp>
                  )}
                </div>

                {/* Case Title & Briefing Snippet */}
                <div className="space-y-2">
                  <h3 className={`text-xl font-black font-dossier-serif uppercase tracking-wide ${
                    isUnlocked ? 'text-[#16181d]' : 'text-[#a3907d]'
                  }`}>
                    {c.title}
                  </h3>
                  <div className={`text-xs font-serif italic ${
                    isUnlocked ? 'text-[#544331]' : 'text-[#7a6857]'
                  }`}>
                    "{c.subtitle}"
                  </div>

                  {c.victim && (
                    <div className={`text-[11px] font-typewriter pt-1 flex items-center gap-1.5 ${
                      isUnlocked ? 'text-[#2b2218]' : 'text-[#827160]'
                    }`}>
                      <span className={`font-bold ${isUnlocked ? 'text-[#8a1c1c]' : 'text-red-900/80'}`}>
                        Nạn nhân:
                      </span>
                      <span className="font-semibold">{c.victim.name}</span>
                      <span className={isUnlocked ? 'text-stone-600' : 'text-stone-500'}>
                        ({c.victim.age}t, {c.victim.role})
                      </span>
                    </div>
                  )}

                  <p className={`text-xs font-typewriter leading-relaxed line-clamp-3 pt-1 ${
                    isUnlocked ? 'text-[#2e261d]' : 'text-[#786756]'
                  }`}>
                    {c.briefing}
                  </p>
                </div>

                {/* Metadata Badges: Difficulty, Locations, Suspects */}
                <div className="pt-2 border-t border-[#523e2d]/25 flex flex-wrap items-center justify-between gap-2 text-[11px] font-typewriter">
                  <div className={`flex items-center gap-3 ${
                    isUnlocked ? 'text-[#382b1d]' : 'text-[#705e4d]'
                  }`}>
                    <div className="flex items-center gap-1" title="Độ khó suy luận">
                      <span className="font-bold">Độ khó:</span>
                      <span className={`font-mono tracking-tighter ${
                        isUnlocked ? 'text-amber-800' : 'text-amber-900/70'
                      }`}>
                        {'★'.repeat(c.difficulty)}{'☆'.repeat(5 - c.difficulty)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{c.locations.length} Địa điểm</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{c.characters.length} Đối tượng</span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-1 font-mono text-[10px] ${
                    isUnlocked ? 'text-[#544331]' : 'text-[#6b5a4a]'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>~{c.estimatedTime} phút</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleSelectCase(c.id)}
                      className={`w-full py-2.5 px-4 rounded font-typewriter font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isCurrentCase
                          ? 'bg-[#291e13] hover:bg-[#382b1c] text-amber-300 border border-amber-600/70 shadow-md'
                          : 'bg-[#8a1c1c] hover:bg-[#a12222] text-[#fbf6ec] border border-red-950 shadow-lg hover:scale-[1.01]'
                      }`}
                    >
                      {isCurrentCase ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>TIẾP TỤC ĐIỀU TRA HỒ SƠ NÀY</span>
                        </>
                      ) : (
                        <>
                          <Flame className="w-4 h-4 text-amber-300" />
                          <span>MỞ & TIẾP NHẬN HỒ SƠ ÁN NÀY</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="p-2.5 rounded bg-[#100c08] border border-[#2e2014] flex items-center justify-center gap-2 text-[#7a6a5b] text-[11px] font-typewriter italic">
                      <Lock className="w-3.5 h-3.5 text-red-700 shrink-0" />
                      <span>Phá giải vụ án trước với xếp loại S hoặc A để mở khóa</span>
                    </div>
                  )}
                </div>

                {/* Locked Diagonal Stamped Tape */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/40 pointer-events-none rounded flex items-center justify-center">
                    <div className="evidence-tape py-1 px-4 text-center text-[10px] font-black uppercase tracking-widest border-y border-red-950 transform -rotate-6 shadow-2xl opacity-90">
                      ★ HỒ SƠ NIÊM PHONG • BỘ CÔNG AN ★
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#231a11] border-t-2 border-[#574332] flex items-center justify-between text-xs font-typewriter text-[#a69685]">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-500" />
            <span>Thám tử có thể chọn bất kỳ hồ sơ đã mở khóa nào để điều tra lại hoặc tìm kiếm manh mối ẩn.</span>
          </div>
          <button
            onClick={() => {
              audioManager.playSfx('click');
              onClose();
            }}
            className="px-4 py-2 rounded bg-[#3d2e1f] hover:bg-[#4a3928] text-[#e8dcc4] font-bold border border-[#574332] cursor-pointer transition-colors"
          >
            ĐÓNG LƯU TRỮ (ESC)
          </button>
        </div>

      </div>
    </div>
  );
};
