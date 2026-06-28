'use client'
import { useState, useEffect } from 'react'
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getToken = () => document.cookie.split('; ').find(r=>r.startsWith('token='))?.split('=')[1]
  useEffect(() => { if (open) fetchCart() }, [open])

  const fetchCart = async () => {
    setLoading(true)
    try { const r=await fetch('/api/cart',{headers:{Authorization:`Bearer ${getToken()}`}}); const d=await r.json(); if(d.cart) setCart(d.cart) } catch {}
    setLoading(false)
  }

  const updateQuantity = async (pid:string,q:number) => { await fetch('/api/cart',{method:'PUT',headers:{'Content-Type':'application/json',Authorization:`Bearer ${getToken()}`},body:JSON.stringify({productId:pid,quantity:q})}); fetchCart() }
  const removeItem = async (pid:string) => { await fetch(`/api/cart?productId=${pid}`,{method:'DELETE',headers:{Authorization:`Bearer ${getToken()}`}}); fetchCart() }
  const total = cart?.items?.reduce((s:number,i:any)=>s+(i.product?.price||0)*i.quantity,0)||0

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
          <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:25}}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-[#1F2937]" />
                <h2 className="font-semibold text-[#1F2937]">Sepet</h2>
                {cart?.itemCount>0 && <span className="px-2 py-0.5 rounded-full bg-[#1F4E5F] text-white text-caption">{cart.itemCount}</span>}
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F3F4F6]"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading ? <div className="text-center py-12 text-[#6B7280]">Yukleniyor...</div>
              : !cart?.items?.length ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" />
                  <p className="text-[#6B7280]">Sepetiniz bos</p>
                  <Button variant="brand" size="sm" className="mt-4" onClick={onClose}>Alisverise Basla</Button>
                </div>
              ) : cart.items.map((item:any)=>(
                <div key={item.id} className="flex gap-4 p-4 rounded-[12px] bg-[#F8F7F5]">
                  <div className="w-16 h-16 rounded-[10px] bg-[#E5E7EB] flex items-center justify-center shrink-0 text-2xl">🪑</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1F2937] truncate">{item.product?.nameTr||'Urun'}</p>
                    <p className="text-sm font-bold text-[#1F4E5F] mt-1">{(item.product?.price||0).toLocaleString('tr-TR')} ₺</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#E5E7EB] rounded-button overflow-hidden">
                        <button className="p-1.5 hover:bg-[#F3F4F6]" onClick={()=>updateQuantity(item.productId,item.quantity-1)}><Minus className="w-3.5 h-3.5" /></button>
                        <span className="px-3 text-sm font-medium text-[#1F2937]">{item.quantity}</span>
                        <button className="p-1.5 hover:bg-[#F3F4F6]" onClick={()=>updateQuantity(item.productId,item.quantity+1)}><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                      <button className="p-1.5 text-[#EF4444] hover:bg-red-50 rounded-lg" onClick={()=>removeItem(item.productId)}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cart?.items?.length>0 && (
              <div className="border-t border-[#E5E7EB] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Toplam</span>
                  <span className="text-xl font-bold text-[#1F2937]">{total.toLocaleString('tr-TR')} ₺</span>
                </div>
                <Link href="/odeme" onClick={onClose}>
                  <Button variant="cta" className="w-full h-12 rounded-button">Siparisi Tamamla <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
