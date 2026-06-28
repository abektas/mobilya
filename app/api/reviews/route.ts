import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const supplierId = searchParams.get('supplierId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: any = {}
    if (productId) where.productId = productId
    if (supplierId) {
      const supplierProducts = await prisma.product.findMany({
        where: { supplierId },
        select: { id: true },
      })
      where.productId = { in: supplierProducts.map(p => p.id) }
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, logo: true } },
          product: {
            select: { id: true, nameTr: true, nameEn: true, slug: true },
          },
        },
      }),
      prisma.review.count({ where }),
    ])

    return successResponse({
      reviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasMore: skip + limit < total },
    })
  } catch (error) {
    console.error('Get reviews error:', error)
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
      return unauthorizedResponse('Yalnızca alıcılar değerlendirme yapabilir')
    }

    const body = await request.json()
    const { productId, rating, comment } = body

    if (!productId || !rating) {
      return errorResponse('Ürün ve puan zorunludur')
    }

    if (rating < 1 || rating > 5) {
      return errorResponse('Puan 1-5 arasında olmalıdır')
    }

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
      return errorResponse('Ürün bulunamadı', 404)
    }

    // Check if already reviewed
    const existing = await prisma.review.findFirst({
      where: { userId: authUser.userId, productId },
    })
    if (existing) {
      return errorResponse('Bu ürünü daha önce değerlendirdiniz')
    }

    const review = await prisma.review.create({
      data: {
        userId: authUser.userId,
        productId,
        rating: parseInt(rating),
        comment: comment || '',
      },
      include: {
        user: { select: { id: true, name: true, logo: true } },
      },
    })

    return successResponse({ review }, 201)
  } catch (error) {
    console.error('Create review error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
