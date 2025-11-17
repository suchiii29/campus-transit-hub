import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/auth/AuthForm";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (user && userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [user, userRole, navigate]);

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl" />
            <Card className="glass border-primary/20 p-12 relative">
              <div className="space-y-6 text-center">
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 inline-block">
                  <BarChart3 className="w-20 h-20 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Admin Portal</h2>
                  <p className="text-muted-foreground mt-2">Monitor fleet • Analyze data • Optimize routes</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="glass border-border/50 p-8 space-y-6">
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
            <h1 className="text-3xl font-bold text-card-foreground">Admin Portal</h1>
            <p className="text-muted-foreground">
              Manage fleet operations and optimize routes
            </p>
          </div>

          <AuthForm 
            role="admin" 
            onSuccess={() => navigate("/admin/dashboard")} 
          />
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
