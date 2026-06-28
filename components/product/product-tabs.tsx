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
        <div className="flex">{tabs.map(tab => {
          const Icon = tab.icon
          return (<button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn('flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2',
              activeTab === tab.id ? 'text-[#1F4E5F] border-[#1F4E5F]' : 'text-[#6B7280] border-transparent hover:text-[#1F2937] hover:bg-[#F8F7F5]')}>
            <Icon className="w-4 h-4" />{tab.label}</button>)
        })}</div>
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
  )
}

function DescriptionContent() {
  return (<div className="max-w-none">
    <h3 className="text-h3 font-semibold text-[#1F2937] mb-4">Modern Kose Koltuk Takimi</h3>
    <p className="text-[#6B7280] leading-relaxed mb-4">Modern cizgilerle tasarlanmis bu kose koltuk takimi, hem konforu hem de estetigi bir arada sunuyor.</p>
    <h4 className="font-semibold text-[#1F2937] mb-2">Kullanim Alanlari</h4>
    <ul className="list-disc pl-5 text-[#6B7280] space-y-1 mb-4">
      <li>Oturma odalari icin ideal</li>
      <li>Showroom ve sergi alanlari</li>
      <li>Otel lobileri ve bekleme salonlari</li>
      <li>Ofis dinlenme alanlari</li>
    </ul>
  </div>)
}
function SpecsContent() {
  const specs = [['Malzeme','Polyester, Ahsap'],['Boyut','280x180x85cm'],['Agirlik','85kg'],['Renk','Antrasit, Bej'],['Garanti','2 Yil'],['Uretim','500/Ay'],['Mensei','Turkiye']]
  return (<div className="overflow-x-auto"><table className="w-full"><tbody>
    {specs.map(([l,v],i) => (<tr key={l} className={i%2===0?'bg-[#F8F7F5]':'bg-white'}>
      <td className="px-4 py-3 text-sm font-medium text-[#1F2937] w-48">{l}</td>
      <td className="px-4 py-3 text-sm text-[#6B7280]">{v}</td>
    </tr>))}
  </tbody></table></div>)
}
function VariationsContent() {
  const colors = ['Antrasit','Bej','Lacivert','Kirmizi','Krem','Bordo','Gri','Siyah']
  const sizes = ['2 Koltuklu (180cm)','3 Koltuklu (240cm)','Kose (280cm)','U (380cm)']
  return (<div>
    <h4 className="font-semibold text-[#1F2937] mb-4">Renk Secenekleri</h4>
    <div className="flex flex-wrap gap-3 mb-8">{colors.map(c => (
      <button key={c} className="px-4 py-2 rounded-button border border-[#E5E7EB] text-sm hover:border-[#1F4E5F]">{c}</button>
    ))}</div>
    <h4 className="font-semibold text-[#1F2937] mb-4">Olcu Secenekleri</h4>
    <div className="grid grid-cols-2 gap-3">{sizes.map(s => (
      <button key={s} className="p-4 rounded-[12px] border border-[#E5E7EB] text-sm text-[#1F2937] hover:border-[#1F4E5F]">{s}</button>
    ))}</div>
  </div>)
}
function PackagingContent() {
  const items = [['Koli Olcusu','140x90x75cm'],['Brut Agirlik','95kg'],['40HQ','72 Adet'],['20FT','28 Adet']]
  return (<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{items.map(([l,v]) => (
    <div key={l} className="p-4 rounded-[12px] bg-[#F8F7F5]"><p className="text-caption text-[#6B7280] mb-1">{l}</p><p className="font-semibold text-[#1F2937]">{v}</p></div>
  ))}</div>)
}
function DocumentsContent() {
  const docs = [{name:'CE Sertifikasi',size:'2.4MB'},{name:'ISO 9001',size:'1.8MB'},{name:'Test Raporu',size:'3.1MB'},{name:'Katalog',size:'8.5MB'}]
  return (<div className="space-y-3">{docs.map(d => (
    <div key={d.name} className="flex items-center justify-between p-4 rounded-[12px] border border-[#E5E7EB] hover:bg-[#F8F7F5]">
      <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-red-500" /><span className="text-sm font-medium text-[#1F2937]">{d.name}</span></div>
      <Button variant="brand" size="sm">Indir</Button>
    </div>
  ))}</div>)
}
function VideosContent() {
  const vids = ['Urun Tanitim','Montaj','Uretim','Kalite Testi']
  return (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{vids.map(v => (
    <div key={v} className="aspect-video rounded-[12px] bg-[#F3F4F6] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB] group">
      <div className="text-center"><div className="w-16 h-16 rounded-full bg-[#1F4E5F]/80 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#1F4E5F]"><Video className="w-7 h-7 text-white ml-1" /></div><p className="text-sm font-medium text-[#1F2937]">{v}</p></div>
    </div>
  ))}</div>)
}
function FAQContent() {
  const faqs = [{q:'Numune alabilir miyim?',a:'Evet, numune talebinde bulunabilirsiniz.'},{q:'Teslim suresi?',a:'25-30 gun.'},{q:'Ihracat yapiyor musunuz?',a:'42 ulkeye.'}]
  return (<div className="space-y-3">{faqs.map((f,i) => (<details key={i} className="group">
    <summary className="flex items-center justify-between p-4 rounded-[12px] border border-[#E5E7EB] cursor-pointer hover:bg-[#F8F7F5] [&::-webkit-details-marker]:hidden">
      <span className="text-sm font-medium text-[#1F2937]">{f.q}</span>
    </summary>
    <div className="p-4 pt-2 text-sm text-[#6B7280]">{f.a}</div>
  </details>))}</div>)
}
function ReviewsContent() {
  const revs = [{name:'Ahmet Y.',rating:5,text:'Kalite beklentimizin uzerinde.'},{name:'Ayse D.',rating:4,text:'Renkler fotograflarla ayni.'},{name:'Mehmet K.',rating:5,text:'3. kez siparis veriyorum.'}]
  return (<div className="space-y-4">
    <div className="flex items-center gap-4 mb-6"><p className="text-4xl font-bold text-[#1F4E5F]">4.8</p><div className="flex gap-0.5">{[1,2,3,4,5].map(s=><Star key={s} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />)}</div><p className="text-caption text-[#6B7280]">128 yorum</p></div>
    {revs.map(r => (<div key={r.name} className="p-4 rounded-[12px] border border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-2"><p className="font-medium text-[#1F2937]">{r.name}</p><div className="flex gap-0.5">{[1,2,3,4,5].map(s=><Star key={s} className={cn('w-3.5 h-3.5', s<=r.rating?'fill-[#F59E0B] text-[#F59E0B]':'text-[#D1D5DB]')} />)}</div></div>
      <p className="text-sm text-[#6B7280]">{r.text}</p>
    </div>))}
  </div>)
}
 
