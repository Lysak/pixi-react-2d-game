import { extend, useTick } from '@pixi/react'
import { Container, type PointData, Sprite, type Texture } from 'pixi.js'
import { useCallback, useEffect, useRef } from 'react'
import {
  ANIMATION_SPEED,
  DEFAULT_X_POS,
  DEFAULT_Y_POS,
  MOVE_SPEED,
} from '../../constants/game-world'
import {
  calculateNewTarget,
  checkCanMove,
  handleMovement,
} from '../../helpers/common'
import type { Direction } from '../../types/game-world'
import { useHeroAnimation } from './useHeroAnimation'
import { useHeroControls } from './useHeroControls'

extend({ Container, Sprite })

interface IHeroProps {
  texture: Texture
  onMove: (gridX: number, gridY: number) => void
}

export const Hero = ({ texture, onMove }: IHeroProps) => {
  const position = useRef({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS })
  const targetPosition = useRef<{ x: number; y: number } | null>(null)
  const currentDirection = useRef<Direction | null>(null)
  const { getControlsDirection } = useHeroControls()
  const isMoving = useRef(false)

  const { sprite, updateSprite } = useHeroAnimation({
    texture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 9,
    animationSpeed: ANIMATION_SPEED,
  })

  useEffect(() => {
    onMove(position.current.x, position.current.y)
  }, [onMove])

  const setNextTarget = useCallback((direction: Direction) => {
    if (targetPosition.current) return
    const { x, y } = position.current
    currentDirection.current = direction
    const newTarget = calculateNewTarget(x, y, direction)

    if (checkCanMove(newTarget)) {
      targetPosition.current = newTarget
    }
  }, [])

  useTick((delta) => {
    const direction = getControlsDirection()
    if (direction) {
      setNextTarget(direction)
    }
    if (targetPosition.current) {
      const { position: newPosition, completed } = handleMovement(
        position.current,
        targetPosition.current,
        MOVE_SPEED,
        delta.deltaTime,
      )

      position.current = newPosition
      isMoving.current = true

      if (completed) {
        const { x, y } = position.current
        onMove(x, y)

        targetPosition.current = null
        isMoving.current = false
      }
    }

    updateSprite(currentDirection.current, isMoving.current)
  })

  return (
    <pixiContainer>
      {sprite && (
        <pixiSprite
          texture={sprite.texture}
          x={position.current.x}
          y={position.current.y}
          scale={0.5}
          anchor={{ x: 0, y: 0.4 } as PointData}
        />
      )}
    </pixiContainer>
  )
}
