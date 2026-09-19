import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Application, Graphics, Container, Text, TextStyle } from 'pixi.js';
import { audioManager } from '../audio/AudioManager';
import { useGameStore } from '../store/gameStore';
import {
  X,
  RotateCw,
  RotateCcw,
  CheckCircle2,
  Compass,
  Hand
} from 'lucide-react';

const TRIGRAMS = [
  { name: 'Khảm (☵)', element: 'Thủy - Nước', symbol: '☵', char: '坎', angleIdx: 0 },
  { name: 'Cấn (☶)', element: 'Sơn - Núi', symbol: '☶', char: '艮', angleIdx: 1 },
  { name: 'Chấn (☳)', element: 'Lôi - Sấm', symbol: '☳', char: '震', angleIdx: 2 },
  { name: 'Tốn (☴)', element: 'Phong - Gió', symbol: '☴', char: '巽', angleIdx: 3 },
  { name: 'Ly (☲)', element: 'Hỏa - Lửa', symbol: '☲', char: '離', angleIdx: 4 },
  { name: 'Khôn (☷)', element: 'Địa - Đất', symbol: '☷', char: '坤', angleIdx: 5 },
  { name: 'Đoài (☱)', element: 'Trạch - Đầm', symbol: '☱', char: '兌', angleIdx: 6 },
  { name: 'Càn (☰)', element: 'Thiên - Trời', symbol: '☰', char: '乾', angleIdx: 7 }
];

interface EightTrigramsLockboxProps {
  onClose: () => void;
}

