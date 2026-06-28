'use client'

import { useLocale } from '@/lib/locale-context'
import { Phone, Mail, MessageSquare, Facebook, Instagram, Youtube, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Footer() {
  const { locale, t } = useLocale()
  const [year, setYear] = useState(2026)
  useEffect(() => { setYear(new Date().getFullYear()) }, [])

  const footerLinks = {
    quickLinks: [
      { label: t.nav.home, href: '/' },
      { label: t.nav.products, href: '/urunler' },
      { label: t.nav.categories, href: '/kategoriler' },
      { label: t.nav.suppliers, href: '/tedarikciler' },
      { label: t.nav.about, href: '/hakkimizda' },
    ],
    support: [
      { label: t.footer.helpCenter, href: '/yardim' },
      { label: t.footer.faq, href: '/sss' },
      { label: t.nav.rfq, href: '/teklif-iste' },
      { label: t.nav.becomeSupplier, href: '/satici-ol' },
    ],
    legal: [
      { label: t.footer.privacyPolicy, href: '/gizlilik-politikasi' },
      { label: t.footer.termsOfUse, href: '/kullanim-kosullari' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">
                  Mobilya<span className="text-amber-500">Pazar</span>
                </p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">{t.footer.description}</p>
            <div className="flex items-center gap-2">
              <a href="tel:+905053697425" className="p-2 rounded-lg hover:bg-gray-800 transition-colors"><Phone className="w-4 h-4" /></a>
              <a href="mailto:info@mobilyapazar.com" className="p-2 rounded-lg hover:bg-gray-800 transition-colors"><Mail className="w-4 h-4" /></a>
              <a href="https://wa.me/905053697425" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-800 transition-colors"><MessageSquare className="w-4 h-4" /></a>
              <a href="https://facebook.com/mobilyapazaryeri" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-blue-500"><Facebook className="w-4 h-4" /></a>
              <a href="https://instagram.com/mobilyapazaryeri" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-pink-500"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>



          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-amber-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.support}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-amber-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-amber-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@mobilyapazar.com" className="hover:text-amber-400">info@mobilyapazar.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {year} MobilyaPazar.com - {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link href="/gizlilik-politikasi" className="hover:text-amber-400 transition-colors">{t.footer.privacyPolicy}</Link>
            <Link href="/kullanim-kosullari" className="hover:text-amber-400 transition-colors">{t.footer.termsOfUse}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
