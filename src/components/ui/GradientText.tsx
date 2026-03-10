import { motion } from 'framer-motion'

interface GradientTextProps {
  text: string
  className?: string
  colors?: readonly string[]
  animate?: boolean
  animationSpeed?: number
}

export function GradientText({
  text,
  className = '',
  colors = ['#22d3ee', '#a855f7', '#22d3ee'] as const,
  animate = true,
  animationSpeed = 3
}: GradientTextProps) {
  const gradientColors = [...colors].join(', ')

  return (
    <motion.span
      className={`inline-block font-bold ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradientColors})`,
        backgroundSize: animate ? '200% 200%' : '100% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : undefined}
      transition={animate ? {
        duration: animationSpeed,
        repeat: Infinity,
        ease: 'linear',
      } : undefined}
    >
      {text}
    </motion.span>
  )
}

// 预设变体
export const gradientPresets = {
  cyan: ['#22d3ee', '#06b6d4', '#22d3ee'],
  purple: ['#a855f7', '#8b5cf6', '#a855f7'],
  cyanToPurple: ['#22d3ee', '#a855f7', '#22d3ee'],
  emerald: ['#10b981', '#34d399', '#10b981'],
  orange: ['#f97316', '#fb923c', '#f97316'],
} as const
