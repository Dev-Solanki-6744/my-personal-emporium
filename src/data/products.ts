
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life and comfortable over-ear design.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Professional Camera",
    description: "24.1 Megapixel DSLR camera with 4K video recording and advanced autofocus system.",
    price: 1299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    description: "Track your workouts, heart rate, and sleep with this waterproof smart fitness watch.",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1539637721350-666a8846299c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    inStock: true
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with adjustable height, lumbar support, and breathable mesh back.",
    price: 249.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Standing Desk",
    description: "Electric standing desk with memory settings and spacious desktop surface.",
    price: 399.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    inStock: true
  },
  {
    id: 6,
    name: "Premium Yoga Mat",
    description: "Eco-friendly, non-slip yoga mat with perfect cushioning for joints.",
    price: 59.99,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    inStock: true
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 29.99,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.2,
    inStock: true
  },
  {
    id: 8,
    name: "Lightweight Running Shoes",
    description: "Ultra-lightweight running shoes with responsive cushioning and breathable mesh upper.",
    price: 119.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    inStock: true,
    featured: true
  },
  {
    id: 9,
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound and home automation capabilities.",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    inStock: true
  },
  {
    id: 10,
    name: "Organic Cotton T-shirt",
    description: "Sustainable, soft organic cotton t-shirt with modern fit.",
    price: 24.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.1,
    inStock: true
  },
  {
    id: 11,
    name: "Professional Blender",
    description: "High-performance blender with variable speed control and pulse function.",
    price: 199.99,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1570222094714-d835c9209ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    inStock: true
  },
  {
    id: 12,
    name: "Wireless Earbuds",
    description: "Truly wireless earbuds with noise isolation and touch controls.",
    price: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    inStock: true
  }
];

// Get unique categories from products
export const categories = Array.from(new Set(products.map(product => product.category)));

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Helper function to get product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
