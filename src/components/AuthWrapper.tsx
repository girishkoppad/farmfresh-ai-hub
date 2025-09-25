import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { Button } from './ui/button';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear any existing user data for testing
    localStorage.removeItem('user');
    const user = localStorage.getItem('user');
    console.log('Checking auth, user:', user);
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center pt-8 pb-4">
        <div className="flex space-x-4">
          <Button 
            variant={showLogin ? "default" : "outline"}
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Button 
            variant={!showLogin ? "default" : "outline"}
            onClick={() => setShowLogin(false)}
          >
            Sign Up
          </Button>
        </div>
      </div>
      
      {showLogin ? (
        <LoginPage onSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <SignupPage onSuccess={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default AuthWrapper;