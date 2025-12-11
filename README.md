# IAG Multiprocess Designer

An enterprise-grade visual workflow designer built for creating and managing business process diagrams. This interactive canvas application enables teams to design, document, and collaborate on complex multi-process workflows with a modern drag-and-drop interface.

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black)
![React](https://img.shields.io/badge/React-19.2.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![ReactFlow](https://img.shields.io/badge/ReactFlow-11.11.4-red)

## 📋 Project Overview

The IAG Multiprocess Designer is a web-based workflow diagramming tool that allows business analysts, process engineers, and team leads to visually design and document workflows. Built with React and TypeScript, it provides a production-ready solution for creating BPMN-style process diagrams with real-time editing capabilities.

**Key Capabilities:**

- Visual workflow design with drag-and-drop components
- Real-time node property editing
- Complete workflow history with undo/redo
- Export/import workflows as JSON
- Team-based task assignment
- Event tracking and audit logging

### Smart Keyboard Shortcuts

- `Ctrl+Z` / `Ctrl+Y` - Undo and redo changes
- `Ctrl+D` - Duplicate selected nodes
- `Delete` / `Backspace` - Remove selected items (disabled when typing in inputs)
- `Ctrl+S` - Save workflow to file
- Smart context detection prevents shortcuts from interfering with text input

### Event Logging

- Comprehensive simulation log tracks all user actions
- Timestamped entries for node creation, deletion, duplication
- Workflow save/load operations recorded
- Provides audit trail for workflow changes

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd iag-node-editor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Quick Start Guide

1. **Create a Node**: Drag any element from the left sidebar onto the canvas
2. **Edit Properties**: Click a node to select it and edit in the Inspector panel (right)
3. **Connect Nodes**: Drag from one node's handle to another to create connections
4. **Save Your Work**: Press `Ctrl+S` or click the Save button
5. **Load Workflows**: Click Load button to import saved JSON

## 🧩 Reusable Component Architecture

The project is built with a comprehensive set of reusable React components following best practices for maintainability and scalability.

### Common Components (`src/app/components/common/`)

#### **Button.tsx**

Flexible button component with multiple variants:

- `primary`, `secondary`, `ghost` variants
- Icon support with Lucide icons
- Disabled state styling
- `IconButton` variant for icon-only buttons
- Proper TypeScript typing extending native button props

#### **FormControls.tsx**

Suite of form input components for consistent styling:

- `TextInput` - Single-line text input with label
- `TextArea` - Multi-line text input
- `Select` - Dropdown with options array
- `NumberInput` - Numeric input with min/max support
- `FormField` - Reusable wrapper providing consistent label styling
- All components memoized for performance

#### **Panel.tsx**

Container component for sidebar panels:

- `Panel` - Configurable width, borders, and title
- `EmptyState` - Displays helpful messages when no data is available
- Consistent styling across the application

#### **MultiprocessDesigner.tsx**

Main canvas orchestration component handling:

- ReactFlow canvas integration
- State management (nodes, edges, history)
- Drag-and-drop event handling
- Keyboard shortcut management
- History operations (undo/redo with 50-state limit)
- File operations (save/load workflows)

#### **Inspector.tsx**

Dynamic property editor panel:

- Real-time node property updates
- Type-safe form handling
- Team selection dropdown
- Metadata key-value pairs
- Empty state when no node selected

#### **ElementsLibrary.tsx**

Draggable element palette:

- Element catalog display
- Drag start event handling
- Action items for special operations

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── common/                      # Reusable UI components
│   │   │   ├── Button.tsx              # Button with variants
│   │   │   ├── FormControls.tsx        # Form input components
│   │   │   ├── Panel.tsx               # Panel container
│   │   │   ├── ElementItem.tsx         # Draggable item
│   │   │   ├── NodeWrapper.tsx         # Node styling wrapper
│   │   │   └── index.ts                # Barrel exports
│   │   ├── nodes/
│   │   │   └── index.tsx               # Custom ReactFlow nodes
│   │   ├── ElementsLibrary.tsx         # Element palette sidebar
│   │   ├── Inspector.tsx               # Property editor panel
│   │   ├── MultiprocessDesigner.tsx    # Main canvas container
│   │   └── SimulationLog.tsx           # Event log panel
│   ├── constants/
│   │   └── index.ts                    # App constants
│   ├── types/
│   │   └── index.ts                    # TypeScript definitions
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Entry point
└── public/                             # Static assets
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.0.8](https://nextjs.org/) with App Router
- **UI Library**: [React 19.2.1](https://react.dev/)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Diagram Engine**: [ReactFlow 11.11.4](https://reactflow.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: Turbopack

## 🎯 Usage Examples

### Creating a Simple Workflow

### Build for Production

```bash
npm run build
npm start
```
