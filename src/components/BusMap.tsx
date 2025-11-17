import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { BusLocation } from "@/hooks/useBusSimulation";

interface BusMapProps {
  buses: BusLocation[];
  height?: string;
}

export const BusMap = ({ buses, height = "400px" }: BusMapProps) => {
  return (
    <Card className="glass border-border/50 p-6 relative overflow-hidden" style={{ height }}>
      {/* Dark map background with grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Campus center indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center">
          <Navigation className="w-6 h-6 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-center">Campus</p>
      </div>

      {/* Bus markers */}
      {buses.map((bus, index) => {
        const xPos = 10 + (index % 4) * 20 + Math.random() * 10;
        const yPos = 10 + Math.floor(index / 4) * 25 + Math.random() * 10;

        return (
          <div
            key={bus.id}
            className="absolute z-20 transition-all duration-1000 ease-in-out group"
            style={{
              left: `${xPos}%`,
              top: `${yPos}%`,
            }}
          >
            {/* Bus marker */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform transition-transform group-hover:scale-125 ${
                bus.status === "active"
                  ? "bg-primary border-2 border-primary/50 animate-pulse"
                  : bus.status === "idle"
                  ? "bg-muted border-2 border-border"
                  : "bg-destructive border-2 border-destructive/50"
              }`}
            >
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>

            {/* Hover tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <div className="glass border border-border/50 rounded-lg px-3 py-2 shadow-lg">
                <p className="text-sm font-semibold text-foreground">{bus.busNumber}</p>
                <p className="text-xs text-muted-foreground">{bus.route}</p>
                <p className="text-xs text-eta-indicator font-medium mt-1">ETA: {bus.eta} min</p>
              </div>
            </div>

            {/* Ripple effect for active buses */}
            {bus.status === "active" && (
              <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass border border-border/50 rounded-lg p-3 z-30">
        <p className="text-xs font-semibold text-foreground mb-2">Status</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-xs text-muted-foreground">Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Maintenance</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
