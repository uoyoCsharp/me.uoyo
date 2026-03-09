import { HeroSection } from "@/components/sections/HeroSection"
import { StackSection } from "@/components/sections/StackSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { CertSection } from "@/components/sections/CertSection"
import { Noise, FadeUp, Spotlight } from "@/components/effects"
import personalData from "@/data/personal.json"

function Footer() {
  return (
    <footer className="py-12 text-center">
      <div className="h-px bg-border mb-8" />
      <FadeUp>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personalData.name}
        </p>
      </FadeUp>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Noise Overlay */}
      <Noise opacity={0.025} />
      {/* Spotlight Effect */}
      <Spotlight />

      <div className="max-w-2xl mx-auto px-6">
        <HeroSection />
        <StackSection />
        <ProjectsSection />
        <CertSection />
        <Footer />
      </div>
    </div>
  )
}

export default App
