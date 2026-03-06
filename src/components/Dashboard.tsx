import { useApp } from "@/context/AppContext";
import CategorySidebar from "./CategorySidebar";
import ChennaiMap from "./ChennaiMap";
import InfoPanel from "./InfoPanel";
import { Activity, MapPin } from "lucide-react";

const Dashboard = () => {
  const { role, reports } = useApp();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="h-11 flex items-center justify-between px-4 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-foreground tracking-tight">CityPulse</span>
          <span className="text-xs text-muted-foreground">• Chennai Infrastructure</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-success font-mono animate-pulse-glow">● LIVE</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>Chennai, TN</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-semibold uppercase">
            {role}
          </span>
          {role === "government" && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-destructive/20 text-destructive font-mono">
              {reports.filter((r) => r.status === "pending").length} pending
            </span>
          )}
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        <CategorySidebar />
        <div className="flex-1 relative">
          <ChennaiMap />
        </div>
        <InfoPanel />
      </div>
    </div>
  );
};

export default Dashboard;
