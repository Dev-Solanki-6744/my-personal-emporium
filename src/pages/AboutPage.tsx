
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-shop-primary/10 to-blue-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-shop-text mb-6">About YourStore</h1>
          <p className="text-xl text-shop-light-text max-w-3xl mx-auto">
            We're dedicated to providing the best products and shopping experience for our customers.
            Learn more about our story, mission, and values.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-shop-text">Our Story</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Our Store" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-lg mb-4 text-shop-text">
                  Founded in 2020, YourStore began with a simple mission: to provide high-quality products at fair prices with exceptional customer service.
                </p>
                <p className="text-lg mb-4 text-shop-text">
                  What started as a small online store has grown into a trusted marketplace offering a diverse range of products to customers worldwide.
                </p>
                <p className="text-lg text-shop-text">
                  Throughout our journey, our dedication to quality and customer satisfaction has remained at the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-shop-text">Our Mission</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-xl text-center text-shop-text italic">
                "To provide high-quality products that enhance our customers' lives, delivered with exceptional service and supported by a commitment to sustainability and ethical business practices."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-shop-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2 text-shop-text">Quality</h3>
                <p className="text-center text-shop-light-text">
                  We carefully select and test every product to ensure it meets our high standards.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-shop-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2 text-shop-text">Innovation</h3>
                <p className="text-center text-shop-light-text">
                  We're constantly exploring new products and technologies to better serve our customers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-shop-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2 text-shop-text">Trust</h3>
                <p className="text-center text-shop-light-text">
                  We build long-lasting relationships with our customers based on transparency and integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-shop-text">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-shop-text">John Doe</h3>
                <p className="text-shop-primary mb-2">CEO & Founder</p>
                <p className="text-shop-light-text">
                  With over 15 years of retail experience, John leads our team with passion and vision.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="COO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-shop-text">Jane Smith</h3>
                <p className="text-shop-primary mb-2">Chief Operations Officer</p>
                <p className="text-shop-light-text">
                  Jane ensures our day-to-day operations run smoothly and efficiently.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="CTO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-shop-text">Mike Johnson</h3>
                <p className="text-shop-primary mb-2">Chief Technology Officer</p>
                <p className="text-shop-light-text">
                  Mike leads our technology initiatives to create seamless shopping experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-shop-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to start shopping?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Browse our catalog of quality products and experience our exceptional service firsthand.
          </p>
          <Link to="/products">
            <Button className="bg-white text-shop-primary hover:bg-gray-100 px-8 py-3 text-lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
