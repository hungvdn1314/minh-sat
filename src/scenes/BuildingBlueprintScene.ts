import * as Phaser from 'phaser';

export interface BlueprintFloor {
  id: string;
  name: string;
  levelText: string;
  yRatio: number;
  suspectsPresent: string[];
  keyFeatures: string[];
}

export class BuildingBlueprintScene extends Phaser.Scene {
  private onSelectFloor?: (locationId: string) => void;
  private rainParticles?: Phaser.GameObjects.Graphics;
  private raindrops: Array<{ x: number; y: number; length: number; speed: number }> = [];

  constructor() {
    super({ key: 'BuildingBlueprintScene' });
  }

  public init(data: { onSelectFloor?: (id: string) => void }): void {
    this.onSelectFloor = data.onSelectFloor;
  }

  public create(): void {
    const { width, height } = this.scale;

    // 1. Blueprint Grid & Paper Background
    const bg = this.add.graphics();
    bg.fillStyle(0x0c1524, 1.0); // Classic Prussian Blue blueprint paper
    bg.fillRect(0, 0, width, height);

    // Cyan blueprint grid lines
    bg.lineStyle(1, 0x1e3a8a, 0.45);
    const gridSize = 32;
    for (let x = 0; x < width; x += gridSize) {
      bg.moveTo(x, 0);
      bg.lineTo(x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      bg.moveTo(0, y);
      bg.lineTo(width, y);
    }
    bg.strokePath();

    // 2. Cross-Section Building Structure (3 Floors)
    const buildingX = width * 0.15;
    const buildingW = width * 0.7;
    const buildingTop = height * 0.12;
    const buildingH = height * 0.76;
    const floorH = buildingH / 3;

    // Outer Concrete / Lim Wood Building Outline
    const frame = this.add.graphics();
    frame.lineStyle(3, 0x38bdf8, 0.9);
    frame.strokeRect(buildingX, buildingTop, buildingW, buildingH);

    // Rain Gutters & Roof Gable
    frame.moveTo(buildingX - 20, buildingTop);
    frame.lineTo(buildingX + buildingW / 2, buildingTop - 35);
    frame.lineTo(buildingX + buildingW + 20, buildingTop);
    frame.strokePath();

    // Floor Slabs
    const floorConfigs: BlueprintFloor[] = [
      {
        id: 'loc-hamtu-floor2',
        name: 'TẦNG 2: THƯ PHÒNG ÁN MẠNG (PHÒNG KÍN)',
        levelText: '+6.80m // HIỆN TRƯỜNG TỬ THI',
        yRatio: 0,
        suspectsPresent: ['Lương Vĩnh Phát (Tử vong 20h45)', 'Trịnh Mỹ Lan (Bưng trà 21h15)'],
        keyFeatures: ['Cửa lim then đồng khóa trong', 'Bàn cờ Hắc Tướng', 'Máy cassette bàn thờ']
      },
      {
        id: 'loc-hamtu-floor1',
        name: 'TẦNG LỬNG: XƯỞNG KIM HOÀN & LÒ PHÂN KIM',
        levelText: '+3.40m // NƠI CHẾ TÁC VÀNG LÁ',
        yRatio: 1,
        suspectsPresent: ['Lương Gia Tuấn (Kiểm kê bạc vụn)', 'Thợ Chín (Ra vào xưởng)'],
        keyFeatures: ['Bàn cưa lọng số 0', 'Ngăn kéo khóa Bát Quái', 'Hũ vôi sống & Chỉ sáp']
      },
      {
        id: 'loc-hamtu-ground',
        name: 'TẦNG TRỆT: QUẦY GIAO DỊCH & BẾN HÀM TỬ',
        levelText: '±0.00m // BỜ KÈ KÊNH TÀU HỦ',
        yRatio: 2,
        suspectsPresent: ['Thợ Chín (Dưới gầm cầu thang)', 'Trần Quốc Đại (Xe Peugeot pô nóng)'],
        keyFeatures: ['Lồng sắt thu ngân', 'Bậc cầu thang số 5 mọt gỗ', 'Cửa hậu ra bến sông']
      }
    ];

    floorConfigs.forEach((floor, idx) => {
      const floorY = buildingTop + idx * floorH;

      // Floor dividing slab
      if (idx > 0) {
        frame.lineStyle(2, 0x0284c7, 0.7);
        frame.moveTo(buildingX, floorY);
        frame.lineTo(buildingX + buildingW, floorY);
        frame.strokePath();
      }

      // Interactive Floor Hover Zone
      const floorZone = this.add.zone(
        buildingX + buildingW / 2,
        floorY + floorH / 2,
        buildingW,
        floorH
      ).setInteractive({ cursor: 'pointer' });

      // Highlight Box
      const floorHighlight = this.add.graphics();
      floorHighlight.fillStyle(0x38bdf8, 0.0);
      floorHighlight.fillRect(buildingX + 4, floorY + 4, buildingW - 8, floorH - 8);

      floorZone.on('pointerover', () => {
        floorHighlight.clear();
        floorHighlight.fillStyle(0x38bdf8, 0.12);
        floorHighlight.fillRect(buildingX + 4, floorY + 4, buildingW - 8, floorH - 8);
      });

      floorZone.on('pointerout', () => {
        floorHighlight.clear();
      });

      floorZone.on('pointerdown', () => {
        if (this.onSelectFloor) {
          this.onSelectFloor(floor.id);
        }
      });

      // Floor Titles & Architectural Metadata
      this.add.text(buildingX + 18, floorY + 12, floor.name, {
        fontFamily: 'Courier, monospace',
        fontSize: '13px',
        color: '#38bdf8',
        fontStyle: 'bold'
      });

      this.add.text(buildingX + buildingW - 200, floorY + 12, floor.levelText, {
        fontFamily: 'Courier, monospace',
        fontSize: '11px',
        color: '#93c5fd'
      });

      // Features list
      floor.keyFeatures.forEach((feat, fIdx) => {
        this.add.text(buildingX + 24, floorY + 36 + fIdx * 18, `• ${feat}`, {
          fontFamily: 'Courier, monospace',
          fontSize: '11px',
          color: '#bae6fd'
        });
      });

      // Suspects list on the right
      floor.suspectsPresent.forEach((susp, sIdx) => {
        this.add.text(buildingX + buildingW * 0.52, floorY + 36 + sIdx * 20, `[VỊ TRÍ] ${susp}`, {
          fontFamily: 'Courier, monospace',
          fontSize: '11px',
          color: sIdx === 0 ? '#f59e0b' : '#fbbf24'
        });
      });
    });

    // 3. Wooden Staircase Graphic Linking Floors (Showing Squeaky Step #5)
    const stairX = buildingX + buildingW * 0.42;
    const stairGraphics = this.add.graphics();
    stairGraphics.lineStyle(1.5, 0xfacc15, 0.8);
    for (let y = buildingTop + floorH * 2; y < buildingTop + buildingH; y += 14) {
      stairGraphics.moveTo(stairX - 18, y);
      stairGraphics.lineTo(stairX + 18, y);
    }
    stairGraphics.strokePath();

    this.add.text(stairX - 60, buildingTop + floorH * 2.4, 'BẬC SỐ 5 MỌT GỖ ⚠️\n(CỌT KẸT BAN ĐÊM)', {
      fontFamily: 'Courier, monospace',
      fontSize: '9px',
      color: '#f87171',
      align: 'center'
    });

    // 4. Raindrops System Outside the Building (Monsoon Storm #7)
    this.rainParticles = this.add.graphics();
    for (let i = 0; i < 160; i++) {
      this.raindrops.push({
        x: Phaser.Math.Between(0, width),
        y: Phaser.Math.Between(0, height),
        length: Phaser.Math.Between(12, 28),
        speed: Phaser.Math.Between(14, 24)
      });
    }

    // 5. Periodic Monsoon Lightning Flash
    const flashOverlay = this.add.graphics();
    flashOverlay.fillStyle(0xffffff, 0);
    flashOverlay.fillRect(0, 0, width, height);

    this.time.addEvent({
      delay: 6000,
      loop: true,
      callback: () => {
        // Flash in
        this.tweens.add({
          targets: flashOverlay,
          alpha: 0.35,
          duration: 80,
          yoyo: true,
          repeat: 1,
          ease: 'Power2'
        });
      }
    });

    // Blueprint Title Header
    this.add.text(width / 2, height * 0.05, 'SƠ ĐỒ BẢN VẼ MẶT CẮT KIẾN TRÚC // TIỆM VÀNG VẠN LỢI (BẾN HÀM TỬ 1989)', {
      fontFamily: 'Courier, monospace',
      fontSize: '14px',
      color: '#e0f2fe',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  public update(): void {
    if (!this.rainParticles) return;

    const { width, height } = this.scale;
    this.rainParticles.clear();
    this.rainParticles.lineStyle(1.5, 0x38bdf8, 0.4);

    this.raindrops.forEach(drop => {
      drop.y += drop.speed;
      drop.x -= drop.speed * 0.25; // Slanted storm rain

      if (drop.y > height) {
        drop.y = -20;
        drop.x = Phaser.Math.Between(0, width + 100);
      }

      this.rainParticles?.moveTo(drop.x, drop.y);
      this.rainParticles?.lineTo(drop.x - drop.length * 0.25, drop.y + drop.length);
    });

    this.rainParticles.strokePath();
  }
}
