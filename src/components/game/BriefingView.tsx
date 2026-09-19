import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { Play, Square, Disc, Stamp, ArrowRight, Paperclip } from 'lucide-react';

export const BriefingView: React.FC = () => {
  const { caseData, setGameMode } = useGameStore();
  const [isPlayingTape, setIsPlayingTape] = useState<boolean>(false);

  const handleToggleTape = () => {
    if (!isPlayingTape) {
      audioManager.playSfx('dialogue');
      setIsPlayingTape(true);
    } else {
      audioManager.playSfx('click');
      setIsPlayingTape(false);
    }
  };

  const handleStartInvestigation = () => {
    audioManager.playSfx('stamp');
    setGameMode('location');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
      
      {/* 1. Cinematic Background: Detective Desk with Investigation Files */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/assets/images/scenes/title_desk_bg.jpg')" }}
      />
      
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* 2. Physical Investigation Docket File */}
      <div className="relative z-10 max-w-3xl w-full my-auto animate-in zoom-in-95 fade-in duration-300">
        <div className="dossier-sheet rounded-md p-6 sm:p-8 border-2 border-[#b09e80] shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative overflow-hidden">
          
          {/* Top Paperclip Visual Element */}
          <div className="absolute top-0 right-16 w-6 h-14 border-2 border-slate-600 rounded-b-full pointer-events-none z-20 shadow-sm flex items-center justify-center">
            <Paperclip className="w-4 h-4 text-slate-700 opacity-60" />
          </div>

          {/* Official Police Department Letterhead Header */}
          <div className="border-b-2 border-[#16181d]/20 pb-4 mb-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="space-y-0.5">
                <div className="text-[11px] font-typewriter font-bold tracking-widest text-[#242833] uppercase">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </div>
                <div className="text-[10px] font-serif italic text-[#4a5163]">
                  Độc lập - Tự do - Hạnh phúc
                </div>
                <div className="text-[11px] font-typewriter font-black text-red-900 tracking-wider pt-1 uppercase">
                  {caseData.id === 'case-ham-tu'
                    ? 'CÔNG AN TP. HỒ CHÍ MINH • CƠ QUAN CSĐT QUẬN 5 (CHỢ LỚN)'
                    : 'CÔNG AN TP. HỒ CHÍ MINH • CƠ QUAN CSĐT QUẬN 2'}
                </div>
                <div className="text-[10px] font-typewriter text-[#555d71]">
                  Số thụ lý: {caseData.docketNumber || '#507/CSHS-ĐT'} • Ngày lập hồ sơ: {caseData.id === 'case-ham-tu' ? '24/10/1989' : '18/09/2024'}
                </div>
              </div>

              {/* Rubber Stamps */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="rubber-stamp stamp-red text-xs font-black tracking-widest">
                  {caseData.id === 'case-ham-tu' ? 'TỐI MẬT • ÁN MẠNG PHÒNG KÍN' : 'TỐI MẬT - LƯU HÀNH NỘI BỘ'}
                </span>
                <span className="text-[10px] font-typewriter text-red-900 font-bold">
                  [ {caseData.subtitle.toUpperCase()} ]
                </span>
              </div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center my-3 pb-3 border-b border-[#16181d]/15">
            <h1 className="text-lg sm:text-xl font-bold font-dossier-serif tracking-wider text-[#16181d] uppercase">
              BIÊN BẢN TIẾP NHẬN TIN BÁO TỘI PHẠM & KHÁM NGHIỆM HIỆN TRƯỜNG
            </h1>
            <p className="text-xs font-typewriter text-[#474e61] mt-0.5">
              Vụ việc: {caseData.title} • {caseData.subtitle}
            </p>
          </div>

          {/* Main Case Content & Pinned Polaroid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-4">
            
            {/* Left 2 Cols: Case Summary & Metadata */}
            <div className="md:col-span-2 space-y-4 font-typewriter text-xs text-[#1f232c] leading-relaxed">
              
              {/* Vital Information Grid */}
              <div className="bg-[#ebdcc4] p-3.5 rounded border border-[#c4b395] space-y-1.5 shadow-inner">
                <div>
                  <span className="font-bold text-[#16181d]">NẠN NHÂN: </span>
                  <span className="font-mono text-red-950 font-semibold">
                    {caseData.victim?.name || 'Trần Minh Đức'} ({caseData.victim?.age || 38} tuổi) • {caseData.victim?.role || 'Giám đốc SaigonTech'}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#16181d]">HIỆN TRƯỜNG: </span>
                  <span>{caseData.locations[0]?.name}, {caseData.locations[0]?.subtitle}</span>
                </div>
                <div>
                  <span className="font-bold text-[#16181d]">THỜI ĐIỂM XẢY RA: </span>
                  <span className="text-red-900 font-bold">
                    {caseData.timeline[0]?.time || 'Ban đêm'} (Thời điểm phát hiện đầu tiên)
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#16181d]">ĐƠN VỊ BÁO ÁN: </span>
                  <span>{caseData.timeline[0]?.source || 'Cơ quan CSĐT Hình sự Công an TP'}</span>
                </div>
              </div>

              {/* Interactive Cassette Recorder Widget */}
              <div className="cassette-deck p-4 rounded-md text-slate-200 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${isPlayingTape ? 'bg-red-500 animate-ping' : 'bg-red-900'}`} />
                    <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase font-bold">
                      SONY TCM-7 // BĂNG GHI ÂM TỔNG ĐÀI ĐIỀU TRA
                    </span>
                  </div>
                  <button
                    onClick={handleToggleTape}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-600"
                  >
                    {isPlayingTape ? (
                      <>
                        <Square className="w-3 h-3 fill-current text-red-400" />
                        <span>TẠM DỪNG</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current text-emerald-400" />
                        <span>BẬT BĂNG GHI ÂM</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Cassette Tape Visualizer */}
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-center gap-6">
                  <Disc className={`w-6 h-6 text-slate-500 ${isPlayingTape ? 'spin-slow text-amber-400' : ''}`} />
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-amber-500 transition-all ${isPlayingTape ? 'w-3/4 animate-pulse' : 'w-1/4'}`} />
                  </div>
                  <Disc className={`w-6 h-6 text-slate-500 ${isPlayingTape ? 'spin-slow text-amber-400' : ''}`} />
                </div>

                {/* Tape Dispatch Transcript */}
                <div className="p-3 bg-slate-950/80 rounded border border-slate-800/80 text-[11px] font-typewriter text-slate-300 italic leading-relaxed select-text border-l-2 border-l-amber-500">
                  "{caseData.briefing}"
                </div>
              </div>

            </div>

            {/* Right 1 Col: Pinned Polaroid Crime Scene Photo */}
            <div className="flex flex-col items-center justify-start space-y-3">
              <div className="polaroid-card w-full max-w-[220px] text-center transform rotate-1 hover:rotate-0 transition-transform">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-slate-900 border border-slate-300">
                  <img
                    src={caseData.id === 'case-ham-tu' ? "/assets/images/scenes/hamtu_floor2_study.jpg" : (caseData.locations[0]?.has3DScene ? "/assets/images/scenes/apt507_bg.jpg" : "/assets/images/scenes/security_desk_bg.jpg")}
                    alt={caseData.locations[0]?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 px-1 py-0.5 bg-red-700 text-white text-[8px] font-mono font-bold uppercase rounded">
                    HỒ SƠ {caseData.docketNumber || '#CSDT'}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-typewriter font-bold text-slate-800 leading-tight truncate">
                  {caseData.locations[0]?.name}
                </div>
                <div className="text-[9px] font-mono text-red-700 truncate">
                  {caseData.locations[0]?.subtitle}
                </div>
              </div>

              <div className="p-2.5 bg-[#ebdcc4] rounded border border-[#c4b395] text-[10px] font-typewriter text-[#373d4d] space-y-1 w-full max-w-[220px]">
                <div className="font-bold text-red-950 uppercase">Ghi chú điều tra viên:</div>
                <p className="italic leading-relaxed">
                  {caseData.id === 'case-ham-tu'
                    ? '"Kiểm tra hiện trường thư phòng tầng 2 Bến Hàm Tử. Giám định tử thi, cơ chế then cài đồng, bàn cờ Tướng ngà voi rỗng ruột và đưa các mẫu dây vi vết vào kính hiển vi so sánh."'
                    : `"Kiểm tra hiện trường ${caseData.locations[0]?.name}. Thẩm vấn các đối tượng liên quan và truy vết các dấu hiệu của tổ chức Người Giữ Sổ."`}
                </p>
              </div>
            </div>

          </div>

          {/* Footer Dispatch Stamp Action Button */}
          <div className="border-t-2 border-[#16181d]/20 pt-4 mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[10px] font-typewriter text-[#484f63] italic">
              * Bấm thụ lý để bắt đầu quy trình khám nghiệm hiện trường và thu thập chứng cứ.
            </div>

            <button
              onClick={handleStartInvestigation}
              className="py-3 px-6 rounded bg-[#8a1c1c] hover:bg-[#a12222] text-[#fbf6ec] font-typewriter font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-950/40 flex items-center gap-3 cursor-pointer hover:scale-[1.02] border border-red-950 group"
            >
              <Stamp className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>ĐÓNG DẤU TIẾP NHẬN & XUẤT PHÁT ĐẾN HIỆN TRƯỜNG</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
