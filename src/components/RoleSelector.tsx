import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Shield, User } from "lucide-react";

const RoleSelector = () => {
  const { setRole } = useApp();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Infrastructure <span className="text-primary">Command Center</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">Chennai City — Health & Anomaly Analysis</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {[
            { role: "citizen" as const, icon: User, title: "Citizen", desc: "Report issues & view city status" },
            { role: "government" as const, icon: Shield, title: "Government", desc: "Monitor, assign & manage" },
          ].map((item, i) => (
            <motion.button
              key={item.role}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              onClick={() => setRole(item.role)}
              className="group glass-panel rounded-xl p-8 w-72 hover:border-primary/50 transition-all duration-300 hover:glow-primary cursor-pointer"
            >
              <item.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
              <p className="text-muted-foreground text-sm mt-2">{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
