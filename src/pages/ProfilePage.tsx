
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, ShoppingBag, LogOut, CreditCard, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';

const ProfilePage = () => {
  const { user, logout } = useUser();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-16 bg-shop-background text-shop-text min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gradient-mint">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Info Card */}
          <Card className="bg-shop-card border border-shop-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-shop-text">
                <UserRound className="mr-2 h-5 w-5 text-shop-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-shop-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-shop-primary" />
                </div>
                <h3 className="text-xl font-semibold text-shop-text">{user.name}</h3>
                <p className="text-shop-light-text">{user.email}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={logout} 
                className="text-shop-text border-shop-primary/50 hover:bg-shop-primary/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
          
          {/* Orders Card */}
          <Card className="bg-shop-card border border-shop-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-shop-text">
                <ShoppingBag className="mr-2 h-5 w-5 text-shop-primary" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="text-shop-light-text mb-4">View your order history</p>
              <p className="text-3xl font-bold text-shop-primary mb-2">0</p>
              <p className="text-shop-light-text text-sm">Total Orders</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="outline"
                className="text-shop-text border-shop-primary/50 hover:bg-shop-primary/10"
              >
                View Orders
              </Button>
            </CardFooter>
          </Card>
          
          {/* Payment Methods Card */}
          <Card className="bg-shop-card border border-shop-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-shop-text">
                <CreditCard className="mr-2 h-5 w-5 text-shop-primary" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="text-shop-light-text mb-4">Manage your payment methods</p>
              <div className="flex justify-center space-x-2 mb-2">
                <div className="w-10 h-6 bg-gray-800 rounded border border-gray-700"></div>
                <div className="w-10 h-6 bg-gray-800 rounded border border-gray-700"></div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="outline"
                className="text-shop-text border-shop-primary/50 hover:bg-shop-primary/10"
              >
                Add Payment Method
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-shop-text">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/cart">
              <Button 
                className="w-full bg-shop-button hover:bg-shop-button/80 text-white h-auto py-4"
                size="lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                View Cart
              </Button>
            </Link>
            <Button 
              className="w-full bg-shop-button hover:bg-shop-button/80 text-white h-auto py-4"
              size="lg"
            >
              <User className="mr-2 h-5 w-5" />
              Edit Profile
            </Button>
            <Link to="/products">
              <Button 
                className="w-full bg-shop-button hover:bg-shop-button/80 text-white h-auto py-4"
                size="lg"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Return to Homepage */}
        <div className="text-center">
          <Link to="/" className="text-shop-primary hover:text-shop-primary/80">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
