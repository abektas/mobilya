import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { errorResponse, successResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, subject, message, locale } = body

    if (!name || !email || !subject || !message) {
      return errorResponse('Ad, e-posta, konu ve mesaj alanları zorunludur')
    }

    // Basit e-posta doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return errorResponse('Geçerli bir e-posta adresi giriniz')
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
        locale: locale || 'tr',
      },
    })

    // TODO: Send email notification to admin
    // await sendEmail({ ... })

    return successResponse({
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      submission: {
        id: submission.id,
        createdAt: submission.createdAt,
      },
    }, 201)
  } catch (error) {
    console.error('Contact form error:', error)
    return errorResponse('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 500)
  }
}
