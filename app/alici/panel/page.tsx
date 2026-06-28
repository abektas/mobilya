'use client'

import { useState } from 'react'
import { BuyerSidebar } from '@/components/dashboard/buyer-sidebar'
import {
  Wallet, FileText, ShoppingCart, TrendingUp, Star, Truck,
  ChevronRight, Search, Bell, Users, Plus, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const kpiCards = [
  { title: 'Toplam Harcama', value: '₺184.200', change: '+8.3%', icon: Wallet, color: 'bg-[#1F4E5F]' },
  { title: 'Bekleyen Teklif', value: '12', change: '+3 yeni', icon: FileText, color: 'bg-[#F97316]' },
  { title: 'Aktif Siparis', value: '8', change: '2 kargoda', icon: ShoppingCart, color: 'bg-[#3B82F6]' },
  { title: 'Teslimat Basari', value: '%97', change: '+2.1%', icon: Truck, color: 'bg-[#22C55E]' },
  { title: 'Aylik Tasarruf', value: '₺12.400', change: '%15', icon: TrendingUp, color: 'bg-[#8B5CF6]' },
  { title: 'Tedarikci Puani', value: '4.8', change: '45 tedarikci', icon: Star, color: 'bg-[#F59E0B]' },
]

const recentActivities = [
  { supplier:'Mobilya Sanayi A.S.', product:'Modern Kose Koltuk', status:'Teklif Alindi', eta:'3 gun', color:'text-[#22C55E]' },
  { supplier:'Dream Mobilya', product:'Luks Yatak Odasi', status:'Siparis Verildi', eta:'15 gun', color:'text-[#3B82F6]' },
  { supplier:'Ofis Dunyasi', product:'Ergonomik Koltuk', status:'Pazarlik', eta:'-', color:'text-[#F59E0B]' },
  { supplier:'Ahsap Evi', product:'Yemek Odasi Seti', status:'Kargoda', eta:'2 gun', color:'text-[#8B5CF6]' },
]

const recommendations = [
  { text:'3 adet bekleyen teklif talebiniz var', action:'Goruntule', href:'/alici/panel/rfq' },
  { text:'Gecen ay siparis verdiginiz urunleri tekrar siparis edin', action:'Tekrar Siparis', href:'/alici/panel/siparisler' },
  { text:'2 tedarikciden yeni teklif geldi', action:'Karsilastir', href:'/alici/panel/rfq?status=offers' },
  { text:'Firma profilinizi tamamlayin', action:'Tamamla', href:'/alici/panel/profil' },
]


export default function BuyerDashboardPage() {
  const [period, setPeriod] = useState('7')

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <BuyerSidebar />
      <div className="lg:ml-[260px] transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] h-16">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            <div className="hidden sm:block relative max-w-md w-full">
              <Input placeholder="Urun, tedarikci, siparis ara..." className="h-10 pl-10 pr-4 rounded-button bg-[#F8F7F5] border-0 text-sm" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="relative p-2.5 rounded-[10px] hover:bg-[#F3F4F6]">
                <Bell className="w-5 h-5 text-[#6B7280]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
              </button>
              <button className="relative p-2.5 rounded-[10px] hover:bg-[#F3F4F6]">
                <Star className="w-5 h-5 text-[#6B7280]" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-[10px] bg-[#1F4E5F]/10 flex items-center justify-center">
                  <span className="text-[#1F4E5F] font-semibold text-sm">AD</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-[#1F2937]">Ahmet Demir</p>
                  <p className="text-caption text-[#6B7280]">Kurumsal Alici</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-h2 font-bold text-[#1F2937]">Merhaba, Ahmet</h1>
              <p className="text-sm text-[#6B7280] mt-1">Satinalma surecinizi buradan yonetin.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white rounded-button border border-[#E5E7EB] p-1">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiCards.map(kpi => {
              const Icon = kpi.icon
              return (
                <div key={kpi.title} className="bg-white rounded-[12px] shadow-card p-5 hover:shadow-card-hover transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn('w-10 h-10 rounded-[10px] flex items-center justify-center', kpi.color)}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#22C55E]">{kpi.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                  <p className="text-sm text-[#6B7280] mt-1">{kpi.title}</p>
                </div>
              )
            })}
          </div>

          {/* Funnel + Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-[12px] shadow-card p-6">
              <h3 className="font-semibold text-[#1F2937] mb-6">Satinalma Hunisi</h3>
              <div className="space-y-5">
                {[{label:'Teklif Istendi',count:24,pct:100},{label:'Teklif Alindi',count:18,pct:75},{label:'Pazarlikta',count:10,pct:42},{label:'Siparis Verildi',count:8,pct:33},{label:'Teslim Edildi',count:6,pct:25}].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-[#1F2937] font-medium">{item.label}</span>
                    <div className="flex-1 h-3 rounded-full bg-[#F3F4F6]">
                      <div className="h-3 rounded-full bg-[#1F4E5F]" style={{width:`${item.pct}%`}} />
                    </div>
                    <span className="text-sm font-semibold text-[#1F2937] w-16 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[12px] shadow-card p-6">
              <h3 className="font-semibold text-[#1F2937] mb-4">En Cok Siparis Verilen</h3>
          {/* Recent Activity */}
          <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="font-semibold text-[#1F2937]">Son Aktiviteler</h3>
              <Button variant="ghost" size="sm">Tumunu Gor <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-t border-[#E5E7EB] bg-[#F9FAFB]">
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Tedarikci</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Urun</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Durum</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">ETA</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Aksiyon</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((act, i) => (
                    <tr key={i} className="border-t border-[#E5E7EB] hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">{act.supplier}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{act.product}</td>
                      <td className="px-6 py-4">
                        <span className={cn('text-sm font-medium', act.color)}>{act.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{act.eta}</td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="text-[#1F4E5F]">Detay</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-[12px] shadow-card p-6">
            <h3 className="font-semibold text-[#1F2937] mb-4">Onerilen Aksiyonlar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((rec, i) => (
                <Link key={i} href={rec.href}
                  className="p-4 rounded-[10px] bg-[#F8F7F5] hover:bg-[#F3F4F6] transition-colors group">
                  <p className="text-sm text-[#1F2937] mb-3">{rec.text}</p>
                  <span className="text-sm font-medium text-[#1F4E5F] group-hover:underline inline-flex items-center gap-1">
                    {rec.action} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

              <div className="space-y-4">
                {[{name:'Oturma Odasi',amt:'₺82.400',pct:45},{name:'Yatak Odasi',amt:'₺45.200',pct:25},{name:'Mutfak',amt:'₺28.600',pct:16},{name:'Ofis',amt:'₺18.000',pct:10},{name:'Bahce',amt:'₺10.000',pct:4}].map(cat => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <span className="w-24 text-sm text-[#1F2937] font-medium">{cat.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-[#F3F4F6]">
                      <div className="h-2 rounded-full bg-[#F97316]" style={{width:`${cat.pct}%`}} />
                    </div>
                    <span className="text-sm font-semibold text-[#1F2937]">{cat.amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

                {['7','30','90'].map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={cn('px-4 py-2 rounded-[8px] text-sm font-medium transition-all',
                      period === p ? 'bg-[#1F4E5F] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1F2937]'
                    )}>{p} Gun</button>
                ))}
              </div>
              <Link href="/teklif-iste">
                <Button variant="cta" size="sm" className="rounded-button">
                  <Plus className="w-4 h-4 mr-1" /> Yeni RFQ
                </Button>
              </Link>
            </div>
          </div>
