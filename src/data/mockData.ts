export type UserRole = "citizen" | "government";

export type MapCategory =
  | "stress"
  | "health"
  | "weather"
  | "complaints"
  | "aging"
  | "damage"
  | "departments"
  | "emergency"
  | "hospitals";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  status: "good" | "warning" | "critical";
  category: MapCategory;
  details: Record<string, string | number>;
}

export interface Worker {
  id: string;
  name: string;
  phone: string;
  department: string;
  available: boolean;
}

export interface Report {
  id: string;
  type: string;
  description: string;
  lat: number;
  lng: number;
  status: "pending" | "assigned" | "resolved";
  department: string;
  timestamp: string;
  citizenName: string;
  location: string;
  assignedWorker?: string;
  assignedAt?: string;
  slaDeadline?: string;
  slaBreached?: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "good" | "warning" | "critical";
  beds: number;
  occupied: number;
  ambulances: number;
}

export interface DepartmentStats {
  name: string;
  resolved: number;
  pending: number;
  avgTime: string;
  rating: number;
}

// Chennai land coordinates — avoiding rivers, sea, and water bodies
// Bay of Bengal is to the east (lng > 80.29), Adyar river around lat 13.006, Cooum river around lat 13.07

export const stressMarkers: MapMarker[] = [
  { id: "s1", lat: 13.0827, lng: 80.2350, label: "T. Nagar Junction", status: "critical", category: "stress", details: { traffic: "92%", crowd: "High", electricity: "Peak", water: "85%" } },
  { id: "s2", lat: 13.0604, lng: 80.2196, label: "Adyar Signal", status: "warning", category: "stress", details: { traffic: "68%", crowd: "Medium", electricity: "Normal", water: "60%" } },
  { id: "s3", lat: 13.1067, lng: 80.2342, label: "Anna Nagar East", status: "good", category: "stress", details: { traffic: "30%", crowd: "Low", electricity: "Normal", water: "40%" } },
  { id: "s4", lat: 13.0478, lng: 80.2090, label: "Guindy Industrial", status: "critical", category: "stress", details: { traffic: "88%", crowd: "High", electricity: "Overload", water: "90%" } },
  { id: "s5", lat: 13.1143, lng: 80.2136, label: "Koyambedu Market", status: "critical", category: "stress", details: { traffic: "95%", crowd: "Very High", electricity: "Peak", water: "78%" } },
  { id: "s6", lat: 13.0674, lng: 80.2176, label: "Saidapet", status: "warning", category: "stress", details: { traffic: "55%", crowd: "Medium", electricity: "Normal", water: "52%" } },
  { id: "s7", lat: 13.0960, lng: 80.2150, label: "Vadapalani", status: "critical", category: "stress", details: { traffic: "85%", crowd: "High", electricity: "Peak", water: "80%" } },
  { id: "s8", lat: 13.0350, lng: 80.2120, label: "Chromepet", status: "warning", category: "stress", details: { traffic: "60%", crowd: "Medium", electricity: "Normal", water: "55%" } },
  { id: "s9", lat: 13.1250, lng: 80.2250, label: "Ambattur", status: "good", category: "stress", details: { traffic: "35%", crowd: "Low", electricity: "Normal", water: "38%" } },
  { id: "s10", lat: 13.0780, lng: 80.2550, label: "Nungambakkam", status: "warning", category: "stress", details: { traffic: "62%", crowd: "Medium", electricity: "Normal", water: "58%" } },
  { id: "s11", lat: 13.0530, lng: 80.2550, label: "Mylapore", status: "critical", category: "stress", details: { traffic: "78%", crowd: "High", electricity: "Peak", water: "72%" } },
  { id: "s12", lat: 13.0900, lng: 80.2600, label: "Egmore", status: "warning", category: "stress", details: { traffic: "65%", crowd: "Medium", electricity: "Normal", water: "60%" } },
  { id: "s13", lat: 13.1180, lng: 80.2550, label: "Perambur", status: "good", category: "stress", details: { traffic: "40%", crowd: "Low", electricity: "Normal", water: "42%" } },
  { id: "s14", lat: 13.0400, lng: 80.2350, label: "Velachery", status: "critical", category: "stress", details: { traffic: "90%", crowd: "Very High", electricity: "Overload", water: "88%" } },
  { id: "s15", lat: 13.1050, lng: 80.2450, label: "Kilpauk", status: "good", category: "stress", details: { traffic: "28%", crowd: "Low", electricity: "Normal", water: "35%" } },
  { id: "s16", lat: 13.0650, lng: 80.2650, label: "Teynampet", status: "warning", category: "stress", details: { traffic: "58%", crowd: "Medium", electricity: "Normal", water: "50%" } },
  { id: "s17", lat: 13.1320, lng: 80.2350, label: "Villivakkam", status: "good", category: "stress", details: { traffic: "32%", crowd: "Low", electricity: "Normal", water: "30%" } },
  { id: "s18", lat: 13.0270, lng: 80.2250, label: "Pallavaram", status: "warning", category: "stress", details: { traffic: "50%", crowd: "Medium", electricity: "Normal", water: "48%" } },
];

