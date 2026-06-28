'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Search, FileText, ShoppingCart, Users,
  Truck, Wallet, MessageSquare, BarChart3, User,
  ChevronLeft, Menu, X, Star, LogOut,
} from 'lucide-react'

const menuItems = [
  { section: 'Menu', items: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/alici/panel' },
    { icon: Search, label: 'Urun Kesfet', href: '/urunler' },
    { icon: Star, label: 'Favorilerim', href: '/alici/panel/favoriler' },
  ]},
  { section: 'RFQ', items: [
    { icon: FileText, label: 'Yeni RFQ', href: '/alici/panel/rfq/yeni' },
    { icon: FileText, label: 'Aktif RFQlar', href: '/alici/panel/rfq?status=active' },
    { icon: FileText, label: 'Gelen Teklifler', href: '/alici/panel/rfq?status=offers' },
  ]},
  { section: 'Siparisler', items: [
    { icon: ShoppingCart, label: 'Aktif Siparisler', href: '/alici/panel/siparisler?status=active' },
    { icon: ShoppingCart, label: 'Tamamlanan', href: '/alici/panel/siparisler?status=completed' },
    { icon: ShoppingCart, label: 'Iadeler', href: '/alici/panel/siparisler?status=returns' },
  ]},
  { section: 'Tedarikciler', items: [
    { icon: Users, label: 'Tedarikci Bul', href: '/tedarikciler' },
    { icon: Users, label: 'Onaylilar', href: '/alici/panel/tedarikciler/approved' },
    { icon: Users, label: 'Kaydedilenler', href: '/alici/panel/tedarikciler/saved' },
  ]},
  { section: 'Lojistik', items: [
    { icon: Truck, label: 'Kargo Takip', href: '/alici/panel/kargo' },
    { icon: Truck, label: 'Belgeler', href: '/alici/panel/kargo/belgeler' },
  ]},
  { section: 'Finans', items: [
    { icon: Wallet, label: 'Odeme Bilgileri', href: '/alici/panel/finans/odemeler' },
    { icon: Wallet, label: 'Faturalar', href: '/alici/panel/finans/faturalar' },
  ]},
  { section: 'Hesap', items: [
    { icon: User, label: 'Profil', href: '/alici/panel/profil' },
    { icon: MessageSquare, label: 'Mesajlar', href: '/alici/panel/mesajlar' },
    { icon: BarChart3, label: 'Raporlar', href: '/alici/panel/raporlar' },
  ]},
]

export function BuyerSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E5E7EB]">
      <div className="flex items-center justify-between px-4 h-16 shrink-0 border-b border-[#E5E7EB]">
        <Link href="/alici/panel" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1F4E5F] flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          {!collapsed && <span className="font-semibold text-[#1F2937] text-sm">Alici Panel</span>}
        </Link>
        <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false) }}
          className="text-[#6B7280] hover:text-[#1F2937] lg:hidden"><X className="w-5 h-5" /></button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menuItems.map(section => (
          <div key={section.section}>
            {!collapsed && <p className="text-caption text-[#6B7280] font-semibold uppercase tracking-wider px-3 mb-2">{section.section}</p>}
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/alici/panel' && item.href !== '/urunler' && item.href !== '/tedarikciler' && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href}
                    className={cn('flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all',
                      isActive ? 'bg-[#1F4E5F]/10 text-[#1F4E5F]' : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1F2937]'
                    )}>
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-[#E5E7EB]">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1F2937]">
          <LogOut className="w-5 h-5" />{!collapsed && <span>Siteye Don</span>}
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <button onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden p-2.5 rounded-[10px] bg-white text-[#1F2937] shadow-lg border border-[#E5E7EB]">
        <Menu className="w-5 h-5" />
      </button>
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-screen bg-white transition-all duration-300 flex flex-col border-r border-[#E5E7EB]',
        collapsed ? 'w-16' : 'w-[260px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {sidebarContent}
      </aside>
      <button onClick={() => setCollapsed(!collapsed)}
        className="fixed bottom-6 left-[248px] z-50 hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#6B7280] hover:text-[#1F2937] border border-[#E5E7EB] transition-all"
        style={{ transform: collapsed ? 'translateX(-52px)' : 'none' }}>
        <ChevronLeft className={cn('w-3.5 h-3.5 transition-transform', collapsed && 'rotate-180')} />
      </button>
    </>
  )
}

