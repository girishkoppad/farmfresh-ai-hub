import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const SignupPage = ({ onSuccess, onViewChange }: { onSuccess?: () => void, onViewChange?: (view: string) => void }) => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, role };
    console.log('Sending data:', payload);
    
    // Validate required fields for wholesale consumer
    if (role === 'wholesale_consumer') {
      const requiredFields = ['full_name', 'organization_name', 'business_type', 'contact_person', 'phone', 'email', 'password', 'business_address'];
      const missingFields = requiredFields.filter(field => !payload[field]);
      if (missingFields.length > 0) {
        alert('Please fill all required fields: ' + missingFields.join(', '));
        return;
      }
    }
    try {
      const response = await fetch('http://localhost/backend/api/auth/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        setMessage('Signup successful! Redirecting to login page...');
        setTimeout(() => {
          onSuccess?.();
        }, 1500);
      } else {
        setMessage('Registration failed: ' + data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Connection failed. Please ensure XAMPP is running.');
    }
  };

  const renderFarmerFields = () => (
    <>
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input id="full_name" onChange={(e) => handleInputChange('full_name', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" onChange={(e) => handleInputChange('email', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" onChange={(e) => handleInputChange('phone', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" onChange={(e) => handleInputChange('password', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="location">Location (Village, District, State)</Label>
        <Input id="location" onChange={(e) => handleInputChange('location', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="crops">Type of Crops</Label>
        <Select onValueChange={(value) => handleInputChange('crops', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select crop type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegetables">Vegetables</SelectItem>
            <SelectItem value="fruits">Fruits</SelectItem>
            <SelectItem value="grains">Grains</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderRetailConsumerFields = () => (
    <>
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input id="full_name" onChange={(e) => handleInputChange('full_name', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" onChange={(e) => handleInputChange('email', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" onChange={(e) => handleInputChange('phone', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" onChange={(e) => handleInputChange('password', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="delivery_address">Delivery Address</Label>
        <Input id="delivery_address" onChange={(e) => handleInputChange('delivery_address', e.target.value)} required />
      </div>
    </>
  );

  const renderWholesaleConsumerFields = () => (
    <>
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input id="full_name" onChange={(e) => handleInputChange('full_name', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="organization_name">Organization/Business Name</Label>
        <Input id="organization_name" onChange={(e) => handleInputChange('organization_name', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="business_type">Type of Business</Label>
        <Select onValueChange={(value) => handleInputChange('business_type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cafe">Cafe</SelectItem>
            <SelectItem value="restaurant">Restaurant</SelectItem>
            <SelectItem value="grocery_store">Grocery Store</SelectItem>
            <SelectItem value="event_organizer">Event Organizer</SelectItem>
            <SelectItem value="hostel">Hostel</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="contact_person">Contact Person Name</Label>
        <Input id="contact_person" onChange={(e) => handleInputChange('contact_person', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" onChange={(e) => handleInputChange('phone', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" onChange={(e) => handleInputChange('email', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" onChange={(e) => handleInputChange('password', e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="business_address">Business Address</Label>
        <Input id="business_address" onChange={(e) => handleInputChange('business_address', e.target.value)} required />
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="role">Select Role</Label>
              <Select onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">👨‍🌾 Farmer</SelectItem>
                  <SelectItem value="retail_consumer">🛒 Retail Consumer</SelectItem>
                  <SelectItem value="wholesale_consumer">🏢 Wholesale Consumer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === 'farmer' && renderFarmerFields()}
            {role === 'retail_consumer' && renderRetailConsumerFields()}
            {role === 'wholesale_consumer' && renderWholesaleConsumerFields()}

            {role && (
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            )}
            
            {message && (
              <div className={`text-center p-2 rounded ${message.includes('successful') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;