import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { SaveManager } from '../../storage/SaveManager';
import { History, Flame, FolderArchive } from 'lucide-react';
import { DossierCaseSelector } from './DossierCaseSelector';

export const TitleScreen: React.FC = () => {
  const { setGameMode, loadSaveState, caseData, unlockedCaseIds } = useGameStore();
  const [hasSaveSlot, setHasSaveSlot] = useState<boolean>(false);
  const [isCaseSelectorOpen, setIsCaseSelectorOpen] = useState<boolean>(false);

  useEffect(() => {
    SaveManager.loadGame('slot-autosave').then(save => {
      if (save) setHasSaveSlot(true);
    });
  }, []);

  const handleStartNew = () => {
    audioManager.unlockAudio();
    audioManager.playSfx('page_turn');
    setGameMode('briefing');
  };

  const handleResume = async () => {
    audioManager.unlockAudio();
    audioManager.playSfx('page_turn');
    const save = await SaveManager.loadGame('slot-autosave');
    if (save) {
      loadSaveState(save);
      setGameMode('location');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      
      {/* 1. Cinematic Detective Desk at 2:00 AM Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/assets/images/scenes/title_desk_bg.jpg')" }}
      />

      {/* Atmospheric Vignette & Rainy Night Light Falloff */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(217,119,6,0.18)_0%,transparent_60%)] pointer-events-none" />

      {/* 2. The Physical Sealed Case Dossier Folder on Desk */}
      <div className="relative z-10 max-w-lg w-full animate-in fade-in zoom-in-95 duration-500">
        
        {/* Main Folder Body */}
        <div className="manila-folder rounded-lg p-6 sm:p-8 border-2 border-[#574332] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.95)] relative overflow-hidden backdrop-blur-sm">
          
          {/* Manila Paper Folder Tab */}
          <div className="absolute top-0 right-8 px-4 py-1 bg-[#2c2217] border-b border-x border-[#574332] rounded-b text-[10px] font-typewriter text-amber-500/90 tracking-widest uppercase">
            HỒ SƠ {caseData.docketNumber || '#507/CSHS-ĐT'}
          </div>

          {/* Department Header */}
          <div className="border-b border-[#473627] pb-4 mb-5 space-y-1">
            <div className="text-[10px] font-typewriter tracking-[0.2em] text-[#a89582] uppercase text-center">
              CÔNG AN TP. HỒ CHÍ MINH • CƠ QUAN CSĐT HÌNH SỰ
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="rubber-stamp stamp-red text-[10px]">TỐI MẬT</span>
              <span className="text-xs font-typewriter text-amber-500/90 font-bold uppercase">
                {caseData.title}
              </span>
            </div>
          </div>

          {/* Center Case Title */}
          <div className="text-center space-y-2 my-6">
            <h1 className="text-4xl sm:text-5xl font-black font-dossier-serif tracking-[0.15em] text-[#f4efe6] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              MINH SÁT
            </h1>
            <div className="text-xl font-serif text-amber-500 font-bold tracking-[0.3em]">
              明 察
            </div>
            <p className="text-xs font-typewriter text-[#b5a593] italic max-w-xs mx-auto pt-2 leading-relaxed">
              "Cái chết nào cũng để lại dấu vết. Vấn đề là ai đủ kiên nhẫn để tìm."
            </p>
          </div>

          {/* Diagonal Crime Scene Evidence Tape Seal */}
          <div className="my-5 relative py-2">
            <div className="evidence-tape py-1.5 px-3 text-center text-[10px] sm:text-[11px] font-bold shadow-2xl transform -rotate-1 border-y border-red-950">
              ★ BỘ CÔNG AN • BẰNG CHỨNG HÌNH SỰ • NIÊM PHONG HIỆN TRƯỜNG ★
            </div>
          </div>

          {/* Interactive Actions: Breaking the Seal & Selecting Case */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleStartNew}
              className="w-full py-3.5 px-6 rounded-md bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-typewriter font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-950/60 flex items-center justify-center gap-3 group cursor-pointer hover:scale-[1.02]"
            >
              <Flame className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>XÉ NIÊM PHONG & THỤ LÝ VỤ ÁN</span>
            </button>

            <button
              onClick={() => {
                audioManager.unlockAudio();
                audioManager.playSfx('page_turn');
                setIsCaseSelectorOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-md bg-[#241c13] hover:bg-[#33271a] text-[#e0cfaf] border border-[#6b533e] font-typewriter text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-amber-500/80 shadow-md"
            >
              <FolderArchive className="w-4 h-4 text-amber-400" />
              <span>Kho Lưu Trữ Chuyên Án ({unlockedCaseIds.length}/5 Vụ Đã Mở)</span>
            </button>

            {hasSaveSlot && (
              <button
                onClick={handleResume}
                className="w-full py-2 px-4 rounded-md bg-[#16110b] hover:bg-[#241c13] text-[#cfbf9e] border border-[#574332] font-typewriter text-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:border-amber-500/60"
              >
                <History className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tiếp Tục Hồ Sơ Đang Thụ Lý (Auto-save)</span>
              </button>
            )}
          </div>

          {/* Subtle Ambient Audio Unlock Hint */}
          <div className="pt-4 text-center text-[10px] font-typewriter text-[#806f5e]">
            [ Bấm để bắt đầu và kích hoạt âm thanh mưa đêm Sài Gòn 1980s ]
          </div>
        </div>
      </div>

      {/* Dossier Case Selector Modal */}
      <DossierCaseSelector
        isOpen={isCaseSelectorOpen}
        onClose={() => setIsCaseSelectorOpen(false)}
      />
    </div>
  );
};

