import { useState } from "react";
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

  const products = [
    { 
      id: 1, 
      name: "Organic Tomatoes", 
      price: 80, 
      originalPrice: 120,
      farmer: "Ravi Kumar", 
      location: "Bengaluru, Karnataka",
      rating: 4.8,
      reviews: 156,
      image: basketImage,
      category: "Vegetables",
      freshness: "Harvested today",
      certification: "Organic",
      delivery: "Same day"
    },
    { 
      id: 2, 
      name: "Fresh Spinach", 
      price: 60, 
      originalPrice: 90,
      farmer: "Sunita Devi", 
      location: "Mysore, Karnataka",
      rating: 4.9,
      reviews: 89,
      image: basketImage,
      category: "Leafy Greens",
      freshness: "Harvested yesterday",
      certification: "Pesticide-free",
      delivery: "Next day"
    },
    { 
      id: 3, 
      name: "Red Onions", 
      price: 40, 
      originalPrice: 65,
      farmer: "Mohan Singh", 
      location: "Hubli, Karnataka",
      rating: 4.7,
      reviews: 234,
      image: basketImage,
      category: "Vegetables",
      freshness: "Fresh stock",
      certification: "Natural",
      delivery: "Same day"
    },
    { 
      id: 4, 
      name: "Green Chilies", 
      price: 120, 
      originalPrice: 180,
      farmer: "Lakshmi Reddy", 
      location: "Bangalore Rural",
      rating: 4.8,
      reviews: 67,
      image: basketImage,
      category: "Spices",
      freshness: "Harvested today",
      certification: "Organic",
      delivery: "Same day"
    },
    { 
      id: 5, 
      name: "Fresh Carrots", 
      price: 70, 
      originalPrice: 100,
      farmer: "Krishna Murthy", 
      location: "Mandya, Karnataka",
      rating: 4.6,
      reviews: 198,
      image: basketImage,
      category: "Root Vegetables",
      freshness: "Fresh stock",
      certification: "Pesticide-free",
      delivery: "Next day"
    },
    { 
      id: 6, 
      name: "Cauliflower", 
      price: 50, 
      originalPrice: 80,
      farmer: "Geetha Kumari", 
      location: "Hassan, Karnataka",
      rating: 4.7,
      reviews: 142,
      image: basketImage,
      category: "Vegetables",
      freshness: "Harvested yesterday",
      certification: "Natural",
      delivery: "Same day"
    }
  ];

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
      const product = products.find(p => p.id === parseInt(id));
      return sum + (product ? product.price * count : 0);
    }, 0);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Button variant="consumer" size="lg">
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
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
            
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground whitespace-nowrap">
                  {category}
                </Badge>
              ))}
            </div>
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
                <div className="absolute top-3 left-3">
                  <Badge variant="default" className="bg-success text-success-foreground">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
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
                    <div className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
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
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
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
              {products.slice(0, 3).map((product) => (
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