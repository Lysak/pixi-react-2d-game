import { extend, useTick } from '@pixi/react'
import { Container, type Graphics as PIXIGraphics, Sprite } from 'pixi.js'
import { type PropsWithChildren, useRef } from 'react'
import { TILE_SIZE, ZOOM } from '../../constants/game-world'

extend({ Container, Sprite })

interface ICameraProps {
  heroPosition: { x: number; y: number }
  canvasSize: { width: number; height: number }
}

const lerp = (start: number, end: number) => {
  return start + (end - start) * 0.03
}

export const Camera = ({
  heroPosition,
  canvasSize,
  children,
}: PropsWithChildren<ICameraProps>) => {
  const containerRef = useRef<PIXIGraphics>(null)

  const cameraPosition = useRef<{ x: number; y: number }>({
    x: canvasSize.width / 2,
    y: canvasSize.height / 2,
  })

  useTick(() => {
    if (containerRef.current) {
      const targetX =
        canvasSize.width / 2 - heroPosition.x * TILE_SIZE * ZOOM - TILE_SIZE
      const targetY =
        canvasSize.height / 2 - heroPosition.y * TILE_SIZE * ZOOM - TILE_SIZE

      cameraPosition.current.x = lerp(cameraPosition.current.x, targetX)
      cameraPosition.current.y = lerp(cameraPosition.current.y, targetY)

      containerRef.current.x = cameraPosition.current.x
      containerRef.current.y = cameraPosition.current.y
    }
  })

  return (
    <pixiContainer ref={containerRef} scale={ZOOM}>
      {children}
    </pixiContainer>
  )
}
