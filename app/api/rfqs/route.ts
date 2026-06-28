import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || ''
    const skip = (page - 1) * limit

    const where: any = {}

    if (authUser.role === 'buyer') {
      where.buyerId = authUser.userId
    } else if (authUser.role === 'seller') {
      // Sellers see all open RFQs (RFQ Pazari)
      // Also include RFQs where they already submitted quotes
      where.OR = [
        { status: 'open' },
        { quotes: { some: { supplierId: authUser.userId } } },
      ]
    } else if (authUser.role !== 'admin') {
      where.buyerId = authUser.userId
    }

    // Belirli bir statu filtresi varsa, OR ile birlikte calisir
    // Ayrica kategori filtrelemesi (opsiyonel)
    const categoryId = searchParams.get('categoryId') || ''
    if (categoryId) {
      where.items = { some: { productId: categoryId } }
    }

    if (status) {
      // Eger seller ise status filtresini OR disinda uygula
      if (authUser.role === 'seller') {
        where.AND = [{ OR: where.OR }]
        delete where.OR
        where.status = status
        where.OR = where.AND[0].OR
      } else {
        where.status = status
      }
    }

    const [rfqs, total] = await Promise.all([
      prisma.rFQ.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: {
            select: { id: true, name: true, companyName: true },
          },
          items: true,
          quotes: {
            select: {
              id: true,
              price: true,
              currency: true,
              status: true,
              supplier: {
                select: { id: true, name: true, companyName: true },
              },
            },
          },
          _count: { select: { quotes: true } },
        },
      }),
      prisma.rFQ.count({ where }),
    ])

    return successResponse({
      rfqs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasMore: skip + limit < total },
    })
  } catch (error) {
    console.error('Get RFQs error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { title, description, items } = body

    if (!title) {
      return errorResponse('Talep başlığı zorunludur')
    }

    const rfq = await prisma.rFQ.create({
      data: {
        title,
        description: description || '',
        buyerId: authUser.userId,
        items: {
          create: (items || []).map((item: any) => ({
            name: item.name,
            quantity: parseInt(item.quantity) || 1,
            unit: item.unit || 'adet',
            notes: item.notes || '',
            productId: item.productId || null,
          })),
        },
      },
      include: {
        items: true,
        buyer: {
          select: { id: true, name: true, companyName: true },
        },
      },
    })

    return successResponse({ rfq }, 201)
  } catch (error) {
    console.error('Create RFQ error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
