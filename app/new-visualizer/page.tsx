// pages/visualizer.tsx
"use client";
import { ReactFlowProvider } from "reactflow";
import MonacoVisualizer from "../../src/New Components/MonacoVisualizer"
import Link from "next/link";

export default function VisualizerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <Link href="/" className="text-blue-600 text-2xl font-semibold">
          Code Visualizer
        </Link>
      </header>
      <main className="max-w-7xl mx-auto">
      <ReactFlowProvider>
          <MonacoVisualizer />
        </ReactFlowProvider>
      </main>
    </div>
  );
}
