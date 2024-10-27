import { useRef, useCallback, useState, useEffect } from 'react'
import { Sprite, Container, useTick } from '@pixi/react'
import { ANIMATION_SPEED, DEFAULT_X_POS, DEFAULT_Y_POS, MOVE_SPEED, TILE_SIZE } from '../../constants/game-world'
import { useHeroControls } from '../../hooks/useControls'
import { Texture } from 'pixi.js'
import { canWalk } from '../../helpers/common'
import { useHeroAnimation } from '../../hooks/useHeroAnimation'
import { Direction } from '../../types/game-world'

interface IHeroProps {
  texture: Texture
  onMove: (gridX: number, gridY: number) => void
}

export const Hero = ({ texture, onMove }: IHeroProps) => {
  const position = useRef({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS })
  const targetPosition = useRef<{ x: number; y: number } | null>(null)
  const { getCurrentDirection } = useHeroControls()
  const [currentDirection, setCurrentDirection] = useState<Direction>()
  const isMoving = useRef(false)

  // Initialize grid position
  useEffect(() => {
    onMove(Math.floor(position.current.x / TILE_SIZE), Math.floor(position.current.y / TILE_SIZE))
  }, [onMove])

  const { sprite, updateSprite } = useHeroAnimation({ texture, frameWidth: 64, frameHeight: 64 })

  const moveTowards = useCallback(
    (current: number, target: number, maxStep: number) => {
      return Math.round(current + Math.sign(target - current) * Math.min(Math.abs(target - current), maxStep))
    },
    []
  )

  const setNextTarget = useCallback((direction: Direction) => {
    if (targetPosition.current) return

    const { x, y } = position.current
    const newTarget = {
      x: Math.round(x / TILE_SIZE) * TILE_SIZE + (direction === 'LEFT' ? -TILE_SIZE : direction === 'RIGHT' ? TILE_SIZE : 0),
      y: Math.round(y / TILE_SIZE) * TILE_SIZE + (direction === 'UP' ? -TILE_SIZE : direction === 'DOWN' ? TILE_SIZE : 0),
    }

    if (canWalk(Math.floor(newTarget.y / TILE_SIZE), Math.floor(newTarget.x / TILE_SIZE)) && (newTarget.x !== x || newTarget.y !== y)) {
      targetPosition.current = newTarget
    }
  }, [])

  useTick((delta) => {
    const direction = getCurrentDirection()

    if (!targetPosition.current && direction) {
      setNextTarget(direction)
      setCurrentDirection(direction)
    }

    if (targetPosition.current) {
      isMoving.current = true
      const { x, y } = position.current
      const { x: targetX, y: targetY } = targetPosition.current
      const distance = Math.hypot(targetX - x, targetY - y)

      if (distance <= MOVE_SPEED * TILE_SIZE * delta) {
        position.current = { ...targetPosition.current }
        targetPosition.current = null
        onMove(Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE))

        if (direction) {
          setNextTarget(direction)
          setCurrentDirection(direction)
        }

      } else {
        position.current = {
          x: moveTowards(x, targetX, MOVE_SPEED * TILE_SIZE * delta),
          y: moveTowards(y, targetY, MOVE_SPEED * TILE_SIZE * delta),
        }
      }
    } else {
      isMoving.current = false
    }

    updateSprite(currentDirection, isMoving.current, ANIMATION_SPEED)
  })

  return (
    <Container>
      {sprite && (
        <Sprite
          texture={sprite.texture}
          scale={0.5}
          x={position.current.x}
          y={position.current.y}
          anchor={[0, 0.4]}
          eventMode="dynamic"
          pointerdown={() => console.log('Hero clicked')}
        />
      )}
    </Container>
  )
}
