import { extend } from '@pixi/react'
import { Assets, Container, Sprite } from 'pixi.js'
import { useEffect, useState } from 'react'
import levelAsset from '@/assets/tilemap.png'
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  OFFSET_X,
  OFFSET_Y,
} from '../../constants/game-world'

extend({ Container, Sprite })

export const Level = () => {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    Assets.load(levelAsset).then(setTexture)
  }, [])

  if (!texture) return null

  return (
    <pixiSprite
      texture={texture}
      width={GAME_WIDTH}
      height={GAME_HEIGHT + OFFSET_Y}
      scale={1}
      x={OFFSET_X}
      y={OFFSET_Y}
    />
  )
}
