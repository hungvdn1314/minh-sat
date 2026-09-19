import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { usePhaserGame } from '../../hooks/usePhaserGame';
import { audioManager } from '../../audio/AudioManager';

export const CityMapView: React.FC = () => {
  const { caseData, moveToLocation, unlockedLocationIds } = useGameStore();

  const markers = caseData.locations.map(loc => ({
    id: loc.id,
    name: loc.name,
    subtitle: loc.subtitle,
    x: loc.mapPosition.x,
    y: loc.mapPosition.y,
    type: loc.type,
    isUnlocked: unlockedLocationIds.includes(loc.id)
  }));

  const handleSelectLocation = (id: string) => {
    audioManager.playSfx('click');
    moveToLocation(id);
  };

  const containerRef = usePhaserGame({
    markers,
    onSelectLocation: handleSelectLocation
  });

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0806] select-none overflow-hidden">
      
      {/* Phaser Canvas Mount */}
      <div ref={containerRef} className="w-full h-full flex items-center justify-center" />

      {/* Top Tactical Map Memo Note */}
      <div className="absolute top-18 left-6 z-20 pointer-events-none">
        <div className="dossier-sheet px-4 py-2 rounded shadow-2xl flex items-center gap-3 border-2 border-[#8a7663] text-[#1c1917] select-none">
          <div className="w-3 h-3 rounded-full bg-[#991b1b] border border-[#fef08a] shadow-sm shrink-0" />
          <span className="text-xs font-typewriter tracking-wider uppercase font-bold text-[#1a1c22]">
            BẢN ĐỒ TÁC CHIẾN // {caseData.title.toUpperCase()}: Nhấp trực tiếp vào đinh ghim để điều tra địa điểm
          </span>
        </div>
      </div>
    </div>
  );
};
