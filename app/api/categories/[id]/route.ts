import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: {
          where: { published: true },
          orderBy: { sortOrder: 'asc' },
        },
        _count: {
          select: { products: true },
        },
      },
    })

    if (!category) {
      return errorResponse('Kategori bulunamadı', 404)
    }

    return successResponse({ category })
  } catch (error) {
    console.error('Get category error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser || authUser.role !== 'admin') {
      return unauthorizedResponse('Bu işlem için admin yetkisi gerekli')
    }

    const body = await request.json()
    const { nameTr, nameEn, descriptionTr, descriptionEn, image, icon, parentId, sortOrder, published } = body

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        ...(nameTr !== undefined && { nameTr }),
        ...(nameEn !== undefined && { nameEn }),
        ...(descriptionTr !== undefined && { descriptionTr }),
        ...(descriptionEn !== undefined && { descriptionEn }),
        ...(image !== undefined && { image }),
        ...(icon !== undefined && { icon }),
        ...(parentId !== undefined && { parentId }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(published !== undefined && { published }),
      },
    })

    return successResponse({ category })
  } catch (error) {
    console.error('Update category error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser || authUser.role !== 'admin') {
      return unauthorizedResponse('Bu işlem için admin yetkisi gerekli')
    }

    // Check if category has products
    const productCount = await prisma.product.count({ where: { categoryId: params.id } })
    if (productCount > 0) {
      return errorResponse(`Bu kategoride ${productCount} ürün bulunuyor. Önce ürünleri taşıyın veya silin.`)
    }

    await prisma.category.delete({ where: { id: params.id } })
    return successResponse({ message: 'Kategori silindi' })
  } catch (error) {
    console.error('Delete category error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
