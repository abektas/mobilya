'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Table2, Palette, Package, FileCheck, Video, HelpCircle, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const tabs = [
  { id: 'description', label: 'Aciklama', icon: FileText },
  { id: 'specs', label: 'Teknik Ozellikler', icon: Table2 },
  { id: 'variations', label: 'Varyasyonlar', icon: Palette },
  { id: 'packaging', label: 'Paketleme', icon: Package },
  { id: 'documents', label: 'Belgeler', icon: FileCheck },
  { id: 'videos', label: 'Videolar', icon: Video },
  { id: 'faq', label: 'SSS', icon: HelpCircle },
  { id: 'reviews', label: 'Yorumlar (128)', icon: Star },
]

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
      <div className="border-b border-[#E5E7EB] overflow-x-auto">
        <div className="flex">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2',
                  activeTab === tab.id
                    ? 'text-[#1F4E5F] border-[#1F4E5F]'
                    : 'text-[#6B7280] border-transparent hover:text-[#1F2937] hover:bg-[#F8F7F5]'
                )}>
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === 'description' && <DescriptionContent />}
          {activeTab === 'specs' && <SpecsContent />}
          {activeTab === 'variations' && <VariationsContent />}
          {activeTab === 'packaging' && <PackagingContent />}
          {activeTab === 'documents' && <DocumentsContent />}
          {activeTab === 'videos' && <VideosContent />}
          {activeTab === 'faq' && <FAQContent />}
          {activeTab === 'reviews' && <ReviewsContent />}
        </motion.div>
      </div>
    </div>

function DescriptionContent() {
  return (
    <div className="max-w-none">
      <h3 className="text-h3 font-semibold text-[#1F2937] mb-4">Modern Kose Koltuk Takimi</h3>
      <p className="text-[#6B7280] leading-relaxed mb-4">Modern cizgilerle tasarlanmis bu kose koltuk takimi, hem konforu hem de estetigi bir arada sunuyor. Premium kalite kumaslarla kaplanmis olup, uzun yillar boyunca ilk gunku gibi kalir.</p>
      <h4 className="font-semibold text-[#1F2937] mb-2">Kullanim Alanlari</h4>
      <ul className="list-disc pl-5 text-[#6B7280] space-y-1 mb-4">
        <li>Oturma odalari icin ideal</li>
        <li>Showroom ve sergi alanlari</li>
        <li>Otel lobileri ve bekleme salonlari</li>
        <li>Ofis dinlenme alanlari</li>
      </ul>
      <h4 className="font-semibold text-[#1F2937] mb-2">Avantajlari</h4>
      <ul className="list-disc pl-5 text-[#6B7280] space-y-1">
        <li>Moduler tasarim - kolayca ayrilabilir</li>
        <li>Leke tutmayan kumas teknolojisi</li>
        <li>2 yil garantili</li>
        <li>Ucretsiz numune talebi</li>
      </ul>
    </div>
  )
}

