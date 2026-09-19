import * as Phaser from 'phaser';

export interface MapMarkerData {
  id: string;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  type: string;
  isUnlocked: boolean;
}

export class CityMapScene extends Phaser.Scene {
  private markersData: MapMarkerData[] = [];
  private onSelectLocation?: (locationId: string) => void;

  constructor() {
    super({ key: 'CityMapScene' });
  }

  public init(data: { markers: MapMarkerData[]; onSelect: (id: string) => void }) {
    this.markersData = data.markers || [];
    this.onSelectLocation = data.onSelect;
  }

  public preload(): void {
    this.load.image('saigon_map_bg', '/assets/images/map/saigon_map.jpg');
  }

  public create(): void {
    const { width, height } = this.scale;

    // 1. Render Vintage Sepia Tactical District Map on Mahogany Desk
    const deskBg = this.add.rectangle(width / 2, height / 2, width, height, 0x120d09);
    deskBg.setDepth(0);

    const mapAspectRatio = 16 / 9;
    let mapW = width;
    let mapH = width / mapAspectRatio;
    if (mapH < height) {
      mapH = height;
      mapW = height * mapAspectRatio;
    }

    if (this.textures.exists('saigon_map_bg')) {
      const mapBg = this.add.image(width / 2, height / 2, 'saigon_map_bg');
      mapBg.setDisplaySize(mapW, mapH);
      mapBg.setDepth(1);
    }

    // Warm Vignette & Desk Lamp Shadow overlay
    const vignette = this.add.graphics();
    vignette.setDepth(2);
    vignette.fillStyle(0x0c0805, 0.2);
    vignette.fillRect(0, 0, width, height);

    // 2. Tactical Markers Locations (Calibrated to Thao Dien & District 2)
    const mapCenterX = width / 2;
    const mapCenterY = height / 2;

    const locationPositions: Record<string, { x: number; y: number }> = {
      // Case Ham Tu Locations (Chợ Lớn - Bến Hàm Tử)
      'loc-hamtu-floor2': { x: mapCenterX - mapW * 0.14, y: mapCenterY - mapH * 0.12 },
      'loc-hamtu-floor1': { x: mapCenterX - mapW * 0.14, y: mapCenterY + mapH * 0.04 },
      'loc-hamtu-ground': { x: mapCenterX - mapW * 0.14, y: mapCenterY + mapH * 0.20 },

      // Case 001 Locations
      'loc-apt507': { x: mapCenterX + mapW * 0.15, y: mapCenterY - mapH * 0.24 },
      'loc-lobby': { x: mapCenterX + mapW * 0.04, y: mapCenterY + mapH * 0.02 }
    };

    // 3. Physical Red Investigation Thread / Yarn between locations
    const posLobby = locationPositions['loc-lobby'];
    const posApt = locationPositions['loc-apt507'];
    const posHt2 = locationPositions['loc-hamtu-floor2'];
    const posHt1 = locationPositions['loc-hamtu-floor1'];
    const posHtg = locationPositions['loc-hamtu-ground'];

    const redString = this.add.graphics();
    redString.setDepth(4);
    redString.lineStyle(2.5, 0x991b1b, 0.95);

    const stringShadow = this.add.graphics();
    stringShadow.setDepth(3);
    stringShadow.lineStyle(3, 0x000000, 0.35);

    // If Case 001 active
    if (this.markersData.some(m => m.id === 'loc-apt507') && posLobby && posApt) {
      stringShadow.lineBetween(posLobby.x + 3, posLobby.y + 4, posApt.x + 3, posApt.y + 4);
      redString.lineBetween(posLobby.x, posLobby.y, posApt.x, posApt.y);
    }

    // If Case Ham Tu active: connect 3 floors
    if (this.markersData.some(m => m.id.startsWith('loc-hamtu')) && posHt2 && posHt1 && posHtg) {
      stringShadow.lineBetween(posHt2.x + 3, posHt2.y + 4, posHt1.x + 3, posHt1.y + 4);
      stringShadow.lineBetween(posHt1.x + 3, posHt1.y + 4, posHtg.x + 3, posHtg.y + 4);
      redString.lineBetween(posHt2.x, posHt2.y, posHt1.x, posHt1.y);
      redString.lineBetween(posHt1.x, posHt1.y, posHtg.x, posHtg.y);

      const midX = posHt1.x + 40;
      const midY = posHt1.y;
      const tagBg = this.add.rectangle(midX, midY, 150, 20, 0xfcf8ee, 0.95);
      tagBg.setStrokeStyle(1, 0x8a7663);
      tagBg.setDepth(4);
      this.add.text(midX, midY, 'TIỆM VÀNG VẠN LỢI', {
        fontFamily: 'monospace',
        fontSize: '9px',
        fontStyle: 'bold',
        color: '#991b1b'
      }).setOrigin(0.5).setDepth(4);
    }

    // 4. Render Physical Pushpin Markers & Manila Card Callouts
    this.markersData.forEach((marker) => {
      const pos = locationPositions[marker.id] || { x: marker.x, y: marker.y };
      const container = this.add.container(pos.x, pos.y);
      container.setDepth(10);

      const isApt = marker.id === 'loc-apt507';

      // Subtle pulse beacon around active investigation zone
      const beaconRing = this.add.circle(0, 0, 32, isApt ? 0xdc2626 : 0xd97706, 0.2);
      container.add(beaconRing);

      this.tweens.add({
        targets: beaconRing,
        scale: 1.6,
        alpha: 0,
        duration: 2000,
        repeat: -1,
        ease: 'Cubic.easeOut'
      });

      // Pushpin Drop Shadow on Map
      const pinShadow = this.add.ellipse(5, 6, 16, 10, 0x000000, 0.4);
      container.add(pinShadow);

      // Realistic Red Pushpin Head
      const pinRim = this.add.circle(0, 0, 11, 0x7f1d1d, 1);
      const pinBody = this.add.circle(0, 0, 8.5, isApt ? 0xdc2626 : 0xb45309, 1);
      const pinHighlight = this.add.circle(-2.5, -2.5, 3, 0xffffff, 0.7);
      container.add([pinRim, pinBody, pinHighlight]);

      // Manila Docket Label Card (Pinned to the board)
      const labelCard = this.add.container(0, 40);

      // Card shadow
      const cardShadow = this.add.rectangle(3, 3, 200, 48, 0x000000, 0.35);
      cardShadow.setOrigin(0.5);

      // Manila paper background
      const cardBg = this.add.rectangle(0, 0, 200, 48, 0xded2bc, 1);
      cardBg.setStrokeStyle(1.5, isApt ? 0x991b1b : 0x5c4632);

      // Top red pin securing the paper card
      const cardPin = this.add.circle(0, -23, 4, 0x991b1b, 1);

      // Typewriter & Serif Typography
      const titleText = this.add.text(0, -7, marker.name, {
        fontFamily: 'Merriweather, Georgia, serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: '#1a1c22'
      }).setOrigin(0.5);

      const subtitleText = this.add.text(0, 10, `[${isApt ? 'ĐIỂM ÁN MẠNG' : 'CHỐT BẢO VỆ'}] • ${marker.subtitle.toUpperCase()}`, {
        fontFamily: 'monospace',
        fontSize: '8.5px',
        fontStyle: 'bold',
        color: isApt ? '#991b1b' : '#78350f'
      }).setOrigin(0.5);

      labelCard.add([cardShadow, cardBg, cardPin, titleText, subtitleText]);
      container.add(labelCard);

      // Interactive hit area
      const hitZone = this.add.zone(0, 25, 200, 90).setInteractive({ cursor: 'pointer' });
      container.add(hitZone);

      hitZone.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scale: 1.1,
          y: pos.y - 4,
          duration: 160,
          ease: 'Power2'
        });
      });

      hitZone.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scale: 1.0,
          y: pos.y,
          duration: 160,
          ease: 'Power2'
        });
      });

      hitZone.on('pointerdown', () => {
        if (this.onSelectLocation) {
          this.onSelectLocation(marker.id);
        }
      });
    });
  }
}

