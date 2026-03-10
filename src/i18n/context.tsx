import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, TranslationData } from './types'
import { translations } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationData
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'uoyo-portfolio-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'zh' || stored === 'en') {
        return stored
      }
    }
    // Default to Chinese
    return 'zh'
  })

  // Persist language preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
