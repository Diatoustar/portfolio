import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function OfficeRoom({ activeSection, setActiveSection }) {
  const laptopRef = useRef()
  const phoneRef = useRef()

  const [hovered, setHovered] = useState(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (laptopRef.current) {
      laptopRef.current.position.y = 0.05 * Math.sin(time * 1.5)
    }
    if (phoneRef.current) {
      phoneRef.current.position.y = -0.3 + 0.04 * Math.cos(time * 2)
      phoneRef.current.rotation.y = time * 0.4
    }
  })

  const accentColor = '#C599B6'

  const handleItemClick = (section, e) => {
    e.stopPropagation()
    setActiveSection(section)
  }

  const isActive = (section) => hovered === section || activeSection === section

  return (
    <group position={[0, -1, 0]}>

      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5.2, 0.4, 48]} />
        <meshStandardMaterial color="#100e1f" roughness={0.9} />
      </mesh>
      {/* Glowing floor ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.79, 0]}>
        <ringGeometry args={[4.85, 5.05, 48]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* DESK */}
      <group>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.1, 1.8]} />
          <meshPhysicalMaterial
            color="#1e1832"
            transparent opacity={0.7}
            roughness={0.15}
            metalness={0.8}
            transmission={0.4}
          />
        </mesh>
        {[[-1.4, 0.7], [1.4, 0.7], [-1.4, -0.7], [1.4, -0.7]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.35, z]} castShadow>
            <cylinderGeometry args={[0.055, 0.055, 0.7, 12]} />
            <meshStandardMaterial color="#2d2747" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* DESK LAMP */}
      <group position={[-1.2, 0.05, -0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
          <meshStandardMaterial color="#2d2747" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, 0.1]} rotation={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
          <meshStandardMaterial color="#2d2747" metalness={0.8} />
        </mesh>
        <group position={[0, 0.65, 0.22]} rotation={[-0.5, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.11, 0.15, 0.18, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#fff8f0" />
          </mesh>
          <pointLight color="#ffe6f3" intensity={2} distance={5} castShadow />
        </group>
      </group>

      {/* ─── LAPTOP (Projects) ─── */}
      <group
        ref={laptopRef}
        position={[0, 0.05, 0.1]}
        onClick={(e) => handleItemClick('projets', e)}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('projets') }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.95, 0.03, 0.65]} />
          <meshStandardMaterial color={isActive('projets') ? accentColor : '#3a3260'} metalness={0.85} roughness={0.15} />
        </mesh>
        <group position={[0, 0.015, -0.3]} rotation={[-0.42, 0, 0]}>
          <mesh position={[0, 0.27, 0]} castShadow>
            <boxGeometry args={[0.95, 0.55, 0.02]} />
            <meshStandardMaterial color={isActive('projets') ? accentColor : '#3a3260'} metalness={0.85} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.27, 0.012]}>
            <planeGeometry args={[0.88, 0.48]} />
            <meshBasicMaterial color="#0d0b1a" />
          </mesh>
          {/* Screen glow */}
          <mesh position={[0, 0.27, 0.013]}>
            <planeGeometry args={[0.86, 0.46]} />
            <meshBasicMaterial
              color={isActive('projets') ? accentColor : '#2a1f4a'}
              transparent opacity={isActive('projets') ? 0.3 : 0.15}
            />
          </mesh>
        </group>
        {/* Indicator ring */}
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.58, 32]} />
          <meshBasicMaterial color={isActive('projets') ? accentColor : '#3a3260'} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ─── COMPETENCES PLANETARIUM ─── */}
      <group
        position={[0, 1.8, -1.5]}
        onClick={(e) => handleItemClick('competences', e)}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('competences') }}
        onPointerOut={() => setHovered(null)}
      >
        {/* Central crystal */}
        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={0.8}>
          <mesh castShadow>
            <octahedronGeometry args={[0.38]} />
            <meshStandardMaterial
              color={isActive('competences') ? accentColor : '#5c3d7a'}
              emissive={accentColor}
              emissiveIntensity={isActive('competences') ? 0.9 : 0.3}
              roughness={0.05}
              metalness={0.95}
            />
          </mesh>
        </Float>
        {/* Orbit rings */}
        <mesh rotation={[0.3, 0, 0]}>
          <torusGeometry args={[1.2, 0.012, 8, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[0.8, 0.5, 0]}>
          <torusGeometry args={[1.4, 0.01, 8, 64]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
        </mesh>
        {/* Orbiting skill spheres */}
        <OrbitingSkill radius={1.2} speed={0.8} color="#E34F26" phase={0} isHighlighted={isActive('competences')} />
        <OrbitingSkill radius={1.4} speed={0.6} color="#00599C" phase={1.2} isHighlighted={isActive('competences')} />
        <OrbitingSkill radius={1.1} speed={0.9} color="#4CAF50" phase={2.4} isHighlighted={isActive('competences')} />
        <OrbitingSkill radius={1.3} speed={0.5} color="#f89820" phase={3.6} isHighlighted={isActive('competences')} />
        <OrbitingSkill radius={1.5} speed={0.7} color="#777BB4" phase={4.8} isHighlighted={isActive('competences')} />
      </group>

      {/* ─── DIPLOMA FRAME (Parcours) ─── */}
      <group
        position={[-1.8, 1.4, -1.2]}
        rotation={[0, 0.6, 0]}
        onClick={(e) => handleItemClick('parcours', e)}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('parcours') }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.85, 1.15, 0.06]} />
          <meshStandardMaterial color={isActive('parcours') ? accentColor : '#2b1f50'} roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.034]}>
          <planeGeometry args={[0.75, 1.05]} />
          <meshStandardMaterial color="#f8f4f6" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.1, 0.036]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshBasicMaterial color={isActive('parcours') ? '#C599B6' : '#ddd5e0'} />
        </mesh>
        <mesh position={[0, -0.25, 0.036]}>
          <planeGeometry args={[0.5, 0.08]} />
          <meshBasicMaterial color={isActive('parcours') ? '#C599B6' : '#ccc5d0'} transparent opacity={0.7} />
        </mesh>
        {/* Decorative corner ornaments */}
        {[[-0.3, 0.45], [0.3, 0.45], [-0.3, -0.45], [0.3, -0.45]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.037]}>
            <circleGeometry args={[0.04, 8]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        ))}
        {isActive('parcours') && (
          <pointLight color={accentColor} intensity={0.8} distance={2.5} position={[0, 0, 0.3]} />
        )}
      </group>

      {/* ─── SHELF + POLAROIDS (Hobbies) ─── */}
      <group
        position={[1.8, 1.3, -1.2]}
        rotation={[0, -0.6, 0]}
        onClick={(e) => handleItemClick('hobbies', e)}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('hobbies') }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[1.25, 0.05, 0.38]} />
          <meshStandardMaterial color={isActive('hobbies') ? '#a87898' : '#2d2747'} roughness={0.6} />
        </mesh>
        {/* Polaroid 1 */}
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
          <group position={[-0.3, 0.12, 0.02]} rotation={[0.05, 0, -0.12]}>
            <mesh castShadow>
              <boxGeometry args={[0.36, 0.44, 0.016]} />
              <meshStandardMaterial color="#fff" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.04, 0.01]}>
              <planeGeometry args={[0.3, 0.28]} />
              <meshBasicMaterial color={isActive('hobbies') ? '#d4a0c0' : '#e0d5e8'} />
            </mesh>
            <mesh position={[0, -0.15, 0.01]}>
              <planeGeometry args={[0.28, 0.04]} />
              <meshBasicMaterial color="#ddd" />
            </mesh>
          </group>
        </Float>
        {/* Polaroid 2 */}
        <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.4}>
          <group position={[0.32, 0.16, 0.05]} rotation={[-0.04, 0, 0.14]}>
            <mesh castShadow>
              <boxGeometry args={[0.36, 0.44, 0.016]} />
              <meshStandardMaterial color="#fff" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.04, 0.01]}>
              <planeGeometry args={[0.3, 0.28]} />
              <meshBasicMaterial color={isActive('hobbies') ? '#a0c4b8' : '#d5e4df'} />
            </mesh>
            <mesh position={[0, -0.15, 0.01]}>
              <planeGeometry args={[0.28, 0.04]} />
              <meshBasicMaterial color="#ddd" />
            </mesh>
          </group>
        </Float>
        {/* Label indicator bar */}
        <mesh position={[0, 0.52, 0]}>
          <boxGeometry args={[0.9, 0.06, 0.01]} />
          <meshBasicMaterial color={isActive('hobbies') ? accentColor : '#5a4875'} />
        </mesh>
        {isActive('hobbies') && (
          <pointLight color={accentColor} intensity={0.8} distance={2.5} position={[0, 0.2, 0.4]} />
        )}
      </group>

      {/* ─── PHONE (Contact) ─── */}
      <group
        ref={phoneRef}
        position={[1.1, -0.3, 0.4]}
        rotation={[0.2, -0.8, 0.1]}
        onClick={(e) => handleItemClick('contact', e)}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('contact') }}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.25, 0.48, 0.03]} />
          <meshStandardMaterial
            color={isActive('contact') ? accentColor : '#3a3260'}
            roughness={0.08}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[0.22, 0.44]} />
          <meshBasicMaterial color="#0a0816" />
        </mesh>
        {/* Glowing notification dot */}
        <mesh position={[0, 0.14, 0.018]}>
          <circleGeometry args={[0.025, 12]} />
          <meshBasicMaterial color={isActive('contact') ? '#fff' : accentColor} />
        </mesh>
        {/* Message lines */}
        <mesh position={[0, -0.02, 0.018]}>
          <planeGeometry args={[0.16, 0.025]} />
          <meshBasicMaterial color={isActive('contact') ? accentColor : '#333'} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, -0.07, 0.018]}>
          <planeGeometry args={[0.12, 0.025]} />
          <meshBasicMaterial color={isActive('contact') ? accentColor : '#222'} transparent opacity={0.5} />
        </mesh>
        <pointLight color={accentColor} intensity={isActive('contact') ? 0.8 : 0.3} distance={1.5} position={[0, 0, 0.15]} />
      </group>

    </group>
  )
}

function OrbitingSkill({ radius, speed, color, phase, isHighlighted }) {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phase
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius
      meshRef.current.position.z = Math.sin(t) * radius
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.18
      meshRef.current.rotation.y = t * 2
    }
  })

  return (
    <group ref={meshRef}>
      <mesh castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color={isHighlighted ? color : '#3a3260'}
          emissive={color}
          emissiveIntensity={isHighlighted ? 0.7 : 0.15}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.24, 0.012, 6, 28]} />
        <meshBasicMaterial color={color} transparent opacity={isHighlighted ? 0.8 : 0.35} />
      </mesh>
    </group>
  )
}
