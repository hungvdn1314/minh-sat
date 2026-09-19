import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { audioManager } from '../audio/AudioManager';
import { Flashlight, Eye, Move, Search } from 'lucide-react';
import { EvidenceTentMarker } from '../components/ui/diegetic/EvidenceTentMarker';
import { ForensicInvestigationClipboard } from '../components/game/ForensicInvestigationClipboard';

export interface HamTuHotspot {
  id: string;
  evidenceId?: string;
  characterId?: string;
  puzzleId?: string;
  inspectablePropId?: 'ivory-chess' | 'double-bottom-teapot' | 'door-latch';
  title: string;
  description: string;
  tentNumber: string;
  position3D: THREE.Vector3;
  meshSize: THREE.Vector3;
  markerType: 'crime' | 'weapon' | 'blood' | 'document';
}

interface HamTuCrimeSceneViewerProps {
  locationId: string;
  collectedEvidenceIds: string[];
  onSelectEvidence: (evidenceId: string) => void;
  onSelectCharacter: (characterId: string) => void;
  onSelectPuzzle: (puzzleId: string) => void;
  onSelectInspectableProp: (propId: 'ivory-chess' | 'double-bottom-teapot' | 'door-latch') => void;
}

// Background images mapping
const LOCATION_BACKGROUNDS: Record<string, string> = {
  'loc-hamtu-floor2': '/assets/images/scenes/hamtu_floor2_study.jpg',
  'loc-hamtu-floor1': '/assets/images/scenes/hamtu_floor1_workshop.jpg',
  'loc-hamtu-ground': '/assets/images/scenes/hamtu_ground_dock.jpg'
};

