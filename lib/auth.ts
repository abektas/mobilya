import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import type { UserRole, RolePermissions } from './roles'
import {
  hasPermission as checkPermission,
  isAdmin,
  isSeller,
  hasMinimumRole,
  roleLabels,
} from './roles'

import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'mobilya-marketplace-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  // Also check cookies
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim())
    const tokenCookie = cookies.find(c => c.startsWith('token='))
    if (tokenCookie) {
      return tokenCookie.slice(6)
    }
  }
  return null
}

export function getAuthenticatedUser(request: Request): JWTPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null
  return verifyToken(token)
}

export function unauthorizedResponse(message = 'Yetkilendirme gerekli') {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  )
}

export function forbiddenResponse(message = 'Bu işlem için yetkiniz yok') {
  return NextResponse.json(
    { error: message },
    { status: 403 }
  )
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json({ error }, { status })
}

export function successResponse(data: any, status = 200) {
  return NextResponse.json(data, { status })
}

// ==================== Rol Kontrol Fonksiyonlari ====================

export function requireRole(userRole: string, requiredRole: UserRole): boolean {
  return userRole === requiredRole
}

export function requireMinimumRole(userRole: string, minimumRole: UserRole): boolean {
  return hasMinimumRole(userRole, minimumRole)
}

export function requirePermission(userRole: UserRole, permission: keyof RolePermissions): boolean {
  return checkPermission(userRole, permission)
}

export function authenticateAndAuthorize(
  request: Request,
  allowedRoles: UserRole[]
): { authorized: boolean; user: JWTPayload | null; response: NextResponse | null } {
  const user = getAuthenticatedUser(request)
  if (!user) {
    return { authorized: false, user: null, response: unauthorizedResponse('Lutfen giris yapin') }
  }
  const hasAccess = allowedRoles.some(role => user.role === role)
  if (!hasAccess) {
    return {
      authorized: false, user,
      response: forbiddenResponse(`Bu islem icin ${allowedRoles.map(r => roleLabels[r]).join(' veya ')} yetkisi gerekli`),
    }
  }
  return { authorized: true, user, response: null }
}

export function requireAdmin(request: Request): { user: JWTPayload | null; response: NextResponse | null } {
  const user = getAuthenticatedUser(request)
  if (!user) return { user: null, response: unauthorizedResponse() }
  if (!isAdmin(user.role)) return { user, response: forbiddenResponse('Admin yetkisi gerekli') }
  return { user, response: null }
}

export function requireSellerOrAdmin(request: Request): { user: JWTPayload | null; response: NextResponse | null } {
  const user = getAuthenticatedUser(request)
  if (!user) return { user: null, response: unauthorizedResponse() }
  if (!isSeller(user.role) && !isAdmin(user.role)) {
    return { user, response: forbiddenResponse('Satici veya admin yetkisi gerekli') }
  }
  return { user, response: null }
}

export function validateSignupData(body: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const { email, password, name, role } = body
  if (!email || !email.includes('@')) errors.push('Gecerli bir e-posta adresi giriniz')
  if (!password || password.length < 6) errors.push('Sifre en az 6 karakter olmalidir')
  if (!name || name.length < 2) errors.push('Ad en az 2 karakter olmalidir')
  if (role && !['buyer', 'seller'].includes(role)) errors.push('Gecersiz hesap turu')
  return { valid: errors.length === 0, errors }
}

export async function ensureAdminExists() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mobilyapazar.com'
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD env degiskeni tanimli degil, admin hesabi olusturulamadi.')
    return
  }
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    const hashedPw = await hashPassword(adminPassword)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPw,
        name: 'Admin',
        role: 'admin',
        companyName: 'Mobilya Pazar Yeri',
      },
    })
    console.log('Admin hesabi olusturuldu: ' + adminEmail)
  }
}

