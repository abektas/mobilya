import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword, generateToken, errorResponse, successResponse } from '@/lib/auth'
import { getDashboardRoute, roleLabels } from '@/lib/roles'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return errorResponse('E-posta ve sifre zorunludur')
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return errorResponse('E-posta veya sifre hatali')
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return errorResponse('E-posta veya sifre hatali')
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as any,
    })

    const roleLabel = roleLabels[user.role as keyof typeof roleLabels] || 'Kullanici'
    const dashboardRoute = getDashboardRoute(user.role as any)

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        roleLabel,
        companyName: user.companyName,
        phone: user.phone,
        logo: user.logo,
        city: user.city,
        verified: user.verified,
        dashboardRoute,
      },
      token,
      message: `Hos geldiniz, ${user.name}! ${roleLabel} panelinize yonlendiriliyorsunuz.`,
    })
  } catch (error) {
    console.error('Login error:', error)
    return errorResponse('Giris sirasinda bir hata olustu', 500)
  }
}
