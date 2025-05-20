
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-shop-primary">
          YourStore
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-shop-text hover:text-shop-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-shop-text hover:text-shop-primary transition-colors">
            Products
          </Link>
          <Link to="/about" className="text-shop-text hover:text-shop-primary transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-shop-text hover:text-shop-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/account" className="flex items-center text-shop-text hover:text-shop-primary">
                <User className="w-5 h-5 mr-1" />
                <span>{user.name}</span>
              </Link>
              <Button variant="ghost" onClick={logout} className="text-shop-text hover:text-shop-primary">
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-shop-text h-6 w-6 hover:text-shop-primary transition-colors" />
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-shop-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-shop-text hover:text-shop-primary focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-shop-text hover:text-shop-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-2 text-shop-text hover:text-shop-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-shop-text hover:text-shop-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-shop-text hover:text-shop-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <Link 
                    to="/account" 
                    className="block py-2 text-shop-text hover:text-shop-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 text-shop-text hover:text-shop-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block py-2 text-shop-text hover:text-shop-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 text-shop-text hover:text-shop-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
