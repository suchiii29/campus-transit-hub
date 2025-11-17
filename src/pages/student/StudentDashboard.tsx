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
  const { user, userRole, loading } = useAuth();
  const { toast } = useToast();
  const { buses } = useBusSimulation(8);
  
  const [pickupPoint, setPickupPoint] = useState("");
  const [dropPoint, setDropPoint] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || userRole !== "student")) {
      navigate("/student/login");
    }
  }, [user, userRole, loading, navigate]);

  const handleRequestRide = async () => {
    if (!pickupPoint || !dropPoint) {
      toast({
        title: "Missing Information",
        description: "Please provide both pickup and drop points",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ride Requested",
      description: "Your bus request has been submitted successfully",
    });

    setPickupPoint("");
    setDropPoint("");
    setPreferredTime("");
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
    <div className="min-h-screen bg-background dark">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-card-foreground">Student Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time bus tracking & scheduling</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Request a Bus Section */}
        <Card className="glass border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Bus className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground">Request a Bus</h2>
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

          <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">
            Submit Request
          </Button>
        </Card>

        {/* Track Bus Live Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Live Bus Tracking</h2>
          </div>
          <MapPlaceholder title="Real-time Fleet Monitoring" height="h-[400px]" />
        </div>

        {/* Nearest Buses Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-eta/10 border border-eta/20">
              <Clock className="w-5 h-5 text-eta" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Nearest Buses</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {nearestBuses.map((bus) => (
              <Card key={bus.id} className="glass border-border/50 p-5 space-y-3 hover:border-primary/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-foreground">{bus.id}</span>
                  <span className="text-xs px-3 py-1 bg-eta/20 text-eta rounded-full font-medium border border-eta/30">
                    {bus.eta}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{bus.route}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {bus.distance} away
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
