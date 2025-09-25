import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';

const LoginPage = ({ onSuccess, onViewChange }: { onSuccess?: () => void, onViewChange?: (view: string) => void }) => {
  const [formData, setFormData] = useState({
    email_or_phone: '',
    password: '',
    role: '',
    remember_me: false
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.email_or_phone || !formData.password || !formData.role) {
      setMessage('Please fill all required fields');
      return;
    }
    
    console.log('Attempting login with:', formData);
    
    try {
      console.log('Making request to: http://localhost/backend/api/auth/login.php');
      const response = await fetch('http://localhost/backend/api/auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setMessage('Successfully logged in! Redirecting...');
        
        // Redirect based on user role
        setTimeout(() => {
          if (data.role === 'farmer') {
            onViewChange?.('farmer');
          } else if (data.role === 'retail_consumer') {
            onViewChange?.('consumer');
          } else if (data.role === 'wholesale_consumer') {
            onViewChange?.('wholesale');
          }
          window.location.reload();
        }, 1000);
      } else {
        setMessage('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('fetch')) {
        setMessage('Backend server not running. Please start XAMPP and ensure backend is accessible.');
      } else {
        setMessage('Connection failed. Please check your internet connection.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email_or_phone">Email / Phone Number</Label>
              <Input 
                id="email_or_phone" 
                name="email_or_phone"
                placeholder="Enter email or phone"
                value={formData.email_or_phone}
                onChange={(e) => handleInputChange('email_or_phone', e.target.value)} 
                autoComplete="username"
                required 
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)} 
                autoComplete="current-password"
                required 
              />
            </div>

            <div>
              <Label htmlFor="role">Select Role</Label>
              <Select onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">👨🌾 Farmer</SelectItem>
                  <SelectItem value="retail_consumer">🛒 Retail Consumer</SelectItem>
                  <SelectItem value="wholesale_consumer">🏢 Wholesale Consumer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember_me"
                checked={formData.remember_me}
                onCheckedChange={(checked) => handleInputChange('remember_me', checked as boolean)}
              />
              <Label htmlFor="remember_me">Remember Me</Label>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            {message && (
              <div className={`text-center p-2 rounded ${message.includes('Successfully') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {message}
              </div>
            )}

            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>


          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;