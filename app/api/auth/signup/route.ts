import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  hashPassword, generateToken, errorResponse, successResponse,
  validateSignupData,
} from '@/lib/auth'
import { isValidRole, roleLabels } from '@/lib/roles'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role, companyName, phone, city } = body

    const validation = validateSignupData(body)
    if (!validation.valid) {
      return errorResponse(validation.errors.join('. '))
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return errorResponse('Bu e-posta adresi zaten kayitli')
    }

    const userRole = role && isValidRole(role) ? role : 'buyer'
    if (userRole === 'admin') {
      return errorResponse('Admin hesabi olusturulamaz')
    }

    const hashedPassword = await hashPassword(password)

    const userData: any = {
      email,
      password: hashedPassword,
      name,
      role: userRole,
      phone: phone || null,
    }

    if (userRole === 'seller') {
      userData.companyName = companyName || null
      userData.city = city || null
    }

    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        companyName: true,
        phone: true,
        city: true,
        createdAt: true,
      },
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as any,
    })

    return successResponse({
      user,
      token,
      message: `Hesabiniz basariyla olusturuldu. ${roleLabels[user.role as keyof typeof roleLabels] || 'Kullanici'} olarak giris yapabilirsiniz.`,
    }, 201)
  } catch (error) {
    console.error('Signup error:', error)
    return errorResponse('Kayit sirasinda bir hata olustu', 500)
  }
}
