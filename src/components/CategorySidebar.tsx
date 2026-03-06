import { useApp } from "@/context/AppContext";
import { categoryInfo, MapCategory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ChevronLeft, LogOut } from "lucide-react";

const citizenCategories: MapCategory[] = ["stress", "health", "weather", "complaints", "aging", "hospitals", "emergency"];
const govCategories: MapCategory[] = ["stress", "health", "weather", "complaints", "aging", "damage", "departments", "hospitals", "emergency"];

const CategorySidebar = () => {
  const { role, activeCategory, setActiveCategory, sidebarOpen, setSidebarOpen, setRole } = useApp();
  const categories = role === "government" ? govCategories : citizenCategories;

  return (
    <div className={cn(
      "h-full bg-card border-r border-border flex flex-col transition-all duration-300",
      sidebarOpen ? "w-64" : "w-14"
    )}>
      <div className="flex items-center justify-between p-3 border-b border-border">
        {sidebarOpen && (
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Categories</span>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded hover:bg-secondary text-muted-foreground">
          <ChevronLeft className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5 px-1.5">
        {categories.map((cat) => {
          const info = categoryInfo[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-all text-sm",
                isActive ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
              )}
              title={info.title}
            >
              <span className="text-base flex-shrink-0">{info.icon}</span>
              {sidebarOpen && <span className="truncate">{info.title}</span>}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border p-2">
        <button onClick={() => setRole(null)} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground text-sm transition-colors" title="Switch Role">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {sidebarOpen && <span>Switch Role</span>}
        </button>
      </div>
    </div>
  );
};

export default CategorySidebar;
