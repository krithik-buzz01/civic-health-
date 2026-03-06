import { healthMarkers } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const HealthPanel = () => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">🏗️ Health Scores</h3>
    {healthMarkers.map((m) => {
      const score = Number(m.details.score);
      const color = score >= 70 ? "text-success" : score >= 40 ? "text-warning" : "text-destructive";
      return (
        <div key={m.id} className="glass-panel rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-foreground">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.details.type as string}</p>
            </div>
            <span className={cn("text-lg font-mono font-bold", color)}>{score}</span>
          </div>
          <Progress value={score} className="h-1.5" />
        </div>
      );
    })}
  </div>
);

export default HealthPanel;
