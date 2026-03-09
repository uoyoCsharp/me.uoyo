import { FadeUp } from "@/components/effects"
import personalData from "@/data/personal.json"

export function CertSection() {
  return (
    <section className="py-8">
      {/* Section Header */}
      <FadeUp>
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
            Certifications
          </h2>
          <div className="h-px bg-border" />
        </div>
      </FadeUp>

      {/* Certification List */}
      <div className="space-y-3">
        {personalData.certifications.map((cert, index) => (
          <FadeUp key={cert.title} delay={0.1 + index * 0.1}>
            <div className="grid grid-cols-[4rem_1fr] gap-4 group">
              {/* Year */}
              <span className="font-mono text-sm text-muted-foreground pt-0.5 group-hover:text-foreground transition-colors">
                {cert.year}
              </span>
              {/* Content */}
              <span className="text-foreground group-hover:text-muted-foreground transition-colors">
                {cert.title}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
