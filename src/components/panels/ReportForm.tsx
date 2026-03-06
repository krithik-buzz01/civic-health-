import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { damageTypes, Report } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ReportForm = () => {
  const { addReport } = useApp();
  const [type, setType] = useState(damageTypes[0].type);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const dept = damageTypes.find((d) => d.type === type)?.department || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim() || !name.trim() || !location.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    const report: Report = {
      id: `r-${Date.now()}`,
      type,
      description: desc,
      lat: 13.0827 + (Math.random() - 0.5) * 0.08,
      lng: 80.2707 + (Math.random() - 0.5) * 0.08,
      status: "pending",
      department: dept,
      timestamp: new Date().toLocaleString(),
      citizenName: name,
      location,
    };
    addReport(report);
    toast.success("Report submitted! Assigned to " + dept);
    setDesc("");
    setName("");
    setLocation("");
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">📝 Report an Incident</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Damage Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-md bg-secondary border border-border text-foreground text-sm px-3 py-2"
          >
            {damageTypes.map((d) => (
              <option key={d.type} value={d.type}>{d.icon} {d.type}</option>
            ))}
          </select>
        </div>
        <p className="text-xs text-primary">→ Auto-assigned to: {dept}</p>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Your Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="bg-secondary border-border" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Location</label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. T.Nagar, 4th Street" className="bg-secondary border-border" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Description</label>
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe the issue..." className="bg-secondary border-border" rows={3} />
        </div>
        <Button type="submit" className="w-full">Submit Report</Button>
      </form>
    </div>
  );
};

export default ReportForm;
