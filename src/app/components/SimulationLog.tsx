import React from "react";

interface SimulationLog {
  time: string;
  event: string;
}

interface SimulationLogProps {
  logs: SimulationLog[];
}

export const SimulationLog = React.memo<SimulationLogProps>(
  function SimulationLog({ logs }) {
    return (
      <div className="h-32 bg-white border-t border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Simulation Log
        </h3>
        <div className="h-20 overflow-y-auto text-xs text-gray-600 space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="font-mono">{log.time}</span>
              <span>{log.event}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
