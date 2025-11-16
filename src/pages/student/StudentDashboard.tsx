import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, Bus, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import MapPlaceholder from "@/components/MapPlaceholder";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || userRole !== "student")) {
      navigate("/student/login");
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
      navigate("/student/login");
    }
  };

  if (loading || !user || userRole !== "student") {
    return null;
  }

  const nearestBuses = [
    { id: "BUS-101", route: "Main Campus → North Gate", eta: "5 mins", distance: "0.8 km" },
    { id: "BUS-205", route: "Library → South Campus", eta: "12 mins", distance: "2.1 km" },
    { id: "BUS-308", route: "Sports Complex → East Block", eta: "18 mins", distance: "3.5 km" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-card-foreground">Student Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Student</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Request a Bus Section */}
        <Card className="bg-card border-border p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Bus className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-card-foreground">Request a Bus</h2>
          </div>
          
          <form className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Point</Label>
              <Select>
                <SelectTrigger id="pickup" className="bg-background">
                  <SelectValue placeholder="Select pickup location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-gate">Main Gate</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="north-campus">North Campus</SelectItem>
                  <SelectItem value="sports-complex">Sports Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dropoff">Drop Point</Label>
              <Select>
                <SelectTrigger id="dropoff" className="bg-background">
                  <SelectValue placeholder="Select drop location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="south-gate">South Gate</SelectItem>
                  <SelectItem value="east-block">East Block</SelectItem>
                  <SelectItem value="west-campus">West Campus</SelectItem>
                  <SelectItem value="hostel">Hostel Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Input
                id="time"
                type="time"
                className="bg-background"
              />
            </div>
          </form>

          <Button className="w-full md:w-auto">
            Submit Request
          </Button>
        </Card>

        {/* Track Bus Live Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-info" />
            <h2 className="text-xl font-semibold text-foreground">Track Bus Live</h2>
          </div>
          <MapPlaceholder title="Live Bus Tracking" height="h-[400px]" />
        </div>

        {/* Nearest Buses Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-success" />
            <h2 className="text-xl font-semibold text-foreground">Nearest Buses</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {nearestBuses.map((bus) => (
              <Card key={bus.id} className="bg-card border-border p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{bus.id}</span>
                  <span className="text-sm px-2 py-1 bg-success/10 text-success rounded-full">
                    {bus.eta}
                  </span>
                </div>
                <p className="text-sm text-card-foreground">{bus.route}</p>
                <p className="text-xs text-muted-foreground">{bus.distance} away</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
