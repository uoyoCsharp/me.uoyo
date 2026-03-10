import { useTranslation } from '@/i18n/context'

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation()

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-700"
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <span className={language === 'zh' ? 'text-white' : 'text-zinc-500'}>中</span>
      <span className="text-zinc-600">/</span>
      <span className={language === 'en' ? 'text-white' : 'text-zinc-500'}>EN</span>
    </button>
  )
}
