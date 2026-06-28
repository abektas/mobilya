'use client'

import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/home-hero'
import { CategorySection } from '@/components/category-section'
import { FeaturedProducts } from '@/components/featured-products'
import { RFQCtaSection } from '@/components/rfq-cta'
import { Footer } from '@/components/layout/footer'

export function HomePageClient() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <RFQCtaSection />
      <Footer />
    </main>
  )
}
