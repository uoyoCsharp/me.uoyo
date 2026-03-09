import { Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlitchText, SplitText, FadeUp, MagneticButton } from "@/components/effects"
import personalData from "@/data/personal.json"

export function HeroSection() {
  return (
    <section className="pt-20 pb-12">
      {/* Name with Glitch Effect */}
      <FadeUp delay={0} duration={0.6}>
        <h1 className="text-4xl font-bold mb-1">
          <GlitchText text={personalData.name} trigger="hover" />
        </h1>
      </FadeUp>

      {/* Title */}
      <FadeUp delay={0.1} duration={0.6}>
        <p className="text-muted-foreground mb-4">
          <SplitText text={personalData.title} delay={0.15} stagger={0.04} />
        </p>
      </FadeUp>

      {/* Bio */}
      <FadeUp delay={0.2} duration={0.6}>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">
          <SplitText text={personalData.bio} delay={0.25} stagger={0.01} />
        </p>
      </FadeUp>

      {/* Social Links with Magnetic Effect */}
      <FadeUp delay={0.4} duration={0.6}>
        <div className="flex gap-3">
          <MagneticButton>
            <Button variant="ghost" size="icon" asChild>
              <a href={personalData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${personalData.email}`} aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </MagneticButton>
        </div>
      </FadeUp>
    </section>
  )
}
