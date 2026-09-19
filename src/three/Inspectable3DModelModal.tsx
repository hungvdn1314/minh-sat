import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioManager } from '../audio/AudioManager';
import { useGameStore, InspectablePropId } from '../store/gameStore';
import {
  X,
  Search,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface Inspectable3DModelModalProps {
  propId: InspectablePropId;
  onClose: () => void;
}

export const Inspectable3DModelModal: React.FC<Inspectable3DModelModalProps> = ({
  propId,
  onClose
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { collectEvidence } = useGameStore();

  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [hasDiscoveredSecret, setHasDiscoveredSecret] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  // Prop configuration
  const propConfig = {
    'ivory-chess': {
      title: 'Quân Cờ Hắc Tướng Cưa Đôi (Ngà Voi)',
      docket: 'TANG VẬT #03 // HIỆN TRƯỜNG BÀN CỜ TƯỚNG',
      description: 'Quân cờ Tướng bằng ngà voi nguyên khối thuộc về Lương Vĩnh Phát. Quân cờ đã bị cưa đôi chính xác bằng cưa lọng số 0. Hãy tách hai nửa quân cờ để khám phá khoang bí mật bên trong!',
      actionLabel: isExploded ? 'Ghép Lại Quân Cờ' : 'Tách Đôi Quân Cờ',
      secretEvidenceId: 'EVD-HT-14',
      secretNote: 'Phát hiện cuộn vi phim Microfilm 35mm bọc sáp giấu trong khoang rỗng quân Hắc Tướng!'
    },
    'double-bottom-teapot': {
      title: 'Ấm Trà Sen Đồng Hai Đáy (Tỏa Nhiệt CaO)',
      docket: 'TANG VẬT #04 // BÀN TRÀ THƯ PHÒNG',
      description: 'Ấm trà bằng đồng tráng men vẫn còn nóng ấm 48°C sau hơn 2 tiếng cúp điện trong đêm bão. Hãy tháo rời nắp đáy ngầm để giám định cơ chế sinh nhiệt!',
      actionLabel: isExploded ? 'Lắp Lại Đáy Ngầm' : 'Mở Đáy Ngầm Hóa Chất',
      secretEvidenceId: 'EVD-HT-04',
      secretNote: 'Phát hiện khoang đáy chứa bánh bột vôi sống (CaO) sấy khô bọc màng sáp tỏa nhiệt!'
    },
    'door-latch': {
      title: 'Then Đồng Cửa Lim & Vết Ma Sát Dây Sáp',
      docket: 'TANG VẬT #02 // CỬA THƯ PHÒNG TẦNG 2',
      description: 'Then cài bằng đồng nguyên khối khóa chặt cửa gỗ lim từ bên trong. Quan sát kỹ mép vát và lỗ chốt để tìm dấu vết ma sát của sợi chỉ tơ tằm tẩm sáp!',
      actionLabel: isExploded ? 'Đóng Then Khóa' : 'Rút Then Cài Đồng',
      secretEvidenceId: 'EVD-HT-02',
      secretNote: 'Phát hiện 4cm sợi chỉ tơ tằm tẩm sáp kẹt cứng trong ngàm chốt do ma sát giật từ khe sàn!'
    }
  }[propId || 'ivory-chess'];

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !propId) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0806');

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.0);

    // 2. Clamped DPR Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const clampedDPR = Math.min(window.devicePixelRatio || 1, 2.0);
    renderer.setPixelRatio(clampedDPR);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting for Forensic Table
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x78350f, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 3.5);
    keyLight.position.set(3, 4, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfef3c7, 2.0);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    // 4. Velvet Turn-Table Base
    const tableGeo = new THREE.CylinderGeometry(2.8, 2.9, 0.3, 48);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x1a1510,
      roughness: 0.9,
      metalness: 0.1
    });
    const tableMesh = new THREE.Mesh(tableGeo, tableMat);
    tableMesh.position.y = -1.4;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    // 5. Build 3D Prop Geometry
    const propGroup = new THREE.Group();
    let animPart2: THREE.Mesh | THREE.Group | null = null;
    let secretObjectMesh: THREE.Mesh | null = null;

    if (propId === 'ivory-chess') {
      // Ivory Chess Piece (Quân Hắc Tướng)
      const ivoryMat = new THREE.MeshStandardMaterial({
        color: 0xfdfaf2,
        roughness: 0.35,
        metalness: 0.05
      });

      // Bottom Half
      const bottomGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.7, 36);
      const bottomMesh = new THREE.Mesh(bottomGeo, ivoryMat);
      bottomMesh.position.y = -0.35;
      bottomMesh.castShadow = true;
      propGroup.add(bottomMesh);

      // Top Half
      const topGeo = new THREE.CylinderGeometry(1.15, 1.2, 0.7, 36);
      const topMesh = new THREE.Mesh(topGeo, ivoryMat);
      topMesh.position.y = 0.35;
      topMesh.castShadow = true;
      propGroup.add(topMesh);
      animPart2 = topMesh;

      // Red Carved Chinese Character "將" (Black General) on Top Face
      const emblemGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.02, 32);
      const emblemMat = new THREE.MeshStandardMaterial({
        color: 0x991b1b,
        roughness: 0.5
      });
      const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
      emblemMesh.position.set(0, 0.36, 0);
      topMesh.add(emblemMesh);

      // Microfilm Capsule in Hollow Cavity
      const capsuleGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.6, 24);
      const capsuleMat = new THREE.MeshStandardMaterial({
        color: 0xca8a04,
        metalness: 0.85,
        roughness: 0.25
      });
      secretObjectMesh = new THREE.Mesh(capsuleGeo, capsuleMat);
      secretObjectMesh.position.set(0, 0, 0);
      secretObjectMesh.visible = false;
      propGroup.add(secretObjectMesh);
    } else if (propId === 'double-bottom-teapot') {
      // Antique Copper Teapot (Ấm Trà Sen)
      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.35,
        roughness: 0.35
      });

      // Main Pot Body
      const bodyGeo = new THREE.SphereGeometry(1.3, 32, 24);
      const bodyMesh = new THREE.Mesh(bodyGeo, copperMat);
      bodyMesh.scale.set(1.0, 0.85, 1.0);
      propGroup.add(bodyMesh);

      // Spout
      const spoutGeo = new THREE.CylinderGeometry(0.2, 0.35, 1.4, 16);
      const spoutMesh = new THREE.Mesh(spoutGeo, copperMat);
      spoutMesh.rotation.z = -Math.PI / 4;
      spoutMesh.position.set(1.2, 0.3, 0);
      bodyMesh.add(spoutMesh);

      // Handle
      const handleGeo = new THREE.TorusGeometry(0.9, 0.12, 16, 32, Math.PI);
      const handleMesh = new THREE.Mesh(handleGeo, copperMat);
      handleMesh.rotation.z = Math.PI / 2;
      handleMesh.position.set(-1.2, 0.1, 0);
      bodyMesh.add(handleMesh);

      // False Bottom Plate (Containing White CaO Cake)
      const bottomPlateGeo = new THREE.CylinderGeometry(1.0, 1.05, 0.25, 32);
      const bottomPlateMat = new THREE.MeshStandardMaterial({
        color: 0xb45309,
        metalness: 0.4,
        roughness: 0.4
      });
      const bottomPlate = new THREE.Mesh(bottomPlateGeo, bottomPlateMat);
      bottomPlate.position.set(0, -1.0, 0);
      propGroup.add(bottomPlate);
      animPart2 = bottomPlate;

      // White Calcium Oxide (CaO) Chemical Cake
      const caoGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.15, 24);
      const caoMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.95
      });
      secretObjectMesh = new THREE.Mesh(caoGeo, caoMat);
      secretObjectMesh.position.set(0, -0.85, 0);
      secretObjectMesh.visible = false;
      propGroup.add(secretObjectMesh);
    } else {
      // Bronze Door Latch (Then Đồng Khóa Cửa Lim)
      const bronzeMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.35,
        roughness: 0.35
      });

      // Wooden Mount Base (Lim Door Fragment)
      const mountGeo = new THREE.BoxGeometry(3.6, 2.0, 0.3);
      const mountMat = new THREE.MeshStandardMaterial({
        color: 0x451a03,
        roughness: 0.65
      });
      const woodMount = new THREE.Mesh(mountGeo, mountMat);
      woodMount.position.z = -0.25;
      propGroup.add(woodMount);

      // Bronze Guide Staple Plate Left
      const guideGeo = new THREE.BoxGeometry(0.8, 1.2, 0.45);
      const guideMeshLeft = new THREE.Mesh(guideGeo, bronzeMat);
      guideMeshLeft.position.set(-0.8, 0, 0.15);
      propGroup.add(guideMeshLeft);

      // Bronze Guide Staple Plate Right
      const guideMeshRight = new THREE.Mesh(guideGeo, bronzeMat);
      guideMeshRight.position.set(1.1, 0, 0.15);
      propGroup.add(guideMeshRight);

      // Sliding Bolt Itself
      const boltGeo = new THREE.BoxGeometry(2.4, 0.42, 0.3);
      const boltMesh = new THREE.Mesh(boltGeo, bronzeMat);
      boltMesh.position.set(0.2, 0, 0.22);
      propGroup.add(boltMesh);
      animPart2 = boltMesh;

      // Bolt Handle Knob
      const knobGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.55, 16);
      const knobMesh = new THREE.Mesh(knobGeo, bronzeMat);
      knobMesh.rotation.x = Math.PI / 2;
      knobMesh.position.set(0.6, 0, 0.35);
      boltMesh.add(knobMesh);

      // Yellow Waxed Silk Thread Wrapped Around Knob
      const threadGeo = new THREE.TorusGeometry(0.22, 0.05, 12, 24);
      const threadMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.4
      });
      secretObjectMesh = new THREE.Mesh(threadGeo, threadMat);
      secretObjectMesh.position.set(0.6, 0, 0.32);
      boltMesh.add(secretObjectMesh);
    }

    propGroup.rotation.y = -0.15;
    propGroup.rotation.x = 0.08;
    scene.add(propGroup);

    // 6. Interactive Mouse Drag Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      propGroup.rotation.y += deltaX * 0.01;
      propGroup.rotation.x += deltaY * 0.01;
      propGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, propGroup.rotation.x));

      rotationVelocity = { x: deltaY * 0.001, y: deltaX * 0.001 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0015;
      camera.position.z = Math.max(3.0, Math.min(7.5, camera.position.z - zoomDelta));
      setZoomLevel(5.0 / camera.position.z);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 7. Animation Loop with Smooth Explode / Reassemble
    let animationId: number;
    let explodeProgress = 0.0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth dampening when not dragging
      if (!isDragging) {
        propGroup.rotation.y += rotationVelocity.y;
        rotationVelocity.y *= 0.90;
      }

      // Smooth Explode / Separation Animation
      const targetProgress = isExploded ? 1.0 : 0.0;
      explodeProgress += (targetProgress - explodeProgress) * 0.12;

      if (propId === 'ivory-chess' && animPart2) {
        animPart2.position.y = 0.35 + explodeProgress * 1.3;
        if (secretObjectMesh) {
          secretObjectMesh.visible = explodeProgress > 0.4;
          secretObjectMesh.scale.setScalar(0.5 + explodeProgress * 0.5);
        }
      } else if (propId === 'double-bottom-teapot' && animPart2) {
        animPart2.position.y = -1.0 - explodeProgress * 1.2;
        if (secretObjectMesh) {
          secretObjectMesh.visible = explodeProgress > 0.3;
        }
      } else if (propId === 'door-latch' && animPart2) {
        animPart2.position.x = 0.2 - explodeProgress * 1.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup GPU Resources
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);

      tableGeo.dispose();
      tableMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [propId, isExploded]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && propId) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [propId, onClose]);

  if (!propId) return null;

  const handleToggleExplode = () => {
    audioManager.playSfx('click');
    const nextState = !isExploded;
    setIsExploded(nextState);

    if (nextState && !hasDiscoveredSecret) {
      setHasDiscoveredSecret(true);
      audioManager.playSfx('evidence');
      if (propConfig.secretEvidenceId) {
        collectEvidence(propConfig.secretEvidenceId);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 pointer-events-auto select-none">
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#120e0a] border-2 border-[#8a7663] rounded shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#1e1710] border-b border-[#4a3b2c] text-amber-200">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp stamp-amber text-[10px] py-0.5 px-2">
              GIÁM ĐỊNH TẢI NGUYÊN 3D
            </span>
            <div>
              <h2 className="text-base font-bold font-dossier-serif text-amber-100 leading-none">
                {propConfig.title}
              </h2>
              <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-0.5">
                {propConfig.docket}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-black/40 hover:bg-red-950/80 text-stone-300 hover:text-red-300 border border-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Viewport Area */}
        <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#0e0a07] to-[#1a140d]">
          <div ref={mountRef} className="w-full h-full" />

          {/* Interactive Inspection Controls Floating Bar */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <button
              onClick={handleToggleExplode}
              className={`px-4 py-2 rounded text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-xl border transition-all cursor-pointer ${
                isExploded
                  ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 border-amber-400'
                  : 'bg-[#291b10] hover:bg-[#3b2718] text-amber-200 border-amber-600/80'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{propConfig.actionLabel}</span>
            </button>
          </div>

          {/* Zoom Indicator HUD */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded bg-black/60 border border-stone-700/80 text-[10px] font-mono text-amber-300 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            <span>ĐỘ PHÓNG ĐẠI: {(zoomLevel * 100).toFixed(0)}% // CUỘN CHUỘT ĐỂ ZOOM</span>
          </div>

          {/* Secret Discovery Floating Banner */}
          {isExploded && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[90%] animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="p-4 rounded-lg shadow-2xl border-2 border-[#5c4632] bg-[#f5ebd7] text-[#1c1917] flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rubber-stamp stamp-green text-[9px] py-0.5 px-2 font-bold">
                      MANH MỐI BẬT MỞ
                    </span>
                    <span className="text-xs font-bold text-[#8a1c1c] uppercase tracking-wide font-dossier-serif">
                      PHÁT HIỆN CẤU TRÚC BÍ MẬT!
                    </span>
                  </div>
                  <p className="text-xs font-typewriter text-[#29221b] font-semibold leading-relaxed">
                    {propConfig.secretNote}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Dossier Description */}
        <div className="p-4 bg-[#18120c] border-t border-[#3b2b1d] text-xs font-typewriter text-[#cbbba0] flex items-center justify-between gap-4">
          <p className="max-w-2xl leading-relaxed">
            {propConfig.description}
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-mono text-xs uppercase tracking-wider font-bold shrink-0 border border-stone-600 cursor-pointer"
          >
            ĐÓNG GIÁM ĐỊNH
          </button>
        </div>

      </div>
    </div>
  );
};
