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
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit
    const conversationWith = searchParams.get('with')

    let messages

    if (conversationWith) {
      messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: authUser.userId, receiverId: conversationWith },
            { senderId: conversationWith, receiverId: authUser.userId },
          ],
        },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
        include: {
          sender: { select: { id: true, name: true, logo: true } },
          product: { select: { id: true, nameTr: true, nameEn: true, slug: true, images: true } },
        },
      })
    } else {
      // Get last message of each conversation
      const sentIds = await prisma.message.findMany({
        where: { senderId: authUser.userId },
        select: { receiverId: true },
        distinct: ['receiverId'],
      })
      const receivedIds = await prisma.message.findMany({
        where: { receiverId: authUser.userId },
        select: { senderId: true },
        distinct: ['senderId'],
      })

      const userIds = new Set([
        ...sentIds.map(m => m.receiverId),
        ...receivedIds.map(m => m.senderId),
      ])

      const conversations = await Promise.all(
        Array.from(userIds).map(async (userId) => {
          const lastMessage = await prisma.message.findFirst({
            where: {
              OR: [
                { senderId: authUser.userId, receiverId: userId },
                { senderId: userId, receiverId: authUser.userId },
              ],
            },
            orderBy: { createdAt: 'desc' },
            include: {
              sender: { select: { id: true, name: true, logo: true } },
            },
          })
          const unreadCount = await prisma.message.count({
            where: { senderId: userId, receiverId: authUser.userId, read: false },
          })
          const otherUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, logo: true, companyName: true },
          })
          return { lastMessage, unreadCount, otherUser }
        })
      )

      conversations.sort((a, b) => {
        if (!a.lastMessage) return 1
        if (!b.lastMessage) return -1
        return b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime()
      })

      return successResponse({ conversations })
    }

    return successResponse({ messages })
  } catch (error) {
    console.error('Get messages error:', error)
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
    const { receiverId, subject, content, productId } = body

    if (!receiverId || !content) {
      return errorResponse('Alıcı ve mesaj içeriği zorunludur')
    }

    const message = await prisma.message.create({
      data: {
        senderId: authUser.userId,
        receiverId,
        subject: subject || '',
        content,
        productId: productId || null,
      },
      include: {
        sender: { select: { id: true, name: true, logo: true } },
        product: { select: { id: true, nameTr: true, nameEn: true, slug: true } },
      },
    })

    return successResponse({ message }, 201)
  } catch (error) {
    console.error('Create message error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { messageId } = body

    if (!messageId) {
      return errorResponse('Mesaj ID zorunludur')
    }

    const message = await prisma.message.findUnique({ where: { id: messageId } })
    if (!message || message.receiverId !== authUser.userId) {
      return errorResponse('Mesaj bulunamadı', 404)
    }

    const updated = await prisma.message.update({
      where: { id: messageId },
      data: { read: true },
    })

    return successResponse({ message: updated })
  } catch (error) {
    console.error('Mark message read error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
