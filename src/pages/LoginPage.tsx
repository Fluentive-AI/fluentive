import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import AppLogo from '@/components/layout/AppLogo';

// This is not secure for production, but serves as a simple authentication mechanism
// In a real application, this would be handled by a backend service
const ALLOWED_USERS = [
  {
    email: 'eytan@homm.com',
    password: 'safe_password' 
  },
  {
    email: 'antoine@homm.com',
    password: 'safe_password'
  }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState<'propertyManager' | 'tenant' | 'agent'>('propertyManager');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a network request
    setTimeout(() => {
      // Check if the credentials match any allowed user
      const isValidUser = ALLOWED_USERS.some(
        user => user.email === email && user.password === password
      );
      
      if (isValidUser) {
        // Store authentication state in session storage
        sessionStorage.setItem('isAuthenticated', 'true');
        
        // If remember me is checked, store in local storage as well
        if (rememberMe) {
          localStorage.setItem('isAuthenticated', 'true');
        }
        
        // Determine which route to navigate to based on user type
        if (userType === 'propertyManager') {
          navigate('/dashboard');
        } else if (userType === 'tenant') {
          navigate('/tenant');
        } else if (userType === 'agent') {
          navigate('/agent');
        }
      } else {
        // Show error toast for invalid credentials
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800); // Simulating network delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 sm:mb-8 text-center">
          <div className="h-16 flex items-center justify-center">
            <AppLogo />
          </div>
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">Welcome to Homm</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Sign in to continue to your dashboard</p>
        </div>

        <Card className="w-full shadow-lg border-0">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 sm:h-12"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 sm:h-12"
                />
              </div>
              
              <div className="flex items-center space-x-2 py-1">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-500 hover:bg-brand-600 h-10 sm:h-12 mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
            <div className="text-xs sm:text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Start free trial
              </a>
            </div>
            
            <div className="text-xs text-center text-gray-500">
              By signing in, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-800">Terms of Service</a>{" "}and{" "}
              <a href="#" className="underline hover:text-gray-800">Privacy Policy</a>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Back to homepage link */}
      <div className="mt-8 text-center">
        <a 
          href="/" 
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1"
        >
          ← Back to homepage
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