export const healthMarkers: MapMarker[] = [
  { id: "h1", lat: 13.0900, lng: 80.2300, label: "Napier Bridge", status: "good", category: "health", details: { type: "Bridge", score: 82, built: 2005 } },
  { id: "h2", lat: 13.0700, lng: 80.2200, label: "GST Road Stretch", status: "warning", category: "health", details: { type: "Road", score: 45, built: 2012 } },
  { id: "h3", lat: 13.0500, lng: 80.2200, label: "Velachery Streetlight", status: "critical", category: "health", details: { type: "Street Light", score: 20, built: 2008 } },
  { id: "h4", lat: 13.1000, lng: 80.2350, label: "Poonamallee Flyover", status: "good", category: "health", details: { type: "Flyover", score: 91, built: 2018 } },
  { id: "h5", lat: 13.0550, lng: 80.2550, label: "Mylapore Water Pipe", status: "warning", category: "health", details: { type: "Water Pipe", score: 38, built: 2001 } },
  { id: "h6", lat: 13.0350, lng: 80.2150, label: "Tambaram Signal", status: "critical", category: "health", details: { type: "Traffic Signal", score: 15, built: 2006 } },
  { id: "h7", lat: 13.1150, lng: 80.2200, label: "Anna Nagar Overpass", status: "good", category: "health", details: { type: "Flyover", score: 88, built: 2016 } },
  { id: "h8", lat: 13.0820, lng: 80.2150, label: "Ashok Nagar Drain", status: "critical", category: "health", details: { type: "Drainage", score: 18, built: 1998 } },
  { id: "h9", lat: 13.0450, lng: 80.2400, label: "Adambakkam Road", status: "warning", category: "health", details: { type: "Road", score: 42, built: 2010 } },
  { id: "h10", lat: 13.1280, lng: 80.2450, label: "Kolathur Bridge", status: "good", category: "health", details: { type: "Bridge", score: 78, built: 2014 } },
  { id: "h11", lat: 13.0960, lng: 80.2550, label: "Chetpet Signal", status: "warning", category: "health", details: { type: "Traffic Signal", score: 52, built: 2009 } },
  { id: "h12", lat: 13.0680, lng: 80.2450, label: "Saidapet Pipe", status: "critical", category: "health", details: { type: "Water Pipe", score: 12, built: 1995 } },
  { id: "h13", lat: 13.0300, lng: 80.2300, label: "Pallavaram Light", status: "warning", category: "health", details: { type: "Street Light", score: 35, built: 2007 } },
  { id: "h14", lat: 13.1100, lng: 80.2650, label: "Perambur Road", status: "good", category: "health", details: { type: "Road", score: 85, built: 2020 } },
  { id: "h15", lat: 13.0750, lng: 80.2250, label: "Kodambakkam Flyover", status: "warning", category: "health", details: { type: "Flyover", score: 48, built: 2003 } },
];

