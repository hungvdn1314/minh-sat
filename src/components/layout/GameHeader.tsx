import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { SaveManager } from '../../storage/SaveManager';
import {
  BookOpen,
  Map,
  Volume2,
  VolumeX,
  Stamp,
  Scale,
  ArrowLeft,
  Shield,
  Layers,
  Clock,
  Paperclip
} from 'lucide-react';

interface GameHeaderProps {
  onOpenAccusation: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ onOpenAccusation }) => {
  const {
    caseData,
    currentLocationId,
    gameMode,
    setGameMode,
    openNotebook,
    collectedEvidenceIds,
    exportSaveState,
    setActivePuzzle
  } = useGameStore();

  const [isMuted, setIsMuted] = useState<boolean>(audioManager.getIsMuted());
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const currentLocation = caseData.locations.find(l => l.id === currentLocationId);

  const handleToggleMute = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  const handleSave = async () => {
    audioManager.playSfx('stamp');
    const state = exportSaveState();
    const success = await SaveManager.saveGame('slot-autosave', state);
    if (success) {
      setSaveToast('Đã đóng dấu lưu hồ sơ vào IndexedDB!');
      setTimeout(() => setSaveToast(null), 2500);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-2 sm:p-3 flex items-start justify-between select-none bg-gradient-to-b from-[#0a0705]/95 via-[#0a0705]/60 to-transparent pb-8">
      
      {/* 1. Left Wing: Detective's Folded Leather Badge Wallet & Brass Room Plaque */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {gameMode === 'location' && (
          <button
            onClick={() => {
              audioManager.playSfx('click');
              setGameMode('map');
            }}
            className="px-2.5 py-1.5 rounded-sm bg-[#22160e] hover:bg-[#342216] text-[#e3d7bf] hover:text-amber-300 border border-[#5c4632] shadow-xl flex items-center gap-1.5 text-[11px] font-typewriter font-bold transition-all cursor-pointer hover:-translate-y-0.5"
            title="Quay lại bàn bản đồ tác chiến"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">BÀN TÁC CHIẾN</span>
          </button>
        )}

        {/* Folded Leather Police Identity Wallet */}
        <div className="bg-[#16100a] px-3.5 py-2 rounded-sm border border-[#4a3724] shadow-[0_10px_25px_rgba(0,0,0,0.85)] flex items-center gap-3">
          {/* Aged Brass Police Star Crest */}
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#b45309] to-[#451a03] border border-[#f59e0b]/50 flex items-center justify-center text-amber-200 shadow-inner shrink-0">
            <Shield className="w-4 h-4 fill-amber-300/80 text-amber-400" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase font-black text-amber-500/90 tracking-widest">
                CƠ QUAN CSĐT #427
              </span>
              <span className="text-[8px] font-mono px-1 py-0.2 rounded-sm bg-[#241a12] text-[#cfbf9e] border border-[#5c4632]">
                {gameMode === 'map' ? 'ĐỊA BÀN' : 'HIỆN TRƯỜNG'}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-dossier-serif font-bold text-[#f5ebd7] truncate max-w-[180px] sm:max-w-xs tracking-wide">
              {gameMode === 'map' ? 'Bản Đồ Tác Chiến Sài Gòn' : currentLocation?.name}
            </div>
          </div>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-4 bg-[#781818] border border-red-500 text-[#fbf6ec] px-4 py-1.5 rounded-sm shadow-2xl text-xs font-typewriter font-bold animate-in fade-in flex items-center gap-2 z-50">
          <Stamp className="w-4 h-4 text-amber-300" />
          <span>✓ {saveToast}</span>
        </div>
      )}

      {/* 2. Right Wing: Physical Diegetic Dossier Folder Tabs (No AI Portal Slop!) */}
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end">
        
        {/* Tab 1: Map / Room Manila Tab with Paperclip */}
        <button
          onClick={() => {
            audioManager.playSfx('click');
            setGameMode(gameMode === 'map' ? 'location' : 'map');
          }}
          className="relative px-3 py-1.5 rounded-t-sm bg-[#ded3be] hover:bg-[#ebe2d0] text-[#1c1917] border-t border-x border-[#b3a182] shadow-lg flex items-center gap-1.5 text-xs font-typewriter font-bold transition-all cursor-pointer hover:-translate-y-0.5"
          title={gameMode === 'map' ? 'Vào hiện trường điều tra' : 'Mở bản đồ tác chiến'}
        >
          <Paperclip className="w-3 h-3 text-[#5c4a35] -rotate-45" />
          <Map className="w-3.5 h-3.5 text-[#4a3622]" />
          <span className="hidden md:inline">{gameMode === 'map' ? 'Hiện Trường' : 'Bản Đồ'}</span>
        </button>

        {/* Tab 2: Architectural Blueprint Tab (Prussian Cyanotype Paper) */}
        {caseData.id === 'case-ham-tu' && (
          <button
            onClick={() => {
              audioManager.playSfx('click');
              setActivePuzzle('building-blueprint');
            }}
            className="px-3 py-1.5 rounded-t-sm bg-[#16222f] hover:bg-[#1e2f42] text-[#93c5fd] border-t border-x border-[#2b435c] shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer hover:-translate-y-0.5"
            title="Xem sơ đồ mặt cắt 3 tầng tiệm kim hoàn Vạn Lợi"
          >
            <Layers className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span className="hidden lg:inline">Sơ Đồ 3 Tầng</span>
          </button>
        )}

        {/* Tab 3: Chronology Timeline Matrix Tab (Aged Incident Log) */}
        {caseData.id === 'case-ham-tu' && (
          <button
            onClick={() => {
              audioManager.playSfx('click');
              setActivePuzzle('puzzle-timeline');
            }}
            className="px-3 py-1.5 rounded-t-sm bg-[#22170d] hover:bg-[#322315] text-[#fde68a] border-t border-x border-[#614122] shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer hover:-translate-y-0.5"
            title="Ma trận thời gian đối chiếu ngoại phạm 21h45"
          >
            <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="hidden lg:inline">Ma Trận Thời Gian</span>
          </button>
        )}

        {/* Tab 4: Detective Field Notebook Tab (Leather Spine with Peeking Bookmark) */}
        <button
          onClick={() => {
            audioManager.playSfx('page_turn');
            openNotebook(true);
          }}
          className="relative px-3.5 py-1.5 rounded-t-sm bg-[#2c180e] hover:bg-[#3a2013] text-[#fbf6ec] border-t border-x border-[#7c3f19] shadow-xl flex items-center gap-2 text-xs font-typewriter font-bold transition-all cursor-pointer hover:-translate-y-0.5"
          title="Mở sổ tay điều tra hiện trường"
        >
          {/* Peeking Crimson Ribbon Bookmark */}
          <div className="absolute -top-1.5 right-2 w-2 h-3.5 bg-red-700 rounded-b-xs shadow-sm pointer-events-none" />
          <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="hidden sm:inline">Sổ Tay</span>
          <span className="px-1.5 py-0.2 rounded-xs bg-amber-950/80 text-amber-300 font-mono text-[10px] font-black border border-amber-600/50">
            {collectedEvidenceIds.length}/{caseData.evidence.length}
          </span>
        </button>

        {/* Tactical Save Stamp (Wooden Handle Rubber Stamp) */}
        <button
          onClick={handleSave}
          className="p-1.5 rounded-sm bg-[#1c140d] hover:bg-[#2b1f14] text-[#cfbf9e] hover:text-amber-300 border border-[#4a3622] shadow-lg transition-all cursor-pointer"
          title="Đóng dấu lưu hồ sơ vụ án vào IndexedDB"
        >
          <Stamp className="w-3.5 h-3.5" />
        </button>

        {/* Tactical Audio Switch (Cassette Player Toggle) */}
        <button
          onClick={handleToggleMute}
          className="p-1.5 rounded-sm bg-[#1c140d] hover:bg-[#2b1f14] text-[#cfbf9e] hover:text-white border border-[#4a3622] shadow-lg transition-all cursor-pointer"
          title={isMuted ? 'Bật băng âm thanh Sài Gòn' : 'Tắt âm thanh'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#cfbf9e]" />}
        </button>

        {/* Tab 5: Accusation / Indictment Arrest Warrant (Official Justice Docket Envelope) */}
        <button
          onClick={() => {
            audioManager.playSfx('stamp');
            onOpenAccusation();
          }}
          className="px-3 py-1.5 rounded-t-sm bg-[#6b1414] hover:bg-[#821919] text-[#fef2f2] shadow-2xl border-t border-x border-red-700/80 text-xs font-typewriter font-black flex items-center gap-1.5 tracking-wider transition-all cursor-pointer hover:-translate-y-0.5 ml-1"
          title="Mở biên bản khởi tố & Lệnh bắt khẩn cấp"
        >
          <Scale className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>LỆNH BẮT GIỮ</span>
        </button>

      </div>
    </header>
  );
};
