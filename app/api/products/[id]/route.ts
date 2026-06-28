import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'
import { serializeImages } from '@/lib/utils'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            companyName: true,
            city: true,
            verified: true,
            logo: true,
            about: true,
            founded: true,
            employeeCount: true,
            createdAt: true,
            _count: { select: { products: true } },
          },
        },
        category: {
          select: { id: true, nameTr: true, nameEn: true, slug: true },
        },
        _count: {
          select: { reviews: true, favorites: true },
        },
      },
    })

    if (!product) {
      return errorResponse('Ürün bulunamadı', 404)
    }

    // Get reviews with users
    const reviews = await prisma.review.findMany({
      where: { productId: product.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, logo: true },
        },
      },
    })

    // Calculate rating stats
    const ratingAgg = await prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: { rating: true },
    })

    // Get related products from same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        published: true,
      },
      take: 6,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nameTr: true,
        nameEn: true,
        slug: true,
        images: true,
        price: true,
        currency: true,
        minOrder: true,
        createdAt: true,
      },
    })

    return successResponse({
      product: {
        ...product,
        averageRating: ratingAgg._avg.rating || 0,
        reviewCount: ratingAgg._count.rating,
        reviews,
      },
      relatedProducts,
    })
  } catch (error) {
    console.error('Get product error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const product = await prisma.product.findUnique({ where: { id: params.id } })
    if (!product) {
      return errorResponse('Ürün bulunamadı', 404)
    }

    if (product.supplierId !== authUser.userId && authUser.role !== 'admin') {
      return unauthorizedResponse('Bu ürünü düzenleme yetkiniz yok')
    }

    const body = await request.json()
    const {
      nameTr, nameEn, categoryId, descriptionTr, descriptionEn,
      images, price, currency, minOrder, unit, moqPrice, stock,
      featured, published, sortOrder,
    } = body

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...(nameTr !== undefined && { nameTr }),
        ...(nameEn !== undefined && { nameEn }),
        ...(categoryId !== undefined && { categoryId }),
        ...(descriptionTr !== undefined && { descriptionTr }),
        ...(descriptionEn !== undefined && { descriptionEn }),
        ...(images !== undefined && { images: serializeImages(images) }),
        ...(price !== undefined && { price: price ? parseFloat(price) : null }),
        ...(currency !== undefined && { currency }),
        ...(minOrder !== undefined && { minOrder: parseInt(minOrder) }),
        ...(unit !== undefined && { unit }),
        ...(moqPrice !== undefined && { moqPrice: moqPrice ? parseFloat(moqPrice) : null }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { published }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
      },
    })

    return successResponse({ product: updated })
  } catch (error) {
    console.error('Update product error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const product = await prisma.product.findUnique({ where: { id: params.id } })
    if (!product) {
      return errorResponse('Ürün bulunamadı', 404)
    }

    if (product.supplierId !== authUser.userId && authUser.role !== 'admin') {
      return unauthorizedResponse('Bu ürünü silme yetkiniz yok')
    }

    await prisma.product.delete({ where: { id: params.id } })
    return successResponse({ message: 'Ürün silindi' })
  } catch (error) {
    console.error('Delete product error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
