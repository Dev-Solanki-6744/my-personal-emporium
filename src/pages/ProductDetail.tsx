
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Star, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { getProductById, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  
  const product = getProductById(parseInt(productId || '0'));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-shop-text">Product Not Found</h1>
        <p className="text-shop-light-text mb-8">The product you're looking for doesn't exist or may have been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  // Get related products (same category but different product)
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  // Function to increase quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Function to decrease quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Function to handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  // Function to handle direct payment with Razorpay
  const handleRazorpayPayment = () => {
    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      setIsPaymentLoading(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setIsPaymentLoading(false);
        initiatePayment();
      };
      script.onerror = () => {
        setIsPaymentLoading(false);
        toast.error("Failed to load payment gateway. Please try again later.");
      };
      document.body.appendChild(script);
    } else {
      initiatePayment();
    }
  };

  const initiatePayment = () => {
    // Convert price to INR (assuming product price is in USD)
    const priceInINR = Math.round(product.price * 83);
    
    const options = {
      key: "rzp_test_YOUR_TEST_KEY", // Replace this with your actual Razorpay test key
      amount: priceInINR * quantity * 100, // Amount in paise
      currency: "INR",
      name: "Dorylus's Design", // Replace with your actual store name
      description: `Purchase of ${product.name} (${quantity} items)`,
      image: "Profile pc.jpg", // Replace with your actual logo URL
      handler: function(response: any) {
        // Handle successful payment
        const paymentId = response.razorpay_payment_id;
        
        // Store order info in local storage for order tracking
        const orderDetails = {
          orderId: `ORD-${Date.now()}`,
          paymentId: paymentId,
          product: product.name,
          quantity: quantity,
          totalAmount: priceInINR * quantity,
          date: new Date().toISOString(),
          status: 'Paid'
        };
        
        // Store order in local storage for now (in a real app, you would send this to your backend)
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        
        toast.success("Payment successful! Order confirmed.");
        
        // Redirect to a success page or order confirmation page
        setTimeout(() => {
          navigate('/cart', { 
            state: { 
              orderSuccess: true, 
              orderId: orderDetails.orderId,
              paymentId: paymentId 
            }
          });
        }, 1500);
      },
      prefill: {
        name: "", // Will be filled by customer
        email: "", // Will be filled by customer
        contact: "" // Will be filled by customer
      },
      notes: {
        product_id: product.id,
        quantity: quantity
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: function() {
          toast.info("Payment cancelled by user.");
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      toast.error("Payment initialization failed. Please try again later.");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-shop-background">
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-shop-primary hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>
      
      <div className="bg-shop-card rounded-lg shadow-lg overflow-hidden border border-shop-primary/20">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-shop-text">{product.name}</h1>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-shop-secondary-bg rounded-full text-shop-light-text">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center bg-amber-900/30 px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-semibold text-amber-400">{product.rating}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <span className="text-3xl font-bold text-shop-primary">₹{(product.price * 83).toFixed(2)}</span>
                {product.inStock ? (
                  <span className="ml-3 text-sm font-medium text-green-500">In Stock</span>
                ) : (
                  <span className="ml-3 text-sm font-medium text-red-500">Out of Stock</span>
                )}
              </div>
              
              <div className="mt-6">
                <h2 className="font-semibold text-shop-text">Description</h2>
                <p className="mt-2 text-shop-light-text opacity-80">{product.description}</p>
              </div>
            </div>
            
            <div className="flex-grow"></div>
            
            {product.inStock && (
              <>
                <div className="mt-8 flex items-center">
                  <span className="mr-4 font-medium text-shop-text">Quantity:</span>
                  <div className="flex items-center border border-shop-primary/30 rounded">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-1 text-shop-primary hover:bg-shop-primary/10 focus:outline-none"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-l border-r border-shop-primary/30">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-1 text-shop-primary hover:bg-shop-primary/10 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAddToCart} 
                    className="flex-1 flex items-center justify-center bg-shop-primary hover:bg-shop-primary/90 text-black font-semibold"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={handleRazorpayPayment}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center"
                    size="lg"
                    disabled={isPaymentLoading}
                  >
                    {isPaymentLoading ? 'Loading...' : 'Buy Now with Razorpay'}
                  </Button>
                </div>
              </>
            )}
            
            <div className="mt-8 bg-shop-secondary-bg/30 p-4 rounded-md flex items-start border border-shop-primary/20">
              <Truck className="h-5 w-5 text-shop-primary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-shop-text font-medium">Free shipping</p>
                <p className="text-shop-light-text opacity-70 text-sm mt-1">Orders over ₹4,000 qualify for free shipping.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-shop-text">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
