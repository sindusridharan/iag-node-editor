export interface SimulationLogEntry {
  time: string;
  event: string;
}

export interface NodeData {
  label: string;
  assignedTeam?: string;
  description?: string;
  sla?: string;
  metadataKey?: string;
  metadataValue?: string;
}

export interface ElementItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
}

export type NodeType = "startEvent" | "taskNode" | "subprocess" | "decision";

export const TEAMS = [
  "Contact Center",
  "Assessment Team",
  "Repair Ops",
  "Finance",
] as const;

export type Team = (typeof TEAMS)[number];
