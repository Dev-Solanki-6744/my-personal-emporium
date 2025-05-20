
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-shop-primary mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-shop-text mb-4">Page Not Found</h2>
        <p className="text-xl text-shop-light-text mb-8">
          We can't seem to find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button variant="default" className="bg-shop-primary hover:bg-shop-primary/90 min-w-[200px]">
              Go to Homepage
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className="border-shop-primary text-shop-primary hover:bg-shop-primary hover:text-white min-w-[200px]">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
