import { useEffect, useState, useCallback } from 'react';
import { Stage } from '@pixi/react';
import MainContainer from './MainContainer';

const calculateCanvasSize = () => {
  return Math.min(window.innerWidth, window.innerHeight) * 0.9
}

export const PixiGrid = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());

  const updateCanvasSize = useCallback(() => {
    const size = calculateCanvasSize();
    setCanvasSize(size);
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stage
        width={canvasSize}
        height={canvasSize}
        options={{
          backgroundAlpha: 0,
        }}
      >
        <MainContainer canvasSize={canvasSize}></MainContainer>
      </Stage>
    </div>
  );
};
