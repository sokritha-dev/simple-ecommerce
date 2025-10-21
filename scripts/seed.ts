import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        category: 'Electronics',
        stock: 50
      }
    }),
    prisma.product.create({
      data: {
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'Electronics',
        stock: 30
      }
    }),
    prisma.product.create({
      data: {
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        category: 'Clothing',
        stock: 100
      }
    }),
    prisma.product.create({
      data: {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
        category: 'Accessories',
        stock: 75
      }
    }),
    prisma.product.create({
      data: {
        name: 'Wireless Charging Pad',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
        category: 'Electronics',
        stock: 60
      }
    }),
    prisma.product.create({
      data: {
        name: 'Leather Wallet',
        description: 'Genuine leather wallet with RFID blocking technology and multiple card slots.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category: 'Accessories',
        stock: 40
      }
    }),
    prisma.product.create({
      data: {
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with 360-degree sound and 12-hour battery life.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        category: 'Electronics',
        stock: 35
      }
    }),
    prisma.product.create({
      data: {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat made from eco-friendly materials with carrying strap.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
        category: 'Sports',
        stock: 80
      }
    })
  ])

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: userPassword,
      role: 'USER'
    }
  })

  console.log('Database seeded successfully!')
  console.log('Admin user: admin@example.com / admin123')
  console.log('Regular user: john@example.com / user123')
  console.log(`Created ${products.length} products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
