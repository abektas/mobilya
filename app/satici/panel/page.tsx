'use client'
import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { DollarSign, ShoppingCart, Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const kpiCards = [
  { title:'Toplam Gelir', value:'₺285.500', change:'+12.5%', icon:DollarSign, color:'stat-order' },
  { title:'Toplam Siparis', value:'1.247', change:'+8.3%', icon:ShoppingCart, color:'stat-quote' },
]

export default function SellerDashboardPage() {
  const [period, setPeriod] = useState('7')
  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Sidebar />
      <div className="lg:ml-[260px] transition-all duration-300">
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] h-16">
          <div className="flex items-center justify-between h-full px-6">
            <div className="hidden sm:block relative max-w-md"><Input placeholder="Ara..." className="h-10 pl-10 pr-4 rounded-button bg-[#F8F7F5] border-0" /><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" /></div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="p-2.5 rounded-[10px] hover:bg-[#F3F4F6]"><Bell className="w-5 h-5 text-[#6B7280]" /></button>
              <div className="flex items-center gap-3 pl-3 border-l border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-[10px] bg-[#1F4E5F] flex items-center justify-center"><span className="text-white font-semibold text-sm">MY</span></div>
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex sm:items-center justify-between gap-4">
            <h1 className="text-h2 font-bold text-[#1F2937]">Satici Paneli</h1>
            <div className="flex items-center gap-2 bg-white rounded-button border border-[#E5E7EB] p-1">
              {['7','30','90'].map(p => (<button key={p} onClick={()=>setPeriod(p)} className={cn('px-4 py-2 rounded-[8px] text-sm font-medium', period===p?'bg-[#1F4E5F] text-white':'text-[#6B7280]')}>Son {p} Gun</button>))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {kpiCards.map(k => {const I=k.icon; return (<div key={k.title} className="bg-white rounded-[12px] shadow-card p-5"><div className="flex items-start justify-between mb-3"><div className={cn('w-10 h-10 rounded-[10px] flex items-center justify-center',k.color)}><I className="w-5 h-5 text-white" /></div><span className="text-sm font-medium text-[#22C55E]">{k.change}</span></div><p className="text-2xl font-bold text-[#1F2937]">{k.value}</p><p className="text-sm text-[#6B7280] mt-1">{k.title}</p></div>)})}
          </div>
        </div>
      </div>
    </div>
  )
}
