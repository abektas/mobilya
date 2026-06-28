'use client'
import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Search, Clock, Send, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function SellerRFQPage() {
  const [rfqs, setRfqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRfq, setSelectedRfq] = useState<any>(null)
  const [quotePrice, setQuotePrice] = useState('')
  const [quoteDelivery, setQuoteDelivery] = useState('')
  const [quoteNotes, setQuoteNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const getToken = () => document.cookie.split('; ').find(r => r.startsWith('token='))?.split('=')[1]

  useEffect(() => { fetchRfqs() }, [])

  const fetchRfqs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/rfqs?status=open', { headers: { Authorization: `Bearer ${getToken()}` } })
      const data = await res.json()
      setRfqs(data.rfqs || [])
    } catch {}
    setLoading(false)
  }

  const submitQuote = async (rfqId: string) => {
    if (!quotePrice) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/rfqs/${rfqId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ price: quotePrice, deliveryTime: quoteDelivery, notes: quoteNotes }),
      })
      if (res.ok) { setSelectedRfq(null); setQuotePrice(''); setQuoteDelivery(''); setQuoteNotes(''); fetchRfqs() }
    } catch {}
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Sidebar />
      <div className="lg:ml-[260px] p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-h2 font-bold text-[#1F2937]">RFQ Pazari</h1><p className="text-sm text-[#6B7280] mt-1">Acik talepleri goruntuleyin ve teklif verin</p></div>
          <Button variant="brand" size="sm" onClick={fetchRfqs}>Yenile</Button>
        </div>
        {loading ? (
          <div className="text-center py-12 text-[#6B7280]">Yukleniyor...</div>
        ) : rfqs.length === 0 ? (
          <div className="text-center py-12"><FileText className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" /><p className="text-[#6B7280]">Henuz acik talep bulunmuyor</p></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {rfqs.map((rfq: any) => (
                <div key={rfq.id} className={cn('bg-white rounded-[12px] shadow-card p-5 cursor-pointer transition-all hover:shadow-card-hover', selectedRfq?.id===rfq.id&&'ring-2 ring-[#1F4E5F]')}
                  onClick={()=>{setSelectedRfq(rfq);setQuotePrice('');setQuoteDelivery('');setQuoteNotes('')}}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#1F2937]">{rfq.title}</h3>
                    <span className="px-2.5 py-1 rounded-full text-caption font-medium bg-[#22C55E]/10 text-[#22C55E]">Acik</span>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3 line-clamp-2">{rfq.description||'Aciklama yok'}</p>
                  <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{new Date(rfq.createdAt).toLocaleDateString('tr-TR')}</span>
                    <span>{rfq.items?.length||0} kalem</span>
                    <span>{rfq._count?.quotes||0} teklif</span>
                  </div>
                  {rfq.items?.length>0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {rfq.items.map((item: any,i: number)=>(
                        <span key={i} className="px-2.5 py-1 rounded-full bg-[#F3F4F6] text-caption text-[#6B7280]">{item.name} ({item.quantity} {item.unit})</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              {selectedRfq ? (
                <div className="bg-white rounded-[12px] shadow-card p-6 sticky top-28">
                  <h3 className="font-semibold text-[#1F2937] mb-1">{selectedRfq.title}</h3>
                  <p className="text-sm text-[#6B7280] mb-4">Teklifinizi gonderin</p>
                  <div className="space-y-4">
                    <div><label className="text-sm font-medium text-[#1F2937]">Fiyat (TRY)</label><Input type="number" placeholder="0.00" value={quotePrice} onChange={e=>setQuotePrice(e.target.value)} className="h-12 rounded-input" /></div>
                    <div><label className="text-sm font-medium text-[#1F2937]">Teslim Suresi</label><Input placeholder="orn: 25 gun" value={quoteDelivery} onChange={e=>setQuoteDelivery(e.target.value)} className="h-12 rounded-input" /></div>
                    <div><label className="text-sm font-medium text-[#1F2937]">Notlar</label><textarea rows={3} placeholder="Teklif notlariniz..." value={quoteNotes} onChange={e=>setQuoteNotes(e.target.value)} className="w-full p-3 rounded-[12px] border border-[#E5E7EB] text-sm resize-none outline-none focus:ring-2 focus:ring-[#1F4E5F]/20" /></div>
                    <Button variant="cta" className="w-full h-12 rounded-button" disabled={!quotePrice||submitting} onClick={()=>submitQuote(selectedRfq.id)}>
                      <Send className="w-4 h-4 mr-2" /> Teklif Gonder
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[12px] shadow-card p-6 text-center sticky top-28">
                  <FileText className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
                  <p className="text-sm text-[#6B7280]">Teklif vermek icin bir talep secin</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
