import { extend } from '@pixi/react'
import { Assets, Container, Sprite, type Texture } from 'pixi.js'
import { type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import coinGoldAsset from '@/assets/coin-gold.png'
import coinRedAsset from '@/assets/coin-red.png'
import heroAsset from '@/assets/hero.png'
import backgroundAsset from '@/assets/space-stars.jpg'
import { TILE_SIZE } from '../../../constants/game-world'
import { Camera } from '../../Camera/Camera'
import { Coin } from '../../Coin/Coin'
import { Hero } from '../../Hero/Hero'
import { Level } from '../../Levels/Level'

extend({ Container, Sprite })

interface IMainContainerProps {
  canvasSize: { width: number; height: number }
}

export const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })
  const [assets, setAssets] = useState<Record<string, Texture> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Use direct texture creation instead of Assets.add
        const heroTexture = await Assets.load(heroAsset)
        const coinGoldTexture = await Assets.load(coinGoldAsset)
        const coinRedTexture = await Assets.load(coinRedAsset)
        const backgroundTexture = await Assets.load(backgroundAsset)

        setAssets({
          hero: heroTexture,
          coinGold: coinGoldTexture,
          coinRed: coinRedTexture,
          background: backgroundTexture,
        })
        setLoading(false)
      } catch (error) {
        console.error('Failed to load assets:', error)
      }
    }

    loadAssets().then(() => {})
  }, [])

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    })
  }, [])

  if (loading || !assets) {
    return (
      <pixiContainer>
        <pixiSprite
          width={100}
          height={100}
          x={canvasSize.width / 2 - 50}
          y={canvasSize.height / 2 - 50}
        />
      </pixiContainer>
    )
  }

  return (
    <pixiContainer>
      <pixiSprite
        texture={assets.background}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      {children}
      <Camera heroPosition={heroPosition} canvasSize={canvasSize}>
        <Level />
        <Hero texture={assets.hero} onMove={updateHeroPosition} />
        <Coin texture={assets.coinRed} x={5} y={10} />
        <Coin texture={assets.coinGold} x={6} y={11} />
      </Camera>
    </pixiContainer>
  )
}
