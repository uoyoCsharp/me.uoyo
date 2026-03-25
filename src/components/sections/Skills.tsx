import { Terminal } from "lucide-react"
import { useTranslation } from "@/i18n/context"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const STACK_CATEGORIES_DATA = [
  {
    key: "backend" as const,
    skills: [".NET", "ASP.NET Core", "WPF", "Blazor", "Python", "FastAPI", "DDD", "Microservices"],
    color: "cyan" as const,
    span: "md:col-span-2 md:row-span-1"
  },
  {
    key: "frontend" as const,
    skills: ["TypeScript", "Vue.js", "React", "shadcn/ui", "Ant Design", "Tailwind CSS"],
    color: "emerald" as const,
    span: "md:col-span-1 md:row-span-1"
  },
  {
    key: "cloud" as const,
    skills: ["Docker", "AWS", "Azure", "Azure DevOps"],
    color: "purple" as const,
    span: "md:col-span-1 md:row-span-1"
  },
  {
    key: "database" as const,
    skills: ["Redis", "MongoDB", "SQL Server", "PostgreSQL", "Claude", "Github Copilot"],
    color: "orange" as const,
    span: "md:col-span-2 md:row-span-1"
  }
]

export function Skills() {
  const { t } = useTranslation()
  
  const colorMap = {
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", shadow: "hover:shadow-cyan-500/10 hover:border-cyan-500/50" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", shadow: "hover:shadow-emerald-500/10 hover:border-emerald-500/50" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", shadow: "hover:shadow-purple-500/10 hover:border-purple-500/50" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", shadow: "hover:shadow-orange-500/10 hover:border-orange-500/50" }
  }

  return (
    <section id="skills" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-muted-foreground">~/{t.ui.tech_stack}</span>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STACK_CATEGORIES_DATA.map(({ key, skills, color, span }, i) => {
            const styles = colorMap[color]
            const title = t.stack_categories[key]
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                className={cn(
                  "group bg-card/50 border border-border rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-md",
                  styles.shadow,
                  span
                )}
              >
                {/* Card Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={cn("w-2 h-2 rounded-full", styles.bg)} />
                  <h3 className="font-mono text-sm text-foreground">{title}</h3>
                </div>

                {/* Skills Tag Cloud */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "px-2.5 py-1 rounded-md font-mono text-xs transition-colors",
                        "bg-secondary/50 text-secondary-foreground/80",
                        "group-hover:bg-secondary group-hover:text-foreground"
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}