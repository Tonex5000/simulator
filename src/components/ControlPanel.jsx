import { useState } from 'react'

function ControlPanel({ onSimulate, simulationResult, isLoading, error }) {
  const [voltage, setVoltage] = useState('')
  const [panelPower, setPanelPower] = useState('')
  const [cableResistance, setCableResistance] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const params = {
      voltage: parseFloat(voltage) || 0,
      panelPower: parseFloat(panelPower) || 0,
      cableResistance: parseFloat(cableResistance) || 0,
    }
    
    onSimulate(params)
  }

  const cableStatus = simulationResult?.temperature > 70 ? 'danger' : 'safe'
  const cableStatusText = cableStatus === 'danger' ? 'Overheating!' : 'Normal'

  return (
    <div className="control-panel-container">
      <div className="panel-header">
        <h1>Solar Simulation</h1>
        <p>Configure and run your simulation</p>
      </div>
      
      <form onSubmit={handleSubmit} className="panel-content">
        <div className="input-group">
          <label htmlFor="voltage">Voltage (V)</label>
          <input
            type="number"
            id="voltage"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="Enter voltage (e.g., 400)"
            step="any"
            min="0"
          />
          <p className="input-hint">System voltage in Volts (DC)</p>
        </div>
        
        <div className="input-group">
          <label htmlFor="panelPower">Panel Power (W)</label>
          <input
            type="number"
            id="panelPower"
            value={panelPower}
            onChange={(e) => setPanelPower(e.target.value)}
            placeholder="Enter panel power (e.g., 5000)"
            step="any"
            min="0"
          />
          <p className="input-hint">Total panel power output in Watts</p>
        </div>
        
        <div className="input-group">
          <label htmlFor="cableResistance">Cable Resistance (Ω)</label>
          <input
            type="number"
            id="cableResistance"
            value={cableResistance}
            onChange={(e) => setCableResistance(e.target.value)}
            placeholder="Enter cable resistance (e.g., 0.5)"
            step="any"
            min="0"
          />
          <p className="input-hint">Total cable resistance in Ohms</p>
        </div>
        
        <button 
          type="submit" 
          className="simulate-button"
          disabled={isLoading}
        >
          {isLoading ? 'Running Simulation...' : 'Run Simulation'}
        </button>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {simulationResult && (
          <div className="results-section">
            <h2>Simulation Results</h2>
            
            <div className="result-card">
              <div className="result-label">Current</div>
              <div className="result-value">
                {simulationResult.current?.toFixed(2) || 'N/A'} A
              </div>
            </div>
            
            <div className="result-card">
              <div className="result-label">Power Loss</div>
              <div className="result-value">
                {simulationResult.power_loss?.toFixed(2) || 'N/A'} W
              </div>
            </div>
            
            <div className="result-card">
              <div className="result-label">Temperature</div>
              <div className={`result-value ${simulationResult.temperature > 70 ? 'warning' : 'normal'}`}>
                {simulationResult.temperature?.toFixed(1) || 'N/A'} °C
              </div>
              <div className="cable-status">
                <div className={`status-indicator ${cableStatus}`}></div>
                <span>Cable Status: {cableStatusText}</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default ControlPanel
