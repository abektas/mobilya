'use client'

import { Star, Heart, Shield, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export function ProductCard({ product, locale, t }: any) {
  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="relative aspect-[4/3] bg-[#F3F4F6] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-50">🪑</div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-[#6B7280] hover:text-red-500" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          {product.verified && <Badge variant="success" className="text-caption px-3 py-1"><Shield className="w-3 h-3 mr-1" /> Dogrulanmis</Badge>}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mb-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{product.city}</span>
          <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
          <span className="font-medium text-[#1F2937]">{product.supplier}</span>
        </div>
        <h3 className="font-semibold text-[#1F2937] text-sm leading-tight mb-2 line-clamp-2 group-hover:text-[#1F4E5F] transition-colors">
          <Link href={`/urun/${product.slug}`}>{locale === 'tr' ? product.nameTr : product.nameEn}</Link>
        </h3>
        <div className="flex items-center gap-1 text-[#F59E0B] mb-2">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-sm font-medium text-[#1F2937]">{product.rating}</span>
          <span className="text-sm text-[#6B7280]">({product.reviews})</span>
        </div>
        <div className="flex items-end justify-between pt-2 border-t border-[#E5E7EB]">
          <div>
            <p className="text-lg font-bold text-[#1F4E5F]">{product.price.toLocaleString('tr-TR')} <span className="text-sm font-medium">₺</span></p>
            <p className="text-caption text-[#6B7280]">Min: {product.minOrder} adet</p>
          </div>
          <Button size="sm" variant="brand" className="text-sm px-4">{t.products.requestQuote}</Button>
        </div>
      </div>
    </Card>
  )
}

export function ProductListCard({ product, locale, t }: any) {
  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex">
        <div className="w-48 shrink-0 bg-[#F3F4F6] flex items-center justify-center text-4xl">🪑</div>
        <div className="flex-1 p-5 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {product.verified && <Badge variant="success" className="text-caption">Dogrulanmis</Badge>}
              <span className="text-sm text-[#6B7280]">{product.city}</span>
            </div>
            <h3 className="font-semibold text-[#1F2937] mb-1 group-hover:text-[#1F4E5F] transition-colors">
              <Link href={`/urun/${product.slug}`}>{locale === 'tr' ? product.nameTr : product.nameEn}</Link>
            </h3>
            <p className="text-sm text-[#6B7280] mb-2">{product.supplier}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#F59E0B]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium text-[#1F2937]">{product.rating}</span>
                <span className="text-sm text-[#6B7280]">({product.reviews})</span>
              </div>
              <span className="text-sm text-[#6B7280]">Min: {product.minOrder} adet</span>
            </div>
          </div>
          <div className="text-right shrink-0 ml-6">
            <p className="text-2xl font-bold text-[#1F4E5F]">{product.price.toLocaleString('tr-TR')} ₺</p>
            <Button size="sm" variant="brand" className="mt-3">{t.products.requestQuote}</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
