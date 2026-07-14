import { useState, useCallback } from 'react'
import Scene from './components/Scene'
import ControlPanel from './components/ControlPanel'

function App() {
  const [simulationResult, setSimulationResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSimulate = useCallback(async (params) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:8000/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voltage: params.voltage,
          panel_power: params.panelPower,
          cable_resistance: params.cableResistance,
        }),
      })

      if (!response.ok) {
        throw new Error(`Simulation failed: ${response.statusText}`)
      }

      const data = await response.json()
      setSimulationResult(data)
    } catch (err) {
      setError(err.message || 'Failed to run simulation. Make sure the server is running.')
      setSimulationResult(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="app-container">
      <div className="scene-container">
        <Scene simulationResult={simulationResult} isLoading={isLoading} />
        <div className="scene-label">
          <strong>Solar Plant Layout</strong>
          <br />
          3 Mounting Racks • 1 Inverter • Cable Connection
        </div>
      </div>
      <ControlPanel 
        onSimulate={handleSimulate} 
        simulationResult={simulationResult}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default App
