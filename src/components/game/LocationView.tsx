import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { CrimeSceneViewer } from '../../three/CrimeSceneViewer';
import { HamTuCrimeSceneViewer } from '../../three/HamTuCrimeSceneViewer';
import { audioManager } from '../../audio/AudioManager';
import {
  UserCheck,
  Search,
  Puzzle
} from 'lucide-react';

export const LocationView: React.FC = () => {
  const {
    caseData,
    currentLocationId,
    setActiveCharacter,
    setActiveEvidence,
    setActivePuzzle,
    setActiveInspectableProp,
    collectedEvidenceIds
  } = useGameStore();

  const location = caseData.locations.find(l => l.id === currentLocationId);
  if (!location) return null;

  const isHamTuCase = caseData.id === 'case-ham-tu';

  const handleHotspotClick = (evidenceId: string, hasPuzzle?: boolean) => {
    if (hasPuzzle) {
      setActivePuzzle('cipher-paper');
    } else {
      setActiveEvidence(evidenceId);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col select-none">
      
      {/* Primary Rendering Viewport */}
      {isHamTuCase ? (
        <div className="w-full h-full relative">
          <HamTuCrimeSceneViewer
            locationId={currentLocationId}
            collectedEvidenceIds={collectedEvidenceIds}
            onSelectEvidence={(evdId) => setActiveEvidence(evdId)}
            onSelectCharacter={(charId) => setActiveCharacter(charId)}
            onSelectPuzzle={(puzId) => setActivePuzzle(puzId)}
            onSelectInspectableProp={(propId) => setActiveInspectableProp(propId)}
          />
        </div>
      ) : location.has3DScene ? (
        <div className="w-full h-full">
          <CrimeSceneViewer
            onSelectHotspot={handleHotspotClick}
            collectedEvidenceIds={collectedEvidenceIds}
          />
        </div>
      ) : (
        /* 2D Diegetic Location View */
        <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 select-none">
          <img
            src="/assets/images/scenes/security_desk_bg.jpg"
            alt="Investigation Scene"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />

          <div className="relative z-10 max-w-xl animate-in fade-in slide-in-from-top-4 duration-300 pt-16">
            <div className="dossier-sheet px-5 py-3 rounded shadow-2xl border-2 border-[#8a7663] text-[#1c1917] space-y-1">
              <div className="flex items-center gap-2">
                <span className="rubber-stamp stamp-amber text-[9px] py-0.5 px-2">
                  ĐỊA BÀN ĐIỀU TRA
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#594736] font-bold">
                  {location.subtitle}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-dossier-serif text-[#1a1c22]">
                {location.name}
              </h1>
              <p className="text-xs font-typewriter text-[#4a3b2c] leading-relaxed">
                {location.description}
              </p>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl w-full mx-auto space-y-3 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {location.interactions.map((act) => {
                const isEvidenceFound = act.evidenceId ? collectedEvidenceIds.includes(act.evidenceId) : false;
                const isCharacter = !!act.characterId;
                const isPuzzle = !!act.hasPuzzle;

                return (
                  <button
                    key={act.id}
                    onClick={() => {
                      audioManager.playSfx('click');
                      if (act.characterId) {
                        setActiveCharacter(act.characterId);
                      } else if (act.hasPuzzle) {
                        setActivePuzzle('cipher-paper');
                      } else if (act.evidenceId) {
                        setActiveEvidence(act.evidenceId);
                      }
                    }}
                    className={`text-left p-4 rounded-sm shadow-2xl transition-all flex flex-col justify-between gap-3 group cursor-pointer border-2 hover:scale-102 ${
                      isCharacter
                        ? 'dossier-sheet border-[#8a7663] text-[#1c1917] hover:border-[#991b1b]'
                        : isPuzzle
                          ? 'bg-[#21160d]/95 border-[#614227] hover:border-amber-500 text-amber-100'
                          : 'bg-[#141c19]/95 border-[#2c4738] hover:border-emerald-500 text-emerald-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className={`p-2 rounded-sm border ${
                        isCharacter
                          ? 'bg-[#cbbba0] border-[#8a7663] text-[#4a392a]'
                          : isPuzzle
                            ? 'bg-[#3b2713] border-[#704a25] text-amber-400'
                            : 'bg-[#0b120e] border-[#2c4738] text-emerald-400'
                      }`}>
                        {isCharacter ? (
                          <UserCheck className="w-5 h-5" />
                        ) : isPuzzle ? (
                          <Puzzle className="w-5 h-5" />
                        ) : (
                          <Search className="w-5 h-5" />
                        )}
                      </div>

                      {isEvidenceFound ? (
                        <span className="rubber-stamp stamp-green text-[8px] py-0.5 px-1.5 shrink-0">
                          ĐÃ GIÁM ĐỊNH
                        </span>
                      ) : (
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border shrink-0 ${
                          isCharacter
                            ? 'bg-[#991b1b]/10 text-[#991b1b] border-[#991b1b]/40'
                            : isPuzzle
                              ? 'bg-amber-950 text-amber-400 border-amber-700/60'
                              : 'bg-emerald-950 text-emerald-400 border-emerald-700/60'
                        }`}>
                          {isCharacter ? 'THẨM VẤN' : isPuzzle ? 'GIẢI MÃ' : 'GIÁM ĐỊNH'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 font-typewriter">
                      <h3 className={`text-xs font-bold leading-snug line-clamp-1 ${
                        isCharacter
                          ? 'text-[#1c1917] group-hover:text-[#991b1b]'
                          : isPuzzle
                            ? 'text-amber-200 group-hover:text-amber-100'
                            : 'text-emerald-200 group-hover:text-emerald-100'
                      }`}>
                        {act.title}
                      </h3>
                      <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                        isCharacter
                          ? 'text-[#5e4e3e]'
                          : isPuzzle
                            ? 'text-amber-300/70 font-mono'
                            : 'text-emerald-400/70 font-mono'
                      }`}>
                        {act.description}
                      </p>
                    </div>

                    <div className={`pt-2 border-t text-[9px] font-mono flex items-center justify-between uppercase ${
                      isCharacter
                        ? 'border-[#b8a688] text-[#786450]'
                        : isPuzzle
                          ? 'border-[#4a321d] text-amber-500'
                          : 'border-[#2c4738] text-emerald-500'
                    }`}>
                      <span>
                        {isCharacter
                          ? 'Hồ sơ nhân sự'
                          : isPuzzle
                            ? 'Tài liệu mật mã'
                            : 'Tang vật hiện trường'}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">▶ TIẾP CẬN</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
