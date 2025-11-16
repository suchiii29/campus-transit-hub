import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/auth/AuthForm";
import adminIllustration from "@/assets/admin-illustration.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (user && userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [user, userRole, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <img
            src={adminIllustration}
            alt="Admin Portal"
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
