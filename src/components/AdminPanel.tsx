import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Globe
} from "lucide-react";

const AdminPanel = () => {
  const stats = [
    { 
      title: "Total Revenue", 
      value: "₹12,45,678", 
      change: "+12.5%", 
      icon: DollarSign, 
      color: "text-success" 
    },
    { 
      title: "Active Users", 
      value: "25,436", 
      change: "+8.2%", 
      icon: Users, 
      color: "text-primary" 
    },
    { 
      title: "Products Listed", 
      value: "3,456", 
      change: "+15.3%", 
      icon: Package, 
      color: "text-accent" 
    },
    { 
      title: "Pending Issues", 
      value: "23", 
      change: "-5.1%", 
      icon: AlertTriangle, 
      color: "text-warning" 
    }
  ];

  const recentTransactions = [
    { id: "TXN001", farmer: "Ravi Kumar", buyer: "Priya Sharma", amount: "₹1,250", status: "Completed", time: "2 hours ago" },
    { id: "TXN002", farmer: "Sunita Devi", buyer: "Amit Patel", amount: "₹890", status: "Processing", time: "4 hours ago" },
    { id: "TXN003", farmer: "Mohan Singh", buyer: "Rajesh Kumar", amount: "₹2,150", status: "Completed", time: "6 hours ago" },
    { id: "TXN004", farmer: "Lakshmi Reddy", buyer: "Kavya Nair", amount: "₹760", status: "Failed", time: "8 hours ago" },
    { id: "TXN005", farmer: "Krishna Murthy", buyer: "Deepak Joshi", amount: "₹1,450", status: "Completed", time: "10 hours ago" }
  ];

  const topFarmers = [
    { name: "Ravi Kumar", location: "Bengaluru, Karnataka", revenue: "₹45,230", products: 12, rating: 4.8 },
    { name: "Sunita Devi", location: "Mysore, Karnataka", revenue: "₹38,950", products: 8, rating: 4.9 },
    { name: "Mohan Singh", location: "Hubli, Karnataka", revenue: "₹35,670", products: 15, rating: 4.7 },
    { name: "Lakshmi Reddy", location: "Bangalore Rural", revenue: "₹32,890", products: 10, rating: 4.8 }
  ];

  const systemAlerts = [
    { type: "warning", message: "High demand for organic vegetables - suggest price optimization", time: "1 hour ago" },
    { type: "info", message: "New farmer registration: Krishna Patel from Tumkur", time: "3 hours ago" },
    { type: "error", message: "Payment gateway issue reported - investigating", time: "5 hours ago" },
    { type: "success", message: "Weekly backup completed successfully", time: "1 day ago" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-success" />;
      case "Processing": return <Clock className="w-4 h-4 text-warning" />;
      case "Failed": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "error": return <XCircle className="w-4 h-4 text-destructive" />;
      case "success": return <CheckCircle className="w-4 h-4 text-success" />;
      default: return <Activity className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage the AgroMarket platform</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="default">
              <Globe className="w-4 h-4 mr-2" />
              System Status
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-success' : stat.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${stat.color.split('-')[1]}/20 to-${stat.color.split('-')[1]}/40`} />
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="farmers">Farmers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>Key metrics showing platform expansion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Farmer Registrations</span>
                      <span className="font-medium">2,345 / 3,000</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Consumer Signups</span>
                      <span className="font-medium">18,670 / 20,000</span>
                    </div>
                    <Progress value={93} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Product Listings</span>
                      <span className="font-medium">3,456 / 5,000</span>
                    </div>
                    <Progress value={69} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Transactions</span>
                      <span className="font-medium">12,450 / 15,000</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                  <CardDescription>Farmer and consumer spread across regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-success/10 rounded-lg">
                      <div>
                        <h4 className="font-medium">Karnataka</h4>
                        <p className="text-sm text-muted-foreground">1,234 farmers • 8,567 consumers</p>
                      </div>
                      <Badge variant="default">65%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/10 to-warning/10 rounded-lg">
                      <div>
                        <h4 className="font-medium">Tamil Nadu</h4>
                        <p className="text-sm text-muted-foreground">567 farmers • 4,231 consumers</p>
                      </div>
                      <Badge variant="secondary">20%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary/20 to-muted/20 rounded-lg">
                      <div>
                        <h4 className="font-medium">Andhra Pradesh</h4>
                        <p className="text-sm text-muted-foreground">345 farmers • 2,145 consumers</p>
                      </div>
                      <Badge variant="outline">15%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest payment and order transactions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(transaction.status)}
                        <div>
                          <h4 className="font-semibold text-foreground">{transaction.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {transaction.farmer} → {transaction.buyer}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{transaction.amount}</div>
                        <div className="text-sm text-muted-foreground">{transaction.time}</div>
                        <Badge 
                          variant={
                            transaction.status === "Completed" ? "default" : 
                            transaction.status === "Processing" ? "secondary" : 
                            "destructive"
                          }
                          className="mt-1"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="farmers">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Farmers</CardTitle>
                <CardDescription>Farmers with highest revenue and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topFarmers.map((farmer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-primary/20 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{farmer.name}</h4>
                          <p className="text-sm text-muted-foreground">{farmer.location}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {farmer.products} products
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              ⭐ {farmer.rating}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-success text-lg">{farmer.revenue}</div>
                        <div className="text-sm text-muted-foreground">Total Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue trends and projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-success/5 rounded-lg">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Revenue Chart Placeholder</p>
                      <p className="text-sm text-muted-foreground mt-2">Integration with chart library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Daily active users and platform usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-accent/5 to-warning/5 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-accent mx-auto mb-4" />
                      <p className="text-muted-foreground">Engagement Chart Placeholder</p>
                      <p className="text-sm text-muted-foreground mt-2">Integration with chart library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts & Notifications</CardTitle>
                <CardDescription>Important system events and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">{alert.message}</p>
                        <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Action
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;