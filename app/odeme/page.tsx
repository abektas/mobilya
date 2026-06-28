'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, MapPin, FileText, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ fullName:'', phone:'', city:'', district:'', address:'', zipCode:'', notes:'' })

  const getToken = () => document.cookie.split('; ').find(r=>r.startsWith('token='))?.split('=')[1]
  useEffect(() => { fetchCart() }, [])

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', { headers: { Authorization: `Bearer ${getToken()}` } })
      const d = await res.json()
      if (d.cart) setCart(d.cart)
    } catch {}
    setLoading(false)
  }

  const total = cart?.items?.reduce((s: number, i: any) => s + (i.product?.price || 0) * i.quantity, 0) || 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cart?.items?.length) return
    setSubmitting(true)
    try {
      const addr = `${form.address}, ${form.district}/${form.city} ${form.zipCode}`
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          supplierId: cart.items[0]?.product?.supplierId || cart.items[0]?.productId,
          shippingAddress: addr, billingAddress: addr, notes: form.notes,
          items: cart.items.map((i: any) => ({ productId: i.productId, quantity: i.quantity, price: i.product?.price || 0 })),
        }),
      })
      if (res.ok) {
        await fetch('/api/cart?clear=true', { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } })
        setSuccess(true)
        setTimeout(() => router.push('/alici/panel'), 2000)
      }
    } catch {}
    setSubmitting(false)
  }

  if (loading) return <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center text-[#6B7280]">Yukleniyor...</div>

  if (success) return (
    <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center">
      <Card className="max-w-md w-full p-8 text-center shadow-card border-0">
        <CheckCircle className="w-16 h-16 text-[#22C55E] mx-auto mb-4" />
        <h1 className="text-h2 font-bold text-[#1F2937] mb-2">Siparisiniz Alindi!</h1>
        <p className="text-[#6B7280]">Siparisiniz basariyla olusturuldu.</p>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1F2937] mb-6"><ArrowLeft className="w-4 h-4" /> Alisverise Devam Et</Link>
        <h1 className="text-h1 font-bold text-[#1F2937] mb-8">Odeme</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card className="shadow-card border-0 p-6">
              <div className="flex items-center gap-3 mb-6"><MapPin className="w-5 h-5 text-[#1F4E5F]" /><h2 className="font-semibold text-[#1F2937]">Teslimat Adresi</h2></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-[#1F2937]">Ad Soyad</label><Input required value={form.fullName} onChange={e=>setForm(p=>({...p,fullName:e.target.value}))} className="h-12 rounded-input" /></div>
                  <div><label className="text-sm font-medium text-[#1F2937]">Telefon</label><Input required type="tel" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} className="h-12 rounded-input" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-[#1F2937]">Sehir</label><Input required value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} className="h-12 rounded-input" /></div>
                  <div><label className="text-sm font-medium text-[#1F2937]">Ilce</label><Input required value={form.district} onChange={e=>setForm(p=>({...p,district:e.target.value}))} className="h-12 rounded-input" /></div>
                </div>
                <div><label className="text-sm font-medium text-[#1F2937]">Adres</label><textarea required rows={3} value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} className="w-full p-3 rounded-[12px] border border-[#E5E7EB] text-sm resize-none outline-none focus:ring-2 focus:ring-[#1F4E5F]/20" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-[#1F2937]">Posta Kodu</label><Input value={form.zipCode} onChange={e=>setForm(p=>({...p,zipCode:e.target.value}))} className="h-12 rounded-input" /></div>
                  <div><label className="text-sm font-medium text-[#1F2937]">Not</label><Input value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} className="h-12 rounded-input" /></div>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <p className="text-sm text-[#6B7280] mb-4"><FileText className="w-4 h-4 inline mr-1" /> Odeme entegrasyonu (iyzico, PayTR) ayri asamada eklenecek.</p>
                  <Button type="submit" disabled={submitting||!cart?.items?.length} className="w-full h-12 rounded-button bg-cta-gradient text-white border-0 font-semibold shadow-md">
                    {submitting ? 'Isleniyor...' : `Siparisi Onayla (${total.toLocaleString('tr-TR')} ₺)`}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 p-6 sticky top-28">
              <div className="flex items-center gap-3 mb-6"><ShoppingCart className="w-5 h-5 text-[#1F4E5F]" /><h2 className="font-semibold text-[#1F2937]">Siparis Ozeti</h2></div>
              {!cart?.items?.length ? <p className="text-[#6B7280] text-center py-6">Sepetiniz bos</p> : (
                <div className="space-y-4">
                  {cart.items.map((item: any) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center shrink-0">🪑</div>
                      <div className="flex-1"><p className="text-sm font-medium text-[#1F2937] truncate">{item.product?.nameTr||'Urun'}</p><p className="text-sm text-[#6B7280]">{item.quantity} adet</p></div>
                      <p className="text-sm font-semibold text-[#1F2937]">{(item.product?.price*item.quantity).toLocaleString('tr-TR')} ₺</p>
                    </div>
                  ))}
                  <div className="border-t border-[#E5E7EB] pt-4">
                    <div className="flex items-center justify-between text-sm text-[#6B7280]"><span>Ara Toplam</span><span>{total.toLocaleString('tr-TR')} ₺</span></div>
                    <div className="flex items-center justify-between text-sm text-[#6B7280] mt-2"><span>Kargo</span><span>Ucretsiz</span></div>
                    <div className="flex items-center justify-between text-lg font-bold text-[#1F2937] mt-3 pt-3 border-t border-[#E5E7EB]"><span>Toplam</span><span>{total.toLocaleString('tr-TR')} ₺</span></div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
