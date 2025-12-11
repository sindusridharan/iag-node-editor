import React from "react";
import { Handle, Position } from "reactflow";

interface NodeWrapperProps {
  children: React.ReactNode;
  selected?: boolean;
  color: "green" | "blue" | "purple" | "yellow";
  shape?: "rounded-full" | "rounded-lg" | "diamond";
  showSourceHandle?: boolean;
  showTargetHandle?: boolean;
  className?: string;
}

const colorStyles = {
  green: "bg-green-100 border-green-400",
  blue: "bg-blue-100 border-blue-400",
  purple: "bg-purple-100 border-purple-400",
  yellow: "bg-yellow-100 border-yellow-400",
};

const handleColors = {
  green: "!bg-green-600",
  blue: "!bg-blue-600",
  purple: "!bg-purple-600",
  yellow: "!bg-yellow-600",
};

export const NodeWrapper = React.memo<NodeWrapperProps>(function NodeWrapper({
  children,
  selected = false,
  color,
  shape = "rounded-lg",
  showSourceHandle = true,
  showTargetHandle = true,
  className = "",
}) {
  return (
    <div
      className={`px-4 py-3 shadow-md border-2 ${colorStyles[color]} ${shape} ${
        selected ? "ring-2 ring-blue-400" : ""
      } ${className}`}
    >
      {showTargetHandle && (
        <Handle
          type="target"
          position={Position.Top}
          className={`w-2 h-2 ${handleColors[color]} border-2 border-white`}
        />
      )}
      {children}
      {showSourceHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          className={`w-2 h-2 ${handleColors[color]} border-2 border-white`}
        />
      )}
    </div>
  );
});

interface NodeContentProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  textColor: string;
  subtitleColor?: string;
}

export const NodeContent = React.memo<NodeContentProps>(function NodeContent({
  icon,
  label,
  subtitle,
  textColor,
  subtitleColor,
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <div className={`${textColor} font-medium text-sm`}>{label}</div>
        {subtitle && (
          <div className={`${subtitleColor} text-xs`}>{subtitle}</div>
        )}
      </div>
    </div>
  );
});
