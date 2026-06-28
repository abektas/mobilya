'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ChevronRight, ChevronLeft, Upload, Image as ImageIcon,
  Building2, Hotel, Sofa, Trees, Lamp, Warehouse, Users, PenTool,
  Truck, Shield, Clock, Star, CheckCircle2, ArrowRight, Search,
  FileText, Home, Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const steps = [
  { id: 1, label: 'Ihtiyac Turu' },
  { id: 2, label: 'Proje Detaylari' },
  { id: 3, label: 'Tedarikci Tercihleri' },
  { id: 4, label: 'Iletisim' },
]

const requestTypes = [
  { id: 'ready', icon: Sofa, label: 'Hazir Urun', desc: 'Katalogdan urun secimi', color: 'from-[#1F4E5F] to-[#243447]' },
  { id: 'custom', icon: PenTool, label: 'Ozel Uretim', desc: 'Kendi olculerinize gore', color: 'from-[#F97316] to-[#EA580C]' },
  { id: 'bulk', icon: Warehouse, label: 'Toplu Alim', desc: 'Toptan fiyat teklifi', color: 'from-[#8B5E3C] to-[#A0764A]' },
  { id: 'hotel', icon: Hotel, label: 'Otel Projesi', desc: 'Anahtar teslim cozumler', color: 'from-[#3B82F6] to-[#2563EB]' },
  { id: 'office', icon: Briefcase, label: 'Ofis Mobilyasi', desc: 'Ergonomik ofis cozumleri', color: 'from-[#8B5CF6] to-[#7C3AED]' },
  { id: 'cafe', icon: Trees, label: 'Cafe / Restoran', desc: 'Ticari alan mobilyalari', color: 'from-[#22C55E] to-[#16A34A]' },
  { id: 'interior', icon: Users, label: 'Ic Mimarlik', desc: 'Proje bazli tedarik', color: 'from-[#F59E0B] to-[#D97706]' },
  { id: 'renovation', icon: Truck, label: 'Yenileme', desc: 'Mevcut mobilya yenileme', color: 'from-[#EC4899] to-[#DB2777]' },
  { id: 'assembly', icon: Home, label: 'Montaj Hizmeti', desc: 'Profesyonel montaj', color: 'from-[#14B8A6] to-[#0D9488]' },
]

const categories = [
  'Oturma Odasi', 'Yatak Odasi', 'Yemek Odasi', 'Mutfak', 'Ofis',
  'Bahce', 'Banyo', 'Cocuk Odasi', 'Antre', 'Balkon'
]

const styles = ['Modern', 'Klasik', 'Country', 'Endustriyel', 'Minimal', 'Iskandinav', 'Akdeniz', 'Vintage', 'Luks', 'Dogal']
const materials = ['Ahsap', 'Metal', 'Kumas', 'Deri', 'Cam', 'Mermer', 'Sunta', 'Celik', 'Hasir', 'Bambu']
const colors = ['Beyaz', 'Siyah', 'Gri', 'Krem', 'Lacivert', 'Bordo', 'Yesil', 'Mavi', 'Kirmizi', 'Pembe']
const budgets = ['500-1.000 ₺', '1.000-5.000 ₺', '5.000-10.000 ₺', '10.000-25.000 ₺', '25.000-50.000 ₺', '50.000+ ₺']
const urgencies = ['Cok Acil (1 hafta)', 'Acil (2 hafta)', 'Normal (1 ay)', 'Planli (2-3 ay)', 'Proje Bazli']

