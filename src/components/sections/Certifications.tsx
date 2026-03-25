import { Award } from "lucide-react"
import { useTranslation } from "@/i18n/context"
import { CertPixelCard } from "@/components/effects/PixelCard"
import { motion } from "framer-motion"

const CERTIFICATIONS = [
  { title: "软考：系统架构设计师", titleEn: "National Soft Exam: System Architect", date: "2019-12-25" },
  { title: "Microsoft Certified: DevOps Engineer Expert", titleEn: "Microsoft Certified: DevOps Engineer Expert", date: "2021-02-25", link: "https://learn.microsoft.com/api/credentials/share/zh-cn/uoyoCsharp/3F8696285CB847E7?sharingId=5E77528D3F63DC7B" },
  { title: "Microsoft Certified Trainer", titleEn: "Microsoft Certified Trainer", date: "2021-01-11", link: "https://www.credly.com/badges/e4b4e374-94d1-43e3-a4dc-83b0cafb0444/public_url" }
]

export function Certifications() {
  const { t, language } = useTranslation()

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Award className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs text-muted-foreground">~/{t.ui.certifications}</span>
        </motion.div>

        {/* Pixel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CertPixelCard
                title={language === 'en' ? cert.titleEn : cert.title}
                date={cert.date}
                status="verified"
                link={cert.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
