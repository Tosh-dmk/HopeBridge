import { useEffect, useRef } from "react";
import type { AssistanceCenter } from "@/lib/data";

interface InteractiveMapProps {
  centers: AssistanceCenter[];
  selectedId?: string;
  onSelectId?: (id: string) => void;
  className?: string;
  showHazards?: boolean;
}

const MOCK_HAZARDS = [
  { id: "h1", name: "Active Flooding - Nyando River Basin", lat: -0.174, lng: 34.92, description: "River Nyando burst its banks. Flooding in low-lying villages." },
  { id: "h2", name: "Flash Flooding - Nairobi Mathare", lat: -1.2655, lng: 36.8574, description: "Severe urban floods. Heavy drainage overflow reported." },
  { id: "h3", name: "Landslide Risk - West Pokot", lat: 1.239, lng: 35.122, description: "Mudslides reported along Kapenguria-Lodwar Highway." },
];

export function InteractiveMap({
  centers,
  selectedId,
  onSelectId,
  className = "",
  showHazards = false,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});
  const hazardMarkersRef = useRef<any[]>([]);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined" || !mapRef.current) return;

    let mapInstance: any;
    let L: any;

    const initMap = async () => {
      try {
        L = await import("leaflet");
        
        // If map is already initialized, skip initialization
        if (leafletMapRef.current) return;

        // Default to Nairobi, Kenya
        const defaultCenter: [number, number] = [-1.2921, 36.8219];
        const defaultZoom = 6;

        mapInstance = L.map(mapRef.current, {
          zoomControl: true,
          scrollWheelZoom: false, // Prevents accidental scrolling while scrolling pages
        }).setView(defaultCenter, defaultZoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance);

        leafletMapRef.current = mapInstance;

        // Add markers
        updateMarkers(L, mapInstance);
      } catch (err) {
        console.error("Error loading Leaflet map:", err);
      }
    };

    const updateMarkers = (leafletLib: any, mapInst: any) => {
      // Clear existing markers
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};

      // Clear existing hazard markers
      hazardMarkersRef.current.forEach((m) => m.remove());
      hazardMarkersRef.current = [];

      // Add hazard markers if enabled
      if (showHazards) {
        MOCK_HAZARDS.forEach((h) => {
          const icon = leafletLib.divIcon({
            className: "custom-hazard-icon",
            html: `
              <style>
                @keyframes hazard-pulse-${h.id} {
                  0% { transform: scale(0.25); opacity: 0.85; }
                  100% { transform: scale(2.2); opacity: 0; }
                }
              </style>
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;">
                <div style="position: absolute; width: 40px; height: 40px; background: rgba(239, 68, 68, 0.4); border-radius: 50%; animation: hazard-pulse-${h.id} 1.8s infinite ease-out;"></div>
                <div style="position: absolute; width: 14px; height: 14px; background: rgb(239, 68, 68); border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></div>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });

          const marker = leafletLib
            .marker([h.lat, h.lng], { icon })
            .addTo(mapInst)
            .bindPopup(`<strong>${h.name}</strong><br/>${h.description}`);

          hazardMarkersRef.current.push(marker);
        });
      }

      const bounds: any[] = [];

      centers.forEach((c) => {
        if (c.lat === null || c.lng === null || c.lat === undefined || c.lng === undefined) return;

        const isSelected = c.id === selectedId;
        // Emergency red (oklch 0.55 0.22 25) vs Brand sage (oklch 0.55 0.07 152)
        const color = isSelected ? "#ef4444" : "#45785f";
        const size = isSelected ? 34 : 26;

        const icon = leafletLib.divIcon({
          className: "custom-div-icon",
          html: `<div style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${size}px;
            height: ${size}px;
            background: ${color}22;
            border-radius: 50%;
            border: 2px solid ${color};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
          ">
            <div style="
              width: ${isSelected ? 14 : 10}px;
              height: ${isSelected ? 14 : 10}px;
              background: ${color};
              border-radius: 50%;
            "></div>
          </div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = leafletLib
          .marker([c.lat, c.lng], { icon })
          .addTo(mapInst)
          .on("click", () => {
            if (onSelectId) onSelectId(c.id);
          });

        markersRef.current[c.id] = marker;
        bounds.push([c.lat, c.lng]);
      });

      // Fit bounds if we have multiple markers and no specific center is selected
      if (bounds.length > 0 && !selectedId) {
        mapInst.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      } else if (selectedId) {
        const selCenter = centers.find((c) => c.id === selectedId);
        if (selCenter && selCenter.lat !== null && selCenter.lng !== null) {
          mapInst.setView([selCenter.lat, selCenter.lng], 13, { animate: true });
        }
      }
    };

    initMap();

    return () => {
      // Clean up map on unmount
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [centers, showHazards]);

  // Handle selectedId changes dynamically without recreating the map instance
  useEffect(() => {
    if (!leafletMapRef.current || centers.length === 0) return;

    // Pan to selected marker
    if (selectedId) {
      const selCenter = centers.find((c) => c.id === selectedId);
      if (selCenter && selCenter.lat !== null && selCenter.lng !== null) {
        leafletMapRef.current.setView([selCenter.lat, selCenter.lng], 13, { animate: true });
      }
    }

    // Dynamically update marker icon classes to reflect selected states
    centers.forEach((c) => {
      const marker = markersRef.current[c.id];
      if (!marker) return;

      const isSelected = c.id === selectedId;
      const color = isSelected ? "#ef4444" : "#45785f";
      const size = isSelected ? 34 : 26;

      // Update leaflet icon html dynamically using standard DOM modifications on Leaflet element if active
      if (marker._icon) {
        const el = marker._icon.querySelector("div");
        if (el) {
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.borderColor = color;
          el.style.background = `${color}22`;
          const dot = el.querySelector("div");
          if (dot) {
            dot.style.width = `${isSelected ? 14 : 10}px`;
            dot.style.height = `${isSelected ? 14 : 10}px`;
            dot.style.background = color;
          }
        }
      }
    });
  }, [selectedId, centers]);

  return <div ref={mapRef} className={className} style={{ minHeight: "350px" }} />;
}
