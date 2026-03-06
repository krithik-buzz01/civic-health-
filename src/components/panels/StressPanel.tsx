import { stressMarkers } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusStyle = { good: "text-success", warning: "text-warning", critical: "text-destructive" };
const statusLabel = { good: "Normal", warning: "Medium Load", critical: "High Stress" };

const StressPanel = () => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">🔥 Stress Zones</h3>
    {stressMarkers.map((m) => (
      <div key={m.id} className="glass-panel rounded-lg p-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{m.label}</span>
          <span className={cn("text-xs font-mono font-semibold", statusStyle[m.status])}>{statusLabel[m.status]}</span>
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
          {Object.entries(m.details).map(([k, v]) => (
            <span key={k}><span className="capitalize">{k}:</span> {v}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default StressPanel;
