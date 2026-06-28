import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, errorResponse, successResponse } from '@/lib/auth'

export async function GET() {
  try {
    const verifications = await prisma.supplierVerification.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true, companyName: true, phone: true, city: true, verified: true },
        },
      },
    })
    return successResponse({ verifications })
  } catch (error) {
    console.error('Get verifications error:', error)
    return errorResponse('Hata', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = requireAdmin(request)
    if (auth.response) return auth.response

    const { id, status, reviewedBy } = await request.json()
    if (!id || !status) return errorResponse('ID ve durum zorunlu')

    const verification = await prisma.supplierVerification.update({
      where: { id },
      data: { status, reviewedBy: auth.user?.userId, reviewedAt: new Date() },
    })

    // If approved, mark user as verified
    if (status === 'APPROVED') {
      await prisma.user.update({
        where: { id: verification.userId },
        data: { verified: true },
      })
    }

    return successResponse({ verification })
  } catch (error) {
    console.error('Update verification error:', error)
    return errorResponse('Hata', 500)
  }
}
