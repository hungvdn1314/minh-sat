import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Application, Graphics, Container, Text, TextStyle } from 'pixi.js';
import { audioManager } from '../audio/AudioManager';
import { useGameStore } from '../store/gameStore';
import {
  X,
  CheckCircle2,
  Sliders,
  Sparkles,
  MoveVertical,
  Hand
} from 'lucide-react';

interface CandidateSpecimen {
  id: string;
  name: string;
  diameter: string;
  material: string;
  isCorrect: boolean;
  description: string;
  color: number;
  wireWidth: number;
  hasRosinResidue: boolean;
}

const CANDIDATES: CandidateSpecimen[] = [
  {
    id: 'specimen-nylon',
    name: 'Mẫu #A: Dây Cước Câu Cá Đơn',
    diameter: '0.60 mm',
    material: 'Monofilament Nylon',
    isCorrect: false,
    description: 'Bề mặt nhựa nhẵn bóng, không có rãnh khía kép. Hoàn toàn không có tinh thể nhựa thông.',
    color: 0x64748b,
    wireWidth: 10,
    hasRosinResidue: false
  },
  {
    id: 'specimen-brake',
    name: 'Mẫu #B: Dây Phanh Xe Đạp Xoắn',
    diameter: '1.20 mm',
    material: 'Thép xoắn 7 sợi mạ kẽm',
    isCorrect: false,
    description: 'Đường kính 1.20mm quá lớn so với rãnh siết 0.8mm. Bề mặt bám dầu mỡ đen và gỉ sét.',
    color: 0x78716c,
    wireWidth: 32,
    hasRosinResidue: false
  },
  {
    id: 'specimen-para',
    name: 'Mẫu #C: Dây Dù Cứu Sinh Quân Đội',
    diameter: '3.00 mm',
    material: 'Sợi dù tổng hợp bện xoắn',
    isCorrect: false,
    description: 'Sợi dệt nylon xù lông thô ráp, kích thước gấp gần 4 lần rãnh bầm khí quản nạn nhân.',
    color: 0x475569,
    wireWidth: 54,
    hasRosinResidue: false
  },
  {
    id: 'specimen-pipa',
    name: 'Mẫu #D: Dây Đàn Tỳ Bà Số 2 (Đàn Của Mỹ Lan)',
    diameter: '0.80 mm',
    material: 'Cước thép kép xoắn chuyên dụng',
    isCorrect: true,
    description: 'Đường kính chính xác 0.80mm. Rãnh xoắn kép và cặn tinh thể nhựa thông (rosin) trùng khớp 100% với vết hằn cổ nạn nhân!',
    color: 0xd97706,
    wireWidth: 18,
    hasRosinResidue: true
  }
];

interface MicroscopeTraceComparatorProps {
  onClose: () => void;
}

