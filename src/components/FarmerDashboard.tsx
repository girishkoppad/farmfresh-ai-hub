import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertCircle,
  Camera,
  BarChart3,
  Calendar,
  MapPin,
  X
} from "lucide-react";

const FarmerDashboard = () => {
  const [products, setProducts] = useState(() => {
    // Load existing products from localStorage
    return JSON.parse(localStorage.getItem('farmerProducts') || '[]');
  });
  const [activeTab, setActiveTab] = useState("products");
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    image: null,
    harvestedDate: '',
    isBulkQuantity: false
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (field, value) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert('Please fill all required fields');
      return;
    }

    const product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: `₹${newProduct.price}/kg`,
      stock: parseInt(newProduct.quantity),
      status: parseInt(newProduct.quantity) > 10 ? 'In Stock' : parseInt(newProduct.quantity) > 0 ? 'Low Stock' : 'Out of Stock',
      sales: 0,
      description: newProduct.description,
      image: imagePreview,
      harvestedDate: newProduct.harvestedDate,
      isBulkQuantity: newProduct.isBulkQuantity
    };

    setProducts(prev => {
      const updatedProducts = [...prev, product];
      // Save to localStorage for consumer marketplace
      localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    
    // Reset form
    setNewProduct({
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
      image: null,
      harvestedDate: '',
      isBulkQuantity: false
    });
    setImagePreview(null);
    
    alert('Product added successfully!');
  };

  const removeProduct = (id) => {
    setProducts(prev => {
      const updatedProducts = prev.filter(product => product.id !== id);
      // Update localStorage
      localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const [recentOrders, setRecentOrders] = useState([]);

  // Load farmer orders
  useEffect(() => {
    const loadFarmerOrders = () => {
      const orders = JSON.parse(localStorage.getItem('farmerOrders') || '[]');
      setRecentOrders(orders);
    };

    loadFarmerOrders();
    const interval = setInterval(loadFarmerOrders, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic stats based on actual data
  const totalRevenue = 0; // Will be calculated when orders are implemented
  const totalProductsSold = 0; // Will be calculated when orders are implemented
  const activeOrders = recentOrders.length;
  const stockAlerts = products.filter(product => product.status === 'Low Stock' || product.status === 'Out of Stock').length;

  const aiInsights = [
    { 
      type: "pricing", 
      message: "Increase tomato price by ₹10/kg - demand is high in your area", 
      confidence: "94%",
      icon: TrendingUp,
      color: "text-success"
    },
    { 
      type: "inventory", 
      message: "Restock spinach soon - predicted to sell out in 2 days", 
      confidence: "89%",
      icon: AlertCircle,
      color: "text-warning"
    },
    { 
      type: "demand", 
      message: "High demand for organic vegetables this week", 
      confidence: "91%",
      icon: BarChart3,
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, manage your farm and sales</p>
          </div>
          <Button 
            size="lg" 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg border-2 border-green-500"
            onClick={() => setActiveTab("add-product")}
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-success/10 to-success/20 border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{totalRevenue > 0 ? 'From product sales' : 'No sales yet'}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalProductsSold}</div>
              <p className="text-xs text-muted-foreground">{totalProductsSold > 0 ? 'Units sold' : 'No products sold yet'}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-warning/20 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{activeOrders}</div>
              <p className="text-xs text-muted-foreground">{activeOrders > 0 ? 'Orders in progress' : 'No active orders'}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/10 to-warning/20 border-warning/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stockAlerts}</div>
              <p className="text-xs text-muted-foreground">{stockAlerts > 0 ? 'Items need attention' : 'All stock levels good'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your agricultural products and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>No products added yet. Add your first product!</p>
                    </div>
                  ) : (
                    products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-8 h-8 text-success" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-sm text-muted-foreground">Sold: {product.sales} units</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right space-y-2">
                            <div className="font-bold text-foreground">{product.price}</div>
                            <Badge 
                              variant={product.status === "In Stock" ? "default" : product.status === "Low Stock" ? "secondary" : "destructive"}
                            >
                              {product.status} ({product.stock})
                            </Badge>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No orders yet. Orders will appear here when customers purchase your products.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold text-foreground">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground mt-1">{order.items}</p>
                          <p className="text-xs text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="font-bold text-foreground">{order.total}</div>
                          <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>Smart recommendations to optimize your farm business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg bg-gradient-to-r from-background to-secondary/30">
                      <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/10 to-success/10`}>
                        <insight.icon className={`w-5 h-5 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium">{insight.message}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Confidence: {insight.confidence}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Apply</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>List a new agricultural product for sale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="product-name">Product Name *</Label>
                      <Input 
                        id="product-name" 
                        placeholder="e.g. Organic Tomatoes" 
                        value={newProduct.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input 
                        id="category" 
                        placeholder="e.g. Vegetables" 
                        value={newProduct.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price per kg *</Label>
                        <Input 
                          id="price" 
                          placeholder="80" 
                          type="number" 
                          value={newProduct.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Available Quantity (kg) *</Label>
                        <Input 
                          id="quantity" 
                          placeholder="100" 
                          type="number" 
                          value={newProduct.quantity}
                          onChange={(e) => handleInputChange('quantity', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your product..." 
                        value={newProduct.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="harvested-date">Harvested Date</Label>
                      <Input 
                        id="harvested-date" 
                        type="date" 
                        max={new Date().toISOString().split('T')[0]}
                        value={newProduct.harvestedDate}
                        onChange={(e) => handleInputChange('harvestedDate', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="bulk-quantity"
                        checked={newProduct.isBulkQuantity}
                        onChange={(e) => handleInputChange('isBulkQuantity', e.target.checked)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                      />
                      <Label htmlFor="bulk-quantity" className="text-sm font-medium">
                        Mark as bulk quantity (visible to wholesale buyers)
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Product Image</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        {imagePreview ? (
                          <div className="relative">
                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setImagePreview(null);
                                setNewProduct(prev => ({ ...prev, image: null }));
                              }}
                            >
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Click to upload product image</p>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageUpload}
                              className="hidden" 
                              id="image-upload"
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => document.getElementById('image-upload').click()}
                            >
                              Choose Image
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                  onClick={addProduct}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product to Marketplace
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerDashboard;