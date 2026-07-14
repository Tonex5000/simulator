function SolarRack({ position, index }) {
  const rackWidth = 4
  const rackHeight = 3
  const rackDepth = 0.15
  const legHeight = 0.5
  const tiltAngle = Math.PI / 6

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, legHeight + 1.5, 0]} rotation={[0, 0, tiltAngle]}>
        <boxGeometry args={[rackWidth, rackHeight, rackDepth]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      
      <mesh castShadow receiveShadow position={[0, legHeight + 1.5 + rackHeight * Math.cos(tiltAngle) / 2, -rackHeight * Math.sin(tiltAngle) / 2]} rotation={[0, 0, tiltAngle]}>
        <boxGeometry args={[rackWidth, rackHeight, rackDepth]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
      
      <mesh castShadow position={[-rackWidth / 2 + 0.1, legHeight / 2, 0]}>
        <boxGeometry args={[0.1, legHeight, 0.1]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[rackWidth / 2 - 0.1, legHeight / 2, 0]}>
        <boxGeometry args={[0.1, legHeight, 0.1]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      
      <mesh castShadow position={[-rackWidth / 2 + 0.1, legHeight / 2, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[rackWidth / 2 - 0.1, legHeight / 2, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[-rackWidth / 2 + 0.1, legHeight, 0]} rotation={[0, 0, -tiltAngle]}>
        <boxGeometry args={[0.08, 0.08, rackDepth + 0.2]} />
        <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[rackWidth / 2 - 0.1, legHeight, 0]} rotation={[0, 0, -tiltAngle]}>
        <boxGeometry args={[0.08, 0.08, rackDepth + 0.2]} />
        <meshStandardMaterial color="#64748b" metalness={0.5} roughness={0.5} />
      </mesh>
      
      <mesh position={[rackWidth / 2 + 0.3, 0.05, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[-rackWidth / 2 + 0.1, legHeight * 2 + 1, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[rackWidth / 2 - 0.1, legHeight * 2 + 1, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

export default SolarRack
