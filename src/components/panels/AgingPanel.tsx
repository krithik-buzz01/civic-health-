import { agingMarkers } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusStyle = { good: "text-success", warning: "text-warning", critical: "text-destructive" };
const statusLabel = { good: "New", warning: "Moderate", critical: "Very Old" };

const AgingPanel = () => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">⏳ Asset Age</h3>
    {agingMarkers.map((m) => (
      <div key={m.id} className="glass-panel rounded-lg p-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-foreground">{m.label}</p>
            <p className="text-xs text-muted-foreground">{m.details.type as string} • Built {m.details.built as number}</p>
          </div>
          <div className="text-right">
            <span className={cn("text-xs font-semibold", statusStyle[m.status])}>{statusLabel[m.status]}</span>
            <p className="text-xs text-muted-foreground">{m.details.age as string}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default AgingPanel;
