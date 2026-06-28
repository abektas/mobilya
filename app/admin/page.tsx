'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, CheckCircle, XCircle, Users, FolderTree, FileText, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AdminPage() {
  const router = useRouter()
  const [verifications, setVerifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const getToken = () => document.cookie.split('; ').find(r=>r.startsWith('token='))?.split('=')[1]

  useEffect(() => { fetchVerifications() }, [])

  const fetchVerifications = async () => {
    try {
      const res = await fetch('/api/admin/tedarikci-dogrulama', { headers: { Authorization: `Bearer ${getToken()}` } })
      const d = await res.json()
      if (d.verifications) setVerifications(d.verifications)
    } catch {}
    setLoading(false)
  }

  const handleVerification = async (id: string, status: string) => {
    await fetch('/api/admin/tedarikci-dogrulama', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ id, status }),
    })
    fetchVerifications()
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-[#1B2430] min-h-screen p-4">
          <div className="mb-8"><h1 className="font-bold text-white text-lg">Admin Panel</h1><p className="text-sm text-white/50">Yonetim</p></div>
          <nav className="space-y-1">
            {[
              { icon: Shield, label: 'Tedarikci Dogrulama', href: '/admin', active: true },
              { icon: Users, label: 'Kullanicilar', href: '/admin/kullanicilar' },
              { icon: FolderTree, label: 'Kategoriler', href: '/admin/kategoriler' },
              { icon: FileText, label: 'Site Icerigi', href: '/admin/icerik' },
            ].map(item => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}
                  className={cn('flex items-center gap-3 px-4 py-3 rounded-[10px] text-sm font-medium transition-all',
                    item.active ? 'bg-[#F97316]/20 text-[#F97316]' : 'text-white/60 hover:bg-white/10 hover:text-white'
                  )}>
                  <Icon className="w-5 h-5" />{item.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-[10px] text-sm text-white/40 hover:text-white">Siteye Don</Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 p-8">
          <h1 className="text-h2 font-bold text-[#1F2937] mb-6">Tedarikci Dogrulama</h1>

          {loading ? <div className="text-center py-12 text-[#6B7280]">Yukleniyor...</div>
          : verifications.length === 0 ? (
            <div className="bg-white rounded-[12px] shadow-card p-12 text-center">
              <Shield className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" />
              <p className="text-[#6B7280]">Bekleyen dogrulama basvurusu yok</p>
            </div>
          ) : (
            <div className="space-y-4">
              {verifications.map(v => (
                <div key={v.id} className="bg-white rounded-[12px] shadow-card p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-[10px] bg-[#1F4E5F]/10 flex items-center justify-center">
                          <span className="font-semibold text-[#1F4E5F]">{(v.user?.companyName||v.user?.name||'?')[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">{v.user?.companyName || v.user?.name}</p>
                          <p className="text-sm text-[#6B7280]">{v.user?.email} • {v.user?.city}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-[#6B7280]">
                        {v.taxNumber && <span>Vergi No: {v.taxNumber}</span>}
                        {v.tradeRegistryNumber && <span>Ticaret Sicil: {v.tradeRegistryNumber}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {v.status === 'PENDING' && (
                        <>
                          <Button variant="brand" size="sm" onClick={() => handleVerification(v.id, 'APPROVED')}>
                            <CheckCircle className="w-4 h-4 mr-1" /> Onayla
                          </Button>
                          <Button variant="secondary" size="sm" onClick={() => handleVerification(v.id, 'REJECTED')}>
                            <XCircle className="w-4 h-4 mr-1" /> Reddet
                          </Button>
                        </>
                      )}
                      <span className={cn('px-3 py-1 rounded-full text-caption font-medium',
                        v.status==='APPROVED'?'bg-[#22C55E]/10 text-[#22C55E]':v.status==='REJECTED'?'bg-[#EF4444]/10 text-[#EF4444]':'bg-[#F59E0B]/10 text-[#F59E0B]'
                      )}>
                        {v.status==='APPROVED'?'Onaylandi':v.status==='REJECTED'?'Reddedildi':'Beklemede'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
