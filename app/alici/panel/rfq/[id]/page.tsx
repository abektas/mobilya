'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BuyerSidebar } from '@/components/dashboard/buyer-sidebar'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function RFQDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [rfq, setRfq] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState<string | null>(null)

  const getToken = () => document.cookie.split('; ').find(r => r.startsWith('token='))?.split('=')[1]

  useEffect(() => { fetchRFQ() }, [id])

  const fetchRFQ = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/rfqs/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
      const data = await res.json()
      if (data.rfq) setRfq(data.rfq)
    } catch {}
    setLoading(false)
  }

  const acceptQuote = async (quoteId: string) => {
    setAccepting(quoteId)
    try {
      const token = getToken()
      if (!rfq) return
      const quote = rfq.quotes.find((q: any) => q.id === quoteId)
      if (!quote) return

      await fetch(`/api/rfqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: 'approved' }),
      })

      const orderRes = await fetch('/api/orders', { method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ supplierId: quote.supplierId, notes: quote.notes || '', items: (rfq.items||[]).map((item: any)=>({productId:item.productId||null,name:item.name,quantity:item.quantity,price:item.product?.price||quote.price})) }),
      })
      if (orderRes.ok) { alert('Teklif kabul edildi!'); fetchRFQ() }
    } catch {}
    setAccepting(null)
  }

  if (loading) return (<div className="min-h-screen bg-[#F8F7F5]"><BuyerSidebar /><div className="lg:ml-[260px] p-6 text-center py-12 text-[#6B7280]">Yukleniyor...</div></div>)
  if (!rfq) return (<div className="min-h-screen bg-[#F8F7F5]"><BuyerSidebar /><div className="lg:ml-[260px] p-6 text-center py-12 text-[#6B7280]">Talep bulunamadi</div></div>)

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <BuyerSidebar />
      <div className="lg:ml-[260px] p-6 space-y-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1F2937]"><ArrowLeft className="w-4 h-4" /> Geri</button>

        <div className="bg-white rounded-[12px] shadow-card p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-h2 font-bold text-[#1F2937]">{rfq.title}</h1>
              <p className="text-sm text-[#6B7280] mt-1">{rfq.description||'Aciklama yok'}</p>
            </div>
            <span className={cn('px-3 py-1 rounded-full text-caption font-medium', rfq.status==='open'?'bg-[#22C55E]/10 text-[#22C55E]':rfq.status==='approved'?'bg-[#3B82F6]/10 text-[#3B82F6]':'bg-[#EF4444]/10 text-[#EF4444]')}>
              {rfq.status==='open'?'Acik':rfq.status==='approved'?'Onaylandi':'Kapandi'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#6B7280] mt-3">
            <span><Clock className="w-4 h-4 inline mr-1" />{new Date(rfq.createdAt).toLocaleDateString('tr-TR')}</span>
            <span>{rfq.items?.length||0} kalem</span>
            <span>{rfq.quotes?.length||0} teklif</span>
          </div>
          {rfq.items?.length>0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {rfq.items.map((item: any,i: number)=>(<span key={i} className="px-3 py-1.5 rounded-full bg-[#F3F4F6] text-sm text-[#6B7280]">{item.name} x{item.quantity}</span>))}
            </div>
          )}
        </div>

        <h2 className="text-h3 font-semibold text-[#1F2937]">Gelen Teklifler ({rfq.quotes?.length||0})</h2>

        {rfq.quotes?.length===0 ? (
          <div className="bg-white rounded-[12px] shadow-card p-12 text-center"><p className="text-[#6B7280]">Henuz teklif gelmedi</p></div>
        ) : (
          <div className="space-y-4">
            {rfq.quotes.sort((a: any,b: any)=>a.price-b.price).map((quote: any) => (
              <div key={quote.id} className="bg-white rounded-[12px] shadow-card p-6 hover:shadow-card-hover transition-all border-2 border-transparent hover:border-[#1F4E5F]/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-[10px] bg-[#1F4E5F]/10 flex items-center justify-center">
                        <span className="text-[#1F4E5F] font-semibold text-sm">{(quote.supplier?.companyName||quote.supplier?.name||'?')[0]}</span>
                      </div>
                      <div><p className="font-semibold text-[#1F2937]">{quote.supplier?.companyName||quote.supplier?.name}</p><p className="text-caption text-[#6B7280]">Tedarikci</p></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="p-3 rounded-[10px] bg-[#F8F7F5]"><p className="text-caption text-[#6B7280]">Fiyat</p><p className="text-lg font-bold text-[#1F4E5F]">{quote.price.toLocaleString('tr-TR')} ₺</p></div>
                      <div className="p-3 rounded-[10px] bg-[#F8F7F5]"><p className="text-caption text-[#6B7280]">Teslim</p><p className="text-lg font-bold text-[#1F2937]">{quote.deliveryTime||'Belirtilmemis'}</p></div>
                      <div className="p-3 rounded-[10px] bg-[#F8F7F5]"><p className="text-caption text-[#6B7280]">Durum</p><p className={cn('text-lg font-bold', quote.status==='pending'?'text-[#F59E0B]':quote.status==='accepted'?'text-[#22C55E]':'text-[#EF4444]')}>
                        {quote.status==='pending'?'Beklemede':quote.status==='accepted'?'Kabul Edildi':'Reddedildi'}</p></div>
                    </div>
                    {quote.notes && <p className="text-sm text-[#6B7280] mt-3 italic">"{quote.notes}"</p>}
                  </div>
                  {rfq.status==='open' && quote.status==='pending' && (
                    <Button variant="cta" className="shrink-0 ml-4" disabled={accepting===quote.id} onClick={()=>acceptQuote(quote.id)}>
                      <CheckCircle className="w-4 h-4 mr-1.5" /> Kabul Et
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
