import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Package, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import basketImage from '@/assets/organic-basket.jpg';

const WholesaleMarketplace = () => {
  const [bulkProducts, setBulkProducts] = useState([]);

  const handleRequestQuote = (product) => {
    const quote = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      farmer: product.farmer,
      requestDate: new Date().toISOString(),
      status: 'pending',
      minOrder: product.minOrder,
      available: product.available,
      price: product.price
    };
    
    const existingQuotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
    localStorage.setItem('quoteRequests', JSON.stringify([...existingQuotes, quote]));
    
    alert(`Quote request submitted for ${product.name}!\nQuote ID: #${quote.id}\nThe farmer will respond with pricing details soon.`);
  };

  // Load bulk products from farmers in real-time
  useEffect(() => {
    const loadBulkProducts = () => {
      const farmerProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
      console.log('All farmer products:', farmerProducts);
      
      // Filter only bulk quantity products
      const bulkOnly = farmerProducts
        .filter(product => {
          console.log(`Product ${product.name}: isBulkQuantity = ${product.isBulkQuantity}`);
          return product.isBulkQuantity === true;
        })
        .map(product => ({
          id: product.id,
          name: product.name,
          farmer: "Local Farmer",
          minOrder: `${Math.floor(product.stock * 0.1)} kg`, // 10% of available stock as min order
          price: `₹${product.price.replace(/₹/g, '').replace(/\/kg/g, '')}/kg`,
          available: `${product.stock} kg`,
          category: product.category || "Vegetables",
          image: product.image || basketImage,
          harvestedDate: product.harvestedDate
        }));
      
      console.log('Filtered bulk products:', bulkOnly);
      setBulkProducts(bulkOnly);
    };

    loadBulkProducts();
    const interval = setInterval(loadBulkProducts, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic stats
  const totalProducts = bulkProducts.length;
  const activeSuppliers = bulkProducts.length; // Each product represents a supplier
  const ordersThisMonth = 0; // Will be dynamic when orders are implemented
  const avgSavings = 25; // Static for now

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Bulk Marketplace</h1>
        <p className="text-muted-foreground">Wholesale purchasing for restaurants, cafes, and bulk buyers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">{totalProducts > 0 ? 'Available for bulk order' : 'No bulk products yet'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">{activeSuppliers > 0 ? 'Verified farmers' : 'No suppliers yet'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders This Month</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersThisMonth}</div>
            <p className="text-xs text-muted-foreground">{ordersThisMonth > 0 ? '+12% from last month' : 'No orders yet'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSavings}%</div>
            <p className="text-xs text-muted-foreground">Compared to retail</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bulkProducts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No bulk products available yet. Farmers need to mark products as bulk quantity.</p>
          </div>
        ) : (
          bulkProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-orange-500 text-white font-bold px-2 py-1 text-xs">
                    BULK
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.farmer}</p>
                    {product.harvestedDate && (
                      <p className="text-xs text-success">Harvested: {new Date(product.harvestedDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Min Order</p>
                    <p className="font-semibold">{product.minOrder}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Available</p>
                    <p className="font-semibold">{product.available}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{product.price}</p>
                    <p className="text-xs text-muted-foreground">Bulk pricing</p>
                  </div>
                  <Button onClick={() => handleRequestQuote(product)}>Request Quote</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WholesaleMarketplace;