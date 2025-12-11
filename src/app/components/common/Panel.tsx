import React from "react";

interface PanelProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  border?: "left" | "right" | "top" | "bottom";
}

const borderStyles = {
  left: "border-l",
  right: "border-r",
  top: "border-t",
  bottom: "border-b",
};

export const Panel = React.memo<PanelProps>(function Panel({
  title,
  children,
  width = "w-80",
  border,
}) {
  const borderClass = border ? borderStyles[border] : "";

  return (
    <div className={`${width} bg-white ${borderClass} border-gray-200 p-4`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
});

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState = React.memo<EmptyStateProps>(function EmptyState({
  message,
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {icon && <div className="mb-3 text-gray-400">{icon}</div>}
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
});
