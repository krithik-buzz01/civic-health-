import { hospitals } from "@/data/mockData";
import { cn } from "@/lib/utils";

const EmergencyPanel = () => {
  const nearest = hospitals.filter((h) => h.status !== "critical").sort((a, b) => a.occupied / a.beds - b.occupied / b.beds);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">🚑 Emergency System</h3>
      <div className="glass-panel rounded-lg p-3 space-y-2">
        <p className="text-xs text-primary font-semibold uppercase tracking-wider">Recommended Hospital</p>
        {nearest[0] && (
          <>
            <p className="text-foreground font-medium">{nearest[0].name}</p>
            <p className="text-xs text-muted-foreground">Ambulances: {nearest[0].ambulances} | Beds free: {nearest[0].beds - nearest[0].occupied}</p>
            <p className="text-xs text-success font-mono">ETA: ~8 min (based on traffic)</p>
          </>
        )}
      </div>
      <div className="glass-panel rounded-lg p-3">
        <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">All Available</p>
        {nearest.map((h) => (
          <div key={h.id} className="flex justify-between py-1 border-b border-border last:border-0">
            <span className="text-xs text-foreground">{h.name}</span>
            <span className="text-xs text-muted-foreground">{h.beds - h.occupied} beds</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyPanel;
