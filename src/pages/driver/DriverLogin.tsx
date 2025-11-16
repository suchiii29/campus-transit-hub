import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import driverIllustration from "@/assets/driver-illustration.png";

const DriverLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/driver/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <img
            src={driverIllustration}
            alt="Driver Portal"
            className="w-full h-auto rounded-2xl opacity-80"
          />
        </div>

        <Card className="bg-card border-border p-8 space-y-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-card-foreground">Driver Portal</h1>
            <p className="text-muted-foreground">
              Access your route assignments and trip details
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="driverId">Driver ID</Label>
              <Input
                id="driverId"
                type="text"
                placeholder="Enter your driver ID"
                className="bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-background"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login as Driver
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DriverLogin;
