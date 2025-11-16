import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Bus, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const portals = [
    {
      title: "Student Portal",
      description: "Request buses, track locations, and view schedules",
      icon: Users,
      path: "/student/login",
      color: "text-info",
    },
    {
      title: "Driver Portal",
      description: "Update location, view routes, and manage trips",
      icon: Bus,
      path: "/driver/login",
      color: "text-success",
    },
    {
      title: "Admin Portal",
      description: "Monitor fleet, optimize routes, and analyze data",
      icon: Settings,
      path: "/admin/login",
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            College Bus Tracking System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart scheduling and real-time tracking for campus transportation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card
                key={portal.title}
                className="bg-card border-border p-8 hover:border-primary transition-all cursor-pointer group"
                onClick={() => navigate(portal.path)}
              >
                <div className="space-y-4">
                  <div className={`${portal.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-card-foreground">
                      {portal.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {portal.description}
                    </p>
                  </div>
                  <Button className="w-full" variant="outline">
                    Access Portal
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
