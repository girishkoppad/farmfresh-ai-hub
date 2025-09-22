import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MapPin
} from "lucide-react";

const FarmerDashboard = () => {
  const products = [
    { id: 1, name: "Organic Tomatoes", price: "₹80/kg", stock: 45, status: "In Stock", sales: 120 },
    { id: 2, name: "Fresh Spinach", price: "₹60/kg", stock: 8, status: "Low Stock", sales: 89 },
    { id: 3, name: "Red Onions", price: "₹40/kg", stock: 100, status: "In Stock", sales: 200 },
    { id: 4, name: "Green Chilies", price: "₹120/kg", stock: 0, status: "Out of Stock", sales: 67 }
  ];

  const recentOrders = [
    { id: "#ORD001", customer: "Rajesh Kumar", items: "Tomatoes (5kg), Spinach (2kg)", total: "₹520", status: "Delivered" },
    { id: "#ORD002", customer: "Priya Sharma", items: "Onions (10kg)", total: "₹400", status: "In Transit" },
    { id: "#ORD003", customer: "Amit Patel", items: "Chilies (1kg), Tomatoes (3kg)", total: "₹360", status: "Processing" }
  ];

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
          <Button variant="farmer" size="lg" className="flex items-center gap-2">
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
              <div className="text-2xl font-bold text-success">₹45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,234</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-warning/20 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">89</div>
              <p className="text-xs text-muted-foreground">12 pending pickup</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/10 to-warning/20 border-warning/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">3</div>
              <p className="text-xs text-muted-foreground">Items need restocking</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
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
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-primary/20 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-success" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">Sold: {product.sales} units</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="font-bold text-foreground">{product.price}</div>
                        <Badge 
                          variant={product.status === "In Stock" ? "default" : product.status === "Low Stock" ? "secondary" : "destructive"}
                        >
                          {product.status} ({product.stock})
                        </Badge>
                      </div>
                    </div>
                  ))}
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
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-foreground">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground mt-1">{order.items}</p>
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
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="e.g. Organic Tomatoes" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" placeholder="e.g. Vegetables" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price per kg</Label>
                        <Input id="price" placeholder="₹80" type="number" />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Available Quantity</Label>
                        <Input id="quantity" placeholder="100 kg" type="number" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Product Image</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Click to upload product image</p>
                        <Button variant="outline" size="sm" className="mt-2">Choose Image</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="farmer" size="lg" className="w-full">
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