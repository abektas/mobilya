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
      where.supplierId = authUser.userId
    }
    if (status) where.status = status

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: { select: { id: true, name: true, companyName: true } },
          supplier: { select: { id: true, name: true, companyName: true } },
          items: {
            include: {
              product: { select: { id: true, nameTr: true, nameEn: true, slug: true, images: true } },
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ])

    return successResponse({
      orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasMore: skip + limit < total },
    })
  } catch (error) {
    console.error('Get orders error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }
    if (authUser.role !== 'buyer' && authUser.role !== 'admin') {
      return unauthorizedResponse('Sipariş vermek için alıcı olmalısınız')
    }

    const body = await request.json()
    const { supplierId, items, notes } = body

    if (!supplierId || !items || items.length === 0) {
      return errorResponse('Tedarikçi ve ürünler zorunludur')
    }

    // Calculate total
    let total = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } })
      if (!product) {
        return errorResponse(`Ürün bulunamadı: ${item.productId}`)
      }
      const itemTotal = (product.price || 0) * item.quantity
      total += itemTotal
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price || 0,
      })
    }

    const order = await prisma.order.create({
      data: {
        buyerId: authUser.userId,
        supplierId,
        total,
        notes: notes || '',
        currency: 'TRY',
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: { select: { id: true, nameTr: true, nameEn: true, slug: true } },
          },
        },
        buyer: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true, companyName: true } },
      },
    })

    return successResponse({ order }, 201)
  } catch (error) {
    console.error('Create order error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
