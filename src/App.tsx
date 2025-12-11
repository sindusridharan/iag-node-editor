import React from 'react';
import { DiagramCanvas } from './components/DiagramCanvas';

const App: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-2 bg-white">
        <div className="font-semibold text-sm">IAG Multiprocess Designer</div>
        <div className="space-x-2 text-xs">
          <button className="px-3 py-1 border border-slate-300 rounded">
            Undo
          </button>
          <button className="px-3 py-1 border border-slate-300 rounded">
            Redo
          </button>
          <button className="px-3 py-1 border border-slate-300 rounded">
            Save
          </button>
          <button className="px-3 py-1 rounded bg-emerald-600 text-white">
            Simulate ▶
          </button>
        </div>
      </header>

      {/* Main three-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <aside className="w-60 border-r border-slate-200 bg-slate-50 p-3 text-xs">
          <h2 className="font-semibold mb-2">Elements Library</h2>
          <div className="flex flex-col gap-2">
            <button className="w-full text-left px-2 py-1 border border-slate-300 rounded bg-white">
              Pointer (Select)
            </button>
            <button className="w-full text-left px-2 py-1 border border-slate-300 rounded bg-white">
              Process Group
            </button>
            <button className="w-full text-left px-2 py-1 border border-slate-300 rounded bg-white">
              Task Node
            </button>
            <button className="w-full text-left px-2 py-1 border border-slate-300 rounded bg-white">
              Decision (Gateway)
            </button>
          </div>
        </aside>

        {/* Center canvas */}
        <main className="flex-1 p-3 bg-slate-100">
          <DiagramCanvas />
        </main>

        {/* Right panel */}
        <aside className="w-72 border-l border-slate-200 bg-slate-50 p-3 text-xs">
          <h2 className="font-semibold mb-2">Inspector</h2>
          <p className="text-slate-500">Select a node to see its details.</p>
        </aside>
      </div>

      {/* Bottom log */}
      <footer className="border-t border-slate-200 bg-white px-3 py-2 text-xs font-mono">
        <div className="font-semibold mb-1">Simulation Log</div>
        <div className="text-slate-500">No run yet.</div>
      </footer>
    </div>
  );
};

export default App;
