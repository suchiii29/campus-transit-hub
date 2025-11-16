import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  colorClass?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  colorClass = "text-primary" 
}: StatCardProps) => {
  return (
    <Card className="bg-card border-border p-6 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={`${colorClass} p-3 bg-secondary rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">{trend}</p>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
