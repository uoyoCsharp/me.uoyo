import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export function BlurText({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block transition-all",
        isVisible
          ? "opacity-100 blur-0 translate-y-0"
          : "opacity-0 blur-sm translate-y-4",
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {text}
    </span>
  )
}
