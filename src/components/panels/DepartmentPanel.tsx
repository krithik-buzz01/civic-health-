import { departmentStats } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

const DepartmentPanel = () => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">📊 Department Performance</h3>
    {departmentStats.map((d) => {
      const total = d.resolved + d.pending;
      const pct = Math.round((d.resolved / total) * 100);
      return (
        <div key={d.name} className="glass-panel rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{d.name}</span>
            <span className="text-xs text-primary font-mono">⭐ {d.rating}</span>
          </div>
          <Progress value={pct} className="h-1.5" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Resolved: {d.resolved}</span>
            <span>Pending: {d.pending}</span>
            <span>Avg: {d.avgTime}</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default DepartmentPanel;
