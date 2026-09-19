import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Application, Graphics, Text, TextStyle } from 'pixi.js';
import { audioManager } from '../audio/AudioManager';
import { useGameStore } from '../store/gameStore';
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  Hand,
  Gauge
} from 'lucide-react';

interface LockedRoomCordPhysicsProps {
  onClose: () => void;
}

export const LockedRoomCordPhysics: React.FC<LockedRoomCordPhysicsProps> = ({
  onClose
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const { solvePuzzle, collectEvidence } = useGameStore();

  const [pullForce, setPullForce] = useState<number>(55); // Optimal 50-65
  const [pullAngle, setPullAngle] = useState<number>(35); // Degrees, optimal 25-45
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStatus, setSimulationStatus] = useState<string>('SẴN SÀNG THỰC NGHIỆM: CẦM KÉO ĐẦU DÂY CHỈ VÀNG');
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [boltXOffset, setBoltXOffset] = useState<number>(0); // 0 (open) to -72 (locked)
  const [isCordSnapped, setIsCordSnapped] = useState<boolean>(false);

  // Ref for mouse drag on the cord
  const isDraggingCordRef = useRef<boolean>(false);

  const renderPhysicsStage = useCallback((app: Application, boltOffset: number) => {
    app.stage.removeChildren();

    const w = app.screen.width;
    const h = app.screen.height;

    // 1. Background Wood & Shadow
    const bg = new Graphics();
    bg.rect(0, 0, w, h);
    bg.fill({ color: 0x0a0705 });
    app.stage.addChild(bg);

    // ==========================================
    // 2. LIM DOOR SLAB & DOOR FRAME
    // ==========================================
    const doorX = w * 0.40;
    const doorY = 24;
    const doorW = w * 0.52;
    const doorH = h - 90;

    // Door Frame (Khung Cửa Lim Trái)
    const frame = new Graphics();
    frame.rect(30, doorY, doorX - 40, doorH);
    frame.fill({ color: 0x1f140c });
    frame.stroke({ color: 0x593d25, width: 3 });
    // Frame molding
    frame.rect(doorX - 25, doorY, 15, doorH);
    frame.fill({ color: 0x2e1b0e });
    app.stage.addChild(frame);

    // Lim Door Leaf (Cánh Cửa Lim Dày 5cm)
    const door = new Graphics();
    door.rect(doorX, doorY, doorW, doorH);
    door.fill({ color: 0x2e1d11 });
    door.stroke({ color: 0x6e4a2c, width: 3 });
    // Wood grain lines
    for (let y = doorY + 25; y < doorY + doorH - 15; y += 35) {
      door.moveTo(doorX + 10, y).lineTo(doorX + doorW - 10, y).stroke({ color: 0x24160c, width: 2 });
    }
    app.stage.addChild(door);

    // Floor Threshold Sill (Ngưỡng Sàn Gỗ)
    const sillY = doorY + doorH;
    const sill = new Graphics();
    sill.rect(20, sillY + 8, w - 40, 48);
    sill.fill({ color: 0x181008 });
    sill.stroke({ color: 0x3d2716, width: 2 });
    app.stage.addChild(sill);

    // 5mm Floor Gap Indicator
    const gap = new Graphics();
    gap.rect(doorX, sillY, doorW, 8);
    gap.fill({ color: 0x050403 });
    app.stage.addChild(gap);

    // Gap measurement label
    const gapLabelStyle = new TextStyle({ fontFamily: 'monospace', fontSize: 10, fill: 0xf59e0b, fontWeight: 'bold' });
    const gapLabel = new Text({ text: 'KHE HỞ SÀN 5mm', style: gapLabelStyle });
    gapLabel.x = doorX + 30;
    gapLabel.y = sillY + 12;
    app.stage.addChild(gapLabel);

    // ==========================================
    // 3. BRONZE KEEPER & SLIDING BOLT
    // ==========================================
    // Fixed Keeper on Door Frame (Ngàm Khóa)
    const keeperX = doorX - 48;
    const keeperY = doorY + 110;
    const keeper = new Graphics();
    keeper.rect(keeperX, keeperY, 36, 56);
    keeper.fill({ color: 0xca8a04 });
    keeper.stroke({ color: 0x78350f, width: 2 });
    // Hole in keeper
    keeper.rect(keeperX + 8, keeperY + 14, 22, 28);
    keeper.fill({ color: 0x140e07 });
    app.stage.addChild(keeper);

    // Sliding Bolt on Door (Then Đồng Di Động)
    const boltBaseX = doorX + 40 + boltOffset;
    const boltBaseY = keeperY + 10;
    const boltW = 125;
    const boltH = 34;

    const bolt = new Graphics();
    bolt.roundRect(boltBaseX, boltBaseY, boltW, boltH, 4);
    bolt.fill({ color: 0xeab308 });
    bolt.stroke({ color: 0x854d0e, width: 3 });

    // Bolt Knob (Núm Gạt Then)
    const knobX = boltBaseX + 90;
    const knobY = boltBaseY + 17;
    bolt.circle(knobX, knobY, 12);
    bolt.fill({ color: 0xb45309 });
    bolt.stroke({ color: 0x451a03, width: 2.5 });
    app.stage.addChild(bolt);

    // ==========================================
    // 4. WAXED SILK CORD ROUTING (SỢI CHỈ SÁP VÀNG)
    // ==========================================
    const cord = new Graphics();
    const cordColor = isCordSnapped ? 0xef4444 : 0xfacc15;

    if (!isCordSnapped) {
      // Loop around Knob
      cord.circle(knobX, knobY, 16);
      cord.stroke({ color: cordColor, width: 3 });

      // Path over Guide Pin down to Floor Gap
      const guidePinX = doorX + 16;
      const guidePinY = sillY - 24;

      cord.circle(guidePinX, guidePinY, 5);
      cord.fill({ color: 0x78716c });

      // Cord from Knob to Guide Pin
      cord.moveTo(knobX, knobY + 16).lineTo(guidePinX, guidePinY).stroke({ color: cordColor, width: 3 });

      // Cord through floor gap to outside pulling hand
      const pullRadians = (pullAngle * Math.PI) / 180;
      const pullDist = 70 + (pullForce / 100) * 80;
      const pullEndX = guidePinX - Math.cos(pullRadians) * pullDist;
      const pullEndY = sillY + 4 + Math.sin(pullRadians) * pullDist * 0.4;

      cord.moveTo(guidePinX, guidePinY).lineTo(guidePinX - 8, sillY + 4).stroke({ color: cordColor, width: 3 });
      cord.moveTo(guidePinX - 8, sillY + 4).lineTo(pullEndX, pullEndY).stroke({ color: cordColor, width: 3.5 });

      // Pull Handle / Tug Node
      cord.circle(pullEndX, pullEndY, 12);
      cord.fill({ color: 0xdc2626 });
      cord.stroke({ color: 0xfef08a, width: 2 });

      // Handle label
      const handleLabelStyle = new TextStyle({ fontFamily: 'sans-serif', fontSize: 9, fill: 0xffffff, fontWeight: 'bold' });
      const handleLabel = new Text({ text: 'KÉO', style: handleLabelStyle });
      handleLabel.anchor.set(0.5);
      handleLabel.x = pullEndX;
      handleLabel.y = pullEndY;
      app.stage.addChild(cord);
      app.stage.addChild(handleLabel);
    } else {
      // Snapped Cord Fragment (4cm stuck in sill)
      const guidePinX = doorX + 16;
      cord.circle(knobX, knobY, 16);
      cord.stroke({ color: 0x78716c, width: 2 });
      // 4cm fragment at threshold
      cord.moveTo(guidePinX - 4, sillY + 4).lineTo(guidePinX - 28, sillY + 12).stroke({ color: 0xfacc15, width: 3 });
      cord.circle(guidePinX - 28, sillY + 12, 3);
      cord.fill({ color: 0xef4444 });
      app.stage.addChild(cord);
    }

    // ==========================================
    // 5. SPRING TENSION DYNAMOMETER GAUGE
    // ==========================================
    const gaugeX = w * 0.86;
    const gaugeY = 70;
    const gaugeR = 38;

    const gaugeG = new Graphics();
    gaugeG.circle(gaugeX, gaugeY, gaugeR);
    gaugeG.fill({ color: 0x1c1917 });
    gaugeG.stroke({ color: 0xd97706, width: 3 });

    // Gauge ticks
    for (let a = -135; a <= 135; a += 45) {
      const rad = (a * Math.PI) / 180;
      gaugeG.moveTo(gaugeX + Math.cos(rad) * (gaugeR - 10), gaugeY + Math.sin(rad) * (gaugeR - 10))
        .lineTo(gaugeX + Math.cos(rad) * (gaugeR - 3), gaugeY + Math.sin(rad) * (gaugeR - 3))
        .stroke({ color: 0xf59e0b, width: 2 });
    }

    // Needle based on pullForce (0 to 100)
    const needleAngle = (-135 + (pullForce / 100) * 270) * (Math.PI / 180);
    gaugeG.moveTo(gaugeX, gaugeY)
      .lineTo(gaugeX + Math.cos(needleAngle) * (gaugeR - 8), gaugeY + Math.sin(needleAngle) * (gaugeR - 8))
      .stroke({ color: pullForce > 75 ? 0xef4444 : pullForce >= 50 ? 0x10b981 : 0xfacc15, width: 2.5 });
    gaugeG.circle(gaugeX, gaugeY, 5);
    gaugeG.fill({ color: 0xd97706 });
    app.stage.addChild(gaugeG);

    // Gauge Label
    const gaugeStyle = new TextStyle({ fontFamily: 'monospace', fontSize: 9, fill: 0xfde68a, fontWeight: 'bold' });
    const gaugeText = new Text({ text: `${pullForce} N`, style: gaugeStyle });
    gaugeText.anchor.set(0.5);
    gaugeText.x = gaugeX;
    gaugeText.y = gaugeY + 22;
    app.stage.addChild(gaugeText);

  }, [pullAngle, pullForce, isCordSnapped]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDestroyed = false;
    const app = new Application();

    const initPixi = async () => {
      await app.init({
        width: container.clientWidth || 740,
        height: 380,
        backgroundColor: 0x0a0705,
        resolution: Math.min(window.devicePixelRatio || 1, 2.0),
        autoDensity: true
      });

      if (isDestroyed) {
        app.destroy(true, { children: true, texture: true });
        return;
      }

      appRef.current = app;
      container.appendChild(app.canvas);

      // Direct Canvas Pointer Drag on the Cord
      const canvas = app.canvas;

      const onPointerDown = (e: PointerEvent) => {
        isDraggingCordRef.current = true;
        canvas.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDraggingCordRef.current) return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const doorX = rect.width * 0.40;
        const sillY = rect.height - 66;

        // Calculate pull angle and distance
        const dx = doorX - mouseX;
        const dy = mouseY - sillY;

        if (dx > 0) {
          const angleDeg = Math.max(10, Math.min(75, Math.round(Math.atan2(dy, dx) * (180 / Math.PI))));
          const dist = Math.hypot(dx, dy);
          const force = Math.max(20, Math.min(100, Math.round(dist * 0.45)));

          setPullAngle(angleDeg);
          setPullForce(force);

          // Live sliding of the bolt if pulling with adequate force and angle
          if (force >= 45 && force <= 75 && angleDeg >= 22 && angleDeg <= 55) {
            const progress = (dist - 80) / 120;
            const liveOffset = Math.max(-72, Math.min(0, Math.round(-progress * 72)));
            setBoltXOffset(liveOffset);

            if (liveOffset <= -70 && !isSolved) {
              triggerSolve();
            }
          } else if (force > 78) {
            // Cord snaps if yanked too hard
            setIsCordSnapped(true);
            audioManager.playSfx('click');
            setSimulationStatus('ĐỨT CHỈ! Lực kéo quá 75N đã làm đứt sợi tơ tằm! Hãy đặt lại hiện trường.');
          }
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (isDraggingCordRef.current) {
          isDraggingCordRef.current = false;
          try {
            canvas.releasePointerCapture(e.pointerId);
          } catch {
            // Ignore
          }
        }
      };

      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('pointercancel', onPointerUp);

      renderPhysicsStage(app, boltXOffset);
    };

    initPixi();

    return () => {
      isDestroyed = true;
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, []);

  const triggerSolve = useCallback(() => {
    setIsSolved(true);
    setBoltXOffset(-72);
    setSimulationStatus('THÀNH CÔNG RỰC RỠ! THEN ĐỒNG ĐÃ ĐƯỢC CHỐT TỪ BÊN NGOÀI!');
    audioManager.playSfx('puzzle_solve');
    solvePuzzle('puzzle-cord-physics');
    collectEvidence('EVD-HT-02');
  }, [solvePuzzle, collectEvidence]);

  useEffect(() => {
    if (appRef.current) {
      renderPhysicsStage(appRef.current, boltXOffset);
    }
  }, [boltXOffset, pullForce, pullAngle, isCordSnapped, renderPhysicsStage]);

  const handleRunSimulation = () => {
    if (isSimulating || isCordSnapped) return;
    audioManager.playSfx('click');
    setIsSimulating(true);
    setSimulationStatus('ĐANG GIẬT SỢI CHỈ TỪ KHE SÀN...');

    let currentOffset = 0;
    const targetOffset = -72; // Locks into keeper

    const interval = setInterval(() => {
      currentOffset -= 3;
      setBoltXOffset(currentOffset);

      if (currentOffset <= targetOffset) {
        clearInterval(interval);
        setIsSimulating(false);

        // Evaluate Force & Angle
        if (pullForce < 45) {
          setSimulationStatus('THẤT BẠI: Lực kéo quá yếu (< 45N), then đồng chưa vào khớp ngàm khóa!');
          audioManager.playSfx('click');
        } else if (pullForce > 75) {
          setIsCordSnapped(true);
          setSimulationStatus('THẤT BẠI: Lực quá mạnh (> 75N), mép then đồng chém đứt sợi chỉ!');
          audioManager.playSfx('click');
        } else if (pullAngle < 22 || pullAngle > 55) {
          setSimulationStatus('THẤT BẠI: Góc kéo lệch làm sợi chỉ bị kẹt góc chân cửa lim!');
          audioManager.playSfx('click');
        } else {
          triggerSolve();
        }
      }
    }, 45);
  };

  const handleReset = () => {
    audioManager.playSfx('click');
    setBoltXOffset(0);
    setIsCordSnapped(false);
    setIsSolved(false);
    setPullForce(55);
    setPullAngle(35);
    setSimulationStatus('SẴN SÀNG THỰC NGHIỆM: CẦM KÉO ĐẦU DÂY CHỈ VÀNG');
  };

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none pointer-events-auto">
      <div className="relative w-full max-w-4xl bg-[#14100c] border-2 border-[#8a7663] rounded shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#1e1710] border-b border-[#4a3b2c] text-amber-200">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp stamp-crimson text-[10px] py-0.5 px-2 font-bold">
              THỰC NGHIỆM PHÁP Y
            </span>
            <div>
              <h2 className="text-base font-bold font-dossier-serif text-amber-100 leading-none">
                Cơ Học Căn Phòng Kín // Luồn Chỉ Sáp Khe Cửa 5mm
              </h2>
              <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-0.5">
                CẦM KÉO ĐẦU DÂY TRỰC TIẾP HOẶC DÙNG THANH ĐIỀU KHIỂN
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-black/40 hover:bg-red-950/80 text-stone-300 hover:text-red-300 border border-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Physics Canvas Stage */}
        <div className="relative w-full bg-[#0a0705] flex flex-col items-center justify-center py-2">
          <div ref={mountRef} className="w-full flex justify-center cursor-crosshair" />

          {/* Direct Drag Hint */}
          <div className="absolute top-4 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded bg-black/80 border border-amber-600/70 text-amber-300 text-[11px] font-mono shadow-xl backdrop-blur-sm">
            <Hand className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>NHẤP GIỮ NÚT ĐỎ ĐỂ KÉO CĂNG SỢI DÂY</span>
          </div>

          {/* Status Pin Banner */}
          <div className="absolute bottom-4 left-6 z-20 px-3.5 py-1.5 rounded bg-black/90 border border-stone-700 text-xs font-mono space-y-0.5">
            <span className="text-stone-400 font-bold uppercase text-[10px]">TRẠNG THÁI:</span>
            <p className={`font-bold ${isSolved ? 'text-emerald-400' : isCordSnapped ? 'text-red-400' : 'text-amber-300'}`}>
              {simulationStatus}
            </p>
          </div>

          {/* Mechanic Annotation Note */}
          <div className="absolute bottom-4 right-6 z-20 max-w-xs p-3 rounded bg-black/85 border border-stone-700 text-[11px] font-typewriter text-stone-300 space-y-1">
            <div className="text-amber-400 font-bold uppercase font-mono text-[10px]">THỦ THUẬT CỦA THỢ CHÍN:</div>
            <p className="leading-tight">
              Luồn sợi chỉ tơ tằm qua chốt then, khép cửa rồi từ hành lang kéo qua khe sàn 5mm để giật chốt vào ngàm!
            </p>
          </div>
        </div>

        {/* Physics Control Board */}
        <div className="p-4 bg-[#1a140e] border-t border-[#3b2b1d] grid grid-cols-1 md:grid-cols-3 gap-4 text-amber-100">
          
          {/* Pull Force Slider */}
          <div className="p-2.5 rounded bg-stone-900/60 border border-stone-700/80 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-400 font-bold flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                LỰC KÉO:
              </span>
              <span className="text-amber-400 font-bold">{pullForce} N</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={pullForce}
              onChange={(e) => setPullForce(Number(e.target.value))}
              disabled={isSimulating || isCordSnapped}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-stone-500">
              <span>20N (YẾU)</span>
              <span className="text-emerald-400 font-bold">50N - 65N (CHUẨN)</span>
              <span>100N (ĐỨT)</span>
            </div>
          </div>

          {/* Pull Angle Slider */}
          <div className="p-2.5 rounded bg-stone-900/60 border border-stone-700/80 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-400 font-bold">GÓC GIẬT DÂY:</span>
              <span className="text-amber-400 font-bold">{pullAngle}°</span>
            </div>
            <input
              type="range"
              min="10"
              max="75"
              value={pullAngle}
              onChange={(e) => setPullAngle(Number(e.target.value))}
              disabled={isSimulating || isCordSnapped}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-stone-500">
              <span>10° (KẸT NẸP)</span>
              <span className="text-emerald-400 font-bold">35° (TỐI ƯU)</span>
              <span>75° (CHỆCH TRỤC)</span>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col justify-center gap-2">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating || isCordSnapped}
              className="w-full py-2 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 border border-amber-400 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>{isSimulating ? 'ĐANG KÉO DÂY...' : 'KÍCH HOẠT GIẬT DÂY'}</span>
            </button>

            <button
              onClick={handleReset}
              disabled={isSimulating}
              className="w-full py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-stone-600 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ĐẶT LẠI HIỆN TRƯỜNG</span>
            </button>
          </div>

        </div>

        {/* Solved Banner */}
        {isSolved && (
          <div className="px-6 py-2 bg-emerald-950 border-t border-emerald-500 text-emerald-200 text-xs font-mono flex items-center justify-between animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <CheckCircle2 className="w-5 h-5" />
              <span>CƠ CHẾ PHÒNG KÍN HOÀN TOÀN BỊ LẬT TẨY!</span>
            </div>
            <span className="text-[11px] font-typewriter text-emerald-100">
              Thu thập vật chứng: Mẩu Chỉ Tơ Tằm Sáp Kẹt Khe Cửa (#02)
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-2.5 bg-[#140e0a] border-t border-[#3b2b1d] flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-400">
            HỒ SƠ THỰC NGHIỆM VẬT LÝ // VỤ ÁN TIỆM KIM HOÀN VẠN LỢI
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-mono text-xs uppercase tracking-wider font-bold border border-stone-600 cursor-pointer"
          >
            KẾT THÚC THỰC NGHIỆM
          </button>
        </div>

      </div>
    </div>
  );
};
