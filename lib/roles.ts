// ============================================================
// ROLE-BASED ACCESS CONTROL (RBAC)
// ============================================================

export type UserRole = 'buyer' | 'seller' | 'admin'

export interface RolePermissions {
  canCreateProducts: boolean
  canEditProducts: boolean
  canDeleteProducts: boolean
  canCreateRFQ: boolean
  canQuoteRFQ: boolean
  canManageCategories: boolean
  canManageUsers: boolean
  canManageOrders: boolean
  canManageSiteContent: boolean
  canViewDashboard: boolean
  canViewAdminPanel: boolean
  canManageAllOrders: boolean
  canManageAllProducts: boolean
  canManageAllRFQs: boolean
  canViewAnalytics: boolean
  canVerifySuppliers: boolean
  canContactSupplier: boolean
  canReviewProducts: boolean
  canAddFavorites: boolean
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  buyer: {
    canCreateProducts: false, canEditProducts: false, canDeleteProducts: false,
    canCreateRFQ: true, canQuoteRFQ: false,
    canManageCategories: false, canManageUsers: false, canManageOrders: false,
    canManageSiteContent: false, canViewDashboard: true, canViewAdminPanel: false,
    canManageAllOrders: false, canManageAllProducts: false, canManageAllRFQs: false,
    canViewAnalytics: false, canVerifySuppliers: false,
    canContactSupplier: true, canReviewProducts: true, canAddFavorites: true,
  },
  seller: {
    canCreateProducts: true, canEditProducts: true, canDeleteProducts: true,
    canCreateRFQ: true, canQuoteRFQ: true,
    canManageCategories: false, canManageUsers: false, canManageOrders: true,
    canManageSiteContent: false, canViewDashboard: true, canViewAdminPanel: false,
    canManageAllOrders: false, canManageAllProducts: false, canManageAllRFQs: false,
    canViewAnalytics: true, canVerifySuppliers: false,
    canContactSupplier: true, canReviewProducts: false, canAddFavorites: true,
  },
  admin: {
    canCreateProducts: true, canEditProducts: true, canDeleteProducts: true,
    canCreateRFQ: true, canQuoteRFQ: true,
    canManageCategories: true, canManageUsers: true, canManageOrders: true,
    canManageSiteContent: true, canViewDashboard: true, canViewAdminPanel: true,
    canManageAllOrders: true, canManageAllProducts: true, canManageAllRFQs: true,
    canViewAnalytics: true, canVerifySuppliers: true,
    canContactSupplier: true, canReviewProducts: true, canAddFavorites: true,
  },
}

export const roleLabels: Record<UserRole, string> = {
  buyer: 'Alıcı',
  seller: 'Satıcı',
  admin: 'Admin',
}

export const roleDescriptions: Record<UserRole, string> = {
  buyer: 'Ürün satın almak isteyen kullanıcılar',
  seller: 'Ürünlerini platformda satmak isteyen tedarikçiler',
  admin: 'Platformu yöneten yetkili kullanıcılar',
}

export function getPermissions(role: UserRole): RolePermissions {
  return rolePermissions[role] || rolePermissions.buyer
}

export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  return getPermissions(role)[permission] === true
}

export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'admin': return '/admin'
    case 'seller': return '/satici/panel'
    case 'buyer': return '/alici/panel'
    default: return '/'
  }
}

export function getDefaultRegistrationFields(role: UserRole): string[] {
  const common = ['email', 'password', 'name']
  const sellerFields = ['companyName', 'phone', 'city']
  const buyerFields = ['phone']
  switch (role) {
    case 'seller': return [...common, ...sellerFields]
    case 'buyer': return [...common, ...buyerFields]
    default: return common
  }
}

export const validRoles: UserRole[] = ['buyer', 'seller', 'admin']

export function isValidRole(role: string): role is UserRole {
  return validRoles.includes(role as UserRole)
}

export function getAdminEmails(): string[] {
  const envAdmins = process.env.ADMIN_EMAILS
  if (envAdmins) return envAdmins.split(',').map(e => e.trim().toLowerCase())
  return ['admin@mobilyapazar.com']
}

export function isAdmin(role: string): boolean { return role === 'admin' }
export function isSeller(role: string): boolean { return role === 'seller' }
export function isBuyer(role: string): boolean { return role === 'buyer' }
export function isSellerOrAbove(role: string): boolean { return role === 'seller' || role === 'admin' }
export function hasRole(userRole: string, requiredRole: UserRole): boolean { return userRole === requiredRole }

const roleHierarchy: Record<UserRole, number> = { buyer: 0, seller: 1, admin: 2 }

export function hasMinimumRole(userRole: string, minimumRole: UserRole): boolean {
  const userLevel = roleHierarchy[userRole as UserRole] ?? -1
  const requiredLevel = roleHierarchy[minimumRole]
  return userLevel >= requiredLevel
}


export function hasAllPermissions(role: UserRole, permissions: (keyof RolePermissions)[]): boolean {
  return permissions.every(p => hasPermission(role, p))
}

export function hasAnyPermission(role: UserRole, permissions: (keyof RolePermissions)[]): boolean {
  return permissions.some(p => hasPermission(role, p))
}


