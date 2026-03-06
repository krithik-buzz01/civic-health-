import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useApp } from "@/context/AppContext";
import {
  stressMarkers, healthMarkers, weatherMarkers, agingMarkers,
  complaintMarkers, hospitals, MapMarker, MapCategory,
} from "@/data/mockData";

const CHENNAI: [number, number] = [13.0827, 80.2707];

const statusColors: Record<string, string> = {
  good: "#22c55e",
  warning: "#eab308",
  critical: "#ef4444",
};

const weatherColors: Record<string, string> = {
  Flood: "#3b82f6",
  "Heat Stress": "#f97316",
  Storm: "#a855f7",
};

function getMarkersForCategory(category: MapCategory, reports: any[]): MapMarker[] {
  switch (category) {
    case "stress": return stressMarkers;
    case "health": return healthMarkers;
    case "weather": return weatherMarkers;
    case "aging": return agingMarkers;
    case "complaints": return complaintMarkers;
    case "damage":
    case "departments":
      return reports.map((r) => ({
        id: r.id, lat: r.lat, lng: r.lng, label: r.location || r.type,
        status: r.status === "resolved" ? "good" as const : r.status === "assigned" ? "warning" as const : "critical" as const,
        category: "damage" as MapCategory,
        details: { type: r.type, status: r.status, department: r.department },
      }));
    case "emergency":
    case "hospitals":
      return hospitals.map((h) => ({
        id: h.id, lat: h.lat, lng: h.lng, label: h.name,
        status: h.status, category: "hospitals" as MapCategory,
        details: { beds: h.beds, occupied: h.occupied, ambulances: h.ambulances },
      }));
    default: return [];
  }
}

const ChennaiMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const { activeCategory, reports } = useApp();

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: CHENNAI,
      zoom: 12,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Fix tile rendering on container resize
    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when category or reports change
  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    const markers = getMarkersForCategory(activeCategory, reports);

    markers.forEach((m) => {
      const color = activeCategory === "weather" && m.details.risk
        ? weatherColors[m.details.risk as string] || statusColors[m.status]
        : statusColors[m.status];

      const popupContent = `
        <div style="font-size:12px;color:#1a1a2e;">
          <p style="font-weight:bold;font-size:13px;margin:0 0 4px">${m.label}</p>
          ${Object.entries(m.details).map(([k, v]) =>
            `<p style="margin:2px 0"><strong style="text-transform:capitalize">${k}:</strong> ${v}</p>`
          ).join("")}
        </div>
      `;

      L.circleMarker([m.lat, m.lng], {
        radius: 12,
        color,
        fillColor: color,
        fillOpacity: 0.6,
        weight: 2,
      })
        .bindPopup(popupContent)
        .addTo(markersLayerRef.current!);
    });

    mapRef.current.setView(CHENNAI, 12);
  }, [activeCategory, reports]);

  return <div ref={containerRef} className="h-full w-full rounded-lg" />;
};

export default ChennaiMap;