export const weatherMarkers: MapMarker[] = [
  { id: "w1", lat: 13.0600, lng: 80.2650, label: "Marina Zone", status: "critical", category: "weather", details: { risk: "Flood", rainfall: "120mm", impact: "Road submerge" } },
  { id: "w2", lat: 13.0900, lng: 80.2200, label: "West Zone", status: "warning", category: "weather", details: { risk: "Heat Stress", temp: "42°C", impact: "Grid overload" } },
  { id: "w3", lat: 13.1200, lng: 80.2450, label: "North Chennai", status: "warning", category: "weather", details: { risk: "Storm", wind: "65 km/h", impact: "Light pole risk" } },
  { id: "w4", lat: 13.0400, lng: 80.2100, label: "Chromepet Low Area", status: "critical", category: "weather", details: { risk: "Flood", rainfall: "150mm", impact: "Waterlogging" } },
  { id: "w5", lat: 13.0500, lng: 80.2400, label: "Velachery Basin", status: "critical", category: "weather", details: { risk: "Flood", rainfall: "140mm", impact: "Residential flooding" } },
  { id: "w6", lat: 13.0750, lng: 80.2150, label: "Vadapalani Heat Zone", status: "warning", category: "weather", details: { risk: "Heat Stress", temp: "44°C", impact: "Power cuts" } },
  { id: "w7", lat: 13.1050, lng: 80.2600, label: "Kilpauk Storm Risk", status: "warning", category: "weather", details: { risk: "Storm", wind: "70 km/h", impact: "Tree fall risk" } },
  { id: "w8", lat: 13.0350, lng: 80.2350, label: "Medavakkam Flood", status: "critical", category: "weather", details: { risk: "Flood", rainfall: "160mm", impact: "Water stagnation" } },
  { id: "w9", lat: 13.0830, lng: 80.2550, label: "Nungambakkam Heat", status: "warning", category: "weather", details: { risk: "Heat Stress", temp: "41°C", impact: "Dehydration risk" } },
  { id: "w10", lat: 13.1300, lng: 80.2200, label: "Ambattur Storm", status: "good", category: "weather", details: { risk: "Storm", wind: "40 km/h", impact: "Minor risk" } },
];

export const agingMarkers: MapMarker[] = [
  { id: "a1", lat: 13.0827, lng: 80.2350, label: "Central Road", status: "good", category: "aging", details: { type: "Road", built: 2019, age: "7 years" } },
  { id: "a2", lat: 13.0650, lng: 80.2200, label: "Old Mahabalipuram Bridge", status: "critical", category: "aging", details: { type: "Bridge", built: 1985, age: "41 years" } },
  { id: "a3", lat: 13.1050, lng: 80.2300, label: "Anna Flyover", status: "warning", category: "aging", details: { type: "Flyover", built: 2004, age: "22 years" } },
  { id: "a4", lat: 13.0480, lng: 80.2350, label: "Velachery Drainage", status: "critical", category: "aging", details: { type: "Drainage", built: 1992, age: "34 years" } },
  { id: "a5", lat: 13.0950, lng: 80.2550, label: "Kilpauk Water Main", status: "warning", category: "aging", details: { type: "Water Main", built: 2008, age: "18 years" } },
  { id: "a6", lat: 13.0300, lng: 80.2200, label: "Pallavaram Sewer", status: "critical", category: "aging", details: { type: "Sewer", built: 1980, age: "46 years" } },
  { id: "a7", lat: 13.1200, lng: 80.2250, label: "Ambattur Road", status: "good", category: "aging", details: { type: "Road", built: 2021, age: "5 years" } },
  { id: "a8", lat: 13.0750, lng: 80.2450, label: "Kodambakkam Bridge", status: "warning", category: "aging", details: { type: "Bridge", built: 2000, age: "26 years" } },
  { id: "a9", lat: 13.0550, lng: 80.2550, label: "Mylapore Pipeline", status: "critical", category: "aging", details: { type: "Water Pipe", built: 1988, age: "38 years" } },
  { id: "a10", lat: 13.1100, lng: 80.2550, label: "Perambur Signal Box", status: "warning", category: "aging", details: { type: "Signal Box", built: 2006, age: "20 years" } },
  { id: "a11", lat: 13.0400, lng: 80.2150, label: "Guindy Transformer", status: "critical", category: "aging", details: { type: "Transformer", built: 1990, age: "36 years" } },
  { id: "a12", lat: 13.0900, lng: 80.2200, label: "Ashok Nagar Cable", status: "good", category: "aging", details: { type: "Power Cable", built: 2018, age: "8 years" } },
];

