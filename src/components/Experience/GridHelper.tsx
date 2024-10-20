import { Graphics } from '@pixi/react';
import { TILE_SIZE, COLS, ROWS } from '../../constants/game-world';
import { collisionMap } from '../../constants/collisionMap';
import { useCallback } from 'react';
import { Graphics as GraphicsImpl } from 'pixi.js';

const GridHelper = () => {
  const drawGrid = useCallback((g: GraphicsImpl) => {
    g.clear();
    g.lineStyle(1, 0xff0000, 0.3);
    for (let x = 0; x <= COLS; x++) {
      g.moveTo(x * TILE_SIZE, 0);
      g.lineTo(x * TILE_SIZE, ROWS * TILE_SIZE);
    }
    for (let y = 0; y <= ROWS; y++) {
      g.moveTo(0, y * TILE_SIZE);
      g.lineTo(COLS * TILE_SIZE, y * TILE_SIZE);
    }

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const index = row * COLS + col;
        const tile = collisionMap[index];

        if (tile === 1) {
          g.beginFill(0xff0000, 0.3);
          g.drawRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          g.endFill();
        }
      }
    }
  }, []);

  return <Graphics draw={drawGrid} />;
};

export default GridHelper;