export default function RFQPage() {
  const [step, setStep] = useState(0)
  const [requestType, setRequestType] = useState('')

  return (
    <main className="min-h-screen bg-[#F8F7F5]">
      <Header />
      <div className="pt-24 sm:pt-28">
        {/* Hero */}
        <section className="bg-brand-gradient py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-h1 sm:text-5xl font-bold text-white mb-4">
              Dogru Mobilya Ureticini Bul
            </h1>
            <p className="text-body text-white/70 max-w-2xl mx-auto mb-8">
              Ihtiyacinizi bir kere gonderin, mobilya markalarindan, atolyelerden ve ureticilerden birden fazla teklif alin.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
              {['Dogrulanmis Tedarikciler', 'Ozel Uretim', 'Teslimat Destegi', 'Montaj Hizmeti', 'Guvenli Iletisim'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#22C55E]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <div className="bg-white border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-center gap-0">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                      i < step ? 'bg-[#22C55E] text-white' : i === step ? 'bg-[#1F4E5F] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                    )}>
                      {i < step ? <Check className="w-5 h-5" /> : s.id}
                    </div>
                    <span className={cn('text-sm font-medium hidden sm:block', i <= step ? 'text-[#1F2937]' : 'text-[#6B7280]')}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn('w-12 sm:w-20 h-1 mx-3 rounded-full', i < step ? 'bg-[#22C55E]' : 'bg-[#E5E7EB]')} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          <AnimatePresence mode="wait">
            {step === 0 && <RequestTypeStep value={requestType} onChange={setRequestType} onNext={() => setStep(1)} />}
            {step === 1 && <ProjectDetailsStep onPrev={() => setStep(0)} onNext={() => setStep(2)} />}
            {step === 2 && <SupplierPrefsStep onPrev={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <ContactStep onPrev={() => setStep(2)} />}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  )
}

        {/* File Upload + Notes */}
        <div>
          <label className="text-sm font-semibold text-[#1F2937] mb-3 block">Dosya Yukle</label>
          <label className="flex flex-col items-center justify-center p-8 rounded-[16px] border-2 border-dashed border-[#E5E7EB] bg-white cursor-pointer hover:border-[#1F4E5F] hover:bg-[#1F4E5F]/5 transition-all">
            <Upload className="w-10 h-10 text-[#6B7280] mb-3" />
            <span className="text-sm font-medium text-[#1F2937]">Gorsel, cizim veya plan yukleyin</span>
            <span className="text-caption text-[#6B7280] mt-1">PNG, JPG, PDF (max 10MB)</span>
            <Input type="file" multiple accept="image/*,.pdf" onChange={(e) => {
              if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)])
            }} className="hidden" />
          </label>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-button bg-[#F3F4F6] text-sm text-[#6B7280]">
                  <ImageIcon className="w-4 h-4" /> {f.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-[#1F2937] mb-2 block">Ek Notlar</label>
          <textarea rows={4} placeholder="Ozel talepler..." className="w-full p-4 rounded-[12px] border border-[#E5E7EB] bg-white text-sm focus:ring-2 focus:ring-[#1F4E5F]/20 outline-none resize-none" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <Button variant="secondary" onClick={onPrev}><ChevronLeft className="w-4 h-4 mr-1" /> Geri</Button>
        <Button variant="cta" onClick={onNext} className="px-10">Devam <ChevronRight className="w-4 h-4 ml-1" /></Button>
      </div>
    </motion.div>
  )
}

// Step 3: Supplier Preferences
function SupplierPrefsStep({ onPrev, onNext }: any) {
  const [prefs, setPrefs] = useState<string[]>([])
  const toggle = (p: string) => setPrefs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  const items = [
    {icon:Building2,label:'Uretici',desc:'Fabrikadan'},{icon:Users,label:'Atolye',desc:'Kucuk olcek'},
    {icon:Star,label:'Marka',desc:'Bilinen'},{icon:Truck,label:'Yakin',desc:'Sehrinizde'},
    {icon:Warehouse,label:'Fabrika',desc:'Aracisiz'},{icon:Clock,label:'Hizli',desc:'Teslimat'},
    {icon:Shield,label:'Premium',desc:'Ust segment'},{icon:FileText,label:'Ekonomik',desc:'Butce'},
  ]
  return (
    <motion.div key="step3" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-h2 font-bold text-[#1F2937] mb-2">Tedarikci Tercihleri</h2>
        <p className="text-[#6B7280]">Tercih ettiginiz tedarikci tiplerini secin.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {items.map(sp => {
          const Icon = sp.icon
          return (
            <button key={sp.label} onClick={() => toggle(sp.label)}
              className={cn('flex items-center gap-4 p-4 rounded-[12px] border-2 text-left transition-all',
                prefs.includes(sp.label) ? 'border-[#1F4E5F] bg-[#1F4E5F]/5' : 'border-[#E5E7EB] bg-white hover:border-[#1F4E5F]/50')}>
              <div className="w-10 h-10 rounded-[10px] bg-[#1F4E5F]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#1F4E5F]" />
              </div>
              <div>
// Step 4: Contact
function ContactStep({ onPrev }: any) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({name:'',phone:'',email:'',company:'',pref:'whatsapp'})
  const [agreed, setAgreed] = useState(false)

  if (submitted) {
    return (
      <motion.div key="success" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="max-w-lg mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
        </div>
        <h2 className="text-h2 font-bold text-[#1F2937] mb-2">Talebiniz Alindi!</h2>
        <p className="text-[#6B7280] mb-8">Talebiniz uygun tedarikcilere yonlendirilecektir.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/alici/panel/rfq"><Button variant="brand">Taleplerim</Button></Link>
          <Link href="/urunler"><Button variant="secondary">Urunlere Goz At</Button></Link>
        </div>
      </motion.div>
    )
  }

  const update = (field:string, val:string) => setForm(p => ({...p, [field]:val}))

  return (
    <motion.div key="step4" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-h2 font-bold text-[#1F2937] mb-2">Iletisim Bilgileri</h2>
        <p className="text-[#6B7280]">Tekliflerinizi size gonderelim.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if(agreed) setSubmitted(true) }}
        className="bg-white rounded-[16px] shadow-card p-8 space-y-5">
        <Field label="Ad Soyad" value={form.name} onChange={v => update('name',v)} required />
        <Field label="Telefon" type="tel" value={form.phone} onChange={v => update('phone',v)} required />
        <Field label="E-posta" type="email" value={form.email} onChange={v => update('email',v)} required />
        <Field label="Firma" value={form.company} onChange={v => update('company',v)} optional />
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}
            className="mt-1 rounded border-[#D1D5DB] text-[#1F4E5F] focus:ring-[#1F4E5F]" />
          <span className="text-sm text-[#6B7280]">Kullanim kosullarini kabul ediyorum.</span>
        </label>
        <Button type="submit" disabled={!agreed}
          className="w-full h-12 rounded-button bg-cta-gradient text-white border-0 font-semibold shadow-md disabled:opacity-50">
          <CheckCircle2 className="w-5 h-5 mr-2" /> Teklifleri Al
        </Button>
      </form>
      <div className="flex justify-center mt-6">
        <Button variant="ghost" onClick={onPrev}><ChevronLeft className="w-4 h-4 mr-1" /> Geri</Button>
      </div>
    </motion.div>
  )
}

function Field({ label, type = 'text', value, onChange, required, optional }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#1F2937]">{label} {optional && <span className="text-[#6B7280]">(opsiyonel)</span>}</label>
      <Input required={required} type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={label} className="h-12 rounded-input" />
    </div>
  )
}

                <p className="text-sm font-medium text-[#1F2937]">{sp.label}</p>
                <p className="text-caption text-[#6B7280]">{sp.desc}</p>
              </div>
            </button>
          )
        })}
      </div>
      <div className="flex items-center justify-between mt-8">
        <Button variant="secondary" onClick={onPrev}><ChevronLeft className="w-4 h-4 mr-1" /> Geri</Button>
        <Button variant="cta" onClick={onNext} className="px-10">Devam <ChevronRight className="w-4 h-4 ml-1" /></Button>
      </div>
    </motion.div>
  )
}
