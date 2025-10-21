# Simple Ecommerce Application

A full-stack ecommerce application built with Next.js 15, TypeScript, Prisma, and SQLite. This application provides a complete shopping experience with user authentication, product management, shopping cart, and order processing.

## Features

### 🛍️ Ecommerce Features
- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add, remove, and update cart items
- **Order Management**: Place orders and track order status
- **User Authentication**: Secure login and registration
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🔧 Technical Features
- **Next.js 15**: Latest Next.js with App Router
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Database management with SQLite
- **JWT Authentication**: Secure token-based authentication
- **API Routes**: RESTful API endpoints
- **Modern UI**: Beautiful interface with Lucide React icons

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production ready)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Seed the database with sample data**
   ```bash
   npx tsx scripts/seed.ts
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following main entities:

- **Users**: Customer and admin accounts
- **Products**: Product catalog with categories
- **Cart Items**: Shopping cart functionality
- **Orders**: Order management and tracking
- **Order Items**: Individual items within orders

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - List products (with search and filtering)
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item quantity
- `DELETE /api/cart/[id]` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order

## Sample Data

The seed script creates:
- 8 sample products across different categories
- Admin user: `admin@example.com` / `admin123`
- Regular user: `john@example.com` / `user123`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product management
│   │   ├── cart/         # Shopping cart
│   │   └── orders/       # Order management
│   ├── products/         # Product pages
│   ├── cart/            # Shopping cart page
│   ├── orders/          # Order history page
│   ├── login/           # Login page
│   └── register/        # Registration page
├── components/          # React components
├── lib/                # Utility functions
│   ├── prisma.ts       # Database client
│   └── auth.ts         # Authentication utilities
└── scripts/            # Database seeding
```

## Features Overview

### 🏠 Home Page
- Hero section with call-to-action
- Featured products showcase
- Feature highlights (fast delivery, secure payment, quality products)

### 🛒 Product Catalog
- Product grid with search and filtering
- Category-based filtering
- Pagination support
- Product detail pages with image gallery

### 🛍️ Shopping Cart
- Add/remove items
- Quantity management
- Real-time cart updates
- Order summary with totals

### 👤 User Authentication
- Secure registration and login
- JWT token-based sessions
- Protected routes
- User profile management

### 📦 Order Management
- Order placement
- Order history
- Order status tracking
- Order details with items

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm start
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

## Deployment

### Environment Variables for Production
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-nextauth-secret"
```

### Database Migration
```bash
npx prisma migrate deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help with the application, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Prisma.