import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FadeUp } from "@/components/effects"
import personalData from "@/data/personal.json"

export function ProjectsSection() {
  return (
    <section className="py-8">
      {/* Section Header */}
      <FadeUp>
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
            Projects
          </h2>
          <div className="h-px bg-border" />
        </div>
      </FadeUp>

      {/* Project List */}
      <div className="space-y-6">
        {personalData.projects.map((project, index) => (
          <FadeUp key={project.title} delay={0.1 + index * 0.1}>
            <div className="grid grid-cols-[4rem_1fr] gap-4 group">
              {/* Year */}
              <span className="font-mono text-sm text-muted-foreground pt-0.5 group-hover:text-foreground transition-colors">
                {project.year}
              </span>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {project.prod_url ? (
                    <a
                      href={project.prod_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-muted-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground"
                    >
                      {project.title}
                    </a>
                  ) : project.github_url ? (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-muted-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <span className="font-medium">{project.title}</span>
                  )}
                  {(project.prod_url || project.github_url) && (
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
