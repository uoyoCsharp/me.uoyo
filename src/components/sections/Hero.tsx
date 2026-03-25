import { useState, useEffect } from "react"
import { useTranslation } from "@/i18n/context"
import { ShinyText } from "@/components/ui/ShinyText"
import { motion } from "framer-motion"

function TypeWriter({ text, delay = 0, speed = 50, className }: { text: string; delay?: number; speed?: number; className?: string }) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">▌</span>
    </span>
  )
}

export function Hero() {
  const [bootComplete, setBootComplete] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const timeout = setTimeout(() => setBootComplete(true), 2500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-14 px-6 relative z-10">
      <div className="max-w-4xl w-full">
        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card/50 border border-border rounded-xl overflow-hidden backdrop-blur-sm shadow-xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/80">
            <span className="w-3 h-3 rounded-full bg-destructive/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 font-mono text-xs text-muted-foreground">{t.ui.terminal}</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-3">
            {/* Boot Sequence */}
            <div className="text-muted-foreground">
              <TypeWriter text={`> system.connect("${t.name}")`} delay={200} speed={40} />
            </div>
            <div className="text-muted-foreground">
              <TypeWriter text="> init_profile... [OK]" delay={800} speed={40} />
            </div>
            <div className="text-muted-foreground">
              <TypeWriter text="> load_modules... [OK]" delay={1400} speed={40} />
            </div>

            {/* Main Content (after boot) */}
            {bootComplete && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-6 pt-6 border-t border-border space-y-6"
              >
                {/* Name */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-widest flex items-baseline gap-3">
                    <ShinyText
                      text={t.name}
                      speed={3}
                      color="hsl(var(--muted-foreground))"
                      shineColor="hsl(var(--primary))"
                      yoyo
                      className="font-['Audiowide'] uppercase"
                    />
                    <span className="text-lg text-muted-foreground font-mono">{t.realName}</span>
                  </h1>
                  <p className="text-primary font-mono text-lg mt-2">
                    {t.role}
                  </p>
                </div>

                {/* About Me Block */}
                <div className="bg-background/50 border border-border rounded-lg p-4 transition-all hover:border-primary/50">
                  <div className="text-xs text-muted-foreground mb-2 font-mono">```about_me</div>
                  <p className="text-foreground/80 leading-relaxed text-sm">
                    {t.about_me.summary}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                    {t.about_me.passion}
                  </p>
                  <div className="text-xs text-muted-foreground mt-2 font-mono">```</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
