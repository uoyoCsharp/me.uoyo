import { useEffect, useRef } from "react"

interface NoiseProps {
  opacity?: number
  className?: string
}

export function Noise({ opacity = 0.04, className = "" }: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateNoise()
    }

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    let animationId: number
    let lastTime = 0
    const fps = 15
    const interval = 1000 / fps

    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        generateNoise()
        lastTime = time
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{ opacity }}
    />
  )
}
