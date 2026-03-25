import { Terminal, ExternalLink, Github } from "lucide-react"
import { useTranslation } from "@/i18n/context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { GradientText, gradientPresets } from "@/components/ui/GradientText"
import { motion } from "framer-motion"

const PROJECT_DESCRIPTIONS = {
  MiCake: {
    zh: "基于ASP.NET Core的DDD模块化开发框架，提供高效的开发体验和灵活的架构设计，助力开发者快速构建可维护的应用程序。",
    en: "A DDD modular development framework based on ASP.NET Core, providing efficient development experience and flexible architecture design, helping developers quickly build maintainable applications."
  },
  Mirrophant: {
    zh: "由AI驱动的风格创作平台",
    en: "AI-powered style creation platform"
  },
  "My-Virtual-TechTeam": {
    zh: "基于提示词工程构建的多 Agent 协作框架",
    en: "Multi-agent collaboration framework built on prompt engineering"
  },
  "股神鸟鸟": {
    zh: "A股智能选股工具，基于AI技术分析市场趋势，提供个性化投资建议，助力投资者做出明智决策。",
    en: "A-share intelligent stock selection tool, using AI technology to analyze market trends and provide personalized investment advice."
  },
  "uniapp-fast-ts-template": {
    zh: "基于uniapp和TypeScript的快速开发模板，提供丰富的组件和工具，帮助开发者高效构建跨平台应用。",
    en: "A rapid development template based on uniapp and TypeScript, providing rich components and tools for efficient cross-platform app development."
  }
}

const PROJECTS = [
  { title: "MiCake", tags: [".NET", "DDD", "ASP.NET Core"], prod_url: "https://micake.github.io", github_url: "https://github.com/MiCake/MiCake" },
  { title: "Mirrophant", tags: ["React", "AI", "Python", "ASP.NET Core"], prod_url: "https://mirrophant.com" },
  { title: "My-Virtual-TechTeam", tags: ["Prompt", "AI", "Agenetic Engineering "], prod_url: "https://ai.uoyo.net", github_url: "https://github.com/uoyoCsharp/My-Virtual-TechTeam" },
  { title: "股神鸟鸟", tags: ["Vue.js", "Tailwind CSS", "ASP.NET Core"], prod_url: "https://stock.uoyo.net" },
  { title: "uniapp-fast-ts-template", tags: ["uniapp", "TypeScript"], github_url: "https://github.com/uoyoCsharp/uniapp-fast-ts-template" }
]

export function Projects() {
  const { t, language } = useTranslation()

  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-muted-foreground">~/{t.ui.projects}</span>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => {
            const isFeatured = project.title === "MiCake"
            const description = PROJECT_DESCRIPTIONS[project.title as keyof typeof PROJECT_DESCRIPTIONS]
            const localizedDescription = description ? description[language] : ""

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={cn(
                  "group bg-card/80 border rounded-xl overflow-hidden transition-all duration-300 shadow-sm",
                  isFeatured
                    ? "border-primary/30 hover:shadow-cyan-500/20 hover:shadow-lg"
                    : "border-border hover:border-primary/50"
                )}
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-3 h-3 rounded-full", isFeatured ? "bg-red-400" : "bg-destructive/80")} />
                    <span className={cn("w-3 h-3 rounded-full", isFeatured ? "bg-yellow-400" : "bg-yellow-500/80")} />
                    <span className={cn("w-3 h-3 rounded-full", isFeatured ? "bg-green-400" : "bg-green-500/80")} />
                    <span className="ml-3 font-mono text-xs text-muted-foreground">~/{project.title.toLowerCase()}</span>
                  </div>

                  {/* Featured Badge */}
                  {isFeatured && (
                    <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary">
                      {t.ui.featured_open_source}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Project Title with Gradient */}
                  <h3 className="text-lg font-bold mb-3">
                    <GradientText
                      text={project.title}
                      colors={isFeatured ? gradientPresets.cyanToPurple : ['hsl(var(--primary))', 'hsl(var(--primary))', 'hsl(var(--primary))']}
                      animationSpeed={4}
                      className="tracking-wide"
                    />
                  </h3>

                  {/* Description as comment */}
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                    <span className="text-muted-foreground/60"># </span>
                    {localizedDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-xs bg-secondary/50 hover:bg-secondary border-border"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-3 border-t border-border mt-auto">
                    {project.prod_url && (
                      <a
                        href={project.prod_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{t.ui.live}</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{t.ui.source_code}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
