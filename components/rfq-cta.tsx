'use client'

import { useLocale } from '@/lib/locale-context'
import { Button } from '@/components/ui/button'
import { FileQuestion, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function RFQCtaSection() {
  const { locale, t } = useLocale()

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cta-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full blur-[60px]" />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-[16px] bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileQuestion className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-h1 font-bold text-white mb-4">
            {t.rfq.title}
          </h2>
          <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            {locale === 'en'
              ? 'Do you have a custom furniture requirement? Submit your request and get quotes from multiple suppliers.'
              : 'Ozel bir mobilya ihtiyaciniz mi var? Talebinizi olusturun, birden fazla tedarikciden teklif alin.'
            }
          </p>
          <Link href="/teklif-iste">
            <Button size="xl" className="bg-white text-[#F97316] hover:bg-gray-100 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all px-10">
              {t.rfq.submit}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
