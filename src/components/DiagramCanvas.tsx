import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  // BEGIN: abpxx6d04wxr
    // Removed duplicate imports and changed to type-only imports
    // Connection, // Changed to type-only import
    // Edge, // Changed to type-only import
    useEdgesState,
    useNodesState,
  } from 'reactflow';
  import type { Connection } from 'reactflow'; // Added type-only import for Connection
  import type { Edge } from 'reactflow'; // Added type-only import for Edge
import type { Node } from 'reactflow'; // Added type-only import for Node

const initialNodes: Node[] = [
  {
    id: 'start',
    position: { x: 100, y: 100 },
    data: { label: 'Start' },
    type: 'default',
  },
  {
    id: 'intake',
    position: { x: 300, y: 100 },
    data: { label: 'Claim Intake' },
    type: 'default',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'start', target: 'intake', type: 'smoothstep' },
];

export const DiagramCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: 'smoothstep' }, eds));
    },
    [setEdges]
  );

  return (
    <div className="w-full h-full bg-white border border-slate-200 rounded-xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap pannable zoomable />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};
