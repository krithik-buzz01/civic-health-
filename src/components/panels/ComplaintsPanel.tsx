import { complaintMarkers } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusStyle = { good: "text-success", warning: "text-warning", critical: "text-destructive" };

const ComplaintsPanel = () => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">📢 Complaint Clusters</h3>
    {complaintMarkers.map((m) => (
      <div key={m.id} className="glass-panel rounded-lg p-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-foreground">{m.label}</span>
          <span className={cn("text-lg font-mono font-bold", statusStyle[m.status])}>{m.details.count as number}</span>
        </div>
        <p className="text-xs text-muted-foreground">Top issue: {m.details.topIssue as string}</p>
        <p className="text-xs text-muted-foreground">Avg response: {m.details.avgResponse as string}</p>
      </div>
    ))}
  </div>
);

export default ComplaintsPanel;
