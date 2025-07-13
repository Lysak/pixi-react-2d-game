import { Rectangle, Sprite, Texture } from 'pixi.js'
import { useRef, useState } from 'react'
import { TILE_SIZE } from '../../constants/game-world'
import type { Direction } from '../../types/game-world'

interface UseSpriteAnimationProps {
  texture: Texture
  frameWidth: number
  frameHeight: number
  totalFrames: number
  animationSpeed: number
}

export const useHeroAnimation = ({
  texture,
  frameWidth,
  frameHeight,
  totalFrames,
  animationSpeed,
}: UseSpriteAnimationProps) => {
  const [sprite, setSprite] = useState<Sprite | null>(null)
  const frameRef = useRef(0)
  const elapsedTimeRef = useRef(0)

  const getRowByDirection = (direction: Direction | null) => {
    switch (direction) {
      case 'UP':
        return 8
      case 'LEFT':
        return 9
      case 'DOWN':
        return 10
      case 'RIGHT':
        return 11
      default:
        return 10
    }
  }

  const createSprite = (row: number, column: number) => {
    if (!texture || !texture.source) {
      return null
    }

    const frame = new Texture({
      source: texture.source,
      frame: new Rectangle(
        column * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
      ),
    })

    const newSprite = new Sprite(frame)
    newSprite.width = TILE_SIZE
    newSprite.height = TILE_SIZE

    return newSprite
  }

  const updateSprite = (direction: Direction | null, isMoving: boolean) => {
    if (!texture || !texture.source) {
      return
    }

    const row = getRowByDirection(direction)
    let column = 0

    if (isMoving) {
      elapsedTimeRef.current += animationSpeed

      if (elapsedTimeRef.current >= 1) {
        elapsedTimeRef.current = 0
        frameRef.current = (frameRef.current + 1) % totalFrames
      }

      column = frameRef.current
    }

    const newSprite = createSprite(row, column)
    // if (newSprite) {
    //   setSprite(newSprite)
    // }
    setSprite(newSprite)
  }

  return { sprite, updateSprite }
}
