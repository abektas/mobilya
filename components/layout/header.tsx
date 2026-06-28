'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/locale-context'
import { Globe, Menu, X, Search, ShoppingCart, User, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CartDrawer } from '@/components/cart/cart-drawer'

const categories = [
  { key: 'livingRoom', href: '/urunler?kategori=oturma-odasi' },
  { key: 'bedroom', href: '/urunler?kategori=yatak-odasi' },
  { key: 'diningRoom', href: '/urunler?kategori=yemek-odasi' },
  { key: 'office', href: '/urunler?kategori=ofis-mobilyalari' },
  { key: 'kitchen', href: '/urunler?kategori=mutfak-mobilyalari' },
  { key: 'garden', href: '/urunler?kategori=bahce-mobilyalari' },
]

export function Header() {
  const { locale, setLocale, t } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => setLocale(locale === 'tr' ? 'en' : 'tr')

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-md' : 'bg-gradient-to-b from-black/80 via-black/50 to-black/20')}>
        1 file(s) copied.


      {/* Top Bar */}
      <div className={cn('hidden lg:flex items-center justify-between px-4 py-1.5 text-xs border-b transition-colors', scrolled ? 'border-gray-200/50 dark:border-gray-700/50 text-muted-foreground' : 'border-white/10 text-white/70')}>
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
          <span>{t.hero.searchPlaceholder}</span>
          <div className="flex items-center gap-3">
            <Link href="/tedarikciler" className="hover:text-primary">{t.nav.becomeSupplier}</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/giris" className="hover:text-primary">{t.nav.signIn}</Link>
            <Link href="/kayit" className="hover:text-primary">{t.nav.signUp}</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className={cn('font-display font-bold text-lg hidden sm:block transition-colors', scrolled ? 'text-foreground' : 'text-white')}>
              Mobilya<span className="text-amber-500">Pazar</span>
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input type="text" placeholder={t.hero.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className={cn('w-full h-11 pl-4 pr-12 rounded-xl border-2 transition-all', scrolled ? 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:border-primary' : 'bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white/40')} />
              <button className={cn('absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg', scrolled ? 'hover:bg-gray-100 text-muted-foreground' : 'hover:bg-white/10 text-white')}>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>


          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden lg:relative lg:block" onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)}>
              <Button variant="ghost" size="sm" className={cn('gap-1', !scrolled && 'text-white hover:bg-white/15')}>
                {t.nav.categories} <ChevronDown className="w-3.5 h-3.5" />
              </Button>
              <AnimatePresence>
                {showCategories && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border p-2">
                    {categories.map(cat => (
                      <Link key={cat.key} href={cat.href} className="block px-3 py-2 rounded-lg text-sm hover:bg-primary/10 hover:text-primary">
                        {(t.categories as any)[cat.key] ?? cat.key}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button variant="ghost" size="sm" className={cn(!scrolled && 'text-white hover:bg-white/15')}>
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleLang} className={cn('gap-1.5', !scrolled && 'text-white hover:bg-white/15')}>
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">{locale === 'tr' ? 'EN' : 'TR'}</span>
            </Button>
            <Link href="/giris" className="hidden sm:block">
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md">
                <User className="w-3.5 h-3.5 mr-1.5" /> {t.auth.signIn}
              </Button>
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={cn('lg:hidden p-2 rounded-lg', scrolled ? 'hover:bg-muted' : 'text-white hover:bg-white/15')}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t shadow-lg">
            <nav className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-1">
              <div className="relative mb-3">
                <Input type="text" placeholder={t.hero.searchPlaceholder} className="w-full pl-4 pr-12" />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <Link href="/" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary">{t.nav.home}</Link>
              <Link href="/urunler" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary">{t.nav.products}</Link>
              <Link href="/tedarikciler" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary">{t.nav.suppliers}</Link>
              <Link href="/teklif-iste" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary">{t.nav.rfq}</Link>
              <div className="border-t my-2" />
              <Link href="/giris" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary">{t.nav.signIn}</Link>
              <Link href="/kayit" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">{t.nav.signUp}</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
