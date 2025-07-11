"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Clock } from "lucide-react"
import MonacoEditor from "../components/monaco-editor"
import ExecutionTimeline from "../components/execution-timeline"
import DebugControls from "../components/debug-controls"
import VisualizationPanel from "../components/visualization-panel"
import SampleCodeSelector from "@/components/sample-code-selector"
import { useCodeExecution } from "../hooks/use-code-execution"
import VisualizerPanel from "../components/SimpleVisualizerPanel" // ✅ NEW
import "./App.css"

function App() {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

console.log("Fibonacci of 5:", fibonacci(5));`)

  const [language, setLanguage] = useState("javascript")
  const [breakpoints, setBreakpoints] = useState<number[]>([])
  const [simpleLine, setSimpleLine] = useState(-1) // ✅ For new visualizer

  const {
    isRunning,
    isDebugging,
    currentStep,
    executionSteps,
    output,
    error,
    currentLine,
    variables,
    callStack,
    executionSpeed,
    isAutoPlaying,
    runCode,
    startDebug,
    stepForward,
    stepBackward,
    jumpToStep,
    toggleAutoPlay,
    stopExecution,
    reset,
    setExecutionSpeed,
  } = useCodeExecution(code)

  const toggleBreakpoint = (lineNumber: number) => {
    setBreakpoints((prev) =>
      prev.includes(lineNumber) ? prev.filter((bp) => bp !== lineNumber) : [...prev, lineNumber],
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Code Visualizer</h1>
          <DebugControls
            language={language}
            onLanguageChange={setLanguage}
            isRunning={isRunning}
            isDebugging={isDebugging}
            currentStep={currentStep}
            executionSteps={executionSteps}
            isAutoPlaying={isAutoPlaying}
            onRun={runCode}
            onStartDebug={startDebug}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
            onToggleAutoPlay={toggleAutoPlay}
            onStop={stopExecution}
            onReset={reset}
          />
        </div>

        {/* Sample Code Selector */}
        <SampleCodeSelector
          onCodeSelect={setCode}
          isDebugging={isDebugging}
          executionSpeed={executionSpeed}
          onSpeedChange={setExecutionSpeed}
        />

        {/* Execution Timeline */}
        {isDebugging && executionSteps.length > 0 && (
          <Card>
            <CardContent>
              <ExecutionTimeline steps={executionSteps} currentStep={currentStep} onStepClick={jumpToStep} />
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Monaco Code Editor */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <MonacoEditor
                value={code}
                onChange={setCode}
                language={language}
                currentLine={currentLine}
                breakpoints={breakpoints}
                onBreakpointToggle={toggleBreakpoint}
                disabled={isRunning || isDebugging}
              />
            </CardContent>
          </Card>

          {/* Visualization Panel */}
          <VisualizationPanel
            variables={variables}
            callStack={callStack}
            output={output}
            error={error}
            currentStep={currentStep}
            executionSteps={executionSteps}
          />
        </div>

        {/* Debug Information */}
        {isDebugging && (
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Step:</span>
                  <span className="text-sm">
                    {currentStep + 1} / {executionSteps.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Line:</span>
                  <span className="text-sm">{currentLine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Breakpoints:</span>
                  <span className="text-sm">{breakpoints.length}</span>
                </div>
                {executionSteps[currentStep] && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Action:</span>
                    <span className="text-sm text-muted-foreground">
                      {executionSteps[currentStep].description}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ✅ Beginner-Friendly Step-by-Step Visualizer */}
        <Card>
          <CardHeader>
            <CardTitle>Beginner-Friendly Step-by-Step Visualizer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MonacoEditor
              value={code}
              onChange={setCode}
              language={language}
              currentLine={simpleLine}
              disabled={false}
            />
            <VisualizerPanel code={code} onLineChange={setSimpleLine} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
