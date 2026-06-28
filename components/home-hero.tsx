'use client'

import { useLocale } from '@/lib/locale-context'
import { Search, ArrowRight, Shield, TrendingUp, Package, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function HeroSection() {
  const { locale, t } = useLocale()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-gradient">
      {/* Dekoratif arka plan ogeleri */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#F97316] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#8B5E3C] rounded-full blur-[120px]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          {t.hero.subtitle}
        </div>

        {/* Ana Baslik */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] mb-6 tracking-tight">
          {t.hero.title}
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.hero.description}
        </p>

        {/* Arama Kutusu */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative group">
            <Input
              type="text"
              placeholder={t.hero.searchPlaceholder}
              className="w-full h-16 pl-6 pr-16 rounded-[16px] border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-white/50 text-body focus:border-[#F97316] focus:bg-white/20 transition-all shadow-xl"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3.5 rounded-[12px] bg-[#F97316] hover:bg-[#EA580C] text-white transition-all shadow-lg hover:shadow-xl">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CTA Butonlari */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/urunler">
            <Button size="xl" variant="cta" className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-body px-10">
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/satici-ol">
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 px-10">
              {t.hero.cta2}
            </Button>
          </Link>
        </div>

        {/* Istatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '500+', label: locale === 'en' ? 'Suppliers' : 'Tedarikci', icon: Shield },
            { value: '10.000+', label: locale === 'en' ? 'Products' : 'Urun', icon: Package },
            { value: '50+', label: locale === 'en' ? 'Categories' : 'Kategori', icon: TrendingUp },
            { value: '%98', label: locale === 'en' ? 'Satisfaction' : 'Memnuniyet', icon: Award },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center p-6 rounded-[16px] bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                <Icon className="w-6 h-6 text-[#F97316] mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
