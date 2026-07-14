import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import SolarRack from './SolarRack'
import Cable from './Cable'

function Ground() {
  return (
    <mesh></mesh>
  )
}

function GridHelper() {
  return (
    <gridHelper 
      args={[50, 50, '#2d4a6f', '#1e3a5f']} 
      position={[0, 0.01, 0]} 
    />
  )
}

function InverterBox({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.8, 0.6]} />
        <meshStandardMaterial color="#374151" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.31]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0, 0, 0.32]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial color="#059669" emissive="#059669" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.4, 0.25, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Scene({ simulationResult, isLoading }) {
  const rackPositions = [
    [-6, 0, 0],
    [0, 0, 0],
    [6, 0, 0],
  ]

  const inverterPosition = [0, 0, -5]
  
  const cableOverheating = simulationResult?.temperature > 70

  return (
    <Canvas
      shadows
      camera={{ position: [15, 12, 15], fov: 50 }}
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#fbbf24" />
      
      <Ground />
      <GridHelper />
      
      {rackPositions.map((position, index) => (
        <SolarRack 
          key={`rack-${index}`} 
          position={position} 
          index={index}
        />
      ))}
      
      <InverterBox position={inverterPosition} />
      
      {rackPositions.map((position, index) => (
        <Cable 
          key={`cable-${index}`}
          startPosition={[position[0], 0.3, position[2]]}
          endPosition={[inverterPosition[0] + (index - 1) * 0.4, 0.3, inverterPosition[2] + 0.3]}
          isOverheating={cableOverheating}
        />
      ))}
      
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        scale={50}
        blur={2}
        far={20}
      />
      
      <Environment preset="sunset" />
      
      <OrbitControls
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={8}
        maxDistance={40}
        enablePan={true}
        panSpeed={0.5}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </Canvas>
  )
}

export default Scene
