'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}')
        setUser(userData)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }

    // Load cart count
    loadCartCount()
  }, [])

  const loadCartCount = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const cartItems = await response.json()
          setCartCount(cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0))
        }
      } catch (error) {
        console.error('Error loading cart count:', error)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setCartCount(0)
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">SimpleShop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            {user && (
              <Link href="/orders" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Orders
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                Products
              </Link>
              {user && (
                <Link href="/orders" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                  Orders
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/cart" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                    Cart ({cartCount})
                  </Link>
                  <div className="px-3 py-2">
                    <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="block text-sm text-gray-700 hover:text-blue-600 mt-1"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
