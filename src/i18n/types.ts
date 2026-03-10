export type Language = 'zh' | 'en'

export interface TranslationData {
  // Personal info
  name: string
  title: string
  realName: string
  role: string

  // About me
  about_me: {
    summary: string
    passion: string
  }

  // Stack categories
  stack_categories: {
    backend: string
    frontend: string
    cloud: string
    database: string
  }

  // UI texts
  ui: {
    terminal: string
    type_command: string
    featured_open_source: string
    live: string
    source_code: string
    built_with_passion: string
    go_to_projects: string
    go_to_skills: string
    open_github: string
    send_email: string
    certifications: string
    tech_stack: string
    projects: string
  }
}

export interface Translations {
  zh: TranslationData
  en: TranslationData
}
