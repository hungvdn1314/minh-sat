---
name: phaser-grid-puzzle
description: "Use this skill when developing 2D tile-based puzzle games, Sokoban crate-pushing, dungeon exploration, or top-down adventure games using Phaser 3, TypeScript, Grid Engine, and LDtk tilemaps."
---

# Phaser 3 Grid Engine & Puzzle Architecture

This skill guides the implementation of deterministic, tile-aligned 2D puzzle games.

## 1. Tech Stack
- **Phaser 3.80+** (with Vite & TypeScript)
- **Grid Engine Plugin** (`grid-engine`): Handles grid-locked movement, tile collisions, pathfinding.
- **LDtk** or **Tiled**: Generates level JSON.

---

## 2. Scene Setup with Grid Engine
```typescript
import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';

export class PuzzleScene extends Phaser.Scene {
  private gridEngine!: GridEngine;

  constructor() {
    super('PuzzleScene');
  }

  create() {
    // 1. Create Tilemap
    const map = this.make.tilemap({ key: 'level1' });
    const tileset = map.addTilesetImage('dungeon_tiles', 'tiles_png')!;
    map.createLayer('Ground', tileset, 0, 0);
    const obstaclesLayer = map.createLayer('Obstacles', tileset, 0, 0);
    obstaclesLayer?.setCollisionByProperty({ collides: true });

    // 2. Create Player Sprite
    const playerSprite = this.add.sprite(0, 0, 'player');

    // 3. Configure Grid Engine
    const gridEngineConfig = {
      characters: [
        {
          id: 'player',
          sprite: playerSprite,
          startPosition: { x: 5, y: 5 },
          speed: 4,
        },
      ],
    };

    this.gridEngine.create(map, gridEngineConfig);
  }

  update() {
    const cursors = this.input.keyboard?.createCursorKeys();
    if (!cursors) return;

    if (cursors.left.isDown) {
      this.gridEngine.move('player', 'left');
    } else if (cursors.right.isDown) {
      this.gridEngine.move('player', 'right');
    } else if (cursors.up.isDown) {
      this.gridEngine.move('player', 'up');
    } else if (cursors.down.isDown) {
      this.gridEngine.move('player', 'down');
    }
  }
}
```

---

## 3. Sokoban Crate-Pushing Pattern
When pushing puzzle blocks:
1. Listen for player movement attempts into a crate tile.
2. Check if the tile behind the crate is walkable and empty.
3. If valid, execute simultaneous movement of both player and crate via `gridEngine.moveTo()`.
4. Trigger floor switch checks upon crate arrival.
