import { collisionMap } from '../constants/collisionMap'
import { COLS, TILE_SIZE } from '../constants/game-world'
import { Direction } from '../types/game-world'

interface Position {
  x: number
  y: number
}

export const calculateCanvasSize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  return { width, height }
}

export const calculateNewTarget = (
  x: number,
  y: number,
  direction: Direction
): Position => {
  return {
    x:
      (x / TILE_SIZE) * TILE_SIZE +
      (direction === 'LEFT'
        ? -TILE_SIZE
        : direction === 'RIGHT'
        ? TILE_SIZE
        : 0),
    y:
      (y / TILE_SIZE) * TILE_SIZE +
      (direction === 'UP' ? -TILE_SIZE : direction === 'DOWN' ? TILE_SIZE : 0),
  }
}

export const checkCanMove = (target: Position) => {
  const row = Math.floor(target.y / TILE_SIZE)
  const col = Math.floor(target.x / TILE_SIZE)
  const index = COLS * row + col

  if (index < 0 || index >= collisionMap.length) {
    return false
  }

  return collisionMap[index] !== 1
}

export const moveTowards = (
  current: number,
  target: number,
  maxStep: number
) => {
  return (
    current +
    Math.sign(target - current) * Math.min(Math.abs(target - current), maxStep)
  )
}

export const continueMovement = (
  currentPosition: Position,
  targetPosition: Position,
  step: number
): Position => {
  return {
    x: moveTowards(currentPosition.x, targetPosition.x, step),
    y: moveTowards(currentPosition.y, targetPosition.y, step),
  }
}

export const handleMovement = (
  currentPosition: Position,
  targetPosition: Position,
  moveSpeed: number,
  delta: number
) => {
  const step = moveSpeed * TILE_SIZE * delta
  const distance = Math.hypot(
    targetPosition.x - currentPosition.x,
    targetPosition.y - currentPosition.y
  )

  if (distance <= step) {
    return {
      position: targetPosition,
      completed: true,
    }
  }

  return {
    position: continueMovement(currentPosition, targetPosition, step),
    completed: false,
  }
}
