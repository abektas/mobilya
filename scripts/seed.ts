import { prisma } from '../lib/prisma'
import { hashPassword } from '../lib/auth'

async function seed() {
  console.log('🌱 Seed basliyor...')

  // Admin hesabi
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@mobilyapazar.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'

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
    console.log(`✅ Admin hesabi olusturuldu: ${adminEmail} / ${adminPassword}`)
  } else {
    console.log(`ℹ️ Admin hesabi zaten var: ${adminEmail}`)
  }

  // Ornek satici hesabi
  const sellerEmail = 'satici@ornek.com'
  const sellerPassword = 'Seller123!'

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
        about: '20 yillik mobilya ureticisi. En kaliteli urunleri en uygun fiyata sunuyoruz.',
        founded: 2005,
        employeeCount: 50,
        verified: true,
      },
    })
    console.log(`✅ Ornek satici hesabi olusturuldu: ${sellerEmail} / ${sellerPassword}`)
  }

  // Ornek alici hesabi
  const buyerEmail = 'alici@ornek.com'
  const buyerPassword = 'Buyer123!'

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
    console.log(`✅ Ornek alici hesabi olusturuldu: ${buyerEmail} / ${buyerPassword}`)
  }

  // Ornek kategoriler
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
  console.log('')
  console.log('📋 Hesap Bilgileri:')
  console.log('   Admin: admin@mobilyapazar.com / Admin123!')
  console.log('   Satici: satici@ornek.com / Seller123!')
  console.log('   Alici: alici@ornek.com / Buyer123!')
}

seed()
  .catch((e) => {
    console.error('Seed hatasi:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
