import { extend, useTick } from '@pixi/react'
import { Container, type PointData, Sprite, type Texture } from 'pixi.js'
import { useRef } from 'react'
import { TILE_SIZE } from '../../constants/game-world'
import { useCoinAnimation } from './useCoinAnimation'

extend({ Container, Sprite })

interface ICoinProps {
  texture: Texture
  x: number
  y: number
}

const ANIMATION_SPEED = 0.15

export const Coin = ({ texture, x, y }: ICoinProps) => {
  const rotation = useRef(0)

  const { sprite, updateSprite } = useCoinAnimation({
    texture,
    frameWidth: 16,
    frameHeight: 16,
    totalFrames: 5,
    animationSpeed: ANIMATION_SPEED,
  })

  useTick((delta) => {
    updateSprite(delta.deltaTime)
  })

  return (
    <pixiContainer
      rotation={rotation.current}
      x={x * TILE_SIZE}
      y={y * TILE_SIZE}
    >
      {sprite && (
        <pixiSprite
          texture={sprite.texture}
          scale={0.7}
          anchor={{ x: -0.85, y: -0.75 } as PointData}
        />
      )}
    </pixiContainer>
  )
}
