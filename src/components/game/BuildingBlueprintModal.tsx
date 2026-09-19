import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../audio/AudioManager';
import { X, Compass, AlertTriangle, ArrowRight, MapPin, Eye } from 'lucide-react';

interface BuildingBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FloorDetail {
  id: string;
  name: string;
  altitude: string;
  role: string;
  image: string;
  clues: string[];
  suspects: string[];
  tacticalNote?: string;
  isCrimeScene?: boolean;
}

const FLOORS: FloorDetail[] = [
  {
    id: 'loc-hamtu-floor2',
    name: 'TẦNG 2: THƯ PHÒNG ÁN MẠNG',
    altitude: '+6.80m',
    role: 'HIỆN TRƯỜNG PHÒNG KÍN BẤT KHẢ XÂM PHẠM',
    image: '/assets/images/scenes/hamtu_floor2_study.jpg',
    clues: [
      'Cửa gỗ lim then cài đồng khóa chặt từ bên trong',
      'Bàn cờ Tướng ngà voi thiếu quân Hắc Tướng',
      'Máy cassette Sony TCM-7 hẹn giờ trên bàn thờ'
    ],
    suspects: ['Lương Vĩnh Phát (Tử vong 20h45)', 'Trịnh Mỹ Lan (Bưng trà 21h15)'],
    tacticalNote: 'Then cài chốt ngang dính xơ chỉ sáp vàng 0.8mm luồn qua khe sàn 5mm.',
    isCrimeScene: true
  },
  {
    id: 'loc-hamtu-floor1',
    name: 'TẦNG LỬNG: XƯỞNG KIM HOÀN & LÒ PHÂN KIM',
    altitude: '+3.40m',
    role: 'NƠI CHẾ TÁC VÀNG LÁ & KHO HÓA CHẤT',
    image: '/assets/images/scenes/hamtu_floor1_workshop.jpg',
    clues: [
      'Bàn cưa lọng số 0 kẹp vụn ngà voi hữu cơ',
      'Hộc bàn bí mật khóa cơ khí Bát Quái 3 vòng',
      'Kệ hóa chất axit nitric & sọt rác chứa di chúc rách'
    ],
    suspects: ['Lương Gia Tuấn (Kiểm kê bạc vụn)', 'Thợ Chín (Ra vào xưởng)'],
    tacticalNote: 'Lò phân kim vẫn còn ấm tro; vệt mực tím trên bàn trùng khớp ngón tay Tuấn.'
  },
  {
    id: 'loc-hamtu-ground',
    name: 'TẦNG TRỆT: QUẦY GIAO DỊCH & BẾN HÀM TỬ',
    altitude: '±0.00m',
    role: 'CỬA HÀNG VÀNG & BỜ KÈ KÊNH TÀU HỦ',
    image: '/assets/images/scenes/hamtu_ground_dock.jpg',
    clues: [
      'Lồng sắt bảo vệ & sổ thu chi ngoại tệ',
      'Xe Peugeot 50cc biển SG 14-89 ống pô nóng 52°C',
      'Thùng gỗ nhập khẩu hàng hải & cửa hậu ra bến sông'
    ],
    suspects: ['Thợ Chín (Dưới gầm cầu thang)', 'Trần Quốc Đại (Đậu xe ngoài bến)'],
    tacticalNote: '⚠️ BẬC SỐ 5 MỌT GỖ: Ai bước lên cũng phát tiếng cọt kẹt vang vọng ban đêm!'
  }
];

