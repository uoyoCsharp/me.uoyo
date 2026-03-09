import { useState, useEffect, useRef } from "react"
import { Github, Mail, ExternalLink, Terminal, Command, ArrowUpRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Particles } from "@/components/effects/Particles"
import { CertPixelCard } from "@/components/effects/PixelCard"

// ============================================================
// 个人数据源 (严格基于 JSON)
// ============================================================
const DATA = {
  name: "uoyo",
  title: "极客开发工程师 & 系统架构师",
  about_me: {
    summary: "后端开发工程师，专注于 .NET 和 Python 技术栈，拥有丰富的系统架构设计经验。熟练掌握 ASP.NET Core、FastAPI 等后端框架，具备完整的前后端开发能力。擅长领域驱动设计（DDD）、微服务架构以及 AI 应用集成。",
    passion: "热衷于构建高质量的框架和工具，提升开发效率；同时探索 AI 技术在实际业务中的应用，将创新想法转化为可落地的产品。"
  },
  email: "344481481@qq.com",
  github: "https://github.com/uoyoCsharp",
  stacks: [".NET", "Python", "TypeScript", "ASP.NET Core", "WPF", "Blazor", "FastAPI", "Vue.js", "React", "shadcn/ui", "Ant Design", "Tailwind CSS", "Docker", "AWS", "Azure", "Azure DevOps", "Claude", "Github Copilot", "Redis", "MongoDB", "SQL Server", "PostgreSQL"],
  projects: [
    { title: "MiCake", description: "基于ASP.NET Core的DDD模块化开发框架，提供高效的开发体验和灵活的架构设计，助力开发者快速构建可维护的应用程序。", tags: [".NET", "DDD", "ASP.NET Core"], prod_url: "https://micake.github.io", github_url: "https://github.com/MiCake/MiCake" },
    { title: "Mirrophant", description: "由AI驱动的风格创作平台", tags: ["React", "AI", "Python", "ASP.NET Core"], prod_url: "https://mirrophant.com" },
    { title: "股神鸟鸟", description: "A股智能选股工具，基于AI技术分析市场趋势，提供个性化投资建议，助力投资者做出明智决策。", tags: ["Vue.js", "Tailwind CSS", "ASP.NET Core"], prod_url: "https://stock.uoyo.net" },
    { title: "uniapp-fast-ts-template", description: "基于uniapp和TypeScript的快速开发模板，提供丰富的组件和工具，帮助开发者高效构建跨平台应用。", tags: ["uniapp", "TypeScript"], github_url: "https://github.com/uoyoCsharp/uniapp-fast-ts-template" }
  ],
  certifications: [
    { title: "软考：系统架构设计师", date: "2019-12-25" },
    { title: "Microsoft Certified: DevOps Engineer Expert", date: "2021-02-25" },
    { title: "Microsoft Certified Trainer", date: "2021-01-11" }
  ]
}

// ============================================================
// 技能分类 (智能归类)
// ============================================================
const STACK_CATEGORIES = {
  "Backend & Architecture": {
    skills: [".NET", "ASP.NET Core", "WPF", "Blazor", "Python", "FastAPI", "DDD", "Microservices"],
    color: "cyan" as const,
    span: "md:col-span-2 md:row-span-1"
  },
  "Frontend": {
    skills: ["TypeScript", "Vue.js", "React", "shadcn/ui", "Ant Design", "Tailwind CSS"],
    color: "emerald" as const,
    span: "md:col-span-1 md:row-span-1"
  },
  "Cloud & DevOps": {
    skills: ["Docker", "AWS", "Azure", "Azure DevOps"],
    color: "purple" as const,
    span: "md:col-span-1 md:row-span-1"
  },
  "Database & AI": {
    skills: ["Redis", "MongoDB", "SQL Server", "PostgreSQL", "Claude", "Github Copilot"],
    color: "orange" as const,
    span: "md:col-span-2 md:row-span-1"
  }
}

// ============================================================
// 组件: 打字机动效
// ============================================================
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

