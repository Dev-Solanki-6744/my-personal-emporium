
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/data/products';
import { Product } from '@/data/products';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(lowerSearchTerm) || 
          product.description.toLowerCase().includes(lowerSearchTerm) ||
          product.category.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm]);
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-shop-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-shop-text">All Products</h1>
        <p className="text-shop-light-text mt-2">Browse our collection of high-quality products</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar / Filters */}
        <div className="md:col-span-1">
          <div className="bg-shop-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6 text-shop-text">Filters</h2>
            
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium mb-2 text-shop-text">
                Search Products
              </label>
              <Input
                id="search"
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-shop-secondary-bg text-shop-text"
              />
            </div>
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            
            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-shop-text">Price Range</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input id="price-any" name="price" type="radio" defaultChecked className="h-4 w-4 text-shop-primary" />
                  <label htmlFor="price-any" className="ml-2 text-shop-text">Any Price</label>
                </div>
                <div className="flex items-center">
                  <input id="price-under-50" name="price" type="radio" className="h-4 w-4 text-shop-primary" />
                  <label htmlFor="price-under-50" className="ml-2 text-shop-text">Under $50</label>
                </div>
                <div className="flex items-center">
                  <input id="price-50-100" name="price" type="radio" className="h-4 w-4 text-shop-primary" />
                  <label htmlFor="price-50-100" className="ml-2 text-shop-text">$50 to $100</label>
                </div>
                <div className="flex items-center">
                  <input id="price-100-200" name="price" type="radio" className="h-4 w-4 text-shop-primary" />
                  <label htmlFor="price-100-200" className="ml-2 text-shop-text">$100 to $200</label>
                </div>
                <div className="flex items-center">
                  <input id="price-over-200" name="price" type="radio" className="h-4 w-4 text-shop-primary" />
                  <label htmlFor="price-over-200" className="ml-2 text-shop-text">Over $200</label>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-shop-text">Availability</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input id="instock-yes" name="instock" type="checkbox" defaultChecked className="h-4 w-4 text-shop-primary rounded" />
                  <label htmlFor="instock-yes" className="ml-2 text-shop-text">In Stock</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="bg-shop-card p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-shop-light-text">Showing {filteredProducts.length} products</span>
              </div>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-shop-text mr-2">Sort by:</label>
                <select 
                  id="sort" 
                  className="border border-gray-700 bg-shop-secondary-bg rounded px-2 py-1 text-shop-text focus:outline-none focus:ring-1 focus:ring-shop-primary"
                  defaultValue="featured"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
          
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
