'use client'

import { useState } from 'react'
import { Star, Shield, Phone, MessageSquare, Heart, Clock, MapPin, Check, Globe, Users, Factory, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function SupplierCard() {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div className="space-y-4">
      {/* Sticky Supplier Card */}
      <div className="sticky top-28 space-y-4">
        <Card className="border-0 shadow-card p-6">
          {/* Firma Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-[12px] bg-[#1F4E5F]/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-[#1F4E5F]">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#1F2937] truncate">Mobilya Sanayi A.S.</h3>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" title="Cevrimici" />
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-sm font-medium text-[#1F2937]">4.9</span>
                <span className="text-sm text-[#6B7280]">(128 yorum)</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="success" className="text-caption px-2 py-0.5">
                  <Shield className="w-3 h-3 mr-1" /> Dogrulanmis
                </Badge>
                <Badge variant="warning" className="text-caption px-2 py-0.5">Premium</Badge>
              </div>
            </div>
          </div>

          {/* Firma Detaylari */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Istanbul, Turkiye</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Kurulus: 2005</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
              <Users className="w-4 h-4 shrink-0" />
              <span>50-100 Calisan</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
              <Globe className="w-4 h-4 shrink-0" />
              <span>42 Ulkeye Ihracat</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6B7280]">
              <Package className="w-4 h-4 shrink-0" />
              <span>10.000 m² Fabrika</span>
            </div>
          </div>

          {/* Istatistik Kartlari */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-[10px] bg-[#F8F7F5]">
              <p className="text-lg font-bold text-[#1F4E5F]">&lt; 2h</p>
              <p className="text-caption text-[#6B7280]">Yanit Suresi</p>
            </div>
            <div className="text-center p-3 rounded-[10px] bg-[#F8F7F5]">
              <p className="text-lg font-bold text-[#22C55E]">%98</p>
              <p className="text-caption text-[#6B7280]">Yanit Orani</p>
            </div>
            <div className="text-center p-3 rounded-[10px] bg-[#F8F7F5]">
              <p className="text-lg font-bold text-[#F97316]">150+</p>
              <p className="text-caption text-[#6B7280]">Urun</p>
            </div>
          </div>

          {/* CTA Butonlari */}
          <div className="space-y-3">
            <Button variant="cta" size="lg" className="w-full rounded-button shadow-md hover:shadow-lg">
              <Package className="w-5 h-5 mr-2" />
              Teklif Al
            </Button>
            <Button variant="outline" size="lg" className="w-full rounded-button">
              <MessageSquare className="w-5 h-5 mr-2" />
              Mesaj Gonderr
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" size="sm" className="rounded-button">
                <Phone className="w-4 h-4 mr-1.5" />
                Ara
              </Button>
              <Button variant="secondary" size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className={cn('rounded-button', isFavorited && 'text-red-500 border-red-200')}>
                <Heart className={cn('w-4 h-4 mr-1.5', isFavorited && 'fill-current')} />
                {isFavorited ? 'Favori' : 'Favori'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Trust Badges */}
        <Card className="border-0 shadow-card p-5">
          <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Guven Rozetleri</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Shield, label: 'Gold Supplier', color: 'text-[#F59E0B]' },
              { icon: Check, label: 'Yerinde Dogrulandi', color: 'text-[#22C55E]' },
              { icon: Factory, label: 'Fabrika Denetimi', color: 'text-[#1F4E5F]' },
              { icon: Globe, label: 'Ihracatci', color: 'text-[#3B82F6]' },
            ].map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Icon className={cn('w-4 h-4 shrink-0', badge.color)} />
                  <span>{badge.label}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