export const complaintMarkers: MapMarker[] = [
  { id: "c1", lat: 13.0750, lng: 80.2350, label: "Pothole Cluster", status: "critical", category: "complaints", details: { count: 24, topIssue: "Road damage", avgResponse: "5 days" } },
  { id: "c2", lat: 13.0550, lng: 80.2250, label: "Water Leak Reports", status: "warning", category: "complaints", details: { count: 12, topIssue: "Water leakage", avgResponse: "3 days" } },
  { id: "c3", lat: 13.1000, lng: 80.2450, label: "Light Outage Zone", status: "warning", category: "complaints", details: { count: 8, topIssue: "Street light", avgResponse: "2 days" } },
  { id: "c4", lat: 13.0400, lng: 80.2300, label: "Garbage Hotspot", status: "critical", category: "complaints", details: { count: 31, topIssue: "Garbage pile-up", avgResponse: "6 days" } },
  { id: "c5", lat: 13.0900, lng: 80.2550, label: "Noise Complaints", status: "good", category: "complaints", details: { count: 5, topIssue: "Construction noise", avgResponse: "1 day" } },
  { id: "c6", lat: 13.1150, lng: 80.2300, label: "Drainage Overflow", status: "critical", category: "complaints", details: { count: 18, topIssue: "Drainage block", avgResponse: "4 days" } },
  { id: "c7", lat: 13.0650, lng: 80.2500, label: "Signal Malfunction", status: "warning", category: "complaints", details: { count: 9, topIssue: "Traffic signal", avgResponse: "2 days" } },
  { id: "c8", lat: 13.0300, lng: 80.2150, label: "Road Cracks", status: "warning", category: "complaints", details: { count: 14, topIssue: "Road cracks", avgResponse: "3 days" } },
  { id: "c9", lat: 13.1280, lng: 80.2400, label: "Water Supply Issue", status: "critical", category: "complaints", details: { count: 20, topIssue: "No water", avgResponse: "5 days" } },
  { id: "c10", lat: 13.0820, lng: 80.2200, label: "Stray Animal Reports", status: "good", category: "complaints", details: { count: 6, topIssue: "Stray dogs", avgResponse: "2 days" } },
];

export const hospitals: Hospital[] = [
  { id: "hp1", name: "City Hospital", lat: 13.0800, lng: 80.2400, status: "critical", beds: 200, occupied: 198, ambulances: 2 },
  { id: "hp2", name: "Metro Medical", lat: 13.0650, lng: 80.2200, status: "warning", beds: 150, occupied: 110, ambulances: 5 },
  { id: "hp3", name: "Green Care Hospital", lat: 13.1000, lng: 80.2350, status: "good", beds: 300, occupied: 120, ambulances: 8 },
  { id: "hp4", name: "Apollo Chennai", lat: 13.0500, lng: 80.2300, status: "good", beds: 500, occupied: 280, ambulances: 12 },
  { id: "hp5", name: "Rajiv Gandhi GH", lat: 13.0870, lng: 80.2550, status: "critical", beds: 400, occupied: 395, ambulances: 3 },
  { id: "hp6", name: "Stanley Medical", lat: 13.1150, lng: 80.2600, status: "warning", beds: 350, occupied: 250, ambulances: 6 },
  { id: "hp7", name: "Kilpauk Medical", lat: 13.0950, lng: 80.2450, status: "good", beds: 280, occupied: 150, ambulances: 7 },
  { id: "hp8", name: "Tambaram GH", lat: 13.0350, lng: 80.2150, status: "warning", beds: 180, occupied: 130, ambulances: 4 },
];

export const departmentStats: DepartmentStats[] = [
  { name: "Road & Transport", resolved: 145, pending: 32, avgTime: "4.2 days", rating: 3.8 },
  { name: "Water Supply", resolved: 98, pending: 18, avgTime: "2.1 days", rating: 4.2 },
  { name: "Electricity", resolved: 210, pending: 12, avgTime: "1.5 days", rating: 4.5 },
  { name: "Traffic Police", resolved: 67, pending: 25, avgTime: "3.8 days", rating: 3.5 },
  { name: "Sanitation", resolved: 180, pending: 45, avgTime: "2.8 days", rating: 3.9 },
];

