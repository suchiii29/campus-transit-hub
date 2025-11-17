import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, MapPin, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const portals = [
    {
      title: "Student Portal",
      description: "Track buses in real-time, request rides, and view schedules",
      icon: GraduationCap,
      path: "/student/login",
    },
    {
      title: "Driver Portal",
      description: "Update location, manage routes, and track trip progress",
      icon: MapPin,
      path: "/driver/login",
    },
    {
      title: "Admin Portal",
      description: "Monitor fleet, analyze demand, and optimize operations",
      icon: BarChart3,
      path: "/admin/login",
    },
  ];

  return (
    <div className="min-h-screen bg-background dark relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-block">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-eta animate-pulse" />
                <span className="text-sm text-muted-foreground font-medium">Real-time tracking • AI-powered scheduling</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
              Campus Bus Tracking
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                & Scheduling System
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enterprise-grade transportation management for modern campuses
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card
                  key={portal.title}
                  className="glass glass-hover group cursor-pointer"
                  onClick={() => navigate(portal.path)}
                >
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-card-foreground">
                        {portal.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {portal.description}
                      </p>
                    </div>

                    <Button 
                      className="w-full" 
                      variant="outline"
                    >
                      Access Portal
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Feature highlights */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-foreground">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime reliability</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-foreground">Real-time</div>
              <div className="text-sm text-muted-foreground">GPS tracking</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-foreground">AI-powered</div>
              <div className="text-sm text-muted-foreground">Route optimization</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
