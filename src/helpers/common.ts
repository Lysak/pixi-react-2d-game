import { collisionMap } from '../constants/collisionMap'
import { COLS } from '../constants/game-world'

export const canWalk = (row: number, col: number) => {
  const index = COLS * row + col

  if (index < 0 || index >= collisionMap.length) {
    return false
  }

  const tile = collisionMap[index]

  return tile !== 1
}
