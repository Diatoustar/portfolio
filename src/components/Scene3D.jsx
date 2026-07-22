import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import OfficeRoom from './OfficeRoom'
import FloatingParticles from './FloatingParticles'

// Component to handle camera animation and lookAt interpolation
function CameraRig({ activeSection }) {
  const { camera } = useThree()
  
  // Camera configs - close-up zoom positions looking straight at each object.
  // OfficeRoom group at [0, -1, 0]. World positions:
  //   Desk/Laptop (projets):     (0, -0.95, 0.1)
  //   Planetarium (competences): (0, 0.8, -1.5)
  //   Diploma (parcours):        (-1.8, 0.4, -1.2)
  //   Shelf/Hobbies:             (1.8, 0.3, -1.2)
  //   Phone (contact):           (1.1, -1.3, 0.4)
  const config = {
    accueil: {
      pos: new THREE.Vector3(0, 1.2, 5.5),
      look: new THREE.Vector3(0, -0.5, 0)
    },
    competences: {
      pos: new THREE.Vector3(0, 0.8, -0.2),
      look: new THREE.Vector3(0, 0.8, -1.5)
    },
    projets: {
      pos: new THREE.Vector3(0, -0.45, 0.85),
      look: new THREE.Vector3(0, -0.85, 0.1)
    },
    parcours: {
      pos: new THREE.Vector3(-1.8, 0.4, -0.35),
      look: new THREE.Vector3(-1.8, 0.4, -1.2)
    },
    hobbies: {
      pos: new THREE.Vector3(1.8, 0.3, -0.2),
      look: new THREE.Vector3(1.8, 0.3, -1.2)
    },
    contact: {
      pos: new THREE.Vector3(1.1, -1.0, 1.1),
      look: new THREE.Vector3(1.1, -1.3, 0.4)
    }
  }

  const activeConfig = config[activeSection] || config.accueil
  const targetPos = activeConfig.pos
  const targetLook = activeConfig.look
  
  // Keep track of current lookAt point to interpolate it
  const currentLook = useRef(new THREE.Vector3(0, 0.4, 0))

  useFrame((state, delta) => {
    // Smooth speed, frame rate independent
    const speed = 0.08 // factor for lerp

    // Lerp camera position
    camera.position.lerp(targetPos, speed)
    
    // Lerp lookAt target
    currentLook.current.lerp(targetLook, speed)
    camera.lookAt(currentLook.current)
  })

  return null
}

export default function Scene3D({ activeSection, setActiveSection }) {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#0b0813']} />
          {/* Brouillard subtil pour la profondeur atmosphérique */}
          <fog attach="fog" args={['#0b0813', 7, 18]} />
          
          {/* Increased Lights for better visibility */}
          <ambientLight intensity={0.7} />
          
          {/* Bright fill directional light */}
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.001}
          />
          
          {/* Violet fill light */}
          <directionalLight 
            position={[-5, 5, -5]} 
            intensity={0.8} 
            color="#8b5cf6" 
          />
          
          {/* Warm spotlight */}
          <spotLight
            position={[0, 6, 0]}
            intensity={2.5}
            angle={Math.PI / 3}
            penumbra={0.8}
            color="#ffe6f3"
          />

          {/* 3D Scene Items */}
          <OfficeRoom activeSection={activeSection} setActiveSection={setActiveSection} />
          
          {/* Background particle systems */}
          <FloatingParticles count={150} />

          {/* Camera Animator */}
          <CameraRig activeSection={activeSection} />

          {/* Orbit controls enabled only for free roam when in Accueil */}
          {activeSection === 'accueil' && (
            <OrbitControls 
              enableZoom={true} 
              maxPolarAngle={Math.PI / 2 + 0.1} 
              minDistance={3}
              maxDistance={8}
              enablePan={false}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
