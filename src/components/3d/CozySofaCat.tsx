import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { sfx } from '../../utils/audio'

interface CozySofaCatProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function CozySofaCat({ position = [2.2, 0, 0.4], rotation = [0, -Math.PI / 3.5, 0] }: CozySofaCatProps) {
  const catRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [purring, setPurring] = useState(false)

  // Gentle sleeping cat breathing animation
  useFrame((state) => {
    if (catRef.current) {
      const t = state.clock.getElapsedTime()
      // Subtle breath rise and fall
      const breath = 1 + Math.sin(t * 2.2) * 0.035
      catRef.current.scale.set(1, breath, 1)
    }
  })

  const handleCatClick = () => {
    sfx.playPurr()
    setPurring(true)
    setTimeout(() => setPurring(false), 2400)
  }

  return (
    <group position={position} rotation={rotation}>
      {/* ================= SOFA / ARMCHAIR ================= */}
      {/* 4 Tapered Wooden Legs */}
      <mesh position={[-0.55, 0.12, 0.42]} rotation={[0.1, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.025, 0.015, 0.24, 12]} />
        <meshStandardMaterial color="#8c6239" roughness={0.6} />
      </mesh>
      <mesh position={[0.55, 0.12, 0.42]} rotation={[0.1, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.025, 0.015, 0.24, 12]} />
        <meshStandardMaterial color="#8c6239" roughness={0.6} />
      </mesh>
      <mesh position={[-0.55, 0.12, -0.42]} rotation={[-0.1, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.025, 0.015, 0.24, 12]} />
        <meshStandardMaterial color="#8c6239" roughness={0.6} />
      </mesh>
      <mesh position={[0.55, 0.12, -0.42]} rotation={[-0.1, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.025, 0.015, 0.24, 12]} />
        <meshStandardMaterial color="#8c6239" roughness={0.6} />
      </mesh>

      {/* Main Base Frame */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.14, 0.95]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* Soft Plush Seat Cushion */}
      <mesh position={[0, 0.42, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[1.18, 0.16, 0.85]} />
        <meshStandardMaterial color="#64748b" roughness={0.85} />
      </mesh>

      {/* Armchair Backrest */}
      <mesh position={[0, 0.78, -0.4]} rotation={[0.12, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.65, 0.2]} />
        <meshStandardMaterial color="#475569" roughness={0.85} />
      </mesh>

      {/* Left Armrest */}
      <mesh position={[-0.62, 0.54, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.16, 0.4, 0.96]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* Right Armrest (Where the blanket is draped) */}
      <mesh position={[0.62, 0.54, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.16, 0.4, 0.96]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* ================= THROW BLANKET (پتو) ================= */}
      {/* Blanket section draped over the right armrest */}
      <group position={[0.62, 0.75, 0.05]} rotation={[0, 0, -0.1]}>
        {/* Top Fold */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.04, 0.65]} />
          <meshStandardMaterial color="#d97706" roughness={0.9} />
        </mesh>
        {/* Outer Draping Flap */}
        <mesh position={[0.1, -0.22, 0]} rotation={[0, 0, -0.05]} castShadow>
          <boxGeometry args={[0.02, 0.42, 0.62]} />
          <meshStandardMaterial color="#b45309" roughness={0.9} />
        </mesh>
        {/* Inner Draping onto the cushion */}
        <mesh position={[-0.18, -0.16, 0]} rotation={[0, 0, 0.3]} receiveShadow>
          <boxGeometry args={[0.28, 0.03, 0.58]} />
          <meshStandardMaterial color="#d97706" roughness={0.9} />
        </mesh>
      </group>

      {/* Secondary accent throw pillow on the left side */}
      <mesh position={[-0.42, 0.58, -0.25]} rotation={[0.2, 0.3, -0.1]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.12]} />
        <meshStandardMaterial color="#fed7aa" roughness={0.7} />
      </mesh>

      {/* ================= SLEEPING CAT (گربه خوابیده) ================= */}
      <group
        ref={catRef}
        position={[0.08, 0.52, 0.08]}
        rotation={[0, 0.35, 0]}
        onClick={(e) => {
          e.stopPropagation()
          handleCatClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Curled Cat Body (warm ginger/orange tabby tone) */}
        <mesh position={[0, 0.06, 0]} scale={[1.25, 0.75, 1.0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ea580c" roughness={0.8} />
        </mesh>

        {/* Cat Head tucked into front */}
        <mesh position={[0.14, 0.08, 0.05]} scale={[1, 0.9, 0.95]} castShadow>
          <sphereGeometry args={[0.09, 14, 14]} />
          <meshStandardMaterial color="#f97316" roughness={0.8} />
        </mesh>

        {/* Cute Ears */}
        {/* Left Ear */}
        <mesh position={[0.16, 0.16, 0.1]} rotation={[0, 0, -0.4]}>
          <coneGeometry args={[0.035, 0.06, 4]} />
          <meshStandardMaterial color="#c2410c" />
        </mesh>
        {/* Right Ear */}
        <mesh position={[0.12, 0.16, -0.02]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.035, 0.06, 4]} />
          <meshStandardMaterial color="#c2410c" />
        </mesh>

        {/* Sleeping Eye Slits */}
        <mesh position={[0.22, 0.09, 0.07]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.02, 0.004, 0.002]} />
          <meshBasicMaterial color="#7c2d12" />
        </mesh>

        {/* Curled Tail wrapped around body */}
        <mesh position={[-0.12, 0.04, 0.12]} rotation={[Math.PI / 2, 0, 0.6]}>
          <torusGeometry args={[0.1, 0.026, 8, 16, Math.PI * 1.1]} />
          <meshStandardMaterial color="#c2410c" roughness={0.8} />
        </mesh>

        {/* White chest patch */}
        <mesh position={[0.11, 0.04, 0.04]} scale={[0.8, 0.6, 0.6]}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshStandardMaterial color="#ffedd5" />
        </mesh>

        {/* Interactive Cat Tooltip on hover or purr */}
        {(hovered || purring) && (
          <Html position={[0, 0.35, 0]} center distanceFactor={7} zIndexRange={[100, 0]}>
            <div className="px-2.5 py-1 rounded-full font-mono text-[11px] whitespace-nowrap bg-amber-950/90 text-amber-200 border border-amber-500/50 shadow-lg backdrop-blur-xs flex items-center gap-1.5 animate-bounce">
              <span>🐱</span>
              <span>{purring ? 'Purrrrr... 💤' : 'Sleeping Cat (Click to pet)'}</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}
