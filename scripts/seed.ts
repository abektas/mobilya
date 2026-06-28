import { prisma } from '../lib/prisma'
import { hashPassword } from '../lib/auth'
import crypto from 'crypto'

function generatePassword(): string {
  return crypto.randomBytes(16).toString('base64url').slice(0, 20) + 'Aa1!'
}

async function seed() {
  console.log('🌱 Seed basliyor...')

  // Admin hesabi - sifre sadece env'den alinir, yoksa rastgele uretilir
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mobilyapazar.com'
  const adminPassword = process.env.ADMIN_PASSWORD || generatePassword()

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    const hashedPw = await hashPassword(adminPassword)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPw,
        name: 'Admin',
        role: 'admin',
        companyName: 'Mobilya Pazar Yeri',
        phone: '+90 555 000 00 00',
        city: 'Istanbul',
        verified: true,
      },
    })
    console.log(`✅ Admin hesabi olusturuldu: ${adminEmail}`)
    console.log(`   ⚠️  Sifre (bir kere gosterilir): ${adminPassword}`)
    console.log(`   Bu sifreyi not alin. Bir daha goruntulenemez.`)
  } else {
    console.log(`ℹ️ Admin hesabi zaten var: ${adminEmail}`)
  }

  // Ornek satici hesabi - rastgele sifre
  const sellerEmail = 'satici@ornek.com'
  const sellerPassword = generatePassword()

  const existingSeller = await prisma.user.findUnique({ where: { email: sellerEmail } })
  if (!existingSeller) {
    const hashedPw = await hashPassword(sellerPassword)
    await prisma.user.create({
      data: {
        email: sellerEmail,
        password: hashedPw,
        name: 'Ahmet Yilmaz',
        role: 'seller',
        companyName: 'Mobilya Sanayi A.S.',
        phone: '+90 555 111 22 33',
        city: 'Bursa',
        about: '20 yillik mobilya ureticisi.',
        founded: 2005,
        employeeCount: 50,
        verified: true,
      },
    })
    console.log(`✅ Ornek satici hesabi olusturuldu: ${sellerEmail}`)
    console.log(`   ⚠️  Sifre: ${sellerPassword}`)
  }

  // Ornek alici hesabi - rastgele sifre
  const buyerEmail = 'alici@ornek.com'
  const buyerPassword = generatePassword()

  const existingBuyer = await prisma.user.findUnique({ where: { email: buyerEmail } })
  if (!existingBuyer) {
    const hashedPw = await hashPassword(buyerPassword)
    await prisma.user.create({
      data: {
        email: buyerEmail,
        password: hashedPw,
        name: 'Ayse Demir',
        role: 'buyer',
        phone: '+90 555 222 33 44',
        companyName: 'Dekorasyon Evim Ltd.',
        city: 'Ankara',
      },
    })
    console.log(`✅ Ornek alici hesabi olusturuldu: ${buyerEmail}`)
    console.log(`   ⚠️  Sifre: ${buyerPassword}`)
  }

  // Kategoriler
  const categoryData = [
    { nameTr: 'Oturma Odasi', nameEn: 'Living Room', slug: 'oturma-odasi', sortOrder: 1 },
    { nameTr: 'Yatak Odasi', nameEn: 'Bedroom', slug: 'yatak-odasi', sortOrder: 2 },
    { nameTr: 'Yemek Odasi', nameEn: 'Dining Room', slug: 'yemek-odasi', sortOrder: 3 },
    { nameTr: 'Ofis Mobilyalari', nameEn: 'Office Furniture', slug: 'ofis-mobilyalari', sortOrder: 4 },
    { nameTr: 'Mutfak Mobilyalari', nameEn: 'Kitchen Furniture', slug: 'mutfak-mobilyalari', sortOrder: 5 },
    { nameTr: 'Bahce Mobilyalari', nameEn: 'Garden Furniture', slug: 'bahce-mobilyalari', sortOrder: 6 },
    { nameTr: 'Banyo Mobilyalari', nameEn: 'Bathroom Furniture', slug: 'banyo-mobilyalari', sortOrder: 7 },
    { nameTr: 'Cocuk Mobilyalari', nameEn: "Children's Furniture", slug: 'cocuk-mobilyalari', sortOrder: 8 },
    { nameTr: 'Aydinlatma', nameEn: 'Lighting', slug: 'aydinlatma', sortOrder: 9 },
    { nameTr: 'Mobilya Aksesuarlari', nameEn: 'Furniture Accessories', slug: 'mobilya-aksesuarlari', sortOrder: 10 },
  ]

  for (const cat of categoryData) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } })
    if (!existing) {
      await prisma.category.create({ data: cat })
      console.log(`✅ Kategori olusturuldu: ${cat.nameTr}`)
    }
  }

  console.log('🎉 Seed tamamlandi!')
}

seed()
  .catch((e) => {
    console.error('Seed hatasi:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
