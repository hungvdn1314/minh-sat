---
name: boardgame-state-engine
description: "Use this skill when building digital board games, card games, turn-based tactics, or grid puzzle games on the web using boardgame.io combined with Pixi.js or Phaser for rendering."
---

# Boardgame.io & Web Rendering Integration

This skill establishes a strict Model-View decoupling for turn-based games.

## 1. The Headless Principle
- **Game Rules & State (`G`) live in `boardgame.io`**: Pure functions, deterministic, serializable, easily unit-tested.
- **Canvas (Pixi.js or Phaser) is strictly a VIEW layer**: It subscribes to state updates and runs animations. User clicks on canvas dispatch `client.moves.myMove()`.

---

## 2. Defining the Game Rules (Model)
```typescript
import { Game } from 'boardgame.io';

export interface BoardGameState {
  cells: (string | null)[];
  scores: Record<string, number>;
}

export const TicTacToeGame: Game<BoardGameState> = {
  setup: () => ({
    cells: Array(9).fill(null),
    scores: { '0': 0, '1': 0 }
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickCell: ({ G, playerID }, id: number) => {
      if (G.cells[id] !== null) return; // Invalid move
      G.cells[id] = playerID;
    },
  },

  endIf: ({ G, ctx }) => {
    // Determine winner...
  },
};
```

---

## 3. Connecting to Pixi.js (View)
```typescript
import { Client } from 'boardgame.io/client';
import { Application, Container, Graphics } from 'pixi.js';
import { TicTacToeGame } from './game';

export class BoardGameRenderer {
  private client: any;
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.client = Client({ game: TicTacToeGame });
    this.client.start();

    // Subscribe to state updates
    this.client.subscribe((state: any) => {
      if (!state) return;
      this.renderBoard(state.G, state.ctx);
    });
  }

  private renderBoard(G: any, ctx: any) {
    // Redraw grid or trigger piece movement animations
  }

  public onCellClicked(cellIndex: number) {
    this.client.moves.clickCell(cellIndex);
  }
}
```
