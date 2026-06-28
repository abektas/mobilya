import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const city = searchParams.get('city') || ''
    const verified = searchParams.get('verified')

    const skip = (page - 1) * limit

    const where: any = {
      role: 'seller',
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
        { about: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (city) where.city = city
    if (verified === 'true') where.verified = true

    const [suppliers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          companyName: true,
          logo: true,
          about: true,
          city: true,
          verified: true,
          createdAt: true,
          _count: {
            select: {
              products: { where: { published: true } },
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ])

    return successResponse({
      suppliers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + limit < total,
      },
    })
  } catch (error) {
    console.error('Get suppliers error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
