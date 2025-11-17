import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, Bus, Users, TrendingUp, Map, BarChart3, Route, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import StatCard from "@/components/StatCard";
import MapPlaceholder from "@/components/MapPlaceholder";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && (!user || userRole !== "admin")) {
      navigate("/admin/login");
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
      navigate("/admin/login");
    }
  };

  if (loading || !user || userRole !== "admin") {
    return null;
  }

  const demandPredictions = [
    { time: "08:00 AM", predicted: 45, actual: 42 },
    { time: "10:00 AM", predicted: 38, actual: 35 },
    { time: "12:00 PM", predicted: 52, actual: "-" },
    { time: "02:00 PM", predicted: 48, actual: "-" },
    { time: "04:00 PM", predicted: 60, actual: "-" },
  ];

  const clusters = [
    { zone: "North Campus Hub", avgDemand: 45, buses: 3, status: "optimal" },
    { zone: "South Gate Area", avgDemand: 38, buses: 2, status: "optimal" },
    { zone: "Library District", avgDemand: 52, buses: 2, status: "high" },
    { zone: "Sports Complex", avgDemand: 28, buses: 2, status: "low" },
  ];

  const routes = [
    { bus: "BUS-101", newRoute: "Route A → B → C", stops: 5 },
    { bus: "BUS-205", newRoute: "Route D → E → F", stops: 6 },
    { bus: "BUS-308", newRoute: "Route G → H → I", stops: 4 },
  ];

  return (
    <div className="min-h-screen bg-background dark">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-card-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Fleet Management & Analytics</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Active Buses"
            value="12"
            icon={Bus}
            description="Currently operational"
            colorClass="text-primary"
          />
          <StatCard
            title="Student Requests"
            value="156"
            icon={Users}
            description="Today's requests"
            trend="+12% from yesterday"
            colorClass="text-info"
          />
          <StatCard
            title="Predicted Demand"
            value="245"
            icon={TrendingUp}
            description="Next 6 hours"
            colorClass="text-success"
          />
          <StatCard
            title="Clusters Identified"
            value="4"
            icon={Map}
            description="High-demand zones"
            colorClass="text-warning"
          />
        </div>

        {/* Live GPS Tracking Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Map className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Live GPS Tracking</h2>
          </div>
          <MapPlaceholder title="Real-time Fleet Monitoring" height="h-[500px]" />
        </div>

        {/* ML Prediction Section */}
        <Card className="glass border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-success/10 border border-success/20">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground">Demand Prediction</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-background border-border p-4 h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="w-12 h-12 mx-auto text-success opacity-50" />
                <p className="text-sm text-muted-foreground">Prediction Graph Visualization</p>
              </div>
            </Card>

            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Predicted</TableHead>
                    <TableHead>Actual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demandPredictions.map((pred, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{pred.time}</TableCell>
                      <TableCell className="text-success">{pred.predicted}</TableCell>
                      <TableCell className={pred.actual === "-" ? "text-muted-foreground" : ""}>
                        {pred.actual}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>

        {/* K-Means Clustering Section */}
        <Card className="glass border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-warning/10 border border-warning/20">
              <Map className="w-5 h-5 text-warning" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground">Clustering Analysis</h2>
          </div>

          <Card className="bg-background border-border p-6 h-48 flex items-center justify-center mb-4">
            <div className="text-center space-y-2">
              <Map className="w-12 h-12 mx-auto text-warning opacity-50" />
              <p className="text-sm text-muted-foreground">Demand Heatmap Visualization</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clusters.map((cluster, index) => (
              <Card key={index} className="bg-background border-border p-4 space-y-2">
                <h3 className="font-semibold text-card-foreground">{cluster.zone}</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg Demand: <span className="text-foreground font-medium">{cluster.avgDemand}</span></p>
                  <p className="text-sm text-muted-foreground">Assigned Buses: <span className="text-foreground font-medium">{cluster.buses}</span></p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cluster.status === "optimal" ? "bg-success/10 text-success" :
                    cluster.status === "high" ? "bg-warning/10 text-warning" :
                    "bg-info/10 text-info"
                  }`}>
                    {cluster.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Route Optimization Section */}
        <Card className="glass border-border/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Route className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">Route Optimization</h2>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Route className="w-4 h-4 mr-2" />
              Optimize Routes
            </Button>
          </div>

          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus ID</TableHead>
                  <TableHead>New Route</TableHead>
                  <TableHead>Stops</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{route.bus}</TableCell>
                    <TableCell>{route.newRoute}</TableCell>
                    <TableCell>{route.stops}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Apply</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Driver Assignment Section */}
        <Card className="glass border-border/50 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground">Driver Assignment</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Driver</label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Choose driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver1">John Smith (D-101)</SelectItem>
                  <SelectItem value="driver2">Sarah Johnson (D-102)</SelectItem>
                  <SelectItem value="driver3">Mike Williams (D-103)</SelectItem>
                  <SelectItem value="driver4">Emily Davis (D-104)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Bus</label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Choose bus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bus1">BUS-101</SelectItem>
                  <SelectItem value="bus2">BUS-205</SelectItem>
                  <SelectItem value="bus3">BUS-308</SelectItem>
                  <SelectItem value="bus4">BUS-412</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Assign Driver
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
