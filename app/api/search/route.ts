import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all' // all, products, suppliers, categories
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!q || q.length < 2) {
      return successResponse({ products: [], suppliers: [], categories: [] })
    }

    const results: any = {}

    if (type === 'all' || type === 'products') {
      results.products = await prisma.product.findMany({
        where: {
          published: true,
          OR: [
            { nameTr: { contains: q, mode: 'insensitive' } },
            { nameEn: { contains: q, mode: 'insensitive' } },
            { descriptionTr: { contains: q, mode: 'insensitive' } },
            { descriptionEn: { contains: q, mode: 'insensitive' } },
          ],
        },
        take: limit,
        select: {
          id: true,
          nameTr: true,
          nameEn: true,
          slug: true,
          price: true,
          currency: true,
          images: true,
          supplier: { select: { id: true, name: true, companyName: true } },
        },
        orderBy: { createdAt: 'desc' },
      })
    }

    if (type === 'all' || type === 'suppliers') {
      results.suppliers = await prisma.user.findMany({
        where: {
          role: 'seller',
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { companyName: { contains: q, mode: 'insensitive' } },
            { city: { contains: q, mode: 'insensitive' } },
          ],
        },
        take: limit,
        select: {
          id: true,
          name: true,
          companyName: true,
          logo: true,
          city: true,
          verified: true,
          _count: { select: { products: { where: { published: true } } } },
        },
      })
    }

    if (type === 'all' || type === 'categories') {
      results.categories = await prisma.category.findMany({
        where: {
          published: true,
          OR: [
            { nameTr: { contains: q, mode: 'insensitive' } },
            { nameEn: { contains: q, mode: 'insensitive' } },
          ],
        },
        take: limit,
        select: {
          id: true,
          nameTr: true,
          nameEn: true,
          slug: true,
          image: true,
          _count: { select: { products: { where: { published: true } } } },
        },
        orderBy: { sortOrder: 'asc' },
      })
    }

    return successResponse(results)
  } catch (error) {
    console.error('Search error:', error)
    return errorResponse('Arama sırasında bir hata oluştu', 500)
  }
}
