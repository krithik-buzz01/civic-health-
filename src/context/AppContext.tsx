import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserRole, MapCategory, Report, initialReports, SLA_HOURS } from "@/data/mockData";

interface AppContextType {
  role: UserRole | null;
  setRole: (r: UserRole | null) => void;
  activeCategory: MapCategory;
  setActiveCategory: (c: MapCategory) => void;
  reports: Report[];
  addReport: (r: Report) => void;
  assignWorker: (reportId: string, workerName: string) => void;
  reassignDepartment: (reportId: string, department: string) => void;
  resolveReport: (reportId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (o: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeCategory, setActiveCategory] = useState<MapCategory>("stress");
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const addReport = (r: Report) => setReports((prev) => [r, ...prev]);

  const assignWorker = (reportId: string, workerName: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const now = new Date();
        const slaHours = SLA_HOURS[r.type] || 24;
        const deadline = new Date(now.getTime() + slaHours * 60 * 60 * 1000);
        return {
          ...r,
          status: "assigned" as const,
          assignedWorker: workerName,
          assignedAt: now.toLocaleString(),
          slaDeadline: deadline.toISOString(),
          slaBreached: false,
        };
      })
    );
  };

  const reassignDepartment = (reportId: string, department: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? { ...r, department, assignedWorker: undefined, assignedAt: undefined, slaDeadline: undefined, slaBreached: undefined, status: "pending" as const }
          : r
      )
    );
  };

  const resolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "resolved" as const } : r))
    );
  };

  return (
    <AppContext.Provider value={{ role, setRole, activeCategory, setActiveCategory, reports, addReport, assignWorker, reassignDepartment, resolveReport, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};