export const BuildingBlueprintModal: React.FC<BuildingBlueprintModalProps> = ({
  isOpen,
  onClose
}) => {
  const { moveToLocation, currentLocationId } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectFloor = (floorId: string) => {
    audioManager.playSfx('click');
    moveToLocation(floorId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none pointer-events-auto">
      <div className="relative w-full max-w-5xl bg-[#09131f] border-2 border-[#38bdf8] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header: Vintage Blueprint Stamp */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#082238] border-b-2 border-[#0284c7] text-sky-200">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp stamp-amber text-[9px] py-0.5 px-2 font-bold">
              BẢN VẼ HOÀN CÔNG 1989
            </span>
            <div>
              <h2 className="text-base font-bold font-dossier-serif text-sky-100 leading-none">
                Sơ Đồ Mặt Cắt Không Gian 3 Tầng // Tiệm Kim Hoàn Vạn Lợi
              </h2>
              <p className="text-[10px] font-mono text-sky-300 uppercase tracking-wider mt-1">
                SỐ 14 BẾN HÀM TỬ // QUẬN 5 // ĐÊM MƯA BÃO SỐ 7 MẤT ĐIỆN TOÀN KHU VỰC
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-sky-950/80 hover:bg-red-950 text-sky-300 hover:text-red-300 border border-sky-700 transition-colors cursor-pointer"
            title="Đóng bản vẽ (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Blueprint Body: 3 Floor Cards with Cyanotype Aesthetic */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#08121d] font-mono">
          
          {/* Tactical Warning Banner: Squeaky Step 5 */}
          <div className="p-3 rounded bg-[#1e293b]/90 border border-amber-500/80 flex items-center gap-3 text-amber-200 text-xs shadow-md">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wide">
                ĐẶC TÍNH KIẾN TRÚC TRỌNG YẾU:
              </span>{' '}
              Cầu thang gỗ lim nối 3 tầng có <strong>bậc số 5 bị mọt gỗ</strong>. Bất kỳ ai đi lên lầu vào lúc cúp điện đều buộc phải giẫm lên hoặc nhảy cách bậc, gây ra tiếng cọt kẹt kinh điển!
            </div>
          </div>

          {/* 3 Floors Vertical Cross-Section Stack */}
          <div className="space-y-3.5">
            {FLOORS.map((floor) => {
              const isCurrent = currentLocationId === floor.id;

              return (
                <div
                  key={floor.id}
                  className={`rounded-lg border-2 transition-all overflow-hidden flex flex-col md:flex-row ${
                    isCurrent
                      ? 'bg-[#0f2844] border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.3)]'
                      : 'bg-[#0b1b2d] border-[#1e3a8a] hover:border-[#0284c7] hover:bg-[#0d2238]'
                  }`}
                >
                  {/* Left: Thumbnail & Altitude Badge */}
                  <div className="md:w-1/4 relative aspect-video md:aspect-auto overflow-hidden bg-black/60 shrink-0 border-b md:border-b-0 md:border-r border-[#1e3a8a]">
                    <img
                      src={floor.image}
                      alt={floor.name}
                      className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-sky-950/90 border border-sky-400 text-sky-200 text-[10px] font-bold">
                      {floor.altitude}
                    </div>
                    {isCurrent && (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-400 text-emerald-300 text-[9px] font-bold uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        ĐANG Ở ĐÂY
                      </div>
                    )}
                  </div>

                  {/* Middle: Tactical Intel & Suspect Positions */}
                  <div className="flex-1 p-3.5 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-sky-100 font-dossier-serif tracking-wide">
                          {floor.name}
                        </h3>
                        <span className="text-[10px] text-sky-400 uppercase font-semibold">
                          {floor.role}
                        </span>
                      </div>

                      {/* Key Features */}
                      <ul className="mt-2 space-y-1 text-xs text-sky-200/90">
                        {floor.clues.map((clue, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5 text-[11px] leading-relaxed">
                            <span className="text-sky-400 shrink-0">•</span>
                            <span>{clue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suspects Present & Tactical Note */}
                    <div className="pt-2 border-t border-sky-900/60 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-400">ĐỐI TƯỢNG CÓ MẶT:</span>
                        {floor.suspects.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-amber-300 font-bold"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {floor.tacticalNote && (
                        <div className="text-amber-300 italic text-[10px]">
                          {floor.tacticalNote}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Direct Travel Action Button */}
                  <div className="md:w-48 p-3.5 bg-[#08182b] border-t md:border-t-0 md:border-l border-[#1e3a8a] flex items-center justify-center shrink-0">
                    <button
                      onClick={() => handleSelectFloor(floor.id)}
                      className={`w-full py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                        isCurrent
                          ? 'bg-sky-900/60 border border-sky-500 text-sky-200 hover:bg-sky-800'
                          : 'bg-[#0284c7] hover:bg-[#0369a1] text-white border border-sky-400 hover:scale-102 shadow-sky-950/80'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>KHÁM NGHIỆM</span>
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4" />
                          <span>DI CHUYỂN TỚI</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Blueprint Footer */}
        <div className="px-6 py-3 bg-[#082238] border-t border-[#0284c7] flex items-center justify-between text-xs font-mono text-sky-300">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>NHẤP NÚT "DI CHUYỂN TỚI" ĐỂ TRỰC TIẾP KHÁM NGHIỆM HIỆN TRƯỜNG TỪNG TẦNG</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded bg-sky-900 hover:bg-sky-800 text-sky-100 font-mono text-xs uppercase tracking-wider font-bold border border-sky-500 cursor-pointer"
          >
            ĐÓNG BẢN VẼ (ESC)
          </button>
        </div>

      </div>
    </div>
  );
};
