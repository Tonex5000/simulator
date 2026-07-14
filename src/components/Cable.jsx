import { useMemo } from 'react'
import * as THREE from 'three'

function Cable({ startPosition, endPosition, isOverheating }) {
  const cableColor = isOverheating ? '#ef4444' : '#1f2937'
  
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPosition)
    const end = new THREE.Vector3(...endPosition)
    
    const midPoint = new THREE.Vector3().lerpVectors(start, end, 0.5)
    midPoint.y = Math.min(start.y, end.y) + 1.5
    
    return new THREE.QuadraticBezierCurve3(start, midPoint, end)
  }, [startPosition, endPosition])

  const tubeGeometry = useMemo(() => {
    const points = curve.getPoints(30)
    return new THREE.TubeGeometry(curve, 30, 0.03, 8, false)
  }, [curve])

  const cableMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: cableColor,
      emissive: isOverheating ? '#ef4444' : '#000000',
      emissiveIntensity: isOverheating ? 0.3 : 0,
      roughness: 0.5,
      metalness: 0.3,
    })
  }, [cableColor, isOverheating])

  const connectionSpheres = useMemo(() => {
    return [
      { position: startPosition, color: cableColor },
      { position: endPosition, color: cableColor },
    ]
  }, [startPosition, endPosition, cableColor])

  return (
    <group>
      <mesh geometry={tubeGeometry} material={cableMaterial} castShadow />
      
      {connectionSpheres.map((sphere, index) => (
        <mesh key={index} position={sphere.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color={sphere.color}
            emissive={isOverheating ? '#ef4444' : '#000000'}
            emissiveIntensity={isOverheating ? 0.3 : 0}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export default Cable
