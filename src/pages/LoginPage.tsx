
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';

//Added
interface GoogleAccountsId {
  initialize: (options: {
    client_id: string;
    callback: (response: any) => void;
  }) => void;
  renderButton: (parent: HTMLElement, options: object) => void;
  prompt: () => void;
}

interface GoogleNamespace {
  accounts: {
    id: GoogleAccountsId;
  };
}

declare const google: GoogleNamespace;

//


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useUser();
//ADDED THIS LINE 
const [googleLoaded, setGoogleLoaded] = useState(false);

useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    console.log('Google script loaded');
    setGoogleLoaded(true);
  };

  return () => {
    document.body.removeChild(script);
  };
}, []);

useEffect(() => {
  if (!googleLoaded) return;

  const container = document.getElementById('google-signin-button');
  if (!container) {
    console.error('Google Sign-In container not found');
    return;
  }

  console.log('Google initializing and rendering button');
  google.accounts.id.initialize({
    client_id: '137812214512-m6q4cd06hlg8sc6592482phhuqjac6nm.apps.googleusercontent.com',
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(container, {
    theme: 'outline',
    size: 'large',
    width: '100%',
  });
}, [googleLoaded]);

//ADDED ABOVE LINE

//ADDED
  const handleCredentialResponse = (response: any) => {
  console.log('Encoded JWT ID token: ' + response.credential);
  // You can send this token to your backend or decode it here to get user info.
};
//
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
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
          <h1 className="text-center text-3xl font-bold text-white">Sign in to your account</h1>
          <p className="mt-2 text-center text-white">
            Or{' '}
            <Link to="/register" className="text-shop-primary hover:text-shop-primary/80 hover:underline">
              create a new account
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
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-shop-primary hover:text-shop-primary/80 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-shop-primary hover:bg-shop-primary/90 text-black font-medium" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-shop-card text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-4">
            {/*  
              <Button variant="outline" className="w-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.746,1.363-2.006,2.424-3.546,2.969 C13.51,17.503,12.518,17.667,11.5,17.667c-2.418,0-4.535-1.244-5.759-3.132c-0.355-0.546-0.644-1.134-0.852-1.768 c-0.227-0.688-0.343-1.416-0.343-2.15c0-0.716,0.111-1.409,0.323-2.065c0.214-0.656,0.526-1.268,0.911-1.821 c1.235-1.767,3.272-2.924,5.586-2.924c2.322,0,4.363,1.164,5.595,2.94c0.286,0.41,0.523,0.849,0.707,1.311 c0.184,0.459,0.322,0.941,0.409,1.438c0.148,0.844,0.148,1.718-0.001,2.562L12.545,12.151L12.545,12.151z M16.078,11.239 c0.117,0,0.213-0.095,0.213-0.212V9.401c0-0.117-0.096-0.212-0.213-0.212h-3.322c-0.117,0-0.212,0.095-0.212,0.212v1.626 c0,0.117,0.095,0.212,0.212,0.212H16.078z M21.825,10.037c0,5.703-4.622,10.326-10.325,10.326S1.174,15.74,1.174,10.037 S5.797-0.289,11.5-0.289S21.825,4.333,21.825,10.037z" />
                </svg>
              </Button>*/}
              {googleLoaded && (
              <div className="w-full flex justify-center items-center mt-4">
              <div id="google-signin-button"className="min-h-[50px]"></div>
              </div>
              )}




              
              
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-400">
          By signing in, you agree to our{' '}
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

export default LoginPage;
