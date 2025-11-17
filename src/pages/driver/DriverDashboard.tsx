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
  const { user, userRole, loading } = useAuth();
  const { toast } = useToast();
  
  const [tripActive, setTripActive] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || userRole !== "driver")) {
      navigate("/driver/login");
    }
  }, [user, userRole, loading, navigate]);

  const handleStartTrip = () => {
    setTripActive(true);
    setCurrentStop(0);
    toast({
      title: "Trip Started",
      description: "Your route is now active",
    });
  };

  const handleEndTrip = () => {
    setTripActive(false);
    toast({
      title: "Trip Ended",
      description: "Route completed successfully",
    });
  };

  const handleUpdateLocation = () => {
    toast({
      title: "Location Updated",
      description: "Your GPS location has been updated",
    });
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
    <div className="min-h-screen bg-background dark">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-card-foreground">Driver Dashboard</h1>
            <p className="text-sm text-muted-foreground">Bus ID: BUS-101</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Update Location Section */}
        <Card className="glass border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground">GPS Location</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-xl font-semibold text-card-foreground tabular-nums">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <MapPin className="w-4 h-4 mr-2" />
              Update Location
            </Button>
          </div>
        </Card>

        {/* Assigned Route Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Route className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Assigned Route</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass border-border/50 p-6 space-y-4">
              <h3 className="font-semibold text-card-foreground">Route Stops</h3>
              <div className="space-y-2">
                {assignedRoute.map((stop, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                      stop.status === "current"
                        ? "bg-primary/10 border border-primary/50"
                        : stop.status === "completed"
                        ? "bg-card/50 border border-border/30"
                        : "bg-card/30 border border-border/20"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                        stop.status === "current"
                          ? "bg-primary text-primary-foreground"
                          : stop.status === "completed"
                          ? "bg-success/20 text-success border border-success/30"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground text-sm">{stop.stop}</p>
                      <p className="text-xs text-muted-foreground tabular-nums">{stop.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <MapPlaceholder title="Route Navigation" height="h-full min-h-[400px]" />
          </div>
        </div>

        {/* Trip Summary Section */}
        <Card className="glass border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-success/10 border border-success/20">
              <Clock className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground">Trip Summary</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Stops</p>
              <p className="text-3xl font-bold text-card-foreground tabular-nums">5</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold text-success tabular-nums">2</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="text-3xl font-bold text-card-foreground tabular-nums">8.5<span className="text-base ml-1">km</span></p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Passengers</p>
              <p className="text-3xl font-bold text-card-foreground tabular-nums">24</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default DriverDashboard;
