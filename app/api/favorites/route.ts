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
    const skip = (page - 1) * limit

    const [favorites, total] = await Promise.all([
      prisma.favorite.findMany({
        where: { userId: authUser.userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          product: {
            include: {
              supplier: {
                select: { id: true, name: true, companyName: true, city: true, verified: true },
              },
              category: {
                select: { id: true, nameTr: true, nameEn: true, slug: true },
              },
              _count: { select: { reviews: true } },
            },
          },
        },
      }),
      prisma.favorite.count({ where: { userId: authUser.userId } }),
    ])

    return successResponse({
      favorites,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasMore: skip + limit < total },
    })
  } catch (error) {
    console.error('Get favorites error:', error)
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
    const { productId } = body

    if (!productId) {
      return errorResponse('Ürün ID zorunludur')
    }

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
      return errorResponse('Ürün bulunamadı', 404)
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: { userId_productId: { userId: authUser.userId, productId } },
    })
    if (existing) {
      return errorResponse('Bu ürün zaten favorilerinizde')
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: authUser.userId,
        productId,
      },
      include: {
        product: {
          select: { id: true, nameTr: true, nameEn: true, slug: true, price: true, images: true },
        },
      },
    })

    return successResponse({ favorite }, 201)
  } catch (error) {
    console.error('Add favorite error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return errorResponse('Ürün ID zorunludur')
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: authUser.userId,
        productId,
      },
    })

    return successResponse({ message: 'Favorilerden çıkarıldı' })
  } catch (error) {
    console.error('Remove favorite error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
