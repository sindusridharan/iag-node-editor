export const NODE_COLORS = {
  startEvent: "#10b981",
  taskNode: "#3b82f6",
  subprocess: "#8b5cf6",
  default: "#6b7280",
} as const;

export const EDGE_OPTIONS = {
  type: "smoothstep",
  animated: false,
} as const;

export const CANVAS_CONFIG = {
  fitViewOptions: {
    padding: 0.2,
  },
  defaultZoom: 1,
  minZoom: 0.1,
  maxZoom: 2,
} as const;

export const SIMULATION_CONFIG = {
  defaultSpeed: 1000,
  minSpeed: 100,
  maxSpeed: 5000,
} as const;
