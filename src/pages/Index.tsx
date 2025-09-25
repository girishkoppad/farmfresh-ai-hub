import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import FarmerDashboard from "@/components/FarmerDashboard";
import ConsumerMarketplace from "@/components/ConsumerMarketplace";
import WholesaleMarketplace from "@/components/WholesaleMarketplace";
import LoginPage from "@/components/LoginPage";
import SignupPage from "@/components/SignupPage";

const Index = () => {
  const [currentView, setCurrentView] = useState(() => {
    // Check if user is logged in and restore their dashboard
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      if (user.role === 'farmer') return 'farmer';
      if (user.role === 'retail_consumer') return 'consumer';
      if (user.role === 'wholesale_consumer') return 'wholesale';
    }
    
    // Check hash for navigation
    const hash = window.location.hash.slice(1);
    if (hash && ['farmer', 'consumer', 'wholesale'].includes(hash)) {
      return hash;
    }
    
    return 'home';
  });

  useEffect(() => {
    // Handle hash-based navigation for role redirects
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ['farmer', 'consumer', 'wholesale'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    // Save current view to localStorage for persistence
    localStorage.setItem('currentView', view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "farmer":
        return <FarmerDashboard />;
      case "consumer":
        return <ConsumerMarketplace />;
      case "wholesale":
        return <WholesaleMarketplace />;
      case "login":
        return <LoginPage onSuccess={() => handleViewChange("home")} onViewChange={handleViewChange} />;
      case "signup":
        return <SignupPage onSuccess={() => handleViewChange("login")} onViewChange={handleViewChange} />;
      default:
        return <HomePage onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
