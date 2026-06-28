'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/locale-context'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Grid3X3, List, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard, ProductListCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', nameTr: 'Tum Kategoriler', nameEn: 'All Categories' },
  { id: 'oturma-odasi', nameTr: 'Oturma Odasi', nameEn: 'Living Room' },
  { id: 'yatak-odasi', nameTr: 'Yatak Odasi', nameEn: 'Bedroom' },
  { id: 'yemek-odasi', nameTr: 'Yemek Odasi', nameEn: 'Dining Room' },
  { id: 'ofis-mobilyalari', nameTr: 'Ofis Mobilyalari', nameEn: 'Office' },
  { id: 'mutfak-mobilyalari', nameTr: 'Mutfak Mobilyalari', nameEn: 'Kitchen' },
  { id: 'bahce-mobilyalari', nameTr: 'Bahce Mobilyalari', nameEn: 'Garden' },
]

const cities = ['Istanbul', 'Bursa', 'Ankara', 'Kayseri', 'Antalya', 'Izmir', 'Konya', 'Adana']
const materials = ['Ahsap', 'Metal', 'Kumas', 'Deri', 'Cam', 'Mermer', 'Sunta', 'Celik']

const sampleProducts = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  nameTr: ['Modern Kose Koltuk Takimi', 'Luks Yatak Odasi', 'Ergonomik Ofis Koltugu', 'Yemek Odasi Seti',
            'Bahce Sezlong Takimi', 'Cocuk Odasi Takimi', 'Mutfak Dolabi', 'Banyo Seti',
            'Kitaplik & Raf Sistemi', 'Karyola & Baza', 'Sandalye (6 Adet)', 'Sehpa Seti',
            'Avize & Aydinlatma', 'Konsol & Antre', 'Gardirop Sistemleri', 'Masa Takimi'][i],
  nameEn: ['Modern Corner Sofa', 'Luxury Bedroom', 'Ergonomic Chair', 'Dining Set',
           'Garden Lounger', 'Kids Room', 'Kitchen Cabinet', 'Bathroom Set',
           'Bookshelf', 'Bed Frame', 'Chairs (6)', 'Table Set',
           'Chandelier', 'Console Table', 'Wardrobe', 'Table Set'][i],
  price: [25000, 45000, 3500, 18500, 8500, 12000, 22000, 6500, 4500, 8000, 7500, 3200, 2800, 5500, 15000, 9500][i],
  rating: [4.8, 4.9, 4.7, 4.6, 4.5, 4.8, 4.4, 4.3, 4.6, 4.7, 4.2, 4.5, 4.1, 4.4, 4.6, 4.3][i],
  reviews: [124, 89, 256, 67, 43, 92, 55, 38, 71, 48, 29, 63, 41, 35, 52, 77][i],
  supplier: ['Mobilya A.S.', 'Dream Mobilya', 'Ofis Dunyasi', 'Ahsap Evi',
             'Bahce Mobilya', 'Cocuk Dunyasi', 'Mutfak Plus', 'La Vida',
             'Raf Sistem', 'Yatak Dunyasi', 'Sandalyeci', 'Sehpa Plus',
             'Isik Evi', 'Antre Tasarim', 'Gardiropp', 'Mobilyam'][i],
  city: cities[i % cities.length],
  verified: i % 3 !== 0,
  minOrder: [1, 1, 10, 1, 5, 1, 2, 1, 3, 1, 6, 2, 1, 1, 1, 4][i],
  slug: `urun-${i + 1}`,
}))

export default function ProductsPage() {
  const { locale, t } = useLocale()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <main className="min-h-screen bg-[#F8F7F5]">
      <Header />
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E7EB] pt-24 sm:pt-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-h2 font-bold text-[#1F2937]">{t.products.title}</h1>
              <p className="text-sm text-[#6B7280] mt-1">{sampleProducts.length} sonuc bulundu</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Input placeholder={t.common.search} value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-4 pr-10 rounded-button border border-[#E5E7EB] bg-white text-sm" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="h-10 pl-4 pr-10 rounded-button border border-[#E5E7EB] bg-white text-sm text-[#1F2937] appearance-none cursor-pointer focus:ring-2 focus:ring-[#1F4E5F]/20">
                <option value="newest">{t.products.sortNewest}</option>
                <option value="price-asc">{t.products.sortPriceLow}</option>
                <option value="price-desc">{t.products.sortPriceHigh}</option>
                <option value="rating">{t.products.sortRating}</option>
              </select>
              <div className="hidden sm:flex items-center border border-[#E5E7EB] rounded-button overflow-hidden">
                <button onClick={() => setViewMode('grid')}
                  className={cn('p-2.5 transition-colors', viewMode === 'grid' ? 'bg-[#1F4E5F] text-white' : 'bg-white text-[#6B7280] hover:bg-[#F3F4F6]')}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={cn('p-2.5 transition-colors', viewMode === 'list' ? 'bg-[#1F4E5F] text-white' : 'bg-white text-[#6B7280] hover:bg-[#F3F4F6]')}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden sm:block w-[280px] shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[12px] shadow-card p-5">
                <h3 className="font-semibold text-sm text-[#1F2937] mb-3">{t.nav.categories}</h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                      className={cn('w-full text-left px-3 py-2 rounded-button text-sm transition-colors',
                        selectedCategory === cat.id ? 'bg-[#1F4E5F] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                      )}>{locale === 'tr' ? cat.nameTr : cat.nameEn}</button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[12px] shadow-card p-5">
                <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Sehir</h3>
                <div className="space-y-1">
                  {cities.map(city => (
                    <button key={city} onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
                      className={cn('w-full text-left px-3 py-2 rounded-button text-sm transition-colors',
                        selectedCity === city ? 'bg-[#1F4E5F] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                      )}>{city}</button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[12px] shadow-card p-5">
                <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Fiyat Araligi</h3>
                <div className="flex items-center gap-2">
                  <Input placeholder="Min" value={priceRange.min}
                    onChange={(e) => setPriceRange(p => ({ ...p, min: e.target.value }))}
                    className="h-10 rounded-button text-sm" />
                  <span className="text-[#6B7280]">-</span>
                  <Input placeholder="Max" value={priceRange.max}
                    onChange={(e) => setPriceRange(p => ({ ...p, max: e.target.value }))}
                    className="h-10 rounded-button text-sm" />
                </div>
              </div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {sampleProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <ProductCard product={product} locale={locale} t={t} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sampleProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    <ProductListCard product={product} locale={locale} t={t} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

              <div className="bg-white rounded-[12px] shadow-card p-5">
                <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Malzeme</h3>
                <div className="flex flex-wrap gap-2">
                  {materials.map(m => (
                    <button key={m} onClick={() => setSelectedMaterial(selectedMaterial === m ? '' : m)}
                      className={cn('px-3 py-1.5 rounded-button text-sm border transition-colors',
                        selectedMaterial === m ? 'bg-[#1F4E5F] text-white border-[#1F4E5F]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#1F4E5F]'
                      )}>{m}</button>
                  ))}
                </div>
              </div>

              <Button variant="ghost" className="w-full text-sm"
                onClick={() => { setSelectedCategory('all'); setSelectedCity(''); setSelectedMaterial(''); setPriceRange({ min: '', max: '' }); }}>
                <X className="w-4 h-4 mr-1" /> Filtreleri Temizle
              </Button>
            </div>
          </aside>


  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
