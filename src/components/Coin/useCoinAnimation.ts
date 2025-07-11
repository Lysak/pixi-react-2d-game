import { Rectangle, Sprite, Texture } from 'pixi.js'
import { useRef, useState } from 'react'

interface UseCoinAnimationProps {
  texture: Texture
  frameWidth: number
  frameHeight: number
  totalFrames: number
  animationSpeed: number
}

export const useCoinAnimation = ({
  texture,
  frameWidth,
  frameHeight,
  totalFrames,
  animationSpeed,
}: UseCoinAnimationProps) => {
  const [, setCurrentTexture] = useState<Texture | null>(null)
  const spriteRef = useRef<Sprite | null>(null)
  const frameRef = useRef(0)
  const elapsedTimeRef = useRef(0)

  // Initialize sprite and texture
  if (!spriteRef.current && texture && texture.source) {
    const initialTexture = new Texture({
      source: texture.source,
      frame: new Rectangle(0, 0, frameWidth, frameHeight),
    })
    spriteRef.current = new Sprite(initialTexture)
    setCurrentTexture(initialTexture)
  }

  const updateSprite = (delta: number) => {
    if (!spriteRef.current || !texture || !texture.source) {
      return
    }

    elapsedTimeRef.current += delta

    const frameDuration = 1 / animationSpeed

    if (elapsedTimeRef.current >= frameDuration) {
      elapsedTimeRef.current = 0
      frameRef.current = (frameRef.current + 1) % totalFrames

      const newFrame = new Rectangle(
        frameRef.current * frameWidth,
        0,
        frameWidth,
        frameHeight,
      )

      const newTexture = new Texture({
        source: texture.source,
        frame: newFrame,
      })

      if (spriteRef.current) {
        spriteRef.current.texture = newTexture
        setCurrentTexture(newTexture)
      }
    }
  }

  return {
    sprite: spriteRef.current,
    updateSprite,
  }
}
