
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useUser();
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Calculate and format shipping
  const calculateShipping = () => {
    // Free shipping over $50
    return cart.totalPrice >= 50 ? 0 : 9.99;
  };
  
  // Calculate total with shipping
  const calculateTotal = () => {
    return cart.totalPrice + calculateShipping();
  };
  
  // Handle quantity change
  const handleIncrementQuantity = (id: number) => {
    const item = cart.items.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };
  
  const handleDecrementQuantity = (id: number) => {
    const item = cart.items.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };
  
  // If cart is empty
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6">
            <ShoppingCart className="h-16 w-16 mx-auto text-shop-light-text" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-shop-text">Your cart is empty</h1>
          <p className="text-shop-light-text mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <Button size="lg" className="bg-shop-primary hover:bg-shop-primary/90">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-shop-primary hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-shop-text">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-shop-text">Cart Items ({cart.totalItems})</h2>
                <button 
                  onClick={clearCart} 
                  className="text-shop-light-text hover:text-shop-accent flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </button>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {cart.items.map(item => (
                  <li key={item.id} className="py-6 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-shop-text">
                          <h3>
                            <Link to={`/product/${item.id}`} className="hover:text-shop-primary">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => handleDecrementQuantity(item.id)}
                            className="p-1 text-shop-primary hover:bg-gray-100 focus:outline-none"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrementQuantity(item.id)}
                            className="p-1 text-shop-primary hover:bg-gray-100 focus:outline-none"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-shop-accent hover:text-shop-accent/80"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-shop-text">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-shop-light-text">Subtotal</span>
                  <span className="text-shop-text font-medium">{formatPrice(cart.totalPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-shop-light-text">Shipping</span>
                  <span className="text-shop-text font-medium">
                    {calculateShipping() === 0 ? 'Free' : formatPrice(calculateShipping())}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-shop-text">Total</span>
                    <span className="text-lg font-semibold text-shop-text">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                  <p className="text-xs text-shop-light-text mt-1">
                    Tax calculated at checkout
                  </p>
                </div>
                
                <div className="mt-6">
                  <Link to={user ? "/checkout" : "/login"}>
                    <Button className="w-full bg-shop-primary hover:bg-shop-primary/90" size="lg">
                      {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                    </Button>
                  </Link>
                  {!user && (
                    <p className="mt-2 text-xs text-center text-shop-light-text">
                      Please login to complete your purchase
                    </p>
                  )}
                </div>
                
                {/* Payment methods */}
                <div className="mt-6">
                  <p className="text-xs text-shop-light-text mb-2 text-center">We accept</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
