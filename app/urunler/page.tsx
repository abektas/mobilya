'use client'
import { useState } from 'react'
import { useLocale } from '@/lib/locale-context'
import { motion } from 'framer-motion'
import { Grid3X3, List, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard, ProductListCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

const categories = [
  { id:'all', nameTr:'Tum Kategoriler' }, { id:'oturma-odasi', nameTr:'Oturma Odasi' },
  { id:'yatak-odasi', nameTr:'Yatak Odasi' }, { id:'yemek-odasi', nameTr:'Yemek Odasi' },
]

const sampleProducts = Array.from({ length: 8 }, (_, i) => ({
  id: i+1, nameTr: ['Modern Kose Koltuk','Luks Yatak Odasi','Ergonomik Ofis Koltugu','Yemek Odasi Seti','Bahce Sezlong','Cocuk Odasi','Mutfak Dolabi','Banyo Seti'][i],
  price: [25000,45000,3500,18500,8500,12000,22000,6500][i],
  rating: [4.8,4.9,4.7,4.6,4.5,4.8,4.4,4.3][i],
  reviews: [124,89,256,67,43,92,55,38][i],
  supplier: ['Mobilya A.S.','Dream Mobilya','Ofis Dunyasi','Ahsap Evi','Bahce Mobilya','Cocuk Dunyasi','Mutfak Plus','La Vida'][i],
  city: ['Istanbul','Bursa','Ankara','Kayseri','Antalya','Izmir','Konya','Adana'][i],
  verified: i%3!==0, minOrder: [1,1,10,1,5,1,2,1][i],
  slug: `urun-${i+1}`,
}))

export default function ProductsPage() {
  const { locale, t } = useLocale()
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <main className="min-h-screen bg-[#F8F7F5]">
      <Header />
      <div className="bg-white border-b border-[#E5E7EB] pt-24 sm:pt-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex sm:items-center justify-between gap-4">
            <h1 className="text-h2 font-bold text-[#1F2937]">{t.products.title}</h1>
            <div className="flex items-center border border-[#E5E7EB] rounded-button overflow-hidden">
              <button onClick={()=>setViewMode('grid')} className={cn('p-2.5', viewMode==='grid'?'bg-[#1F4E5F] text-white':'bg-white')}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={()=>setViewMode('list')} className={cn('p-2.5', viewMode==='list'?'bg-[#1F4E5F] text-white':'bg-white')}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <aside className="hidden sm:block w-[280px] shrink-0">
            <div className="sticky top-28 space-y-6 bg-white rounded-[12px] shadow-card p-5">
              <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Kategoriler</h3>
              {categories.map(cat => (
                <button key={cat.id} onClick={()=>setSelectedCategory(cat.id)}
                  className={cn('w-full text-left px-3 py-2 rounded-button text-sm', selectedCategory===cat.id?'bg-[#1F4E5F] text-white':'text-[#6B7280] hover:bg-[#F3F4F6]')}>{cat.nameTr}</button>
              ))}
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sampleProducts.map((product, index) => (
                <motion.div key={product.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:index*0.05}}>
                  <ProductCard product={product} locale={locale} t={t} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
