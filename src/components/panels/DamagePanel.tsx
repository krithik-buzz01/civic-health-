import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { workers, SLA_HOURS, damageTypes } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, Clock, UserCheck, CheckCircle, Building2, ChevronDown } from "lucide-react";

const statusStyle = {
  pending: "text-destructive",
  assigned: "text-warning",
  resolved: "text-success",
};

const allDepartments = [...new Set(damageTypes.map((d) => d.department))];

const DamagePanel = () => {
  const { reports, role, assignWorker, reassignDepartment, resolveReport } = useApp();
  const [now, setNow] = useState(new Date());
  const [openDeptSelect, setOpenDeptSelect] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    reports.forEach((r) => {
      if (r.status === "assigned" && r.slaDeadline && !r.slaBreached) {
        const deadline = new Date(r.slaDeadline);
        if (now > deadline) {
          toast.error(
            `⚠️ SLA Breached! Worker "${r.assignedWorker}" has not resolved "${r.type}" at ${r.location} within ${SLA_HOURS[r.type] || 24}h deadline!`,
            { duration: 8000 }
          );
        }
      }
    });
  }, [now, reports]);

  const isBreached = (r: typeof reports[0]) => {
    if (!r.slaDeadline || r.status === "resolved") return false;
    return new Date() > new Date(r.slaDeadline);
  };

  const getTimeLeft = (r: typeof reports[0]) => {
    if (!r.slaDeadline) return null;
    const diff = new Date(r.slaDeadline).getTime() - now.getTime();
    if (diff <= 0) return "OVERDUE";
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${mins}m left`;
  };

  const availableWorkers = (dept: string) =>
    workers.filter((w) => w.department === dept && w.available);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">🔧 Damage Reports</h3>
      <div className="flex gap-2 text-xs">
        <span className="text-destructive font-mono">● {reports.filter((r) => r.status === "pending").length} Pending</span>
        <span className="text-warning font-mono">● {reports.filter((r) => r.status === "assigned").length} Assigned</span>
        <span className="text-success font-mono">● {reports.filter((r) => r.status === "resolved").length} Resolved</span>
      </div>

      {reports.map((r) => {
        const breached = isBreached(r);
        const timeLeft = getTimeLeft(r);
        const deptWorkers = availableWorkers(r.department);
        const showDeptSelect = openDeptSelect === r.id;

        return (
          <div
            key={r.id}
            className={cn(
              "glass-panel rounded-lg p-3 space-y-2",
              breached && "border-destructive/60 bg-destructive/5"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">{r.type}</span>
              <div className="flex items-center gap-1.5">
                {breached && (
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive animate-pulse" />
                )}
                <span className={cn("text-xs font-semibold capitalize", statusStyle[r.status])}>
                  {r.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">{r.description}</p>
            <p className="text-xs text-muted-foreground">📍 {r.location}</p>
            <p className="text-xs text-muted-foreground">By: {r.citizenName} • {r.timestamp}</p>

            {/* Department badge */}
            <div className="flex items-center gap-1.5 text-xs">
              <Building2 className="w-3 h-3 text-primary" />
              <span className="text-primary font-medium">{r.department}</span>
            </div>

            {/* Worker info */}
            {r.assignedWorker && (
              <div className={cn(
                "flex items-center gap-1.5 text-xs rounded-md px-2 py-1.5",
                breached ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
              )}>
                <UserCheck className="w-3.5 h-3.5" />
                <span className="font-medium">{r.assignedWorker}</span>
                {timeLeft && (
                  <span className="ml-auto flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="w-3 h-3" />
                    {timeLeft}
                  </span>
                )}
              </div>
            )}

            {breached && (
              <div className="text-[10px] bg-destructive/10 text-destructive rounded px-2 py-1 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                SLA BREACHED — Worker did not reach on time!
              </div>
            )}

            {/* Government actions */}
            {role === "government" && r.status !== "resolved" && (
              <div className="space-y-2 pt-1 border-t border-border">
                {/* Reassign Department */}
                <div className="space-y-1">
                  <button
                    onClick={() => setOpenDeptSelect(showDeptSelect ? null : r.id)}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
                  >
                    <Building2 className="w-3 h-3" />
                    Reassign Department
                    <ChevronDown className={cn("w-3 h-3 transition-transform", showDeptSelect && "rotate-180")} />
                  </button>
                  {showDeptSelect && (
                    <div className="flex flex-col gap-1 mt-1">
                      {allDepartments.map((dept) => (
                        <Button
                          key={dept}
                          size="sm"
                          variant={dept === r.department ? "default" : "outline"}
                          className={cn(
                            "text-[10px] h-6 px-2 justify-start",
                            dept === r.department && "opacity-50 pointer-events-none"
                          )}
                          onClick={() => {
                            reassignDepartment(r.id, dept);
                            setOpenDeptSelect(null);
                            toast.success(`Report reassigned to ${dept}`);
                          }}
                        >
                          🏢 {dept}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Assign Worker */}
                {r.status === "pending" && (
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Assign Worker</label>
                    <div className="flex flex-wrap gap-1">
                      {deptWorkers.length > 0 ? (
                        deptWorkers.map((w) => (
                          <Button
                            key={w.id}
                            size="sm"
                            variant="outline"
                            className="text-[10px] h-6 px-2"
                            onClick={() => {
                              assignWorker(r.id, w.name);
                              toast.success(`Assigned ${w.name} to ${r.type} at ${r.location}`);
                            }}
                          >
                            👷 {w.name}
                          </Button>
                        ))
                      ) : (
                        <span className="text-[10px] text-destructive">No workers available for this department</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Mark Resolved */}
                {r.status === "assigned" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[10px] h-6 px-2 text-success border-success/30 hover:bg-success/10"
                    onClick={() => {
                      resolveReport(r.id);
                      toast.success(`Report at ${r.location} marked as resolved`);
                    }}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" /> Mark Resolved
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DamagePanel;
