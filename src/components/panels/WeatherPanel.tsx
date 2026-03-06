import { weatherMarkers } from "@/data/mockData";
import { cn } from "@/lib/utils";

const riskColors: Record<string, string> = {
  Flood: "text-info",
  "Heat Stress": "text-heat",
  Storm: "text-storm",
};

const WeatherPanel = () => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">🌦️ Weather Impact</h3>
    {weatherMarkers.map((m) => (
      <div key={m.id} className="glass-panel rounded-lg p-3 space-y-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-foreground">{m.label}</span>
          <span className={cn("text-xs font-semibold", riskColors[m.details.risk as string] || "text-muted-foreground")}>
            {m.details.risk as string}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Impact: {m.details.impact as string}</p>
        <p className="text-xs text-muted-foreground">
          {m.details.rainfall ? `Rain: ${m.details.rainfall}` : m.details.temp ? `Temp: ${m.details.temp}` : `Wind: ${m.details.wind}`}
        </p>
      </div>
    ))}
  </div>
);

export default WeatherPanel;
