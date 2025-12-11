"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  DragEvent,
  useEffect,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ConnectionMode,
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowInstance,
} from "reactflow";
import {
  Undo2,
  Redo2,
  Save,
  Play,
  Trash2,
  Copy,
  Upload,
  FileX,
} from "lucide-react";

import { ElementsLibrary } from "./ElementsLibrary";
import { Inspector } from "./Inspector";
import { SimulationLog } from "./SimulationLog";
import { CustomNodes } from "./nodes";
import { Button } from "./common";
import type { SimulationLogEntry, NodeData } from "../types";
import { NODE_COLORS } from "../constants";

import "reactflow/dist/style.css";

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "startEvent",
    position: { x: 350, y: 170 },
    data: { label: "Start" },
  },
  {
    id: "2",
    type: "taskNode",
    position: { x: 350, y: 240 },
    data: { label: "Claim Intake", assignedTeam: "Contact Center" },
  },
  {
    id: "3",
    type: "taskNode",
    position: { x: 350, y: 310 },
    data: { label: "Validate Details", assignedTeam: "Assessment Team" },
  },
  {
    id: "4",
    type: "taskNode",
    position: { x: 570, y: 310 },
    data: { label: "Create Claim", assignedTeam: "Assessment Team" },
  },
  {
    id: "5",
    type: "subprocess",
    position: { x: 790, y: 310 },
    data: { label: "Assessment (subprocess)", assignedTeam: "Assessment Team" },
  },
  {
    id: "6",
    type: "taskNode",
    position: { x: 1030, y: 310 },
    data: { label: "Approve Claim", assignedTeam: "Assessment Team" },
  },
  {
    id: "7",
    type: "taskNode",
    position: { x: 790, y: 390 },
    data: { label: "Fraud Check", assignedTeam: "Repair Ops" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
  { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
  { id: "e3-4", source: "3", target: "4", type: "smoothstep" },
  { id: "e4-5", source: "4", target: "5", type: "smoothstep" },
  { id: "e5-6", source: "5", target: "6", type: "smoothstep" },
];

function MultiprocessDesignerContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<SimulationLogEntry[]>([
    { time: "00:01", event: "Start → Intake" },
    { time: "00:04", event: "Intake → Validate" },
    { time: "00:08", event: "Validate → Create" },
  ]);

  const [history, setHistory] = useState<HistoryState[]>([
    { nodes: initialNodes, edges: initialEdges },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const nodeTypes = useMemo(() => CustomNodes, []);
  const nodeIdCounter = useRef(
    Math.max(...initialNodes.map((n) => parseInt(n.id)), 0) + 1
  );

  const saveToHistory = useCallback(
    (newNodes: Node[], newEdges: Edge[]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ nodes: newNodes, edges: newEdges });
      if (newHistory.length > 50) {
        newHistory.shift();
      } else {
        setHistoryIndex(historyIndex + 1);
      }
      setHistory(newHistory);
    },
    [history, historyIndex]
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
      saveToHistory(nodes, newEdges);
    },
    [edges, nodes, setEdges, saveToHistory]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onNodeUpdate = useCallback(
    (nodeId: string, updates: Record<string, string>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...updates } }
            : node
        )
      );
      setSelectedNode((prev) =>
        prev && prev.id === nodeId
          ? { ...prev, data: { ...prev.data, ...updates } }
          : prev
      );
    },
    [setNodes]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToHistory(nodes, edges);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, saveToHistory]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsDraggingOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      setIsDraggingOver(false);

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeId = String(nodeIdCounter.current++);
      const newNode: Node<NodeData> = {
        id: newNodeId,
        type,
        position,
        data: {
          label: `New ${type}`,
          assignedTeam: "Contact Center",
        },
      };

      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
      saveToHistory(newNodes, edges);

      setSimulationLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          event: `Added new ${type} node`,
        },
      ]);
    },
    [reactFlowInstance, nodes, edges, setNodes, saveToHistory]
  );

  const onDeleteSelected = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const selectedEdges = edges.filter((edge) => edge.selected);

    if (selectedNodes.length === 0 && selectedEdges.length === 0) return;

    const newNodes = nodes.filter((node) => !node.selected);
    const newEdges = edges.filter((edge) => !edge.selected);

    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNode(null);
    saveToHistory(newNodes, newEdges);

    setSimulationLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        event: `Deleted ${selectedNodes.length} node(s) and ${selectedEdges.length} edge(s)`,
      },
    ]);
  }, [nodes, edges, setNodes, setEdges, saveToHistory]);

  const onDuplicateNode = useCallback(() => {
    if (!selectedNode) return;

    const newNodeId = String(nodeIdCounter.current++);
    const newNode: Node = {
      ...selectedNode,
      id: newNodeId,
      position: {
        x: selectedNode.position.x + 50,
        y: selectedNode.position.y + 50,
      },
      data: {
        ...selectedNode.data,
        label: `${selectedNode.data.label} (Copy)`,
      },
      selected: false,
    };

    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    saveToHistory(newNodes, edges);

    setSimulationLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        event: `Duplicated node: ${selectedNode.data.label}`,
      },
    ]);
  }, [selectedNode, nodes, edges, setNodes, saveToHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setNodes(history[newIndex].nodes);
      setEdges(history[newIndex].edges);
      setSelectedNode(null);
    }
  }, [historyIndex, history, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setNodes(history[newIndex].nodes);
      setEdges(history[newIndex].edges);
      setSelectedNode(null);
    }
  }, [historyIndex, history, setNodes, setEdges]);

  const handleSave = useCallback(() => {
    const workflow = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `workflow-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setSimulationLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        event: "Workflow saved successfully",
      },
    ]);
  }, [nodes, edges]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) {
        if (event.ctrlKey && event.key === "s") {
          event.preventDefault();
          handleSave();
        }
        return;
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        onDeleteSelected();
      }
      if (event.ctrlKey && event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      }
      if (
        (event.ctrlKey && event.shiftKey && event.key === "z") ||
        (event.ctrlKey && event.key === "y")
      ) {
        event.preventDefault();
        handleRedo();
      }
      if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        onDuplicateNode();
      }
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    },
    [onDeleteSelected, onDuplicateNode, handleUndo, handleRedo, handleSave]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const handleSimulate = useCallback(() => {
    setSimulationLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        event: `Simulation started with ${nodes.length} nodes`,
      },
    ]);
  }, [nodes.length]);

  const handleLoad = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const workflow = JSON.parse(event.target?.result as string);
          if (workflow.nodes && workflow.edges) {
            setNodes(workflow.nodes);
            setEdges(workflow.edges);
            saveToHistory(workflow.nodes, workflow.edges);
            setSimulationLogs((prev) => [
              ...prev,
              {
                time: new Date().toLocaleTimeString(),
                event: `Workflow loaded: ${workflow.nodes.length} nodes, ${workflow.edges.length} edges`,
              },
            ]);
          }
        } catch (error) {
          console.error("Error loading workflow:", error);
          setSimulationLogs((prev) => [
            ...prev,
            {
              time: new Date().toLocaleTimeString(),
              event: "Error loading workflow file",
            },
          ]);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [setNodes, setEdges, saveToHistory]);

  const handleClearCanvas = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to clear the canvas? This cannot be undone."
      )
    ) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      saveToHistory([], []);
      setSimulationLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          event: "Canvas cleared",
        },
      ]);
    }
  }, [setNodes, setEdges, saveToHistory]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            IAG Multiprocess Designer
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {nodes.length} nodes, {edges.length} edges
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleUndo}
            variant="secondary"
            icon={Undo2}
            aria-label="Undo last action"
            title="Undo (Ctrl+Z)"
            disabled={historyIndex === 0}
          >
            Undo
          </Button>
          <Button
            onClick={handleRedo}
            variant="secondary"
            icon={Redo2}
            aria-label="Redo last action"
            title="Redo (Ctrl+Y)"
            disabled={historyIndex === history.length - 1}
          >
            Redo
          </Button>
          <div className="w-px h-8 bg-gray-300" />
          <Button
            onClick={onDuplicateNode}
            variant="secondary"
            icon={Copy}
            aria-label="Duplicate selected node"
            title="Duplicate (Ctrl+D)"
            disabled={!selectedNode}
          >
            Duplicate
          </Button>
          <Button
            onClick={onDeleteSelected}
            variant="secondary"
            icon={Trash2}
            aria-label="Delete selected items"
            title="Delete (Del)"
          >
            Delete
          </Button>
          <Button
            onClick={handleClearCanvas}
            variant="secondary"
            icon={FileX}
            aria-label="Clear canvas"
            title="Clear Canvas"
          >
            Clear
          </Button>
          <div className="w-px h-8 bg-gray-300" />
          <Button
            onClick={handleLoad}
            variant="secondary"
            icon={Upload}
            aria-label="Load workflow from file"
            title="Load Workflow"
          >
            Load
          </Button>
          <Button
            onClick={handleSave}
            variant="secondary"
            icon={Save}
            aria-label="Save current workflow"
            title="Save (Ctrl+S)"
          >
            Save
          </Button>
          <div className="w-px h-8 bg-gray-300" />
          <Button
            onClick={handleSimulate}
            variant="primary"
            icon={Play}
            aria-label="Run workflow simulation"
            title="Simulate"
          >
            Simulate
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Elements Library */}
        <ElementsLibrary />

        {/* Canvas */}
        <div
          className={`flex-1 relative transition-colors ${
            isDraggingOver ? "bg-blue-50" : ""
          }`}
          ref={reactFlowWrapper}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            deleteKeyCode={null}
          >
            <Background />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                const nodeType = node.type as keyof typeof NODE_COLORS;
                return NODE_COLORS[nodeType] || NODE_COLORS.default;
              }}
              position="top-right"
              style={{
                width: 120,
                height: 80,
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
            />

            {/* Swimlanes */}
            <Panel
              position="top-left"
              className="bg-white/80 p-2 rounded text-sm font-medium"
            >
              Canvas (zoom & pan)
            </Panel>

            {/* Swimlane Labels */}
            <div className="absolute left-4 top-20 space-y-16 text-sm font-medium text-gray-600">
              <div>Contact Center</div>
              <div>Assessment Team</div>
              <div>Repair Ops</div>
              <div>Finance</div>
            </div>

            {/* Instructions */}
            <Panel
              position="bottom-center"
              className="bg-white/90 p-2 rounded text-xs text-gray-600"
            >
              <strong>Shortcuts:</strong> Drag elements to canvas | Click to
              select | Delete (Del/Backspace) | Duplicate (Ctrl+D) | Undo
              (Ctrl+Z) | Redo (Ctrl+Y) | Save (Ctrl+S)
            </Panel>
          </ReactFlow>
        </div>

        {/* Inspector */}
        <Inspector selectedNode={selectedNode} onNodeUpdate={onNodeUpdate} />
      </div>

      {/* Simulation Log */}
      <SimulationLog logs={simulationLogs} />
    </div>
  );
}

export function MultiprocessDesigner() {
  return (
    <ReactFlowProvider>
      <MultiprocessDesignerContent />
    </ReactFlowProvider>
  );
}
