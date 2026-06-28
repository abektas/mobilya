'use client'

import { useLocale } from '@/lib/locale-context'
import { motion } from 'framer-motion'
import { Star, Heart, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const featuredProducts = [
  {
    id: 1,
    nameTr: 'Modern Köşe Koltuk Takımı',
    nameEn: 'Modern Corner Sofa Set',
    price: 25000,
    minOrder: 1,
    rating: 4.8,
    reviews: 124,
    supplier: 'Mobilya A.Ş.',
    city: 'İstanbul',
    verified: true,
    slug: 'modern-kose-koltuk-takimi',
  },
  {
    id: 2,
    nameTr: 'Lüks Yatak Odası Takımı',
    nameEn: 'Luxury Bedroom Set',
    price: 45000,
    minOrder: 1,
    rating: 4.9,
    reviews: 89,
    supplier: 'Dream Mobilya',
    city: 'Bursa',
    verified: true,
    slug: 'luks-yatak-odasi-takimi',
  },
  {
    id: 3,
    nameTr: 'Ergonomik Ofis Koltuğu',
    nameEn: 'Ergonomic Office Chair',
    price: 3500,
    minOrder: 10,
    rating: 4.7,
    reviews: 256,
    supplier: 'Ofis Dünyası',
    city: 'Ankara',
    verified: true,
    slug: 'ergonomik-ofis-koltugu',
  },
  {
    id: 4,
    nameTr: 'Yemek Odası Takımı (6 Kişilik)',

    nameEn: 'Dining Room Set (6 Person)',
    price: 18500,
    minOrder: 1,
    rating: 4.6,
    reviews: 67,
    supplier: 'Ahşap Evi',
    city: 'Kayseri',
    verified: false,
    slug: 'yemek-odasi-takimi',
  },
  {
    id: 5,
    nameTr: 'Bahçe Şezlong Takımı',
    nameEn: 'Garden Lounger Set',
    price: 8500,
    minOrder: 5,
    rating: 4.5,
    reviews: 43,
    supplier: 'Bahçe Mobilya',
    city: 'Antalya',
    verified: true,
    slug: 'bahce-sezlong-takimi',
  },
  {
    id: 6,
    nameTr: 'Çocuk Odası Takımı',
    nameEn: "Children's Room Set",
    price: 12000,
    minOrder: 1,
    rating: 4.8,
    reviews: 92,
    supplier: 'Çocuk Dünyası',
    city: 'İstanbul',
    verified: true,
    slug: 'cocuk-odasi-takimi',
  },
]

export function FeaturedProducts() {
  const { locale, t } = useLocale()

  return (
    <section className="py-16 sm:py-24 bg-[#F8F7F5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-caption font-semibold text-[#F97316] uppercase tracking-wider">Urunler</span>
            <h2 className="text-h1 font-bold text-[#1F2937] mt-2">{t.products.title}</h2>
            <p className="text-[#6B7280] text-body mt-1 max-w-2xl">
              En kaliteli mobilya urunlerini guvenilir tedarikcilerden kesfedin
            </p>
          </div>
          <Link href="/urunler" className="hidden sm:block">
            <Button variant="outline" size="lg">{t.common.viewAll}</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="relative aspect-[4/3] bg-[#F3F4F6] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">
                    🪑
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-[#6B7280] hover:text-red-500" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    {product.verified && (
                      <Badge variant="success" className="text-caption px-3 py-1">
                        <Shield className="w-3 h-3 mr-1" />
                        {t.supplier.verified}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-[#1F2937] leading-tight mb-2 group-hover:text-[#1F4E5F] transition-colors line-clamp-2">
                    <Link href={`/urun/${product.slug}`}>
                      {locale === 'tr' ? product.nameTr : product.nameEn}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-1 text-[#F59E0B] mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-sm font-medium text-[#1F2937]">{product.rating}</span>
                    <span className="text-sm text-[#6B7280]">({product.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
                    <span className="font-medium text-[#1F2937]">{product.supplier}</span>
                    <span>•</span>
                    <span>{product.city}</span>
                  </div>

                  <div className="flex items-end justify-between pt-2 border-t border-[#E5E7EB]">
                    <div>
                      <p className="text-xl font-bold text-[#1F4E5F]">
                        {product.price.toLocaleString('tr-TR')} <span className="text-sm font-medium">₺</span>
                      </p>
                      <p className="text-caption text-[#6B7280] mt-0.5">
                        {t.products.minOrder}: {product.minOrder} adet
                      </p>
                    </div>
                    <Button size="sm" variant="brand">
                      {t.products.requestQuote}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Button variant="outline" size="lg">{t.common.viewAll}</Button>
        </div>
      </div>
    </section>
  )
}
