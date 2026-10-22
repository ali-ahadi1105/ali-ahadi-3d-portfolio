import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DeskStation() {
  const steamRef = useRef<THREE.Group>(null)
  const ledsRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (steamRef.current) {
      steamRef.current.position.y = 0.28 + Math.sin(t * 2) * 0.04
      steamRef.current.rotation.y = t * 0.5
    }
    if (ledsRef.current) {
      const blink = Math.sin(t * 6) > 0 ? 0.9 : 0.2
      ;(ledsRef.current.material as THREE.MeshBasicMaterial).opacity = blink
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* --- DESK SURFACE & STRUCTURE --- */}
      {/* Desk Top: Light Oak / Birch Wood */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.5]} />
        <meshStandardMaterial
          color="#d8ba8e"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Desk Legs: Matte White Minimalist Metal Frame */}
      {/* Front Left Leg */}
      <mesh position={[-1.45, 0.48, 0.62]} castShadow>
        <boxGeometry args={[0.07, 0.96, 0.07]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>
      {/* Front Right Leg */}
      <mesh position={[1.45, 0.48, 0.62]} castShadow>
        <boxGeometry args={[0.07, 0.96, 0.07]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>
      {/* Back Left Leg */}
      <mesh position={[-1.45, 0.48, -0.62]} castShadow>
        <boxGeometry args={[0.07, 0.96, 0.07]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>
      {/* Back Right Leg */}
      <mesh position={[1.45, 0.48, -0.62]} castShadow>
        <boxGeometry args={[0.07, 0.96, 0.07]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
      </mesh>

      {/* --- ERGONOMIC CHAIR --- */}
      <group position={[0, 0, 1.1]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[0.75, 0.1, 0.7]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* Chair Backrest */}
        <mesh position={[0, 1.08, 0.32]} castShadow>
          <boxGeometry args={[0.65, 0.8, 0.08]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        {/* Center Support Pole */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.55, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Chair Star Base with Wheels */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.04, 5]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>

      {/* --- DESK MAT (MOUSEPAD) --- */}
      <mesh position={[0, 1.045, 0.15]} receiveShadow>
        <boxGeometry args={[1.8, 0.005, 0.7]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* --- MECHANICAL KEYBOARD --- */}
      <group position={[0, 1.055, 0.22]}>
        {/* Keyboard Body (Matte White) */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.02, 0.2]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>
        {/* Keycaps Array */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.56, 0.01, 0.17]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
      </group>

      {/* --- MOUSE --- */}
      <mesh position={[0.48, 1.06, 0.22]} castShadow>
        <boxGeometry args={[0.09, 0.025, 0.14]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* --- COFFEE MUG WITH WARM STEAM --- */}
      <group position={[-0.95, 1.045, 0.25]}>
        {/* Ceramic Mug */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.16, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Coffee Liquid inside */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
          <meshStandardMaterial color="#38220f" roughness={0.1} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[-0.09, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.045, 0.015, 8, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Steam Wisps */}
        <group ref={steamRef} position={[0, 0.25, 0]}>
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
          </mesh>
        </group>
      </group>

      {/* --- POTTED DESK SUCCULENT PLANT --- */}
      <group position={[1.15, 1.045, -0.25]}>
        {/* White Ceramic Pot */}
        <mesh position={[0, 0.09, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.08, 0.18, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
          <meshStandardMaterial color="#3f2e1e" />
        </mesh>
        {/* Green Succulent Leaves */}
        <mesh position={[0, 0.22, 0]}>
          <dodecahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#16a34a" roughness={0.6} />
        </mesh>
      </group>

      {/* --- MINIMAL DESK LAMP --- */}
      <group position={[-1.25, 1.045, -0.3]}>
        {/* Lamp Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Lamp Angled Arm */}
        <mesh position={[0.08, 0.3, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.58, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.6} />
        </mesh>
        {/* Lamp Shade */}
        <mesh position={[0.22, 0.54, 0]} rotation={[0, 0, -0.6]} castShadow>
          <coneGeometry args={[0.12, 0.18, 16]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Warm Accent Light from Lamp */}
        <pointLight
          position={[0.25, 0.48, 0]}
          intensity={0.65}
          color="#ffeedd"
          distance={2.5}
        />
      </group>

      {/* --- MINI DEVELOPER HOME-SERVER / NAS --- */}
      <group position={[1.15, 1.045, 0.35]}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.26, 0.24, 0.35]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* Front Panel Grid */}
        <mesh position={[0, 0.12, 0.176]}>
          <planeGeometry args={[0.22, 0.2]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Blinking Activity LED */}
        <mesh ref={ledsRef} position={[0.07, 0.18, 0.178]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#10b981" transparent />
        </mesh>
      </group>
    </group>
  )
}
