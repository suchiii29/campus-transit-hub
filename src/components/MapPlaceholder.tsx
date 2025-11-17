import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  title?: string;
  height?: string;
}

const MapPlaceholder = ({ title = "Map View", height = "h-96" }: MapPlaceholderProps) => {
  return (
    <Card className={`glass border-border/50 ${height} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      <div className="relative text-center space-y-4 z-10">
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 inline-block">
          <MapPin className="w-12 h-12 mx-auto text-primary" />
        </div>
        <div>
          <p className="text-base font-semibold text-card-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">Map integration placeholder</p>
        </div>
      </div>
    </Card>
  );
};

export default MapPlaceholder;