// Clue configurations calibrated to the actual photographic scene plates
const FLOOR_CLUES: Record<string, HamTuHotspot[]> = {
  'loc-hamtu-floor2': [
    {
      id: 'clue-victim',
      evidenceId: 'EVD-HT-01',
      puzzleId: 'puzzle-microscope',
      title: 'Tử thi Lương Vĩnh Phát & Rãnh Siết Cổ Kép',
      description: 'Nạn nhân gục cạnh bàn làm việc. Cổ có vết siết bầm tím kép 0.8mm. Nhấp để soi kính hiển vi pháp y!',
      tentNumber: '#01',
      position3D: new THREE.Vector3(0.5, -0.9, 0.1),
      meshSize: new THREE.Vector3(1.6, 1.8, 0.8),
      markerType: 'crime'
    },
    {
      id: 'clue-door',
      evidenceId: 'EVD-HT-02',
      puzzleId: 'puzzle-cord-physics',
      inspectablePropId: 'door-latch',
      title: 'Cánh Cửa Lim & Then Khóa Chốt Trong',
      description: 'Cửa gỗ Lim then cài chốt trong. Dưới khe sàn gỗ 5mm kẹt mẩu chỉ sáp màu vàng. Nhấp để thực nghiệm cơ học phòng kín!',
      tentNumber: '#02',
      position3D: new THREE.Vector3(-6.0, 0.0, 0.1),
      meshSize: new THREE.Vector3(1.5, 2.8, 0.8),
      markerType: 'crime'
    },
    {
      id: 'clue-chess',
      evidenceId: 'EVD-HT-03',
      inspectablePropId: 'ivory-chess',
      title: 'Bàn Cờ Tướng & Quân Hắc Tướng Cưa Đôi',
      description: 'Bàn cờ tướng ngà voi trên mặt bàn. Quân Tướng bị cưa đôi rỗng ruột. Nhấp để soi 3D 360° tìm vi phim!',
      tentNumber: '#03',
      position3D: new THREE.Vector3(-1.2, -0.65, 0.1),
      meshSize: new THREE.Vector3(1.2, 0.9, 0.8),
      markerType: 'document'
    },
    {
      id: 'clue-teapot',
      evidenceId: 'EVD-HT-04',
      inspectablePropId: 'double-bottom-teapot',
      title: 'Ấm Trà Sen Tỏa Nhiệt Vôi Sống (CaO)',
      description: 'Ấm trà bằng đồng 2 đáy cạnh đèn ngân hàng vẫn nóng ấm sau 2 giờ cúp điện. Nhấp để mổ xẻ cấu tạo 3D!',
      tentNumber: '#04',
      position3D: new THREE.Vector3(-2.6, -0.5, 0.1),
      meshSize: new THREE.Vector3(1.0, 0.9, 0.8),
      markerType: 'weapon'
    },
    {
      id: 'clue-cassette',
      evidenceId: 'EVD-HT-05',
      title: 'Bàn Thờ Gia Tộc & Máy Cassette Hẹn Giờ',
      description: 'Gian thờ gia tộc nghi ngút khói. Dưới chân bàn thờ giấu máy thâu âm Sony TCM nối dây cước sang cửa phòng bà Lan.',
      tentNumber: '#05',
      position3D: new THREE.Vector3(5.6, -0.4, 0.1),
      meshSize: new THREE.Vector3(1.8, 2.4, 0.8),
      markerType: 'document'
    },
    {
      id: 'clue-guitar',
      evidenceId: 'EVD-HT-06',
      puzzleId: 'puzzle-microscope',
      title: 'Cây Đàn Tỳ Bà Treo Tường Mất Dây Số 2',
      description: 'Cây đàn Tỳ bà treo trên vách gỗ lim, dây cước thép số 2 bị tháo rời. Hộp đàn vương bột nhựa thông trùng khớp hung khí.',
      tentNumber: '#06',
      position3D: new THREE.Vector3(-4.2, 1.4, 0.1),
      meshSize: new THREE.Vector3(1.1, 1.8, 0.8),
      markerType: 'weapon'
    },
    {
      id: 'clue-talk-lan',
      characterId: 'char-lan',
      title: 'Thẩm Vấn Trịnh Mỹ Lan (Vợ Kế Gia Chủ)',
      description: 'Người phụ nữ 28 tuổi trong bộ sườn xám lụa đen, đôi mắt ngấn lệ nép bên rèm cửa sổ nhìn ra ánh đèn neon Phở Bình Dân.',
      tentNumber: 'LAN',
      position3D: new THREE.Vector3(2.2, 0.4, 0.1),
      meshSize: new THREE.Vector3(1.4, 2.2, 0.8),
      markerType: 'document'
    }
  ],

  'loc-hamtu-floor1': [
    {
      id: 'clue-saw',
      evidenceId: 'EVD-HT-08',
      title: 'Khung Cưa Lọng Kim Hoàn Số 0',
      description: 'Chiếc cưa lọng siêu mảnh nằm giữa bàn thợ kẹp mạt ngà voi hữu cơ, vết cắt trùng khớp quân Hắc Tướng.',
      tentNumber: '#08',
      position3D: new THREE.Vector3(0.0, -1.3, 0.1),
      meshSize: new THREE.Vector3(1.4, 1.0, 0.8),
      markerType: 'weapon'
    },
    {
      id: 'clue-chemicals',
      evidenceId: 'EVD-HT-09',
      puzzleId: 'puzzle-trigrams',
      title: 'Hộc Bàn Khóa Bát Quái & Lò Phân Kim',
      description: 'Hộc bàn gỗ chạm rồng có ổ khóa 3 vòng Bát Quái bằng đồng. Chứa vôi sống và chỉ tơ tằm. Nhấp để giải mã vòng quay!',
      tentNumber: '#09',
      position3D: new THREE.Vector3(-5.2, -1.2, 0.1),
      meshSize: new THREE.Vector3(1.4, 1.2, 0.8),
      markerType: 'document'
    },
    {
      id: 'clue-trash',
      evidenceId: 'EVD-HT-10',
      title: 'Kệ Hóa Chất & Bản Di Chúc Bị Xé Góc',
      description: 'Kệ chai lọ axit nitric và sọt rác chứa mảnh di chúc bị xé dính mực tím của Lương Gia Tuấn.',
      tentNumber: '#10',
      position3D: new THREE.Vector3(-4.5, 0.6, 0.1),
      meshSize: new THREE.Vector3(1.4, 1.4, 0.8),
      markerType: 'document'
    },
    {
      id: 'clue-talk-chin',
      characterId: 'char-chin',
      title: 'Thẩm Vấn Thợ Chín "Kính Lão"',
      description: 'Người thợ bạc già 58 tuổi đeo kính lão dày cộm, ngồi dũa bạc bên bàn thợ xưởng phân kim.',
      tentNumber: 'CHÍN',
      position3D: new THREE.Vector3(4.2, -0.2, 0.1),
      meshSize: new THREE.Vector3(1.5, 2.2, 0.8),
      markerType: 'crime'
    },
    {
      id: 'clue-talk-tuan',
      characterId: 'char-tuan',
      title: 'Thẩm Vấn Lương Gia Tuấn (Con Trai Trưởng)',
      description: 'Gã con trai cả ngồi bồn chồn phía sau xưởng, mồ hôi nhễ nhại, ngón tay còn vệt mực tím chưa tẩy sạch.',
      tentNumber: 'TUẤN',
      position3D: new THREE.Vector3(2.3, -0.4, 0.1),
      meshSize: new THREE.Vector3(1.4, 2.2, 0.8),
      markerType: 'document'
    }
  ],

  'loc-hamtu-ground': [
    {
      id: 'clue-shoes',
      evidenceId: 'EVD-HT-11',
      title: 'Vũng Bùn Đỏ Bến Tàu & Giấy NỢ Máu',
      description: 'Vũng nước mưa đọng bùn đỏ Mễ Cốc dưới chân mái tôn. Giấu tờ cam kết trả nợ máu 200 lượng vàng.',
      tentNumber: '#11',
      position3D: new THREE.Vector3(-0.8, -2.4, 0.1),
      meshSize: new THREE.Vector3(1.4, 1.0, 0.8),
      markerType: 'document'
    },
    {
      id: 'clue-peugeot',
      evidenceId: 'EVD-HT-12',
      title: 'Xe Máy Peugeot 50cc Ống Pô Còn Nóng',
      description: 'Chiếc xe moped đỗ dưới mái hiên, ống xả vẫn nóng ấm 52°C lúc 22h40, đập tan bằng chứng ngoại phạm rời đi lúc 21h00.',
      tentNumber: '#12',
      position3D: new THREE.Vector3(-0.2, -1.0, 0.1),
      meshSize: new THREE.Vector3(1.8, 1.8, 0.8),
      markerType: 'crime'
    },
    {
      id: 'clue-letter',
      evidenceId: 'EVD-HT-13',
      title: 'Thùng Hàng Gỗ & Bức Thư Huyết Hận 1984',
      description: 'Chồng kiện hàng xuất nhập khẩu gỗ chứa lá thư cũ của con gái Thợ Chín tố cáo chuyến tàu ghe mục Cần Giờ.',
      tentNumber: '#13',
      position3D: new THREE.Vector3(3.5, -0.6, 0.1),
      meshSize: new THREE.Vector3(1.6, 1.6, 0.8),
      markerType: 'document'
    },
    {
      id: 'clue-talk-dai',
      characterId: 'char-dai',
      title: 'Thẩm Vấn Thanh Tra Trần Quốc Đại',
      description: 'Viên chức thanh tra sắc lạnh khoác măng tô ướt sũng, ngậm tẩu thuốc Dunhill nhìn ra dòng kênh Bến Hàm Tử.',
      tentNumber: 'ĐẠI',
      position3D: new THREE.Vector3(5.8, -0.3, 0.1),
      meshSize: new THREE.Vector3(1.4, 2.2, 0.8),
      markerType: 'document'
    }
  ]
};

