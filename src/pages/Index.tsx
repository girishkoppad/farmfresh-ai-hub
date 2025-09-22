import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import FarmerDashboard from "@/components/FarmerDashboard";
import ConsumerMarketplace from "@/components/ConsumerMarketplace";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");

  const renderCurrentView = () => {
    switch (currentView) {
      case "farmer":
        return <FarmerDashboard />;
      case "consumer":
        return <ConsumerMarketplace />;
      case "admin":
        return <AdminPanel />;
      default:
        return <HomePage onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
