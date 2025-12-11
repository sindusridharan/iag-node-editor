import React from "react";

interface ElementItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  isAction?: boolean;
  onDragStart?: (event: React.DragEvent, type: string) => void;
  onClick?: () => void;
}

export const ElementItem = React.memo<ElementItemProps>(function ElementItem({
  id,
  label,
  icon,
  type,
  isAction = false,
  onDragStart,
  onClick,
}) {
  const handleDragStart = (event: React.DragEvent) => {
    if (!isAction && onDragStart) {
      onDragStart(event, type);
    }
  };

  return (
    <div
      key={id}
      className={`p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 flex items-center gap-3 text-sm ${
        isAction ? "bg-blue-50 border-blue-200" : ""
      }`}
      draggable={!isAction}
      onDragStart={handleDragStart}
      onClick={onClick}
      role={isAction ? "button" : "listitem"}
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
});