export const MicroscopeTraceComparator: React.FC<MicroscopeTraceComparatorProps> = ({
  onClose
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const { solvePuzzle, collectEvidence } = useGameStore();

  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);
  const [focusPosition, setFocusPosition] = useState<number>(20); // Optimal 46-54
  const [magnification, setMagnification] = useState<'10X' | '40X' | '100X'>('40X');
  const [slideYOffset, setSlideYOffset] = useState<number>(28); // Player drags slide to 0 to align
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [matchStatus, setMatchStatus] = useState<string>('CHƯA TRÙNG KHỚP');

  const candidate = CANDIDATES[selectedCandidateIndex];
  const isFocusSharp = focusPosition >= 46 && focusPosition <= 54;
  const isSlideAligned = Math.abs(slideYOffset) <= 12;

  const slideYOffsetRef = useRef(slideYOffset);
  slideYOffsetRef.current = slideYOffset;

  const focusPositionRef = useRef(focusPosition);
  focusPositionRef.current = focusPosition;

  // Refs for drag state
  const dragRef = useRef<{
    mode: 'slide' | 'focusKnob' | null;
    startY: number;
    initialVal: number;
  }>({
    mode: null,
    startY: 0,
    initialVal: 0
  });

  const renderMicroscopeView = useCallback((app: Application) => {
    app.stage.removeChildren();

    const w = app.screen.width;
    const h = app.screen.height;
    const radius = Math.min(w * 0.23, h * 0.44);
    const centerY = h * 0.5;

    const leftCenterX = w * 0.28;
    const rightCenterX = w * 0.68;
    const knobCenterX = w * 0.93;

    const magScale = magnification === '10X' ? 0.75 : magnification === '40X' ? 1.0 : 1.4;
    const blurAlpha = Math.min(0.8, Math.abs(focusPosition - 50) * 0.02);

    // 1. Background Panel & Lab Counter
    const bg = new Graphics();
    bg.rect(0, 0, w, h);
    bg.fill({ color: 0x080605 });
    app.stage.addChild(bg);

    // Brass & Cast Iron Double Ocular Bezel
    const ocularBridge = new Graphics();
    ocularBridge.roundRect(leftCenterX - radius - 18, centerY - radius - 18, (rightCenterX - leftCenterX) + radius * 2 + 36, (radius + 18) * 2, 28);
    ocularBridge.fill({ color: 0x14100c });
    ocularBridge.stroke({ color: 0x8a7663, width: 4 });
    app.stage.addChild(ocularBridge);

    // ==========================================
    // 2. LEFT STAGE: VICTIM'S LIGATURE GROOVE
    // ==========================================
    const leftContainer = new Container();
    leftContainer.x = leftCenterX;
    leftContainer.y = centerY;

    const leftAperture = new Graphics();
    leftAperture.circle(0, 0, radius);
    leftAperture.fill({ color: 0x1f0f0c });
    leftContainer.addChild(leftAperture);

    // Victim neck tissue dermal background
    const tissueBg = new Graphics();
    tissueBg.circle(0, 0, radius - 2);
    tissueBg.fill({ color: 0x2e110d });
    leftContainer.addChild(tissueBg);

    // Victim 0.8mm twin ligature groove (Center at Y = 0)
    const victimGroove = new Graphics();
    victimGroove.rect(-radius, -9 * magScale, radius * 2, 18 * magScale);
    victimGroove.fill({ color: 0x581c1c, alpha: 0.9 });
    // Striation lines
    victimGroove.rect(-radius, -4 * magScale, radius * 2, 2.5 * magScale);
    victimGroove.fill({ color: 0xb45309, alpha: 0.8 });
    victimGroove.rect(-radius, 3 * magScale, radius * 2, 2.5 * magScale);
    victimGroove.fill({ color: 0xb45309, alpha: 0.8 });

    // Rosin amber crystals in groove
    for (let i = -4; i <= 4; i++) {
      victimGroove.circle(i * 18 * magScale, (Math.sin(i * 1.5) * 4) * magScale, (3.0 + (i % 2) * 1.2) * magScale);
      victimGroove.fill({ color: 0xfbbf24, alpha: 0.85 });
    }
    leftContainer.addChild(victimGroove);

    // Left Reticle & Micrometer
    const leftReticle = new Graphics();
    leftReticle.circle(0, 0, radius);
    leftReticle.stroke({ color: 0x8a7663, width: 3 });
    // Glowing green crosshairs
    leftReticle.moveTo(-radius, 0).lineTo(radius, 0).stroke({ color: 0x22c55e, width: 1.5, alpha: 0.5 });
    leftReticle.moveTo(0, -radius).lineTo(0, radius).stroke({ color: 0x22c55e, width: 1.5, alpha: 0.5 });
    // Tick marks
    for (let x = -radius + 15; x <= radius - 15; x += 15) {
      leftReticle.moveTo(x, -5).lineTo(x, 5).stroke({ color: 0x22c55e, width: 1, alpha: 0.4 });
    }
    leftContainer.addChild(leftReticle);

    // Stage Label
    const leftLabelStyle = new TextStyle({ fontFamily: 'monospace', fontSize: 10, fill: 0xf87171, fontWeight: 'bold' });
    const leftLabel = new Text({ text: 'VẾT HẰN KHÍ QUẢN NẠN NHÂN (0.8mm)', style: leftLabelStyle });
    leftLabel.anchor.set(0.5);
    leftLabel.y = radius - 16;
    leftContainer.addChild(leftLabel);

    app.stage.addChild(leftContainer);

    // ==========================================
    // 3. RIGHT STAGE: CANDIDATE WIRE (INTERACTIVE SLIDE)
    // ==========================================
    const rightContainer = new Container();
    rightContainer.x = rightCenterX;
    rightContainer.y = centerY;

    const rightAperture = new Graphics();
    rightAperture.circle(0, 0, radius);
    rightAperture.fill({ color: 0x12100e });
    rightContainer.addChild(rightAperture);

    // Candidate wire slide (moves with slideYOffset)
    const wireContainer = new Container();
    wireContainer.y = slideYOffset;

    const candidateWireG = new Graphics();
    const wWidth = candidate.wireWidth * magScale;
    candidateWireG.rect(-radius, -wWidth * 0.5, radius * 2, wWidth);
    candidateWireG.fill({ color: candidate.color });
    candidateWireG.stroke({ color: 0x1c1917, width: 1 });

    // Texture lines for candidate
    if (candidate.isCorrect) {
      // Twin twisted steel wire grooves
      candidateWireG.rect(-radius, -4 * magScale, radius * 2, 2.5 * magScale);
      candidateWireG.fill({ color: 0xb45309, alpha: 0.8 });
      candidateWireG.rect(-radius, 3 * magScale, radius * 2, 2.5 * magScale);
      candidateWireG.fill({ color: 0xb45309, alpha: 0.8 });

      // Rosin amber crystals
      for (let i = -4; i <= 4; i++) {
        candidateWireG.circle(i * 18 * magScale, (Math.sin(i * 1.5) * 4) * magScale, (3.0 + (i % 2) * 1.2) * magScale);
        candidateWireG.fill({ color: 0xfbbf24, alpha: 0.85 });
      }
    } else if (candidate.id === 'specimen-brake') {
      // 7-strand twisted cable ridges
      for (let x = -radius; x < radius; x += 16) {
        candidateWireG.moveTo(x, -wWidth * 0.5).lineTo(x + 12, wWidth * 0.5).stroke({ color: 0x292524, width: 2.5 });
      }
    }
    wireContainer.addChild(candidateWireG);
    rightContainer.addChild(wireContainer);

    // Optical Blur overlay when out of focus
    if (blurAlpha > 0.05) {
      const blurOverlay = new Graphics();
      blurOverlay.circle(0, 0, radius);
      blurOverlay.fill({ color: 0x1c1917, alpha: blurAlpha });
      rightContainer.addChild(blurOverlay);
    }

    // Right Reticle
    const rightReticle = new Graphics();
    rightReticle.circle(0, 0, radius);
    rightReticle.stroke({ color: 0x8a7663, width: 3 });
    // Reticle line turns glowing emerald when aligned and focused
    const reticleColor = (candidate.isCorrect && isSlideAligned && isFocusSharp) ? 0x10b981 : 0x22c55e;
    rightReticle.moveTo(-radius, 0).lineTo(radius, 0).stroke({ color: reticleColor, width: 1.5, alpha: 0.6 });
    rightReticle.moveTo(0, -radius).lineTo(0, radius).stroke({ color: reticleColor, width: 1.5, alpha: 0.6 });
    rightContainer.addChild(rightReticle);

    // Right Stage Label
    const rightLabelStyle = new TextStyle({
      fontFamily: 'monospace',
      fontSize: 10,
      fill: candidate.isCorrect && isSlideAligned && isFocusSharp ? 0x34d399 : 0xfbbf24,
      fontWeight: 'bold'
    });
    const rightLabel = new Text({
      text: isSlideAligned ? 'TIÊU BẢN: ĐÃ CĂN THẲNG TRỤC' : 'TIÊU BẢN: KÉO CHUỘT ĐỂ CĂN HÀNG',
      style: rightLabelStyle
    });
    rightLabel.anchor.set(0.5);
    rightLabel.y = radius - 16;
    rightContainer.addChild(rightLabel);

    app.stage.addChild(rightContainer);

    // Split Line Down the Center
    const splitLine = new Graphics();
    const splitX = (leftCenterX + rightCenterX) * 0.5;
    splitLine.moveTo(splitX, centerY - radius - 14).lineTo(splitX, centerY + radius + 14).stroke({ color: 0xfbbf24, width: 2.5 });
    app.stage.addChild(splitLine);

    // ==========================================
    // 4. BRASS FOCUS KNOB ON THE RIGHT MARGIN
    // ==========================================
    const knobG = new Graphics();
    const knobW = 32;
    const knobH = 150;
    const knobY = centerY - knobH * 0.5;
    knobG.roundRect(knobCenterX - knobW * 0.5, knobY, knobW, knobH, 8);
    knobG.fill({ color: 0x92400e });
    knobG.stroke({ color: 0xf59e0b, width: 2 });

    // Knurling ridges
    for (let ky = knobY + 8; ky <= knobY + knobH - 8; ky += 8) {
      knobG.moveTo(knobCenterX - knobW * 0.5 + 4, ky).lineTo(knobCenterX + knobW * 0.5 - 4, ky).stroke({ color: 0x451a03, width: 2 });
    }

    // Indicator needle on focus knob
    const indicatorY = knobY + (focusPosition / 100) * (knobH - 16) + 8;
    knobG.poly([
      knobCenterX - knobW * 0.5 - 8, indicatorY,
      knobCenterX - knobW * 0.5, indicatorY - 5,
      knobCenterX - knobW * 0.5, indicatorY + 5
    ]);
    knobG.fill({ color: isFocusSharp ? 0x10b981 : 0xdc2626 });
    app.stage.addChild(knobG);

    // Knob Text
    const knobTextStyle = new TextStyle({ fontFamily: 'monospace', fontSize: 9, fill: 0xfde68a, fontWeight: 'bold' });
    const knobText = new Text({ text: 'NÚM LĂN', style: knobTextStyle });
    knobText.anchor.set(0.5);
    knobText.x = knobCenterX;
    knobText.y = centerY - knobH * 0.5 - 12;
    app.stage.addChild(knobText);

  }, [candidate, focusPosition, magnification, slideYOffset, isFocusSharp, isSlideAligned]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDestroyed = false;
    const app = new Application();

    const initPixi = async () => {
      await app.init({
        width: container.clientWidth || 740,
        height: 380,
        backgroundColor: 0x080605,
        resolution: Math.min(window.devicePixelRatio || 1, 2.0),
        autoDensity: true
      });

      if (isDestroyed) {
        app.destroy(true, { children: true, texture: true });
        return;
      }

      appRef.current = app;
      container.appendChild(app.canvas);

      // Direct Canvas Pointer Drag
      const canvas = app.canvas;

      const onPointerDown = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const knobCenterX = rect.width * 0.93;

        if (Math.abs(x - knobCenterX) < 36) {
          // Grab focus knob
          dragRef.current = {
            mode: 'focusKnob',
            startY: e.clientY,
            initialVal: focusPositionRef.current
          };
          canvas.setPointerCapture(e.pointerId);
        } else {
          // Grab specimen slide
          dragRef.current = {
            mode: 'slide',
            startY: e.clientY,
            initialVal: slideYOffsetRef.current
          };
          canvas.setPointerCapture(e.pointerId);
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!dragRef.current.mode) return;
        const dy = e.clientY - dragRef.current.startY;

        if (dragRef.current.mode === 'slide') {
          const newOffset = Math.max(-60, Math.min(60, dragRef.current.initialVal + dy));
          setSlideYOffset(newOffset);
        } else if (dragRef.current.mode === 'focusKnob') {
          const newFocus = Math.max(0, Math.min(100, dragRef.current.initialVal + dy * 0.5));
          setFocusPosition(newFocus);
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (dragRef.current.mode) {
          dragRef.current.mode = null;
          try {
            canvas.releasePointerCapture(e.pointerId);
          } catch {
            // Ignore
          }
        }
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        // Mouse wheel smoothly adjusts focus
        setFocusPosition((prev) => Math.max(0, Math.min(100, prev + (e.deltaY > 0 ? 3 : -3))));
      };

      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('pointercancel', onPointerUp);
      canvas.addEventListener('wheel', onWheel, { passive: false });

      renderMicroscopeView(app);
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

  // Update canvas on state change
  useEffect(() => {
    if (appRef.current) {
      renderMicroscopeView(appRef.current);
    }

    // Check Win Condition
    if (candidate.isCorrect && isFocusSharp && isSlideAligned && !isSolved) {
      setIsSolved(true);
      setMatchStatus('TRÙNG KHỚP QUANG PHỔ 100%!');
      audioManager.playSfx('puzzle_solve');
      solvePuzzle('puzzle-microscope');
      collectEvidence('EVD-HT-06');
    } else if (candidate.isCorrect && (!isFocusSharp || !isSlideAligned)) {
      setMatchStatus('DÂY PHÙ HỢP: HÃY KÉO CĂN HÀNG VÀ VẶN NÚM TIÊU CỰ VỀ GIỮA');
    } else {
      setMatchStatus('KHÔNG TRÙNG KHỚP HÌNH THÁI VÀ ĐƯỜNG KÍNH');
    }
  }, [candidate, isFocusSharp, isSlideAligned, isSolved, solvePuzzle, collectEvidence]);

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
      <div className="relative w-full max-w-5xl bg-[#14100c] border-2 border-[#8a7663] rounded shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#1e1710] border-b border-[#4a3b2c] text-amber-200">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp stamp-green text-[10px] py-0.5 px-2 font-bold">
              PHÁP Y HÌNH SỰ 1989
            </span>
            <div>
              <h2 className="text-base font-bold font-dossier-serif text-amber-100 leading-none">
                Kính Hiển Vi Đối Chiếu Hai Mắt // Leitz Wetzlar
              </h2>
              <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-0.5">
                KÉO TIÊU BẢN TRÊN MÀN HÌNH ĐỂ CĂN HÀNG // LĂN CHUỘT ĐỂ ĐIỀU CHỈNH ĐỘ NÉT
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

        {/* Microscope Canvas Stage */}
        <div className="relative w-full bg-[#080605] flex flex-col items-center justify-center py-2">
          <div ref={mountRef} className="w-full flex justify-center cursor-ns-resize" />

          {/* Direct Drag Hint Badges */}
          <div className="absolute top-4 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded bg-black/80 border border-amber-600/70 text-amber-300 text-[11px] font-mono shadow-xl backdrop-blur-sm">
            <Hand className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>KÉO CHUỘT LÊN/XUỐNG ĐỂ CĂN THẲNG RÃNH SIẾT</span>
          </div>

          <div className="absolute top-4 right-14 z-20 flex items-center gap-2 px-3 py-1.5 rounded bg-black/80 border border-amber-600/70 text-amber-300 text-[11px] font-mono shadow-xl backdrop-blur-sm">
            <MoveVertical className="w-4 h-4 text-amber-400" />
            <span>LĂN CHUỘT HOẶC KÉO NÚM BÊN PHẢI ĐỂ LÀM NÉT</span>
          </div>

          {/* Alignment status banner */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/90 border border-stone-700 text-xs font-mono flex items-center gap-3">
            <span className="text-stone-400">TRẠNG THÁI:</span>
            <span className={`font-bold ${isSolved ? 'text-emerald-400' : isFocusSharp && isSlideAligned ? 'text-yellow-400' : 'text-stone-300'}`}>
              {matchStatus}
            </span>
          </div>
        </div>

        {/* Forensic Specimen Shelf & Controls */}
        <div className="p-4 bg-[#1a140e] border-t border-[#3b2b1d] grid grid-cols-1 md:grid-cols-3 gap-4 text-amber-100">
          
          {/* Column 1: Candidate Selector */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>1. CHỌN MẪU DÂY NGHI VẤN</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {CANDIDATES.map((spec, idx) => (
                <button
                  key={spec.id}
                  onClick={() => {
                    audioManager.playSfx('click');
                    setSelectedCandidateIndex(idx);
                  }}
                  className={`w-full text-left p-2 rounded text-xs font-mono transition-all flex items-center justify-between border cursor-pointer ${
                    selectedCandidateIndex === idx
                      ? 'bg-amber-950/90 border-amber-500 text-amber-100 font-bold shadow-md'
                      : 'bg-stone-900/60 border-stone-700/80 text-stone-300 hover:border-stone-500'
                  }`}
                >
                  <span className="truncate">{spec.name}</span>
                  <span className="text-[10px] text-amber-400 shrink-0 ml-2 font-bold">{spec.diameter}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Focus & Magnification */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>2. TIÊU CỰ & PHÓNG ĐẠI</span>
            </div>

            <div className="p-2.5 rounded bg-stone-900/70 border border-stone-700/80 space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-stone-400">TIÊU CỰ:</span>
                <span className={`font-bold ${isFocusSharp ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isFocusSharp ? 'RÕ NÉT (100%)' : 'MỜ QUANG HỌC'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={focusPosition}
                onChange={(e) => setFocusPosition(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-stone-400 uppercase">THỊ KÍNH:</span>
              {(['10X', '40X', '100X'] as const).map((mag) => (
                <button
                  key={mag}
                  onClick={() => {
                    audioManager.playSfx('click');
                    setMagnification(mag);
                  }}
                  className={`flex-1 py-1 rounded text-xs font-mono font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                    magnification === mag
                      ? 'bg-amber-600 text-stone-950 border-amber-400 shadow-md'
                      : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-stone-500'
                  }`}
                >
                  {mag}
                </button>
              ))}
            </div>

            {/* Fine Alignment Adjustment */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  setSlideYOffset((prev) => Math.max(-60, prev - 5));
                }}
                className="flex-1 py-1 rounded bg-stone-900 hover:bg-stone-800 text-amber-200 border border-stone-700 text-[10px] font-mono font-bold cursor-pointer"
              >
                ▲ DỊCH LÊN
              </button>
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  setSlideYOffset(0);
                }}
                className="px-2 py-1 rounded bg-amber-900/60 hover:bg-amber-800 text-amber-300 border border-amber-600 text-[10px] font-mono font-bold cursor-pointer"
              >
                KHỚP TRỤC
              </button>
              <button
                onClick={() => {
                  audioManager.playSfx('click');
                  setSlideYOffset((prev) => Math.min(60, prev + 5));
                }}
                className="flex-1 py-1 rounded bg-stone-900 hover:bg-stone-800 text-amber-200 border border-stone-700 text-[10px] font-mono font-bold cursor-pointer"
              >
                ▼ DỊCH XUỐNG
              </button>
            </div>
          </div>

          {/* Column 3: Forensic Conclusion */}
          <div className="p-3 rounded bg-[#120e0a] border border-[#3b2b1d] flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>KẾT LUẬN GIÁM ĐỊNH</span>
              </div>
              <p className="text-xs font-typewriter text-stone-300 leading-relaxed">
                {candidate.description}
              </p>
            </div>

            {isSolved ? (
              <div className="p-2 rounded bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-mono space-y-0.5 animate-in zoom-in-95 duration-150">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  XÁC NHẬN HUNG KHÍ ÁN MẠNG!
                </div>
                <p className="text-[10px] font-typewriter leading-tight text-emerald-100">
                  Dây đàn Tỳ bà số 2 phủ đầy nhựa thông chính là hung khí siết cổ ông Phát!
                </p>
              </div>
            ) : (
              <div className="text-[10px] font-mono text-stone-400 italic">
                * Kéo tiêu bản bằng chuột để căn hàng với rãnh cổ bên trái, lăn con trỏ chuột để lấy nét tiêu cự.
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 bg-[#140e0a] border-t border-[#3b2b1d] flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-400">
            PHÒNG KỸ THUẬT HÌNH SỰ // CÔNG AN QUẬN 5 (1989)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-mono text-xs uppercase tracking-wider font-bold border border-stone-600 cursor-pointer"
          >
            ĐÓNG KÍNH HIỂN VI
          </button>
        </div>

      </div>
    </div>
  );
};
