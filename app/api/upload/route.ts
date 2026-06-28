import { NextRequest } from 'next/server'
import { getAuthenticatedUser, unauthorizedResponse, errorResponse, successResponse } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request)
    if (!authUser) {
      return unauthorizedResponse()
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return errorResponse('Dosya seçilmedi')
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return errorResponse('Dosya boyutu 5MB\'dan küçük olmalıdır')
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return errorResponse('Yalnızca JPEG, PNG, WebP, GIF ve SVG dosyaları yüklenebilir')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${randomUUID()}.${ext}`
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filepath = join(uploadDir, filename)

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true })

    // Save file
    await writeFile(filepath, buffer)

    // Return URL
    const url = `/uploads/${filename}`

    return successResponse({
      url,
      filename,
      size: file.size,
      type: file.type,
    }, 201)
  } catch (error) {
    console.error('Upload error:', error)
    return errorResponse('Dosya yüklenirken bir hata oluştu', 500)
  }
}
