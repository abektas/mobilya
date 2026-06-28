import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const rfq = await prisma.rFQ.findUnique({
      where: { id: id },
      include: {
        buyer: {
          select: { id: true, name: true, companyName: true, email: true, phone: true },
        },
        items: true,
        quotes: {
          include: {
            supplier: {
              select: { id: true, name: true, companyName: true, logo: true, city: true, verified: true },
            },
          },
          orderBy: { price: 'asc' },
        },
      },
    })

    if (!rfq) {
      return errorResponse('Teklif talebi bulunamadı', 404)
    }

    // Check authorization
    const isBuyer = rfq.buyerId === authUser.userId
    const isAdmin = authUser.role === 'admin'
    const hasQuote = rfq.quotes.some(q => q.supplierId === authUser.userId)

    if (!isBuyer && !isAdmin && !hasQuote) {
      return unauthorizedResponse()
    }

    return successResponse({ rfq })
  } catch (error) {
    console.error('Get RFQ error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }
    if (authUser.role !== 'seller' && authUser.role !== 'admin') {
      return unauthorizedResponse('Teklif vermek için satıcı olmalısınız')
    }

    const rfq = await prisma.rFQ.findUnique({ where: { id: id } })
    if (!rfq) {
      return errorResponse('Teklif talebi bulunamadı', 404)
    }

    if (rfq.status !== 'open') {
      return errorResponse('Bu teklif talebi artık açık değil')
    }

    const body = await request.json()
    const { price, currency, deliveryTime, notes } = body

    if (!price) {
      return errorResponse('Fiyat zorunludur')
    }

    const quote = await prisma.quote.create({
      data: {
        rfqId: id,
        supplierId: authUser.userId,
        price: parseFloat(price),
        currency: currency || 'TRY',
        deliveryTime: deliveryTime || null,
        notes: notes || '',
      },
      include: {
        supplier: {
          select: { id: true, name: true, companyName: true, logo: true },
        },
      },
    })

    return successResponse({ quote }, 201)
  } catch (error) {
    console.error('Create quote error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { status } = body

    const rfq = await prisma.rFQ.findUnique({ where: { id: id } })
    if (!rfq) {
      return errorResponse('Teklif talebi bulunamadı', 404)
    }

    if (rfq.buyerId !== authUser.userId && authUser.role !== 'admin') {
      return unauthorizedResponse()
    }

    const updated = await prisma.rFQ.update({
      where: { id: id },
      data: { ...(status && { status }) },
    })

    return successResponse({ rfq: updated })
  } catch (error) {
    console.error('Update RFQ error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
