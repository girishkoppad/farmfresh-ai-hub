import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, Shield, Zap, Globe, Heart } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import farmerImage from "@/assets/farmer-success.jpg";
import basketImage from "@/assets/organic-basket.jpg";

interface HomePageProps {
  onViewChange: (view: string) => void;
}

const HomePage = ({ onViewChange }: HomePageProps) => {
  const features = [
    {
      icon: Users,
      title: "Direct Farmer Connection",
      description: "Connect directly with farmers, eliminating middlemen and ensuring fair prices for everyone."
    },
    {
      icon: TrendingUp,
      title: "AI-Powered Insights",
      description: "Smart pricing recommendations and demand forecasting to optimize your agricultural business."
    },
    {
      icon: Shield,
      title: "Transparent Pricing",
      description: "See exactly where your money goes with complete price transparency and fair trade practices."
    },
    {
      icon: Zap,
      title: "Real-time Inventory",
      description: "Live inventory tracking ensures freshness and availability of all agricultural products."
    },
    {
      icon: Globe,
      title: "GPS Logistics",
      description: "Efficient delivery tracking and logistics optimization for faster, cheaper distribution."
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Support local farmers and build sustainable agricultural communities together."
    }
  ];

  const stats = [
    { label: "Active Farmers", value: "25,000+", color: "bg-success" },
    { label: "Happy Customers", value: "100,000+", color: "bg-primary" },
    { label: "Products Sold", value: "2M+", color: "bg-accent" },
    { label: "Revenue Generated", value: "₹50Cr+", color: "bg-warning" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  🌱 Revolutionizing Agriculture
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Direct Farm to
                  <span className="text-transparent bg-gradient-to-r from-primary to-success bg-clip-text">
                    {" "}Your Table
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Eliminate middlemen, support local farmers, and get the freshest produce at fair prices. 
                  Join the agricultural revolution powered by AI and community.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => onViewChange("login")}
                  className="group"
                >
                  Login
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="farmer"
                  size="xl"
                  onClick={() => onViewChange("signup")}
                >
                  Sign Up
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} mb-2`}>
                      <span className="text-white font-bold text-sm">₹</span>
                    </div>
                    <div className="font-bold text-2xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Fresh agricultural products"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose AgroMarket?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're transforming agriculture with technology, transparency, and community-driven solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={farmerImage}
                alt="Successful farmer"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Empowering Farmers,
                <span className="text-transparent bg-gradient-to-r from-success to-primary bg-clip-text">
                  {" "}Growing Communities
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform has helped thousands of farmers increase their income by 60% on average, 
                while providing consumers with 30% savings on fresh produce. Join the agricultural revolution today.
              </p>
              <div className="flex gap-4">
                <Button variant="success" size="lg" onClick={() => onViewChange("signup")}>
                  Get Started Today
                </Button>
                <Button variant="outline" size="lg" onClick={() => onViewChange("login")}>
                  Already Have Account?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;