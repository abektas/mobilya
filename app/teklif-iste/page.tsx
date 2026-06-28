'use client'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function RFQPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F5]">
      <Header />
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-h1 font-bold text-[#1F2937] mb-4">Teklif Iste</h1>
          <p className="text-[#6B7280] mb-8">Ihtiyacinizi belirtin, uygun tedarikcilerden teklif alin.</p>
          <Link href="/urunler"><Button variant="cta" size="lg">Urunlere Goz At</Button></Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
