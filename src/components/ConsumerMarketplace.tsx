import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart, 
  Star,
  MapPin,
  Truck,
  Shield,
  Clock,
  Plus,
  Minus
} from "lucide-react";
import basketImage from "@/assets/organic-basket.jpg";

const ConsumerMarketplace = () => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  // Load products from farmers in real-time
  useEffect(() => {
    const loadFarmerProducts = () => {
      const farmerProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
      
      // Transform farmer products to marketplace format
      const marketplaceProducts = farmerProducts.map(product => {
        console.log('Product bulk status:', product.name, product.isBulkQuantity);
        return {
          id: product.id,
          name: product.name,
          price: product.price.replace(/₹/g, '').replace(/\/kg/g, ''),
          farmer: "Local Farmer", // Will be dynamic when user system is complete
          location: product.location || "Karnataka, India",
          image: product.image || basketImage,
          category: product.category || "Vegetables",
          freshness: product.harvestedDate ? `Harvested ${new Date(product.harvestedDate).toLocaleDateString()}` : "Fresh stock",
          certification: "Farm Fresh",
          delivery: "Same day",
          stock: product.stock,
          isBulkQuantity: product.isBulkQuantity || false
        };
      }); // Show all products including bulk quantities
      
      setProducts(marketplaceProducts);
    };

    // Load initially
    loadFarmerProducts();
    
    // Listen for storage changes (when farmers add products)
    const handleStorageChange = () => {
      loadFarmerProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for same-tab updates
    const interval = setInterval(loadFarmerProducts, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Only show real farmer products
  const displayProducts = products;

  const categories = ["All", "Vegetables", "Fruits", "Leafy Greens", "Root Vegetables", "Spices"];

  const updateCart = (productId: number, change: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, count) => sum + count, 0);
  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, count]) => {
      const product = displayProducts.find(p => p.id === parseInt(id));
      return sum + (product ? parseInt(product.price) * count : 0);
    }, 0);
  };

  const handleCheckout = () => {
    if (getTotalItems() === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Create order details
    const orderItems = Object.entries(cart).map(([id, count]) => {
      const product = displayProducts.find(p => p.id === parseInt(id));
      return {
        productId: id,
        name: product?.name,
        quantity: count,
        price: parseInt(product?.price || '0'),
        total: count * parseInt(product?.price || '0')
      };
    });

    const order = {
      id: Date.now(),
      items: orderItems,
      totalAmount: getTotalPrice(),
      totalItems: getTotalItems(),
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('consumerOrders') || '[]');
    localStorage.setItem('consumerOrders', JSON.stringify([...existingOrders, order]));

    // Update farmer products with sold quantities
    const farmerProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    const updatedFarmerProducts = farmerProducts.map(product => {
      const soldItem = orderItems.find(item => item.productId == product.id);
      if (soldItem) {
        return {
          ...product,
          sales: (product.sales || 0) + soldItem.quantity,
          stock: Math.max(0, product.stock - soldItem.quantity)
        };
      }
      return product;
    });
    localStorage.setItem('farmerProducts', JSON.stringify(updatedFarmerProducts));

    // Create farmer orders for each product
    const farmerOrders = orderItems.map(item => ({
      id: `ORD${Date.now()}-${item.productId}`,
      customer: "Customer", // Will be dynamic when user system is complete
      items: `${item.name} (${item.quantity}kg)`,
      total: `₹${item.total}`,
      status: "Processing",
      orderDate: new Date().toISOString(),
      productId: item.productId
    }));

    // Save farmer orders
    const existingFarmerOrders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');
    localStorage.setItem('farmerOrders', JSON.stringify([...existingFarmerOrders, ...farmerOrders]));

    // Clear cart
    setCart({});

    // Show success message
    alert(`Order placed successfully! \nOrder ID: #${order.id}\nTotal: ₹${order.totalAmount}\nItems: ${order.totalItems}\n\nYour fresh produce will be delivered soon!`);
  };

  const filteredProducts = displayProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = parseInt(product.price) >= priceRange.min && parseInt(product.price) <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fresh Marketplace</h1>
            <p className="text-muted-foreground">Direct from farmers to your doorstep</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-success text-success-foreground">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            <Button 
              variant="consumer" 
              size="lg"
              onClick={handleCheckout}
              disabled={getTotalItems() === 0}
            >
              Checkout ₹{getTotalPrice()}
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search for vegetables, fruits, or farmers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
            
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "secondary"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg bg-secondary/20">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex gap-4 items-center">
                  <div>
                    <Label htmlFor="min-price">Min Price</Label>
                    <Input
                      id="min-price"
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                      className="w-20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-price">Max Price</Label>
                    <Input
                      id="max-price"
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000 }))}
                      className="w-20"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange({ min: 0, max: 1000 });
                      setSearchQuery("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                {product.isBulkQuantity && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-500 text-white font-bold px-3 py-1 text-sm">
                      BULK QUANTITY
                    </Badge>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="bg-background/80 hover:bg-background">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-background/90">
                    <Shield className="w-3 h-3 mr-1" />
                    {product.certification}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {product.farmer} • {product.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-success">₹{product.price}/kg</div>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-3">
                  <div className="flex items-center gap-1 text-sm text-success">
                    <Clock className="w-3 h-3" />
                    {product.freshness}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Truck className="w-3 h-3 mr-1" />
                    {product.delivery}
                  </Badge>
                  <div className="flex gap-1">
                    {product.isBulkQuantity && (
                      <Badge variant="default" className="text-xs bg-orange-500 text-white">
                        Bulk Quantity
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  {cart[product.id] ? (
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateCart(product.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-medium text-foreground min-w-[20px] text-center">
                        {cart[product.id]}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateCart(product.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="consumer"
                      size="sm"
                      onClick={() => updateCart(product.id, 1)}
                      className="flex-1"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="ml-2">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Recommendations */}
        <Card className="bg-gradient-to-r from-primary/5 to-success/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" />
              Recommended for You
            </CardTitle>
            <CardDescription>Based on your shopping history and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.farmer}</p>
                    <p className="text-sm font-bold text-success">₹{product.price}/kg</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => updateCart(product.id, 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerMarketplace;