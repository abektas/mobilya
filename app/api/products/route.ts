import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'
import { slugify } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const categoryId = searchParams.get('categoryId') || ''
    const categorySlug = searchParams.get('kategori') || ''
    const supplierId = searchParams.get('supplierId') || ''
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const featured = searchParams.get('featured') === 'true'

    const skip = (page - 1) * limit

    const where: any = { published: true }

    if (search) {
      where.OR = [
        { nameTr: { contains: search, mode: 'insensitive' } },
        { nameEn: { contains: search, mode: 'insensitive' } },
        { descriptionTr: { contains: search, mode: 'insensitive' } },
        { descriptionEn: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (categoryId) where.categoryId = categoryId
    if (categorySlug) {
      where.category = { slug: categorySlug }
    }
    if (supplierId) where.supplierId = supplierId
    if (featured) where.featured = true
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    // Build orderBy
    let orderBy: any = { createdAt: 'desc' }
    switch (sortBy) {
      case 'price':
        orderBy = { price: sortOrder as 'asc' | 'desc' }
        break
      case 'rating':
        orderBy = { createdAt: 'desc' } // Would need aggregation
        break
      case 'popular':
        orderBy = { createdAt: 'desc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: sortOrder as 'asc' | 'desc' }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
              companyName: true,
              city: true,
              verified: true,
              logo: true,
            },
          },
          category: {
            select: {
              id: true,
              nameTr: true,
              nameEn: true,
              slug: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              favorites: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ])

    // Calculate average rating for each product
    const productsWithRating = await Promise.all(
      products.map(async (product) => {
        const ratingResult = await prisma.review.aggregate({
          where: { productId: product.id },
          _avg: { rating: true },
          _count: { rating: true },
        })
        return {
          ...product,
          averageRating: ratingResult._avg.rating || 0,
          reviewCount: ratingResult._count.rating,
        }
      })
    )

    return successResponse({
      products: productsWithRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + limit < total,
      },
    })
  } catch (error) {
    console.error('Get products error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }
    if (authUser.role !== 'seller' && authUser.role !== 'admin') {
      return unauthorizedResponse('Bu işlem için satıcı yetkisi gerekli')
    }

    const body = await request.json()
    const {
      nameTr, nameEn, categoryId, descriptionTr, descriptionEn,
      images, price, currency, minOrder, unit, moqPrice, stock,
    } = body

    if (!nameTr || !nameEn || !categoryId) {
      return errorResponse('Ürün adı (TR/EN) ve kategori zorunludur')
    }

    const productSlug = slugify(nameTr) + '-' + Date.now().toString(36)

    const product = await prisma.product.create({
      data: {
        nameTr,
        nameEn,
        slug: productSlug,
        supplierId: authUser.userId,
        categoryId,
        descriptionTr: descriptionTr || '',
        descriptionEn: descriptionEn || '',
        images: images || [],
        price: price ? parseFloat(price) : null,
        currency: currency || 'TRY',
        minOrder: minOrder ? parseInt(minOrder) : 1,
        unit: unit || 'adet',
        moqPrice: moqPrice ? parseFloat(moqPrice) : null,
        stock: stock ? parseInt(stock) : 0,
      },
      include: {
        category: {
          select: { id: true, nameTr: true, nameEn: true, slug: true },
        },
      },
    })

    return successResponse({ product }, 201)
  } catch (error) {
    console.error('Create product error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
