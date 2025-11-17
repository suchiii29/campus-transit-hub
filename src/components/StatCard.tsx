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
    <Card className="glass border-border/50 p-6 space-y-3 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-card-foreground tabular-nums">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={`${colorClass} p-3 bg-secondary/50 rounded-lg border border-border/50`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="pt-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground">{trend}</p>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