export const HamTuCrimeSceneViewer: React.FC<HamTuCrimeSceneViewerProps> = ({
  locationId,
  collectedEvidenceIds,
  onSelectEvidence,
  onSelectCharacter,
  onSelectPuzzle,
  onSelectInspectableProp
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const markersOverlayRef = useRef<HTMLDivElement | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<HamTuHotspot | null>(null);
  const [discoveredHotspotIds, setDiscoveredHotspotIds] = useState<string[]>([
    'clue-talk-lan', 'clue-talk-tuan', 'clue-talk-chin', 'clue-talk-dai'
  ]);

  const clues = useMemo(() => {
    return FLOOR_CLUES[locationId] || FLOOR_CLUES['loc-hamtu-floor2'];
  }, [locationId]);

  const bgUrl = LOCATION_BACKGROUNDS[locationId] || LOCATION_BACKGROUNDS['loc-hamtu-floor2'];

  const triggerHotspotAction = (spot: HamTuHotspot) => {
    const isAlreadyDiscovered = discoveredHotspotIds.includes(spot.id) || spot.characterId;
    if (!isAlreadyDiscovered) {
      audioManager.playSfx('stamp');
      setDiscoveredHotspotIds(prev => prev.includes(spot.id) ? prev : [...prev, spot.id]);
    } else {
      audioManager.playSfx('click');
    }

    if (spot.characterId) {
      onSelectCharacter(spot.characterId);
    } else if (spot.inspectablePropId) {
      onSelectInspectableProp(spot.inspectablePropId);
    } else if (spot.puzzleId) {
      onSelectPuzzle(spot.puzzleId);
    } else if (spot.evidenceId) {
      onSelectEvidence(spot.evidenceId);
    }
  };

  const triggerHotspotActionRef = useRef(triggerHotspotAction);
  triggerHotspotActionRef.current = triggerHotspotAction;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#080604');

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9.8);

    // 2. Clamped DPR Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    const clampedDPR = Math.min(window.devicePixelRatio || 1, 2.0);
    renderer.setPixelRatio(clampedDPR);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Authentic Noir Lighting (Dark 1989 Midnight Interior + Real Investigative Flashlight)
    // Low ambient light gives rich dramatic shadows where flashlight genuinely matters
    const ambientLight = new THREE.AmbientLight(0x2d2116, 0.28);
    scene.add(ambientLight);

    // Window / Street Neon Cold Directional Light (Subtle rim light through rain-streaked window)
    const streetLight = new THREE.DirectionalLight(0x0ea5e9, 0.35);
    streetLight.position.set(-5, 4, 2);
    scene.add(streetLight);

    // Lightning Flash Light (Monsoon storm simulation)
    const lightningLight = new THREE.DirectionalLight(0xe0f2fe, 0.0);
    lightningLight.position.set(2, 6, 4);
    scene.add(lightningLight);

    // Detective Flashlight (Follows cursor, genuinely cuts through dark room)
    const flashlight = new THREE.SpotLight(0xfffaed, 8.2);
    flashlight.position.set(0, 0, 8.8);
    flashlight.angle = Math.PI / 7.0;
    flashlight.penumbra = 0.55;
    flashlight.decay = 0.85;
    flashlight.distance = 24;
    scene.add(flashlight);

    const flashlightTarget = new THREE.Object3D();
    scene.add(flashlightTarget);
    flashlight.target = flashlightTarget;

    // 4. Photographic 1989 Noir Scene Background Plate
    const textureLoader = new THREE.TextureLoader();
    let bgMesh: THREE.Mesh | null = null;
    let bgTexture: THREE.Texture | null = null;

    textureLoader.load(
      bgUrl,
      (texture) => {
        if (isDisposed) {
          texture.dispose();
          return;
        }
        bgTexture = texture;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // 16:9 Aspect ratio background plane
        const planeGeo = new THREE.PlaneGeometry(16, 9);
        const planeMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.85,
          metalness: 0.05
        });
        bgMesh = new THREE.Mesh(planeGeo, planeMat);
        bgMesh.position.set(0, 0, 0);
        scene.add(bgMesh);
      },
      undefined,
      (err) => {
        console.warn('Failed to load background texture:', err);
      }
    );

    // 5. Floating Dust Motes (Simulating old room atmosphere)
    const particlesCount = 220;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 9;
      posArray[i + 2] = (Math.random() - 0.5) * 4 + 1;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6
    });
    const dustParticles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(dustParticles);

    // 6. Invisible 3D Clickable Hitboxes for Clues
    const hotspotMeshes: Array<{ mesh: THREE.Mesh; hotspot: HamTuHotspot }> = [];
    clues.forEach((clue) => {
      const geom = new THREE.BoxGeometry(clue.meshSize.x, clue.meshSize.y, clue.meshSize.z);
      const mat = new THREE.MeshBasicMaterial({
        visible: false,
        transparent: true,
        opacity: 0.0
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(clue.position3D);
      scene.add(mesh);
      hotspotMeshes.push({ mesh, hotspot: clue });
    });

    // 7. Mouse Interaction & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    const planeIntersect = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const planeRay = new THREE.Ray();

    let targetCamX = 0;
    let targetCamY = 0;
    let isMouseDown = false;
    let prevMousePos = { x: 0, y: 0 };
    let hasDragged = false;

    const updateMarkerPositions = () => {
      if (!markersOverlayRef.current || !container) return;
      const overlay = markersOverlayRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      clues.forEach((clue) => {
        const markerEl = overlay.querySelector(`[data-hotspot-id="${clue.id}"]`) as HTMLElement;
        if (!markerEl) return;

        const screenPos = clue.position3D.clone();
        screenPos.y += clue.meshSize.y * 0.45;
        screenPos.project(camera);

        const x = (screenPos.x * 0.5 + 0.5) * width;
        const y = (-(screenPos.y * 0.5) + 0.5) * height;

        markerEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.x = (clientX / container.clientWidth) * 2 - 1;
      mouse.y = -(clientY / container.clientHeight) * 2 + 1;

      // Update flashlight target on background plane
      planeRay.origin.setFromMatrixPosition(camera.matrixWorld);
      planeRay.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(planeRay.origin).normalize();

      const intersectPoint = new THREE.Vector3();
      planeRay.intersectPlane(planeIntersect, intersectPoint);
      if (intersectPoint) {
        flashlightTarget.position.copy(intersectPoint);
      }

      if (isMouseDown) {
        const dx = e.clientX - prevMousePos.x;
        const dy = e.clientY - prevMousePos.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          hasDragged = true;
        }
        camera.position.x -= dx * 0.006;
        camera.position.y += dy * 0.006;
        camera.position.x = Math.max(-2.5, Math.min(2.5, camera.position.x));
        camera.position.y = Math.max(-1.5, Math.min(1.5, camera.position.y));
        prevMousePos = { x: e.clientX, y: e.clientY };
        updateMarkerPositions();
      } else {
        targetCamX = mouse.x * 0.35;
        targetCamY = mouse.y * 0.25;
      }

      // Raycast for hover state
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotMeshes.map(h => h.mesh));
      if (intersects.length > 0) {
        const hit = hotspotMeshes.find(h => h.mesh === intersects[0].object);
        if (hit) {
          setHoveredHotspot(hit.hotspot);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredHotspot(null);
        container.style.cursor = isMouseDown ? 'grabbing' : 'default';
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      hasDragged = false;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleSceneClick = () => {
      if (hasDragged) return; // Ignore drag end click
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotMeshes.map(h => h.mesh));
      if (intersects.length > 0) {
        const hit = hotspotMeshes.find(h => h.mesh === intersects[0].object);
        if (hit) {
          triggerHotspotActionRef.current(hit.hotspot);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('click', handleSceneClick);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let nextLightningTime = 3.5;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera sway when idle
      if (!isMouseDown) {
        camera.position.x += (targetCamX - camera.position.x) * 0.05;
        camera.position.y += (targetCamY - camera.position.y) * 0.05;
        updateMarkerPositions();
      }

      // Flashlight follows camera position
      flashlight.position.set(camera.position.x, camera.position.y, 8.5);

      // Random Monsoon Lightning Flashes
      if (elapsedTime > nextLightningTime) {
        lightningLight.intensity = 3.8;
        setTimeout(() => {
          lightningLight.intensity = 0.0;
        }, 110);
        nextLightningTime = elapsedTime + 6.0 + Math.random() * 8.0;
      }

      // Floating dust particles drift
      const pos = particlesGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particlesCount * 3; i += 3) {
        pos[i] -= 0.004;
        if (pos[i] < -4.5) pos[i] = 4.5;
      }
      particlesGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();
    // Initial marker sync after DOM layout
    setTimeout(updateMarkerPositions, 100);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      updateMarkerPositions();
    };
    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('click', handleSceneClick);

      if (bgTexture) bgTexture.dispose();
      if (bgMesh) {
        bgMesh.geometry.dispose();
        if (Array.isArray(bgMesh.material)) {
          bgMesh.material.forEach(m => m.dispose());
        } else {
          bgMesh.material.dispose();
        }
      }
      particlesGeo.dispose();
      particlesMat.dispose();

      hotspotMeshes.forEach(h => {
        h.mesh.geometry.dispose();
        if (Array.isArray(h.mesh.material)) {
          h.mesh.material.forEach(m => m.dispose());
        } else {
          h.mesh.material.dispose();
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [bgUrl, clues]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#080604]">
      {/* 1. Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab" />

      {/* 2. Diegetic 2D Evidence Tent Markers Overlaid at 3D World Positions (No React state thrashing!) */}
      <div
        ref={markersOverlayRef}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      >
        {clues.map((hotspot) => {
          const isCollected = hotspot.evidenceId ? collectedEvidenceIds.includes(hotspot.evidenceId) : false;
          const isHovered = hoveredHotspot?.id === hotspot.id;
          const isInvestigated = Boolean(
            hotspot.characterId ||
            isCollected ||
            discoveredHotspotIds.includes(hotspot.id)
          );

          return (
            <div
              key={hotspot.id}
              data-hotspot-id={hotspot.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'translate3d(-999px, -999px, 0)'
              }}
              className="pointer-events-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                triggerHotspotAction(hotspot);
              }}
              onMouseEnter={() => {
                setHoveredHotspot(hotspot);
              }}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              {isInvestigated ? (
                <div className={`relative group flex flex-col items-center transition-transform duration-150 animate-in zoom-in-75 ${
                  isHovered ? 'scale-115' : 'scale-95'
                }`}>
                  {/* Physical Yellow Evidence Tent Marker */}
                  <EvidenceTentMarker
                    number={hotspot.tentNumber}
                    size="md"
                  />

                  {/* Sub-label for Characters or High-Priority Puzzles */}
                  <div className={`mt-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border shadow-md whitespace-nowrap ${
                    hotspot.characterId
                      ? 'bg-[#991b1b] text-white border-red-400'
                      : hotspot.inspectablePropId
                        ? 'bg-amber-900 text-amber-200 border-amber-500'
                        : hotspot.puzzleId
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                          : isCollected
                            ? 'bg-stone-800 text-stone-300 border-stone-600'
                            : 'bg-black/90 text-amber-400 border-amber-600/80'
                  }`}>
                    {hotspot.characterId
                      ? 'THẨM VẤN'
                      : hotspot.inspectablePropId
                        ? 'SOI 3D'
                        : hotspot.puzzleId
                          ? 'THỰC NGHIỆM'
                          : isCollected
                            ? 'ĐÃ THU THẬP'
                            : 'VẬT CHỨNG'}
                  </div>
                </div>
              ) : (
                /* Uninvestigated Anomaly: Diegetic Forensic Inspection Reticle */
                <div className={`relative group flex flex-col items-center justify-center p-1 transition-all duration-200 ${
                  isHovered ? 'scale-120' : 'scale-95 opacity-80'
                }`}>
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Glint */}
                    <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/60 animate-ping absolute" />
                    {/* Solid Forensic Ring */}
                    <div className="w-8 h-8 rounded-full bg-[#18130d]/85 border-2 border-[#ca8a04] shadow-[0_0_12px_rgba(202,138,4,0.7)] flex items-center justify-center text-amber-300">
                      <Search className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  {/* Subtle Anomaly Tag on hover */}
                  {isHovered && (
                    <div className="mt-1 px-2 py-0.5 rounded bg-[#2a1d12] border border-[#a16207] text-[#fef08a] text-[9px] font-mono font-bold uppercase tracking-wider shadow-lg whitespace-nowrap animate-in fade-in duration-150">
                      DẤU VẾT BẤT THƯỜNG
                    </div>
                  )}
                  <span className="sr-only">{hotspot.title}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Discreet Diegetic Scene Controls Badge */}
      <div className="absolute top-3 right-4 z-20 pointer-events-none flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-[#18130d]/85 border border-[#78542c]/70 text-[#e6c280] text-[10px] font-mono shadow-lg backdrop-blur-xs">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Flashlight className="w-3.5 h-3.5" />
          <span className="font-bold tracking-wider">ĐÈN PIN PHÁP Y</span>
        </div>
        <span className="text-[#8a7663]">|</span>
        <div className="flex items-center gap-1.5 text-stone-300 text-[9.5px]">
          <Move className="w-3 h-3 text-[#a89078]" />
          <span>KÉO CHUỘT XOAY GÓC NHÌN</span>
        </div>
      </div>

      {/* 4. Forensic Clue Inspector Banner when Hovering (High-Contrast Manila Docket Tag) */}
      {hoveredHotspot && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none max-w-xl w-[92%] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="p-3.5 sm:p-4 rounded-lg shadow-2xl border-2 border-[#5c4632] bg-[#f5ebd7] text-[#1c1917] space-y-1.5 font-typewriter">
            <div className="flex items-center justify-between gap-2 border-b-2 border-[#8a7663] pb-1.5">
              <div className="flex items-center gap-2">
                <span className={`rubber-stamp text-[10px] py-0.5 px-2 font-black ${
                  discoveredHotspotIds.includes(hoveredHotspot.id) || hoveredHotspot.characterId
                    ? 'stamp-amber'
                    : 'stamp-red'
                }`}>
                  {discoveredHotspotIds.includes(hoveredHotspot.id) || hoveredHotspot.characterId
                    ? hoveredHotspot.tentNumber
                    : 'KHẢ NGHI'}
                </span>
                <span className="font-bold text-sm font-dossier-serif tracking-wide text-[#1a1714]">
                  {hoveredHotspot.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#991b1b] uppercase flex items-center gap-1 font-black shrink-0">
                <Eye className="w-3.5 h-3.5" />
                {discoveredHotspotIds.includes(hoveredHotspot.id) || hoveredHotspot.characterId
                  ? 'NHẤP ĐỂ TÁI KHÁM NGHIỆM'
                  : 'NHẤP ĐỂ CẮM BIỂN & KHÁM NGHIỆM'}
              </span>
            </div>
            <p className="text-xs text-[#2b241c] leading-relaxed pt-0.5 font-semibold">
              {hoveredHotspot.description}
            </p>
          </div>
        </div>
      )}

      {/* 5. Diegetic Forensic Investigation Clipboard (Master Deadlocks Tracker) */}
      <ForensicInvestigationClipboard
        onOpenPuzzle={onSelectPuzzle}
        onOpenEvidence={onSelectEvidence}
      />
    </div>
  );
};
