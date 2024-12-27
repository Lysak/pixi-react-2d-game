import { useState, useMemo, PropsWithChildren, useCallback } from 'react'
import { Texture } from 'pixi.js'
import { Container, Sprite } from '@pixi/react'
import { Hero } from './Hero'
import { Level } from './Level'
import { FollowingCamera } from './FollowingCamera'
import { Coin } from './Coin'
import heroAsset from '@/assets/hero.png'
import coinAsset from '@/assets/MonedaR.png'
import backgroundAsset from '@/assets/space-stars.jpg'
import { TILE_SIZE } from '../../constants/game-world'

interface IMainContainerProps {
  canvasSize: { width: number; height: number }
}

const INITIAL_ZOOM = 3

export const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })

  const heroTexture = useMemo(() => Texture.from(heroAsset), [])
  const coinTexture = useMemo(() => Texture.from(coinAsset), [])
  const backgroundTexture = useMemo(() => Texture.from(backgroundAsset), [])

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    })
  }, [])

  return (
    <Container>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
      <FollowingCamera
        zoom={INITIAL_ZOOM}
        heroPosition={heroPosition}
        canvasSize={canvasSize}
      >
        <Level />
        <Hero texture={heroTexture} onMove={updateHeroPosition} />
        <Coin texture={coinTexture} x={5} y={10} />
        <Coin texture={coinTexture} x={6} y={11} />
        <Coin texture={coinTexture} x={7} y={12} />
      </FollowingCamera>
    </Container>
  )
}

export default MainContainer
