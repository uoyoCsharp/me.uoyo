import { useState, useEffect, useRef } from "react"
import { Github, Mail, Command, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Particles } from "@/components/effects/Particles"
import { LanguageProvider, useTranslation } from "@/i18n/context"
import { LanguageToggle } from "@/components/ui/LanguageToggle"
import { Hero, Certifications, Skills, Projects } from "@/components/sections"

const STATIC_DATA = {
  email: "344481481@qq.com",
  github: "https://github.com/uoyoCsharp"
}

// ============================================================
// 导航栏
// ============================================================
function Navigation({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-foreground/80 hover:text-foreground transition-colors">
          &lt;<span className="text-primary">{t.name}</span> /&gt;
        </a>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={onOpenCommand}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-muted-foreground text-xs font-mono hover:border-border/80 hover:text-foreground transition-all"
          >
            <Command className="w-3 h-3" />
            <span>⌘K</span>
          </button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
            <a href={STATIC_DATA.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
            <a href={`mailto:${STATIC_DATA.email}`} aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}

// ============================================================
// Command 面板
// ============================================================
function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setSearch("")
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
      }
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const commands = [
    { label: t.ui.go_to_projects, action: () => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); onClose() } },
    { label: t.ui.go_to_skills, action: () => { document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }); onClose() } },
    { label: t.ui.open_github, action: () => { window.open(STATIC_DATA.github, "_blank"); onClose() } },
    { label: t.ui.send_email, action: () => { window.location.href = `mailto:${STATIC_DATA.email}`; onClose() } },
  ]

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <span className="text-primary font-mono text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.ui.type_command}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
          />
          <kbd className="px-2 py-0.5 rounded bg-muted border border-border text-[10px] text-muted-foreground font-mono">ESC</kbd>
        </div>

        <div className="p-2 max-h-64 overflow-y-auto">
          {filtered.map((cmd, i) => (
            <button
              key={i}
              onClick={cmd.action}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex items-center"
            >
              <ArrowUpRight className="inline w-4 h-4 mr-2" />
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="py-12 px-6 border-t border-border mt-16 relative z-10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
          &lt;<span className="text-primary">{t.name}</span> /&gt;
        </a>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · {t.ui.built_with_passion}
        </p>
      </div>
    </footer>
  )
}

// ============================================================
// 主应用
// ============================================================
function AppContent() {
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen(prev => !prev)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Particles
        quantity={80}
        color="hsl(var(--primary))"
        className="opacity-50"
      />
      <Navigation onOpenCommand={() => setCommandOpen(true)} />
      
      <main className="relative z-10 w-full flex flex-col pt-10">
        <Hero />
        <div className="space-y-4">
          <Certifications />
          <Skills />
          <Projects />
        </div>
      </main>

      <Footer />
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
