import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingParticles({ count = 120 }) {
  const pointsRef = useRef()

  // Generate random particles
  const [positions, speeds, noise] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const nse = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Position particles in a large sphere/box around the center
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      
      // Vertical speed
      spd[i] = 0.1 + Math.random() * 0.2
      
      // Horizontal drift (noise)
      nse[i * 3] = Math.random() * Math.PI * 2
      nse[i * 3 + 1] = Math.random() * Math.PI * 2
      nse[i * 3 + 2] = Math.random() * Math.PI * 2
    }
    
    return [pos, spd, nse]
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current || !pointsRef.current.geometry || !pointsRef.current.geometry.attributes || !pointsRef.current.geometry.attributes.position) return
    
    const positionsAttr = pointsRef.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
      // Y-axis movement (float upwards)
      positionsAttr.array[i * 3 + 1] += speeds[i] * delta
      
      // X and Z-axis drift
      positionsAttr.array[i * 3] += Math.sin(state.clock.getElapsedTime() * 0.5 + noise[i * 3]) * 0.005
      positionsAttr.array[i * 3 + 2] += Math.cos(state.clock.getElapsedTime() * 0.5 + noise[i * 3 + 2]) * 0.005
      
      // Reset if particle goes too high
      if (positionsAttr.array[i * 3 + 1] > 6) {
        positionsAttr.array[i * 3 + 1] = -6
        positionsAttr.array[i * 3] = (Math.random() - 0.5) * 15
        positionsAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 15
      }
    }
    
    positionsAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#C599B6"
        transparent
        opacity={0.65}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
