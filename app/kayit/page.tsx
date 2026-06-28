'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, UserPlus, ArrowRight, Building2, User, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<'role' | 'form'>('role')
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', companyName: '', city: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRoleSelect = (selectedRole: 'buyer' | 'seller') => {
    setRole(selectedRole)
    setStep('form')
  }

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Sifreler eslesmiyor')
      return
    }

    if (form.password.length < 6) {
      setError('Sifre en az 6 karakter olmalidir')
      return
    }

    setLoading(true)

    try {
      const body: any = {
        name: form.name,
        email: form.email,

  return (
    <div className="min-h-screen bg-buyer flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-display font-bold text-2xl text-[#1F2937]">
              Mobilya<span className="text-[#F97316]">Pazar</span>
            </span>
          </Link>
        </div>

        <Card className="shadow-card border-0 rounded-modal">
          <CardHeader className="text-center pb-2 pt-8">
            <CardTitle className="text-h2 font-bold text-[#1F2937]">Kayit Ol</CardTitle>
            <CardDescription className="text-[#6B7280] text-body mt-2">
              Hesap turunuzu secin ve bilgilerinizi girin
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {step === 'role' ? (
              <div className="space-y-4">
                <button onClick={() => handleRoleSelect('buyer')}
                  className="w-full p-6 rounded-[12px] border-2 border-[#E5E7EB] hover:border-[#1F4E5F] transition-all text-left group hover:shadow-md bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1F4E5F]/10 flex items-center justify-center group-hover:bg-[#1F4E5F]/20">
                      <User className="w-6 h-6 text-[#1F4E5F]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">Aliciyim</h3>
                      <p className="text-sm text-[#6B7280]">Mobilya satin almak istiyorum</p>
                    </div>
                  </div>
                </button>
                <button onClick={() => handleRoleSelect('seller')}
                  className="w-full p-6 rounded-[12px] border-2 border-[#E5E7EB] hover:border-[#F97316] transition-all text-left group hover:shadow-md bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center group-hover:bg-[#F97316]/20">
                      <Building2 className="w-6 h-6 text-[#F97316]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">Saticiyim</h3>
                      <p className="text-sm text-[#6B7280]">Urunlerimi platformda satmak istiyorum</p>
                    </div>
                  </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="p-4 rounded-[12px] bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}

                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-[#F8F7F5] border border-[#E5E7EB]">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center',
                    role === 'buyer' ? 'bg-[#1F4E5F]' : 'bg-[#F97316]')}>
                    {role === 'buyer' ? <User className="w-4 h-4 text-white" /> : <Building2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-[#1F2937] flex-1">
                    {role === 'buyer' ? 'Alici Hesabi' : 'Satici Hesabi'}
                  </span>
                  <button type="button" onClick={() => setStep('role')} className="text-sm text-[#1F4E5F] hover:underline font-medium">Degistir</button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1F2937]">Ad Soyad</label>
                  <Input placeholder="Ahmet Yilmaz" value={form.name} onChange={(e) => updateField('name', e.target.value)} required
                    className="h-12 rounded-input bg-white border border-[#D1D5DB] focus:border-[#1F4E5F] focus:ring-2 focus:ring-[#1F4E5F]/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1F2937]">E-posta</label>
                  <Input type="email" placeholder="ornek@email.com" value={form.email} onChange={(e) => updateField('email', e.target.value)} required
                    className="h-12 rounded-input bg-white border border-[#D1D5DB] focus:border-[#1F4E5F] focus:ring-2 focus:ring-[#1F4E5F]/20" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1F2937]">Sifre</label>
                  <div className="relative">
                    <Input type={showPassword ? 'text' : 'password'} placeholder="En az 6 karakter"
                      value={form.password} onChange={(e) => updateField('password', e.target.value)} required
                      className="h-12 rounded-input bg-white border border-[#D1D5DB] focus:border-[#1F4E5F] focus:ring-2 focus:ring-[#1F4E5F]/20 pr-12" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937]">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1F2937]">Sifre Tekrar</label>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Sifrenizi tekrar girin"
                    value={form.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} required
                    className="h-12 rounded-input bg-white border border-[#D1D5DB] focus:border-[#1F4E5F] focus:ring-2 focus:ring-[#1F4E5F]/20" />
                </div>

                <Button type="submit" disabled={loading}
                  className="w-full h-12 rounded-button bg-cta-gradient text-white border-0 hover:opacity-90 font-semibold text-body shadow-md">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Kaydediliyor...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Hesap Olustur
                    </span>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

                {role === 'seller' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1F2937]">Firma Adi</label>
                      <Input placeholder="Mobilya Sanayi A.S." value={form.companyName} onChange={(e) => updateField('companyName', e.target.value)} required
                        className="h-12 rounded-input bg-white border border-[#D1D5DB] focus:border-[#1F4E5F] focus:ring-2 focus:ring-[#1F4E5F]/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1F2937]">Sehir</label>
                      <Input placeholder="Istanbul" value={form.city} onChange={(e) => updateField('city', e.target.value)}
                        className="h-12 rounded-input bg-white border border-[#D1D5DB] focus:border-[#1F4E5F] focus:ring-2 focus:ring-[#1F4E5F]/20" />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1F2937]">Telefon</label>
                  <Input type="tel" placeholder="+90 555 000 00 00" value={form.phone} onChange={(e) => updateField('phone', e.target.value)}
                    className="h-12 rounded-input bg-white border border-[#D1D5DB] focus:border-[#1F4E5F] focus:ring-2 focus:ring-[#1F4E5F]/20" />
                </div>

                </button>
                <div className="text-center pt-4">
                  <p className="text-sm text-[#6B7280]">
                    Zaten hesabiniz var mi?{' '}
                    <Link href="/giris" className="text-[#1F4E5F] hover:underline font-semibold">Giris Yap</Link>
                  </p>
                </div>
              </div>

        password: form.password,
        phone: form.phone,
        role,
      }

      if (role === 'seller') {
        body.companyName = form.companyName
        body.city = form.city
      }

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Kayit sirasinda bir hata olustu')
        return
      }

      document.cookie = `token=${data.token}; path=/; max-age=604800; SameSite=Lax`
      setSuccess(true)

      setTimeout(() => {
        router.push(role === 'seller' ? '/satici/panel' : '/')
      }, 1500)
    } catch (err) {
      setError('Sunucuya baglanilamadi')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-buyer flex items-center justify-center p-4">
        <Card className="shadow-card border-0 rounded-modal max-w-md w-full text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#22C55E]" />
          </div>
          <CardTitle className="text-h2 font-bold text-[#1F2937] mb-2">Hesabiniz Olusturuldu!</CardTitle>
          <CardDescription className="text-[#6B7280]">Yonlendiriliyorsunuz...</CardDescription>
        </Card>
      </div>
    )
  }