// ============================================================
// 组件: 导航栏
// ============================================================
function Navigation({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <nav className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-sm text-zinc-300 hover:text-white transition-colors">
          &lt;<span className="text-cyan-400">uoyo</span> /&gt;
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommand}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono hover:border-zinc-700 hover:text-zinc-300 transition-all"
          >
            <Command className="w-3 h-3" />
            <span>⌘K</span>
          </button>

          {/* GitHub */}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900" asChild>
            <a href={DATA.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </Button>

          {/* Email */}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900" asChild>
            <a href={`mailto:${DATA.email}`} aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}

// ============================================================
// 组件: Command 面板
// ============================================================
function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

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
        // Toggle handled by parent
      }
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const commands = [
    { label: "Go to Projects", action: () => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); onClose() } },
    { label: "Go to Skills", action: () => { document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }); onClose() } },
    { label: "Open GitHub", action: () => { window.open(DATA.github, "_blank"); onClose() } },
    { label: "Send Email", action: () => { window.location.href = `mailto:${DATA.email}`; onClose() } },
  ]

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
          <span className="text-cyan-400 font-mono text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none font-mono"
          />
          <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-500 font-mono">ESC</kbd>
        </div>

        {/* Commands */}
        <div className="p-2 max-h-64 overflow-y-auto">
          {filtered.map((cmd, i) => (
            <button
              key={i}
              onClick={cmd.action}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            >
              <ArrowUpRight className="inline w-4 h-4 mr-2 text-zinc-600" />
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 组件: Hero Section
// ============================================================
function HeroSection() {
  const [bootComplete, setBootComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setBootComplete(true), 2500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-14 px-6">
      <div className="max-w-4xl w-full">
        {/* Terminal Window */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 font-mono text-xs text-zinc-500">terminal</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-3">
            {/* Boot Sequence */}
            <div className="text-zinc-500">
              <TypeWriter text={`> system.connect("${DATA.name}")`} delay={200} speed={40} />
            </div>
            <div className="text-zinc-500">
              <TypeWriter text="> init_profile... [OK]" delay={800} speed={40} />
            </div>
            <div className="text-zinc-500">
              <TypeWriter text="> load_modules... [OK]" delay={1400} speed={40} />
            </div>

            {/* Main Content (after boot) */}
            {bootComplete && (
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-6 animate-fade-in">
                {/* Name */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {DATA.name}
                  </h1>
                  <p className="text-cyan-400 font-mono text-lg mt-2">
                    Software Engineer (AI, Web, Desktop)
                  </p>
                </div>

                {/* About Me Block */}
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4">
                  <div className="text-xs text-zinc-600 mb-2 font-mono">```about_me</div>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {DATA.about_me.summary}
                  </p>
                  <p className="text-zinc-500 leading-relaxed text-sm mt-3">
                    {DATA.about_me.passion}
                  </p>
                  <div className="text-xs text-zinc-600 mt-2 font-mono">```</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 组件: Certifications (Pixel Card 风格)
// ============================================================
function CertificationsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <Award className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs text-zinc-500">~/certifications</span>
        </div>

        {/* Pixel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DATA.certifications.map((cert, i) => (
            <CertPixelCard
              key={i}
              title={cert.title}
              date={cert.date}
              status="verified"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 组件: Tech Stack (Bento Box)
// ============================================================
function SkillsSection() {
  const colorMap = {
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", shadow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", shadow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", shadow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", shadow: "hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]" }
  }

  return (
    <section id="skills" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs text-zinc-500">~/tech_stack</span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(STACK_CATEGORIES).map(([title, { skills, color, span }]) => {
            const styles = colorMap[color]
            return (
              <div
                key={title}
                className={cn(
                  "group bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 transition-all duration-300",
                  "hover:border-zinc-700",
                  styles.shadow,
                  span
                )}
              >
                {/* Card Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={cn("w-2 h-2 rounded-full", styles.bg)} />
                  <h3 className="font-mono text-sm text-zinc-300">{title}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-mono text-xs bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 组件: Projects (Terminal 风格)
// ============================================================
function ProjectsSection() {
  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs text-zinc-500">~/projects</span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DATA.projects.map((project) => {
            const isFeatured = project.title === "MiCake"

            return (
              <div
                key={project.title}
                className={cn(
                  "group bg-zinc-900/80 border rounded-xl overflow-hidden transition-all duration-300",
                  isFeatured
                    ? "border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    : "border-zinc-800 hover:border-zinc-700"
                )}
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-3 h-3 rounded-full", isFeatured ? "bg-red-400" : "bg-red-500/80")} />
                    <span className={cn("w-3 h-3 rounded-full", isFeatured ? "bg-yellow-400" : "bg-yellow-500/80")} />
                    <span className={cn("w-3 h-3 rounded-full", isFeatured ? "bg-green-400" : "bg-green-500/80")} />
                    <span className="ml-3 font-mono text-xs text-zinc-500">~/{project.title.toLowerCase()}</span>
                  </div>

                  {/* Featured Badge */}
                  {isFeatured && (
                    <Badge className="font-mono text-[10px] bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                      Featured Open Source
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Description as comment */}
                  <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-4">
                    <span className="text-zinc-600"># </span>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="font-mono text-xs bg-zinc-950/50 border-zinc-800 text-zinc-500"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-3 border-t border-zinc-800">
                    {project.prod_url && (
                      <a
                        href={project.prod_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// 组件: Footer
// ============================================================
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="font-mono text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          &lt;<span className="text-cyan-400">uoyo</span> /&gt;
        </a>

        {/* Copyright */}
        <p className="font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} · Built with passion and code
        </p>
      </div>
    </footer>
  )
}

// ============================================================
// 主应用
// ============================================================
function App() {
  const [commandOpen, setCommandOpen] = useState(false)

  // Global keyboard shortcut
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
    <div className="min-h-screen bg-zinc-950 text-zinc-300 relative overflow-hidden">
      {/* Particles Background */}
      <Particles
        quantity={80}
        color="#22d3ee"
      />

      {/* Navigation */}
      <Navigation onOpenCommand={() => setCommandOpen(true)} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <CertificationsSection />
        <SkillsSection />
        <ProjectsSection />
        <Footer />
      </main>

      {/* Command Palette */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  )
}

export default App
