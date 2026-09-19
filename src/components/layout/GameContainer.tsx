import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameHeader } from './GameHeader';
import { TitleScreen } from '../game/TitleScreen';
import { BriefingView } from '../game/BriefingView';
import { CityMapView } from '../game/CityMapView';
import { LocationView } from '../game/LocationView';
import { NotebookDrawer } from '../game/NotebookDrawer';
import { DialogueOverlay } from '../game/DialogueOverlay';
import { EvidenceModal } from '../game/EvidenceModal';
import { CipherPuzzleModal } from '../game/CipherPuzzleModal';
import { AccusationModal } from '../game/AccusationModal';
import { ResultModal } from '../game/ResultModal';

// Three.js, Pixi.js, and Phaser Modals
import { Inspectable3DModelModal } from '../../three/Inspectable3DModelModal';
import { MicroscopeTraceComparator } from '../../pixi/MicroscopeTraceComparator';
import { EightTrigramsLockbox } from '../../pixi/EightTrigramsLockbox';
import { LockedRoomCordPhysics } from '../../pixi/LockedRoomCordPhysics';
import { TimelineDeductionModal } from '../game/TimelineDeductionModal';
import { BuildingBlueprintModal } from '../game/BuildingBlueprintModal';

export const GameContainer: React.FC = () => {
  const {
    gameMode,
    activePuzzleId,
    setActivePuzzle,
    activeInspectablePropId,
    setActiveInspectableProp
  } = useGameStore();

  const [isAccusationOpen, setIsAccusationOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePuzzleId) setActivePuzzle(null);
        if (activeInspectablePropId) setActiveInspectableProp(null);
        if (isAccusationOpen) setIsAccusationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePuzzleId, activeInspectablePropId, isAccusationOpen, setActivePuzzle, setActiveInspectableProp]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#080604] text-[#dfd2ba] select-none">
      
      {/* 1. Canvas / Visual Game World (Z-Index 1) */}
      <main className="absolute inset-0 z-[1] pointer-events-auto">
        {gameMode === 'title' && <TitleScreen />}
        {gameMode === 'briefing' && <BriefingView />}
        {gameMode === 'map' && <CityMapView />}
        {gameMode === 'location' && <LocationView />}
      </main>

      {/* 2. Hybrid DOM Overlay Layer (Z-Index 10) */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        
        {/* In-Game Tactical HUD (Active during Map and Location inspection) */}
        {(gameMode === 'map' || gameMode === 'location') && (
          <GameHeader onOpenAccusation={() => setIsAccusationOpen(true)} />
        )}

        {/* Tactical Notebook Drawer */}
        <NotebookDrawer />

        {/* Ink Dialogue Interaction Overlay */}
        <DialogueOverlay />

        {/* Evidence Inspection Modal */}
        <EvidenceModal />

        {/* Legacy Cipher Paper Puzzle (Case 001) */}
        <CipherPuzzleModal />

        {/* 3D Inspectable Prop Modal (Three.js 360 Object Inspection) */}
        {activeInspectablePropId && (
          <Inspectable3DModelModal
            propId={activeInspectablePropId}
            onClose={() => setActiveInspectableProp(null)}
          />
        )}

        {/* Optical Microscope Trace Comparator (Pixi.js) */}
        {activePuzzleId === 'puzzle-microscope' && (
          <MicroscopeTraceComparator
            onClose={() => setActivePuzzle(null)}
          />
        )}

        {/* Eight Trigrams Brass Lockbox (Pixi.js) */}
        {activePuzzleId === 'puzzle-trigrams' && (
          <EightTrigramsLockbox
            onClose={() => setActivePuzzle(null)}
          />
        )}

        {/* Locked Room Cord Physics Simulator (Pixi.js) */}
        {activePuzzleId === 'puzzle-cord-physics' && (
          <LockedRoomCordPhysics
            onClose={() => setActivePuzzle(null)}
          />
        )}

        {/* Timeline Deduction Matrix Modal (Golden Idol Loop) */}
        <TimelineDeductionModal
          isOpen={activePuzzleId === 'puzzle-timeline'}
          onClose={() => setActivePuzzle(null)}
        />

        {/* Building 3-Floor Architectural Blueprint Cross-Section (Phaser 3) */}
        <BuildingBlueprintModal
          isOpen={activePuzzleId === 'building-blueprint'}
          onClose={() => setActivePuzzle(null)}
        />

        {/* Accusation & Case Conclusion Modal */}
        <AccusationModal
          isOpen={isAccusationOpen}
          onClose={() => setIsAccusationOpen(false)}
        />

        {/* Final Result / Evaluation Modal */}
        <ResultModal />
      </div>
    </div>
  );
};
