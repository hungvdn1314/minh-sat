import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioManager } from '../audio/AudioManager';
import { Flashlight, ClipboardCheck } from 'lucide-react';
import { EvidenceTentMarker } from '../components/ui/diegetic/EvidenceTentMarker';

interface HotspotMeshConfig {
  id: string;
  evidenceId: string;
  title: string;
  hasPuzzle?: boolean;
  position: THREE.Vector3;
  size: THREE.Vector2;
  description: string;
}

interface CrimeSceneViewerProps {
  onSelectHotspot: (evidenceId: string, hasPuzzle?: boolean) => void;
  collectedEvidenceIds: string[];
}

export const CrimeSceneViewer: React.FC<CrimeSceneViewerProps> = ({
  onSelectHotspot,
  collectedEvidenceIds
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredClue, setHoveredClue] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030508');

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.8);

    // 2. Renderer with Clamped DPR
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    const clampedDPR = Math.min(window.devicePixelRatio || 1, 2.0);
    renderer.setPixelRatio(clampedDPR);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3. Realistic Dim Crime Scene Lighting & Flashlight Beam
    // Atmospheric low ambient light so the room is shadowy
    const ambientLight = new THREE.AmbientLight(0x1a2333, 0.45);
    scene.add(ambientLight);

    // City street light bleed from window
    const cityBleedLight = new THREE.PointLight(0xd97706, 0.8, 12);
    cityBleedLight.position.set(-3.5, 1.5, 3);
    scene.add(cityBleedLight);

    // Detective Flashlight (follows cursor with volumetric penumbra)
    const flashlight = new THREE.SpotLight(0xfff5ea, 5.2);
    flashlight.position.set(0, 0, 6.5);
    flashlight.angle = Math.PI / 6;
    flashlight.penumbra = 0.5;
    flashlight.decay = 1.0;
    flashlight.distance = 14;
    scene.add(flashlight);

    const flashlightTarget = new THREE.Object3D();
    scene.add(flashlightTarget);
    flashlight.target = flashlightTarget;

    // 4. Photorealistic Crime Scene Background
    const textureLoader = new THREE.TextureLoader();
    let bgTexture: THREE.Texture | null = null;
    let bgPlane: THREE.Mesh | null = null;

    textureLoader.load(
      '/assets/images/scenes/apt507_bg.jpg',
      (texture) => {
        bgTexture = texture;
        texture.colorSpace = THREE.SRGBColorSpace;
        const geom = new THREE.PlaneGeometry(13.8, 7.76);
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
          metalness: 0.1
        });
        bgPlane = new THREE.Mesh(geom, mat);
        bgPlane.position.set(0, 0, 0);
        scene.add(bgPlane);
      },
      undefined,
      (err) => {
        console.warn('Failed to load apt507_bg.jpg, fallback to procedural layer:', err);
      }
    );

    // 5. Precise Hit-Boxes calibrated to apt507_bg.jpg photorealistic scene
    // Items are discovered by exploring with the flashlight and clicking directly on props.
    const cluesConfig: HotspotMeshConfig[] = [
      {
        id: 'clue-rope',
        evidenceId: 'EVD-07',
        title: 'Sợi Dây Thừng Xà Gồ',
        description: 'Đầu dây dù bện có nút thắt chuyên dụng treo trên xà gồ trần phòng khách',
        position: new THREE.Vector3(2.1, 1.8, 0.1),
        size: new THREE.Vector2(1.4, 2.2)
      },
      {
        id: 'clue-coffee',
        evidenceId: 'EVD-01',
        title: 'Tách Cà Phê Uống Dở',
        description: 'Tách cà phê đen trên mặt bàn làm việc bên phải',
        position: new THREE.Vector3(2.9, -0.5, 0.1),
        size: new THREE.Vector2(0.9, 0.9)
      },
      {
        id: 'clue-cipher',
        evidenceId: 'EVD-12',
        title: 'Mẩu Giấy & Bảng Ký Tự NJOI QIBU',
        description: 'Ghi chú nhàu nát rơi cạnh biển số 12 dưới chân ghế đổ',
        hasPuzzle: true,
        position: new THREE.Vector3(2.8, -2.4, 0.1),
        size: new THREE.Vector2(1.2, 1.0)
      },
      {
        id: 'clue-balcony',
        evidenceId: 'EVD-03',
        title: 'Vết Cạy Khung Cửa Kính',
        description: 'Vết trầy kim loại mới toanh gần chốt cài ban công kính bên trái',
        position: new THREE.Vector3(-3.7, 0.4, 0.1),
        size: new THREE.Vector2(1.6, 2.4)
      }
    ];

    const hitMeshes: { mesh: THREE.Mesh; config: HotspotMeshConfig }[] = [];

    cluesConfig.forEach((clue) => {
      const geom = new THREE.PlaneGeometry(clue.size.x, clue.size.y);
      // Completely invisible material used strictly for raycasting (No colored bounding boxes!)
      const mat = new THREE.MeshBasicMaterial({
        visible: false,
        transparent: true,
        opacity: 0.0,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(clue.position);
      scene.add(mesh);
      hitMeshes.push({ mesh, config: clue });
    });

    // 6. Pointer & Raycasting Setup
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let currentIntersect: HotspotMeshConfig | null = null;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Subtle parallax camera motion
      camera.position.x = mouse.x * 0.35;
      camera.position.y = mouse.y * 0.2;
      camera.lookAt(0, 0, 0);

      // Flashlight target points where cursor hovers
      flashlightTarget.position.x = mouse.x * 4.5;
      flashlightTarget.position.y = mouse.y * 2.6;
      flashlight.position.x = mouse.x * 3.8;
      flashlight.position.y = mouse.y * 2.2;
    };

    const handlePointerMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);

      // Raycast test for clue hover
      raycaster.setFromCamera(mouse, camera);
      const targets = hitMeshes.map(h => h.mesh);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const hit = hitMeshes.find(h => h.mesh === intersects[0].object);
        if (hit && currentIntersect?.id !== hit.config.id) {
          currentIntersect = hit.config;
          setHoveredClue(hit.config.title);
        }
      } else {
        if (currentIntersect) {
          currentIntersect = null;
          setHoveredClue(null);
        }
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse, camera);
      const targets = hitMeshes.map(h => h.mesh);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const hit = hitMeshes.find(h => h.mesh === intersects[0].object);
        if (hit) {
          audioManager.playSfx('click');
          onSelectHotspot(hit.config.evidenceId, hit.config.hasPuzzle);
        }
      }
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', handleResize);

    // 7. Clean Render Loop (No colored pulsing artifacts)
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 8. GPU Disposal Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      if (bgTexture) bgTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectHotspot, collectedEvidenceIds]);

  const forensicObjectives = [
    {
      id: 'obj-balcony',
      evidenceId: 'EVD-03',
      label: 'Vết cạy chốt cửa kính',
      locationHint: 'Khung kính ban công phía Tây (Bên trái)'
    },
    {
      id: 'obj-coffee',
      evidenceId: 'EVD-01',
      label: 'Tách cà phê còn ấm',
      locationHint: 'Mặt bàn làm việc nạn nhân (Bên phải)'
    },
    {
      id: 'obj-rope',
      evidenceId: 'EVD-07',
      label: 'Đoạn dây dù treo xà gồ',
      locationHint: 'Xà gồ thép trên trần phòng khách'
    },
    {
      id: 'obj-cipher',
      evidenceId: 'EVD-12',
      label: 'Mẩu giấy mật mã #12',
      locationHint: 'Sàn nhà dưới chân ghế xoay bị lật'
    }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Three.js Canvas Container with Flashlight Cursor */}
      <div
        ref={mountRef}
        className={`w-full h-full ${hoveredClue ? 'cursor-pointer' : 'cursor-crosshair'}`}
      />

      {/* Physical Diegetic Evidence Tent Markers placed next to discovered items */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {collectedEvidenceIds.includes('EVD-03') && (
          <div
            style={{ position: 'absolute', left: '23%', top: '48%' }}
            className="pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-75 duration-300"
          >
            <EvidenceTentMarker
              number="03"
              label="Vết cạy ban công"
              size="md"
              onClick={() => onSelectHotspot('EVD-03')}
            />
          </div>
        )}

        {collectedEvidenceIds.includes('EVD-01') && (
          <div
            style={{ position: 'absolute', left: '71%', top: '56%' }}
            className="pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-75 duration-300"
          >
            <EvidenceTentMarker
              number="01"
              label="Tách cà phê còn ấm"
              size="md"
              onClick={() => onSelectHotspot('EVD-01')}
            />
          </div>
        )}

        {collectedEvidenceIds.includes('EVD-07') && (
          <div
            style={{ position: 'absolute', left: '65%', top: '25%' }}
            className="pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-75 duration-300"
          >
            <EvidenceTentMarker
              number="07"
              label="Đoạn dây dù treo xà gồ"
              size="md"
              onClick={() => onSelectHotspot('EVD-07')}
            />
          </div>
        )}

        {collectedEvidenceIds.includes('EVD-12') && (
          <div
            style={{ position: 'absolute', left: '70%', top: '80%' }}
            className="pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-75 duration-300"
          >
            <EvidenceTentMarker
              number="12"
              label="Mẩu giấy mật mã #12"
              size="md"
              onClick={() => onSelectHotspot('EVD-12', true)}
            />
          </div>
        )}
      </div>

      {/* Atmospheric Detective Flashlight Caution Tape Banner */}
      <div className="absolute top-16 left-6 z-20 pointer-events-none flex items-center gap-3">
        <div className="evidence-tape px-3.5 py-1.5 rounded shadow-2xl flex items-center gap-2.5 border border-stone-900/60">
          <Flashlight className="w-4 h-4 text-black animate-pulse" />
          <span className="text-[11px] tracking-wider text-black uppercase font-bold">
            VÙNG PHONG TỎA // RÊ CHÙM ĐÈN PIN & CLICK TRỰC TIẾP VẬT THỂ
          </span>
        </div>
      </div>

      {/* Physical Wooden Forensic Clipboard HUD */}
      <div
        style={{ position: 'absolute' }}
        className="top-20 right-6 z-20 pointer-events-none max-w-xs w-80 forensic-clipboard p-2.5 pt-5 shadow-2xl"
      >
        {/* Metal Spring Clip on top of clipboard */}
        <div className="forensic-clipboard-clip" />

        {/* Manila Paper Sheet clipped to the board */}
        <div className="dossier-sheet p-3.5 rounded space-y-2 text-[#1c1917] font-typewriter">
          <div className="flex items-center justify-between border-b-2 border-[#8c7a65] pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <ClipboardCheck className="w-3.5 h-3.5 text-[#991b1b]" />
                <span className="text-[11px] font-bold text-[#1a1c22] uppercase tracking-wider">
                  MỤC TIÊU PHÁP Y
                </span>
              </div>
              <div className="text-[9px] text-[#635341] tracking-tight">Hồ sơ khám nghiệm #507</div>
            </div>
            <span className="rubber-stamp stamp-red text-[10px] py-0.5 px-1.5">
              {forensicObjectives.filter(o => collectedEvidenceIds.includes(o.evidenceId)).length}/4 VẬT CHỨNG
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {forensicObjectives.map(obj => {
              const isFound = collectedEvidenceIds.includes(obj.evidenceId);
              return (
                <div
                  key={obj.id}
                  className={`p-2 rounded transition-all border ${
                    isFound
                      ? 'bg-[#d0c2a8]/60 border-[#a8957c] text-[#523d2b]'
                      : 'bg-[#ede5d3]/90 border-[#c4b39b] text-[#1c1917] shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-xs shrink-0 font-mono">
                      {isFound ? (
                        <span className="text-[#991b1b]">[✓]</span>
                      ) : (
                        <span className="text-[#8a7663]">[ ]</span>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs leading-tight font-bold ${isFound ? 'line-through text-[#8c745d]' : 'text-[#1c1917]'}`}>
                        {obj.label}
                      </div>
                      <div className="text-[10px] text-[#6b5845] mt-0.5 truncate italic">
                        {obj.locationHint}
                      </div>
                    </div>
                    {isFound && (
                      <span className="text-[8px] font-bold text-[#991b1b] uppercase tracking-wider shrink-0 border border-[#991b1b]/50 px-1 rounded">
                        ĐÃ THU
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-1.5 text-[9px] text-[#6b5845] italic text-center border-t border-[#8c7a65]/60 font-mono">
            * Rà chùm sáng đèn pin và bấm trực tiếp lên đồ vật trong phòng
          </div>
        </div>
      </div>

      {/* Hover Evidence Marker Tent Tag (Appears when flashlight illuminates suspicious clue) */}
      {hoveredClue && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="evidence-marker px-5 py-2.5 rounded shadow-2xl flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-black text-amber-400 font-black text-sm flex items-center justify-center font-mono border border-amber-300 shrink-0">
              !
            </div>
            <div>
              <div className="text-[9px] font-mono text-black font-extrabold uppercase tracking-widest">
                TANG VẬT PHÁT HIỆN // CLICK ĐỂ THU THẬP
              </div>
              <div className="text-sm font-bold text-black font-typewriter">{hoveredClue}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
