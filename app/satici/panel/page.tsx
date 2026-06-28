'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Eye, 
  Percent, Bell, Plus, ChevronRight,
  AlertCircle, Star, Users, BarChart3, FileText, Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const kpiCards = [
  { title: 'Toplam Gelir', value: '₺285.500', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'stat-order' },
  { title: 'Toplam Siparis', value: '1.247', change: '+8.3%', trend: 'up', icon: ShoppingCart, color: 'stat-quote' },
  { title: 'Donusum Orani', value: '%4.8', change: '+2.1%', trend: 'up', icon: Percent, color: 'stat-message' },
  { title: 'Urun Goruntulenme', value: '45.2K', change: '-3.2%', trend: 'down', icon: Eye, color: 'stat-visitor' },
  { title: 'Ortalama Siparis', value: '₺4.280', change: '+5.7%', trend: 'up', icon: TrendingUp, color: 'stat-order' },
  { title: 'Iade Orani', value: '%1.2', change: '-0.3%', trend: 'down', icon: TrendingDown, color: 'stat-quote' },
]

const recentOrders = [
  { id: '#SIP-2024-001', customer: 'Ahmet Yilmaz', status: 'hazirlaniyor', amount: '₺12.500', items: 3, date: '2 saat once' },
  { id: '#SIP-2024-002', customer: 'Ayse Demir', status: 'tamamlandi', amount: '₺8.200', items: 1, date: '5 saat once' },
  { id: '#SIP-2024-003', customer: 'Mehmet Kaya', status: 'yeni', amount: '₺24.000', items: 5, date: '1 gun once' },
  { id: '#SIP-2024-004', customer: 'Zeynep Celik', status: 'kargoda', amount: '₺6.800', items: 2, date: '1 gun once' },
  { id: '#SIP-2024-005', customer: 'Ali Yildiz', status: 'yeni', amount: '₺15.300', items: 4, date: '2 gun once' },
]

const statusColors: Record<string, string> = {
  'yeni': 'bg-[#3B82F6]', 'hazirlaniyor': 'bg-[#F59E0B]', 'kargoda': 'bg-[#8B5CF6]', 'tamamlandi': 'bg-[#22C55E]',
}

const tasks = [
  { icon: AlertCircle, text: 'Firma profilinizi tamamlayin', action: 'Tamamla', color: 'text-[#F59E0B]' },
  { icon: FileText, text: 'Urun katalogunuzu yukleyin', action: 'Yukle', color: 'text-[#3B82F6]' },
  { icon: Star, text: 'Sertifikalarinizi ekleyin', action: 'Ekle', color: 'text-[#8B5CF6]' },
  { icon: Bell, text: '3 yeni teklif talebi var', action: 'Goruntule', color: 'text-[#22C55E]' },
]

export default function SellerDashboardPage() {
  const [period, setPeriod] = useState('7')

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Sidebar />
      <div className="lg:ml-[260px] transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] h-16">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            <div className="hidden sm:block relative max-w-md w-full">
              <Input placeholder="Ara..." className="h-10 pl-10 pr-4 rounded-button bg-[#F8F7F5] border-0 text-sm" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="relative p-2.5 rounded-[10px] hover:bg-[#F3F4F6]">
                <Bell className="w-5 h-5 text-[#6B7280]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
              </button>
              <button className="relative p-2.5 rounded-[10px] hover:bg-[#F3F4F6]">
                <Users className="w-5 h-5 text-[#6B7280]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#22C55E]" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-[10px] bg-[#1F4E5F] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">MY</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-[#1F2937]">Mobilya Sanayi</p>
                  <p className="text-caption text-[#6B7280]">Premium Uye</p>
                </div>
              </div>
            </div>
          </div>
        </header>


          {/* Recent Orders */}
          <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="font-semibold text-[#1F2937]">Son Siparisler</h3>
              <Button variant="ghost" size="sm" className="text-sm">Tumunu Gor <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-t border-[#E5E7EB] bg-[#F9FAFB]">
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Siparis</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Musteri</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Durum</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Tutar</th>
                    <th className="text-left px-6 py-3 text-caption font-semibold text-[#6B7280] uppercase">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-t border-[#E5E7EB] hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4 text-sm font-medium text-[#1F4E5F]">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-[#1F2937]">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-medium text-white', statusColors[order.status])}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />{order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#1F2937]">{order.amount}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tasks & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[12px] shadow-card p-6">
              <h3 className="font-semibold text-[#1F2937] mb-4">Yapilacaklar</h3>
              <div className="space-y-3">
                {tasks.map((task, i) => {
                  const Icon = task.icon
                  return (
                    <div key={i} className="flex items-center justify-between p-4 rounded-[10px] bg-[#F8F7F5] hover:bg-[#F3F4F6]">
                      <div className="flex items-center gap-3">
                        <Icon className={cn('w-5 h-5 shrink-0', task.color)} />
                        <span className="text-sm text-[#1F2937]">{task.text}</span>
                      </div>
                      <Button variant="brand" size="sm" className="text-caption">{task.action}</Button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-white rounded-[12px] shadow-card p-6">
              <h3 className="font-semibold text-[#1F2937] mb-4">Hizli Aksiyonlar</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{icon:Plus,label:'Urun Ekle',color:'bg-[#1F4E5F]/10 text-[#1F4E5F]'},{icon:Users,label:'Musteri Ara',color:'bg-[#F97316]/10 text-[#F97316]'},{icon:FileText,label:'Rapor Al',color:'bg-[#22C55E]/10 text-[#22C55E]'},{icon:Bell,label:'Bildirimler',color:'bg-[#8B5CF6]/10 text-[#8B5CF6]'}].map(action => {
                  const Icon = action.icon
                  return (
                    <button key={action.label} className={cn('flex items-center gap-3 p-4 rounded-[10px] transition-all hover:shadow-sm', action.color)}>
                      <Icon className="w-5 h-5" /><span className="text-sm font-medium">{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
