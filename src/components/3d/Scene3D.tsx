import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { RoomEnclosure } from './RoomEnclosure'
import { AreaRug } from './AreaRug'
import { DeskStation } from './DeskStation'
import { Bookshelf } from './Bookshelf'
import { FloorPlant } from './FloorPlant'
import { CozySofaCat } from './CozySofaCat'
import { InteractiveMonitor } from './InteractiveMonitor'
import { InteractivePhone } from './InteractivePhone'
import { InteractiveCard } from './InteractiveCard'
import { SunlightParticles } from './SunlightParticles'
import { CameraController, type CameraPreset } from './CameraController'

interface Scene3DProps {
  preset: CameraPreset
  onSelectPreset: (preset: CameraPreset) => void
}

export function Scene3D({ preset, onSelectPreset }: Scene3DProps) {
  const [isInteracting, setIsInteracting] = useState(false)

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        shadows
        camera={{ position: [3.0, 3.0, 3.8], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#f8f2e7')
          scene.fog = null
        }}
      >
        <Suspense fallback={null}>
          {/* --- GOLDEN HOUR SUNSET LIGHTING --- */}
          {/* Warm Ambient Light */}
          <ambientLight intensity={0.95} color="#fff6eb" />

          {/* Golden Sunset Directional Sunlight (streaming directly through window) */}
          <directionalLight
            position={[-5.8, 4.2, 0.4]}
            target-position={[0.4, 1.0, 0]}
            intensity={2.6}
            color="#fed7aa"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.5}
            shadow-camera-far={16}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
            shadow-bias={-0.0004}
          />

          {/* Soft Sunset Sky Fill Light */}
          <directionalLight position={[4, 5, 4]} intensity={0.5} color="#fef08a" />
          <pointLight position={[0, 3.5, 0]} intensity={0.4} color="#ffedd5" distance={8} />

          {/* --- ROOM & FURNITURE ASSETS --- */}
          {/* Walls, Floor & Sunset Window View */}
          <RoomEnclosure />

          {/* Patterned Floor Carpet */}
          <AreaRug position={[0.4, 0.005, 0.4]} />

          {/* Wooden Standing Bookshelf against back wall */}
          <Bookshelf position={[-2.8, 0, -3.7]} />

          {/* Tall Floor Plant (Monstera) in corner by window */}
          <FloorPlant position={[-4.1, 0, -2.1]} />

          {/* Cozy Armchair with Draped Blanket & Sleeping Cat */}
          <CozySofaCat position={[2.3, 0, 0.5]} rotation={[0, -Math.PI / 3.2, 0]} />

          {/* Programmer Desk Station (Oak desk, chair, keyboard, mouse, mug, plant, lamp) */}
          <DeskStation />

          {/* Interactive Core Items on Desk */}
          <InteractiveMonitor
            isFocused={preset === 'monitor'}
            onClick={() => onSelectPreset('monitor')}
          />
          <InteractivePhone
            isFocused={preset === 'phone'}
            onClick={() => onSelectPreset('phone')}
          />
          <InteractiveCard
            isFocused={preset === 'card'}
            onClick={() => onSelectPreset('card')}
          />

          {/* Floating Sunset Dust Particles */}
          <SunlightParticles count={110} />

          {/* Smooth Camera View Controller */}
          <CameraController
            preset={preset}
            isUserInteracting={isInteracting}
          />

          {/* Orbit Controls (constrained to stay above floor) */}
          <OrbitControls
            enabled={preset === 'room'}
            enableDamping
            dampingFactor={0.06}
            minDistance={2.5}
            maxDistance={8.0}
            maxPolarAngle={Math.PI / 2 - 0.05} // Never go under the floor
            minPolarAngle={Math.PI / 6}
            maxAzimuthAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 8}
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
