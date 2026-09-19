import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { Search, X, Check, ShieldCheck, MapPin, Sparkles, Sliders, Box, Puzzle } from 'lucide-react';

export const EvidenceModal: React.FC = () => {
  const {
    activeEvidenceId,
    setActiveEvidence,
    caseData,
    collectedEvidenceIds,
    collectEvidence,
    setActivePuzzle,
    setActiveInspectableProp
  } = useGameStore();

  if (!activeEvidenceId) return null;

  const evidence = caseData.evidence.find(e => e.id === activeEvidenceId);
  if (!evidence) return null;

  const isCollected = collectedEvidenceIds.includes(evidence.id);

  const handleCollect = () => {
    collectEvidence(evidence.id);
    audioManager.playSfx('evidence');
    setActiveEvidence(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md pointer-events-auto animate-in zoom-in-95 duration-150 select-none">
      <div className="w-full max-w-lg manila-folder border-2 border-[#5c4632] rounded-lg shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Metal paperclip visual accent */}
        <div className="absolute top-2 left-8 w-4 h-10 border-2 border-stone-300 rounded-full opacity-60 pointer-events-none" />

        {/* Modal Header: Police Department Stamped Docket */}
        <div className="p-4 bg-[#120e0a] border-b-2 border-[#473523] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp stamp-red text-[10px]">
              VẬT CHỨNG #{evidence.id}
            </span>
            <span className="text-[10px] uppercase font-mono text-[#a89582] tracking-wider font-bold">
              [ {evidence.type} ]
            </span>
          </div>
          <button
            onClick={() => {
              audioManager.playSfx('click');
              setActiveEvidence(null);
            }}
            className="p-1 rounded bg-[#2e2116] hover:bg-[#423122] text-[#a89582] hover:text-white transition-colors cursor-pointer border border-[#523d2b]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Aged Docket Sheet */}
        <div className="p-5 space-y-3.5 font-typewriter dossier-sheet text-[#1c1917]">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded bg-[#ede5d4] border border-[#b8a688] flex items-center justify-center text-[#991b1b] shrink-0 shadow-sm">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-dossier-serif text-[#1a1c22] leading-tight">{evidence.name}</h2>
              <div className="flex items-center gap-1.5 text-[11px] text-[#635341] mt-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#991b1b]" />
                <span>Vị trí thu giữ: {caseData.locations.find(l => l.id === evidence.foundAt)?.name || evidence.foundAt}</span>
              </div>
            </div>
          </div>

          {/* Polaroid photo if available */}
          {evidence.id === 'EVD-12' && (
            <div className="my-2 flex justify-center">
              <div className="polaroid-card max-w-[240px] text-center">
                <img
                  src="/assets/images/evidence/cipher_desk.jpg"
                  alt="Ảnh chụp hiện trường"
                  className="w-full h-32 object-cover rounded-sm border border-stone-300"
                />
                <div className="text-[9px] font-mono text-stone-700 mt-2 font-bold tracking-wider uppercase">
                  Vật chứng #12 // Ghi chú lịch để bàn
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-[#3d2f21] leading-relaxed bg-[#fdfaf3] p-3 rounded border border-[#c4b59e] shadow-sm">
            {evidence.description}
          </p>

          <div className="p-3.5 rounded bg-[#f5ebd7] border-2 border-[#b8a688] space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#991b1b] uppercase font-mono">
                <ShieldCheck className="w-4 h-4 text-[#991b1b]" />
                KẾT LUẬN GIÁM ĐỊNH KỸ THUẬT HÌNH SỰ:
              </div>
              {isCollected && (
                <span className="rubber-stamp stamp-red text-[8px] py-0.5 px-1.5">
                  ĐÃ NIÊM PHONG
                </span>
              )}
            </div>
            <p className="text-xs text-[#1c1917] leading-relaxed select-text font-mono font-medium">
              {evidence.detail}
            </p>
          </div>

          {/* Contextual Forensic Minigame Trigger (Diegetic Investigation) */}
          {(evidence.id === 'EVD-HT-01' || evidence.id === 'EVD-HT-06') && (
            <div className="p-3.5 rounded bg-[#131d15] border-2 border-emerald-600/80 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 font-mono uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                THAO TÁC PHÁP Y: KÍNH HIỂN VI ĐỐI CHIẾU
              </div>
              <p className="text-[11px] font-typewriter text-emerald-100/90 leading-relaxed">
                Đặt mẫu vết hằn hoặc dây kim loại lên kính hiển vi quang học Leitz Wetzlar để so sánh độ trùng khớp vi vết.
              </p>
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  setActiveEvidence(null);
                  setActivePuzzle('puzzle-microscope');
                }}
                className="w-full py-2.5 px-3 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-101 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>🔬 ĐƯA VÀO KÍNH HIỂN VI ĐỐI CHIẾU VI VẾT</span>
              </button>
            </div>
          )}

          {evidence.id === 'EVD-HT-02' && (
            <div className="p-3.5 rounded bg-[#20150b] border-2 border-yellow-600/80 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-yellow-300 font-mono uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-yellow-400" />
                THỰC NGHIỆM ĐIỀU TRA: CƠ HỌC THEN CỬA PHÒNG KÍN
              </div>
              <p className="text-[11px] font-typewriter text-yellow-100/90 leading-relaxed">
                Tái lập cơ chế dùng sợi chỉ tơ tằm sáp luồn qua khe cửa 5mm để kéo then cài từ bên ngoài hành lang.
              </p>
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  setActiveEvidence(null);
                  setActivePuzzle('puzzle-cord-physics');
                }}
                className="w-full py-2.5 px-3 rounded bg-yellow-700 hover:bg-yellow-600 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-101 cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>⚙️ TIẾN HÀNH THỰC NGHIỆM KÉO THEN CÀI</span>
              </button>
            </div>
          )}

          {evidence.id === 'EVD-HT-03' && (
            <div className="p-3.5 rounded bg-[#2b1812] border-2 border-amber-600/80 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 font-mono uppercase tracking-wider">
                <Box className="w-4 h-4 text-amber-400" />
                GIÁM ĐỊNH 3D: QUÂN TƯỚNG NGÀ VOI
              </div>
              <p className="text-[11px] font-typewriter text-amber-100/90 leading-relaxed">
                Soi chiếu 360° quân cờ trên bàn xoay và kích hoạt tháo khớp cơ học để kiểm tra phần ruột rỗng bên trong.
              </p>
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  setActiveEvidence(null);
                  setActiveInspectableProp('ivory-chess');
                }}
                className="w-full py-2.5 px-3 rounded bg-amber-700 hover:bg-amber-600 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-101 cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>🔍 SOI CHIẾU VẬT THỂ 3D 360°</span>
              </button>
            </div>
          )}

          {evidence.id === 'EVD-HT-09' && (
            <div className="p-3.5 rounded bg-[#221308] border-2 border-amber-600/80 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 font-mono uppercase tracking-wider">
                <Puzzle className="w-4 h-4 text-amber-400" />
                MỞ KHÓA BÁT QUÁI: HỘC BÀN XƯỞNG KIM HOÀN
              </div>
              <p className="text-[11px] font-typewriter text-amber-100/90 leading-relaxed">
                Hộc bàn bị khóa bởi 3 vòng đồng Bát Quái. Căn cứ gợi ý thư pháp để xoay đúng quẻ Khảm - Ly - Chấn.
              </p>
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  setActiveEvidence(null);
                  setActivePuzzle('puzzle-trigrams');
                }}
                className="w-full py-2.5 px-3 rounded bg-amber-700 hover:bg-amber-600 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-101 cursor-pointer"
              >
                <Puzzle className="w-4 h-4" />
                <span>🧩 XOAY KHÓA ĐỒNG TÂM BÁT QUÁI</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-3.5 bg-[#120e0a] border-t-2 border-[#473523] flex items-center justify-between">
          <button
            onClick={() => setActiveEvidence(null)}
            className="px-3.5 py-2 rounded bg-[#2e2116] hover:bg-[#423122] text-xs font-bold text-[#a89582] hover:text-white transition-colors cursor-pointer font-typewriter border border-[#523d2b]"
          >
            ĐÓNG LẠI
          </button>

          {!isCollected ? (
            <button
              onClick={handleCollect}
              className="px-4 py-2 rounded bg-[#991b1b] hover:bg-[#b91c1c] text-xs font-bold text-white transition-all flex items-center gap-2 shadow-lg cursor-pointer font-typewriter uppercase tracking-wider"
            >
              <Check className="w-4 h-4" />
              LƯU VÀO HỒ SƠ TANG VẬT
            </button>
          ) : (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold bg-[#17261a] px-3 py-1.5 rounded border border-emerald-800">
              <Check className="w-4 h-4 text-emerald-400" />
              ĐÃ LƯU TRỮ VÀO SỔ TAY
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
