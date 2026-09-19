import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { X, CheckCircle2, RotateCw } from 'lucide-react';

export const CipherPuzzleModal: React.FC = () => {
  const {
    activePuzzleId,
    setActivePuzzle,
    solvePuzzle
  } = useGameStore();

  const [shift, setShift] = useState<number>(0);
  const [selectedInterpretation, setSelectedInterpretation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const CIPHER_TEXT = 'NJOI QIBU';

  const applyCaesar = (str: string, offset: number): string => {
    return str.split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        const code = char.charCodeAt(0) - 65;
        const shifted = (code + offset + 26) % 26;
        return String.fromCharCode(shifted + 65);
      }
      return char;
    }).join('');
  };

  const currentDecoded = applyCaesar(CIPHER_TEXT, shift);

  if (activePuzzleId !== 'cipher-paper') return null;

  const handleShiftChange = (delta: number) => {
    audioManager.playSfx('click');
    setErrorMsg(null);
    setShift(prev => {
      let next = prev + delta;
      if (next > 12) next = -12;
      if (next < -12) next = 12;
      return next;
    });
  };

  const handleVerify = () => {
    if (currentDecoded !== 'MINH PHAT') {
      audioManager.playSfx('click');
      setErrorMsg('Từ ngữ giải mã chưa khớp với tiếng Việt hoặc manh mối vụ án. Hãy xem lại ghi chú trên bàn!');
      return;
    }

    if (selectedInterpretation !== 'shell_corp') {
      audioManager.playSfx('click');
      setErrorMsg('Bạn đã xoay ra cụm từ "MINH PHAT", nhưng cần xác định đúng ý nghĩa của cái tên này!');
      return;
    }

    setIsSuccess(true);
    audioManager.playSfx('puzzle_solve');
    solvePuzzle('cipher-paper');
    setTimeout(() => {
      setActivePuzzle(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md pointer-events-auto animate-in zoom-in-95 duration-150 select-none">
      <div className="w-full max-w-2xl manila-folder border-2 border-[#5c4632] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Left: Forensic Photo of Desk Clue on Wooden Table */}
        <div className="md:w-1/2 bg-[#120e0a] p-4 border-b md:border-b-0 md:border-r border-[#3d2f21] flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rubber-stamp stamp-amber text-[9px]">TANG VẬT #12</span>
              <span className="text-[10px] font-mono text-[#a89582] uppercase tracking-wider font-bold">
                BÀN LÀM VIỆC NẠN NHÂN
              </span>
            </div>
            <p className="text-[10px] font-typewriter text-[#8a7663] leading-relaxed">
              Mẩu giấy rách kẹp cạnh cuốn lịch bàn của nạn nhân Trần Minh Đức tại căn hộ 507.
            </p>
          </div>

          {/* Polaroid Card with Clip */}
          <div className="relative my-1">
            <div className="absolute -top-3 left-4 w-4 h-9 border-2 border-stone-300 rounded-full bg-stone-100/10 shadow-md pointer-events-none z-10" />
            <div className="polaroid-card text-center">
              <img
                src="/assets/images/evidence/cipher_desk.jpg"
                alt="Mật mã trên bàn nạn nhân"
                className="w-full aspect-[4/3] object-cover rounded-sm border border-stone-300"
              />
              <div className="text-[9px] font-mono text-stone-700 mt-2 font-bold tracking-wider uppercase">
                Hiện trường Căn hộ 507 // Mẩu giấy #12
              </div>
            </div>
          </div>

          {/* Authentic Yellow Sticky Note with pencil scribbles */}
          <div className="p-3 bg-[#fef08a] rounded shadow border-t-2 border-[#ca8a04] text-[#713f12] font-mono text-xs space-y-1 rotate-[-1deg]">
            <div className="font-bold flex items-center gap-1.5 text-[11px] text-[#854d0e]">
              <span>📝 Gợi ý viết tay trên lịch bàn:</span>
            </div>
            <p className="italic font-serif text-[12px] leading-snug">
              "Passcode formula = Floor number minus 4"
            </p>
            <p className="text-[10px] text-[#a16207]">
              (Căn hộ 507 thuộc <span className="font-bold underline">Tầng 5</span> ➔ 5 - 4 = <span className="font-bold">+1 bước</span>).
            </p>
          </div>
        </div>

        {/* Right: Interactive Deduction & Mechanical Cipher Alignment */}
        <div className="md:w-1/2 p-5 dossier-sheet flex flex-col justify-between space-y-3.5 font-typewriter">
          
          <div className="flex items-center justify-between border-b-2 border-[#8a7663] pb-2">
            <div className="space-y-0.5">
              <span className="rubber-stamp stamp-red text-[9px]">MẬT MÃ CAESAR</span>
              <h2 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider font-dossier-serif">
                BÀN GIẢI MÃ KÝ TỰ [NJOI QIBU]
              </h2>
            </div>
            <button
              onClick={() => setActivePuzzle(null)}
              className="p-1 rounded bg-[#cfc2ab] hover:bg-[#bfae94] text-[#3b2e21] hover:text-black border border-[#8a7663] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cipher Shift Dial Controls */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#423324] font-bold">
              <span>BƯỚC DỊCH CHUYỂN (OFFSET):</span>
              <span className="rubber-stamp stamp-amber text-[10px] py-0.5 px-2">
                {shift > 0 ? `+${shift}` : shift} BƯỚC
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleShiftChange(-1)}
                className="flex-1 py-2 rounded bg-[#ded2bc] hover:bg-[#cfc0a6] text-[#241c14] font-bold text-xs border border-[#8a7663] shadow-sm transition-colors cursor-pointer"
              >
                ◀ LÙI 1 BƯỚC (-1)
              </button>
              <button
                onClick={() => handleShiftChange(1)}
                className="flex-1 py-2 rounded bg-[#ded2bc] hover:bg-[#cfc0a6] text-[#241c14] font-bold text-xs border border-[#8a7663] shadow-sm transition-colors cursor-pointer"
              >
                TIẾN 1 BƯỚC (+1) ▶
              </button>
            </div>
          </div>

          {/* Decoded Word Display in Typewritten Parchment */}
          <div className="p-3 rounded bg-[#fdfaf3] border-2 border-[#9c8973] text-center space-y-1 shadow-inner">
            <span className="text-[9px] font-mono text-[#7a6754] uppercase tracking-widest block font-bold">
              VĂN BẢN SAU KHI DỊCH KÝ TỰ:
            </span>
            <div className="text-xl font-mono font-black tracking-widest text-[#1c1917] select-all">
              {currentDecoded}
            </div>
          </div>

          {/* Meaning Deduction (Required to solve, prevents spamming) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#594736] uppercase tracking-wider block font-bold">
              SUY LUẬN: CỤM TỪ NÀY MANG Ý NGHĨA GÌ?
            </span>

            <div className="space-y-1.5">
              {[
                { id: 'lover', text: 'Tên bạn gái bí mật của nạn nhân' },
                { id: 'shell_corp', text: 'Công ty bình phong (Minh Phát Holdings) trong hồ sơ rửa tiền' },
                { id: 'condo_name', text: 'Tên gọi cũ của tòa chung cư Riviera' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    audioManager.playSfx('click');
                    setSelectedInterpretation(opt.id);
                    setErrorMsg(null);
                  }}
                  className={`w-full text-left p-2 rounded text-xs font-semibold transition-all border cursor-pointer ${
                    selectedInterpretation === opt.id
                      ? 'bg-[#d6c7b0] border-[#991b1b] text-[#1a1c22] shadow-sm font-bold'
                      : 'bg-[#faf6ee] border-[#b8a688] text-[#423324] hover:bg-[#f2ecdd]'
                  }`}
                >
                  <span className="font-mono text-[#991b1b] mr-1.5 font-bold">
                    {selectedInterpretation === opt.id ? '[✓]' : '[ ]'}
                  </span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          {/* Error / Success Feedback */}
          {errorMsg && (
            <div className="p-2 rounded bg-red-100 border border-red-600 text-[10px] text-red-900 font-mono font-bold">
              ⚠ {errorMsg}
            </div>
          )}

          {isSuccess && (
            <div className="p-2 rounded bg-emerald-100 border border-emerald-700 text-xs text-emerald-900 font-mono font-bold flex items-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Chính xác! "MINH PHÁT" chính là pháp nhân ma che giấu dòng tiền!</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-1">
            <button
              onClick={handleVerify}
              disabled={isSuccess}
              className="w-full py-2.5 rounded bg-[#991b1b] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 cursor-pointer font-typewriter"
            >
              <RotateCw className="w-4 h-4" />
              <span>XÁC NHẬN LỜI GIẢI THÁM TỬ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
