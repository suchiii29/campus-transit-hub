import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  title?: string;
  height?: string;
}

const MapPlaceholder = ({ title = "Map View", height = "h-96" }: MapPlaceholderProps) => {
  return (
    <Card className={`bg-card border-border ${height} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-info/5" />
      <div className="relative text-center space-y-4">
        <MapPin className="w-16 h-16 mx-auto text-primary opacity-50" />
        <div>
          <p className="text-lg font-medium text-card-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">Live tracking interface</p>
        </div>
      </div>
    </Card>
  );
};

export default MapPlaceholder;
