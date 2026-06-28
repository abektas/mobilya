import fs from 'fs';
const fp = 'C:/Users/alibe/Desktop/mobilya/prisma/schema.prisma';
const p2 = `

model PriceTier {
  id String @id @default(cuid())
  productId String product Product @relation(fields: [productId], references: [id])
  minQuantity Int maxQuantity Int? pricePerUnit Float
  createdBy String createdByUser User @relation(fields: [createdBy], references: [id])
  createdAt DateTime @default(now()) updatedAt DateTime @updatedAt
  @@index([productId]) @@index([minQuantity])
}

model Favorite {
  id String @id @default(cuid())
  userId String user User @relation(fields: [userId], references: [id])
  productId String product Product @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
  @@unique([userId, productId]) @@index([userId])
}

model Review {
  id String @id @default(cuid())
  userId String user User @relation(fields: [userId], references: [id])
  productId String product Product @relation(fields: [productId], references: [id])
  rating Int comment String? createdAt DateTime @default(now())
  @@index([productId]) @@index([userId])
}

model RFQ {
  id String @id @default(cuid())
  buyerId String buyer User @relation(fields: [buyerId], references: [id])
  title String description String? status String @default("open")
  createdAt DateTime @default(now()) updatedAt DateTime @updatedAt
  items RFQItem[] quotes Quote[]
  @@index([buyerId]) @@index([status])
}

model RFQItem {
  id String @id @default(cuid())
  rfqId String rfq RFQ @relation(fields: [rfqId], references: [id])
  productId String? product Product? @relation(fields: [productId], references: [id])
  name String quantity Int unit String @default("adet") notes String?
  @@index([rfqId])
}

model Quote {
  id String @id @default(cuid())
  rfqId String rfq RFQ @relation(fields: [rfqId], references: [id])
  supplierId String supplier User @relation(fields: [supplierId], references: [id])
  price Float currency String @default("TRY")
  deliveryTime String? notes String? status String @default("pending")
  createdAt DateTime @default(now()) updatedAt DateTime @updatedAt
  @@index([rfqId]) @@index([supplierId])
}

model Message {
  id String @id @default(cuid())
  senderId String sender User @relation("SentMessages", fields: [senderId], references: [id])
  receiverId String receiver User @relation("ReceivedMessages", fields: [receiverId], references: [id])
  productId String? product Product? @relation(fields: [productId], references: [id])
  subject String @default("") content String read Boolean @default(false)
  createdAt DateTime @default(now())
  @@index([senderId]) @@index([receiverId]) @@index([read])
}

model Cart {
  id String @id @default(cuid())
  userId String @unique user User @relation(fields: [userId], references: [id])
  items CartItem[] createdAt DateTime @default(now()) updatedAt DateTime @updatedAt
  @@index([userId])
}

model CartItem {
  id String @id @default(cuid())
  cartId String cart Cart @relation(fields: [cartId], references: [id])
  productId String product Product @relation(fields: [productId], references: [id])
  quantity Int @default(1) createdAt DateTime @default(now())
  @@unique([cartId, productId]) @@index([cartId])
}
`;

fs.appendFileSync(fp, p2, 'utf8');
console.log('Part 2 done');
