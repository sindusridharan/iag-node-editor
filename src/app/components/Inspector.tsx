import React, { useCallback, useMemo } from "react";
import { Node } from "reactflow";
import { TEAMS } from "../types";
import { Panel, EmptyState, TextInput, TextArea, Select } from "./common";

interface InspectorProps {
  selectedNode: Node | null;
  onNodeUpdate: (nodeId: string, updates: Record<string, string>) => void;
}

export function Inspector({ selectedNode, onNodeUpdate }: InspectorProps) {
  const handleInputChange = useCallback(
    (field: string, value: string) => {
      if (selectedNode) {
        const updates: Record<string, string> = {};
        if (field === "name") updates.label = value;
        else updates[field] = value;

        onNodeUpdate(selectedNode.id, updates);
      }
    },
    [selectedNode, onNodeUpdate]
  );

  const formData = {
    name: selectedNode?.data?.label || "",
    type: selectedNode?.type || "",
    description: selectedNode?.data?.description || "",
    assignedTeam: selectedNode?.data?.assignedTeam || "",
    sla: selectedNode?.data?.sla || "",
    metadataKey: selectedNode?.data?.metadataKey || "",
    metadataValue: selectedNode?.data?.metadataValue || "",
  };

  const teamOptions = useMemo(
    () => TEAMS.map((team) => ({ value: team, label: team })),
    []
  );

  if (!selectedNode) {
    return (
      <Panel title="Inspector" width="w-80" border="left">
        <EmptyState message="Select a node to view its properties" />
      </Panel>
    );
  }

  return (
    <Panel title="Inspector" width="w-80" border="left">
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Selected:</span>{" "}
          {selectedNode.type === "taskNode" ? "Task Node" : selectedNode.type}
        </div>

        <TextInput
          label="Name"
          id="node-name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter node name"
          aria-label="Node name"
        />

        <TextInput
          label="Type"
          id="node-type"
          value={formData.type}
          onChange={(e) => handleInputChange("type", e.target.value)}
          placeholder="Enter node type"
          aria-label="Node type"
          readOnly
        />

        <TextArea
          label="Description"
          id="node-description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={3}
          placeholder="Enter description"
          aria-label="Node description"
        />

        <Select
          label="Assigned Team/Lane"
          id="node-team"
          value={formData.assignedTeam}
          onChange={(e) => handleInputChange("assignedTeam", e.target.value)}
          options={teamOptions}
          placeholder="Select team..."
          aria-label="Assigned team"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Metadata (key/value):
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={formData.metadataKey}
              onChange={(e) => handleInputChange("metadataKey", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Key"
              aria-label="Metadata key"
            />
            <input
              type="text"
              value={formData.metadataValue}
              onChange={(e) =>
                handleInputChange("metadataValue", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Value"
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
