import { useApp } from "@/context/AppContext";
import { categoryInfo } from "@/data/mockData";
import StressPanel from "./panels/StressPanel";
import HealthPanel from "./panels/HealthPanel";
import WeatherPanel from "./panels/WeatherPanel";
import AgingPanel from "./panels/AgingPanel";
import ComplaintsPanel from "./panels/ComplaintsPanel";
import HospitalPanel from "./panels/HospitalPanel";
import EmergencyPanel from "./panels/EmergencyPanel";
import DepartmentPanel from "./panels/DepartmentPanel";
import DamagePanel from "./panels/DamagePanel";
import ReportForm from "./panels/ReportForm";

const panelMap: Record<string, React.FC> = {
  stress: StressPanel,
  health: HealthPanel,
  weather: WeatherPanel,
  aging: AgingPanel,
  complaints: ComplaintsPanel,
  hospitals: HospitalPanel,
  emergency: EmergencyPanel,
  departments: DepartmentPanel,
  damage: DamagePanel,
};

const InfoPanel = () => {
  const { activeCategory, role } = useApp();
  const info = categoryInfo[activeCategory];
  const Panel = panelMap[activeCategory];

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{info.icon}</span>
          <h2 className="text-sm font-bold text-foreground">{info.title}</h2>
        </div>
        <p className="text-xs text-muted-foreground">{info.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold uppercase tracking-wider">
            {role === "government" ? "Gov View" : "Citizen View"}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success font-mono">LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {Panel && <Panel />}
        {role === "citizen" && (
          <div className="pt-2 border-t border-border">
            <ReportForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
