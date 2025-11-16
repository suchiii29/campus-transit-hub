import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, MapPin, Route, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import MapPlaceholder from "@/components/MapPlaceholder";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || userRole !== "driver")) {
      navigate("/driver/login");
    }
  }, [user, userRole, loading, navigate]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      navigate("/driver/login");
    }
  };

  if (loading || !user || userRole !== "driver") {
    return null;
  }

  const assignedRoute = [
    { stop: "Main Gate", time: "08:00 AM", status: "completed" },
    { stop: "Library Junction", time: "08:15 AM", status: "completed" },
    { stop: "North Campus", time: "08:30 AM", status: "current" },
    { stop: "Sports Complex", time: "08:45 AM", status: "upcoming" },
    { stop: "South Gate", time: "09:00 AM", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-card-foreground">Driver Dashboard</h1>
            <p className="text-sm text-muted-foreground">Bus ID: BUS-101</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Update Location Section */}
        <Card className="bg-card border-border p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-card-foreground">Update Location</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-lg font-medium text-card-foreground">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <Button>
              <MapPin className="w-4 h-4 mr-2" />
              Send Current GPS Location
            </Button>
          </div>
        </Card>

        {/* Assigned Route Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-info" />
            <h2 className="text-xl font-semibold text-foreground">Assigned Route</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border p-6 space-y-4">
              <h3 className="font-semibold text-card-foreground">Route Stops</h3>
              <div className="space-y-3">
                {assignedRoute.map((stop, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      stop.status === "current"
                        ? "bg-primary/10 border border-primary"
                        : stop.status === "completed"
                        ? "bg-success/5"
                        : "bg-secondary"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stop.status === "current"
                          ? "bg-primary text-primary-foreground"
                          : stop.status === "completed"
                          ? "bg-success text-success-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground">{stop.stop}</p>
                      <p className="text-sm text-muted-foreground">{stop.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <MapPlaceholder title="Route Map" height="h-full min-h-[400px]" />
          </div>
        </div>

        {/* Trip Summary Section */}
        <Card className="bg-card border-border p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-success" />
            <h2 className="text-xl font-semibold text-card-foreground">Trip Summary</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Stops</p>
              <p className="text-2xl font-bold text-card-foreground">5</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-success">2</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Distance Covered</p>
              <p className="text-2xl font-bold text-card-foreground">8.5 km</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Passengers</p>
              <p className="text-2xl font-bold text-card-foreground">24</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DriverDashboard;
