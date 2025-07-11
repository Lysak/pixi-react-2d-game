import { Application } from '@pixi/react'
import { useCallback, useEffect, useState } from 'react'
import { calculateCanvasSize } from '../../helpers/common'
import { MainContainer } from './MainContainer/MainContainer'

export const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize())

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize())
  }, [])

  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [updateCanvasSize])

  return (
    <Application
      width={canvasSize.width}
      height={canvasSize.height}
      // preference='webgl'
      // powerPreference='high-performance'
      // antialias={true}
      // backgroundColor={0x000000}
      // backgroundAlpha={1}
      // autoDensity={true}
      // preserveDrawingBuffer={true}
    >
      <MainContainer canvasSize={canvasSize} />
    </Application>
  )
}
