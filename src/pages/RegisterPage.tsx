
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { register } = useUser();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-center text-white">
            Already have an account?{' '}
            <Link to="/login" className="text-shop-primary hover:text-shop-primary/80 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 my-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-shop-card p-8 rounded-lg shadow-lg border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-gray-400">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-shop-primary focus:ring-shop-primary border-gray-700 rounded bg-gray-800"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-shop-primary hover:text-shop-primary/80 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-shop-primary hover:text-shop-primary/80 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-shop-primary hover:bg-shop-primary/90 text-black font-medium" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-shop-card text-gray-400">Or register with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                <span className="sr-only">Register with Google</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.746,1.363-2.006,2.424-3.546,2.969 C13.51,17.503,12.518,17.667,11.5,17.667c-2.418,0-4.535-1.244-5.759-3.132c-0.355-0.546-0.644-1.134-0.852-1.768 c-0.227-0.688-0.343-1.416-0.343-2.15c0-0.716,0.111-1.409,0.323-2.065c0.214-0.656,0.526-1.268,0.911-1.821 c1.235-1.767,3.272-2.924,5.586-2.924c2.322,0,4.363,1.164,5.595,2.94c0.286,0.41,0.523,0.849,0.707,1.311 c0.184,0.459,0.322,0.941,0.409,1.438c0.148,0.844,0.148,1.718-0.001,2.562L12.545,12.151L12.545,12.151z M16.078,11.239 c0.117,0,0.213-0.095,0.213-0.212V9.401c0-0.117-0.096-0.212-0.213-0.212h-3.322c-0.117,0-0.212,0.095-0.212,0.212v1.626 c0,0.117,0.095,0.212,0.212,0.212H16.078z M21.825,10.037c0,5.703-4.622,10.326-10.325,10.326S1.174,15.74,1.174,10.037 S5.797-0.289,11.5-0.289S21.825,4.333,21.825,10.037z" />
                </svg>
              </Button>
              <Button variant="outline" className="w-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                <span className="sr-only">Register with Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-400">
          By registering, you agree to our{' '}
          <Link to="/terms" className="text-shop-primary hover:text-shop-primary/80 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-shop-primary hover:text-shop-primary/80 hover:underline">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
