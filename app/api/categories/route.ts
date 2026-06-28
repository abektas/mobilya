import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'
import { slugify } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parentId = searchParams.get('parentId')
    const includeChildren = searchParams.get('includeChildren') === 'true'

    const where: any = { published: true }
    if (parentId === 'null') {
      where.parentId = null
    } else if (parentId) {
      where.parentId = parentId
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: {
        ...(includeChildren ? {
          children: {
            where: { published: true },
            orderBy: { sortOrder: 'asc' },
          },
        } : {}),
        _count: {
          select: { products: true },
        },
      },
    })

    return successResponse({ categories })
  } catch (error) {
    console.error('Get categories error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }
    if (authUser.role !== 'admin') {
      return unauthorizedResponse('Bu işlem için admin yetkisi gerekli')
    }

    const body = await request.json()
    const { nameTr, nameEn, slug, descriptionTr, descriptionEn, image, icon, parentId, sortOrder } = body

    if (!nameTr || !nameEn) {
      return errorResponse('Türkçe ve İngilizce ad alanları zorunludur')
    }

    const categorySlug = slug || slugify(nameTr)

    const existing = await prisma.category.findUnique({ where: { slug: categorySlug } })
    if (existing) {
      return errorResponse('Bu slug ile bir kategori zaten mevcut')
    }

    const category = await prisma.category.create({
      data: {
        nameTr,
        nameEn,
        slug: categorySlug,
        descriptionTr: descriptionTr || null,
        descriptionEn: descriptionEn || null,
        image: image || null,
        icon: icon || null,
        parentId: parentId || null,
        sortOrder: sortOrder || 0,
      },
    })

    return successResponse({ category }, 201)
  } catch (error) {
    console.error('Create category error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
