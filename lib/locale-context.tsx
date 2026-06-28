'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { type Locale, getTranslations, translations } from './i18n'

type TranslationType = typeof translations.tr | typeof translations.en

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationType
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'tr',
  setLocale: () => {},
  t: translations.tr,
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage?.getItem?.('locale') as Locale
      if (saved === 'tr' || saved === 'en') {
        setLocaleState(saved)
      }
    } catch {}
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage?.setItem?.('locale', newLocale)
    } catch {}
    document.documentElement.lang = newLocale
  }, [])

  const t = getTranslations(locale)

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
