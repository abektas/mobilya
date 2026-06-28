'use client'

import { useLocale } from '@/lib/locale-context'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Sofa, Bed, UtensilsCrossed, Briefcase, 
  Trees, Bath, Baby, Lamp, Shelf 
} from 'lucide-react'

const categories = [
  { key: 'livingRoom', icon: Sofa, color: 'from-amber-500 to-orange-500', href: '/urunler?kategori=oturma-odasi' },
  { key: 'bedroom', icon: Bed, color: 'from-blue-500 to-indigo-500', href: '/urunler?kategori=yatak-odasi' },
  { key: 'diningRoom', icon: UtensilsCrossed, color: 'from-green-500 to-emerald-500', href: '/urunler?kategori=yemek-odasi' },
  { key: 'office', icon: Briefcase, color: 'from-purple-500 to-violet-500', href: '/urunler?kategori=ofis-mobilyalari' },
  { key: 'kitchen', icon: Trees, color: 'from-red-500 to-rose-500', href: '/urunler?kategori=mutfak-mobilyalari' },
  { key: 'garden', icon: Trees, color: 'from-teal-500 to-cyan-500', href: '/urunler?kategori=bahce-mobilyalari' },
  { key: 'bathroom', icon: Bath, color: 'from-sky-500 to-blue-500', href: '/urunler?kategori=banyo-mobilyalari' },
  { key: 'children', icon: Baby, color: 'from-pink-500 to-rose-500', href: '/urunler?kategori=cocuk-mobilyalari' },
  { key: 'lighting', icon: Lamp, color: 'from-yellow-500 to-amber-500', href: '/urunler?kategori=aydinlatma' },
  { key: 'accessories', icon: Shelf, color: 'from-gray-500 to-slate-500', href: '/urunler?kategori=mobilya-aksesuarlari' },
]

export function CategorySection() {
  const { t } = useLocale()

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-caption font-semibold text-[#F97316] uppercase tracking-wider">Kategoriler</span>
          <h2 className="text-h1 font-bold text-[#1F2937] mt-2">{t.categories.title}</h2>
          <p className="text-[#6B7280] text-body mt-1 max-w-2xl mx-auto">{t.categories.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <motion.div key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={cat.href} className="group block">
                  <div className="p-6 rounded-[12px] bg-white border border-[#E5E7EB] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-[12px] bg-[#1F4E5F]/10 flex items-center justify-center mb-4 group-hover:bg-[#1F4E5F]/20 transition-all">
                      <Icon className="w-6 h-6 text-[#1F4E5F]" />
                    </div>
                    <h3 className="font-semibold text-[#1F2937] text-sm sm:text-base group-hover:text-[#1F4E5F] transition-colors">
                      {(t.categories as any)[cat.key] ?? cat.key}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
