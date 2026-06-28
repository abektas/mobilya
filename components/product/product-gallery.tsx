'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const sampleImages = [
  { id: 1, type: 'image', label: 'On Görünüm' },
  { id: 2, type: 'image', label: 'Yan Görünüm' },
  { id: 3, type: 'image', label: 'Detay' },
  { id: 4, type: 'image', label: 'Boyut' },
  { id: 5, type: 'image', label: 'Renk Secenegi' },
  { id: 6, type: 'video', label: 'Urun Videosu' },
]

export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <div className="space-y-4">
      {/* Ana Görsel */}
      <div className="relative aspect-square bg-[#F3F4F6] rounded-[12px] overflow-hidden group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
          >
            {sampleImages[activeIndex]?.type === 'video' ? (
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1F4E5F]/5 to-[#8B5E3C]/5">
                <div className="w-20 h-20 rounded-full bg-[#1F4E5F]/90 flex items-center justify-center cursor-pointer hover:bg-[#1F4E5F] transition-colors shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            ) : (
              <div className="text-8xl opacity-40 select-none">🪑</div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Zoom lens */}
        {isZoomed && (
          <div className="absolute inset-0 z-10 cursor-zoom-in"
            style={{
              background: `radial-gradient(circle 150px at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 0%, rgba(0,0,0,0.03) 100%)`,
            }}
          />
        )}

        {/* Nav Buttons */}
        <button onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <ChevronLeft className="w-5 h-5 text-[#1F2937]" />
        </button>
        <button onClick={() => setActiveIndex(prev => Math.min(sampleImages.length - 1, prev + 1))}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <ChevronRight className="w-5 h-5 text-[#1F2937]" />
        </button>

        {/* Fullscreen */}
        <button className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <Maximize2 className="w-4 h-4 text-[#1F2937]" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-caption text-[#6B7280] font-medium">
          {activeIndex + 1} / {sampleImages.length}
        </div>
      </div>

      {/* Thumbnail Row */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {sampleImages.map((img, index) => (
          <button key={img.id} onClick={() => setActiveIndex(index)}
            className={cn(
              'relative shrink-0 w-20 h-20 rounded-[10px] border-2 overflow-hidden transition-all duration-200',
              activeIndex === index ? 'border-[#1F4E5F] ring-2 ring-[#1F4E5F]/20' : 'border-[#E5E7EB] hover:border-[#6B7280]'
            )}
          >
            <div className="w-full h-full bg-[#F3F4F6] flex items-center justify-center text-lg">
              {img.type === 'video' ? (
                <div className="flex items-center gap-1 text-caption text-[#6B7280]">
                  <Play className="w-4 h-4" />
                </div>
              ) : (
                <span className="opacity-40">🪑</span>
              )}
            </div>
            {img.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-6 h-6 rounded-full bg-[#1F4E5F]/80 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white ml-0.5" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
