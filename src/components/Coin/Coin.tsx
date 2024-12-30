import { useRef } from 'react'
import { Sprite, Container, useTick } from '@pixi/react'
import { Texture } from 'pixi.js'
import { useCoinAnimation } from './useCoinAnimation'
import { TILE_SIZE } from '../../constants/game-world'

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
    updateSprite(delta)
  })

  return (
    <Container rotation={rotation.current} x={x * TILE_SIZE} y={y * TILE_SIZE}>
      {sprite && (
        <Sprite texture={sprite.texture} scale={0.7} anchor={[-0.85, -0.75]} />
      )}
    </Container>
  )
}
