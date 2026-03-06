import { useApp } from "@/context/AppContext";
import RoleSelector from "@/components/RoleSelector";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const { role } = useApp();
  return role ? <Dashboard /> : <RoleSelector />;
};

export default Index;
