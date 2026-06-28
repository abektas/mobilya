'use client'
import { useState } from 'react'
import { Star, Shield, Phone, MessageSquare, Heart, Clock, MapPin, Check, Globe, Users, Package, Award, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SupplierCardProps { supplier?: { id?: string; name?: string; companyName?: string; city?: string; verified?: boolean; avgRating?: number; reviewCount?: number; completedOrders?: number; responseTime?: string; founded?: number; employeeCount?: number } }

export function SupplierCard({ supplier }: SupplierCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const s = supplier || { companyName:'Mobilya Sanayi A.S.', city:'Istanbul', verified:true, avgRating:4.9, reviewCount:128, completedOrders:342, responseTime:'< 2h', founded:2005, employeeCount:'50-100' }

  return (
    <div className="space-y-4">
      <div className="sticky top-28 space-y-4">
        <Card className="border-0 shadow-card p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-[12px] bg-[#1F4E5F]/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-[#1F4E5F]">{(s.companyName||'M')[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#1F2937] truncate">{s.companyName}</h3>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-sm font-medium text-[#1F2937]">{s.avgRating}</span>
                <span className="text-sm text-[#6B7280]">({s.reviewCount} yorum)</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {s.verified && <Badge variant="success" className="text-caption px-2 py-0.5"><Shield className="w-3 h-3 mr-1" /> Dogrulanmis</Badge>}
                <Badge variant="warning" className="text-caption px-2 py-0.5">Premium</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {s.city && <div className="flex items-center gap-3 text-sm text-[#6B7280]"><MapPin className="w-4 h-4 shrink-0" /><span>{s.city}</span></div>}
            {s.founded && <div className="flex items-center gap-3 text-sm text-[#6B7280]"><Clock className="w-4 h-4 shrink-0" /><span>Kurulus: {s.founded}</span></div>}
            {s.employeeCount && <div className="flex items-center gap-3 text-sm text-[#6B7280]"><Users className="w-4 h-4 shrink-0" /><span>{s.employeeCount} Calisan</span></div>}
            {s.completedOrders !== undefined && <div className="flex items-center gap-3 text-sm text-[#6B7280]"><Award className="w-4 h-4 shrink-0" /><span>{s.completedOrders} Tamamlanan Siparis</span></div>}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-[10px] bg-[#F8F7F5]"><p className="text-lg font-bold text-[#1F4E5F]">{s.responseTime||'<2h'}</p><p className="text-caption text-[#6B7280]">Yanit Suresi</p></div>
            <div className="text-center p-3 rounded-[10px] bg-[#F8F7F5]"><p className="text-lg font-bold text-[#22C55E]">%{Math.min(100,s.reviewCount||98)}</p><p className="text-caption text-[#6B7280]">Memnuniyet</p></div>
            <div className="text-center p-3 rounded-[10px] bg-[#F8F7F5]"><p className="text-lg font-bold text-[#F97316]">{s.completedOrders||150}+</p><p className="text-caption text-[#6B7280]">Basariyla Teslim</p></div>
          </div>

          <div className="space-y-3">
            <Button variant="cta" size="lg" className="w-full rounded-button"><Package className="w-5 h-5 mr-2" /> Teklif Al</Button>
            <Button variant="outline" size="lg" className="w-full rounded-button"><MessageSquare className="w-5 h-5 mr-2" /> Mesaj Gonder</Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" size="sm" className="rounded-button"><Phone className="w-4 h-4 mr-1.5" /> Ara</Button>
              <Button variant="secondary" size="sm" onClick={()=>setIsFavorited(!isFavorited)}
                className={cn('rounded-button', isFavorited&&'text-red-500 border-red-200')}>
                <Heart className={cn('w-4 h-4 mr-1.5', isFavorited&&'fill-current')} /> {isFavorited?'Favori':'Favori'}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-0 shadow-card p-5">
          <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Guven Rozetleri</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon:Shield, label:s.verified?'Dogrulanmis Tedarikci':'Onay Bekliyor', color:s.verified?'text-[#22C55E]':'text-[#F59E0B]' },
              { icon:Check, label:'Yerinde Dogrulandi', color:'text-[#22C55E]' },
              { icon:TrendingUp, label:`${s.completedOrders||150}+ Basarili Teslimat`, color:'text-[#1F4E5F]' },
              { icon:Globe, label:'Guvenli Iletisim', color:'text-[#3B82F6]' },
            ].map(b => { const Icon=b.icon; return (<div key={b.label} className="flex items-center gap-2 text-sm text-[#6B7280]"><Icon className={cn('w-4 h-4 shrink-0',b.color)} /><span>{b.label}</span></div>) })}
          </div>
        </Card>
      </div>
    </div>
  )
}
