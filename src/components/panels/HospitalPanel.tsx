import { hospitals } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const statusStyle = { good: "text-success", warning: "text-warning", critical: "text-destructive" };
const statusLabel = { good: "Available", warning: "Moderate", critical: "Full" };

const HospitalPanel = () => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">🏥 Hospital Status</h3>
    {hospitals.map((h) => {
      const pct = Math.round((h.occupied / h.beds) * 100);
      return (
        <div key={h.id} className="glass-panel rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{h.name}</span>
            <span className={cn("text-xs font-semibold", statusStyle[h.status])}>{statusLabel[h.status]}</span>
          </div>
          <Progress value={pct} className="h-1.5" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{h.occupied}/{h.beds} beds</span>
            <span>🚑 {h.ambulances}</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default HospitalPanel;
