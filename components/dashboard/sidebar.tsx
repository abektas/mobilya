'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Megaphone, Wallet, Settings,
  ChevronLeft, Menu, X, LogOut,
} from 'lucide-react'

const menuItems = [
  { section: 'Menu', items: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/satici/panel' },
  ]},
  { section: 'Urunler', items: [
    { icon: Package, label: 'Tum Urunler', href: '/satici/panel/urunler' },
    { icon: Package, label: 'Urun Ekle', href: '/satici/panel/urunler/ekle' },
    { icon: Package, label: 'Toplu Import', href: '/satici/panel/urunler/import' },
    { icon: Package, label: 'Kategoriler', href: '/satici/panel/kategoriler' },
    { icon: Package, label: 'Taslaklar', href: '/satici/panel/urunler/taslaklar' },
  ]},
  { section: 'Siparisler', items: [
    { icon: ShoppingCart, label: 'Yeni Siparisler', href: '/satici/panel/siparisler?status=new' },
    { icon: ShoppingCart, label: 'Hazirlaniyor', href: '/satici/panel/siparisler?status=processing' },
    { icon: ShoppingCart, label: 'Tamamlanan', href: '/satici/panel/siparisler?status=completed' },
    { icon: ShoppingCart, label: 'Iadeler', href: '/satici/panel/siparisler?status=returns' },
  ]},
  { section: 'Musteriler', items: [
    { icon: Users, label: 'Musteri Listesi', href: '/satici/panel/musteriler' },
    { icon: Users, label: 'Potansiyel', href: '/satici/panel/musteriler/leads' },
  ]},
  { section: 'Analitik', items: [
    { icon: BarChart3, label: 'Satislar', href: '/satici/panel/analitik/satislar' },
    { icon: BarChart3, label: 'Traffic', href: '/satici/panel/analitik/traffic' },
    { icon: BarChart3, label: 'Donusum', href: '/satici/panel/analitik/donusum' },
  ]},
  { section: 'Pazarlama', items: [
    { icon: Megaphone, label: 'Kampanyalar', href: '/satici/panel/pazarlama/kampanyalar' },
    { icon: Megaphone, label: 'Banner', href: '/satici/panel/pazarlama/banner' },
  ]},
  { section: 'Finans', items: [
    { icon: Wallet, label: 'Gelirler', href: '/satici/panel/finans/gelirler' },
    { icon: Wallet, label: 'Faturalar', href: '/satici/panel/finans/faturalar' },
  ]},
  { section: 'Ayarlar', items: [
    { icon: Settings, label: 'Profil', href: '/satici/panel/ayarlar/profil' },
    { icon: Settings, label: 'Kullanicilar', href: '/satici/panel/ayarlar/kullanicilar' },
    { icon: Settings, label: 'Guvenlik', href: '/satici/panel/ayarlar/guvenlik' },
  ]},
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-16 shrink-0 border-b border-white/10">
        <Link href="/satici/panel" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          {!collapsed && <span className="font-semibold text-white text-sm">Satici Panel</span>}
        </Link>
        <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false) }}
          className="text-white/60 hover:text-white lg:hidden"><X className="w-5 h-5" /></button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menuItems.map(section => (
          <div key={section.section}>
            {!collapsed && (
              <p className="text-caption text-white/40 font-semibold uppercase tracking-wider px-3 mb-2">{section.section}</p>
            )}
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/satici/panel' && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all',
                      isActive ? 'bg-[#F97316]/20 text-[#F97316]' : 'text-white/70 hover:bg-white/10 hover:text-white'
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
      <div className="p-3 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Siteye Don</span>}
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {mobileOpen && (<div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />)}
      <button onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden p-2.5 rounded-[10px] bg-sidebar text-white shadow-lg">
        <Menu className="w-5 h-5" />
      </button>
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-screen bg-sidebar transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-[260px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {sidebarContent}
      </aside>
      <button onClick={() => setCollapsed(!collapsed)}
        className="fixed bottom-6 left-[248px] z-50 hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-sidebar text-white/60 hover:text-white border border-white/10 transition-all"
        style={{ transform: collapsed ? 'translateX(-52px)' : 'none' }}>
        <ChevronLeft className={cn('w-3.5 h-3.5 transition-transform', collapsed && 'rotate-180')} />
      </button>
    </>
  )
}

