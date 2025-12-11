import React from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { Play, CheckSquare, Layers } from "lucide-react";
import { NodeWrapper, NodeContent } from "../common";

export const StartEventNode = React.memo<NodeProps>(function StartEventNode({
  data,
  selected,
}) {
  return (
    <NodeWrapper
      selected={selected}
      color="green"
      shape="rounded-full"
      showTargetHandle={false}
      className="py-2"
    >
      <NodeContent
        icon={<Play className="w-4 h-4 text-green-700" />}
        label={data.label}
        textColor="text-green-800"
      />
    </NodeWrapper>
  );
});

export const TaskNode = React.memo<NodeProps>(function TaskNode({
  data,
  selected,
}) {
  return (
    <NodeWrapper selected={selected} color="blue" className="min-w-[120px]">
      <NodeContent
        icon={<CheckSquare className="w-4 h-4 text-blue-700" />}
        label={data.label}
        subtitle={data.assignedTeam}
        textColor="text-blue-800"
        subtitleColor="text-blue-600"
      />
    </NodeWrapper>
  );
});

export const SubprocessNode = React.memo<NodeProps>(function SubprocessNode({
  data,
  selected,
}) {
  return (
    <NodeWrapper selected={selected} color="purple" className="min-w-[140px]">
      <NodeContent
        icon={<Layers className="w-4 h-4 text-purple-700" />}
        label={data.label}
        subtitle={data.assignedTeam}
        textColor="text-purple-800"
        subtitleColor="text-purple-600"
      />
    </NodeWrapper>
  );
});

export const DecisionNode = React.memo<NodeProps>(function DecisionNode({
  data,
  selected,
}) {
  return (
    <div
      className={`relative w-20 h-20 transform rotate-45 bg-yellow-100 border-2 border-yellow-400 shadow-md ${
        selected ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-yellow-600 border-2 border-white -translate-x-1/2 -translate-y-1/2"
        style={{
          top: "10px",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-45deg)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
        <div className="text-yellow-800 text-xs font-bold">
          {data.label || "?"}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-yellow-600 border-2 border-white"
        style={{
          bottom: "10px",
          left: "50%",
          transform: "translate(-50%, 50%) rotate(-45deg)",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-yellow-600 border-2 border-white"
        style={{
          right: "10px",
          top: "50%",
          transform: "translate(50%, -50%) rotate(-45deg)",
        }}
      />
    </div>
  );
});

export const CustomNodes = {
  startEvent: StartEventNode,
  taskNode: TaskNode,
  subprocess: SubprocessNode,
  decision: DecisionNode,
};
