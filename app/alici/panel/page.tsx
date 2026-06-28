'use client'
import { useState } from 'react'
import { BuyerSidebar } from '@/components/dashboard/buyer-sidebar'
import { cn } from '@/lib/utils'
export default function BuyerDashboardPage() {
  const [period, setPeriod] = useState('7')
  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <BuyerSidebar />
      <div className="lg:ml-[260px]">
        <div className="p-6">
          <h1 className="text-h2 font-bold text-[#1F2937]">Alici Paneli</h1>
        </div>
      </div>
    </div>
  )
}