export const workers: Worker[] = [
  { id: "w1", name: "Murugan S", phone: "9876543210", department: "Road & Transport Department", available: true },
  { id: "w2", name: "Karthik R", phone: "9876543211", department: "Road & Transport Department", available: true },
  { id: "w3", name: "Suresh P", phone: "9876543212", department: "Water Supply Department", available: true },
  { id: "w4", name: "Rajesh K", phone: "9876543213", department: "Water Supply Department", available: false },
  { id: "w5", name: "Venkat M", phone: "9876543214", department: "Electricity Department", available: true },
  { id: "w6", name: "Arun D", phone: "9876543215", department: "Electricity Department", available: true },
  { id: "w7", name: "Senthil V", phone: "9876543216", department: "Traffic Police Department", available: true },
  { id: "w8", name: "Bala N", phone: "9876543217", department: "Sanitation Department", available: true },
  { id: "w9", name: "Gopal T", phone: "9876543218", department: "Sanitation Department", available: true },
];

export const SLA_HOURS: Record<string, number> = {
  "Road Damage": 24,
  "Water Leakage": 6,
  "Street Light Failure": 12,
  "Traffic Signal Failure": 4,
  "Garbage Issue": 8,
  "Drainage Block": 6,
};

export const damageTypes = [
  { type: "Road Damage", department: "Road & Transport Department", icon: "🛣️" },
  { type: "Water Leakage", department: "Water Supply Department", icon: "💧" },
  { type: "Street Light Failure", department: "Electricity Department", icon: "💡" },
  { type: "Traffic Signal Failure", department: "Traffic Police Department", icon: "🚦" },
  { type: "Garbage Issue", department: "Sanitation Department", icon: "🗑️" },
  { type: "Drainage Block", department: "Water Supply Department", icon: "🚿" },
];

export const initialReports: Report[] = [
  { id: "r1", type: "Road Damage", description: "Large pothole near bus stop", lat: 13.0780, lng: 80.2650, status: "assigned", department: "Road & Transport Department", timestamp: "2026-03-05 14:30", citizenName: "Ravi Kumar", location: "T. Nagar, 4th Street", assignedWorker: "Murugan S", assignedAt: "2026-03-05 15:00", slaDeadline: "2026-03-06 15:00", slaBreached: true },
  { id: "r2", type: "Water Leakage", description: "Pipe burst flooding road", lat: 13.0600, lng: 80.2400, status: "pending", department: "Water Supply Department", timestamp: "2026-03-06 09:15", citizenName: "Priya S", location: "Adyar, 2nd Main Road" },
  { id: "r3", type: "Street Light Failure", description: "Entire stretch dark at night", lat: 13.0500, lng: 80.2200, status: "resolved", department: "Electricity Department", timestamp: "2026-03-04 20:00", citizenName: "Mohammed Ali", location: "Velachery, 100ft Road", assignedWorker: "Venkat M", assignedAt: "2026-03-04 20:30" },
  { id: "r4", type: "Garbage Issue", description: "Garbage piling up for 3 days", lat: 13.1050, lng: 80.2450, status: "pending", department: "Sanitation Department", timestamp: "2026-03-06 07:45", citizenName: "Lakshmi V", location: "Anna Nagar, 3rd Avenue" },
];

export const categoryInfo: Record<MapCategory, { title: string; description: string; icon: string }> = {
  stress: { title: "Infrastructure Stress Heatmap", description: "Traffic, crowd density, electricity & water demand stress levels", icon: "🔥" },
  health: { title: "Infrastructure Health Score", description: "Health scores (0-100) for bridges, roads, lights & more", icon: "🏗️" },
  weather: { title: "Weather Impact Map", description: "How weather affects infrastructure — floods, heat, storms", icon: "🌦️" },
  complaints: { title: "Citizen Complaint Map", description: "Complaint clusters and response metrics", icon: "📢" },
  aging: { title: "Infrastructure Aging Map", description: "Age and lifecycle status of city assets", icon: "⏳" },
  damage: { title: "Smart Damage Detection", description: "Auto-assign damage reports to departments", icon: "🔧" },
  departments: { title: "Department Performance", description: "Resolution rates, response times & ratings", icon: "📊" },
  emergency: { title: "Emergency Response", description: "Nearest ambulance, fastest route, best hospital", icon: "🚑" },
  hospitals: { title: "Hospital Availability", description: "Real-time bed & capacity monitoring", icon: "🏥" },
};
