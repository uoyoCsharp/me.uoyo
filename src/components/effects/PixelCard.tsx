import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PixelCardProps {
  children: ReactNode
  className?: string
  active?: boolean
}

export function PixelCard({ children, className }: PixelCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden p-4 rounded-lg",
        "bg-zinc-900/60 border border-zinc-800",
        "hover:border-emerald-500/30",
        "transition-all duration-300",
        "hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
        className
      )}
    >
      {/* Pixel corner decorations */}
      <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-emerald-500/60" />
      <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-emerald-500/60" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-emerald-500/60" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-emerald-500/60" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Certification specific pixel card with status indicator
export function CertPixelCard({
  title,
  date,
  status = "verified"
}: {
  title: string
  date: string
  status?: "verified" | "pending" | "expired"
}) {
  const statusConfig = {
    verified: { dotColor: "bg-emerald-500", label: "VERIFIED", animate: true },
    pending: { dotColor: "bg-yellow-500", label: "PENDING", animate: false },
    expired: { dotColor: "bg-red-500", label: "EXPIRED", animate: false },
  }

  const config = statusConfig[status]

  return (
    <div
      className={cn(
        "relative p-5 rounded-lg overflow-hidden",
        "bg-zinc-900/70 backdrop-blur-sm",
        "border border-zinc-800",
        "hover:border-emerald-500/40",
        "transition-all duration-300",
        "hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]",
        "group"
      )}
    >
      {/* Pixel corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-emerald-500/60 transition-all group-hover:border-emerald-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-emerald-500/60 transition-all group-hover:border-emerald-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-emerald-500/60 transition-all group-hover:border-emerald-400" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-emerald-500/60 transition-all group-hover:border-emerald-400" />

      {/* Scan line animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-20 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"
          style={{
            animation: "scan 2s linear infinite",
            top: "-80px"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Title - 突出显示 */}
        <div className="flex items-start gap-3 mb-3">
          {/* Animated status dot */}
          <div className="relative flex items-center justify-center shrink-0 mt-1">
            {config.animate && (
              <span className="absolute inline-flex h-4 w-4 rounded-full opacity-75 animate-ping bg-emerald-400" />
            )}
            <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", config.dotColor)} />
          </div>

          <h3 className="text-base font-medium text-zinc-100 group-hover:text-white transition-colors leading-snug">
            {title}
          </h3>
        </div>

        {/* Date - 不醒目 */}
        <div className="flex items-center gap-2 ml-5">
          <span className="font-mono text-xs text-zinc-600">{date}</span>
        </div>
      </div>
    </div>
  )
}

// Retro style pixel card
export function RetroPixelCard({
  children,
  className,
  glowColor = "emerald"
}: {
  children: ReactNode
  className?: string
  glowColor?: "emerald" | "cyan" | "purple" | "orange"
}) {
  const glowColors = {
    emerald: "hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    cyan: "hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    purple: "hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    orange: "hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]",
  }

  const dotColors = {
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  }

  return (
    <div
      className={cn(
        "relative p-4 rounded-sm",
        "bg-zinc-900/80 backdrop-blur-sm",
        "border-2 border-dashed border-zinc-700",
        "transition-all duration-300",
        "hover:border-solid hover:border-zinc-600",
        glowColors[glowColor],
        className
      )}
    >
      {/* Corner pixels */}
      <div className={cn("absolute -top-1 -left-1 w-2 h-2", dotColors[glowColor])} />
      <div className={cn("absolute -top-1 -right-1 w-2 h-2", dotColors[glowColor])} />
      <div className={cn("absolute -bottom-1 -left-1 w-2 h-2", dotColors[glowColor])} />
      <div className={cn("absolute -bottom-1 -right-1 w-2 h-2", dotColors[glowColor])} />

      {/* Content */}
      {children}
    </div>
  )
}
