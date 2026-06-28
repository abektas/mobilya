import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'
import { getPermissions, getDashboardRoute, roleLabels } from '@/lib/roles'
import type { UserRole } from '@/lib/roles'

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        companyName: true,
        logo: true,
        about: true,
        city: true,
        founded: true,
        employeeCount: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            products: { where: { published: true } },
            favorites: true,
            rfqs: true,
            orders: true,
            messages: { where: { receiverId: authUser.userId, read: false } },
          },
        },
      },
    })

    if (!user) {
      return errorResponse('Kullanici bulunamadi', 404)
    }

    // Role bazli ek bilgiler
    const role = user.role as UserRole
    const permissions = getPermissions(role)
    const roleLabel = roleLabels[role] || 'Kullanici'
    const dashboardRoute = getDashboardRoute(role)

    return successResponse({
      user: {
        ...user,
        roleLabel,
        dashboardRoute,
        permissions,
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    return errorResponse('Bir hata olustu', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { name, phone, companyName, about, city, founded, employeeCount } = body

    const user = await prisma.user.update({
      where: { id: authUser.userId },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(companyName !== undefined && { companyName }),
        ...(about !== undefined && { about }),
        ...(city !== undefined && { city }),
        ...(founded !== undefined && { founded: Number(founded) }),
        ...(employeeCount !== undefined && { employeeCount: Number(employeeCount) }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        companyName: true,
        logo: true,
        about: true,
        city: true,
        founded: true,
        employeeCount: true,
        verified: true,
      },
    })

    return successResponse({ user })
  } catch (error) {
    console.error('Update user error:', error)
    return errorResponse('Bir hata oluştu', 500)
  }
}
