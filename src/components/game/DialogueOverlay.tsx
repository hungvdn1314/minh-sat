import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { InkStoryEngine, DialogueState } from '../../ink/InkStoryEngine';
import { audioManager } from '../../audio/AudioManager';
import {
  X,
  ChevronRight,
  Briefcase,
  Play,
  AlertTriangle
} from 'lucide-react';

export const DialogueOverlay: React.FC = () => {
  const {
    activeCharacterId,
    setActiveCharacter,
    caseData,
    collectedEvidenceIds
  } = useGameStore();

  const [engine, setEngine] = useState<InkStoryEngine | null>(null);
  const [dialogueState, setDialogueState] = useState<DialogueState | null>(null);
  const [dialoguePhase, setDialoguePhase] = useState<'SELECTING' | 'SPEAKING'>('SELECTING');
  const [askedChoiceIds, setAskedChoiceIds] = useState<string[]>([]);
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [confrontationNotice, setConfrontationNotice] = useState<string | null>(null);

  const character = caseData.characters.find(c => c.id === activeCharacterId);

  useEffect(() => {
    if (!activeCharacterId) {
      setEngine(null);
      setDialogueState(null);
      setShowEvidenceDrawer(false);
      setDialoguePhase('SELECTING');
      setConfrontationNotice(null);
      return;
    }

    const variables: Record<string, boolean> = {};
    collectedEvidenceIds.forEach(id => {
      variables[`has_${id.toLowerCase().replace(/-/g, '')}`] = true;
      variables[`has_${id.toLowerCase().replace('-', '')}`] = true;
    });

    const newEngine = new InkStoryEngine(activeCharacterId, variables);
    setEngine(newEngine);
    setDialogueState(newEngine.getDialogueState());
    setDialoguePhase('SELECTING');
  }, [activeCharacterId, collectedEvidenceIds]);

  const handleAdvance = useCallback(() => {
    if (dialoguePhase === 'SPEAKING') {
      audioManager.playSfx('click');
      setDialoguePhase('SELECTING');
      setConfrontationNotice(null);
    }
  }, [dialoguePhase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (dialoguePhase === 'SPEAKING') {
          e.preventDefault();
          handleAdvance();
        }
      } else if (e.code === 'Escape') {
        if (showEvidenceDrawer) {
          setShowEvidenceDrawer(false);
        } else if (dialoguePhase === 'SELECTING') {
          setActiveCharacter(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialoguePhase, showEvidenceDrawer, handleAdvance, setActiveCharacter]);

  if (!activeCharacterId || !character || !dialogueState) return null;

  const triggerImpact = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleChoice = (targetKnot: string, choiceId: string) => {
    if (!engine) return;
    audioManager.playSfx('click');
    setAskedChoiceIds(prev => prev.includes(choiceId) ? prev : [...prev, choiceId]);
    const nextState = engine.choose(targetKnot);
    setDialogueState({ ...nextState });
    setDialoguePhase('SPEAKING');
    if (nextState.currentLine?.tags.composureDelta && nextState.currentLine.tags.composureDelta < 0) {
      triggerImpact();
    }
  };

  const handlePresentEvidence = (evidenceId: string) => {
    if (!engine) return;
    audioManager.playSfx('stamp');
    setShowEvidenceDrawer(false);
    triggerImpact();

    const ev = caseData.evidence.find(e => e.id === evidenceId);
    setConfrontationNotice(`Đối chất vật chứng: [${evidenceId}] ${ev?.name || ''}`);

    const nextState = engine.presentEvidence(evidenceId);
    setDialogueState({ ...nextState });
    setDialoguePhase('SPEAKING');
  };

  const collectedEvidenceList = caseData.evidence.filter(e => collectedEvidenceIds.includes(e.id));

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md pointer-events-auto animate-in fade-in duration-200 select-none">
      <div
        className={`w-full max-w-4xl manila-folder border-2 border-[#5c4632] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row transition-transform ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        {/* Left Side: Suspect File Docket, Polaroid Mugshot & Psychological Composure Gauge */}
        <div className="md:w-5/12 bg-[#14100b] border-b md:border-b-0 md:border-r border-[#3d2f21] p-5 flex flex-col justify-between relative space-y-4">
          
          {/* Header Tag & Suspect Status */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="rubber-stamp stamp-amber text-[9px] py-0.5 px-2">
                HỒ SƠ ĐỐI TƯỢNG
              </span>
              <span className="rubber-stamp stamp-red text-[9px] py-0.5 px-2">
                {dialogueState.currentLine?.tags.emotion || 'BÌNH THẢN'}
              </span>
            </div>

            {/* Suspect Psychological Composure Gauge (Authentic Mechanical / Inked Tracker) */}
            <div className="bg-[#221a12] border-2 border-[#523e2b] rounded-sm p-3 space-y-2 text-[#e8ded0] shadow-md">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="uppercase text-amber-400 font-bold tracking-wider">
                  ÁP LỰC TÂM LÝ:
                </span>
                <span className="font-bold font-mono text-red-400 tracking-wider">
                  {100 - dialogueState.composure}% BẤT AN
                </span>
              </div>

              {/* Mechanical ink gauge track */}
              <div className="w-full h-3 bg-[#100c08] rounded-sm overflow-hidden border border-[#523e2b] p-0.5">
                <div
                  className={`h-full transition-all duration-500 rounded-xs ${
                    dialogueState.composure > 60
                      ? 'bg-amber-600'
                      : dialogueState.composure > 25
                      ? 'bg-orange-600'
                      : 'bg-red-700 animate-pulse'
                  }`}
                  style={{ width: `${100 - dialogueState.composure}%` }}
                />
              </div>

              <div className="flex justify-between text-[8px] font-mono text-[#a3907c] tracking-tight">
                <span>[VỮNG VÀNG]</span>
                <span>[DAO ĐỘNG]</span>
                <span>[SỤP ĐỔ]</span>
              </div>
            </div>
          </div>

          {/* Polaroid Suspect Mugshot with Metal Paperclip */}
          <div className="relative my-2 w-full max-w-[230px] mx-auto">
            {/* Metal Paperclip Graphic */}
            <div className="absolute -top-3 left-6 w-4 h-9 border-2 border-stone-400 rounded-full bg-stone-100/10 shadow-md pointer-events-none z-10" />

            <div className="polaroid-card">
              <div className="w-full aspect-[4/5] overflow-hidden bg-stone-900 border border-stone-300 relative">
                <img
                  src={dialogueState.currentPortrait}
                  alt={character.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/images/characters/son_neutral.jpg';
                  }}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="text-center mt-2.5 space-y-0.5">
                <h2 className="text-sm font-bold text-stone-900 font-dossier-serif leading-tight">
                  {character.name}
                </h2>
                <p className="text-[10px] font-mono text-stone-600 uppercase font-bold tracking-wider">
                  {character.role} • {character.age} TUỔI
                </p>
              </div>
            </div>
          </div>

          {/* Action: Present Evidence Envelope Button */}
          <button
            onClick={() => {
              audioManager.playSfx('click');
              setShowEvidenceDrawer(!showEvidenceDrawer);
            }}
            disabled={dialoguePhase === 'SPEAKING'}
            className={`w-full py-2.5 px-3 rounded-sm font-typewriter text-xs font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all border-2 ${
              dialoguePhase === 'SPEAKING'
                ? 'bg-[#1a140e] text-[#6b5845] cursor-not-allowed border-[#3d3023]'
                : 'bg-[#2b1812] hover:bg-[#3d2018] text-[#fbf6ec] border-[#8a2424] hover:scale-102 cursor-pointer shadow-red-950/60'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>MỞ TÚI TANG VẬT ĐỐI CHẤT</span>
          </button>
        </div>

        {/* Right Side: Typewritten Official Police Interrogation Docket Sheet */}
        <div className="md:w-7/12 flex flex-col justify-between dossier-sheet p-6 space-y-4 font-typewriter">
          
          {/* Police Official Letterhead */}
          <div className="border-b-2 border-[#8a7663] pb-3 flex items-start justify-between">
            <div className="space-y-0.5 text-left">
              <div className="text-[9px] font-mono uppercase tracking-widest text-[#594736] font-bold">
                CÔNG AN TP. HỒ CHÍ MINH — PHÒNG CẢNH SÁT HÌNH SỰ
              </div>
              <div className="text-sm font-bold font-dossier-serif text-[#1c1917] uppercase tracking-wide">
                BIÊN BẢN LẤY LỜI KHAI HÌNH SỰ
              </div>
              <div className="text-[10px] text-[#735e4b] font-mono">
                Số thụ lý: {caseData.docketNumber || '#507/CSHS-ĐT'} • Vụ án: {caseData.title}
              </div>
            </div>

            <button
              onClick={() => {
                audioManager.playSfx('click');
                setActiveCharacter(null);
              }}
              className="p-1.5 rounded bg-[#cfc2ab] hover:bg-[#bfae94] text-[#3b2e21] hover:text-black transition-colors cursor-pointer border border-[#8a7663]"
              title="Tạm dừng hỏi cung"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Speech Text Content in Typewriter Paper Frame */}
          <div className="flex-1 min-h-[160px] p-4.5 rounded bg-[#fdfaf3] border-2 border-[#b8a688] flex flex-col justify-between select-text shadow-inner relative text-[#1c1917]">
            {confrontationNotice && (
              <div className="mb-2.5 px-3 py-1.5 rounded bg-red-100 border border-red-600 text-red-800 text-xs font-mono font-bold flex items-center gap-2 animate-in fade-in">
                <AlertTriangle className="w-3.5 h-3.5 text-red-700 shrink-0" />
                <span>{confrontationNotice}</span>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rubber-stamp stamp-red text-[9px] py-0.5 px-1.5">
                  LỜI KHAI
                </span>
                <span className="text-xs font-bold text-[#1c1917] uppercase font-mono">
                  {character.name}:
                </span>
              </div>
              <p className="text-sm sm:text-base font-dossier-serif text-[#1a1c22] leading-relaxed italic pl-2 border-l-2 border-[#991b1b]/40">
                "{dialogueState.currentLine?.text}"
              </p>
            </div>

            {/* SPEAKING PHASE: Blinking Advance Button */}
            {dialoguePhase === 'SPEAKING' && (
              <div className="pt-3 flex items-center justify-between border-t border-[#d6c7b0] mt-3">
                <span className="text-[10px] text-[#7a6754] font-mono">
                  [ Nhấn Space hoặc click để ghi tiếp lời khai ]
                </span>
                <button
                  onClick={handleAdvance}
                  className="px-4 py-2 rounded bg-[#991b1b] hover:bg-[#b91c1c] text-white text-xs font-typewriter font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  <span>GHI TIẾP LỜI KHAI ▶</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            )}
          </div>

          {/* Evidence Confrontation Drawer */}
          {showEvidenceDrawer ? (
            <div className="p-3.5 rounded bg-[#ebe2cf] border-2 border-[#991b1b] space-y-2.5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between text-xs font-typewriter text-[#991b1b] font-bold uppercase">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  CHỌN TANG VẬT ĐỂ PHẢN BÁC LỜI KHAI GIAN DỐI:
                </span>
                <button
                  onClick={() => setShowEvidenceDrawer(false)}
                  className="text-[#635341] hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {collectedEvidenceList.length === 0 ? (
                <p className="text-xs text-[#735e4b] italic py-2">
                  Chưa thu thập được tang vật nào từ hiện trường để đối chất!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {collectedEvidenceList.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => handlePresentEvidence(ev.id)}
                      className="text-left p-2.5 rounded bg-[#fdfbf7] hover:bg-red-50 border border-[#b8a688] hover:border-red-600 text-xs text-[#1c1917] transition-all flex items-start gap-2 group cursor-pointer shadow-sm"
                    >
                      <span className="font-mono text-[#991b1b] font-bold shrink-0">[{ev.id}]</span>
                      <span className="group-hover:text-red-900 font-semibold line-clamp-2">{ev.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* SELECTING PHASE: Questions Decision Tree */
            dialoguePhase === 'SELECTING' && (
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#635341] font-bold border-b border-[#b8a688] pb-1.5">
                  <span>DANH MỤC CÂU HỎI THẨM TRA HÌNH SỰ:</span>
                  <span className="text-[#8c7a65]">Chọn 1 điều khoản để tra xét</span>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {dialogueState.choices.map((choice, idx) => {
                    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
                    const roman = romanNumerals[idx] || `${idx + 1}`;
                    const isAsked = askedChoiceIds.includes(choice.id);
                    return (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice.targetKnot, choice.id)}
                        className={`w-full text-left p-3 rounded-sm border-2 transition-all flex items-center justify-between group shadow-sm cursor-pointer ${
                          isAsked
                            ? 'bg-[#d9ccb4]/60 border-[#b8a688] text-[#735e4b] hover:bg-[#cfc0a6]'
                            : 'bg-[#fcfaf5] hover:bg-[#f5eedd] border-[#8a7663] hover:border-[#991b1b] text-[#1c1917]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-xs font-bold uppercase tracking-wider border shrink-0 ${
                            isAsked
                              ? 'bg-[#c4b59c] text-[#5e4c3a] border-[#a3927a]'
                              : 'bg-[#1c1917] text-[#f2ecdc] border-black'
                          }`}>
                            {isAsked ? 'ĐÃ THẨM TRA' : `ĐIỀU ${roman}`}
                          </span>
                          <span className={`text-xs font-bold leading-snug ${isAsked ? 'line-through text-[#735e4b]' : 'text-[#1c1917]'}`}>
                            {choice.text}
                          </span>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isAsked ? 'text-[#8c7a65]' : 'text-[#991b1b] group-hover:translate-x-1'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Exit Dialogue Action */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      audioManager.playSfx('click');
                      setActiveCharacter(null);
                    }}
                    className="px-3 py-1.5 rounded bg-[#d4c7b0] hover:bg-[#c2b399] text-[#423324] hover:text-black text-[11px] font-typewriter font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#8a7663]"
                  >
                    <span>TẠM HOÃN BUỔI HỎI CUNG</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          )}

          {/* Footer status */}
          <div className="pt-1 text-center text-[9px] font-mono text-[#735e4b] border-t border-[#8a7663]/50">
            [ Biên bản được sao lưu trực tiếp vào cơ sở dữ liệu hồ sơ vụ án ]
          </div>
        </div>
      </div>
    </div>
  );
};
