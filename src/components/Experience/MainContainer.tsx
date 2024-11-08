import { useState, useMemo, PropsWithChildren, useCallback } from 'react'
import { Texture } from 'pixi.js'
import { Container } from '@pixi/react'
import { Hero } from './Hero'
import { Level } from './Level'
import { TILE_SIZE } from '../../constants/game-world'
import { FollowingCamera } from './FollowingCamera'
import StarBackground from './StarBackground'
import { Coin } from './Coin'
import heroAsset from '../../assets/hero.png'
import coinAsset from '../../assets/MonedaR.png'

interface IMainContainerProps {
  canvasSize: { width: number; height: number }
}

const INITIAL_ZOOM = 3
const LEVEL_SIZE = 20

export const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({ x, y })
  }, [])

  const texture = useMemo(() => {
    return Texture.from(heroAsset)
  }, [])

  const coinTexture = useMemo(() => {
    return Texture.from(coinAsset)
  }, [])

  const levelSize = LEVEL_SIZE * TILE_SIZE

  return (
    <Container>
      {children}
      <StarBackground
        width={levelSize}
        height={levelSize}
        starCount={1100}
        scale={5}
        offset={{ x: levelSize, y: levelSize }}
      />

      <FollowingCamera
        zoom={INITIAL_ZOOM}
        heroPosition={heroPosition}
        canvasSize={canvasSize}
      >
        <Level />
        <Hero texture={texture} onMove={updateHeroPosition} />
        <Coin texture={coinTexture} x={5} y={10} />
        <Coin texture={coinTexture} x={6} y={11} />
        <Coin texture={coinTexture} x={7} y={12} />
      </FollowingCamera>
    </Container>
  )
}
