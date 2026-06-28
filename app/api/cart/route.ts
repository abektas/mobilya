import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'
import { parseImages } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) return unauthorizedResponse()

    let cart = await prisma.cart.findUnique({
      where: { userId: authUser.userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true, nameTr: true, nameEn: true, slug: true,
                price: true, currency: true, images: true,
                minOrder: true, stock: true, unit: true,
              },
            },
          },
        },
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: authUser.userId },
        include: { items: { include: { product: { select: { id: true, nameTr: true, nameEn: true, slug: true, price: true, currency: true, images: true, minOrder: true, stock: true, unit: true } } } } },
      })
    }

    // Parse images for each product
    const items = cart.items.map(item => ({
      ...item,
      product: item.product ? { ...item.product, images: parseImages(item.product.images) } : null,
    }))

    return successResponse({ cart: { ...cart, items }, itemCount: items.reduce((s, i) => s + i.quantity, 0) })
  } catch (error) {
    console.error('Get cart error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) return unauthorizedResponse()

    const { productId, quantity } = await request.json()
    if (!productId) return errorResponse('Ürün ID zorunludur')

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) return errorResponse('Ürün bulunamadı', 404)

    const qty = Math.max(1, parseInt(quantity) || 1)

    // Get or create cart
    let cart = await prisma.cart.findUnique({ where: { userId: authUser.userId } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: authUser.userId } })
    }

    // Check if product already in cart
    const existing = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    })

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + qty },
      })
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity: qty },
      })
    }

    return successResponse({ message: 'Ürün sepete eklendi' }, 201)
  } catch (error) {
    console.error('Add to cart error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) return unauthorizedResponse()

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const clearAll = searchParams.get('clear') === 'true'

    const cart = await prisma.cart.findUnique({ where: { userId: authUser.userId } })
    if (!cart) return errorResponse('Sepet bulunamadı', 404)

    if (clearAll) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    } else if (productId) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      })
    }

    return successResponse({ message: 'Sepet güncellendi' })
  } catch (error) {
    console.error('Cart delete error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) return unauthorizedResponse()

    const { productId, quantity } = await request.json()
    if (!productId || !quantity) return errorResponse('Ürün ID ve miktar zorunludur')

    const cart = await prisma.cart.findUnique({ where: { userId: authUser.userId } })
    if (!cart) return errorResponse('Sepet bulunamadı', 404)

    if (parseInt(quantity) <= 0) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } })
    } else {
      await prisma.cartItem.updateMany({
        where: { cartId: cart.id, productId },
        data: { quantity: parseInt(quantity) },
      })
    }

    return successResponse({ message: 'Sepet güncellendi' })
  } catch (error) {
    console.error('Cart update error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
