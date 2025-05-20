
import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/data/products';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-shop-text">Featured Products</h2>
          <Link to="/products">
            <Button variant="outline" className="border-shop-primary text-shop-primary hover:bg-shop-primary hover:text-white">
              View All
            </Button>
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
