'use client'

import { useLocale } from '@/lib/locale-context'
import { ChevronRight, Shield, Clock, Package, Globe, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductGallery } from '@/components/product/product-gallery'
import { SupplierCard } from '@/components/product/supplier-card'
import { ProductTabs } from '@/components/product/product-tabs'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function ProductDetailPage() {
  const { locale, t } = useLocale()

  return (
    <main className="min-h-screen bg-[#F8F7F5]">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB] pt-24 sm:pt-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#1F4E5F]">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/urunler" className="hover:text-[#1F4E5F]">Mobilya</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/urunler?kategori=oturma-odasi" className="hover:text-[#1F4E5F]">Oturma Odasi</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1F2937] font-medium">Modern Kose Koltuk Takimi</span>
          </nav>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] p-4 sm:hidden">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="flex-1 rounded-button"><Check className="w-4 h-4 mr-1" /> Favori</Button>
          <Button variant="outline" size="sm" className="flex-1 rounded-button">Mesaj</Button>
          <Button variant="cta" size="sm" className="flex-[2] rounded-button shadow-md">Teklif Al</Button>
        </div>
      </div>

      {/* Product Hero - 3 Column Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Gallery */}
          <div className="lg:col-span-5"><ProductGallery /></div>

          {/* Center: Product Info */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success" className="text-caption px-3 py-1">Stokta</Badge>
                  <Badge variant="warning" className="text-caption px-3 py-1">Premium</Badge>
                </div>
                <h1 className="text-h1 font-bold text-[#1F2937] leading-tight mb-2">Modern Kose Koltuk Takimi</h1>
                <p className="text-sm text-[#6B7280]">Urun Kodu: MK-2024-001</p>
              </div>
              <div className="p-5 rounded-[12px] bg-[#F8F7F5] border border-[#E5E7EB]">
                <p className="text-caption text-[#6B7280] mb-1">Baslangic Fiyati</p>
                <p className="text-h1 font-bold text-[#1F4E5F]">25.000 <span className="text-h3">₺</span></p>
                <p className="text-sm text-[#6B7280] mt-1">MOQ: 1 Adet • Stok: 150 Adet</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{icon: Package, label:'MOQ', value:'1 Adet'},{icon: Clock, label:'Teslim', value:'25 Gun'},{icon: Shield, label:'Garanti', value:'2 Yil'},{icon: Globe, label:'Ihracat', value:'42 Ulke'}].map(info => {
                  const Icon = info.icon
                  return (
                    <div key={info.label} className="text-center p-3 rounded-[10px] bg-white border border-[#E5E7EB]">
                      <Icon className="w-5 h-5 text-[#1F4E5F] mx-auto mb-1.5" />
                      <p className="text-caption text-[#6B7280]">{info.label}</p>
                      <p className="text-sm font-semibold text-[#1F2937]">{info.value}</p>
                    </div>
                  )
                })}
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-[#1F2937]">Temel Ozellikler</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[['Malzeme','Polyester+Ahsap'],['Boyut','280x180x85cm'],['Renk','Antrasit,Bej'],['Kumas','Linens'],['Kapasite','4 Kisi'],['Uretim','500/Ay']].map(([l,v]) => (
                    <div key={l} className="flex justify-between py-2 px-3 rounded-[10px] bg-white border border-[#E5E7EB]">
                      <span className="text-sm text-[#6B7280]">{l}</span>
                      <span className="text-sm font-medium text-[#1F2937]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Supplier Card */}
          <div className="lg:col-span-3"><SupplierCard /></div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12"><ProductTabs /></div>

        {/* Related Products */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-caption font-semibold text-[#F97316] uppercase tracking-wider">Benzer Urunler</span>
              <h2 className="text-h2 font-bold text-[#1F2937] mt-1">Ayni Koleksiyon</h2>
            </div>
            <Link href="/urunler"><Button variant="outline" size="sm">Tumunu Gor</Button></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-[12px] shadow-card overflow-hidden group hover:shadow-card-hover transition-all">
                <div className="aspect-square bg-[#F3F4F6] flex items-center justify-center text-4xl">🪑</div>
                <div className="p-4">
                  <p className="text-sm font-medium text-[#1F2937]">Modern Koltuk Takimi</p>
                  <p className="text-lg font-bold text-[#1F4E5F] mt-1">18.500 ₺</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

