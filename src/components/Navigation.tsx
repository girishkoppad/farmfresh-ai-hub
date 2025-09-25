import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, X, Sprout, User, ShoppingCart, ArrowLeft, LogIn, UserPlus } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get user from localStorage to determine role
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const getNavigationItems = () => {
    if (user?.role === 'farmer') {
      return [{ id: "farmer", label: "Farmer Dashboard", icon: User }];
    } else if (user?.role === 'retail_consumer') {
      return [{ id: "consumer", label: "Marketplace", icon: ShoppingCart }];
    } else if (user?.role === 'wholesale_consumer') {
      return [{ id: "wholesale", label: "Bulk Marketplace", icon: ShoppingCart }];
    }
    
    return [{ id: "home", label: "Home", icon: Sprout }];
  };
  
  const navigationItems = getNavigationItems();

  const authItems = user ? [] : [
    { id: "login", label: "Login", icon: LogIn },
    { id: "signup", label: "Sign Up", icon: UserPlus },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FreshConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {currentView !== "home" && !user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange("home")}
                className="flex items-center gap-2 mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className="flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
            <div className="ml-4 flex items-center gap-1">
              {user ? (
                <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-xs text-muted-foreground">{user.role.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.reload();
                    }}
                    className="text-xs"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                authItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => onViewChange(item.id)}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                ))
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <Card className="md:hidden mt-2 p-4">
            <div className="flex flex-col gap-2">
              {currentView !== "home" && !user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onViewChange("home");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-start"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              )}
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 justify-start"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
              {user ? (
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg mb-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-xs text-muted-foreground">{user.role.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.reload();
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="border-t pt-2 mt-2">
                  {authItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentView === item.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        onViewChange(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 justify-start w-full mb-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </nav>
  );
};

export default Navigation;