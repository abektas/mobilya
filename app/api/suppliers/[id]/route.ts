import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const supplier = await prisma.user.findFirst({
      where: {
        id: id,
        role: 'seller',
      },
      select: {
        id: true,
        name: true,
        companyName: true,
        logo: true,
        about: true,
        city: true,
        phone: true,
        email: true,
        verified: true,
        founded: true,
        employeeCount: true,
        createdAt: true,
        _count: {
          select: {
            products: { where: { published: true } },
          },
        },
      },
    })

    if (!supplier) {
      return errorResponse('Tedarikçi bulunamadı', 404)
    }

    // Get supplier's products
    const products = await prisma.product.findMany({
      where: {
        supplierId: id,
        published: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        category: {
          select: { id: true, nameTr: true, nameEn: true, slug: true },
        },
        _count: {
          select: { reviews: true },
        },
      },
    })

    // Get reviews for supplier's products
    const productIds = products.map(p => p.id)
    const reviews = await prisma.review.findMany({
      where: {
        productId: { in: productIds },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        user: {
          select: { id: true, name: true, logo: true },
        },
        product: {
          select: { id: true, nameTr: true, nameEn: true, slug: true },
        },
      },
    })

    // Calculate average rating
    const ratingAgg = await prisma.review.aggregate({
      where: {
        productId: { in: productIds },
      },
      _avg: { rating: true },
      _count: { rating: true },
    })

    return successResponse({
      supplier: {
        ...supplier,
        averageRating: ratingAgg._avg.rating || 0,
        totalReviews: ratingAgg._count.rating,
      },
      products,
      recentReviews: reviews,
    })
  } catch (error) {
    console.error('Get supplier error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
