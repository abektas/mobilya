'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Giris basarisiz'); return }
      document.cookie = 'token=' + data.token + '; path=/; max-age=604800; SameSite=Lax'
      const role = data.user?.role || ''
      if (role === 'admin') router.push('/admin')
      else if (role === 'seller') router.push('/satici/panel')
      else router.push('/alici/panel')
    } catch { setError('Sunucuya baglanilamadi') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-bold text-2xl text-[#1F2937]">Mobilya<span className="text-[#F97316]">Pazar</span></span>
          </Link>
        </div>
        <Card className="shadow-card border-0 rounded-modal">
          <CardHeader className="text-center pb-2 pt-8">
            <CardTitle className="text-h2 font-bold text-[#1F2937]">Giris Yap</CardTitle>
            <CardDescription className="text-[#6B7280] text-body mt-2">Hesabiniza giris yaparak devam edin</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="p-4 rounded-[12px] bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
              <div><label className="text-sm font-medium text-[#1F2937]">E-posta Adresi</label>
                <Input type="email" placeholder="ornek@email.com" value={email} onChange={e=>setEmail(e.target.value)} required className="h-12 rounded-input" />
              </div>
              <div><label className="text-sm font-medium text-[#1F2937]">Sifre</label>
                <div className="relative">
                  <Input type={showPassword?'text':'password'} placeholder="......" value={password} onChange={e=>setPassword(e.target.value)} required className="h-12 rounded-input pr-12" />
                  <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937]">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#6B7280] cursor-pointer">
                  <input type="checkbox" className="rounded border-[#D1D5DB] text-[#1F4E5F] focus:ring-[#1F4E5F]" />
                  Beni hatirla
                </label>
                <Link href="/sifre-unuttum" className="text-sm text-[#1F4E5F] hover:underline font-medium">Sifremi Unuttum</Link>
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 rounded-button bg-cta-gradient text-white border-0 font-semibold shadow-md">
                {loading ? 'Giris yapiliyor...' : <span className="flex items-center justify-center gap-2"><LogIn className="w-5 h-5" /> Giris Yap</span>}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-[#6B7280]">Hesabiniz yok mu? <Link href="/kayit" className="text-[#1F4E5F] hover:underline font-semibold">Kayit Ol <ArrowRight className="w-3.5 h-3.5 inline" /></Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
