import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "p"
  trigger?: "hover" | "auto"
}

export function GlitchText({
  text,
  className = "",
  as: Component = "span",
  trigger = "hover"
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (trigger === "auto" && !isGlitching) {
      const randomInterval = Math.random() * 5000 + 3000
      const timeout = setTimeout(() => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }, randomInterval)
      return () => clearTimeout(timeout)
    }
  }, [trigger, isGlitching])

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsGlitching(true)
      intervalRef.current = setInterval(() => {
        setIsGlitching(false)
        setTimeout(() => setIsGlitching(true), 50)
      }, 100)
    }
  }

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsGlitching(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  return (
    <Component
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={isGlitching ? "opacity-0" : ""}>{text}</span>

      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-cyan-400"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`,
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-pink-400"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`,
            }}
          >
            {text}
          </span>
        </>
      )}
    </Component>
  )
}
