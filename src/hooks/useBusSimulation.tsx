import { useState, useEffect } from "react";

export interface BusLocation {
  id: string;
  busNumber: string;
  route: string;
  latitude: number;
  longitude: number;
  eta: number;
  distance: number;
  status: "active" | "idle" | "maintenance";
  stops: string[];
  currentStopIndex: number;
}

// Simulated campus coordinates (example: college campus area)
const CAMPUS_CENTER = { lat: 40.7128, lng: -74.0060 };

const generateRandomBuses = (count: number): BusLocation[] => {
  const routes = ["Route A", "Route B", "Route C", "Route D"];
  const stops = [
    ["Main Gate", "Library", "Engineering Block", "Cafeteria", "Sports Complex"],
    ["Main Gate", "Admin Block", "Medical Center", "Hostel Area", "Back Gate"],
    ["Library", "Science Block", "Arts Building", "Parking Lot", "Main Gate"],
    ["Hostel Area", "Cafeteria", "Engineering Block", "Admin Block", "Main Gate"],
  ];

  return Array.from({ length: count }, (_, i) => {
    const routeIndex = i % routes.length;
    return {
      id: `bus-${i + 1}`,
      busNumber: `BUS-${String(i + 1).padStart(3, "0")}`,
      route: routes[routeIndex],
      latitude: CAMPUS_CENTER.lat + (Math.random() - 0.5) * 0.02,
      longitude: CAMPUS_CENTER.lng + (Math.random() - 0.5) * 0.02,
      eta: Math.floor(Math.random() * 15) + 2,
      distance: parseFloat((Math.random() * 5 + 0.5).toFixed(1)),
      status: Math.random() > 0.8 ? "idle" : "active",
      stops: stops[routeIndex],
      currentStopIndex: Math.floor(Math.random() * stops[routeIndex].length),
    };
  });
};

export const useBusSimulation = (busCount: number = 8) => {
  const [buses, setBuses] = useState<BusLocation[]>([]);

  useEffect(() => {
    // Initialize buses
    setBuses(generateRandomBuses(busCount));

    // Simulate bus movement every 3 seconds
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          if (bus.status !== "active") return bus;

          // Simulate movement (small random changes)
          const newLat = bus.latitude + (Math.random() - 0.5) * 0.001;
          const newLng = bus.longitude + (Math.random() - 0.5) * 0.001;
          
          // Update ETA and distance
          const newEta = Math.max(1, bus.eta + (Math.random() > 0.5 ? -1 : 1));
          const newDistance = parseFloat((bus.distance + (Math.random() - 0.5) * 0.2).toFixed(1));

          // Occasionally move to next stop
          const shouldMoveToNextStop = Math.random() > 0.9;
          const newStopIndex = shouldMoveToNextStop
            ? (bus.currentStopIndex + 1) % bus.stops.length
            : bus.currentStopIndex;

          return {
            ...bus,
            latitude: newLat,
            longitude: newLng,
            eta: newEta,
            distance: Math.max(0.1, newDistance),
            currentStopIndex: newStopIndex,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [busCount]);

  return { buses };
};
