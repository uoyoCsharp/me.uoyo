import { Badge } from "@/components/ui/badge"
import { FadeUp } from "@/components/effects"
import personalData from "@/data/personal.json"

export function StackSection() {
  return (
    <section className="py-8">
      {/* Section Header */}
      <FadeUp>
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
            Tech Stack
          </h2>
          <div className="h-px bg-border" />
        </div>
      </FadeUp>

      {/* Stack Tags with staggered animation */}
      <div className="flex flex-wrap gap-2">
        {personalData.stacks.map((stack, index) => (
          <FadeUp key={stack} delay={0.05 + (index % 8) * 0.03} duration={0.4}>
            <Badge
              variant="outline"
              className="text-sm font-normal hover:border-foreground hover:text-foreground transition-colors cursor-default"
            >
              {stack}
            </Badge>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
