import { useState, useMemo, PropsWithChildren, useCallback } from 'react'
import { Texture } from 'pixi.js'
import { Container, Sprite } from '@pixi/react'
import { TILE_SIZE } from '../../../constants/game-world'
import { Hero } from '../../Hero/Hero'
import { Level } from '../../Levels/Level'
import { Camera } from '../../Camera/Camera'
import { Coin } from '../../Coin/Coin'
import backgroundAsset from '@/assets/space-stars.jpg'
import heroAsset from '@/assets/hero.png'
import coinRedAsset from '@/assets/coin-red.png'
import coinGoldAsset from '@/assets/coin-gold.png'

interface IMainContainerProps {
  canvasSize: { width: number; height: number }
}

export const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })
  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    })
  }, [])

  const heroTexture = useMemo(() => Texture.from(heroAsset), [])
  const coinTextureRed = useMemo(() => Texture.from(coinRedAsset), [])
  const coinTextureGold = useMemo(() => Texture.from(coinGoldAsset), [])
  const backgroundTexture = useMemo(() => Texture.from(backgroundAsset), [])

  return (
    <Container>
      <Sprite
        texture={backgroundTexture}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
      <Camera heroPosition={heroPosition} canvasSize={canvasSize}>
        <Level />
        <Hero texture={heroTexture} onMove={updateHeroPosition} />
        <Coin texture={coinTextureRed} x={5} y={10} />
        <Coin texture={coinTextureGold} x={6} y={11} />
      </Camera>
    </Container>
  )
}

export default MainContainer