function SpecsContent() {
  const specs = [['Malzeme','%100 Polyester Kumas, Ahsap Iskelet'],['Boyut','280 x 180 x 85 cm'],['Koltuk Derinligi','55 cm'],['Koltuk Yuksekligi','45 cm'],['Agirlik','85 kg'],['Kumas Tipi','Linens Dokuma'],['Ayak','Siyah Plastik Ayak'],['Renk','Antrasit, Bej, Lacivert, Kirmizi'],['Tasima Kapasitesi','4 Kisi / 320 kg'],['Garanti','2 Yil'],['Uretim Kapasitesi','500 Adet / Ay'],['Mensei','Turkiye']]
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <tbody>
          {specs.map(([label, value], i) => (
            <tr key={label} className={i % 2 === 0 ? 'bg-[#F8F7F5]' : 'bg-white'}>
              <td className="px-4 py-3 text-sm font-medium text-[#1F2937] w-48">{label}</td>
              <td className="px-4 py-3 text-sm text-[#6B7280]">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function VariationsContent() {
  const colors = ['Antrasit','Bej','Lacivert','Kirmizi','Krem','Bordo','Gri','Siyah']
  return (
    <div>
      <h4 className="font-semibold text-[#1F2937] mb-4">Renk Secenekleri</h4>
      <div className="flex flex-wrap gap-3 mb-8">
        {colors.map(c => (
          <button key={c} className="px-4 py-2 rounded-button border border-[#E5E7EB] text-sm text-[#1F2937] hover:border-[#1F4E5F] hover:bg-[#1F4E5F]/5 transition-colors">{c}</button>
        ))}
      </div>

function DocumentsContent() {
  const docs = [
    { name: 'CE Sertifikasi', format: 'PDF', size: '2.4 MB' },
    { name: 'ISO 9001 Belgesi', format: 'PDF', size: '1.8 MB' },
    { name: 'Test Raporu', format: 'PDF', size: '3.1 MB' },
    { name: 'Urun Katalogu', format: 'PDF', size: '8.5 MB' },
  ]
  return (
    <div className="space-y-3">
      {docs.map(doc => (
        <div key={doc.name} className="flex items-center justify-between p-4 rounded-[12px] border border-[#E5E7EB] hover:bg-[#F8F7F5] transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-red-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1F2937]">{doc.name}</p>
              <p className="text-caption text-[#6B7280]">{doc.format} • {doc.size}</p>
            </div>
          </div>
          <Button variant="brand" size="sm" className="rounded-button">Indir</Button>
        </div>
      ))}
    </div>
  )
}

function VideosContent() {
  const videos = ['Urun Tanitim Videosu', 'Montaj Videosu', 'Uretim Videosu', 'Kalite Testi']
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map(v => (
        <div key={v} className="aspect-video rounded-[12px] bg-[#F3F4F6] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB] transition-colors group">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#1F4E5F]/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#1F4E5F] transition-colors">
              <Video className="w-7 h-7 text-white ml-1" />
            </div>
            <p className="text-sm font-medium text-[#1F2937]">{v}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function FAQContent() {
  const faqs = [
    { q: 'Numune alabilir miyim?', a: 'Evet, numune talebinde bulunabilirsiniz. Kargo ucreti aliciya aittir.' },
    { q: 'Toplu siparislerde indirim uyguluyor musunuz?', a: '50 adet ve uzeri siparislerde %10, 100 adet ve uzerinde %15 indirim uygulanmaktadir.' },
    { q: 'Teslim suresi ne kadar?', a: 'Standart siparislerde 25-30 gun icerisinde teslimat yapilmaktadir.' },
    { q: 'Ozel olcu ve renk secenegi var mi?', a: 'Evet, ozel uretim taleplerinizi degerlendiriyoruz. Minimum 20 adet.' },
    { q: 'Hangi ulkelere ihracat yapiyorsunuz?', a: 'Avrupa, Ortadogu, Afrika ve Kuzey Amerika olmak uzere 42 ulkeye ihracatimiz bulunmaktadir.' },
  ]
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details key={i} className="group">
          <summary className="flex items-center justify-between p-4 rounded-[12px] border border-[#E5E7EB] cursor-pointer hover:bg-[#F8F7F5] transition-colors [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-medium text-[#1F2937]">{faq.q}</span>
            <ChevronDownIcon className="w-4 h-4 text-[#6B7280] group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-4 pt-2 text-sm text-[#6B7280] leading-relaxed">{faq.a}</div>
        </details>
      ))}
    </div>
  )
}

function ReviewsContent() {
  const reviews = [
    { name: 'Ahmet Yilmaz', company: 'Dekorasyon Evim Ltd.', rating: 5, date: '2 hafta once', text: 'Urun kalitesi beklentimizin cok uzerinde cikti.' },
    { name: 'Ayse Demir', company: 'Mobilyaci.com', rating: 4, date: '1 ay once', text: 'Toplu siparis verdik, renkler fotograflarla birebir ayni.' },
    { name: 'Mehmet Kaya', company: 'Insaat Proje A.S.', rating: 5, date: '3 hafta once', text: 'Ucuncu kez siparis veriyorum. Her seferinde ayni kalite.' },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <p className="text-4xl font-bold text-[#1F4E5F]">4.8</p>
          <div className="flex items-center gap-0.5 mt-1">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />)}
          </div>
          <p className="text-caption text-[#6B7280] mt-1">128 yorum</p>
        </div>
      </div>
      {reviews.map(r => (
        <div key={r.name} className="p-4 rounded-[12px] border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-[#1F2937]">{r.name}</p>
              <p className="text-caption text-[#6B7280]">{r.company}</p>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} className={cn('w-3.5 h-3.5', s <= r.rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#D1D5DB]')} />)}
            </div>
          </div>
          <p className="text-sm text-[#6B7280]">{r.text}</p>
          <p className="text-caption text-[#D1D5DB] mt-2">{r.date}</p>
        </div>
      ))}
    </div>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
}

      <h4 className="font-semibold text-[#1F2937] mb-4">Olcu Secenekleri</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {['2 Koltuklu (180cm)','3 Koltuklu (240cm)','Kose (280cm)','U (380cm)'].map(size => (
          <button key={size} className="p-4 rounded-[12px] border border-[#E5E7EB] text-sm text-[#1F2937] hover:border-[#1F4E5F] transition-colors">{size}</button>
        ))}
      </div>
    </div>
  )
}

function PackagingContent() {
  const pkgs = [['Koli Olcusu','140 x 90 x 75 cm'],['Brut Agirlik','95 kg'],['Net Agirlik','85 kg'],['40HQ Konteyner','72 Adet'],['40FT Konteyner','60 Adet'],['20FT Konteyner','28 Adet']]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {pkgs.map(([label, value]) => (
        <div key={label} className="p-4 rounded-[12px] bg-[#F8F7F5]">
          <p className="text-caption text-[#6B7280] mb-1">{label}</p>
          <p className="font-semibold text-[#1F2937]">{value}</p>
        </div>
      ))}
    </div>
  )
}

  )
}
