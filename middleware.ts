// ============================================================
// MIDDLEWARE - Role Tabanlı Rota Koruması
// ============================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'
import type { UserRole } from '@/lib/roles'

// Rota tanımları: hangi roller hangi sayfalara erişebilir
const protectedRoutes: Record<string, { roles: UserRole[], redirect?: string }> = {
  // Admin sayfaları
  '/admin': { roles: ['admin'], redirect: '/giris' },
  '/admin/': { roles: ['admin'], redirect: '/giris' },

  // Satıcı sayfaları
  '/satici': { roles: ['seller', 'admin'], redirect: '/giris' },
  '/satici/': { roles: ['seller', 'admin'], redirect: '/giris' },

  // Alıcı sayfaları
  '/alici': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
  '/alici/': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },

  // Dashboard (role göre yönlendirme)
  '/panel': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
  '/panel/': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },

  // Profil sayfası
  '/profil': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
  '/profil/': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },

  // Siparişlerim
  '/siparislerim': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
  '/siparislerim/': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },

  // Favorilerim
  '/favorilerim': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
  '/favorilerim/': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },

  // Mesajlar
  '/mesajlar': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
  '/mesajlar/': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },

  // Tekliflerim
  '/tekliflerim': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
  '/tekliflerim/': { roles: ['buyer', 'seller', 'admin'], redirect: '/giris' },
}

// Herkesin erişebileceği public sayfalar
const publicRoutes = [
  '/', '/giris', '/kayit', '/sifre-unuttum',
  '/urunler', '/urun/', '/tedarikciler', '/tedarikci/',
  '/hakkimizda', '/iletisim', '/sss',
  '/gizlilik-politikasi', '/kullanim-kosullari',
  '/teklif-iste', '/satici-ol',
  '/kategoriler',
]

// API route koruması (opsiyonel - API route'lar kendi içinde kontrol ediyor)
const protectedApiRoutes = [
  '/api/admin/',
  '/api/auth/me',
  '/api/orders',
  '/api/messages',
  '/api/favorites',
  '/api/reviews',
  '/api/rfqs',
  '/api/upload',
]

// Token'ı cookie'den okur
function getTokenFromCookies(request: NextRequest): string | null {
  const tokenCookie = request.cookies.get('token')
  return tokenCookie?.value || null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Statik dosyaları ve _next'i geç
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/favicon') ||
    pathname === '/favicon.svg'
  ) {
    return NextResponse.next()
  }

  // Public route'ları kontrol et
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(route)
  )
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Token'ı al
  const token = getTokenFromCookies(request) ||
    request.headers.get('authorization')?.replace('Bearer ', '') || null

  // Token yoksa login sayfasına yönlendir
  if (!token) {
    // API isteklerinde 401 dön
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }
    // Sayfa isteklerinde login'e yönlendir
    const loginUrl = new URL('/giris', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Token'ı doğrula
  const payload = verifyToken(token)
  if (!payload) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Geçersiz token', code: 'INVALID_TOKEN' },
        { status: 401 }
      )
    }
    const response = NextResponse.redirect(new URL('/giris', request.url))
    response.cookies.delete('token')
    return response
  }

  // Role dayalı rota kontrolü
  const matchedRoute = Object.entries(protectedRoutes).find(([route]) =>
    pathname === route || pathname.startsWith(route)
  )

  if (matchedRoute) {
    const [, config] = matchedRoute
    const userRole = payload.role as UserRole

    if (!config.roles.includes(userRole)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Bu işlem için yetkiniz yok', code: 'FORBIDDEN' },
          { status: 403 }
        )
      }
      // Yetkisiz sayfa - dashboard'a yönlendir
      const roleRoute = userRole === 'admin' ? '/admin' :
                        userRole === 'seller' ? '/satici/panel' : '/alici/panel'
      return NextResponse.redirect(new URL(roleRoute, request.url))
    }
  }

  // API route koruması
  const isProtectedApi = protectedApiRoutes.some(route =>
    pathname.startsWith(route)
  )
  if (isProtectedApi && !payload) {
    return NextResponse.json(
      { error: 'Yetkilendirme gerekli' },
      { status: 401 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Tüm routeları izle, statik dosyalar hariç
    '/((?!_next/static|_next/image|favicon.ico|favicon.svg).*)',
  ],
}