export const EightTrigramsLockbox: React.FC<EightTrigramsLockboxProps> = ({
  onClose
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const { solvePuzzle, collectEvidence } = useGameStore();

  // Dial positions (0 to 7, where 0 = aligned with 12 o'clock pointer)
  const [outerDial, setOuterDial] = useState<number>(3); // Initial scrambled
  const [middleDial, setMiddleDial] = useState<number>(1);
  const [innerDial, setInnerDial] = useState<number>(6);

  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [activeRing, setActiveRing] = useState<'outer' | 'middle' | 'inner'>('outer');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Solution: Outer = Khảm (0), Middle = Ly (4), Inner = Chấn (2)
  const isCorrectSolution = 
    ((8 - (outerDial % 8)) % 8) === 0 &&
    ((8 - (middleDial % 8)) % 8) === 4 &&
    ((8 - (innerDial % 8)) % 8) === 2;

  // Refs for drag state
  const dragStateRef = useRef<{
    ring: 'outer' | 'middle' | 'inner' | null;
    startAngle: number;
    initialDial: number;
    hasMoved: boolean;
  }>({
    ring: null,
    startAngle: 0,
    initialDial: 0,
    hasMoved: false
  });

  const handleRotateRing = useCallback((direction: 'cw' | 'ccw', ringToRotate = activeRing) => {
    audioManager.playSfx('click');
    const delta = direction === 'cw' ? 1 : -1;
    if (ringToRotate === 'outer') {
      setOuterDial((prev) => (prev + delta + 8) % 8);
    } else if (ringToRotate === 'middle') {
      setMiddleDial((prev) => (prev + delta + 8) % 8);
    } else {
      setInnerDial((prev) => (prev + delta + 8) % 8);
    }
  }, [activeRing]);

  const renderLockDials = useCallback((app: Application) => {
    app.stage.removeChildren();

    const w = app.screen.width;
    const h = app.screen.height;
    const cx = w * 0.5;
    const cy = h * 0.5;

    const outerR = Math.min(w, h) * 0.44;
    const middleR = outerR * 0.72;
    const innerR = outerR * 0.45;
    const coreR = outerR * 0.22;

    // 1. Background Box & Desk
    const bg = new Graphics();
    bg.rect(0, 0, w, h);
    bg.fill({ color: 0x0a0705 });
    app.stage.addChild(bg);

    // Ornate Carved Rosewood Plate
    const plate = new Graphics();
    plate.roundRect(cx - outerR - 26, cy - outerR - 26, (outerR + 26) * 2, (outerR + 26) * 2, 18);
    plate.fill({ color: 0x1f140c });
    plate.stroke({ color: 0x8a7055, width: 4 });
    // Carved wood borders
    plate.roundRect(cx - outerR - 20, cy - outerR - 20, (outerR + 20) * 2, (outerR + 20) * 2, 14);
    plate.stroke({ color: 0x3d2716, width: 2 });

    // Brass corner studs
    [-1, 1].forEach(sx => {
      [-1, 1].forEach(sy => {
        plate.circle(cx + sx * (outerR + 12), cy + sy * (outerR + 12), 7);
        plate.fill({ color: 0xd97706 });
        plate.stroke({ color: 0x78350f, width: 2 });
      });
    });
    app.stage.addChild(plate);

    // ==========================================
    // 2. OUTER RING (RADIUS: middleR to outerR)
    // ==========================================
    const outerContainer = new Container();
    outerContainer.x = cx;
    outerContainer.y = cy;
    outerContainer.rotation = (outerDial * Math.PI) / 4;

    const outerG = new Graphics();
    outerG.circle(0, 0, outerR);
    outerG.fill({ color: activeRing === 'outer' ? 0xb45309 : 0x78350f });
    outerG.stroke({ color: activeRing === 'outer' ? 0xfbbf24 : 0xca8a04, width: activeRing === 'outer' ? 4 : 2 });
    outerG.circle(0, 0, middleR);
    outerG.cut();
    outerContainer.addChild(outerG);

    // Divide lines & Trigrams
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const trigram = TRIGRAMS[i];

      // Spoke separator line
      const spoke = new Graphics();
      spoke.moveTo(Math.cos(angle) * middleR, Math.sin(angle) * middleR)
        .lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR)
        .stroke({ color: 0x451a03, width: 2 });
      outerContainer.addChild(spoke);

      // Label at middle radius
      const midRadius = (middleR + outerR) * 0.5;
      const textAngle = angle + Math.PI / 8;
      const tx = Math.cos(textAngle) * midRadius;
      const ty = Math.sin(textAngle) * midRadius;

      const style = new TextStyle({
        fontFamily: 'serif',
        fontSize: Math.max(11, outerR * 0.08),
        fontWeight: 'bold',
        fill: 0xfffbeb
      });
      const tText = new Text({ text: `${trigram.symbol} ${trigram.char}`, style });
      tText.anchor.set(0.5);
      tText.x = tx;
      tText.y = ty;
      tText.rotation = textAngle + Math.PI / 2;
      outerContainer.addChild(tText);
    }
    app.stage.addChild(outerContainer);

    // ==========================================
    // 3. MIDDLE RING (RADIUS: innerR to middleR)
    // ==========================================
    const middleContainer = new Container();
    middleContainer.x = cx;
    middleContainer.y = cy;
    middleContainer.rotation = (middleDial * Math.PI) / 4;

    const midG = new Graphics();
    midG.circle(0, 0, middleR);
    midG.fill({ color: activeRing === 'middle' ? 0xb45309 : 0x92400e });
    midG.stroke({ color: activeRing === 'middle' ? 0xfbbf24 : 0xd97706, width: activeRing === 'middle' ? 4 : 2 });
    midG.circle(0, 0, innerR);
    midG.cut();
    middleContainer.addChild(midG);

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const trigram = TRIGRAMS[i];

      const spoke = new Graphics();
      spoke.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR)
        .lineTo(Math.cos(angle) * middleR, Math.sin(angle) * middleR)
        .stroke({ color: 0x451a03, width: 2 });
      middleContainer.addChild(spoke);

      const midRadius = (innerR + middleR) * 0.5;
      const textAngle = angle + Math.PI / 8;
      const tx = Math.cos(textAngle) * midRadius;
      const ty = Math.sin(textAngle) * midRadius;

      const style = new TextStyle({
        fontFamily: 'monospace',
        fontSize: Math.max(10, outerR * 0.07),
        fontWeight: 'bold',
        fill: 0xfef08a
      });
      const tText = new Text({ text: trigram.element.split(' - ')[0], style });
      tText.anchor.set(0.5);
      tText.x = tx;
      tText.y = ty;
      tText.rotation = textAngle + Math.PI / 2;
      middleContainer.addChild(tText);
    }
    app.stage.addChild(middleContainer);

    // ==========================================
    // 4. INNER RING (RADIUS: coreR to innerR)
    // ==========================================
    const innerContainer = new Container();
    innerContainer.x = cx;
    innerContainer.y = cy;
    innerContainer.rotation = (innerDial * Math.PI) / 4;

    const innerG = new Graphics();
    innerG.circle(0, 0, innerR);
    innerG.fill({ color: activeRing === 'inner' ? 0xb45309 : 0x78350f });
    innerG.stroke({ color: activeRing === 'inner' ? 0xfbbf24 : 0xb45309, width: activeRing === 'inner' ? 4 : 2 });
    innerG.circle(0, 0, coreR);
    innerG.cut();
    innerContainer.addChild(innerG);

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const trigram = TRIGRAMS[i];

      const spoke = new Graphics();
      spoke.moveTo(Math.cos(angle) * coreR, Math.sin(angle) * coreR)
        .lineTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR)
        .stroke({ color: 0x451a03, width: 2 });
      innerContainer.addChild(spoke);

      const midRadius = (coreR + innerR) * 0.5;
      const textAngle = angle + Math.PI / 8;
      const tx = Math.cos(textAngle) * midRadius;
      const ty = Math.sin(textAngle) * midRadius;

      const style = new TextStyle({
        fontFamily: 'sans-serif',
        fontSize: Math.max(10, outerR * 0.07),
        fontWeight: 'bold',
        fill: 0xfde047
      });
      const tText = new Text({ text: trigram.symbol, style });
      tText.anchor.set(0.5);
      tText.x = tx;
      tText.y = ty;
      tText.rotation = textAngle + Math.PI / 2;
      innerContainer.addChild(tText);
    }
    app.stage.addChild(innerContainer);

    // ==========================================
    // 5. CENTER BRASS KEYHOLE CORE
    // ==========================================
    const core = new Graphics();
    core.circle(cx, cy, coreR);
    core.fill({ color: 0xca8a04 });
    core.stroke({ color: 0x78350f, width: 3 });
    // Keyhole
    core.circle(cx, cy - 4, 6);
    core.fill({ color: 0x17120c });
    core.poly([
      cx - 4, cy - 2,
      cx + 4, cy - 2,
      cx + 6, cy + 12,
      cx - 6, cy + 12
    ]);
    core.fill({ color: 0x17120c });
    app.stage.addChild(core);

    // ==========================================
    // 6. TOP ALIGNMENT NOTCH POINTER (12 O'CLOCK)
    // ==========================================
    const notch = new Graphics();
    notch.poly([
      cx, cy - outerR - 4,
      cx - 10, cy - outerR - 22,
      cx + 10, cy - outerR - 22
    ]);
    notch.fill({ color: 0xdc2626 });
    notch.stroke({ color: 0xfef08a, width: 2 });
    app.stage.addChild(notch);
  }, [activeRing, outerDial, middleDial, innerDial]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDestroyed = false;
    const app = new Application();

    const initPixi = async () => {
      await app.init({
        width: container.clientWidth || 660,
        height: 390,
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

      // Direct Canvas Pointer Drag / Rotation
      const canvas = app.canvas;

      const getAngle = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left - rect.width * 0.5;
        const y = clientY - rect.top - rect.height * 0.5;
        return Math.atan2(y, x);
      };

      const getRingFromPos = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left - rect.width * 0.5;
        const y = clientY - rect.top - rect.height * 0.5;
        const dist = Math.hypot(x, y);

        const outerR = Math.min(rect.width, rect.height) * 0.44;
        const middleR = outerR * 0.72;
        const innerR = outerR * 0.45;
        const coreR = outerR * 0.22;

        if (dist >= middleR && dist <= outerR + 10) return 'outer';
        if (dist >= innerR && dist < middleR) return 'middle';
        if (dist >= coreR && dist < innerR) return 'inner';
        return null;
      };

      const onPointerDown = (e: PointerEvent) => {
        const ring = getRingFromPos(e.clientX, e.clientY);
        if (ring) {
          setActiveRing(ring);
          setIsDragging(true);
          dragStateRef.current = {
            ring,
            startAngle: getAngle(e.clientX, e.clientY),
            initialDial: ring === 'outer' ? outerDial : ring === 'middle' ? middleDial : innerDial,
            hasMoved: false
          };
          canvas.setPointerCapture(e.pointerId);
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!dragStateRef.current.ring) return;
        dragStateRef.current.hasMoved = true;
        const currentAngle = getAngle(e.clientX, e.clientY);
        let diff = currentAngle - dragStateRef.current.startAngle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        const steps = Math.round(diff / (Math.PI / 4));
        if (steps !== 0) {
          audioManager.playSfx('click');
          const ring = dragStateRef.current.ring;
          if (ring === 'outer') {
            setOuterDial((prev) => (prev + steps + 8) % 8);
          } else if (ring === 'middle') {
            setMiddleDial((prev) => (prev + steps + 8) % 8);
          } else {
            setInnerDial((prev) => (prev + steps + 8) % 8);
          }
          dragStateRef.current.startAngle = currentAngle;
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (dragStateRef.current.ring) {
          dragStateRef.current.ring = null;
          setIsDragging(false);
          try {
            canvas.releasePointerCapture(e.pointerId);
          } catch {
            // Ignore if pointer capture already lost
          }
        }
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const ring = getRingFromPos(e.clientX, e.clientY) || activeRing;
        if (e.deltaY < 0) {
          handleRotateRing('cw', ring);
        } else {
          handleRotateRing('ccw', ring);
        }
      };

      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('pointercancel', onPointerUp);
      canvas.addEventListener('wheel', onWheel, { passive: false });

      renderLockDials(app);
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

  // Update canvas on dial changes
  useEffect(() => {
    if (appRef.current) {
      renderLockDials(appRef.current);
    }

    if (isCorrectSolution && !isUnlocked) {
      setIsUnlocked(true);
      audioManager.playSfx('puzzle_solve');
      solvePuzzle('puzzle-trigrams');
      collectEvidence('EVD-HT-09');
      collectEvidence('EVD-HT-14');
    }
  }, [outerDial, middleDial, innerDial, isCorrectSolution, isUnlocked, activeRing, renderLockDials]);

  const getAlignedTrigram = (dialPos: number) => {
    const targetIdx = (8 - (dialPos % 8)) % 8;
    return TRIGRAMS[targetIdx] || TRIGRAMS[0];
  };

  const currentOuter = getAlignedTrigram(outerDial);
  const currentMiddle = getAlignedTrigram(middleDial);
  const currentInner = getAlignedTrigram(innerDial);

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
            <span className="rubber-stamp stamp-amber text-[10px] py-0.5 px-2 font-bold">
              KHÓA CƠ KHÍ BÁT QUÁI
            </span>
            <div>
              <h2 className="text-base font-bold font-dossier-serif text-amber-100 leading-none">
                Hộc Bàn Bí Mật Dưới Lò Phân Kim
              </h2>
              <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-0.5">
                CƠ CHẾ 3 VÒNG ĐỒNG // CẦM CHUỘT KÉO XOAY TRỰC TIẾP TRÊN VÒNG
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

        {/* Dial Canvas Stage */}
        <div className="relative w-full bg-[#0a0806] flex flex-col items-center justify-center py-2">
          <div ref={mountRef} className={`w-full flex justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} />

          {/* Direct Drag Instruction Badge */}
          <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded bg-black/80 border border-amber-600/70 text-amber-300 text-[11px] font-mono shadow-xl backdrop-blur-sm">
            <Hand className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>KÉO CHUỘT TRỰC TIẾP HOẶC LĂN CHUỘT ĐỂ XOAY VÒNG</span>
          </div>

          {/* Current Dial Alignment Status Card */}
          <div className="absolute top-4 right-6 z-20 p-3 rounded bg-black/85 border border-stone-700 text-xs font-mono space-y-1.5 shadow-xl">
            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
              VẠCH KIM CHỈ ĐỈNH (12 GIỜ):
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">VÒNG NGOÀI:</span>
              <span className={currentOuter.angleIdx === 0 ? 'text-emerald-400 font-bold' : 'text-stone-300'}>
                {currentOuter.name} ({currentOuter.element})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">VÒNG GIỮA:</span>
              <span className={currentMiddle.angleIdx === 4 ? 'text-emerald-400 font-bold' : 'text-stone-300'}>
                {currentMiddle.name} ({currentMiddle.element})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">VÒNG TRONG:</span>
              <span className={currentInner.angleIdx === 2 ? 'text-emerald-400 font-bold' : 'text-stone-300'}>
                {currentInner.name} ({currentInner.element})
              </span>
            </div>
          </div>

          {/* Riddle Hint Parchment */}
          <div className="absolute top-4 left-6 z-20 max-w-xs p-3 rounded bg-[#201811]/95 border border-[#8a7663] text-xs font-typewriter text-amber-200 shadow-xl space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>GHI CHÉP GỐC TRÊN BÀN THỢ:</span>
            </div>
            <p className="italic text-[11px] leading-relaxed text-stone-300">
              "Nhất Khảm khởi đầu nguồn nước xiết (Thủy),<br/>
              Nhị Ly tương khắc ngọn lửa thiêng (Hỏa),<br/>
              Tam Chấn sấm rền khai mật đạo (Lôi)."
            </p>
          </div>
        </div>

        {/* Bottom Control Controls */}
        <div className="p-4 bg-[#1a140e] border-t border-[#3b2b1d] flex flex-wrap items-center justify-between gap-4">
          
          {/* Ring Selector Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-400 uppercase font-bold mr-1">CHỌN VÒNG:</span>
            {(['outer', 'middle', 'inner'] as const).map((ring) => (
              <button
                key={ring}
                onClick={() => {
                  audioManager.playSfx('click');
                  setActiveRing(ring);
                }}
                className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeRing === ring
                    ? 'bg-amber-600 text-stone-950 border-amber-400 shadow-md'
                    : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-stone-500'
                }`}
              >
                {ring === 'outer' ? 'VÒNG NGOÀI (THỦY)' : ring === 'middle' ? 'VÒNG GIỮA (HỎA)' : 'VÒNG TRONG (LÔI)'}
              </button>
            ))}
          </div>

          {/* Rotate Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleRotateRing('ccw')}
              className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-mono text-xs font-bold border border-stone-600 flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>XOAY TRÁI (45°)</span>
            </button>

            <button
              onClick={() => handleRotateRing('cw')}
              className="px-4 py-2 rounded bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs font-bold border border-amber-500 flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>XOAY PHẢI (45°)</span>
            </button>
          </div>

          {/* Success Unlocked Banner */}
          {isUnlocked && (
            <div className="w-full mt-1 p-3 rounded bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center justify-between animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <CheckCircle2 className="w-5 h-5" />
                <span>MẬT MÃ BÁT QUÁI CHÍNH XÁC! HỘC BÀN ĐÃ BẬT MỞ!</span>
              </div>
              <span className="text-[11px] font-typewriter text-emerald-100">
                Thu thập: Hũ Vôi Sống Sấy Khô (CaO) (#09) & Cuộn Chỉ Tơ Tằm Vàng (#14)
              </span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 bg-[#140e0a] border-t border-[#3b2b1d] flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-400">
            HỘC BÀN BÍ MẬT XƯỞNG KIM HOÀN VẠN LỢI // SAIGON 1989
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-mono text-xs uppercase tracking-wider font-bold border border-stone-600 cursor-pointer"
          >
            ĐÓNG HỘC BÀN
          </button>
        </div>

      </div>
    </div>
  );
};
