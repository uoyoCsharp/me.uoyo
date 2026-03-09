import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

interface ParticlesProps {
  quantity?: number
  color?: string
  className?: string
}

export function Particles({
  quantity = 50,
  color = "#22d3ee",
  className = ""
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>()

  // 初始化粒子
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // 创建粒子
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const newParticles: Particle[] = Array.from({ length: quantity }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.4,
    }))

    setParticles(newParticles)
  }, [dimensions, quantity])

  // 动画循环
  useEffect(() => {
    if (particles.length === 0) return

    const animate = () => {
      setParticles(prev =>
        prev.map(p => {
          let newX = p.x + p.speedX
          let newY = p.y + p.speedY

          // 鼠标交互
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100
            newX -= (dx / dist) * force * 2
            newY -= (dy / dist) * force * 2
          }

          // 边界检查
          if (newX < 0 || newX > dimensions.width) {
            p.speedX *= -1
            newX = Math.max(0, Math.min(dimensions.width, newX))
          }
          if (newY < 0 || newY > dimensions.height) {
            p.speedY *= -1
            newY = Math.max(0, Math.min(dimensions.height, newY))
          }

          return { ...p, x: newX, y: newY }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles.length, dimensions])

  // 鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // 解析颜色
  const parseColor = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    >
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size * 2,
            height: p.size * 2,
            backgroundColor: parseColor(color, p.opacity),
            boxShadow: `0 0 ${p.size * 3}px ${parseColor(color, p.opacity * 0.5)}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
