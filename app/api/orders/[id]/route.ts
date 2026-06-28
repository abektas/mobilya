import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        buyer: { select: { id: true, name: true, companyName: true, email: true, phone: true } },
        supplier: { select: { id: true, name: true, companyName: true, email: true, phone: true, city: true } },
        items: {
          include: {
            product: { select: { id: true, nameTr: true, nameEn: true, slug: true, images: true } },
          },
        },
      },
    })

    if (!order) {
      return errorResponse('Sipariş bulunamadı', 404)
    }

    if (order.buyerId !== authUser.userId && order.supplierId !== authUser.userId && authUser.role !== 'admin') {
      return unauthorizedResponse()
    }

    return successResponse({ order })
  } catch (error) {
    console.error('Get order error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const order = await prisma.order.findUnique({ where: { id: params.id } })
    if (!order) {
      return errorResponse('Sipariş bulunamadı', 404)
    }

    if (order.supplierId !== authUser.userId && authUser.role !== 'admin') {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return errorResponse('Durum bilgisi zorunludur')
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return errorResponse('Geçersiz durum')
    }

    const updated = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    })

    return successResponse({ order: updated })
  } catch (error) {
    console.error('Update order error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
