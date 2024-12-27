import { useRef, useCallback, useEffect } from 'react'
import { Sprite, Container, useTick } from '@pixi/react'
import {
  ANIMATION_SPEED,
  DEFAULT_X_POS,
  DEFAULT_Y_POS,
  MOVE_SPEED,
  TILE_SIZE,
} from '../../constants/game-world'
import { useHeroControls } from '../../hooks/useControls'
import { Texture } from 'pixi.js'
import {
  calculateNewTarget,
  checkCanMove,
  moveTowards,
} from '../../helpers/common'
import { useHeroAnimation } from '../../hooks/useHeroAnimation'
import { Direction } from '../../types/game-world'

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
  })

  useEffect(() => {
    onMove(position.current.x / TILE_SIZE, position.current.y / TILE_SIZE)
  }, [onMove])

  const setNextTarget = useCallback((direction: Direction) => {
    if (targetPosition.current) return
    currentDirection.current = direction

    const { x, y } = position.current
    const newTarget = calculateNewTarget(x, y, direction)

    //check and move =>
    if (checkCanMove(newTarget) && (newTarget.x !== x || newTarget.y !== y)) {
      targetPosition.current = newTarget
      isMoving.current = true
    } else {
      isMoving.current = false
    }
  }, [])

  const completeMovement = useCallback(
    (nextDirection: Direction | null) => {
      const { x, y } = position.current
      position.current = { ...targetPosition.current! }
      targetPosition.current = null

      onMove(Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE))
      isMoving.current = false

      if (nextDirection) {
        setNextTarget(nextDirection)
      }
    },
    [onMove, setNextTarget]
  )

  const continueMovement = useCallback((step: number) => {
    const { x, y } = position.current
    const { x: targetX, y: targetY } = targetPosition.current!

    position.current = {
      x: moveTowards(x, targetX, step),
      y: moveTowards(y, targetY, step),
    }
  }, [])

  const handleMovement = useCallback(
    (delta: number, nextDirection: Direction | null) => {
      if (!targetPosition.current) return

      const { x, y } = position.current
      const { x: targetX, y: targetY } = targetPosition.current
      const step = MOVE_SPEED * TILE_SIZE * delta
      const distance = Math.hypot(targetX - x, targetY - y)

      if (distance <= step) {
        completeMovement(nextDirection)
      } else {
        continueMovement(step)
      }
    },
    [completeMovement, continueMovement]
  )

  useTick((delta) => {
    const nextDirection = getControlsDirection()

    if (nextDirection) {
      setNextTarget(nextDirection)
    }

    handleMovement(delta, nextDirection)
    updateSprite(currentDirection.current!, isMoving.current, ANIMATION_SPEED)
  })

  return (
    <Container>
      {sprite && (
        <Sprite
          texture={sprite.texture}
          x={position.current.x}
          y={position.current.y}
          scale={0.5}
          anchor={[0, 0.4]}
        />
      )}
    </Container>
  )
}
