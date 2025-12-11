import React from "react";
import {
  MousePointer,
  Square,
  CheckSquare,
  Diamond,
  Layers,
  Circle,
  MessageCircle,
  Waves,
  Download,
} from "lucide-react";
import { Panel, ElementItem } from "./common";

interface ElementItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
}

const elements: ElementItem[] = [
  {
    id: "pointer",
    label: "Pointer (Select)",
    icon: <MousePointer className="w-4 h-4" />,
    type: "pointer",
  },
  {
    id: "processGroup",
    label: "Process Group",
    icon: <Square className="w-4 h-4" />,
    type: "processGroup",
  },
  {
    id: "taskNode",
    label: "Task Node",
    icon: <CheckSquare className="w-4 h-4" />,
    type: "taskNode",
  },
  {
    id: "decision",
    label: "Decision (Gateway)",
    icon: <Diamond className="w-4 h-4" />,
    type: "decision",
  },
  {
    id: "subprocess",
    label: "Subprocess",
    icon: <Layers className="w-4 h-4" />,
    type: "subprocess",
  },
  {
    id: "startEndEvent",
    label: "Start / End Event",
    icon: <Circle className="w-4 h-4" />,
    type: "startEvent",
  },
  {
    id: "messageConnector",
    label: "Message Connector",
    icon: <MessageCircle className="w-4 h-4" />,
    type: "messageConnector",
  },
  {
    id: "swimlane",
    label: "Swimlane",
    icon: <Waves className="w-4 h-4" />,
    type: "swimlane",
  },
  {
    id: "loadExample",
    label: "Load IAG Example",
    icon: <Download className="w-4 h-4" />,
    type: "action",
  },
];

export const ElementsLibrary = React.memo(function ElementsLibrary() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleElementClick = (element: ElementItem) => {
    if (element.type === "action") {
      if (element.id === "loadExample") {
        console.log("Load IAG Example");
      }
    }
  };

  return (
    <Panel title="Elements Library" width="w-60" border="right">
      <div className="space-y-2">
        {elements.map((element) => (
          <ElementItem
            key={element.id}
            id={element.id}
            label={element.label}
            icon={element.icon}
            type={element.type}
            isAction={element.type === "action"}
            onDragStart={onDragStart}
            onClick={() => handleElementClick(element)}
          />
        ))}
      </div>
    </Panel>
  );
});
